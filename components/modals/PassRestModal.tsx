"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import usePassResetModal from "@/hooks/usePassResetModal";
import Modal from "../Modal";
import { useCallback, useState } from "react";
import Input from "../Input";
import axios from "axios";
import { toast } from "react-hot-toast";


const PassRestModal = () => { 
   
    const passResetModal = usePassResetModal();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true)
            const res = await axios.post('/api/passResetEmail', { email })
            console.log(res.data)
            toast.success("Check your email")
            setIsSubmit(true);
        }
        catch (err: any) {
            console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    },[email])

    const bodyContent = isSubmit ? (
        <div className=" flex flex-col justify-center">
            <p className="text-white">We have sent password reset link to this email: <span className="text-orange-500">{email}</span> . Please check your inbox </p> <br />
            <p className="text-neutral-400">The link is valid for 5 minutes from now!</p>
    </div>
    ) : (
            <div>
                 <Input placeholder="Enter your registered Email" value={email} onChange={(e) =>setEmail(e.target.value)} disabled={isLoading}/>
            </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={passResetModal.isOpen} onClose={passResetModal.onClose} actionLabel={isSubmit ? "Close" : "Submit"} title="Reset Your Password" body={bodyContent} onSubmit={isSubmit ? passResetModal.onClose : onSubmit} />
    );
};

export default PassRestModal;