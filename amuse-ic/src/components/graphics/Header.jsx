import React from "react";

function Header(props) {  
    return (
      <header className="draggable header">
        <h3 style={{"float":"left"}}>AMUSE-IC</h3>
        {props.loggedIn
          ?
          <a style={{"float":"right"}} href="/auth/signout" className="">{props.username}</a>
          :
          <a style={{"float":"right"}} href="/auth/signin" className="btn btn-primary btn-block">Login</a>
        }
      </header>
    )
  }
  
  export default Header;