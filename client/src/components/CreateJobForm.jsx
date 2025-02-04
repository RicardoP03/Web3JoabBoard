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

    const [errors, setErrors] = useState({});
    
    const validate = () => {
        let newErrors = {};
        const nameRegex = /^[A-Za-z\s-]+$/;
        if(!formData.jobTitle.trim()) {
            newErrors.jobTitle = "Job Title is required";
        } 
        else if (formData.jobTitle.length > 100) {
            newErrors.jobTitle = "Job Title must be at most 100 characters long";
        } 
        else if (!nameRegex.test(formData.jobTitle)) {
            newErrors.jobTitle = "Job Title can only contain letters, spaces, and hyphens";
        }

        if(!formData.city.trim()) {
            newErrors.city = "The city name is required";
        } 
        else if (formData.city.length > 100) {
            newErrors.city = "The city name must be at most 100 characters long";
        } 
        else if (!nameRegex.test(formData.city)) {
            newErrors.city = "The city name can only contain letters, spaces, and hyphens";
        }

        if(!formData.country.trim()) {
            newErrors.country = "The country name is required";
        } 
        else if (formData.country.length > 100) {
            newErrors.country = "The country name must be at most 100 characters long";
        } 
        else if (!nameRegex.test(formData.country)) {
            newErrors.country = "The country name can only contain letters, spaces, and hyphens";
        }
        

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } 
        else if (formData.description.length >= 5000) {
            newErrors.description = "Description must be at most 5000 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!validate()) return;

        try {
            await props.onSubmit(formData);
            navigate("/myJobs");
        }
        catch (error) {
            console.error("Error:", error);
            let newErrors = {};
            newErrors.contract = "Something went wrong calling the smart contract, check console!";
            setErrors(newErrors);
            return;
        }
    };

    return (
        <div>
            {!props.jobDetails ? 
                <p className="bigText">Create a new job</p> : 
                null
            }

            {errors.contract && <p style={{ color: "red" }}>{errors.contract}</p>}
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
                 {errors.jobTitle && <p style={{ color: "red" }}>{errors.jobTitle}</p>}
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
                 {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
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
                 {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
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
                {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
            </div>
                    
            <button type="submit" className = "buttonStyle"> Submit </button>
            </form>
        </div>
    );
}

export default CreateJobForm;
