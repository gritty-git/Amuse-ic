import React, { useContext, useState } from 'react'
// import {song_list} from '../../context/songs'
import playerContext from '../../context/playerContext'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function Playlist(props) {
  const { SetCurrent, currentSong } = useContext(playerContext)
  const songslist = props.songsList;
  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event){
    const term = event.target.value;
    setSearchTerm(term); 
  }
  return (
    <div className="playlist no_drag">
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={"Search by song's name, album, artist, etc...."}
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="searchIcon">
            {searchTerm.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={() => {setSearchTerm("")}} />
            )}
          </div>
        </div>
      </div>
      <ul className="loi">
        {songslist.map((song, i) => (
          (searchTerm=="" || ((song.name || song.alt_name).toLowerCase().includes(searchTerm.toLowerCase())) || ((song.metadata.album || "").toLowerCase().includes(searchTerm.toLowerCase()))|| ((song.metadata.artist || "").toLowerCase().includes(searchTerm.toLowerCase())) )
          ?
          (<li
            className={'songContainer ' + (currentSong === i ? 'selected' : '')}
            key={i}
            onClick={() => {
              SetCurrent(i)
            }}
          >
            <div className="tmbn_song" style={ {backgroundImage : "url("+song.thumbnail+")",
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'}} >
              <i className="fas fa-play"></i>
            </div>
            <div className="songmeta_playlist">
              <span className="songname">{song.name || song.alt_name}</span>
              <span className="songauthors">{song.name || song.alt_name}</span>
            </div>
            <div className="playlist_btns_group">
            <a className="fav_btn" href={song.webContentLink}>
              <i className="far fa-arrow-alt-circle-down fa-2x"></i>
            </a>
              
            </div>
          </li>)
          :
          <div/>
        ))}
      </ul>
    </div>
  )
}

export default Playlist