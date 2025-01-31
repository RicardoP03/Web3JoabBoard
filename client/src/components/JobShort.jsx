import React from "react";
import { Link } from "react-router-dom";

const JobShort = (props) => {
    const jobIdHex = props.job.jobId._hex;
    return (
        <div>
            <br/>
            <h3>Position: {props.job.jobTitle}</h3>
            <p>Location: {props.job.city}, {props.job.country}</p>
            <p>Company: {props.job.companyName} </p>
            <br/>
            <Link to={`/ShowJob/${jobIdHex}`}>
                <button className="buttonStyle buttonStyleFirstLogin"> See more about the job.</button>
            </Link>
            <hr/>
        </div>
    )
}

export default JobShort;