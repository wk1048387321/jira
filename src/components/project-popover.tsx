import React from "react";
import {Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";
import {ButtonNoPadding} from "./lib";
import {ProjectModalProps} from "../screens/project-list/project-modal";



export const ProjectPopover = (props: Pick<ProjectModalProps, 'setProjectModalOpen'>) => {
    const {data: project, isLoading} = useProjects();
    const pinnedProject = project?.filter(project => project.pin);


    const content = <ContentContainer>
        <Typography.Text type={'secondary'} >收藏项目</Typography.Text>
        <List>
            { pinnedProject?.map(project => <List.Item key={project.id}><List.Item.Meta title={project.name} /></List.Item>) }
        </List>
        <Divider />
        <ButtonNoPadding type={'link'} onClick={() => props.setProjectModalOpen?.(true)} >创建项目</ButtonNoPadding>
    </ContentContainer>;

    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
  min-width: 10rem;
`
