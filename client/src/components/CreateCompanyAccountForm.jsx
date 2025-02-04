import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateCompanyAccountForm = (props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: props.accountDetails ? props.accountDetails.name : "",
        description: props.accountDetails ? props.accountDetails.description : "",
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
        if(!formData.name.trim()) {
            newErrors.name = "Name is required";
        } 
        else if (formData.name.length > 100) {
            newErrors.name = "Name must be at most 100 characters long";
        } 
        else if (!nameRegex.test(formData.name)) {
            newErrors.name = "Name can only contain letters, spaces, and hyphens";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } 
        else if (formData.description.length >= 1000) {
            newErrors.description = "Description must be at most 1000 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) return;
        try {
            await props.onSubmit(formData);
            if(!props.accountDetails) navigate("/");
            else navigate("/settings");
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
            {!props.accountDetails ? 
                <p className="bigText">Create an account</p> : 
                null
            }
            
            {errors.contract && <p style={{ color: "red" }}>{errors.contract}</p>}
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="description">About you company:</label>
                <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"  
                cols="125" 
                />
                {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
            </div>

 
            <button type="submit" className="buttonStyle buttonStyleFirstLogin"> Submit </button>
            </form>
        </div>
    );
}

export default CreateCompanyAccountForm;
