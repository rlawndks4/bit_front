import { m, useScroll, useSpring } from 'framer-motion';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// layouts
// sections
import {
    HomeHero,
    HomeMinimal,
    HomeDarkMode,
    HomeLookingFor,
    HomeForDesigner,
    HomeColorPresets,
    HomePricingPlans,
    HomeAdvertisement,
    HomeCleanInterfaces,
    HomeHugePackElements,
} from 'src/views/home';
import UserLayout from 'src/layouts/user/UserLayout';

const Home = () => {

    const theme = useTheme();

    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const progress = (
        <m.div
            style={{
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                zIndex: 1999,
                position: 'fixed',
                transformOrigin: '0%',
                backgroundColor: theme.palette.primary.main,
                scaleX,
            }}
        />
    );
   
    return (
        <>
            {/* <HeadContent dns_data={dns_data} /> */}
            {progress}
            <HomeHero />
            <Box
                sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: 'background.default',
                }}
            >
                <HomeMinimal />

                {/* <HomeHugePackElements /> */}

                <HomeForDesigner />

                <HomeDarkMode />

                <HomePricingPlans />

                <HomeLookingFor />

                <HomeAdvertisement />
            </Box>
        </>
    );
}

Home.getLayout = (page) => <UserLayout> {page} </UserLayout>;

export default Home
