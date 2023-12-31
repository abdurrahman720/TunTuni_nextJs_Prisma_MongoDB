"use client"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react"; 

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        registerModal.onClose();
        loginModal.onOpen()

    },[isLoading,registerModal,loginModal])

    const onSubmit = useCallback(async () => {
        try {
          setIsLoading(true);
          
          await axios.post('/api/register', {
            email,
            password,
            username:userName,
            name,
          });
    
          setIsLoading(false)
    
          toast.success('Account created.');
    
          signIn('credentials', {
            email,
            password,
          });
    
          registerModal.onClose();
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      }, [email, password, registerModal, userName, name]);

    
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
             <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
             <Input
                placeholder="user name"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                disabled={isLoading}
            />
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
           
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4"> 
            <p>Already have an Account?</p>
            <span onClick={onToggle} className="text-white cursor-pointer hover:text-orange-600 hover:underline">
                Sign In
            </span>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title="Regiser" actionLabel="Sign Up" onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent}  />
    );
};

export default RegisterModal;