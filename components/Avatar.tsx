import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";



interface AvatarProps{
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    userId,isLarge,hasBorder
}) => {
    const router = useRouter()
    const { data: fetchUser } = useUser(userId);

    const onClick = useCallback((event: any) => {
        event.stopPropagation();
        const url = `/user/${userId}`
        router.push(url)
    }, [userId, router])
    

    return (
        <div className={`
        ${hasBorder ? 'border-4 border-orange-500' : ""}
        ${isLarge ? 'w-32 h-32' : 'w-12 h-12'}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
        `}>
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%',
                }}
                alt="avatar"
                onClick={onClick}
                src={fetchUser?.profileImage || '/images/placeholder.png'}
            />
        </div>
    )
}

export default Avatar;