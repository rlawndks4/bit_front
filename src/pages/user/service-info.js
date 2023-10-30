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
const ContentTitle = styled.div`
font-weight: bold;
width: 80%;
margin: 1rem auto;
text-align: center;
font-size: 32px;
@media (max-width:1000px) {
    font-size: 24px;    
}
`
const ContentTitleRow = styled.div`
margin: 1rem auto;
text-align: center;
font-size: 32px;
display: flex;

@media (max-width:1000px) {
    font-size: 24px;    
}
`
const ContentTitleContainer = styled(Row)`
margin: 1rem auto;
column-gap: 0.5rem;
width: 100%;
`
const Content = styled.div`
width: 80%;
margin: 1rem auto;
text-align: center;
`
const KakaoCircle = styled.div`
border:3px solid yellow;
font-size: 32px;
font-weight: bold;
width:200px;
height: 200px;
display: flex;
border-radius: 50%;
margin-bottom: 1rem;
@media (max-width:1000px) {
    font-size: 24px;    
}
`
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
                        <Row style={{ margin: '5rem auto 0 auto', columnGap: '0.5rem', fontSize: '32px' }}>
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
                            <ContentTitleContainer>
                                <ContentTitle>문자발송업체 꼼꼼히 확인하셨나요?</ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                첫번째 충전은 얼마 다음번 충전은 얼마 매번 가격이 바뀌는 업체가 아닙니다
                                한번 이용했을 뿐인데 매월 정기적으로 자동충전하는 업체가 아닙니다
                                발송 실패한 문자도 과금하는 업체가 아닙니다
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg_4.webp')" }}>
                            <ContentTitleContainer>
                                <ContentTitle>실제 보여지는 가격으로 제공합니다</ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                최저가인것처럼 광고하고 실제 충전/발송하려고 하면
                                가격이 달라지는 업체가 아닙니다
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg_8.webp')" }}>
                            <ContentTitleContainer>
                                <ContentTitle>사용기한이 충전 후 5년입니다</ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                최저가인것처럼 광고하고
                                실제는 사용기한이 1개월인 업체가 아닙니다
                            </Content>
                        </BannerContainer>
                    </>}
                {currentTab == 1 &&
                    <>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg-election-slice.png')" }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name}문자가
                                    후보님의 당선을
                                    기원합니다.
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                20건씩 수동 분할발송 기능 제공
                            </Content>
                            <Content>
                                20건씩 수동 선택 후 무제한 문자 발송 가능
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundImage: "url('/assets/background/bg-election-slice.png')", paddingBottom: '0', alignItems: 'center' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    선거문자 발송에 최적화
                                </ContentTitle>
                            </ContentTitleContainer>
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
                            <ContentTitleContainer>
                                <ContentTitle>
                                    “달라진 선거법”
                                    주요 내용 확인해보세요.
                                    선거문자 총8회 발송가능
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                선거문자 총8회 발송가능
                            </Content>
                            <Content>
                                포토, 동영상으로 선거문자 발송가능
                            </Content>
                            <Content>
                                선거당일 문자 발송 가능
                            </Content>
                            <Content>
                                선거문자 발송시간 제한 없음
                            </Content>
                            <Content>
                                불법수집정보 신고 전화번호를
                                내용에 포함
                            </Content>
                            <Content>
                                프로그램을 이용한 문자 발송시,
                                수신대상자가 20인 이하여도
                                1회로 체크됨
                            </Content>
                        </BannerContainer>
                    </>}
                {currentTab == 2 &&
                    <>
                        <BannerContainer style={{ backgroundColor: '#eee' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 카카오 알림톡 이란?
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                전화번호만 있으면 친구가 아니더라도 발송 가능
                            </Content>
                            <Content>
                                브랜드 홍보 및 신뢰도 상승효과
                            </Content>
                            <Content>
                                더 쉽게 카카오톡 친구를 모으세요.
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#fff' }}>
                            <ContentTitleContainer>
                                <ContentTitleRow>
                                    <div style={{ fontWeight: 'bold' }}>왜 알림톡</div>
                                    <div>으로 보내야 하나요?</div>
                                </ContentTitleRow>
                            </ContentTitleContainer>
                            <Content style={{ display: "flex", justifyContent: 'space-around', flexWrap: 'wrap', rowGap: '1rem' }}>
                                <Col style={{ width: '80%', alignItems: 'center', maxWidth: '260px' }}>
                                    <KakaoCircle>
                                        <div style={{ margin: 'auto' }}>1,000자</div>
                                    </KakaoCircle>
                                    <div>
                                        단순알림 문자는
                                        45자(90byte)만 가능하지만
                                        알림톡은 최대 1,000자까지보낼 수 있습니다

                                    </div>
                                </Col>
                                <Col style={{ width: '80%', alignItems: 'center', maxWidth: '260px' }}>
                                    <KakaoCircle> <div style={{ margin: 'auto' }}>6.5원</div></KakaoCircle>
                                    <div>
                                        가격이 매우 저렴합니다.
                                        문자 대비 75%
                                        저렴합니다.
                                    </div>
                                </Col>
                                <Col style={{ width: '80%', alignItems: 'center', maxWidth: '260px' }}>
                                    <KakaoCircle> <div style={{ margin: 'auto' }}>플러스친구
                                        증가</div></KakaoCircle>
                                    <div>
                                        전송된 알림톡에서
                                        +추가 버튼만 선택하면
                                        플러스친구로 추가됩니다.
                                    </div>
                                </Col>
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#eee' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 알림톡을 선택하는 이유 1
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                국내 최저 금액인 6.5원에
                            </Content>
                            <Content>
                                발송 가능합니다.
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#fff' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 알림톡을 선택하는 이유 2
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                개발자 없이도 이용가능
                            </Content>
                            <Content>
                                문자 발송과 동일하게 웹 화면에서 알림톡 전송 가능합니다.
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#eee' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 알림톡을 선택하는 이유 3
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                알림톡 발송 실패시
                            </Content>
                            <Content>
                                문자로 즉시 대체 발송
                            </Content>
                            <Content>
                                대체 문자도 국내 최저가인 8.4원에 발송합니다.
                            </Content>
                        </BannerContainer>
                    </>}
                {currentTab == 3 &&
                    <>
                        <BannerContainer style={{ backgroundColor: '#eee' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 카카오 친구톡 이란?
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                카카오톡채널 친구에게
                            </Content>
                            <Content>
                                광고성 메시지를 발송할 수 있습니다.
                            </Content>
                            <Content>
                                맞춤 타겟팅을 통해
                            </Content>
                            <Content>
                                더 효율적으로 브랜드를 홍보하세요!
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#fff' }}>
                            <ContentTitleContainer>
                                <ContentTitleRow>
                                    <div style={{ fontWeight: 'bold' }}>왜 친구톡</div>
                                    <div>으로 보내야 하나요?</div>
                                </ContentTitleRow>
                            </ContentTitleContainer>
                            <Content style={{ display: "flex", justifyContent: 'space-around', flexWrap: 'wrap', rowGap: '1rem' }}>
                                <Col style={{ width: '80%', alignItems: 'center', maxWidth: '260px' }}>
                                    <KakaoCircle>
                                        <div style={{ margin: 'auto' }}>광고<br />메시지</div>
                                    </KakaoCircle>
                                    <div>
                                        기업에 호의적인 카카오톡채널 친구에게
                                        맞춤 타겟팅한 광고 메시지를
                                        보낼 수 있습니다.
                                    </div>
                                </Col>
                                <Col style={{ width: '80%', alignItems: 'center', maxWidth: '260px' }}>
                                    <KakaoCircle> <div style={{ margin: 'auto' }}>12.5원</div></KakaoCircle>
                                    <div>
                                        가격이 매우 저렴합니다.
                                        문자 대비 67.5%
                                        저렴합니다.
                                    </div>
                                </Col>
                                <Col style={{ width: '80%', alignItems: 'center', maxWidth: '260px' }}>
                                    <KakaoCircle> <div style={{ margin: 'auto' }}>대체<br />문자</div></KakaoCircle>
                                    <div>
                                        카카오톡채널 친구가 아니어도
                                        괜찮습니다. 직접 설정한
                                        대체문자를 발송할 수 있습니다.
                                    </div>
                                </Col>
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#eee' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 친구톡을 선택하는 이유 1
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                국내 최저 금액인 6.5원에
                            </Content>
                            <Content>
                                발송 가능합니다.
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#fff' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 친구톡을 선택하는 이유 2
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                개발자 없이도 이용가능
                            </Content>
                            <Content>
                                문자 발송과 동일하게 웹 화면에서 친구톡 전송 가능합니다.
                            </Content>
                        </BannerContainer>
                        <BannerContainer style={{ backgroundColor: '#eee' }}>
                            <ContentTitleContainer>
                                <ContentTitle>
                                    {themeDnsData?.name} 친구톡을 선택하는 이유 3
                                </ContentTitle>
                            </ContentTitleContainer>
                            <Content>
                                친구톡 발송 실패시
                            </Content>
                            <Content>
                                문자로 즉시 대체 발송
                            </Content>
                            <Content>
                                대체 문자도 국내 최저가인 8.4원에 발송합니다.
                            </Content>
                        </BannerContainer>
                    </>}
            </Wrappers>
        </>
    )
}
ServiceInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ServiceInfo;