import {FC, FormEventHandler, useContext, useState} from "react";
import Link from "next/link";
import {useMutation} from "@apollo/client";
import {
    MutationRegisterPersonData,
    MutationRegisterPersonResult,
} from "../../../types/Person";
import {CREATE_Persons} from "../../../graphql/mutations/createPerson";
import {
    MainContext,
    MainContextType,
} from "../../../contexts/main-context/main-context";
import {REGISTER_Person} from "../../../graphql/mutations/mutation-auth";
import {useRouter} from "next/dist/client/router";

interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = () => {
    const router = useRouter();

    const {changeUserToken} = useContext<MainContextType>(MainContext);

    const [city, setCity] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [createPerson] = useMutation<
        MutationRegisterPersonResult,
        MutationRegisterPersonData
    >(REGISTER_Person);

    const handleRegister: FormEventHandler = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const address = {
                city,
                street,
            };

            const {
                data: {
                    registerPerson: {token},
                },
            } = await createPerson({
                variables: {
                    registerData: {
                        firstName,
                        lastName,
                        address,
                        email,
                        password,
                    },
                },
            });
            console.log("token in register person => ", token);
            changeUserToken(token);
            router.replace("/");
        } catch (error) {
            console.log("error in register person => ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleRegister}>
                <div className="form-group m-1">
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        id="firstNameField"
                        aria-describedby="firstname"
                        placeholder="your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group m-1">
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="lastNameField"
                        aria-describedby="lastname"
                        placeholder="your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group m-1">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="emailField"
                        aria-describedby="email"
                        placeholder="your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group m-1">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="passwordField"
                        aria-describedby="password"
                        placeholder="your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group m-1">
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
                    {loading ? "loading..." : "Register"}
                </button>
            </form>
            <Link href="/">
                <a className="btn btn-danger">Back</a>
            </Link>
        </div>
    );
};

export default RegisterPage;
