import { createContext, useContext, ReactNode } from 'react';
import { useModal } from './modalStore';
import { Dispatch, SetStateAction } from 'react';

type StoresContextType = {
    modalStore: {
      
    }
}
const storesCtx = createContext<StoresContextType | null>(null);

export function useStores() {
    return useContext(storesCtx);
}

export function StoresProvider({ children }: { children: ReactNode }) {

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