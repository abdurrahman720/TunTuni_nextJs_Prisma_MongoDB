"use client"
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";


const UserView = ({ params }: { params: { userId: string } }) => {

    const userId = params.userId;
    const { data: fetchedUser, isLoading } = useUser(userId as string);
    
    if (isLoading || !fetchedUser) {
        return (
           <Loader />
        )
    }
    
    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string}/>
        </>
    );
};

export default UserView;