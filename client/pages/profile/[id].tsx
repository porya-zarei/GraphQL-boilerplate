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
    creating: boolean;
}

const ProfilesPage: FC<ProfilesPageProps> = ({
    id,
    person,
    isErroe,
    creating,
}) => {
    if (isErroe) {
        return <div className="container">error | {id}</div>;
    }

    const [city, setCity] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [createPerson] = useMutation<
        MutationCreatePersonData,
        MutationCreatePersonInput
    >(CREATE_Persons, {
        variables: {
            input: {
                name: "Albert Einstein 3",
                mainAddress: {
                    city: "Ulm",
                    street: "_",
                },
                addresses: [
                    {city: "Ulm", street: "_"},
                    {city: "NewYork", street: "_"},
                ],
            } as PersonInput,
        },
    });

    if (creating) {
        const handleCreatePerson: FormEventHandler = (e) => {
            e.preventDefault();
            setLoading(true);
            const mainAddress = {
                city,
                street,
            };
            createPerson({
                variables: {
                    input: {
                        name: name,
                        mainAddress,
                        addresses: [mainAddress],
                    },
                },
            })
                .then((res) => {
                    console.log("res in create person", res);
                })
                .catch((e) => {
                    console.log("error in create person", e);
                });
            setLoading(false);
        };

        return (
            <div className="container">
                <form onSubmit={handleCreatePerson}>
                    <div className="form-group m-1">
                        <label htmlFor="nameField">Name : </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="nameField"
                            aria-describedby="emailHelpId"
                            placeholder="your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="cityField"></label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            id="cityField"
                            aria-describedby="emailHelpId"
                            placeholder="your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="streetField"></label>
                        <input
                            type="text"
                            className="form-control"
                            name="street"
                            id="streetField"
                            aria-describedby="emailHelpId"
                            placeholder="your street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 m-1">
                        {loading ? "loading..." : "Add"}
                    </button>
                </form>
                <Link href="/">
                    <a className="btn btn-danger">Back</a>
                </Link>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="card bg-secondary">
                <div className="card-header alert alert-dark text-white">
                    {person.id}
                </div>
                <div className="card-body">
                    <div className="alert alert-light m-1">{person?.name}</div>
                    <div className="alert alert-light m-1">
                        {person?.mainAddress?.city +
                            " | " +
                            person?.mainAddress?.street}
                    </div>
                </div>
            </div>
            <Link href="/profile/new">
                <a className="btn btn-info">Add new</a>
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
                isErroe: false,
                creating: true,
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
            creating: false,
        };

        return {
            props,
        };
    } catch (error) {
        const props: ProfilesPageProps = {
            id: null,
            person: null,
            isErroe: true,
            creating: false,
        };
        return {
            props,
        };
    }
};
