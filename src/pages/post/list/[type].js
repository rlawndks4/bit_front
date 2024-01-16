import { Stack, Tab, Tabs, TextField } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
import { postTypeList } from "src/utils/format";
import styled from "styled-components";


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
    const [searchObj, setSearchObj] = useState({
        page: 1,
    })


    const onChangePage = (search_obj) => {

    }
    return (
        <>
            <BannerContainer style={{ backgroundImage: `url(${themeDnsData[`guide_banner_img`] || '/assets/background/overlay_4.jpg'})` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>{_.find(postTypeList, { value: parseInt(router.query?.type) })?.label}</Title>
            </BannerContainer>
            <Wrappers>

            </Wrappers>

        </>
    )
}
Help.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Help;