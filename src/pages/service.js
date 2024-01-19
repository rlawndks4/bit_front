import { Stack, Tab, Tabs, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";
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

    const { user } = useAuthContext();
    const [currentTab, setCurrentTab] = useState(0);
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
    return (
        <>
            <BannerContainer style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('/assets/images/contact/hero.jpg')` }}>
                <Title style={{ color: '#fff', margin: 'auto' }}>고객센터</Title>
            </BannerContainer>
            <Wrappers>

            </Wrappers>

        </>
    )
}
Help.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Help;