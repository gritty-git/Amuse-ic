import React,{useState} from "react";

function Header(props) {  
  const [isDropdownOpened , setDropdownOpen ] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!isDropdownOpened);
    return (
      <header className="draggable header">
        <h3 style={{"float":"left","fontWeight":"bold"}}>AMUSE-IC</h3>
        {props.loggedIn
          ?
          <div style={{"float":"right"}}>
          
          <button type="button" onClick={toggleDropDown} class="btn btn-success">{props.username}</button>
          {isDropdownOpened ? <div style={{"backgroundColor":"whitesmoke"}}><a href="/auth/signout">Sign Out</a></div>:<></>}
          </div>
          :
          <a style={{"float":"right"}} href="/auth/signin" className="btn btn-primary btn-block">Login</a>
        }
      </header>
    )
  }
  
  export default Header;