import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";

const App = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const handleAuth = () => {
        setUserLoggedIn(!userLoggedIn)
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            handleAuth() 
        }
    }, [])
  
    const jobs = [
        "Front-End Developer",
        "Node.js Developer",
        "MEAN Stack Developer",
        "FULL Stack Developer",
    ];

    return (
        <div className="">
            <NavBar jobs={jobs} userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
        </div>
    );
};

export default App;
