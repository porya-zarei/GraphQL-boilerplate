import {FC, useContext, useState} from "react";
import {GetStaticProps} from "next";
import {ApolloError} from "@apollo/client";
import {GET_Persons} from "../graphql/queries/getPersons";
import {GetPersonsData, Person} from "../types/Person";
import {client} from "../graphql/client/client";
import Link from "next/link";
import {
    MainContext,
    MainContextType,
} from "../contexts/main-context/main-context";

interface IndexPageProps {
    persons: Array<Person>;
    isError: boolean;
    error: ApolloError | null;
}

const IndexPage: FC<IndexPageProps> = ({persons, isError}) => {
    if (isError) {
        return <div>error ...</div>;
    }

    const {userToken} = useContext<MainContextType>(MainContext);

    return (
        <div className="container w-100">
            <div className="container w-100">
                <div className="row justify-content-center align-items-center p-3 m-0">
                    {isError
                        ? "Hi Nextjs TypeScript | Landing Page"
                        : persons.map((person) => (
                              <Link
                                  key={person.personID}
                                  href={`/profile/${person.id}`}>
                                  <a className="alert alert-info col-3">
                                      {person?.firstName +
                                          " | " +
                                          person?.lastName}
                                  </a>
                              </Link>
                          ))}
                </div>
            </div>
            <div className="container text-break">Token : {userToken}</div>
            <div className="container w-100">
                <div className="m-2">
                    <Link href="/auth/login/">
                        <a className="btn btn-success">Login</a>
                    </Link>
                </div>
                <div className="m-2">
                    <Link href="/auth/register/">
                        <a className="btn btn-info">register</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async (context) => {
    let data: GetPersonsData = null,
        error: null = null,
        isError: boolean = false;

    try {
        const {data: d} = await client.query<GetPersonsData>({
            query: GET_Persons,
        });
        data = d;
    } catch (e) {
        error = null;
        isError = true;
        console.log("error in create person", e);
    }

    const props: IndexPageProps = {
        persons: data?.persons?.nodes || null,
        error: error || null,
        isError,
    };
    return {
        props,
    };
};

// export const getStaticPaths: GetStaticPaths = async (context) => {

//     const puq:URLSearchParams = {2:""};
//     const paths:IPath[] = [{params:{"key1":"value2","key2":[""]},locale:""}]
//     return {
//         paths: paths,
//         fallback: true,
//     };
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     return {
//         props: {},
//     };
// };
