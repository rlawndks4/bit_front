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
    background-color: #aaa;
    flex-direction:column;
    @media (max-width:1000px) {
        padding: 80px 0;
    }
`
const PcImg = styled.img`
display: flex;
@media (max-width:1000px) {
    display: none;
}
`
const MobileImg = styled.img`
display: none;
@media (max-width:1000px) {
    display: flex;
}
`
const Content = styled.div`
display: flex;
flex-wrap: wrap;
margin:2rem 0;
justify-content: space-between;
`
const ServiceInfo = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    const { themeDnsData, themePostCategoryList } = useSettingsContext();
    const [contentList, setContentList] = useState([]);

    const [itemTab, setItemTab] = useState(0);
    useEffect(() => {
        if (themeDnsData?.id > 0) {
            mainPageSetting();
        }
    }, [themeDnsData])

    const mainPageSetting = async () => {
        setContentList(themeDnsData?.guide_obj);
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${themeDnsData?.guide_banner_img || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>이용절차 및 상품안내</Title>
            </BannerContainer>
            <Wrappers>
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
                            {content.type == 'procedure_img' &&
                                <>
                                    <Title2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                        {themeDnsData?.name} 이용절차
                                    </Title2>
                                    <PcImg src={content?.img} />
                                    <MobileImg src={content?.mobile_img} />
                                </>}
                            {content.type == 'product_info' &&
                                <>
                                    <Title2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                        {themeDnsData?.name} 상품안내
                                    </Title2>
                                    <Row style={{ columnGap: '1rem' }}>
                                        {content?.list && content?.list.map((cont, idx) => (
                                            <>
                                                <Button variant={idx == itemTab ? 'contained' : 'outlined'} style={{ width: '33%', height: '48px' }} onClick={() => {
                                                    setItemTab(idx)
                                                }} >{cont?.title}</Button>
                                            </>
                                        ))}
                                    </Row>
                                    {content?.list && content?.list.map((cont, idx) => (
                                        <>
                                            <Content style={{ flexDirection: `${idx % 2 == 0 ? 'row' : 'row-reverse'}` }}>
                                                <Col>
                                                    <Title2>{cont?.title}</Title2>
                                                    <Title3>{cont?.sub_title}</Title3>
                                                    <div style={{ maxWidth: '500px' }}>{cont?.note}</div>
                                                </Col>
                                                <img src={cont?.img} style={{ maxWidth: '400px' }} />
                                            </Content>
                                        </>
                                    ))}
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