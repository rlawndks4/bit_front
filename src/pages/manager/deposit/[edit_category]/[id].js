
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
    label: '위임자서류정보',
  },
  {
    value: 2,
    label: '수임자서류정보',
  },
]
const DepositEdit = () => {
  const { setModal } = useModal()
  const { themeMode } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    deposit: '',
    user_name: '',
    note: '',
    method_type: 1,
  })
  useEffect(() => {
    settingPage();
  }, [router.asPath])
  const settingPage = async () => {
    setCurrentTab(router.query?.type ?? 0);
    if (router.query?.edit_category == 'edit') {
      let data = await apiManager('deposits', 'get', {
        id: router.query.id
      })
      setItem(data);
    }
    setLoading(false);
  }
  const onSave = async () => {
    let result = undefined
    if (item?.id) {//수정
      result = await apiManager('deposits', 'update', { ...item });
    } else {//추가
      result = await apiManager('deposits', 'create', { ...item });
    }
    if (result) {
      toast.success("성공적으로 저장 되었습니다.");
      router.push('/manager/deposit');
    }
  }
  return (
    <>
      {!loading &&
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, height: '100%' }}>
                <Stack spacing={3}>
                  <TextField
                    label='금액'
                    value={item.deposit}
                    type="number"
                    onChange={(e) => {
                      setItem(
                        {
                          ...item,
                          ['deposit']: e.target.value
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
DepositEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default DepositEdit
