import React, {useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./Login";
import AuthStore from "./AuthStore";
import Home from "./Home";
import axios from "axios/index";


function App() {
    
    const [update,setUpdate] = useState(false);
    const history = useHistory()

    const logout = (event) => {
        event.preventDefault();
        AuthStore.removeToken();
        // history.push('/');
        setUpdate(true);
        
    };
    
    useEffect(() => {
        axios.defaults.timeout = 10000;
        axios.defaults.headers.common['Authorization'] = `Bearer ${AuthStore.getToken()}`;
        

    });

    const PrivateRoute = ({component: Component, ...rest})=> {
        return (
            <Route
                {...rest}
                render={(props) => AuthStore.isLoggedIn()
                    ? <Component {...props}/>
                    : <Redirect to={{pathname: '/login'}}/>}/>
        );
    }

    const logoutBtn = <button className="link-button nav-link" onClick={logout}> Logout</button>;

    return (
        <div className='h-100'>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">RampUp</div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            &nbsp;
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item active">
                            {AuthStore.isLoggedIn() && logoutBtn}
                        </li>
                    </ul>

                </div>
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
