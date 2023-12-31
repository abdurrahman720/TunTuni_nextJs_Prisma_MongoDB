
import { create } from "zustand";

interface PassResetModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const usePassResetModal = create<PassResetModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default usePassResetModal;