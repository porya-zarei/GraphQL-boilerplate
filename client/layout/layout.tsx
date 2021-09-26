import React, {FC, ReactNode} from "react";
import FooterLayout from "./footer/footer-layout";
import HeaderLayout from "./header/header-layout";
import MainLayout from "./main/main-layout";
import MetaLayout from "./meta/meta-layout";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className="h-100 w-100">
            <MetaLayout />
            <HeaderLayout />
            <MainLayout>{children}</MainLayout>
            <FooterLayout />
        </div>
    );
};

export default Layout;
