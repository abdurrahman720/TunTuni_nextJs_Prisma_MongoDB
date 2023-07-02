"use client"

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";


const EditModal = () => {
   
    const { data: currentUser } = useCurrentUser();
    const {mutate : mutateFetchedUser} = useUser(currentUser?.id);
    
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    }, [currentUser?.profileImage, currentUser?.coverImage, currentUser?.name, currentUser?.username, currentUser?.bio])
    
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit ()

    return (
        <></>
    );
};

export default EditModal;