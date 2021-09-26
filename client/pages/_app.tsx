import "../styles/globals.css";
import type {AppProps} from "next/app";
import Layout from "../layout/layout";
import MainContextProvider from "../contexts/main-context/main-context";
import {FC} from "react";

const MyApp: FC<AppProps> = ({
    Component,
    pageProps,
}: AppProps) => {
    return (
        <MainContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </MainContextProvider>
    );
};

export default MyApp;
