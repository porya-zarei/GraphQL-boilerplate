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

export interface PersonRegisterData {
    __typename?: string;
    address: Address;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface PersonLoginData {
    __typename?: string;
    email: string;
    password: string;
}

export interface MutationRegisterPersonData {
    registerData: PersonRegisterData;
}

export interface MutationLoginPersonData {
    loginData: PersonLoginData;
}

export interface MutationRegisterPersonResult {
    __typename?: string;
    registerPerson: {
        __typename?: string;
        token: string;
    };
}

export interface MutationLoginPersonResult {
    __typename?: string;
    loginPerson: {
        __typename?: string;
        token: string;
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