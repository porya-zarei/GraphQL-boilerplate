import {gql} from "@apollo/client";
import {DocumentNode} from "graphql";
import {PersonInput} from "../../types/Person";

export const CREATE_Persons: DocumentNode = gql`
    mutation createPerson($input: CreatePersonInput!) {
        createPerson(input: $input) {
            person {
                id
                name
                mainAddress {
                    city
                    street
                }
                addresses {
                    city
                    street
                }
            }
        }
    }
`;

// export const CreatePersonMutation :DocumentNode = ( person: PersonInput ) => {
//     const res: DocumentNode = gql`
//         mutation {
//             createPerson(input: {
//                     name:${person.name}
//                     mainAddress:${person.mainAddress}
//                     addresses:${person.addresses}
//             }) {
//                 person {
//                     id
//                     name
//                     mainAddress {
//                         city
//                         street
//                     }
//                     addresses {
//                         city
//                         street
//                     }
//                 }
//             }
//         }
//     `;
//     return res;
// };
