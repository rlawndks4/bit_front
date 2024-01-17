
import { Avatar, Button, Card, CardHeader, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, Tab, Tabs, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, themeObj } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { Upload } from "src/components/upload";
import { base64toFile, getAllIdsWithParents } from "src/utils/function";
import styled from "styled-components";
import { defaultManagerObj, react_quill_data } from "src/data/manager-data";
import { axiosIns } from "src/utils/axios";
import { toast } from "react-hot-toast";
import { useModal } from "src/components/dialog/ModalProvider";
import dynamic from "next/dynamic";
import axios from "axios";
import { useAuthContext } from "src/auth/useAuthContext";
import ManagerLayout from "src/layouts/manager/ManagerLayout";
import { apiManager } from "src/utils/api-manager";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const MainEdit = () => {
    const { setModal } = useModal()
    const { themeDnsData } = useSettingsContext();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(defaultManagerObj.brands)
    const [objList, setObjList] = useState([]);
    const defaultList = [
        {
            type: 'editor',
            label: '설명',
            content: ''
        },
        {
            type: 'video_two',
            label: '비디오 두개',
            list: [
                {
                    title: '',
                    sub_title: '',
                    link: '',
                },
                {
                    title: '',
                    sub_title: '',
                    link: '',
                },
            ]
        },
        {
            type: 'editor',
            label: '계좌수익',
            content: ''
        },
        {
            type: 'tow_box',
            label: '계좌수익서류 이미지 두개',
            list: [
                { img: '' },
                { img: '' },
            ],
        },
        {
            type: 'real_revenue',
            label: '실제 수익률 두개',
            list: [
                {
                    title: '',
                    note: '',
                    customer: '',
                    img: '',
                },
                {
                    title: '',
                    note: '',
                    customer: '',
                    img: '',
                },
            ]
        },
        {
            type: 'customer_kakao',
            label: '고객들 카톡대화',
            list: [
                {
                    img: '',
                },
                {
                    img: '',
                },
                {
                    img: '',
                },
                {
                    img: '',
                },
            ]
        },
        {
            type: 'why_select',
            label: '왜 선택해야 할까요',
            list: [
                {
                    img: '',
                    title: '',
                    note: '',
                },
                {
                    img: '',
                    title: '',
                    note: '',
                },
                {
                    img: '',
                    title: '',
                    note: '',
                },
                {
                    img: '',
                    title: '',
                    note: '',
                },
            ]
        },
    ]
    useEffect(() => {
        settingPage();
    }, [])
    const settingPage = async () => {
        let brand_data = await apiManager('brands', 'get', {
            id: router.query.id || themeDnsData?.id
        })
        if (brand_data?.main_obj?.length == 0) {
            setObjList(defaultList);
        } else {
            setObjList(brand_data?.main_obj);
        }
        setItem(brand_data);
        setLoading(false);
    }
    const onSave = async () => {
        let result = undefined
        result = await apiManager('brands', 'update', { ...item, main_obj: objList });
        if (result) {
            toast.success("성공적으로 저장 되었습니다.");
            window.location.reload();
        }
    }
    return (
        <>
            {!loading &&
                <>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <Card sx={{ p: 2, height: '100%' }}>
                                <Stack spacing={3}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                            메인페이지 배너
                                        </Typography>
                                        <Upload file={item.main_banner_file || item.main_banner_img} onDrop={(acceptedFiles) => {
                                            const newFile = acceptedFiles[0];
                                            if (newFile) {
                                                setItem(
                                                    {
                                                        ...item,
                                                        ['main_banner_file']: Object.assign(newFile, {
                                                            preview: URL.createObjectURL(newFile),
                                                        })
                                                    }
                                                );
                                            }
                                        }} onDelete={() => {
                                            setItem(
                                                {
                                                    ...item,
                                                    ['main_banner_img']: '',
                                                    ['main_banner_file']: undefined,
                                                }
                                            )
                                        }}
                                        />

                                        <TextField
                                            label={'제목'}
                                            value={item.main_banner_text}
                                            onChange={(e) => {
                                                setItem(
                                                    {
                                                        ...item,
                                                        ['main_banner_text']: e.target.value,
                                                    }
                                                )
                                            }} />
                                    </Stack>
                                </Stack>
                            </Card>
                        </Grid>
                        {objList.map((content, index) => (
                            <>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ p: 2, height: '100%' }}>
                                        <Stack spacing={3}>
                                            <Stack spacing={1}>
                                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                                    {content?.label}
                                                </Typography>
                                                {content.type == 'editor' &&
                                                    <>
                                                        <ReactQuill
                                                            className="max-height-editor"
                                                            theme={'snow'}
                                                            id={'note'}
                                                            placeholder={''}
                                                            value={content.content}
                                                            modules={react_quill_data.modules}
                                                            formats={react_quill_data.formats}
                                                            onChange={async (e) => {
                                                                let note = e;
                                                                if (e.includes('<img src="') && e.includes('base64,')) {
                                                                    let base64_list = e.split('<img src="');
                                                                    for (var i = 0; i < base64_list.length; i++) {
                                                                        if (base64_list[i].includes('base64,')) {
                                                                            let img_src = base64_list[i];
                                                                            img_src = await img_src.split(`"></p>`);
                                                                            let base64 = img_src[0];
                                                                            img_src = await base64toFile(img_src[0], 'note.png');
                                                                            const response = await apiManager('upload/single', 'create', {
                                                                                post_file: img_src
                                                                            });
                                                                            note = await note.replace(base64, response?.url)
                                                                        }
                                                                    }
                                                                }
                                                                let obj_list = [...objList];
                                                                obj_list[index].content = note;
                                                                setObjList(obj_list);
                                                            }} />
                                                    </>}
                                                {content.type == 'video_two' &&
                                                    <>
                                                        {content?.list && content?.list.map((cont, idx) => (
                                                            <>
                                                                <TextField
                                                                    label={'제목'}
                                                                    value={cont.title}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].title = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                                <TextField
                                                                    label='부제목'
                                                                    value={cont.sub_title}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].sub_title = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                                <TextField
                                                                    label='유튜브링크'
                                                                    value={cont.link}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].link = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                            </>
                                                        ))}

                                                    </>}
                                                {content.type == 'tow_box' &&
                                                    <>
                                                        {content?.list && content?.list.map((cont, idx) => (
                                                            <>
                                                                <Upload file={cont.img}
                                                                    onDrop={async (acceptedFiles) => {
                                                                        const newFile = acceptedFiles[0];
                                                                        const response = await apiManager('upload/single', 'create', {
                                                                            post_file: newFile
                                                                        });
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = response?.url;
                                                                        setObjList(obj_list);
                                                                    }}
                                                                    onDelete={() => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = '';
                                                                        setObjList(obj_list);
                                                                    }}
                                                                />
                                                            </>
                                                        ))}

                                                    </>}
                                                {content.type == 'real_revenue' &&
                                                    <>
                                                        {content?.list && content?.list.map((cont, idx) => (
                                                            <>
                                                                <TextField
                                                                    label={'제목'}
                                                                    value={cont.title}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].title = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                                <TextField
                                                                    label='설명'
                                                                    value={cont.note}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].note = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                                <TextField
                                                                    label='고객명'
                                                                    value={cont.customer}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].customer = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                                <Upload file={cont.img}
                                                                    onDrop={async (acceptedFiles) => {
                                                                        const newFile = acceptedFiles[0];
                                                                        const response = await apiManager('upload/single', 'create', {
                                                                            post_file: newFile
                                                                        });
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = response?.url;
                                                                        setObjList(obj_list);
                                                                    }}
                                                                    onDelete={() => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = '';
                                                                        setObjList(obj_list);
                                                                    }}
                                                                />
                                                            </>
                                                        ))}
                                                    </>}
                                                {content.type == 'customer_kakao' &&
                                                    <>
                                                        {content?.list && content?.list.map((cont, idx) => (
                                                            <>
                                                                <Upload file={cont.img}
                                                                    onDrop={async (acceptedFiles) => {
                                                                        const newFile = acceptedFiles[0];
                                                                        const response = await apiManager('upload/single', 'create', {
                                                                            post_file: newFile
                                                                        });
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = response?.url;
                                                                        setObjList(obj_list);
                                                                    }}
                                                                    onDelete={() => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = '';
                                                                        setObjList(obj_list);
                                                                    }}
                                                                />
                                                            </>
                                                        ))}
                                                    </>}
                                                {content.type == 'why_select' &&
                                                    <>
                                                        {content?.list && content?.list.map((cont, idx) => (
                                                            <>
                                                                <TextField
                                                                    label={'제목'}
                                                                    value={cont.title}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].title = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                                <TextField
                                                                    label='설명'
                                                                    value={cont.note}
                                                                    onChange={(e) => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].note = e.target.value;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                                <Upload file={cont.img}
                                                                    onDrop={async (acceptedFiles) => {
                                                                        const newFile = acceptedFiles[0];
                                                                        const response = await apiManager('upload/single', 'create', {
                                                                            post_file: newFile
                                                                        });
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = response?.url;
                                                                        setObjList(obj_list);
                                                                    }}
                                                                    onDelete={() => {
                                                                        let obj_list = [...objList];
                                                                        obj_list[index].list[idx].img = '';
                                                                        setObjList(obj_list);
                                                                    }}
                                                                />
                                                            </>
                                                        ))}
                                                    </>}
                                            </Stack>
                                        </Stack>
                                    </Card>
                                </Grid>
                            </>
                        ))}

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
MainEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default MainEdit
