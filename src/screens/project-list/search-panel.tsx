/** @jsxImportSource @emotion/react */
import React from "react";
// import { jsx } from '@emotion/react'
import {Form, Input, Select} from "antd";
import {Project} from "./list";
import {IdSelect} from "../../components/id-select";
import {UseSelect} from "../../components/use-select";

export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanel {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,
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
            <UseSelect
                defaultOptionName={'负责人'}
                value={param.personId}
                onChange={value => setParam({...param, personId: value})}
            />
            {/*<Select value={param.personId} onChange={value => setParam({...param, personId: value})}>*/}
            {/*    <Select.Option value={''}>负责人</Select.Option>*/}
            {/*    {*/}
            {/*        users.map(user => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)*/}
            {/*    }*/}
            {/*</Select>*/}
            {/*<IdSelect value={param.personId} onChange={value => setParam({...param, personId: value})} />*/}
        </Form.Item>
    </Form>
}
