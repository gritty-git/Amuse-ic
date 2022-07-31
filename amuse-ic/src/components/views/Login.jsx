import React, { useState, useEffect } from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import Header from './../graphics/Header'

function Login(props) {
    const spinnerContainerStyle = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor:"rgba(223,223,223,0.8)", padding:"12px" };
    if(props.fetching){
        return( 
        <div className="">
            <Header loggedIn={false}/>
            
            <div style={spinnerContainerStyle}>
            <PuffLoader color="#0091e4" size={150}/>
            <br/>
            Retrieving user status....
            </div>
            
        </div>
        );
    }
      
    return (
        <div className="">
            <Header loggedIn={false}/>
            
            <div className='login-page'>
                
                <br></br>
                You are not logged in! Login by clicking on the button in header.
                
                <br></br>
                <h5>To do before log-in</h5>
                <li>Create a folder and rename it to "Music" inside your root folder of OneDrive.</li>
                <li>Put the mp3 files inside this folder to which you want to listen to.</li>
                <br></br>
                (If logged in then please wait for atleast 5 sec for the song to load!)
                <br></br>
                <br></br>
                If you don't want to sign in and rather listen to my selected songs, use the following Microsoft credentials : 
                <br></br>
                Email : soumyamusicdump@gmail.com<br/>
                Password : musicdumpsoumya123$<br/>
                
            </div>
            
        </div>
        );
}
export default Login;