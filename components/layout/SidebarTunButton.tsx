"use client"
import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";

const SidebarTunButton = () => {
    const router = useRouter();

    return (
        <div onClick={() =>router.push('/')}>
            <div className="
            mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-orange-500 hover:bg-opacity-80 transition cursor-pointer
            ">
                <FaFeather size={24} color="white"/>
            </div>
            <div className="
            mt-6 hidden lg:block rounded-full px-4 p-4 bg-orange-500 hover:bg-opacity-80 transition cursor-pointer
            ">
                <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
                    Tun!
                </p>
                
            </div>

        </div>
    );
};

export default SidebarTunButton;