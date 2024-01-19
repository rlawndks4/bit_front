import { Icon } from "@iconify/react";
import { Stack, Tab, Tabs, TextField, Accordion, AccordionDetails, AccordionSummary, Typography, } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import { apiManager } from "src/utils/api-manager";
import styled from "styled-components";
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
const IconImg = styled.img`
height: 4rem;
width: auto;
cursor: pointer;

`
const IconImgL = styled.img`
height: 5rem;
width: auto;
cursor: pointer;
`
const Help = () => {
    const router = useRouter();
    const { themeDnsData } = useSettingsContext();
    const { user } = useAuthContext();
    const [currentTab, setCurrentTab] = useState(0);
    const [data, setData] = useState({});
    const [searchObj, setSearchObj] = useState({
        page: 1,
        page_size: 10,
        s_dt: '',
        e_dt: '',
        search: '',
    })
    const [questObj, setQuestObj] = useState({
        title: '',
        note: ''
    })
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
        setQuestObj({
            title: '',
            note: ''
        })
    }, [router.query])
    useEffect(() => {
        pageSetting();
    }, [router.query])
    const pageSetting = () => {
        onChangePage({ ...searchObj, page: 1, type: 1 });
    }
    const onChangePage = async (obj) => {
        setData({
            ...data,
            content: undefined
        })
        let data_ = await apiManager('posts', 'list', obj);
        if (data_) {
            setData(data_);
        }
        setSearchObj(obj);
    }
    return (
        <>
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('/assets/images/contact/hero.jpg')` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>고객센터</Title>
            </BannerContainer>
            <Wrappers>
                <Title2 style={{ marginTop: '4rem' }}>바로 상담 연결</Title2>
                <Row style={{ alignItems: 'center', justifyContent: 'space-between', maxWidth: '500px', margin: '2rem auto', width: '100%' }}>
                    <Col style={{ alignItems: 'center', rowGap: '0.5rem' }}>
                        <a href={`tel:${themeDnsData?.phone_num}`}>
                            <IconImgL src={'/assets/images/tel.png'} style={{ borderRadius: '50%' }} />
                        </a>
                        <div>전화연결</div>
                    </Col>
                    <Col style={{ alignItems: 'center', rowGap: '0.5rem' }}>
                        <IconImgL src={'/assets/images/kakao.png'} style={{ borderRadius: '50%' }} onClick={() => {
                            window.open(themeDnsData?.kakao_link);
                        }} />
                        <div>카카오톡</div>
                    </Col>
                    <Col style={{ alignItems: 'center', rowGap: '0.5rem' }}>
                        <IconImg src={'/assets/images/blog.png'} onClick={() => {
                            window.open(themeDnsData?.blog_link);
                        }} />
                        <div>블로그</div>
                    </Col>
                </Row>
                <Title2>자주 묻는 질문</Title2>
                <Col>
                    {data?.content && data?.content.map((item, idx) => (
                        <>
                            <Accordion key={item?.id} style={{ boxShadow: "none", background: 'transparent', width: '100%', wordBreak: 'break-all' }}>
                                <AccordionSummary expandIcon={<Icon icon="eva:arrow-ios-downward-fill" />}>
                                    <Typography variant="subtitle1">{item?.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ReactQuill
                                        className='none-padding'
                                        value={item?.note ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                        bounds={'.app'}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </>
                    ))}
                </Col>
            </Wrappers>

        </>
    )
}
Help.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Help;