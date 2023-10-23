import { Icon } from "@iconify/react";
import { Button, Chip, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row } from "src/components/elements/styled-components";
import Logo from "src/components/logo/Logo";
import { useSettingsContext } from "src/components/settings";
import { zBottomMenu } from "src/data/data";
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
`

const PaddingTop = styled.div`
padding-top: 73.6px;
@media (max-width:800px) {
    padding-top: 40px;
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

const Header = (props) => {
    const router = useRouter();

    const { logout, user } = useAuthContext();
    const { themeDnsData } = useSettingsContext();

    useEffect(() => {

    }, []);

    return (
        <>
            <Wrappers>
                <Row style={{ margin: '0 auto', width: '95%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                        <img src={themeDnsData?.logo_img} style={{ height: '29px', width: 'auto' }} onClick={() => {
                            window.location.href = '/user/home'
                        }} />
                        {zBottomMenu.map((item, idx) => (
                            <>
                                <Menu onClick={() => { router.push(item.link) }}>
                                    {item.name}
                                </Menu>
                            </>
                        ))}
                    </Row>
                    {user ?
                        <>
                            <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                                <Col style={{ rowGap: '0.5rem' }}>
                                    <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                                        <Icon icon={'bxs:user'} />
                                        <div>{user?.nickname} ({user?.user_name})</div>
                                    </Row>
                                    <Chip label={`잔여포인트: ${commarNumber(100000)}P`} size="small" variant="outlined" />
                                </Col>
                                <Button variant="outlined" onClick={async () => {
                                    let result = await logout();
                                    window.location.href = '/'
                                }}>로그아웃</Button>
                            </Row>
                        </>
                        :
                        <>
                            <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                                <Button variant="outlined">회원가입</Button>
                                <Button variant="outlined" onClick={() => {
                                    router.push('/user/login')
                                }}>로그인</Button>
                            </Row>
                        </>}

                </Row>
            </Wrappers>
            <PaddingTop />
        </>
    )
}
export default Header;