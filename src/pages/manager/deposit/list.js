import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ManagerTable from "src/sections/manager/table/ManagerTable";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { Col, Row } from "src/components/elements/styled-components";
import { toast } from "react-hot-toast";
import { useModal } from "src/components/dialog/ModalProvider";
import ManagerLayout from "src/layouts/manager/ManagerLayout";
import { apiManager } from "src/utils/api-manager";
import { useAuthContext } from "src/auth/useAuthContext";
import { commarNumber, returnMoment } from "src/utils/function";
const DepositList = () => {
  const { user } = useAuthContext();
  const { setModal } = useModal();
  const [showApiKeyId, setShowApiKeyId] = useState(undefined);
  const defaultHeadColumns = [
    {
      title: '기본정보',
      count: 2,
    },
    {
      title: '유저정보',
      count: 2
    },

  ]
  const defaultColumns = [
    {
      id: 'id',
      label: 'No.',
      action: (row) => {
        return commarNumber(row['id'])
      }
    },
    {
      id: 'deposit',
      label: '예치금액',
      action: (row) => {
        return `${row['deposit'] > 0 ? '+' : ''}` + commarNumber(row['deposit'])
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
      id: 'total_deposit',
      label: '누적예치금액',
      action: (row) => {
        return commarNumber(row['total_deposit'])
      }
    },
    {
      id: 'type',
      label: '추가/감소',
      action: (row) => {
        if (row.type == 0) {
          return <Chip variant="soft" label='추가건' color="success" />
        } else if (row.type == 1) {
          return <Chip variant="soft" label='감소건' color="error" />
        } else {
          return "---"

        }
      }
    },
    {
      id: 'method_type',
      label: '발생타입',
      action: (row) => {
        return row['method_type_str'] ?? "---"
      }
    },
    {
      id: 'created_at',
      label: '발생일',
      action: (row) => {
        return row['created_at'] ?? "---"
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
    let data_ = await apiManager('deposits', 'list', obj);
    if (data_) {
      setData(data_);
    }
    setSearchObj(obj);
  }
  const deleteItem = async (id) => {
    let data = await apiManager('deposits', 'delete', { id });
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
            add_button_text={'예치금 추가'}
          />
        </Card>
      </Stack>
    </>
  )
}
DepositList.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default DepositList
