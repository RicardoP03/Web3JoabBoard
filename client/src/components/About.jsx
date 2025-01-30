import React from "react";

const About = (props) => {
    return (
        <div className="centeredContainer">
            <h1>About Us</h1>
            <p>
                Welcome to <span>Decentralized Job Board</span>, the future of job-seeking and hiring in the Web3 era. 
                Our platform leverages the power of blockchain technology to create a trustless, transparent, and accessible 
                ecosystem for job seekers and employers alike.
            </p>

            <h2>How It Works</h2>
            <p>
                Our decentralized job board is simple and user-friendly:
            </p>
            <ul className="custom-list">
                <li>Job seekers connect their Web3 wallet, build their profile, and apply to jobs with one click.</li>
                <li>Employers post jobs, review applications.</li>
                <li>All payments and agreements are secured and executed using smart contracts.</li>
            </ul>

            <p>
                Whether you’re a job seeker looking for your next big opportunity or an employer searching for the best talent, 
                <span >Decentralized Job Board</span> is here to transform the way you connect and collaborate.
            </p>
        </div>
    )
}

export default About;