import React from "react";
import NavBar from "../components/NavBar";
import CreateJobForm from "../components/CreateJobForm";

const CreateJobPage = (props) => {
    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount} notConnected = {props.notConnected}/>
            <div className="centeredContainer">
                {   
                    !props.isUserAccount ?
                    <CreateJobForm onSubmit = {props.onSubmit}/> :
                    <p className="bigText"> Sorry, but your account isn't registered as an emploier. </p>
                }
            </div>
        </div>
    )
}

export default CreateJobPage;