import {useState} from "react";
import {RegisterScreen} from "./register";
import {LoginScreen} from "./login";
import {Card, Button} from 'antd';

export const UnauthenticatedApp = () => {
    const [isRegister, setRegister] = useState(false);

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <Card>
                { isRegister ? <RegisterScreen /> : <LoginScreen /> }
                <Button onClick={() => setRegister(!isRegister)}>切换到{isRegister?'登录':'注册'}</Button>
            </Card>
        </div>
    )
}
