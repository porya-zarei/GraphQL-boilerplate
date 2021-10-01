import {gql} from "@apollo/client";
import {DocumentNode} from "graphql";

export const REGISTER_Person: DocumentNode = gql`
    mutation registerPerson($registerData: CreatePersonInput!) {
        registerPerson(registerData: $registerData) {
            token
        }
    }
`;


export const LOGIN_Person: DocumentNode = gql`
    mutation loginPerson($loginData: LoginPersonInput!) {
        loginPerson(loginData: $loginData) {
            token
        }
    }
`;
