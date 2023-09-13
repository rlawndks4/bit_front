import { Button, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { KAKAO_OBJ, zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import MsgList from "src/views/user/api/msg/list";
import MsgRemain from "src/views/user/api/msg/remain";
import MsgSend from "src/views/user/api/msg/send";
import MsgSendMass from "src/views/user/api/msg/send-mass";
import styled from "styled-components";

const BannerContainer = styled.div`
    width:100%;
    padding: 80px 0;
    background-image: url('/assets/images/background/api-bg.webp');
    background-size: cover;
    display:flex;
    flex-direction:column;
`

const Api = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    return (
        <>
            <BannerContainer>
                {zTabMenu['api'].map((item, idx) => {
                    if (currentTab == idx) {
                        return <>
                            <Title style={{ color: '#fff', margin: 'auto' }}>{item.banner.title}</Title>
                            <Title2 style={{ color: '#fff', margin: '2rem auto auto auto', fontWeight: 'normal', textAlign: 'center' }}>{item.banner.sub_title}</Title2>
                            <Button variant="contained" style={{ width: '250px', height: '64px', margin: '2rem auto auto auto', color: `${idx != 0 ? KAKAO_OBJ.FONT_COLOR : ''}`, background: `${idx != 0 ? KAKAO_OBJ.BACKGROUND : ''}` }} onClick={() => {
                                router.push(item.banner.button_link)
                            }}>
                                {item.banner.button_text}
                            </Button>
                        </>
                    }
                })}
            </BannerContainer>
            <Wrappers>
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
                    {zTabMenu['api'].map((item, idx) => {
                        return <>
                            <Tab value={idx} label={item.title} style={{ flexGrow: 1 }} onClick={() => {
                                router.push(`/user/api?type=${idx}`)
                            }} />
                        </>
                    })}
                </Tabs>
                {currentTab == 0 &&
                    <>
                        <MsgSend />
                        <MsgSendMass />
                        <MsgList />
                        <MsgRemain />
                    </>}
                {currentTab == 1 &&
                    <>

                    </>}
                {currentTab == 2 &&
                    <>

                    </>}
            </Wrappers>

        </>
    )
}
Api.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Api;