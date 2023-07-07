"use client"
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import usePassResetModal from "@/hooks/usePassResetModal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const passResetModal = usePassResetModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        loginModal.onClose()
        registerModal.onOpen();
        

    },[isLoading,registerModal,loginModal])

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true)
            console.log({email, password})
            
            await signIn('credentials', { email, password })
            toast.success("Login Successfully")
          
            loginModal.onClose()
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }, [loginModal,email,password])
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
            <p onClick={() => {
                 loginModal.onClose()
                passResetModal.onOpen()
               
            }} className="text-neutral-500 hover:underline cursor-pointer">Forgot Password?</p>
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4"> 
            <p>New on TunTuni?</p>
            <span onClick={onToggle} className="text-white cursor-pointer hover:text-orange-600 hover:underline">
               Register
            </span>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Sign In" onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
    );
};

export default LoginModal;