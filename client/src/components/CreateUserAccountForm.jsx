import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateUserAccountForm = (props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: props.accountDetails ? props.accountDetails.name : "",
        email: props.accountDetails ? props.accountDetails.email : "",
        phone: props.accountDetails ? props.accountDetails.phoneNumber : "",
        link: props.accountDetails ? props.accountDetails.link : "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const [errors, setErrors] = useState({});

    function checkEmail(email) {
        //email must have format a@b.c and no white spaces;

        let len = email.length;
        let hasAtSymbol = false;
        let hasDotSymbol = false;
        for(let i = 0; i < len; i++) {
            if(email[i] === 32 || email[i] === 10 || email[i] === 13 || email[i] === 9) {
                console.log(email[i]);
                return false;
            }

            if(email[i] == '@') {
                hasAtSymbol = true;
            }

            if(email[i] == '.' && hasAtSymbol) {
                hasDotSymbol = true;
            }    
        }

        return hasAtSymbol && hasDotSymbol;
    }
    
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

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } 
        else if (formData.email.length >= 100) {
            newErrors.email = "Email must be at most 100 characters long";
        }
        else if(!checkEmail(formData.email)) {
            newErrors.email = "Email must be an valid one";
        }

        const phoneRegex = /^\+?[0-9\s\-()]{0,25}$/
        if(!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } 
        else if (formData.phone.length > 100) {
            newErrors.phone = "The phone number must be at most 25 characters long";
        } 
        else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "The phone number must be an valid one";
        }

        if (!formData.link.trim()) {
            newErrors.link = "The Linkedin/personal website link is required";
        } 
        else if (formData.link.length >= 200) {
            newErrors.link = "The link must be at most 200 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!validate()) return;

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
            {
                !props.accountDetails ? 
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
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
                {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </div>

            <div>
                <label htmlFor="link">Linkedin/personal website:</label>
                <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                />
                {errors.link && <p style={{ color: "red" }}>{errors.link}</p>}
            </div>

            <button type="submit" className="buttonStyle buttonStyleFirstLogin"> Submit </button>
            </form>
        </div>
    );
}

export default CreateUserAccountForm;
