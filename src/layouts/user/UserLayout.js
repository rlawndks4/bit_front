import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { useSettingsContext } from "src/components/settings";
import Header from "./header";
import BottomMenu from "./bottom-menu";
import styled from "styled-components";
import ScrollToTop from "src/components/scroll-to-top";
import { Fab } from "@mui/material";
import { Icon } from "@iconify/react";
import Footer from "./footer";

const UserLayout = ({ children }) => {
    const { themeDnsData } = useSettingsContext();
    const { user } = useAuthContext();
    const [isShowPage, setIsShowPage] = useState(false);
    useEffect(() => {
        if (themeDnsData?.id > 0) {
            setIsShowPage(true);
        }
    }, [themeDnsData])
    return (
        <>
            {isShowPage &&
                <>
                    <Header />
                    {children}
                    <Footer />
                    <ScrollToTop className='mui-fixed'>
                        <Fab size='small' aria-label='scroll back to top'>
                            <Icon icon='tabler:arrow-up' />
                        </Fab>
                    </ScrollToTop>
                </>}
        </>
    )
}
export default UserLayout;