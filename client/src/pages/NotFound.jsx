import React from "react";
import NavBar from "../components/NavBar";

const NotFound = (props) => {
    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount} noAccount = {props.noAccount}/>
            <div className="centeredContainer">
                <h2 className="bigText"> Error 404: Either the page is not found or you must login to proceed.</h2>
            </div>
        </div>
    )
}

export default NotFound;