import React, { useContext } from 'react'
// import {song_list} from '../../context/songs'
import playerContext from '../../context/playerContext'

function Playlist(props) {
  const { SetCurrent, currentSong } = useContext(playerContext)
  const songslist = props.songsList;
  return (
    <div className="playlist no_drag">
      {/* <div className="header">
        <h4 className="pltext">Songs by artist</h4>
      </div> */}
      <ul className="loi">
        {songslist.map((song, i) => (
          <li
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
              {/* <button className="options_song playlist_btn">
                <i className="fas fa-ellipsis-v fa-lg"></i>
              </button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist