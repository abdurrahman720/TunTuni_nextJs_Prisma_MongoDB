"use client"
import { BsBellFill, BsHouseFill, BsSearch } from 'react-icons/bs'
import {BiLogOut} from 'react-icons/bi'
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTunButton from './SidebarTunButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const {data: currentUser} = useCurrentUser()
    const menuItems = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Explore',
            href: '/explore',
            icon: BsSearch
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            auth: true
        },
        
        {
            label: 'Profile',
            href: '/usres/123',
            icon: FaUser,
            auth:true
        },
       
    ]
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {
                        menuItems.map((item) => (
                            <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} auth={item.auth} />
                        ))
                    }
                    {
                        currentUser && (
                            <SidebarItem onClick={() =>signOut()} icon={BiLogOut} label="Logout" />
                        )
                    }
                    <SidebarTunButton/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;