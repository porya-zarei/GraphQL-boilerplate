import {GetServerSideProps} from "next";
import {FC} from "react";

interface ProfilesPageProps {
    id: string | string[];
}

const ProfilesPage: FC<ProfilesPageProps> = ({id}) => {
    return <div>Profile - {id}</div>;
};

export default ProfilesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log("in profiles => ", context.query.id);
    const props: ProfilesPageProps = {
        id: context.query.id,
    };
    return {
        props,
    };
};
