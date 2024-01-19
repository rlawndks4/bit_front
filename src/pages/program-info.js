import { Icon } from "@iconify/react";
import { Button, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, FadeInUp, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import HomeBanner from "src/views/section/HomeBanner";
import styled from "styled-components";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
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
        setContentList(themeDnsData?.program_info_obj);
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${themeDnsData?.program_info_banner_img || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>프로그램소개</Title>
            </BannerContainer>
            <Wrappers style={{ maxWidth: '3000px', width: '100%' }}>
                {contentList.map((content, index) => (
                    <>
                        <FadeInUp style={{ marginTop: `${content.type == 'img' ? '0' : '2rem'}` }}>
                            {content.type == 'editor' &&
                                <>
                                    <ReactQuill
                                        className='none-padding'
                                        value={content?.content ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                        bounds={'.app'}
                                    />
                                </>}
                            {content.type == 'img' &&
                                <>
                                    <img src={content?.img} style={{ width: '100%' }} />
                                </>}
                        </FadeInUp>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
ServiceInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ServiceInfo;
//@@@@@@@@@@@@