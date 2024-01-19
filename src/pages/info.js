import { Icon } from "@iconify/react";
import { Button, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, FadeInUp, Row, Title, Title2, Title3, Wrappers, themeObj } from "src/components/elements/styled-components";
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
const Container = styled.div`
display: flex;
flex-wrap: wrap;
column-gap: 4%;
row-gap: 2rem;
`
const Content = styled.div`
display: flex;
flex-direction: column;
width: 48%;
row-gap: 2rem;
@media (max-width:1000px) {
    width: 100%;
    row-gap: 1rem;
}
`
const IdeologyContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 33%;
row-gap: 1rem;
`
const IdeologyImg = styled.img`
height: 100px;
`
const ServiceInfo = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    const { themeDnsData, themePostCategoryList } = useSettingsContext();
    const [contentList, setContentList] = useState([]);

    useEffect(() => {
        if (themeDnsData?.id > 0) {
            mainPageSetting();
        }
    }, [themeDnsData])

    const mainPageSetting = async () => {
        setContentList(themeDnsData?.info_obj);
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${themeDnsData?.info_banner_img || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>회사소개</Title>
            </BannerContainer>
            <Wrappers style={{ maxWidth: '1200px' }}>
                {contentList.map((content, index) => (
                    <>
                        <FadeInUp style={{ marginTop: '4rem' }}>
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
                            {content.type == 'content_two' &&
                                <>
                                    <Container>
                                        {content?.list && content?.list.map((cont, idx) => (
                                            <>
                                                <Content style={{ flexDirection: `${(idx % 2 == 0 && window.innerWidth > 1000) ? 'column-reverse' : ''}` }}>
                                                    <img src={cont?.img} />
                                                    <ReactQuill
                                                        className='none-padding'
                                                        value={cont?.content ?? `<body></body>`}
                                                        readOnly={true}
                                                        theme={"bubble"}
                                                        bounds={'.app'}
                                                    />
                                                </Content>
                                            </>
                                        ))}
                                    </Container>
                                </>}
                            {content.type == 'img' &&
                                <>
                                    <img src={content?.img} style={{ width: '100%' }} />
                                </>}
                            {content.type == 'ideology_three' &&
                                <>
                                    <Title2 style={{ textAlign: 'center' }}>
                                        {themeDnsData?.name}의 이념
                                    </Title2>
                                    <Row style={{ flexWrap: 'wrap', marginTop: '2rem' }}>
                                        {content?.list && content?.list.map((cont, idx) => (
                                            <>
                                                <IdeologyContainer>
                                                    <IdeologyImg src={cont?.img} />
                                                    <Title2>{cont?.title}</Title2>
                                                    <Title3 style={{ maxWidth: '200px', textAlign: 'center', margin: 'auto', color: themeObj.grey[500] }}>{cont?.note}</Title3>
                                                </IdeologyContainer>
                                            </>
                                        ))}
                                    </Row>
                                </>}
                            {content.type == 'history' &&
                                <>
                                    <Title2 style={{ textAlign: 'center' }}>
                                        {themeDnsData?.name}의 역사
                                    </Title2>
                                    <ReactQuill
                                        className='none-padding'
                                        value={content?.content ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                        bounds={'.app'}
                                    />
                                </>}
                            {content.type == 'road' &&
                                <>
                                    <Title2 style={{ textAlign: 'center' }}>
                                        오시는 길
                                    </Title2>
                                    <ReactQuill
                                        className='none-padding'
                                        value={content?.content ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                        bounds={'.app'}
                                    />
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