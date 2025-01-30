import React from "react";
import NavBar from "../components/NavBar";

const MyJobsApplications = (props) => {
    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount}/>
            <div className="centeredContainer">
                {   
                    props.isUserAccount ?
                    <p className="bigText"> Here is the list of your applications on our website. </p> :
                    <p className="bigText"> Sorry, but your account isn't registered as an job seeker. </p>
                }
            </div>
        </div>
    )
}
export default MyJobsApplications;