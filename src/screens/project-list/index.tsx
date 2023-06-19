import React from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {Button, Typography} from "antd";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useProjectSearchParams} from "./util";
import {ProjectModalProps} from "./project-modal";
import {Row} from "../../components/lib";


export const ProjectListScreen = (props: Pick<ProjectModalProps, 'setProjectModalOpen'>) => {
    const [param, setParam] = useProjectSearchParams();
    const {isLoading, error, data: list, retry} = useProjects(useDebounce(param, 300));
    const {data: users} = useUsers();

    useDocumentTitle('项目列表', false);

    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <Button onClick={() => props.setProjectModalOpen(true)} >创建项目</Button>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List users={users || []} setProjectModalOpen={props.setProjectModalOpen} dataSource={list || []} loading={isLoading} refresh={retry} />
    </Container>
}

/**
 * 跟踪循环请求
 */
ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`
