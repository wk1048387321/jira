import React from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import softwareLogo from './assets/software-logo.svg';


export const AuthenticatedApp = () => {
    const {logout} = useAuth();
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                   <img src={softwareLogo} alt="LOGO" />
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={() => logout()}>退出</button>
                </HeaderRight>
            </Header>

            <Main>
                <ProjectListScreen />
            </Main>

        </Container>
    )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`

`
const Main = styled.main``


