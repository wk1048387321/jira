/** @jsxImportSource @emotion/react */
import React from "react";
// import { jsx } from '@emotion/react'
import {Form, Input, Select} from "antd";

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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SearchPanel = ({users, param, setParam}: SearchPanel) => {

    return <Form layout={'inline'} css={{marginBottom: '2rem'}}>
        <Form.Item>
            {/*setParam(Object.assign({}, param, {name: ev.target.value}))*/}
            <Input placeholder={'项目名'} type="text" value={param.name} onChange={ev => setParam({...param, name: ev.target.value})} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => setParam({...param, personId: value})}>
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map(user => <Select.Option value={String(user.id)} key={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </Form.Item>
    </Form>
}
