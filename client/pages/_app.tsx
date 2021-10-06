import "../styles/globals.css";
import type {AppProps} from "next/app";
import Layout from "../layout/layout";
import MainContextProvider from "../contexts/main-context/main-context";
import {FC} from "react";
import {ApolloProvider} from "@apollo/client";

import {client} from "../graphql/client/client";

const MyApp: FC<AppProps> = ({Component, pageProps}: AppProps) => {
    return (
        <ApolloProvider client={client}>
            <MainContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MainContextProvider>
        </ApolloProvider>
    );
};

export default MyApp;
