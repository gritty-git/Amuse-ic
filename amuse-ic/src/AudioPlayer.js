import React, { useState, useEffect } from 'react'

import { song_list } from './context/songs'
import axios from "axios";
import './main.css'
import './input.css'
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/views/Login';
import PlayerInterface from './components/views/PlayerInterface';



function AudioPlayer() {
  var [songList,getSongList] = useState(song_list);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [username, setUsername] = useState("User");
  useEffect(() => {
    setFetching(true);
    console.log("came here to fetch");
    axios.get('/filedata')
    .then(res => {
      console.log(res);
      setFetching(false);
      if(Array.isArray(res.data)){
        setUsername(prevValue => {return res.data[res.data.length-1]});
        console.log(res.data[-1]);
        getSongList(res.data.slice(0,-1));
        setLoggedIn(true);
      }else{
        
      }
    }).catch(err => {
      console.log(err);
      setFetching(false);
    });
  },[]);
  if(!loggedIn){
    return (<Login fetching={fetching} username={username}/>);
  }

  return (
    <PlayerInterface songList={songList} username={username}/>
  );
}

export default AudioPlayer;
