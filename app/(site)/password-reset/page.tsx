"use client"
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePassModal from '@/hooks/usePassModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ChangePassModal = () => {

    const loginModal = useLoginModal()
    const router = useRouter()
    const changePassModal = usePassModal();
    
    const [token,setToken] = useState('');
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
        const urlToken = window.location.search.split("=")[1];
        console.log({token:urlToken})
        setToken(urlToken);

    }, [])
    

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);
            console.log(password);
            const res = await axios.post('/api/pass-reset', {
                token: token,
                newPassword: password
            })
            
            console.log(res.data)
            toast.success("Password Reseted!")
            changePassModal.onClose();
            router.push('/')
            loginModal.onOpen()
        }
        catch (err: any) {
            console.log(err)
            toast.error(err.message)
        }
        finally {
            setIsLoading(false)
        }
    },[changePassModal,password,token,router])
    
    const bodyContent = (
        <div>
            <Input placeholder="Enter new password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
    )

    return (
        <Modal disabled={isLoading} actionLabel='Reset' title='Enter new password' isOpen={changePassModal.isOpen} body={bodyContent} onClose={changePassModal.onClose} onSubmit={onSubmit}/>
            
       
    );
};

export default ChangePassModal;