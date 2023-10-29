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
    padding: 80px 0;
    background-size: cover;
    display:flex;
    flex-direction:column;
`
export const service_info_content = [
    { img: '', title: '', note: '' },
    { img: '', title: '', note: '' },
    { img: '', title: '', note: '' },
    { img: '', title: '', note: '' },
];
const ServiceInfo = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    const { themeDnsData, themePostCategoryList } = useSettingsContext();
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const [contentList, setContentList] = useState([]);

    const [posts, setPosts] = useState({});

    useEffect(() => {
        if (themeDnsData?.id > 0) {
            mainPageSetting();
        }
    }, [themeDnsData])
    useEffect(() => {
        if (contentList.length > 0) {
            setLoading(false);
        }
    }, [contentList])
    const mainPageSetting = async () => {
        if (contentList.length > 0) {
            return;
        }

        let dns_data = themeDnsData;
        let content_list = (dns_data?.shop_obj) ?? [];
        setWindowWidth(window.innerWidth)
        setContentList(content_list)
    }

    const returnHomeContentByColumn = (column, idx) => {
        return returnHomeContent(
            column,
            {
                windowWidth: window.innerWidth,
                themeDnsData: themeDnsData,
                idx,
            },
            {
                router,
            })
    }
    return (
        <>
            <BannerContainer style={{ backgroundImage: "url('/assets/background/overlay_4.jpg')" }}>
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
                        margin: '2rem 0 0 0',
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
                        <HomeBanner
                            data={{
                                windowWidth: window.innerWidth,
                                themeDnsData: themeDnsData,
                            }}
                            column={{
                                style: {
                                    min_height: 150
                                },
                                list: [
                                    {
                                        src: '/assets/images/home-slide/main_sl_img2.jpg',
                                        title: '',
                                    },
                                    {
                                        src: '/assets/images/home-slide/main_sl_img3.jpg',
                                        title: '',
                                    },
                                ]
                            }}
                        />
                        <Row style={{ margin: '5rem auto 0 auto', columnGap: '0.5rem' }}>
                            <div>{themeDnsData?.name}만의</div>
                            <div style={{ fontWeight: 'bold' }}>특별함</div>
                        </Row>
                        <Row style={{ margin: '1rem auto 5rem auto', justifyContent: 'space-between', maxWidth: '500px', width: '100%', textAlign: 'center', fontSize: '0.9rem' }}>
                            <Col style={{ alignItems: 'center', rowGap: '1rem', width: '33%', maxWidth: '150px' }}>
                                <div style={{ padding: '0.4rem 1rem 0 1rem', fontSize: '56px', background: '#ccc', borderRadius: '50%' }}>
                                    <Icon icon='streamline-emojis:south-korea' />
                                </div>
                                <div>대한민국 최저가</div>
                            </Col>
                            <Col style={{ alignItems: 'center', rowGap: '1rem', width: '33%', maxWidth: '150px' }}>
                                <div style={{ padding: '0.4rem 1rem 0 1rem', fontSize: '56px', background: '#ccc', borderRadius: '50%' }}>
                                    <Icon icon='fluent:phone-48-regular' />
                                </div>
                                <div>전송결과 분석</div>
                            </Col>
                            <Col style={{ alignItems: 'center', rowGap: '1rem', width: '33%', width: '33%', maxWidth: '150px' }}>
                                <div style={{ padding: '0.4rem 1rem 0 1rem', fontSize: '56px', background: '#ccc', borderRadius: '50%' }}>
                                    <Icon icon='ep:message' />
                                </div>
                                <div>080ARS 무료수신거부</div>
                            </Col>
                        </Row>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg_3.webp')" }}>
                            <Row style={{ margin: '1rem auto', columnGap: '0.5rem', width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold' }}>문자발송업체 꼼꼼히 확인하셨나요?</div>
                            </Row>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                첫번째 충전은 얼마 다음번 충전은 얼마 매번 가격이 바뀌는 업체가 아닙니다
                                한번 이용했을 뿐인데 매월 정기적으로 자동충전하는 업체가 아닙니다
                                발송 실패한 문자도 과금하는 업체가 아닙니다
                            </div>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg_4.webp')" }}>
                            <Row style={{ margin: '1rem auto', columnGap: '0.5rem', width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold' }}>실제 보여지는 가격으로 제공합니다</div>
                            </Row>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                최저가인것처럼 광고하고 실제 충전/발송하려고 하면
                                가격이 달라지는 업체가 아닙니다
                            </div>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg_8.webp')" }}>
                            <Row style={{ margin: '1rem auto', columnGap: '0.5rem', width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold' }}>사용기한이 충전 후 5년입니다</div>
                            </Row>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                최저가인것처럼 광고하고
                                실제는 사용기한이 1개월인 업체가 아닙니다
                            </div>
                        </BannerContainer>
                    </>}
                {currentTab == 1 &&
                    <>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg-election-slice.png')" }}>
                            <Row style={{ margin: '1rem auto', columnGap: '0.5rem' }}>
                                <div style={{ fontWeight: 'bold', width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                    {themeDnsData?.name}문자가
                                    후보님의 당선을
                                    기원합니다.
                                </div>
                            </Row>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                20건씩 수동 분할발송 기능 제공
                            </div>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                20건씩 수동 선택 후 무제한 문자 발송 가능
                            </div>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg-election-slice.png')", paddingBottom: '0', alignItems: 'center' }}>
                            <Row style={{ margin: '1rem auto', columnGap: '0.5rem' }}>
                                <div style={{ fontWeight: 'bold', width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                    선거문자 발송에 최적화
                                </div>
                            </Row>
                            <Col style={{ boxShadow: '0 4px 4px #00000088', background: '#fff', margin: '1rem auto', width: '300px', height: '300px', alignItems: "center", borderRadius: '50%' }}>
                                <img src={'/assets/background/img_ignore_service.png'} style={{ width: '80px', height: 'auto', marginTop: 'auto' }} />
                                <div>080수신거부 서비스
                                    무료제공</div>
                                <div style={{ marginBottom: 'auto' }}>
                                    080수신거부 번호
                                </div>
                            </Col>
                            <Icon icon='uiw:down' style={{ fontSize: '80px' }} />
                            <Col style={{ boxShadow: '0 4px 4px #00000088', background: '#fff', margin: '1rem auto', width: '300px', height: '300px', alignItems: "center", borderRadius: '50%' }}>
                                <img src={'/assets/background/img_ignore_list.png'} style={{ width: '80px', height: 'auto', marginTop: 'auto' }} />
                                <div>
                                    080ARS 수신거부 처리 후
                                </div>
                                <div>
                                    수신거부 리스트
                                </div>
                                <div style={{ marginBottom: 'auto' }}>
                                    무료제공
                                </div>
                            </Col>
                            <Icon icon='uiw:down' style={{ fontSize: '80px' }} />
                            <img src={'/assets/background/img_role_phone.png'} style={{ width: '150px', height: 'auto' }} />
                        </BannerContainer>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg-election-slice.png')" }}>
                            <Row style={{ margin: '1rem auto', columnGap: '0.5rem' }}>
                                <div style={{ fontWeight: 'bold', width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                    “달라진 선거법”
                                    주요 내용 확인해보세요.
                                    선거문자 총8회 발송가능
                                </div>

                            </Row>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                선거문자 총8회 발송가능
                            </div>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                포토, 동영상으로 선거문자 발송가능
                            </div>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                선거당일 문자 발송 가능
                            </div>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                선거문자 발송시간 제한 없음
                            </div>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                불법수집정보 신고 전화번호를
                                내용에 포함
                            </div>
                            <div style={{ width: '80%', margin: '1rem auto', textAlign: 'center' }}>
                                프로그램을 이용한 문자 발송시,
                                수신대상자가 20인 이하여도
                                1회로 체크됨
                            </div>
                        </BannerContainer>
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