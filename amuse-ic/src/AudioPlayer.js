import React, { useState, useEffect } from 'react'
import Header from './components/graphics/Header'
import Actions from './components/playlist/Actions';
import Playlist from './components/playlist/Playlist';
import Controls from './components/Controls'
import PlayerState from './context/playerState';
import { song_list } from './context/songs'
import axios from "axios";
import './main.css'
import './input.css'
import 'bootstrap/dist/css/bootstrap.css';
import PuffLoader from "react-spinners/PuffLoader";



function AudioPlayer() {
  var [songList,getSongList] = useState(song_list);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    
    setFetching(true);
    axios.get('/filedata')
    .then(res => {
      
      setFetching(false);
      if(Array.isArray(res.data)){
        console.log(res);
        getSongList(res.data);
        setLoggedIn(true);
      }else{
        
      }
        
    }).catch(err => {
      
      setFetching(false);
    });
    
  },[]);
  if(!loggedIn){
    if(fetching){
      return( 
        <div className="">
          <Header/>
          
          <div style={ { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor:"rgba(223,223,223,0.8)", padding:"12px" }}>
          <PuffLoader color="#0091e4" size={150}/>
          <br/>
          Retrieving user status....
          </div>
          
        </div>
      );
    }
    
    return <div className="">
    <Header/>
    
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
    
    </div>;
    
  }
  // console.log(songList);
  return (
    songList.length===0 ? <div className="App">Please refresh the page!!</div> :
    <PlayerState songsList={songList}>
      <div className='main'>
        <div className='top'>
          <Header/>
          <Actions songsList={songList}/>
          <Playlist songsList={songList}/>
        </div>
        <Controls songsList={songList}/>
      </div>
    </PlayerState>
  );
}

export default AudioPlayer;
