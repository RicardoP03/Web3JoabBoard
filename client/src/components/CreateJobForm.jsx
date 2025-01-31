import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateJobForm = (props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jobTitle: props.jobDetails ? props.jobDetails.jobTitle : "",
        city: props.jobDetails ? props.jobDetails.city : "",
        country: props.jobDetails ? props.jobDetails.country : "",
        description: props.jobDetails ? props.jobDetails.description : "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await props.onSubmit(formData);
            navigate("/myJobs");
        }
        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {!props.jobDetails ? 
                <p className="bigText">Create a new job</p> : 
                null
            }
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="jobTitle ">The title of the position:</label>
                <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label htmlFor="city">The city where to position is located:</label>
                <input
                type="city"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label htmlFor="country">The country where the position is located:</label>
                <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label htmlFor="description">About the position:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="8"  
                    cols="125"  
                />

            </div>
                    
            <button type="submit" className = "buttonStyle"> Submit </button>
            </form>
        </div>
    );
}

export default CreateJobForm;
