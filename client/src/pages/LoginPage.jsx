import React from "react";
import About from "../components/About";
import Login from "../components/Login";
import NavBar from "../components/NavBar";


const LoginPage = (props) => {
    return (
        <div>
            <NavBar noAccount = {true}/>
            <About/>
            <Login/>
        </div>
    )
}

export default LoginPage;