import {createHttpLink, useApolloClient} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {
    createContext,
    Context,
    FC,
    useState,
    ReactNode,
    useCallback,
    useEffect,
} from "react";
import {api_graphql} from "../../configs/config";
import {getCookieValue} from "../../helpers/get-cookie";

interface MainContextProviderProps {
    children: ReactNode;
}

type ChangeUserTokenFunction = (data: string, type?: string) => void;

export type MainContextType = {
    userToken?: string;
    changeUserToken?: ChangeUserTokenFunction;
};

export const MainContext: Context<MainContextType> = createContext({});

const MainContextProvider: FC<MainContextProviderProps> = ({children}) => {
    const [userToken, setUserToken] = useState<string>("");
    const client = useApolloClient();

    const changeUserToken = useCallback<ChangeUserTokenFunction>(
        (data, type = "set") => {
            if (type === "set") {
                localStorage.setItem("token", data);

                //! its not good (T_T)
                document.cookie = `token=${data}; Path=/; Expires=${
                    Date.now() + 3 * 60 * 60
                };`;

                setUserToken(data);
            }
        },
        [],
    );

    const context: MainContextType = {
        userToken,
        changeUserToken,
    };
    useEffect(() => {
        if (document?.cookie) {
            setUserToken(getCookieValue("token", document.cookie));
        }
        return () => {
            document.cookie = "";
        };
    }, []);
    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default MainContextProvider;
