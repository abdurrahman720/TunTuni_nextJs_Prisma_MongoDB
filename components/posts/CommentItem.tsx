import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemProps{
    data : Record<string, any>
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    const router = useRouter();

    const goToUser = useCallback((e: any) => {
        e.stopPropagation();

        router.push(`/user/${data.user.id}`)
    },[router, data.user.id])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt])


    return (
        <div className="
        border-b-[1px]
        border-orange-300
        p-5
        cursor-pointer
        hover:bg-neutral-800
        transition
        ">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.userId} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline hover:text-orange-500">
                            {data.user.name}
                        </p>
                        <span onClick={goToUser} className="text-neutral-500 hidden md:block cursor-pointer hover:underline " >
                           @{data.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                        {createdAt}
                    </span>
                    </div>
                    <div className="text-white">
                        {data?.body}
                   </div>
                </div>
           </div>
        </div>
    );
};

export default CommentItem;