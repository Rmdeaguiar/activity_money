import { createContext, useContext } from 'react';
import { useModal } from './modalStore';

type StoresContextType = {
    modalStore: {
        modalIndex: number | null,
        setModalIndex: React.Dispatch<React.SetStateAction<number | null>>,
    }
}
const storesCtx = createContext<StoresContextType | null>(null);

export function useStores() {
    return useContext(storesCtx);
}

export function StoresProvider({ children }: { children: React.ReactNode }) {

    const modalStore = useModal();

    return (
        <storesCtx.Provider value={
            {
                modalStore
            }}>
            {children}
        </storesCtx.Provider>
    );
}