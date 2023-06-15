import {useEffect, useRef, useState} from "react";


export const cleanObject = (obj: {[ key: string]: unknown }) => {
    const res = {...obj};

    Object.keys(res).forEach(key => {
        const value = res[key];

        if(isVoid(value)) {
            delete res[key];
        }
    })

    return res
}

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

// export const debounce = (func, delay) => {
//     let timeout;
//
//     return (...param) => {
//         if(timeout) {
//             clearTimeout(timeout);
//         }
//
//         timeout = setTimeout(function () {
//             func(...param);
//         }, delay)
//     }
// }

// 后面用范性来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(timeout);
    }, [value, delay])

    return debounceValue;
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);

    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            let copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        }
    }
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = useRef(window.document.title).current;

    useEffect(() => {
        window.document.title = title;
    }, [title])

    useEffect(() => {
        return () => {
            if(!keepOnUnmount) {
                window.document.title = oldTitle;
            }
        }
    }, [oldTitle, keepOnUnmount])
}

