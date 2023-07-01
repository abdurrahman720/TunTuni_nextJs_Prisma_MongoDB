"use client"
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTunButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal()

    const onClick = useCallback(() => {
        loginModal.onOpen()
    },[loginModal])

    return (
        <div onClick={onClick}>
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