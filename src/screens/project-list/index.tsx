import React from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useProjectSearchParams} from "./util";


export const ProjectListScreen = () => {
    const [param, setParam] = useProjectSearchParams();
    const {isLoading, error, data: list} = useProjects(useDebounce(param, 300));
    const {data: users} = useUsers();

    useDocumentTitle('项目列表', false);

    return <Container>
        {/*<Helmet>*/}
        {/*    <title>项目列表</title>*/}
        {/*</Helmet>*/}
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
}

/**
 * 跟踪循环请求
 */
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`
