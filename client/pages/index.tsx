import {FC, useEffect} from "react";
import {GetStaticProps} from "next";

interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = ({}) => {
    useEffect(() => {}, []);
    return (
        <div className="d-flex justify-content-center align-content-center align-items-center">
            Hi Nextjs TypeScript | Landing Page
        </div>
    );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {},
    };
};

// export const getStaticPaths: GetStaticPaths = async (context) => {

//     const puq:URLSearchParams = {2:""};
//     const paths:IPath[] = [{params:{"key1":"value2","key2":[""]},locale:""}]
//     return {
//         paths: paths,
//         fallback: true,
//     };
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     return {
//         props: {},
//     };
// };
