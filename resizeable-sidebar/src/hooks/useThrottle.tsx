// source: https://webrix.amdocs.com/docs/hooks/usethrottle

import {useCallback, useEffect, useRef} from 'react';

export default (callback, threshold) => {
    const wait = useRef(false);
    const timeout = useRef(-1);

    useEffect(() => () => clearTimeout(timeout.current), []); // No need for deps here since 'timeout' is mutated

    return useCallback((...args) => {
        if (!wait.current) {
            callback(...args);
            wait.current = true;
            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                wait.current = false;
            }, threshold);
        }
    }, [callback, threshold]);
};