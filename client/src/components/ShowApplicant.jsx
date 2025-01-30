import React from "react";

const ShowApplicant = (props) => {
    return (
        <div>
            <p>Name: {props.applicant.name} </p>
            <p>Email: {props.applicant.email} </p>
            <p>Phone number: {props.applicant.phoneNumber}</p> 
            <hr/>
        </div>
    )
}

export default ShowApplicant;