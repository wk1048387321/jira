import React from 'react';
import {useAuth} from "./context/auth-context";
import {AuthenticatedApp} from "./authenticated";
import {UnauthenticatedApp} from "./unauthenticated-app";
// import {ProjectListScreen} from "./screens/project-list";
// import {TsReactTest} from "./screens/try-use-array";

function App() {
    const {user} = useAuth();

    return (
        <div className="App">
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
    );
}

export default App;
