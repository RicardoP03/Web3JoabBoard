import React from "react";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import ShowApplication from "../components/ShowApplication";

const MyJobsApplications = (props) => {
    const [applications, setApplications] = useState([]); 

    useEffect(() => {
        props.applicationsPromise
            .then(applicationsData => {
                setApplications(applicationsData); 
            }).catch(error => console.error("Error:", error));
    }, [props.applicationsPromise]);

    if(!props.isUserAccount) {
        return (
            <div>
                <NavBar isUserAccount = {props.isUserAccount}/>
                <div className="centeredContainer">
                        <p className="bigText"> Sorry, but your account isn't registered as an job seeker. </p>
                </div>
            </div>
        )

    }
    
    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount}/>

            <div className="centeredContainer">
                {
                    applications.length > 0?
                    <p className="bigText">Here is the list of the jobs you have applied so far.</p>
                    :
                    <p className="bigText">You haven't applied yet to any jobs on our website.</p>

                }

                {
                    applications.length > 0?
                    applications.map((application) => (
                        <ShowApplication key={application.jobId} application={application} />
                    )) 
                    :
                    null
                }
            </div>
        </div>
    )
}
export default MyJobsApplications;