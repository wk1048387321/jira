import React from "react";
import {User} from "./search-panel";
import {Dropdown, Table, TableProps, Button, Menu} from "antd";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {Pin} from "../../components/pin";
import {useEditProject} from "../../utils/project";
import {ProjectModalProps} from "./project-modal";
import {ButtonNoPadding} from "../../components/lib";

interface ListProps extends TableProps<Project>, Pick<ProjectModalProps, 'setProjectModalOpen'> {
    users: User[],
    refresh?: () => void,
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
    const {mutate} = useEditProject();
    // 函数柯里化
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh);

    return <Table rowKey={'id'} pagination={false} loading={false} columns={[
        {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
            }
        },
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
        }, {
            render(value, project) {
                return <Dropdown overlay={<Menu>
                    <Menu.Item key={'edit'}>
                        <ButtonNoPadding type={'link'} onClick={() => props.setProjectModalOpen(true)}>编辑</ButtonNoPadding>
                    </Menu.Item>
                </Menu>}>
                    <Button type={'link'}>...</Button>
                </Dropdown>
            }
        }
    ]} {...props} />
}
