import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
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
import { m } from 'framer-motion'
import { varFade } from "src/components/animate";
import { commarNumber } from "src/utils/function";
import { MSG_TYPE_LIST } from "src/utils/format";
const KakaoTempleteList = () => {
    const { user } = useAuthContext();
    const { setModal } = useModal();
    const [showApiKeyId, setShowApiKeyId] = useState(undefined);
    const defaultHeadColumns = [
        {
            title: '템플릿정보',
            count: 3,
        },
        {
            title: '카카오채널정보',
            count: 3,
        },
        {
            title: '유저정보',
            count: 3
        },

    ]
    const defaultColumns = [
        {
            id: 'nickname',
            label: '별칭',
            action: (row) => {
                return row['nickname'] ?? "---"
            }
        },
        {
            id: 'tpl_code',
            label: '템플릿코드',
            action: (row) => {
                return row['tpl_code'] ?? "---"
            }
        },
        {
            id: 'msg_type',
            label: '메세지타입',
            action: (row) => {
                return MSG_TYPE_LIST[row['msg_type']] ?? '---'
            }
        },
        {
            id: 'channel_user_name',
            label: '카카오채널아이디',
            action: (row) => {
                return row['channel_user_name'] ?? "---"
            }
        },
        {
            id: 'sender',
            label: '카카오채널휴대폰번호',
            action: (row) => {
                return row['sender'] ?? "---"
            }
        },
        {
            id: 'senderkey',
            label: '발신키',
            action: (row) => {
                return row['senderkey'] ?? "---"
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
            id: 'kakao_token',
            label: '카카오토큰',
            action: (row) => {
                return <Accordion key={row?.id} style={{ boxShadow: "none", background: 'transparent', width: '200px', wordBreak: 'break-all' }} disabled={!(row?.api_key)}>
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
            id: 'status',
            label: '상태',
            action: (row) => {
                return <Select
                    size="small"
                    defaultValue={row?.status}
                    onChange={async (e) => {
                        let result = await apiManager(`util/templetes/status`, 'create', {
                            id: row?.id,
                            value: e.target.value
                        })
                    }}
                >
                    <MenuItem value={0}>{'정상'}</MenuItem>
                    <MenuItem value={1}>{'검토중'}</MenuItem>
                    <MenuItem value={2}>{'차단됨'}</MenuItem>
                </Select>
            },
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
                                user_id: row?.user_name,
                                api_key: row?.api_key,
                                sender: row?.sender,
                                token: row?.kakao_token,
                                tpl_code: row?.tpl_code,
                                senderkey: row?.senderkey,
                                button_1: { button: row?.button_obj }
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
    const [testSendObj, setTestSendObj] = useState({})
    useEffect(() => {
        pageSetting();
    }, [])
    const pageSetting = () => {
        let cols = defaultColumns;
        setColumns(cols)
        onChangePage({ ...searchObj, page: 1, });
    }
    const onChangePage = async (obj_) => {
        setData({
            ...data,
            content: undefined
        })
        let obj = obj_;
        if (router.query?.channel_id > 0) {
            obj['channel_id'] = router.query?.channel_id;
        }
        let data_ = await apiManager('templetes', 'list', obj);
        if (data_) {
            setData(data_);
        }
        setSearchObj(obj);
    }
    const deleteItem = async (id) => {
        let data = await apiManager('templetes', 'delete', { id });
        if (data) {
            onChangePage(searchObj);
        }
    }
    const onTestSend = async () => {
        let result = await apiApiServer(`alimtalk/v1/send`, 'create', { ...testSendObj });
        if (result) {
            toast.success("성공적으로 전송 되었습니다.");
            setDialogObj({
                ...dialogObj,
                testSend: false
            })
            setTestSendObj({})
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
                    setTestSendObj({})
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
                        value={testSendObj?.receiver_1}
                        margin="dense"
                        label="수신자 전화번호1"
                        onChange={(e) => {
                            setTestSendObj({
                                ...testSendObj,
                                receiver_1: e.target.value
                            })

                        }}
                    />
                    <TextField
                        fullWidth
                        value={testSendObj?.subject_1}
                        margin="dense"
                        label="제목1"
                        onChange={(e) => {
                            setTestSendObj({
                                ...testSendObj,
                                subject_1: e.target.value
                            })

                        }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={testSendObj.msg_1}
                        margin="dense"
                        label="텍스트"
                        onChange={(e) => {
                            setTestSendObj({
                                ...testSendObj,
                                msg_1: e.target.value
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
                        setTestSendObj({})
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
                        add_button_text={'카카오템플릿 추가'}
                    />
                </Card>
            </Stack>
        </>
    )
}
KakaoTempleteList.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default KakaoTempleteList
