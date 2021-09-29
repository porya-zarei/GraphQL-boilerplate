import { ApolloClient, InMemoryCache } from "@apollo/client";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const client = new ApolloClient({
    uri: "https://localhost:44393/graphql/",
    cache: new InMemoryCache(),
    credentials: "same-origin",
    connectToDevTools: true,
});
