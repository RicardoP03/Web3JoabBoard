import React from "react";
import { Link } from "react-router-dom";

const JobDetailed = (props) => {
    return (
        <div>
            <br/>
            <h3>Position: {props.job.jobTitle}</h3>
            <p>Location: {props.job.city}, {props.job.country}</p>
            <p>About the position: {props.job.description}</p>

            {   
                props.isUserAccount &&! props.hasApplied?
                <button className="buttonStyle buttonStyleFirstLogin" style={{ backgroundColor: 'green' }} onClick={() => props.handleApplication(props.job.jobId)}>
                    Apply for this job.
                </button>
                :
                null
            }

            {   
                props.isUserAccount && props.hasApplied?
                <h3> You've applied to this job!</h3>
                :
                null
            }

            {
                props.isYourJob?
                <Link to={`/ShowApplicants/${props.job.jobId._hex}`}>
                    <button className="buttonStyle buttonStyleFirstLogin"> See all the applicants.</button>
                </Link>
                :
                null
            }
        </div>
    )
}

export default JobDetailed;