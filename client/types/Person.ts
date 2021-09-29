export interface Address {
    __typename?: string;
    city: string;
    street: string;
}

export interface Person {
    __typename?: string;
    id: string;
    mainAddress: Address;
    addresses: Address[];
    name: string;
}

export interface GetPersonsData {
    __typename?: string;
    persons: {
        nodes: Person[];
        __typename?: string;
    };
}

export interface GetPersonData {
    __typename?: string;
    personById: Person;
}

export interface PersonInput {
    __typename?: string;
    mainAddress: Address;
    addresses: Address[];
    name: string;
}

export interface MutationCreatePersonInput {
    input: PersonInput;
}

export interface MutationCreatePersonData {
    __typename?: string;
    createPerson: {
        __typename?: string;
        person: Person;
    };
}

`{
    "data": {
        "createPerson": {
            "person": {
                "id": "UGVyc29uCmdmM2Y3ZDVjYjMzM2Y0ZTM1ODEyZjNmYmJlN2ZlNTcxZQ==",
                "name": "Albert Einstein 4",
                "mainAddress": {
                    "city": "Ulm",
                    "street": "_",
                    "__typename": "Address"
                },
                "addresses": [
                    {
                        "city": "Ulm",
                        "street": "_",
                        "__typename": "Address"
                    },
                    {
                        "city": "NewYork",
                        "street": "_",
                        "__typename": "Address"
                    }
                ],
                "__typename": "Person"
            },
            "__typename": "CreatePersonPayload"
        }
    }
}`;
