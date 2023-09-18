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
const SenderList = () => {
  const { user } = useAuthContext();
  const { setModal } = useModal();
  const [showApiKeyId, setShowApiKeyId] = useState(undefined);
  const defaultHeadColumns = [
    {
      title: '기본정보',
      count: 1,
    },
    {
      title: '유저정보',
      count: 2
    },

  ]
  const defaultColumns = [
    {
      id: 'sender',
      label: '발신번호',
      action: (row) => {
        return row['sender'] ?? "---"
      }
    },
    {
      id: 'user_name',
      label: '아이디',
      action: (row) => {
        return row['user_name'] ?? "---"
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
      id: 'status_str',
      label: '상태',
      action: (row) => {
        return row['status_str'] ?? "---"
      }
    },
    {
      id: 'created_at',
      label: '신청일',
      action: (row) => {
        return row['created_at'] ?? "---"
      }
    },
    {
      id: 'test_send',
      label: '테스트발송',
      action: (row) => {
        if (user?.level < row?.level) {
          return "---"
        }
        return (
          <>
            <IconButton onClick={() => {
              setDialogObj({ ...dialogObj, testSend: true })
              setTestSendObj({
                text: '',
                user_id: row?.user_name,
                api_key: row?.api_key,
                sender: row?.sender,
              })
            }}>
              <Icon icon='grommet-icons:test' />
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
    testSend: false,
  })
  const [testSendObj, setTestSendObj] = useState({
    id: '',
    text: ''
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
    let data_ = await apiManager('senders', 'list', obj);
    if (data_) {
      setData(data_);
    }
    setSearchObj(obj);
  }
  const deleteItem = async (id) => {
    let data = await apiManager('senders', 'delete', { id });
    if (data) {
      onChangePage(searchObj);
    }
  }
  const onTestSend = async () => {
    console.log(testSendObj)
    let result = await apiApiServer(`msg/v1/send`,'create', {
      api_key: testSendObj.api_key,
      user_id: testSendObj.user_id,
      sender: testSendObj.sender,
      receiver: '01029522667',
      msg: testSendObj.text,
    })
    if (result) {
      toast.success("성공적으로 전송 되었습니다.");
      setDialogObj({
        ...dialogObj,
        testSend: false
      })
      setTestSendObj({
        id: '',
        text: '',
        receiver:'',
      })
    }
  }
  return (
    <>
      <Dialog
        open={dialogObj.testSend}
        onClose={() => {
          setDialogObj({
            ...dialogObj,
            testSend: false
          })
          setTestSendObj({
            id: '',
            text: '',
            receiver:'',
          })
        }}
      >
        <DialogTitle>{`테스트발송`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            테스트발송할 텍스트를 입력해 주세요.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            value={testSendObj?.receiver}
            margin="dense"
            label="수신자 전화번호"
            onChange={(e) => {
              setTestSendObj({
                ...testSendObj,
                receiver: e.target.value
              })

            }}
          />
          <TextField
            fullWidth
            value={testSendObj.text}
            margin="dense"
            label="텍스트"
            onChange={(e) => {
              setTestSendObj({
                ...testSendObj,
                text: e.target.value
              })

            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onTestSend}>
            전송
          </Button>
          <Button color="inherit" onClick={() => {
            setDialogObj({
              ...dialogObj,
              testSend: false
            })
            setTestSendObj({
              id: '',
              text: '',
              receiver:'',
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
            add_button_text={'발신자 추가'}
          />
        </Card>
      </Stack>
    </>
  )
}
SenderList.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default SenderList
