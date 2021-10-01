import {gql} from "@apollo/client";
import {DocumentNode} from "graphql";

export const CREATE_Persons: DocumentNode = gql`
    mutation createPerson($input: CreatePersonInput!) {
        createPerson(input: $input) {
            token
        }
    }
`;