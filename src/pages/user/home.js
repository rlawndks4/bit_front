import { Wrappers } from "src/components/elements/styled-components";
import UserLayout from "src/layouts/user/UserLayout";


const Home = () => {
    return (
        <>
            <Wrappers>
                Home
            </Wrappers>
        </>
    )
}
Home.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Home;