import React from "react";
import {User} from "./search-panel";
import {Table, TableProps} from "antd";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

interface ListProps extends TableProps<Project> {
    users: User[];
}

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

export const List = ({users, ...props}: ListProps) => {
    return <Table pagination={false} loading={false} columns={[
        {
            title: '名称',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization'
        },
        {
            title: '负责人',
            key: 'id',
            render(value, project) {
                return <span>{users.find(user => user.id === Number(project.personId))?.name || '未知'}</span>
            }
        },
        {
            title: '创建时间',
            key: 'id',
            render(value, project) {
                return <span>
                    { project.created ? dayjs(project.created).format('YYYY-MM-DD') : '暂无' }
                </span>
            }
        }
    ]} {...props} />
}
