import { Button, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import styled from "styled-components";

const BannerContainer = styled.div`
    width:100%;
    padding: 80px 0;
    background-image: url('/assets/background/overlay_4.jpg');
    background-size: cover;
    display:flex;
    flex-direction:column;
`
export const service_info_content = [

];
const ServiceInfo = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    return (
        <>
            <BannerContainer>
                {zTabMenu['service-info'].map((item, idx) => {
                    if (currentTab == idx) {
                        return <>
                            <Title style={{ color: '#fff', margin: 'auto' }}>{item.banner.title}</Title>
                            <Title2 style={{ color: '#fff', margin: '2rem auto auto auto', fontWeight: 'normal', textAlign: 'center' }}>{item.banner.sub_title}</Title2>
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
                    {zTabMenu['service-info'].map((item, idx) => {
                        return <>
                            <Tab value={idx} label={item.title} style={{ flexGrow: 1 }} onClick={() => {
                                router.push(`/user/service-info?type=${idx}`)
                            }} />
                        </>
                    })}
                </Tabs>
                {currentTab == 0 &&
                    <>

                    </>}
                {currentTab == 1 &&
                    <>

                    </>}
                {currentTab == 2 &&
                    <>

                    </>}
                {currentTab == 3 &&
                    <>

                    </>}
            </Wrappers>
        </>
    )
}
ServiceInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ServiceInfo;