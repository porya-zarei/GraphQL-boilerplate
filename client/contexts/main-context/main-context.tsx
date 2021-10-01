import {type} from "os";
import {
    createContext,
    Context,
    FC,
    useState,
    ReactNode,
    useCallback,
} from "react";

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

    const changeUserToken = useCallback<ChangeUserTokenFunction>(
        (data, type = "set") => {
            if (type === "set") {
                setUserToken(data);
            }
        },
        [],
    );

    const context: MainContextType = {
        userToken,
        changeUserToken,
    };

    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default MainContextProvider;
