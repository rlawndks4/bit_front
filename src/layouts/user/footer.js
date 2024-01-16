// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// routes
// _mock
// components
import Logo from '../../components/logo';
import { logoSrc } from 'src/data/data';
import { useEffect } from 'react';
import { useSettingsContext } from 'src/components/settings';
import styled from 'styled-components';

// ----------------------------------------------------------------------

const LogoImg = styled.img`
height: 48px;
@media (max-width: 1000px) {
    margin: 1rem auto;
}
`
const LINKS = [
  {
    headline: '회사소개',
    link: '/info',
    children: [
    ],
  },
  {
    headline: '프로그램소개',
    link: '/program-info',
    children: [
    ],
  },
  {
    headline: '이용절차 및 상품안내',
    link: '/guide',
    children: [
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const { pathname, push } = useRouter();

  const { themeDnsData } = useSettingsContext();
  const isHome = (pathname === '/' || pathname === '/home' || pathname === '/user' || window.innerWidth <= 800);

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        paddingBottom: `${window.innerWidth <= 800 ? '80px' : ''}`
      }}
    >
      <Container>
        <img src={logoSrc()} style={{ marginBottom: '0.5rem', width: '120px', margin: 'auto' }} />
        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by &nbsp;
          <Link href="#"> bonaeja </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        marginTop: '5rem'
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid item xs={12} sx={{ mb: 3, display: 'flex' }}>
            <LogoImg src={logoSrc()} style={{ height: '48px' }} />
          </Grid>

          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              회사명: {themeDnsData?.company_name}
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              주소: {themeDnsData?.addr}
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              사업자 등록번호: {themeDnsData?.business_num}
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              대표: {themeDnsData?.ceo_name}
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              전화: {themeDnsData?.phone_num}
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              팩스: {themeDnsData?.fax_num}
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              개인정보 보호책임자: {themeDnsData?.pvcy_rep_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              justifyContent="space-between"
              direction={{ xs: 'column', md: 'row' }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography component="div" variant="overline" style={{ cursor: 'pointer' }}
                    onClick={() => {
                      push(list.link)
                    }}
                  >
                    {list.headline}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
