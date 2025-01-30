import React, { useState } from "react";
import { Link } from "react-router-dom";


const CreateCompanyAccountForm = (props) => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(formData);
    };

    return (
        <div>
            {!props.accountDetails ? 
                <p >Create an account</p> : 
                null
            }
            
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
            </div>

            <div>
                <label htmlFor="description">About you company:</label>
                <input
                type="textarea"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                />
            </div>

 
            <button type="submit" className="buttonStyle buttonStyleFirstLogin"> Submit </button>
            </form>
        </div>
    );
}

export default CreateCompanyAccountForm;
