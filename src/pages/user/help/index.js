import { Stack, Tab, Tabs, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import styled from "styled-components";

const BannerContainer = styled.div`
    width:100%;
    padding: 80px 0;
    background-image: url('/assets/images/contact/hero.jpg');
    background-size: cover;
    display:flex;
    flex-direction:column;
`

const Help = () => {
    const router = useRouter();

    const { user } = useAuthContext();
    const [currentTab, setCurrentTab] = useState(0);
    const [questObj, setQuestObj] = useState({
        title: '',
        note: ''
    })
    useEffect(() => {
        if (!user) {
            router.push('/user/login')
        }
        setCurrentTab(parseInt(router.query?.type ?? 0));
        setQuestObj({
            title: '',
            note: ''
        })
    }, [router.query])
    return (
        <>
            <BannerContainer>
                {zTabMenu['help'].map((item, idx) => {
                    if (currentTab == idx) {
                        return <>
                            <Title style={{ color: '#fff', margin: 'auto' }}>{item.banner.title}</Title>
                            <Title2 style={{ color: '#fff', margin: '2rem auto auto auto', fontWeight: 'normal', textAlign: 'center' }}>{item.banner.sub_title}</Title2>
                        </>
                    }
                })}
            </BannerContainer>
            <Wrappers>


                {user ?
                    <>
                        <Tabs
                            indicatorColor='primary'
                            textColor='primary'
                            scrollButtons='false'
                            value={currentTab}
                            sx={{
                                width: '100%',
                                margin: '2rem 0',
                            }}
                        >
                            {zTabMenu['help'].map((item, idx) => {
                                return <>
                                    <Tab value={idx} label={item.title} style={{ flexGrow: 1 }} onClick={() => {
                                        router.push(`/user/help?type=${idx}`)
                                    }} />
                                </>
                            })}

                        </Tabs>
                        {currentTab == 0 &&
                            <>
                                <Stack spacing={3}>
                                    <TextField
                                        label="제목"
                                        value={questObj.title}
                                        onChange={(e) => {
                                            setQuestObj({
                                                ...questObj,
                                                ['title']: e.target.value
                                            })
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="문의 내용"
                                        multiline
                                        rows={4}
                                        value={questObj.note}
                                        onChange={(e) => {
                                            setQuestObj({
                                                ...questObj,
                                                ['note']: e.target.value
                                            })
                                        }}
                                    />
                                </Stack>
                            </>}
                        {currentTab == 1 &&
                            <>
                                <Stack spacing={3}>
                                    <TextField
                                        label="제목"
                                        value={questObj.title}
                                        onChange={(e) => {
                                            setQuestObj({
                                                ...questObj,
                                                ['title']: e.target.value
                                            })
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="기능요청 내용"
                                        multiline
                                        rows={4}
                                        value={questObj.note}
                                        onChange={(e) => {
                                            setQuestObj({
                                                ...questObj,
                                                ['note']: e.target.value
                                            })
                                        }}
                                    />
                                </Stack>
                            </>}
                        {currentTab == 2 &&
                            <>
                            
                            </>}
                    </>
                    :
                    <>

                    </>}


            </Wrappers>

        </>
    )
}
Help.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Help;