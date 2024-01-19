import { Icon } from "@iconify/react";
import { Button, Chip, Drawer, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row } from "src/components/elements/styled-components";
import Logo from "src/components/logo/Logo";
import { useSettingsContext } from "src/components/settings";
import { zBottomMenu } from "src/data/data";
import { apiManager } from "src/utils/api-manager";
import { commarNumber } from "src/utils/function";
import styled from "styled-components";

const Wrappers = styled.header`
position:fixed;
display:flex;
width:100%;
top:0;
left:0;
z-index:30;
background:#fff;
border-bottom:0.1rem solid #e6e6e6;
padding: 0.5rem;
`

const PaddingTop = styled.div`
padding-top: 91.2px;
@media (max-width:800px) {
    padding-top: 53.2px;
  }
`
const Menu = styled.div`
padding:1.5rem 1rem 0 1rem;
text-align: center;
display:inline-block;
text-transform:uppercase;
margin:0;
cursor:pointer;
font-weight:bold;
position:relative;
&::after {
  padding-bottom:1.5rem;
  display:block;
  content: '';
  border-bottom:2px solid ${props => props.borderColor};
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}
&:hover:after {
  transform: scaleX(1.2);
}
@media (max-width:800px) {
  display:none;
}
`
const IconImg = styled.img`
height: 2rem;
cursor: pointer;
@media (max-width:800px) {
    height: 1.5rem;
}
`
const IconImgL = styled.img`
height: 2.5rem;
cursor: pointer;
@media (max-width:800px) {
    height: 1.8rem;
}
`
const LogoImg = styled.img`
height: 48px;
width: auto;
cursor: pointer;
@media (max-width:800px) {
}
`

const MenuButton = styled.div`
display: none;
@media (max-width:800px) {
  display:flex;
}
`
const Header = (props) => {
    const router = useRouter();

    const { logout, user } = useAuthContext();
    const { themeDnsData } = useSettingsContext();
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const sns_list = [
    ]
    return (
        <>
            <Wrappers>
                <Row style={{ margin: '0 auto', width: '95%', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                    <Row style={{ alignItems: 'center', columnGap: '1rem', marginRight: 'auto' }}>
                        <MenuButton>
                            <IconButton
                                sx={iconButtonStyle}
                                onClick={() => setSideMenuOpen(true)}
                            >
                                <Icon icon={'basil:menu-solid'} fontSize={'2rem'} />
                            </IconButton>
                        </MenuButton>
                        <LogoImg src={themeDnsData?.logo_img} onClick={() => {
                            window.location.href = '/home'
                        }} />
                        {zBottomMenu.map((item, idx) => (
                            <>
                                <Menu onClick={() => { router.push(item.link) }}>
                                    {item.name}
                                </Menu>
                            </>
                        ))}
                    </Row>
                    <Row style={{ alignItems: 'center', columnGap: '1rem', marginLeft: 'auto' }}>
                        <IconImg src={'/assets/images/youtube.png'} onClick={() => {
                            window.open(themeDnsData?.youtube_link);
                        }} />
                        <IconImg src={'/assets/images/blog.png'} onClick={() => {
                            window.open(themeDnsData?.blog_link);
                        }} />
                        <IconImgL src={'/assets/images/kakao.png'} style={{ borderRadius: '50%' }} onClick={() => {
                            window.open(themeDnsData?.kakao_link);
                        }} />
                        <a href={`tel:${themeDnsData?.phone_num}`}>
                            <IconImgL src={'/assets/images/tel.png'} style={{ borderRadius: '50%' }} />
                        </a>
                    </Row>
                </Row>
            </Wrappers>
            <PaddingTop />
            <Drawer
                anchor={'left'}
                open={sideMenuOpen}
                onClose={() => {
                    setSideMenuOpen(false);
                }}
                style={{
                }}
            >
                <ColumnMenuContainer
                    className="none-scroll"
                >
                    {zBottomMenu.map((item, idx) => (
                        <>
                            <ColumnMenuTitle onClick={() => { router.push(item.link); setSideMenuOpen(false) }}>
                                {item.name}
                            </ColumnMenuTitle>
                        </>
                    ))}
                </ColumnMenuContainer>
            </Drawer>
        </>
    )
}
const ColumnMenuContainer = styled.div`
        width: 400px;
        padding:0 2rem 4rem 2rem;
        height:100vh;
        overflow-y:auto;
        display:flex;
        flex-direction:column;
        @media (max-width:800px){
          width: 70vw;
        padding:0 5vw 4rem 5vw;
}
        `
const ColumnMenuTitle = styled.div`
        margin: 0 0 0.5rem 0;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
        padding: 1rem 0;
`
const iconButtonStyle = {
    padding: '0.1rem',
}
export default Header;