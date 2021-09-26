import {createContext, Context, FC, useState, ReactElement, SetStateAction, Dispatch, ReactNode} from "react";

interface MainContextProviderProps {
    children: ReactNode;
}

type MainContextType = {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
}

const MainContext: Context<object> = createContext({});

const MainContextProvider: FC<MainContextProviderProps> = ({children}) => {

    const [state, setState] = useState<string>();
    
    const context: MainContextType = {
        state,
        setState,
    };
    
    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default MainContextProvider;
