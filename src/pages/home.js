import { Icon } from "@iconify/react";
import { Button, Card, Grid, Stack, Tab, Tabs, TextField } from "@mui/material";
import { useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { BlackText, Col, FadeInUp, RedText, Row, Title, Title2, Title3, Wrappers, themeObj } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import { makeYoutubeEmbed } from "src/utils/function";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useModal } from "src/components/dialog/ModalProvider";
import toast from "react-hot-toast";
import { apiManager } from "src/utils/api-manager";
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
const KakaoImg = styled.img`
height: 400px;
transition: 0.5s;
&:hover{
    transform: scale(1.2);
}
`
const WhySelectContainer = styled.div`
display: flex;
flex-wrap: wrap;
column-gap: 4%;
row-gap: 2rem;
`
const WhySelectContent = styled.div`
width:48%;
display: flex;
flex-direction: column;
row-gap: 1rem;
@media (max-width:1000px) {
    width:100%;
}
`
const WhySelectImg = styled.div`
border-radius: 1rem;
height: 300px;
background-size: cover;
background-repeat: no-repeat;
transition: 0.5s;
&:hover{
    transform: scale(1.05);
}
@media (max-width:1000px) {
    height: 50vw;
}
`
const ServiceInfo = () => {
    const router = useRouter();
    const { setModal } = useModal()
    const controls = useAnimation();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    const { themeDnsData, themePostCategoryList } = useSettingsContext();
    const [contentList, setContentList] = useState([]);

    const [request, setRequest] = useState({

    })
    useEffect(() => {
        if (themeDnsData?.id > 0) {
            mainPageSetting();
        }
    }, [themeDnsData])
    const mainPageSetting = async () => {
        console.log(themeDnsData)
        setContentList(themeDnsData?.main_obj);
    }
    const items_setting = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: window.innerWidth > 1000 ? 4 : 2,
        slidesToScroll: 1,
        dots: false,
    }
    const onSave = async () => {
        let result = undefined
        result = await apiManager('requests', 'create', request);
        if (result) {
            toast.success("성공적으로 저장 되었습니다.");
            window.location.reload();
        }
    }
    return (
        <>
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${themeDnsData?.main_banner_img || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto', fontSize: '1.5rem', maxWidth: '500px', textAlign: 'center' }}>{themeDnsData?.main_banner_text}</Title>
            </BannerContainer>
            <Wrappers>
                {contentList.map((content, index) => (
                    <>
                        <FadeInUp style={{ marginTop: '4rem' }} >
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
                                    <Title2 style={{ textAlign: 'center' }}>
                                        {themeDnsData?.name} 고객분들의<br />
                                        거짓없는 100% 실제 수익률입니다.
                                    </Title2>
                                    {content?.list && content?.list.map((cont, idx) => (
                                        <>
                                            <Col style={{ margin: 'auto', alignItems: 'center' }}>
                                                <Title2 style={{ textAlign: 'center' }}>
                                                    {cont.title}
                                                </Title2>
                                                <Title3 style={{ textAlign: 'center', margin: 'auto', color: themeObj.grey[700] }}>{cont.note}</Title3>
                                                <img src={cont.img} style={{ maxWidth: '400px', margin: 'auto' }} />

                                            </Col>
                                        </>
                                    ))}
                                </>}
                            {content.type == 'customer_kakao' &&
                                <>
                                    <Title2 style={{ textAlign: 'center' }}>
                                        고객분과의 100% 실제 카톡대화
                                    </Title2>
                                    <Slider {...items_setting} className='margin-slide' >
                                        {content?.list && content?.list.map((cont, idx) => (
                                            <>
                                                <KakaoImg src={cont.img} />
                                            </>
                                        ))}
                                    </Slider>

                                </>}
                            {content.type == 'why_select' &&
                                <>
                                    <Title2 style={{ textAlign: 'center' }}>
                                        왜 {themeDnsData?.name}를<br />
                                        선택해야 할까요?
                                    </Title2>
                                    <WhySelectContainer>
                                        {content?.list && content?.list.map((cont, idx) => (
                                            <>
                                                <WhySelectContent>
                                                    <WhySelectImg style={{ backgroundImage: `url(${cont?.img})` }} />
                                                    <Title2 style={{ textAlign: 'center', margin: 'auto' }}>{cont.note}</Title2>
                                                    <Title3 style={{ textAlign: 'center', margin: 'auto', color: themeObj.grey[700] }}>{cont.note}</Title3>
                                                </WhySelectContent>
                                            </>
                                        ))}
                                    </WhySelectContainer>

                                </>}
                        </FadeInUp>
                    </>
                ))}
                <Card sx={{ p: 2, height: '100%', maxWidth: '700px', margin: '4rem auto', width: '100%' }}>
                    <Stack spacing={3}>
                        <Title2 style={{ textAlign: 'center' }}>
                            문의하기
                        </Title2>
                        <TextField
                            label='이름'
                            value={request.name}
                            onChange={(e) => {
                                setRequest(
                                    {
                                        ...request,
                                        ['name']: e.target.value
                                    }
                                )
                            }} />
                        <TextField
                            label='전화번호'
                            value={request.phone_num}
                            onChange={(e) => {
                                setRequest(
                                    {
                                        ...request,
                                        ['phone_num']: e.target.value
                                    }
                                )
                            }} />
                        <TextField
                            label='추천인'
                            value={request.recommend_name}
                            onChange={(e) => {
                                setRequest(
                                    {
                                        ...request,
                                        ['recommend_name']: e.target.value
                                    }
                                )
                            }} />
                        <TextField
                            multiline={true}
                            rows={5}
                            label='내용'
                            value={request.note}
                            onChange={(e) => {
                                setRequest(
                                    {
                                        ...request,
                                        ['note']: e.target.value
                                    }
                                )
                            }} />
                        <Button variant="outlined" style={{ height: '48px' }} onClick={() => {
                            setModal({
                                func: () => { onSave() },
                                icon: 'material-symbols:edit-outline',
                                title: '저장 하시겠습니까?'
                            })
                        }}>저장</Button>
                    </Stack>
                </Card>
            </Wrappers>
        </>
    )
}
ServiceInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ServiceInfo;
//@@@@@@@@@@@@