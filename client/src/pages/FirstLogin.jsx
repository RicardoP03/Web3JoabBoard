import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const FirstLogin = (props) => {
    return (
        <div>
            <NavBar noAccount = {true}/>
            <div className="centeredContainer">
                <h2> You haven't created an account yet.</h2>
                <br/>
                <Link to = "/CreateUserAccount">
                    <button className="buttonStyle buttonStyleFirstLogin"> Register as Job Seeker</button>
                </Link>

                <br/>
                <Link to = "/CreateCompanyAccount">
                    <button className="buttonStyle buttonStyleFirstLogin"> Register as Employer </button>
                </Link>
            </div>
        </div>
    )
}

export default FirstLogin;
