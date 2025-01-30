import React, { useState } from "react";
import { Link } from "react-router-dom";


const CreateUserAccountForm = (props) => {
    const [formData, setFormData] = useState({
        name: props.accountDetails ? props.accountDetails.name : "",
        email: props.accountDetails ? props.accountDetails.email : "",
        phone: props.accountDetails ? props.accountDetails.phoneNumber : "",
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
            {
                !props.accountDetails ? 
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
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit" className="buttonStyle buttonStyleFirstLogin"> Submit </button>
            </form>
        </div>
    );
}

export default CreateUserAccountForm;
