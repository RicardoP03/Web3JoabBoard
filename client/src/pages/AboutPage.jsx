import React from "react";
import NavBar from "../components/NavBar";
import About from "../components/About";

const AboutPage = (props) => {
    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount}/>
            <About/>
        </div>
    )
}

export default AboutPage