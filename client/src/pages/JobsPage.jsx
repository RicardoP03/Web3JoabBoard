import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import JobShort from "../components/JobShort";

const JobsPage = (props) => {
    const [jobs, setJobs] = useState([]); 

    useEffect(() => {
        props.jobsList
            .then(jobsData => {
                setJobs(jobsData); 
            })
            .catch(error => console.error("Error:", error));
    }, [props.jobsList]);

    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount}/>
            <div className="centeredContainer">
                <p className="bigText"> Here is the list of jobs currently posted on our website. </p>

                {           
                    !props.isUserAccount ?
                    <button className="buttonStyle buttonStyleFirstLogin"  style={{ backgroundColor: 'green'}}>
                        <Link to = "/createAnJob"> Add an new job. </Link>
                    </button>:
                    null
                }

                {
                    jobs.length > 0 ? 
                    jobs.map((job) => (
                        <JobShort key={job.jobId} job={job} />
                    )) : 
                    (<p>Currently there are no jobs available.</p>)
                }
                
            </div>
        </div>
    )
}
export default JobsPage;