
import { Button, Card, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, themeObj } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { Upload } from "src/components/upload";
import ManagerLayout from "src/layouts/manager/ManagerLayout";
import { base64toFile, getAllIdsWithParents } from "src/utils/function";
import styled from "styled-components";
import { react_quill_data } from "src/data/manager-data";
import { axiosIns } from "src/utils/axios";
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
    label: '위임자서류정보',
  },
  {
    value: 2,
    label: '수임자서류정보',
  },
]
const SenderEdit = () => {
  const { setModal } = useModal()
  const { themeMode } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    name: '',
    sender: '',
    user_name: '',
    note: '',
    status: 0,
    delegator_tel_sub_file: undefined,
    delegator_bsin_lic_file: undefined,
    delegator_consign_file: undefined,
    mandatary_bsin_lic_file: undefined,
    mandatary_warrant_file: undefined,
    mandatary_seal_file: undefined,
    mandatary_agent_serve_file: undefined,
  })
  useEffect(() => {
    settingPage();
  }, [router.asPath])
  const settingPage = async () => {
    setCurrentTab(router.query?.type ?? 0);
    if (router.query?.edit_category == 'edit') {
      let data = await apiManager('senders', 'get', {
        id: router.query.id
      })
      setItem(data);
    }
    setLoading(false);
  }
  const onSave = async () => {
    let result = undefined
    if (item?.id) {//수정
      result = await apiManager('senders', 'update', { ...item });
    } else {//추가
      result = await apiManager('senders', 'create', { ...item });
    }
    if (result) {
      toast.success("성공적으로 저장 되었습니다.");
      router.push('/manager/sender');
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
                      <TextField
                        label='발신번호명'
                        value={item.name}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['name']: e.target.value
                            }
                          )
                        }} />
                      <TextField
                        label='발신번호'
                        value={item.sender}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['sender']: e.target.value
                            }
                          )
                        }} />
                      <FormControl>
                        <InputLabel>쇼핑몰 데모넘버</InputLabel>
                        <Select label='쇼핑몰 데모넘버' value={item.status} onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['status']: e.target.value
                            }
                          )
                        }}>
                          <MenuItem value={0}>정상</MenuItem>
                          <MenuItem value={1}>검토중</MenuItem>
                          <MenuItem value={2}>차단됨</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
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
                      <Stack spacing={1}>
                        <TextField
                          fullWidth
                          label="관리자노트"
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
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          통신가입증명서
                        </Typography>
                        <Upload file={item.delegator_tel_sub_file || item.delegator_tel_sub_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['delegator_tel_sub_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['delegator_tel_sub_img']: '',
                              ['delegator_tel_sub_file']: undefined,
                            }
                          )
                        }}
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          사업자등록증
                        </Typography>
                        <Upload file={item.delegator_bsin_lic_file || item.delegator_bsin_lic_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['delegator_bsin_lic_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['delegator_bsin_lic_img']: '',
                              ['delegator_bsin_lic_file']: undefined,
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
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          발신번호 위탁서
                        </Typography>
                        <Upload file={item.delegator_consign_file || item.delegator_consign_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['delegator_consign_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['delegator_consign_img']: '',
                              ['delegator_consign_file']: undefined,
                            }
                          )
                        }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              </>}
            {currentTab == 2 &&
              <>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Stack spacing={3}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          사업자등록증
                        </Typography>
                        <Upload file={item.mandatary_bsin_lic_file || item.mandatary_bsin_lic_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['mandatary_bsin_lic_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['mandatary_bsin_lic_img']: '',
                              ['mandatary_bsin_lic_file']: undefined,
                            }
                          )
                        }}
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          대리인지정위임장
                        </Typography>
                        <Upload file={item.mandatary_warrant_file || item.mandatary_warrant_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['mandatary_warrant_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['mandatary_warrant_img']: '',
                              ['mandatary_warrant_file']: undefined,
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
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          법인인감증명서
                        </Typography>
                        <Upload file={item.mandatary_seal_file || item.mandatary_seal_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['mandatary_seal_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['mandatary_seal_img']: '',
                              ['mandatary_seal_file']: undefined,
                            }
                          )
                        }}
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          대리인의 재직증명서
                        </Typography>
                        <Upload file={item.mandatary_agent_serve_file || item.mandatary_agent_serve_img} onDrop={(acceptedFiles) => {
                          const newFile = acceptedFiles[0];
                          if (newFile) {
                            setItem(
                              {
                                ...item,
                                ['mandatary_agent_serve_file']: Object.assign(newFile, {
                                  preview: URL.createObjectURL(newFile),
                                })
                              }
                            );
                          }
                        }} onDelete={() => {
                          setItem(
                            {
                              ...item,
                              ['mandatary_agent_serve_img']: '',
                              ['mandatary_agent_serve_file']: undefined,
                            }
                          )
                        }}
                        />
                      </Stack>
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
SenderEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default SenderEdit
