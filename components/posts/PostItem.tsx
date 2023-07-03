"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps{
    data: Record<string, any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });


    const goToUser = useCallback((e: any) => {
        e.stopPropagation();

        router.push(`/user/${data.user.id}`)
    },[router, data.user.id])

    const goToPost = useCallback(() => {
        router.push(`/post/${data.id}`)
    }, [router, data.id])
    
    const onLike = useCallback((e: any) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen()
        }

        toggleLike()
        
    }, [loginModal, currentUser, toggleLike])
    
    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt])
    
    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart 




    return (
        <div onClick={goToPost} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
             <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div className="flex flex-col ">
                <div className="flex flex-row items-center gap-2">
                    <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">
                        {data.user.name}
                    </p>
                    <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                        @{data.user.username}
                    </span>
                    <span className="text-neutral-500 text-sm">
                        {createdAt}
                    </span>
                </div>
                    <div className="text-white">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div className="flex flex-row items-center text-neutral-500 cursor-pointer gap-2 trasition hover:text-orange-500">
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.comments.length || 0} 
                            </p>
                       </div>
                        <div onClick={onLike} className="flex flex-row items-center text-neutral-500 cursor-pointer gap-2 trasition hover:text-orange-500">
                            <LikeIcon size={20} color={hasLiked ? 'orange' : ''} />
                            <p>
                                {data.likeIds.length || 0} 
                            </p>
                       </div>
                    </div>
                </div>
                   
                </div>
        </div>
    );
};

export default PostItem;