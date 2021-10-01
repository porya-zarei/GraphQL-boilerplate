import {FC, FormEventHandler, useContext, useState} from "react";
import Link from "next/link";
import {
    MainContext,
    MainContextType,
} from "../../../contexts/main-context/main-context";
import {useMutation} from "@apollo/client";
import {LOGIN_Person} from "../../../graphql/mutations/mutation-auth";
import {
    MutationLoginPersonData,
    MutationLoginPersonResult,
} from "../../../types/Person";
import {useRouter} from "next/dist/client/router";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
    const router = useRouter();

    const {changeUserToken} = useContext<MainContextType>(MainContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [createPerson] = useMutation<
        MutationLoginPersonResult,
        MutationLoginPersonData
    >(LOGIN_Person);

    const handleLogin: FormEventHandler = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const {
                data: {
                    loginPerson: {token},
                },
            } = await createPerson({
                variables: {
                    loginData: {
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
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="btn btn-success w-100 m-2">
                    {loading ? "loading..." : "Login"}
                </button>
            </form>
            <Link href="/">
                <a className="btn btn-danger">Back Home</a>
            </Link>
        </div>
    );
};

export default LoginPage;
