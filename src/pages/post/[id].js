import { Stack, Tab, Tabs, TextField } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import { apiManager } from "src/utils/api-manager";
import { postTypeList } from "src/utils/format";
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
const Help = () => {
    const router = useRouter();

    const { themeDnsData } = useSettingsContext();
    const { user } = useAuthContext();
    const [currentTab, setCurrentTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [questObj, setQuestObj] = useState({
        title: '',
        note: ''
    })
    const [item, setItem] = useState({
        post_file: undefined,
        title: '',
        shop_id: '',
        note: '',
        type: undefined
    })
    useEffect(() => {
        settingPage();
    }, [router.query])
    const settingPage = async () => {
        setLoading(true);
        let data = await apiManager('posts', 'get', {
            id: router.query.id
        })
        console.log(data)
        setItem(data);
        setLoading(false);
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${themeDnsData[`post_${item?.type}_banner_img`] || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>{_.find(postTypeList, { value: parseInt(item?.type) })?.label}</Title>
            </BannerContainer>
            <Wrappers style={{ marginTop: '2rem' }}>
                <Title3>{item?.title}</Title3>

                <Row style={{ columnGap: '0.25rem', fontSize: '0.8rem', color: '#aaa', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                    <div>{_.find(postTypeList, { value: parseInt(item?.type) })?.label}</div>
                    <div>{item?.created_at}</div>
                </Row>
                <ReactQuill
                    style={{ marginTop: '2rem' }}
                    className='none-padding'
                    value={item?.note ?? `<body></body>`}
                    readOnly={true}
                    theme={"bubble"}
                    bounds={'.app'}
                />
            </Wrappers>
        </>
    )
}
Help.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Help;