import React from "react";
import {Input, Select} from "antd";

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
            <Input type="text" value={param.name} onChange={ev => setParam({...param, name: ev.target.value})} />

            <Select value={param.personId} onChange={value => setParam({...param, personId: value})}>
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map(user => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
                }
            </Select>

        </div>
    </form>
}
