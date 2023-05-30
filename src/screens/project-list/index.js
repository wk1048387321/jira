import React from "react";
import {useEffect, useState} from "react";
import * as qs from "qs";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {cleanObject} from "../../utils";

// const appUrl = process.env.REACT_APP_API_URL
const appUrl = "http://localhost:3001";

export const ProjectListScreen = () => {
    const [param, setParam] = useState({name: '', personId: ''})
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        // console.log(qs.stringify(param), cleanObject(param))
        fetch(`${appUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
            if(res.ok) {
                setList(await res.json())
            }
        })
    }, [param])

    useEffect(() => {
       fetch(`${appUrl}/users`).then(async res => {
           if(res.ok) setUsers(await res.json())
       })
    }, [])

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}
