import React, {FC, ReactElement, ReactNode} from "react";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({children}) => {
    return <main className="h-100 w-100">{children}</main>;
};

export default MainLayout;
