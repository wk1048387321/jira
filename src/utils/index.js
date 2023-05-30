import {useEffect, useState} from "react";


export const cleanObject = (obj) => {
    const res = {...obj};

    Object.keys(res).forEach(key => {
        const value = res[key];

        if(isFalsy(value)) {
            delete res[key];
        }
    })

    return res
}

export const isFalsy = (value) => value === 0 ? false : !value;


export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
}

export const debounce = (func, delay) => {
    let timeout;

    return (...param) => {
        if(timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
            func(...param);
        }, delay)
    }
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(timeout);
    }, [value, delay])

    return debounceValue;
}
