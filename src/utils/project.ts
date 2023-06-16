import {useAsync} from "./use-async";
import {Project} from "../screens/project-list/list";
import {useEffect} from "react";
import {cleanObject} from "./index";
import {useHttp} from "./http";


export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const {run, ...result} = useAsync<Project[]>();
    const fetchProject = () => client('projects', {data: cleanObject(param || {})});

    useEffect(() => {
        run(fetchProject(), {retry: fetchProject})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result;
}

export const useEditProject = () => {
    const {run, ...asyncResult} = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const {run, ...asyncResult} = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}
