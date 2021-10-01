import {useMutation} from "@apollo/client";
import {GetServerSideProps} from "next";
import {FC, FormEventHandler, useRef, useState} from "react";
import {client} from "../../graphql/client/client";
import {CREATE_Persons} from "../../graphql/mutations/createPerson";
import {GET_PersonById} from "../../graphql/queries/getPersons";
import {
    GetPersonData,
    MutationCreatePersonData,
    MutationCreatePersonInput,
    Person,
    PersonInput,
} from "../../types/Person";
import Link from "next/link";
interface ProfilesPageProps {
    id: string | string[];
    person: Person;
    isErroe: boolean;
}

const ProfilesPage: FC<ProfilesPageProps> = ({
    id,
    person,
    isErroe,
}) => {

    if (isErroe) {
        return <div className="container">error | {id}</div>;
    }

    return (
        <div className="container">
            <div className="card bg-secondary">
                <div className="card-header alert alert-dark text-white">
                    {person.personID}
                </div>
                <div className="card-body">
                    <div className="alert alert-light m-1">
                        {person?.firstName + " " + person?.lastName}
                    </div>
                    <div className="alert alert-light m-1">
                        {person?.address?.city +
                            " | " +
                            person?.address?.street}
                    </div>
                </div>
            </div>
            <Link href="/">
                <a className="btn btn-warning">Back Home</a>
            </Link>
        </div>
    );
};

export default ProfilesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id;
    try {
        if (!id || id.length < 56) {
            const props: ProfilesPageProps = {
                id: id,
                person: null,
                isErroe: true,
            };
            return {props};
        }
        console.log("in profiles => ", id);

        const {data} = await client.query<GetPersonData>({
            query: GET_PersonById,
            variables: {
                id: id,
            },
        });

        const props: ProfilesPageProps = {
            id: id,
            person: data.personById,
            isErroe: false,
        };

        return {
            props,
        };
    } catch (error) {
        const props: ProfilesPageProps = {
            id: null,
            person: null,
            isErroe: true,
        };
        return {
            props,
        };
    }
};
