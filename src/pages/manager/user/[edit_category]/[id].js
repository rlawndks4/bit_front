
import { Button, Card, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, themeObj } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { Upload } from "src/components/upload";
import ManagerLayout from "src/layouts/manager/ManagerLayout";
import { toast } from "react-hot-toast";
import { useModal } from "src/components/dialog/ModalProvider";
import dynamic from "next/dynamic";
import { apiManager } from "src/utils/api-manager";
import { Icon } from "@iconify/react";
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const tab_list = [
  {
    value: 0,
    label: '기본정보',
  },
  {
    value: 1,
    label: '허용 IP',
  },
  {
    value: 2,
    label: '예치금차감설정'
  },
]
const UserEdit = () => {
  const { setModal } = useModal()
  const { themeMode } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    profile_file: undefined,
    user_name: '',
    user_pw: '',
    nickname: '',
    phone_num: '',
    note: '',
    setting_obj: {
    },
  })
  const [ipList, setIpList] = useState([]);

  useEffect(() => {
    settingPage();
  }, [router.asPath])
  const settingPage = async () => {
    setCurrentTab(router.query?.type ?? 0);
    if (router.query?.edit_category == 'edit') {
      let data = await apiManager('users', 'get', {
        id: router.query.id
      })
      setItem(data);
      setIpList(data?.ip_list);
    }
    setLoading(false);
  }
  const onSave = async () => {
    let result = undefined
    console.log(ipList)
    if (item?.id) {//수정

      result = await apiManager('users', 'update', { ...item, ip_list: ipList });
    } else {//추가
      result = await apiManager('users', 'create', { ...item, ip_list: ipList });
    }
    if (result) {
      toast.success("성공적으로 저장 되었습니다.");
      router.push('/manager/user');
    }
  }
  return (
    <>
      {!loading &&
        <>
          <Row style={{ margin: '0 0 1rem 0', columnGap: '0.5rem' }}>
            {tab_list.map((tab) => (
              <Button
                variant={tab.value == currentTab ? 'contained' : 'outlined'}
                onClick={() => {
                  setCurrentTab(tab.value)
                }}
              >{tab.label}</Button>
            ))}
          </Row>
          <Grid container spacing={3}>
            {currentTab == 0 &&
              <>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          프로필사진
                        </Typography>
                        <Upload file={item.profile_file || item.profile_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['profile_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['profile_img']: '',
                              ['profile_file']: undefined,
                            }
                          )
                        }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <TextField
                        label='아이디'
                        value={item.user_name}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['user_name']: e.target.value
                            }
                          )
                        }} />
                      {router.query?.edit_category == 'add' &&
                        <>
                          <TextField
                            label='패스워드'
                            value={item.user_pw}

                            type='password'
                            onChange={(e) => {
                              setItem(
                                {
                                  ...item,
                                  ['user_pw']: e.target.value
                                }
                              )
                            }} />
                        </>}
                      <TextField
                        label='닉네임'
                        value={item.nickname}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['nickname']: e.target.value
                            }
                          )
                        }} />
                      <TextField
                        label='전화번호'
                        value={item.phone_num}
                        placeholder="하이픈(-) 제외 입력"
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['phone_num']: e.target.value
                            }
                          )
                        }} />
                      <Stack spacing={1}>
                        <TextField
                          fullWidth
                          label="고객메모"
                          multiline
                          rows={4}
                          value={item.note}
                          onChange={(e) => {
                            setItem({
                              ...item,
                              ['note']: e.target.value
                            })
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              </>}
            {currentTab == 1 &&
              <>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={2} style={{ maxWidth: '500px', margin: 'auto' }}>
                      {ipList.map((ip, idx) => (
                        <>
                          {ip?.is_delete != 1 &&
                            <>
                              <Row>
                                <TextField
                                  sx={{ flexGrow: 1 }}
                                  size='small'
                                  label='IP'
                                  value={ip?.ip}
                                  onChange={(e) => {
                                    let ip_list = [...ipList];
                                    console.log(ip_list)
                                    ip_list[idx]['ip'] = e.target.value;
                                    console.log(ip_list)
                                    setIpList(ip_list);
                                  }}
                                />
                                <IconButton onClick={() => {
                                  let ip_list = [...ipList];
                                  ip_list[idx].is_delete = 1;
                                  setIpList(ip_list);
                                }}>
                                  <Icon icon='material-symbols:delete-outline' />
                                </IconButton>
                              </Row>
                            </>}
                        </>
                      ))}
                      <Button variant="outlined" onClick={() => {
                        setIpList([
                          ...ipList,
                          ...[{ ip: '' }]
                        ])
                      }}>추가</Button>
                    </Stack>
                  </Card>
                </Grid>
              </>}
            {currentTab == 2 &&
              <>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <TextField
                        label='sms'
                        value={item.setting_obj?.sms ?? 0}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['setting_obj']: {
                                ...item.setting_obj,
                                ['sms']: e.target.value
                              }
                            }
                          )
                        }} />
                      <TextField
                        label='lms'
                        value={item.setting_obj?.lms ?? 0}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['setting_obj']: {
                                ...item.setting_obj,
                                ['lms']: e.target.value
                              }
                            }
                          )
                        }} />
                      <TextField
                        label='mms'
                        value={item.setting_obj?.mms ?? 0}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['setting_obj']: {
                                ...item.setting_obj,
                                ['mms']: e.target.value
                              }
                            }
                          )
                        }} />
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <TextField
                        label='at'
                        value={item.setting_obj?.at ?? 0}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['setting_obj']: {
                                ...item.setting_obj,
                                ['at']: e.target.value
                              }
                            }
                          )
                        }} />
                      <TextField
                        label='ai'
                        value={item.setting_obj?.ai ?? 0}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['setting_obj']: {
                                ...item.setting_obj,
                                ['ai']: e.target.value
                              }
                            }
                          )
                        }} />
                    </Stack>
                  </Card>
                </Grid>
              </>}
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={1} style={{ display: 'flex' }}>
                  <Button variant="contained" style={{
                    height: '48px', width: '120px', marginLeft: 'auto'
                  }} onClick={() => {
                    setModal({
                      func: () => { onSave() },
                      icon: 'material-symbols:edit-outline',
                      title: '저장 하시겠습니까?'
                    })
                  }}>
                    저장
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </>}
    </>
  )
}
UserEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default UserEdit
