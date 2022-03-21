import React, {useState} from 'react';
import AuthStore from "./AuthStore";
import UserService from "./UserService";
import { useHistory } from 'react-router';

function Login()  {

    const loginError = 'Error logging in. Try again later.';
    const history = useHistory()
    
    // const [username,setUserName] = useState("")
    // const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [errorMessage,setErrorMessage] = useState(undefined)

    const [user,setUser] = useState({
        username:"",
        password:""
    })

    const handleLoginResponse = (response) => {
        if (response.data && response.data.token) {
            AuthStore.saveToken(response.data.token);

            if (history.location.pathname !== '/')
                history.push('/');


        } else {
            setLoading(false)
            setErrorMessage(loginError)
            
        }
    };

    const handleLoginError = (err) => {
        if (err.response && err.response.status === 400){
            setLoading(false)
            setErrorMessage(err.response.data.message)
            
        }
        else{
            setLoading(false)
            setErrorMessage(loginError)
        }
    };

    const login = (event) => {
        event.preventDefault();
        setLoading(true)
        
        UserService.login(user.username,
            user.password,
            handleLoginResponse,
            handleLoginError);
    };

    const handleChange = (event) => {
        
        setUser({
            ...user,
            [event.target.id]: event.target.value
        });
    };

    const loadingDiv = loading &&
        <div className="d-flex align-items-center justify-content-center overlay">
            <div className="spinner-border text-primary" role="status"/>
        </div>;

    const errorMessageDiv = errorMessage &&
        <div className="text-danger mb-2">{errorMessage}</div>;


    return (
        <div className="d-flex flex-column h-100 align-items-center justify-content-center">
            {loadingDiv}
            <form className="flex-column w-25">
                <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
                {errorMessageDiv}
                <input autoComplete="off" type="username" id="username" className="form-control mb-3"
                        placeholder="Username" value={user.username} onChange={handleChange}/>
                <input type="password" id="password" className="form-control mb-3" placeholder="Password"
                        value={user.password} onChange={handleChange}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={login}>
                    Sign in
                </button>
                
            </form>
        </div>
    );

}

export default Login;
