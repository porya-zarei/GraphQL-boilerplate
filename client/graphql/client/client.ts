import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {api_graphql} from "../../configs/config";
import {setContext} from "@apollo/client/link/context";
import {getCookieValue} from "../../helpers/get-cookie";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpLink = createHttpLink({
    uri: api_graphql,
});

const authLink = setContext((_,{headers}) => {
    // get the authentication token from local storage if it exists
    // const token = getCookieValue("token", document.cookie);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            // authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: "same-site",
    connectToDevTools: true,
});
