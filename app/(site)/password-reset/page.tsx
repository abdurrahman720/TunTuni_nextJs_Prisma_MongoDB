"use client"
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePassModal from '@/hooks/usePassModal';
import React, { useCallback, useState } from 'react';

const ChangePassModal = () => {

    const { data: user } = useCurrentUser();
    const changePassModal = usePassModal();
    

    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    
    const onSubmit = useCallback(() => {
        try {
            setIsLoading(true);
            console.log(password);
            changePassModal.onClose()
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    },[])
    
    const bodyContent = (
        <div>
            <Input placeholder="Enter new password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
    )

    return (
        <Modal actionLabel='Reset' title='Enter new password' isOpen={changePassModal.isOpen} body={bodyContent} onClose={changePassModal.onClose} onSubmit={onSubmit}/>
            
       
    );
};

export default ChangePassModal;