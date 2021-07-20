import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute ({doneLoading, isLoggedIn, component: Component, ...rest}){
    return (
    <Route {...rest} 
    render={(props) => {
        
        return (isLoggedIn) ? <Component {...rest}{...props}/> : 
        <Redirect to={{pathname : '/', state: {from: props.location}}} />
        
    }}
    />
    );
}
export default ProtectedRoute;