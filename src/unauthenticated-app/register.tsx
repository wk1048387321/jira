import React from "react";
import { Form, Input } from 'antd';
import {useAuth} from "../context/auth-context";
import {LongBottom} from "./index";
import {useAsync} from "../utils/use-async";

export const RegisterScreen = ({onError}: {onError: (error: Error) => void}) => {
    const {register} = useAuth();
    const {run, isLoading} = useAsync(undefined, {throwOnError: true});
    const handleSubmit = async ({verifyPassword, ...values}: {username: string, password: string, verifyPassword: string}) => {
        if(verifyPassword !== values.password) {
            onError(new Error('请确认两次输入的密码一致'));
            return
        }
        try {
            await run(register(values));
        } catch(e) {
            onError(e as Error);
        }
    }


    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder={'用户名'} type="text" id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type="password" id={'password'}/>
        </Form.Item>
        <Form.Item name={'verifyPassword'} rules={[{required: true, message: '请确认密码'}]}>
            <Input placeholder={'确认密码'} type="password" id={'verifyPassword'}/>
        </Form.Item>
        <Form.Item>
            <LongBottom loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongBottom>
        </Form.Item>
    </Form>
}
