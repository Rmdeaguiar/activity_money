import { useState } from 'react';

export function useModal() {
    const [modalIndex, setModalIndex] = useState<number | null>(null);

    return {
        modalIndex,
        setModalIndex
    };
}

