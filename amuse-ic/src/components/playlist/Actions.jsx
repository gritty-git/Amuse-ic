import React, { useContext } from 'react'
import playerContext from '../../context/playerContext'

const fav = () => {
  console.log('I like this one')
}

// Component
function Actions(props) {
  const { SetCurrent, currentSong } = useContext(playerContext)
  const songslist = props.songsList;
  return (
    <div className="actions">
      <img src={songslist[currentSong].thumbnail} />
      <div className="album_meta">
        <span className="alb_label">{songslist[currentSong].metadata.album}'s</span>
        <h3>{songslist[currentSong].name}</h3>
        <h6>{songslist[currentSong].metadata.artist}</h6>
      </div>
      <div className="action_btns">
        <button onClick={() => fav()} className="fav_btn">
          <i className="far fa-heart fa-2x"></i>
        </button>
        <button onClick={() => fav()} className="fav_btn">
          <i className="far fa-arrow-alt-circle-down fa-2x"></i>
        </button>
        <button onClick={() => fav()} className="fav_btn">
          <i className="fas fa-ellipsis-h fa-2x"></i>
        </button>
      </div>
    </div>
  )
}

export default Actions