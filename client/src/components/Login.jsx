import React from "react";

const Login = (props) => {
    return (
        <div className="centeredContainer">
            <h1 className="centeredMessage">Welcome to decentralized job application</h1>
            <button className="buttonStyle" onClick = {props.connectWallet}>Login Metamask</button>
        </div>
    )
}

export default Login;