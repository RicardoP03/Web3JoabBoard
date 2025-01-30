import { checkProperties } from "ethers/lib/utils";
import React from "react";
import NavBar from "../components/NavBar";
import CreateCompanyAccountForm from "../components/CreateCompanyAccountForm";
import CreateUserAccountForm from "../components/CreateUserAccountForm";

const SettingPage = (props) => {

    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount}/>


            <div className="centeredContainer">
                <p className="bigText"> Account settings. </p>

                {props.isUserAccount ? 
                    (<CreateUserAccountForm onSubmit={props.onSubmit} accountDetails={props.accountDetails}/>) : 
                    (<CreateCompanyAccountForm onSubmit={props.onSubmit} accountDetails={props.accountDetails}/>)
                }
            </div>
        </div>
    )
}

export default SettingPage;