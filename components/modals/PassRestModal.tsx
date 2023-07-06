"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import usePassResetModal from "@/hooks/usePassResetModal";
import Modal from "../Modal";
import { useCallback, useState } from "react";
import Input from "../Input";


const PassRestModal = () => { 
    const {data:user} = useCurrentUser()
    const passResetModal = usePassResetModal();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = useCallback(() => {
        try {
            console.log(email);
            setIsSubmit(true);
        }
        catch (err: any) {
            console.log(err)
        }
    },[email])

    const bodyContent = isSubmit ? (
        <div className=" flex justify-center">
            <p className="text-white">We have sent password reset link this <span className="text-orange-500">{email }</span> email. Please check your inbox </p>
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