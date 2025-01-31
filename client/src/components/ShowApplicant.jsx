import React from "react";

const ShowApplicant = (props) => {
    return (
        <div>
            <p>Name: {props.applicant.name} </p>
            <p>Email: {props.applicant.email} </p>
            <p>Phone number: {props.applicant.phoneNumber}</p> 

            {
                props.applicant.status == 0?
                <p>Status: The applicant is waitting for your response.</p>
                :
                null
            }

            {
                props.applicant.status == 1?
                <p>Status: You have accepted this applicant. You should contact the applicant soon.</p>
                :
                null
            }

            {
                props.applicant.status == 2?
                <p>Status: You have rejected this applicant.</p>
                :
                null
            }

            <div className="containerApplicantButtons">
                <button className="buttonStyle buttonStyleFirstLogin" 
                        style={{ backgroundColor: 'green' }} 
                        onClick={() => props.acceptApplicant(props.applicant.applicationId)}>
                    Accepted the applicant.
                </button>

                <button className="buttonStyle buttonStyleFirstLogin" 
                        style={{ backgroundColor: 'red' }} 
                        onClick={() => props. rejectApplicant(props.applicant.applicationId)}>
                    Reject the applicant.
                </button>
            </div>

            <hr/>
        </div>
    )
}

export default ShowApplicant;