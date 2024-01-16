import { Icon } from "@iconify/react";
import { Button, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import HomeBanner from "src/views/section/HomeBanner";
import styled from "styled-components";

const BannerContainer = styled.div`
    width:100%;
    padding: 160px 0;
    background-size: cover;
    display:flex;
    flex-direction:column;
    @media (max-width:1000px) {
        padding: 80px 0;
    }
`
const ServiceInfo = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    const { themeDnsData, themePostCategoryList } = useSettingsContext();
    const [contentList, setContentList] = useState([]);

    const [posts, setPosts] = useState({});

    useEffect(() => {
        if (themeDnsData?.id > 0) {
            mainPageSetting();
        }
    }, [themeDnsData])
    const mainPageSetting = async () => {
        console.log(themeDnsData)
        setContentList(themeDnsData?.main_obj);
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: `url(${themeDnsData?.main_banner_img || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>회사소개</Title>
            </BannerContainer>
            <Wrappers>
                {contentList.map((content, index) => (
                    <>

                    </>
                ))}
            </Wrappers>
        </>
    )
}
ServiceInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ServiceInfo;