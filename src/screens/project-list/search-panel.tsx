import React from "react";
import {Interface} from "readline";

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanel {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanel['param']) => void;
}

export const SearchPanel = ({users, param, setParam}: SearchPanel) => {

    return <form action="">
        <div>
            {/*setParam(Object.assign({}, param, {name: ev.target.value}))*/}
            <input type="text" value={param.name} onChange={ev => setParam({...param, name: ev.target.value})} />

            <select value={param.personId} onChange={ev => setParam({...param, personId: ev.target.value})}>
                <option value={''}>负责人</option>
                {
                    users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)
                }
            </select>

        </div>
    </form>
}
