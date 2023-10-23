import PropTypes from 'prop-types';
import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tab, Tabs, Stack, Button, Divider, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
// _mock_
// components
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';
import { varFade, MotionViewport } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomePricingPlans() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Content />
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <Stack spacing={3} sx={{ mb: 10, textAlign: 'center' }}>
      {/* <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          pricing plans
        </Typography>
      </m.div> */}

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">
          필요에 따른 <br /> 자유로운 선택이 가능합니다.
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          필요에 의한 서비스를 선택하세요. 추후에 변경이 가능합니다.
        </Typography>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const isDesktop = useResponsive('up', 'md');

  const [currentTab, setCurrentTab] = useState('Standard');

  const desktopList = (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      sx={{ borderRadius: 2, border: (theme) => `dashed 1px ${theme.palette.divider}` }}
    >
      {[].map((plan) => (
        <m.div key={plan.license} variants={varFade().in}>
          <PlanCard key={plan.license} plan={plan} />
        </m.div>
      ))}
    </Box>
  );

  const mobileList = (
    <>
      <Stack alignItems="center" sx={{ mb: 5 }}>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {[].map((tab) => (
            <Tab key={tab.license} value={tab.license} label={tab.license} />
          ))}
        </Tabs>
      </Stack>

      <Box
        sx={{
          borderRadius: 2,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {[].map(
          (tab) =>
            tab.license === currentTab && (
              <PlanCard
                key={tab.license}
                plan={tab}
                sx={{ borderLeft: (theme) => `dashed 1px ${theme.palette.divider}` }}
              />
            )
        )}
      </Box>
    </>
  );

  return (
    <>

      <m.div variants={varFade().in}>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 5,
            },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h4">질문사항이 있다면?</Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
              정확한 답변을 원한다면 아래의 버튼을 통해 문의하세요.
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Button
              color="inherit"
              size="large"
              variant="contained"
              href="/user/help"
              sx={{
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                },
              }}
            >
              문의하기
            </Button>
          </m.div>
        </Box>
      </m.div>
    </>
  );
}

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  sx: PropTypes.object,
  plan: PropTypes.shape({
    license: PropTypes.string,
    icons: PropTypes.arrayOf(PropTypes.string),
    commons: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.string),
  }),
};

function PlanCard({ plan, sx, ...other }) {
  const { license, commons, options, icons } = plan;

  const standard = license === 'Standard';

  const plus = license === 'Standard Plus';

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        ...(plus && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
          License
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Typography variant="h4">{license}</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              bgcolor: 'error.main',
              position: 'absolute',
              ...(standard && { bgcolor: 'primary.main' }),
              ...(plus && { bgcolor: 'warning.main' }),
            }}
          />
        </Box>
      </Stack>

      {standard ? (
        <SvgColor src={icons[2]} sx={{ width: 24, height: 24 }} />
      ) : (
        <Stack direction="row" spacing={2}>
          {icons.map((icon) => (
            <SvgColor key={icon} src={icon} sx={{ width: 24, height: 24 }} />
          ))}
        </Stack>
      )}

      <Stack spacing={2.5}>
        {commons.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2">{option}</Typography>
          </Stack>
        ))}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {options.map((option, optionIndex) => {
          const disabled =
            (standard && optionIndex === 1) ||
            (standard && optionIndex === 2) ||
            (standard && optionIndex === 3) ||
            (plus && optionIndex === 3);

          return (
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(disabled && { color: 'text.disabled' }),
              }}
              key={option}
            >
              <Iconify icon={disabled ? 'eva:close-fill' : 'eva:checkmark-fill'} width={16} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          );
        })}
      </Stack>

      <Stack alignItems="flex-end">
        <Button
          color="inherit"
          size="small"
          target="_blank"
          rel="noopener"
          endIcon={<Iconify icon="eva:chevron-right-fill" />}
        >
          Learn more
        </Button>
      </Stack>
    </Stack>
  );
}
