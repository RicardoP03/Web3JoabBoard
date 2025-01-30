import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import JobShort from "../components/JobShort";

const MyJobsPage = (props) => {
    const [jobs, setJobs] = useState([]); 
    
    useEffect(() => {
        props.jobsList
            .then(jobsData => {
                setJobs(jobsData); 
            })
            .catch(error => console.error("Error fetching jobs:", error));
    }, [props.jobsList]);

    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount} notConnected = {props.notConnected}/>
            <div className="centeredContainer">
                {   
                    !props.isUserAccount ?
                    <p className="bigText"> Here is the list of jobs you've posted on our website. </p> :
                    <p className="bigText"> Sorry, but your account isn't registered as an emploier. </p>
                }

                {           
                    !props.isUserAccount ?
                    <button className="buttonStyle buttonStyleFirstLogin"  style={{ backgroundColor: 'green'}}>
                        <Link to = "/createAnJob"> Add an new job. </Link>
                    </button> 
                    :
                    null
                }

                {
                    !props.isUserAccount && (jobs.length > 0) ? 
                    jobs.map((job) => (
                        <JobShort key={job.jobId} job={job} />
                    )) 
                    :
                    null
                }

                {
                    !props.isUserAccount && (jobs.length == 0) ?
                    <p>You haven't posted any jobs on our website.</p>
                    :
                    null
                }
            </div>
        </div>
    )
}
export default MyJobsPage;