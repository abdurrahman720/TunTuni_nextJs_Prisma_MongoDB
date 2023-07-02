"use client"
import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId)

    }, [userId, currentUser?.followingIds])

    const toggleFollow = useCallback(async() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        let request;
        try {
            if (isFollowing) {
                request = ()=> axios.delete(`/api/follow/${userId}`)
            } else {
                request = ()=> axios.post(`/api/follow/${userId}`)
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success("Success")

        }
        catch (err:any) {
            toast.error(err.message)
        }
        


    },[loginModal,currentUser,isFollowing,mutateCurrentUser,mutateFetchedUser,userId])
    

    return {
        isFollowing,
        toggleFollow
    }

}

export default useFollow;