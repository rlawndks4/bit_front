import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ManagerTable from "src/sections/manager/table/ManagerTable";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { Col, Row } from "src/components/elements/styled-components";
import { toast } from "react-hot-toast";
import { useModal } from "src/components/dialog/ModalProvider";
import ManagerLayout from "src/layouts/manager/ManagerLayout";
import { apiApiServer, apiManager } from "src/utils/api-manager";
import { useAuthContext } from "src/auth/useAuthContext";
import { commarNumber, returnMoment } from "src/utils/function";
const UserList = () => {
  const { user } = useAuthContext();
  const { setModal } = useModal();
  const [showApiKeyId, setShowApiKeyId] = useState(undefined);
  const defaultHeadColumns = [
    {
      title: '기본정보',
      count: 5,
    },
    {
      title: 'KAKAO 정보',
      count: 2
    },
  ]
  const defaultColumns = [
    {
      id: 'profile_img',
      label: '유저프로필',
      action: (row) => {
        return <Avatar src={row['profile_img'] ?? "---"} />
      }
    },
    {
      id: 'user_name',
      label: '유저아이디',
      action: (row) => {
        return row['user_name'] ?? "---"
      }
    },
    {
      id: 'nickname',
      label: '닉네임',
      action: (row) => {
        return row['nickname'] ?? "---"
      }
    },
    {
      id: 'phone_num',
      label: '휴대폰번호',
      action: (row) => {
        return row['phone_num'] ?? "---"
      }
    },
    {
      id: 'total_deposit',
      label: '예치금액',
      action: (row) => {
        return commarNumber(row['total_deposit'])
      }
    },
    {
      id: 'api_key',
      label: 'API KEY',
      action: (row) => {
        return <Accordion key={row?.id} style={{ boxShadow: "none", background: 'transparent', width: '200px', wordBreak: 'break-all' }} disabled={!(row?.api_key)}>
          <AccordionSummary expandIcon={<Icon icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">자세히보기</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {row?.api_key}
          </AccordionDetails>
        </Accordion>
      },
    },
    {
      id: 'kakao_token',
      label: '토큰',
      action: (row) => {
        return <Accordion key={row?.id} style={{ boxShadow: "none", background: 'transparent', width: '200px', wordBreak: 'break-all' }} disabled={!(row?.kakao_token)}>
          <AccordionSummary expandIcon={<Icon icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">자세히보기</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {row?.kakao_token}
          </AccordionDetails>
        </Accordion>
      },
    },
    {
      id: 'kakao_token_expired',
      label: '토큰 만료일',
      action: (row) => {
        return <Col style={{
          maxWidth: '300px',
          wordBreak: 'break-all'
        }}>
          <div>
            {row['kakao_token_expired'] ? returnMoment(false, new Date(row.kakao_token_expired)) : '---'}
          </div>
        </Col>
      },
    },
    {
      id: 'created_at',
      label: '가입일',
      action: (row) => {
        return row['created_at'] ?? "---"
      }
    },

    {
      id: 're_api_key',
      label: 'api key 재발급',
      action: (row) => {
        return (
          <>
            <IconButton onClick={() => {
              setModal({
                func: () => { onChangeUserApiKey(row) },
                icon: 'material-symbols:replay',
                title: 'api key 재발급 하시겠습니까?'
              })
            }}>
              <Icon icon='material-symbols:replay' />
            </IconButton>
          </>
        )
      }
    },
    {
      id: 're_kakao_token',
      label: '카카오토큰 재발급',
      action: (row) => {
        return (
          <>
            <IconButton onClick={() => {
              setModal({
                func: () => { onChangeUserKakaoToken(row) },
                icon: 'material-symbols:replay',
                title: '카카오토큰 재발급 하시겠습니까?'
              })
            }}>
              <Icon icon='material-symbols:replay' />
            </IconButton>
          </>
        )
      }
    },
    {
      id: 'sender_add',
      label: '발신자추가',
      action: (row) => {
        return (
          <>
            <IconButton onClick={() => {
              router.push(`/manager/sender/add?user_name=${row?.user_name}`)
            }}>
              <Icon icon='bi:send-plus' />
            </IconButton>
          </>
        )
      }
    },
    {
      id: 'permit_ips',
      label: '허용IP설정',
      action: (row) => {
        return (
          <>
            <IconButton onClick={() => {
              router.push(`edit/${row?.id}?type=1`)
            }}>
              <Icon icon='eos-icons:ip-outlined' />
            </IconButton>
          </>
        )
      }
    },
    {
      id: 'permit_ips',
      label: '사용료설정',
      action: (row) => {
        return (
          <>
            <IconButton onClick={() => {
              router.push(`edit/${row?.id}?type=2`)
            }}>
              <Icon icon='vaadin:money-deposit' />
            </IconButton>
          </>
        )
      }
    },
    {
      id: 'edit_password',
      label: '비밀번호 변경',
      action: (row) => {
        if (user?.level < row?.level) {
          return "---"
        }
        return (
          <>
            <IconButton onClick={() => {
              setDialogObj({ ...dialogObj, changePassword: true })
              setChangePasswordObj({
                user_pw: '',
                id: row?.id
              })
            }}>
              <Icon icon='material-symbols:lock-outline' />
            </IconButton>
          </>
        )
      }
    },
    {
      id: 'edit',
      label: '수정/삭제',
      action: (row) => {
        return (
          <>
            <IconButton>
              <Icon icon='material-symbols:edit-outline' onClick={() => {
                router.push(`edit/${row?.id}`)
              }} />
            </IconButton>
            <IconButton onClick={() => {
              setModal({
                func: () => { deleteItem(row?.id) },
                icon: 'material-symbols:delete-outline',
                title: '정말 삭제하시겠습니까?'
              })
            }}>
              <Icon icon='material-symbols:delete-outline' />
            </IconButton>
          </>
        )
      }
    },
  ]

  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState({});
  const [searchObj, setSearchObj] = useState({
    page: 1,
    page_size: 10,
    s_dt: '',
    e_dt: '',
    search: '',
  })
  const [dialogObj, setDialogObj] = useState({
    changePassword: false,
  })
  const [changePasswordObj, setChangePasswordObj] = useState({
    id: '',
    user_pw: ''
  })
  useEffect(() => {
    pageSetting();
  }, [])
  const pageSetting = () => {
    let cols = defaultColumns;
    setColumns(cols)
    onChangePage({ ...searchObj, page: 1, });
  }
  const onChangePage = async (obj) => {
    setData({
      ...data,
      content: undefined
    })
    let data_ = await apiManager('users', 'list', obj);
    if (data_) {
      setData(data_);
    }
    setSearchObj(obj);
  }
  const deleteItem = async (id) => {
    let data = await apiManager('users', 'delete', { id });
    if (data) {
      onChangePage(searchObj);
    }
  }
  const onChangeUserPassword = async () => {
    let result = await apiManager(`users/change-pw`, 'update', changePasswordObj);
    if (result) {
      setDialogObj({
        ...dialogObj,
        changePassword: false
      })
      setChangePasswordObj({
        id: '',
        user_pw: ''
      })
      toast.success("성공적으로 변경 되었습니다.");
    }
  }
  const onChangeUserApiKey = async (row) => {
    let result = await apiManager(`users/change-api-key`, 'update', row);
    if (result) {
      toast.success("성공적으로 발급 되었습니다.");
      onChangePage(searchObj);
    }
  }
  const onChangeUserKakaoToken = async (row) => {
    let result = await apiApiServer(`alimtalk/v1/token/create/1/h`, 'create', { ...row, user_id: row?.user_name });
    if (result) {
      toast.success("성공적으로 발급 되었습니다.");
      onChangePage(searchObj);
    }
  }
  return (
    <>
      <Dialog
        open={dialogObj.changePassword}
      >
        <DialogTitle>{`비밀번호 변경`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            새 비밀번호를 입력 후 확인을 눌러주세요.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            value={changePasswordObj.user_pw}
            type="password"
            margin="dense"
            label="새 비밀번호"
            onChange={(e) => {
              setChangePasswordObj({
                ...changePasswordObj,
                user_pw: e.target.value
              })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onChangeUserPassword}>
            변경
          </Button>
          <Button color="inherit" onClick={() => {
            setDialogObj({
              ...dialogObj,
              changePassword: false
            })
          }}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={3}>
        <Card>
          <ManagerTable
            data={data}
            columns={columns}
            head_columns={defaultHeadColumns}
            searchObj={searchObj}
            onChangePage={onChangePage}
            add_button_text={'회원 추가'}
            table_style={{
              width: '150%'
            }}
          />
        </Card>
      </Stack>
    </>
  )
}
UserList.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default UserList
