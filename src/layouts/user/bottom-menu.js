import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSettingsContext } from 'src/components/settings'
import { zBottomMenu } from 'src/data/data'
import styled from 'styled-components'
const Container = styled.aside`
    background: #fff;
    border-top: 0.1rem solid #e6e6e6;
    position: fixed;
    right: 0;
    bottom: -1px;
    left: 0;
    z-index: 5;
    display:none;
    width:100%;
    max-width:800px;
    margin: 0 auto;
    @media screen and (max-width:800px) { 
        display:flex;

    }
`
const MenuContainer = styled.nav`
width: 100%;
max-width: 76.8rem;
height: 5rem;
display: -webkit-flex;
display: flex;
margin: 0 auto;
`
const OneMenuContainer = styled.div`
    color: inherit;
    text-decoration: none;
    width: 16%;
    min-width: 16%;
    display: flex;
    flex-direction:column;
    padding: 0.3rem 0 0.2rem;
    position: relative;
    text-align: center;
    cursor:pointer;
    align-items:center;
    margin: auto;
    row-gap: 0.5rem;
`
const OneMenuName = styled.span`
font-size:0.8rem;
font-weight:400;
@media screen and (max-width:450px) { 
    font-size:0.72rem;
  }
`

const BottomMenu = () => {
    const { themeDnsData } = useSettingsContext();
    const router = useRouter();
    const [asPath, setAsPath] = useState("")
    useEffect(() => {
        setAsPath(router.asPath);
    }, [router])
    return (
        <>

            <Container className='menu-container'>
                <MenuContainer>
                    <OneMenuContainer onClick={() => { router.push('/user/home') }} style={{ color: `${asPath.includes('/user/home') ? themeDnsData?.theme_css?.main_color : '#ababab'}` }} key={'#'}>
                        <img src={themeDnsData?.logo_img} style={{ height: '24px', width: 'auto' }} />
                        <OneMenuName>
                            홈
                        </OneMenuName>
                    </OneMenuContainer>
                    {zBottomMenu.map((item, index) => {
                        return <OneMenuContainer onClick={() => { router.push(item.link) }} style={{ color: `${asPath.includes(item.allowLink) ? themeDnsData?.theme_css?.main_color : '#ababab'}` }} key={index}>
                            {item.icon}
                            <OneMenuName>
                                {item.name}
                            </OneMenuName>
                        </OneMenuContainer>
                    })}
                </MenuContainer>
            </Container>
        </>
    )
}

export default BottomMenu
