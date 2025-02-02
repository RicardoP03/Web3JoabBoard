import React from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    return (
        <div className="centeredContainer">
            <h1 className="centeredMessage">Welcome to decentralized job application</h1>
            <Link to="/FirstLogin">
                <button className="buttonStyle">Create an account</button>
            </Link>
        </div>
    )
}

export default Login;