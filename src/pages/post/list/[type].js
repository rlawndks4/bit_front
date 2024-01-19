import { Pagination, Stack, Tab, Tabs, TextField } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { TableNoData } from "src/components/table";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import { apiManager } from "src/utils/api-manager";
import { postTypeList } from "src/utils/format";
import { getMaxPage } from "src/utils/function";
import styled from "styled-components";


const ContentWrappers = styled.div`
display: flex;
flex-wrap: wrap;
column-gap: 1.5%;
row-gap: 1rem;
@media (max-width:1000px) {
    column-gap: 4%;
}
`
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
const ItemContianer = styled.div`
width:23%;
cursor: pointer;
@media (max-width:1000px) {
    width:48%;
}
`
const MainImg = styled.img`
width:100%;
`
const MainTitle = styled.div`
font-weight: bold;
font-size: 0.9rem;
margin-top: 0.5rem;
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
    useEffect(() => {
        pageSetting();
    }, [router.query])
    const pageSetting = () => {
        onChangePage({ ...searchObj, page: 1, type: router.query?.type });
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
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${themeDnsData[`post_${router.query?.type}_banner_img`] || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>{_.find(postTypeList, { value: parseInt(router.query?.type) })?.label}</Title>
            </BannerContainer>
            <Wrappers style={{ maxWidth: '1200px', marginTop: '4rem' }}>
                <ContentWrappers>
                    {data?.content && <>
                        {data?.content?.length > 0 ?
                            <>
                                {data?.content.map((item) => (
                                    <>
                                        <ItemContianer onClick={() => {
                                            router.push(`/post/${item?.id}`)
                                        }}>
                                            <MainImg src={item?.post_img} />
                                            <MainTitle>{item?.title}</MainTitle>
                                            <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>{item?.created_at}</div>
                                        </ItemContianer>
                                    </>
                                ))}
                            </>
                            :
                            <>
                                <div style={{ margin: 'auto' }}>
                                    <TableNoData isNotFound={true} />
                                </div>
                            </>}

                    </>}
                </ContentWrappers>
                <Pagination
                    sx={{ margin: '1rem auto' }}
                    size={'medium'}
                    count={getMaxPage(data?.total, data?.page_size)}
                    page={searchObj?.page}
                    variant='outlined' shape='rounded'
                    color='primary'
                    onChange={(_, num) => {
                        onChangePage({
                            ...searchObj,
                            page: num
                        })
                    }} />
            </Wrappers>

        </>
    )
}
Help.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Help;