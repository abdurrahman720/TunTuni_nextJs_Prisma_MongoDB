
import { create } from "zustand";

interface PassModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const usePassModal = create<PassModalStore>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default usePassModal;