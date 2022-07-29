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



function AudioPlayer() {
  var [songList,getSongList] = useState(song_list);
  const [isLoading, setLoading] = useState(true);
  const jsonData= require('./data.json'); 
  useEffect(() => {
    //console.log('Will now fetch song list');
    axios.get('/filedata')
    .then(res => {
      if(Array.isArray(res.data)){
        // console.log(res);
        getSongList(res.data);
        setLoading(false);
      }else{
        console.log("login!");
      }
        
    })
  },[]);
  if(isLoading){
    console.log("loading");
    return <div className="">
    <Header/>
    <div className='login-page'>
      Loading...
      <br></br>
      (If not logged in then Login here!)
      <br></br>
      <a href="/auth/signin" className="btn btn-primary btn-block btn-lg">Login</a>
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
      {/* <button className="btn btn-primary" onClick={() => { 
      getSongList(jsonData);
      setLoading(false);
      }}>
        Click Here!
      </button>  */}
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
