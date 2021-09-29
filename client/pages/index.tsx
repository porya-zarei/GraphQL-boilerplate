import {FC, useState} from "react";
import {GetStaticProps} from "next";
import {ApolloError} from "@apollo/client";
import {GET_Persons} from "../graphql/queries/getPersons";
import {
    GetPersonsData,
    Person,
} from "../types/Person";
import {client} from "../graphql/client/client";
import Link from 'next/link'

interface IndexPageProps {
    persons: Array<Person>;
    isError: boolean;
    error: ApolloError | null;
}

const IndexPage: FC<IndexPageProps> = ({persons, isError}) => {
    
    if (isError) {
        return <div>error ...</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center align-items-center p-3 m-0">
                    {isError
                        ? "Hi Nextjs TypeScript | Landing Page"
                        : persons.map((person) => (
                              <Link href={`/profile/${person.id}`}>
                                  <a className="alert alert-info col-3">
                                      {person?.name}
                                  </a>
                              </Link>
                          ))}
                </div>
            </div>
            <div>
                <Link href="/profile/new">
                    <a className="btn btn-info">Add new</a>
                </Link>
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
