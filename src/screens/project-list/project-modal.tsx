import React from "react";
import {Button, Drawer} from "antd";

export interface ProjectModalProps {
    projectModalOpen: boolean,
    onClose: () => void,
    setProjectModalOpen: (isOpen: boolean) => void,
}

export const ProjectModal = (props: Omit<ProjectModalProps, 'setProjectModalOpen'>) => {

    return <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'} >
        <h1>Project Modal</h1>
        <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
}
