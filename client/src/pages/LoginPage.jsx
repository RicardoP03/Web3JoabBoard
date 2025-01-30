import React from "react";
import About from "../components/About";
import Login from "../components/Login";


const LoginPage = (props) => {
    return (
        <div>
            <About/>
            <Login connectWallet = {props.connectWallet}/>
        </div>
    )
}

export default LoginPage;