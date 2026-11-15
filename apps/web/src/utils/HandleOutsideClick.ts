import { useEffect, useRef, useState } from "react";

const HandleOutsideClick = (
    callFunction: () => void,
    enabled: boolean = true,
) => {
    const ref = useRef<HTMLInputElement>(null);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!enabled) return;

        const handleOutsideClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setCount((prev) => prev + 1);
                if (count > 0) {
                    setCount(0);
                    callFunction();
                }
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => document.removeEventListener("click", handleOutsideClick);
    }, [enabled, callFunction]);

    return { ref, reset: () => setCount(0) };
};

export default HandleOutsideClick;
