import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    if(props.noAccount == true) {
        return (
            <div>
                <nav className="navbar">
                    <ul className="navbarMenu">
                    <li className="navbarItem"><Link to="/">Home</Link></li>
                    </ul>
                </nav>
            </div>
            
        )
    }


    return (
        <div>
            <nav className="navbar">
                <ul className="navbarMenu">
                <li className="navbarItem"><Link to="/">Home</Link></li>
                <li className="navbarItem"><Link to="/about">About</Link></li>
                <li className="navbarItem"><Link to="/jobs">Jobs</Link></li>
                {
                    !props.isUserAccount ? 
                    <li className="navbarItem"><Link to="/myJobs"> My jobs</Link></li> : 
                    null
                }

                {
                    props.isUserAccount ? 
                    <li className="navbarItem"><Link to="/myJobsApplications"> Applications </Link></li> : 
                    null
                }
                <li className="navbarItem rightAligned"><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </div>
        
    )
}

export default NavBar;