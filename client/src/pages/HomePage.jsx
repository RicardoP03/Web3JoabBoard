import React from "react";
import NavBar from "../components/NavBar";


const HomePage = (props) => {
  return (
      <div>
        <NavBar isUserAccount = {props.isUserAccount}/>
        <div className="centeredContainer">
          <p className="centeredMessage">Welcome to decentralized job application</p>
          <p className="centeredMessage">You are connected to Metamask</p>
          <p className="centeredMessage">Metamask account: {props.account}</p>
        </div>
      </div>
  )
}

export default HomePage;
