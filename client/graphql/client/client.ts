import { ApolloClient, InMemoryCache } from "@apollo/client";
import { api_graphql } from "../../configs/config";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const client = new ApolloClient({
    uri: api_graphql,
    cache: new InMemoryCache(),
    credentials: "same-origin",
    connectToDevTools: true,
});
