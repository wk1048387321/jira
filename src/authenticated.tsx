import React, {useState} from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {ButtonNoPadding, Row} from "./components/lib";
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg';
import {Button, Dropdown, Menu} from "antd";
import {Navigate, Route, Routes} from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import {ProjectScreen} from "./screens/project";
import {resetRoute} from "./utils";
import {ProjectModal, ProjectModalProps} from "./screens/project-list/project-modal";
import {ProjectPopover} from "./components/project-popover";



export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false);


    return (
        <Container>
            <PageHeader setProjectModalOpen={setProjectModalOpen} />
            {/*<ButtonNoPadding onClick={() => setProjectModalOpen(true)}>打开</ButtonNoPadding>*/}
            <Main>
                <Router basename={'/'}>
                    <Routes>
                        {/*路由重定向*/}
                        <Route index element={<Navigate to={'/projects'} replace />} />

                        <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen} />} />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                    </Routes>
                </Router>
            </Main>

            <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />

        </Container>
    )
}

const PageHeader = (props: Pick<ProjectModalProps, 'setProjectModalOpen'>) => {
    const {logout, user} = useAuth();

     return (
         <Header between={true}>
             <HeaderLeft gap={true}>
                 <ButtonNoPadding type={'link'} onClick={() => resetRoute()}>
                     <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                 </ButtonNoPadding>
                 <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
                 <span>用户</span>
             </HeaderLeft>
             <HeaderRight>
                 <Dropdown overlay={<Menu>
                     <Menu.Item key={'logout'}><Button onClick={logout} type={'link'}>退出</Button></Menu.Item>
                 </Menu>}>
                     <Button type={'link'}>Hi {user?.name}</Button>
                 </Dropdown>
             </HeaderRight>
         </Header>
     )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`

`
const Main = styled.main``


