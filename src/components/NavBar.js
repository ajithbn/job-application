import React, { useState } from "react";
import { Link, Route, withRouter } from 'react-router-dom'
import Home from "./Home";
import JobApplicationForm from "./JobApplication";
import DashboardPage from "./DashBoardPage";
import Login from "./login";

const NavBar = (props) => {
    const { jobs, userLoggedIn, handleAuth } = props
    console.log('nav Login', userLoggedIn)
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to='/' className="navbar-brand" href="#">
                    Apply for Job
                </Link>
                <button
                    className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                ><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-0">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link" >
                                Home 
                            </Link>
                        </li>
                        
                        { userLoggedIn ? (
                        <>
                            
                            <li className="nav-item">
                                <Link to='/dashboard' className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/' className="nav-link" onClick={() => {
                                    localStorage.removeItem('token');
                                    alert("Your Successfully Logged out");
                                    handleAuth();
                                }}>
                                    Logout
                                </Link>
                            </li>
                        </>
                            
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to='/register' className="nav-link" >
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </>
                            
                        )}
                        
                    </ul>
                </div>
            </div>
        </nav>
        <Route path='/' component={Home} exact={true} />
        <Route path='/register' 
            render={(props) => {
                return <JobApplicationForm {...props} jobs={jobs}/>
            }}
        />
        <Route path='/login' 
         render={(props) => {
            return <Login {...props} handleAuth={handleAuth}/>
        }} />
        <Route path='/dashboard' render={(props) => {
            return <DashboardPage {...props} jobs={jobs} />
        }} />
    </div>
  );
};

export default withRouter(NavBar);
