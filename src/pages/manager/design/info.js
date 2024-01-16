
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
const InfoEdit = () => {
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
            type: 'content_two',
            label: '설명 두개',
            list: [
                {
                    content: '',
                    img: '',
                },
                {
                    content: '',
                    img: '',
                },
            ]
        },
        {
            type: 'img',
            label: '이미지',
            img: ''
        },
        {
            type: 'ideology_three',
            label: '경영이념 3가지',
            list: [
                {
                    title: '',
                    note: '',
                    img: '',
                },
                {
                    title: '',
                    note: '',
                    img: '',
                },
                {
                    title: '',
                    note: '',
                    img: '',
                },
            ],
        },
        {
            type: 'history',
            label: '역사',
            content: '',
        },
        {
            type: 'road',
            label: '오시는길',
            content: '',
        },
    ]
    useEffect(() => {
        settingPage();
    }, [])
    const settingPage = async () => {
        let brand_data = await apiManager('brands', 'get', {
            id: router.query.id || themeDnsData?.id
        })
        if (brand_data?.info_obj?.length == 0) {
            setObjList(defaultList);
        } else {
            setObjList(brand_data?.info_obj);
        }
        setItem(brand_data);
        setLoading(false);
    }
    const onSave = async () => {
        let result = undefined
        result = await apiManager('brands', 'update', { ...item, info_obj: objList });
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
                                            회사소개 배너
                                        </Typography>
                                        <Upload file={item.info_banner_file || item.info_banner_img} onDrop={(acceptedFiles) => {
                                            const newFile = acceptedFiles[0];
                                            if (newFile) {
                                                setItem(
                                                    {
                                                        ...item,
                                                        ['info_banner_file']: Object.assign(newFile, {
                                                            preview: URL.createObjectURL(newFile),
                                                        })
                                                    }
                                                );
                                            }
                                        }} onDelete={() => {
                                            setItem(
                                                {
                                                    ...item,
                                                    ['info_banner_img']: '',
                                                    ['info_banner_file']: undefined,
                                                }
                                            )
                                        }}
                                        />
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
                                                {content.type == 'content_two' &&
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
                                                                <ReactQuill
                                                                    className="max-height-editor"
                                                                    theme={'snow'}
                                                                    id={'note'}
                                                                    placeholder={''}
                                                                    value={cont.content}
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
                                                                        obj_list[index].list[idx].content = note;
                                                                        setObjList(obj_list);
                                                                    }} />
                                                            </>
                                                        ))}

                                                    </>}
                                                {content.type == 'img' &&
                                                    <>
                                                        <Upload file={content.img}
                                                            onDrop={async (acceptedFiles) => {
                                                                const newFile = acceptedFiles[0];
                                                                const response = await apiManager('upload/single', 'create', {
                                                                    post_file: newFile
                                                                });
                                                                let obj_list = [...objList];
                                                                obj_list[index].img = response?.url;
                                                                setObjList(obj_list);
                                                            }}
                                                            onDelete={() => {
                                                                let obj_list = [...objList];
                                                                obj_list[index].img = '';
                                                                setObjList(obj_list);
                                                            }}
                                                        />
                                                    </>}
                                                {content.type == 'ideology_three' &&
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
                                                {content.type == 'history' &&
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
                                                {content.type == 'road' &&
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
InfoEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default InfoEdit
