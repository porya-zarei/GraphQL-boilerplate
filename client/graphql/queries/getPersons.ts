import {gql} from "@apollo/client";
import {DocumentNode} from "graphql";

export const GET_Persons: DocumentNode = gql`
    query {
        persons(first: 50) {
            nodes {
                id
                name
                addresses {
                    city
                    street
                }
                mainAddress {
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
            name
            addresses {
                city
                street
            }
            mainAddress {
                city
                street
            }
        }
    }
`;
