import {gql} from "@apollo/client";
import {DocumentNode} from "graphql";

export const GET_Persons: DocumentNode = gql`
    query {
        persons(first: 50) {
            nodes {
                id
                personID
                firstName
                lastName
                address {
                    city
                    street
                }
            }
        }
    }
`;

export const GET_PersonById: DocumentNode = gql`
    query personById($id: ID!) {
        personById(id: $id) {
            id
            personID
            firstName
            lastName
            address {
                city
                street
            }
        }
    }
`;
