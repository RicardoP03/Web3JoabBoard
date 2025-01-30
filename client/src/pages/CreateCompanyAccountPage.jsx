import React from "react";
import NavBar from "../components/NavBar";
import CreateCompanyAccountForm from "../components/CreateCompanyAccountForm";

const CreateCompanyAccountPage = (props) => {
    return (
        <div>
            <NavBar noAccount = {true}/>
                <div className="centeredContainer">
                <CreateCompanyAccountForm onSubmit = {props.onSubmit}/>
            </div>
        </div>
    )
}

export default CreateCompanyAccountPage;