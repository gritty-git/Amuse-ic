import React, { useState, useEffect } from 'react'

import Header from './../graphics/Header'
import Actions from './../playlist/Actions';
import Playlist from './../playlist/Playlist';
import Controls from './../Controls'
import PlayerState from './../../context/playerState';

function PlayerInterface(props) {
    console.log(props.username);
    return (
        props.songList.length===0 ? <div className="App">Please refresh the page!!</div> :
        <PlayerState songsList={props.songList}>
        <div className='main'>
            <div className='top'>
            <Header loggedIn={true} username={props.username}/>
            <Actions songsList={props.songList}/>
            <Playlist songsList={props.songList}/>
            </div>
            <Controls songsList={props.songList}/>
        </div>
        </PlayerState>
    )
}

export default PlayerInterface;