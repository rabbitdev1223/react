import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import axios from "axios/index";
import Login from "./components/Login";
import AuthStore from "./store/AuthStore";
import Home from "./components/Home";

function App() {

    useEffect(() => {
        axios.defaults.timeout = 10000;
        axios.defaults.headers.common['Authorization'] = `Bearer ${AuthStore.getToken()}`;      
    });

    const PrivateRoute = ({component: Component, ...rest})=> {
        return (
            <Route
                {...rest}
                render={(props) => AuthStore.isLoggedIn()? 
                    <Component {...props}/>
                    : <Redirect to={{pathname: '/login'}}/>}/>
        );
    }

    return (
        <div className='h-100'>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">RampUp</div>
            </nav>
            <div className='h-100'>

                <Switch>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/" component={Home}/>
                </Switch>

            </div>
        </div>
    );
}

export default App;
