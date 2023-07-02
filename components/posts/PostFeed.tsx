"use client"
import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProp{
    userId?: string;

}

const PostFeed: React.FC<PostFeedProp> = ({ userId }) => {
    const {data: posts=[]} = usePosts(userId)

    return (
        <>
            {posts.map((post: Record<string,any>) => (
                <PostItem key={post.id} userId={userId } data={post} />
        ))}
        </>
    );
};

export default PostFeed;