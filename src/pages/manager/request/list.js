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
const RequestList = () => {
  const { user } = useAuthContext();
  const { setModal } = useModal();
  const [showApiKeyId, setShowApiKeyId] = useState(undefined);
  const defaultHeadColumns = []
  const defaultColumns = [
    {
      id: 'name',
      label: '이름',
      action: (row) => {
        return row['name'] ?? "---"
      }
    },
    {
      id: 'phone_num',
      label: '연락처',
      action: (row) => {
        return row['phone_num'] ?? "---"
      }
    },
    {
      id: 'recommend_name',
      label: '추천인',
      action: (row) => {
        return row['recommend_name'] ?? "---"
      }
    },
    {
      id: 'note',
      label: '내용',
      action: (row) => {
        return row['note'] ?? "---"
      }
    },
    {
      id: 'created_at',
      label: '생성일',
      action: (row) => {
        return row['created_at'] ?? "---"
      }
    },
    {
      id: 'delete',
      label: '삭제',
      action: (row) => {
        return (
          <>
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
    let data_ = await apiManager('requests', 'list', obj);
    if (data_) {
      setData(data_);
    }
    setSearchObj(obj);
  }
  const deleteItem = async (id) => {
    let data = await apiManager('requests', 'delete', { id });
    if (data) {
      onChangePage(searchObj);
    }
  }
  return (
    <>
      <Stack spacing={3}>
        <Card>
          <ManagerTable
            data={data}
            columns={columns}
            head_columns={defaultHeadColumns}
            searchObj={searchObj}
            onChangePage={onChangePage}
          />
        </Card>
      </Stack>
    </>
  )
}
RequestList.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default RequestList
