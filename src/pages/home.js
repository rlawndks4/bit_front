import { Icon } from "@iconify/react";
import { Button, Card, Grid, Tab, Tabs } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlackText, Col, RedText, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import { makeYoutubeEmbed } from "src/utils/function";
import HomeBanner from "src/views/section/HomeBanner";
import styled from "styled-components";

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const BannerContainer = styled.div`
    width:100%;
    padding: 20vw 0;
    background-size: cover;
    display:flex;
    flex-direction:column;
    @media (max-width:1000px) {
        background-position: center;
        padding: 20vh 0;
    }
`
const RowMobileCol = styled.div`
display: flex;
@media (max-width:1000px) {
       flex-direction: column;
}
`
const VideoHarfContent = styled.div`
margin-top: 1rem;
width: 50%;
display: flex;
flex-direction: column;
text-align: center;
row-gap: 0.5rem;
@media (max-width:1000px) {
    width:100%;
}
`
const Video = styled.iframe`
height: 350px;
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
                <Title style={{ color: '#fff', margin: 'auto', fontSize: '1.5rem', maxWidth: '500px', textAlign: 'center' }}>{themeDnsData?.main_banner_text}</Title>
            </BannerContainer>
            <Wrappers>
                {contentList.map((content, index) => (
                    <>
                        <div style={{ marginTop: '2rem' }} >
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
                            {content.type == 'video_two' &&
                                <>
                                    <RowMobileCol>
                                        {content?.list && content?.list.map((cont, idx) => (
                                            <>

                                                <VideoHarfContent>
                                                    <BlackText>{cont.title}</BlackText>
                                                    <RedText>{cont.sub_title}</RedText>
                                                    <Video src={makeYoutubeEmbed(cont.link)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Video>
                                                </VideoHarfContent>
                                            </>
                                        ))}
                                    </RowMobileCol>
                                </>}
                            {content.type == 'tow_box' &&
                                <>
                                    <Grid container spacing={3}>

                                        {content?.list && content?.list.map((cont, idx) => (
                                            <>
                                                <Grid item xs={12} md={6}>
                                                    <Card sx={{ p: 2, height: '100%' }}>
                                                        <img src={cont.img} />
                                                    </Card>
                                                </Grid>
                                            </>
                                        ))}

                                    </Grid>
                                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                        정식으로 인증받은 법무법인 수익률 사실 공증내역<br />
                                        (※타사의 무단도용 시 법적처벌 및 손해배상을 청구할 수 있습니다.)
                                    </div>
                                </>}
                            {content.type == 'real_revenue' &&
                                <>
                                    {content?.list && content?.list.map((cont, idx) => (
                                        <>

                                        </>
                                    ))}
                                </>}
                            {content.type == 'customer_kakao' &&
                                <>
                                    {content?.list && content?.list.map((cont, idx) => (
                                        <>

                                        </>
                                    ))}
                                </>}
                            {content.type == 'why_select' &&
                                <>
                                    {content?.list && content?.list.map((cont, idx) => (
                                        <>

                                        </>
                                    ))}
                                </>}
                        </div>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
ServiceInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ServiceInfo;
//@@@@@@@@@@@@