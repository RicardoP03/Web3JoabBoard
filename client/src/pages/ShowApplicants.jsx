import React from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import ShowApplicant from "../components/ShowApplicant";


const ShowApplicants = (props) => {
    const { id } = useParams();
    const [value, setValue] = useState(null);
    const [applicants, setApplicants] = useState(null);
    const [isYourJob, setIsYourJob] = useState(false);
    
    useEffect(() => {
        try {
            const bigNumber = BigNumber.from(id); 
            setValue(bigNumber); 
        } catch (error) {
            setValue(null); 
        }
    }, [id])

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const applicants = await props.getApplicants(value); 
                setApplicants(applicants);
            } 
            catch (error) {
                setApplicants(null); 
            }
        };
    
        fetchApplicants();
    }, [value]);

    useEffect(() => {
        const fetchIsYourJob = async () => {
            try {
                if(value) {
                    const IsYourJob = await props.checkIsYourJob(value); 
                    setIsYourJob(IsYourJob);
                }
            } 
            catch (error) {
                setIsYourJob(false); 
            }
        };
    
        fetchIsYourJob();
    }, [value])

    
    if(!isYourJob) {
        return (
            <div>
                <NavBar isUserAccount = {props.isUserAccount}/>
                <div className="centeredContainer">
                    <p className="bigText">Sorry, but you don't have access to this page.</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount}/>
            <div className="centeredContainer">
                {   
                    applicants && applicants.length > 0?
                    <p className="bigText"> Here is an list with all the applicants:</p>
                    :
                    <p className="bigText">There are no applicants.</p>
                }

                {
                    applicants?
                    applicants.map((applicant) => (
                        <ShowApplicant key={applicants.applicationId} applicant={applicant} 
                                       acceptApplicant = {props.acceptApplicant}
                                       rejectApplicant = {props.rejectApplicant}/>
                    ))
                    :
                    null
                }
            </div>
        </div>
    )
}

export default ShowApplicants;