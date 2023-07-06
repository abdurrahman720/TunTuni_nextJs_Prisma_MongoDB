import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps{
    label: string,
    href?: string,
    icon: IconType,
    onClick?: () => void;
    auth?: boolean;
    alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,href,icon:Icon,onClick, auth,alert
}) => {
    const { data: currentUser } = useCurrentUser()
    const loginModal = useLoginModal()
    const router = useRouter()
    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }

        if (auth && !currentUser) {
            loginModal.onOpen()
        }

        else if (href) {
            router.push(href)
        }
        
    },[router,href,onClick,currentUser,auth,loginModal])

    return (
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="relative rounded-full h-10 w-10 flex items-center justify-center p-1 hover:bg-orange-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
                <Icon size={28} color='orange'></Icon>
                {alert ? <BsDot size={70} className="text-orange-500 absolute -top-4"  /> : null}
            </div>
            <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-orange-300 hover:bg-opacity-10 cursor-pointer">
                <Icon size={28} color='orange'></Icon>
                <p className="hidden lg:block text-orange-600 text-xl">
                    {label}
                </p>
                {alert ? <BsDot size={70} className="text-orange-500 absolute -top-4"  /> : null}
            </div>
        </div>
    );
};

export default SidebarItem;