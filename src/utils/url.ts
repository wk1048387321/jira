import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanObject} from "./index";
import {URLSearchParamsInit} from "react-router-dom/dist/dom";



/**
 * 返回页面URL中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams();
    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                return {...prev, [key]: searchParams.get(key) || ''}
            }, {} as {[key in K]: string}),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]),
        (params: Partial<{[key in K]: unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;

            return setSearchParam(o);
        }
    ] as const
}
