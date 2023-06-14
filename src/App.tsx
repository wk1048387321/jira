import React from 'react';
import {useAuth} from "./context/auth-context";
import {AuthenticatedApp} from "./authenticated";
import {UnauthenticatedApp} from "./unauthenticated-app";
import {ErrorBoundary} from "./components/error-boundary";
import {FullPageErrorFallBack} from "./components/lib";
// import {ProjectListScreen} from "./screens/project-list";
// import {TsReactTest} from "./screens/try-use-array";

function App() {
    const {user} = useAuth();

    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorFallBack} >
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </ErrorBoundary>
        </div>
    );
}

export default App;
