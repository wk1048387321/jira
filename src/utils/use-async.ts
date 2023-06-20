import {useCallback, useReducer, useState} from "react";
import {useMountedRef} from "./index";

interface State<D> {
    error: Error | null;
    data: D | null;
    status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
    status: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...arg: T[]) => void) => {
    const mountedRef = useMountedRef();

    return useCallback((...arg: T[]) => {mountedRef.current ? dispatch(...arg) : void 0}, [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({...state, ...action}), {...defaultInitialState, ...initialState});
    const [retry, setRetry] = useState(() => () => {});
    const safeDispatch = useSafeDispatch(dispatch);

    const setData = useCallback((data: D) => safeDispatch({
        data,
        status: 'success',
        error: null
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        data: null,
        status: 'error',
        error
    }), [safeDispatch])

    const run = useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
        if(!promise || !promise.then) {
            throw new Error('请输入 Promise 类型数据')
        }

        setRetry(() => () => {
            if(runConfig?.retry()) run(runConfig?.retry(), runConfig);
        });

        safeDispatch({status: 'loading'});

        return promise
            .then(data => {
                setData(data);
                return data;
            })
            .catch(error => {
                setError(error);
                if(config.throwOnError) return Promise.reject(error);
                return error;
            })
    }, [config.throwOnError, setData, setError, safeDispatch])

    return {
        isIdle: state.status === 'idle',
        isLoading: state.status === 'loading',
        isError: state.status === 'error',
        isSuccess: state.status === 'success',
        run,
        setData,
        setError,
        retry,
        ...state
    }
}
