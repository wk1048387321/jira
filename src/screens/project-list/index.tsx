import React from "react";
import {useState} from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useUrlQueryParam} from "../../utils/url";


export const ProjectListScreen = () => {
    const [, setParam] = useState({name: '', personId: ''})
    const [param, setSearchParam] = useUrlQueryParam(['name', 'personId']);
    const debounceParam = useDebounce(param, 300);
    const {isLoading, error, data: list} = useProjects(debounceParam);
    const {data: users} = useUsers();

    useDocumentTitle('项目列表', false);

    console.log(param);

    return <Container>
        {/*<Helmet>*/}
        {/*    <title>项目列表</title>*/}
        {/*</Helmet>*/}
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setSearchParam} />
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
