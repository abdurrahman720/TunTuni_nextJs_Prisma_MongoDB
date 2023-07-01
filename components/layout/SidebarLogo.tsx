"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsTwitter } from 'react-icons/bs';

const SidebarLogo = () => {
    const router = useRouter();

    return (
        <div onClick={() =>router.push('/')} className="rounded-full h-14 w-14 p-4 flex items-center hover:bg-orange-500 hover:bg-opacity-10 cursor-pointer transition">
            <BsTwitter size={28} color="orange"/>
        </div>
    );
};

export default SidebarLogo;