
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

const KakaoChannelEdit = () => {
  const { setModal } = useModal()
  const { themeMode } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    channel_user_name: '',
    phone_num: '',
    user_name: '',
    note: '',
    status: 0,
  })
  useEffect(() => {
    settingPage();
  }, [router.asPath])
  const settingPage = async () => {
    setCurrentTab(router.query?.type ?? 0);
    if (router.query?.edit_category == 'edit') {
      let data = await apiManager('kakao-channels', 'get', {
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
      result = await apiManager('kakao-channels', 'update', { ...item });
    } else {//추가
      result = await apiManager('kakao-channels', 'create', { ...item });
    }
    if (result) {
      toast.success("성공적으로 저장 되었습니다.");
      router.push('/manager/kakao-channel');
    }
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
                        label='핸드폰번호'
                        value={item.phone_num}
                        onChange={(e) => {
                          setItem(
                            {
                              ...item,
                              ['phone_num']: e.target.value
                            }
                          )
                        }} />
                      <FormControl>
                        <InputLabel>상태</InputLabel>
                        <Select label='상태' value={item.status} onChange={(e) => {
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
KakaoChannelEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default KakaoChannelEdit
