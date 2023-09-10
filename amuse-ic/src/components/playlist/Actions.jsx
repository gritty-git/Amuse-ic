import React, { useContext } from 'react'
import playerContext from '../../context/playerContext'

const download = () => {
  
}

// Component
function Actions(props) {
  const { SetCurrent, currentSong } = useContext(playerContext)
  const songslist = props.songsList;
  return (
    <div className="actions">
      <img src={songslist[currentSong].thumbnail} style={{height:"50%"}} />
      <div className="album_meta">
        <span className="alb_label">{"data unavailable"}'s</span>
        <h3>{songslist[currentSong].name}</h3>
        <h6>{"data unavailable"}</h6>
      </div>
      <div className="action_btns">
        
        {/* <a className="fav_btn" href={songslist[currentSong].webContentLink}>
          <i className="far fa-arrow-alt-circle-down fa-2x"></i>
        </a> */}
        
      </div>
    </div>
  )
}

export default Actions