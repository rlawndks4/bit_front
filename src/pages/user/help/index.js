import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { zTabMenu } from "src/data/data";
import UserLayout from "src/layouts/user/UserLayout";


const Help = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0));
    }, [router.query])
    return (
        <>
            <Tabs
                indicatorColor='primary'
                textColor='primary'
                scrollButtons='false'
                value={currentTab}
                sx={{
                    width: '100%',
                    marginBottom: '1rem'
                }}
            >
                {zTabMenu['help'].map((item, idx) => {
                    return <>
                        <Tab value={idx} label={item.title} style={{ flexGrow: 1 }} onClick={() => {
                            router.push(`/user/help?type=${idx}`)
                        }} />
                    </>
                })}

            </Tabs>
            {currentTab == 0 &&
                <>

                </>}
            {currentTab == 1 &&
                <>

                </>}
            {currentTab == 2 &&
                <>

                </>}
            {currentTab == 3 &&
                <>

                </>}
        </>
    )
}
Help.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Help;