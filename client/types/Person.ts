export interface Address {
    __typename?: string;
    city: string;
    street: string;
}

export interface Person {
    __typename?: string;
    id: string;
    personID: string;
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    address: Address;
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

export interface RegisterTokenData {
    __typename?: string;
    registerPerson: {
        __typename?: string;
        token: string;
    };
}

export interface LoginTokenData {
    __typename?: string;
    loginPerson: {
        __typename?: string;
        token: string;
    };
}

export interface RegisterData {
    __typename?: string;
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    address: Address;
}

export interface LoginData {
    __typename?: string;
    email?: string;
    password?: string;
}

