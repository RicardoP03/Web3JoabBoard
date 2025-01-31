import React from "react";

const ShowApplication = (props) => {
    return (
        <div className="centeredContainer">
            <h3>Position: {props.application.jobTitle}</h3>
            <p>Location: {props.application.city}, {props.application.country}</p>
            <p>Company: {props.application.companyName} </p>

            {
                props.application.status == 0?
                <p>Status: Your application is under review.</p>
                :
                null
            }

            {
                props.application.status == 1?
                <p>Status: Your application was accepted, the company should contact you soon.</p>
                :
                null
            }

            {
                props.application.status == 2?
                <p>Status: The company decided to move foward with other candidates this time.</p>
                :
                null
            }
            <hr/>
        </div>
    )
}

export default ShowApplication;