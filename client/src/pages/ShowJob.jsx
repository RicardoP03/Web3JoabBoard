import React from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import JobDetailed from "../components/JobDetailed";


const ShowJob = (props) => {
    const { id } = useParams();
    const [value, setValue] = useState(null); 
    const [job, setJob] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
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
        const fetchJobData = async () => {
            try {
                const jobData = await props.getData(value); 
                setJob(jobData); 
            } 
            catch (error) {
                setJob(null); 
            }
        };
    
        fetchJobData();
    }, [value]);


    useEffect(() => {
        const fetchCheckIfHasApplied = async () => {
            try {
                if(value) {
                    const hasApplied = await props.checkIfHasApplied(value); 
                    setHasApplied(hasApplied); 
                }
            } 
            catch (error) {
                setHasApplied(false); 
            }
        };
    
        fetchCheckIfHasApplied();
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

    return (
        <div>
            <NavBar isUserAccount = {props.isUserAccount}/>

            <div className="centeredContainer">
                {
                    value && job?
                    <JobDetailed job = {job} 
                                 isUserAccount = {props.isUserAccount} 
                                 hasApplied = {hasApplied} 
                                 handleApplication = {props.handleApplication}
                                 isYourJob = {isYourJob}/>
                    :
                    <p className="bigText"> Sorry, but the job your searching for dosen't exist.</p>
                }

            </div>
        </div>
    )
}

export default ShowJob;