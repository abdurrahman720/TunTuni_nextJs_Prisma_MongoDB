"use client"
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import NotificationFeed from "@/components/notifications/NotificationFeed";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


const Notifications = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/");
          },
    })
    if (status === "loading") {
        return (
         <Loader />
        );
      }

    return (
        <>
            <Header label="Notifications" showBackArrow />
            <NotificationFeed />
        </>
    );
};

export default Notifications;