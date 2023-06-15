import React from "react";
import {Link} from "react-router-dom";
import {Routes, Route, Navigate} from 'react-router';
import {KanbanScreen} from "../kanban";
import {EpicScreen} from "../epic";

export const ProjectScreen = () => {

    return <div>
        <h1>ProjectScreen</h1>

        <Link to={'kanban'} >看板</Link>
        <br/>
        <Link to={'epic'} >任务组</Link>

        <Routes>
            {/*路由重定向*/}
            <Route index element={<Navigate to={window.location.pathname + '/kanban'} replace />} />

            <Route path={'/kanban'} element={<KanbanScreen />} />
            <Route path={'/epic'} element={<EpicScreen />} />
        </Routes>


    </div>
}
