import React from "react";
import {useEffect, useState} from "react";
import * as qs from "qs";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {cleanObject, useDebounce, useMount} from "../../utils";
import {useHttp} from "../../utils/http";

const appUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, setParam] = useState({name: '', personId: ''})
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const debounceParam = useDebounce(param, 300);
    const client = useHttp();

    useEffect(() => {
        // console.log(qs.stringify(param), cleanObject(param))
        // fetch(`${appUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
        //     if(res.ok) {
        //         setList(await res.json())
        //     }
        // })
        client('projects', {data: cleanObject(debounceParam)}).then(setList);
    }, [debounceParam])

    useMount(() => {
       // fetch(`${appUrl}/users`).then(async res => {
       //     if(res.ok) setUsers(await res.json())
       // })
        client('users').then(setUsers);
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}
