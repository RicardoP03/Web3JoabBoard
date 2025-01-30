import React from "react";
import NavBar from "../components/NavBar";
import CreateUserAccountForm from "../components/CreateUserAccountForm";
import { Link } from "react-router-dom";

const CreateUserAccountPage = (props) => {
    return (
        <div>
            <NavBar noAccount = {true}/>
                <div className="centeredContainer">
                <CreateUserAccountForm onSubmit = {props.onSubmit}/>
            </div>
        </div>
    )
}

export default CreateUserAccountPage;