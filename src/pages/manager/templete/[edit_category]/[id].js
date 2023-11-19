
import { Button, Card, Divider, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSettingsContext } from "src/components/settings";
import { Upload } from "src/components/upload";
import ManagerLayout from "src/layouts/manager/ManagerLayout";
import { toast } from "react-hot-toast";
import { useModal } from "src/components/dialog/ModalProvider";
import { apiManager } from "src/utils/api-manager";
import { Row } from "src/components/elements/styled-components";

const KakaoTempleteEdit = () => {
  const { setModal } = useModal()
  const { themeMode } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    msg_type: 3,
    tpl_code: '',
    emphasis_type: 0,
    img_type: 0,
    templetes_img: '',
    templete_img_text: '',
    channel_user_name: '',
    user_name: '',
    nickname: '',
    title: '',
    sub_title: '',
    msg: '',
    button_type: 'DS',
    button_obj: []
  })
  useEffect(() => {
    settingPage();
  }, [router.asPath])
  const settingPage = async () => {
    setCurrentTab(router.query?.type ?? 0);
    if (router.query?.edit_category == 'edit') {
      let data = await apiManager('templetes', 'get', {
        id: router.query.id
      })
      setItem(data);
    } else {
      setItem({
        ...item,
        user_name: router.query?.user_name
      })
    }
    setLoading(false);
  }
  const onSave = async () => {
    let result = undefined
    if (item?.id) {//수정
      result = await apiManager('templetes', 'update', { ...item });
    } else {//추가
      result = await apiManager('templetes', 'create', { ...item });
    }
    if (result) {
      toast.success("성공적으로 저장 되었습니다.");
      router.push('/manager/templete');
    }
  }
  const addButtonType = {
    DS: {
      linkType: 'DS',
      name: '배송조회',
      typeName: '배송조회',
    },
    WL: {
      linkType: 'WL',
      name: '',
      linkMo: '',
      linkPc: '',
      typeName: '웹링크',
    },
    AL: {
      linkType: 'AL',
      name: '',
      linkIos: '',
      linkAnd: '',
      typeName: '앱링크',
    },
    BK: {
      linkType: 'BK',
      name: '',
      typeName: '봇키워드',
    },
    MD: {
      linkType: 'MD',
      name: '',
      typeName: '메세지전달',
    },
    AC: {
      linkType: 'AC',
      name: '',
      typeName: '채널추가',
    },
  }
  return (
    <>
      {!loading &&
        <>
          <Grid container spacing={3}>
            {currentTab == 0 &&
              <>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <FormControl>
                        <InputLabel>메세지타입</InputLabel>
                        <Select label='메세지타입' value={item.msg_type} onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['msg_type']: e.target.value
                            }
                          )
                        }}>
                          <MenuItem value={3}>AT(텍스트형)</MenuItem>
                          <MenuItem value={4}>AI(이미지혼합형)</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label='채널 검색용 아이디'
                        value={item.channel_user_name}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['channel_user_name']: e.target.value
                            }
                          )
                        }} />
                      <TextField
                        label='유저아이디'
                        value={item.user_name}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['user_name']: e.target.value
                            }
                          )
                        }} />
                      <TextField
                        label='템플릿코드'
                        value={item.tpl_code}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['tpl_code']: e.target.value
                            }
                          )
                        }} />
                      <TextField
                        label='별칭'
                        value={item.nickname}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['nickname']: e.target.value
                            }
                          )
                        }} />
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <FormControl>
                        <InputLabel>강조표기타입</InputLabel>
                        <Select label='강조표기타입' value={item.emphasis_type} onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['emphasis_type']: e.target.value
                            }
                          )
                        }}>
                          <MenuItem value={0}>이미지형</MenuItem>
                          <MenuItem value={1}>기본형</MenuItem>
                          <MenuItem value={2}>강조표기형</MenuItem>
                        </Select>
                      </FormControl>
                      {item.emphasis_type == 0 &&
                        <>
                          <FormControl>
                            <InputLabel>이미지타입</InputLabel>
                            <Select label='이미지타입' value={item.img_type} onChange={(e) => {
                              setItem(
                                {
                                  ...item,
                                  ['img_type']: e.target.value
                                }
                              )
                            }}>
                              <MenuItem value={0}>직접</MenuItem>
                              <MenuItem value={1}>로고</MenuItem>
                              <MenuItem value={2}>아이콘</MenuItem>
                              <MenuItem value={3}>텍스트혼합</MenuItem>
                            </Select>
                          </FormControl>
                          <Stack spacing={1}>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                              이미지
                            </Typography>
                            <Upload file={item.templete_file || item.templete_img} onDrop={(acceptedFiles) => {
                              const newFile = acceptedFiles[0];
                              if (newFile) {
                                setItem(
                                  {
                                    ...item,
                                    ['templete_file']: Object.assign(newFile, {
                                      preview: URL.createObjectURL(newFile),
                                    })
                                  }
                                );
                              }
                            }} onDelete={() => {
                              setItem(
                                {
                                  ...item,
                                  ['templete_img']: '',
                                  ['templete_file']: undefined,
                                }
                              )
                            }}
                            />
                          </Stack>
                        </>}
                      {item.img_type == 3 &&
                        <>
                          <TextField
                            label='이미지텍스트'
                            value={item.templete_img_text}
                            onChange={(e) => {
                              setItem(
                                {
                                  ...item,
                                  ['templete_img_text']: e.target.value
                                }
                              )
                            }} />
                        </>}
                      {item.emphasis_type == 2 &&
                        <>
                          <TextField
                            label='제목'
                            value={item.title}
                            onChange={(e) => {
                              setItem(
                                {
                                  ...item,
                                  ['title']: e.target.value
                                }
                              )
                            }} />
                          <TextField
                            label='부제목'
                            value={item.sub_title}
                            onChange={(e) => {
                              setItem(
                                {
                                  ...item,
                                  ['sub_title']: e.target.value
                                }
                              )
                            }} />
                        </>}

                      <TextField
                        fullWidth
                        label="내용"
                        multiline
                        rows={8}
                        value={item.msg}
                        onChange={(e) => {
                          setItem({
                            ...item,
                            ['msg']: e.target.value
                          })
                        }}
                      />
                      <Row style={{ columnGap: '0.5rem', alignItems: 'center' }}>
                        <FormControl sx={{ width: '80%' }}>
                          <InputLabel>버튼타입</InputLabel>
                          <Select label='버튼타입' value={item.button_type} onChange={(e) => {
                            setItem(
                              {
                                ...item,
                                ['button_type']: e.target.value
                              }
                            )
                          }}>
                            {Object.keys(addButtonType).map((ke => {
                              return <MenuItem value={addButtonType[ke].linkType}>{addButtonType[ke].typeName}</MenuItem>
                            }))}
                          </Select>
                        </FormControl>
                        <Button variant="contained" sx={{ height: '56px' }} onClick={() => {
                          let button_obj = item.button_obj;
                          button_obj.push(addButtonType[item.button_type]);
                          setItem(
                            {
                              ...item,
                              ['button_obj']: button_obj
                            }
                          )
                        }}>버튼 추가</Button>
                      </Row>
                      {item.button_obj && item.button_obj.map(((button, idx) => (
                        <>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            {button.typeName}
                          </Typography>
                          <TextField
                            label='버튼명'
                            value={button.name}
                            onChange={(e) => {
                              let button_obj = item.button_obj;
                              button_obj[idx].name = e.target.value;
                              setItem(
                                {
                                  ...item,
                                  ['button_obj']: button_obj
                                }
                              )
                            }} />
                          {button.linkType == 'DS' &&//배송조회
                            <>

                            </>}
                          {button.linkType == 'WL' &&//웹링크
                            <>
                              <TextField
                                label='모바일링크'
                                placeholder="https://example.com"
                                value={button.linkMo}
                                onChange={(e) => {
                                  let button_obj = item.button_obj;
                                  button_obj[idx].linkMo = e.target.value;
                                  setItem(
                                    {
                                      ...item,
                                      ['button_obj']: button_obj
                                    }
                                  )
                                }} />
                              <TextField
                                label='PC링크'
                                placeholder="https://example.com"
                                value={button.linkPc}
                                onChange={(e) => {
                                  let button_obj = item.button_obj;
                                  button_obj[idx].linkPc = e.target.value;
                                  setItem(
                                    {
                                      ...item,
                                      ['button_obj']: button_obj
                                    }
                                  )
                                }} />
                            </>}
                          {button.linkType == 'AL' &&//앱링크
                            <>
                              <TextField
                                label='IOS링크'
                                placeholder="iosapp://example"
                                value={button.linkIos}
                                onChange={(e) => {
                                  let button_obj = item.button_obj;
                                  button_obj[idx].linkIos = e.target.value;
                                  setItem(
                                    {
                                      ...item,
                                      ['button_obj']: button_obj
                                    }
                                  )
                                }} />
                              <TextField
                                label='안드로이드링크'
                                placeholder="androidapp://example"
                                value={button.linkAnd}
                                onChange={(e) => {
                                  let button_obj = item.button_obj;
                                  button_obj[idx].linkAnd = e.target.value;
                                  setItem(
                                    {
                                      ...item,
                                      ['button_obj']: button_obj
                                    }
                                  )
                                }} />
                            </>}
                          {button.linkType == 'BK' &&//봇키워드
                            <>

                            </>}
                          {button.linkType == 'MD' &&//메세지전달
                            <>

                            </>}
                          {button.linkType == 'AC' &&//채널추가
                            <>

                            </>}
                          <Divider />
                        </>
                      )))}
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
KakaoTempleteEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default KakaoTempleteEdit
