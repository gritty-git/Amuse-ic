import React from "react";

function Header() {  
    return (
      <header className="draggable header">
        <h3 style={{"float":"left"}}>AMUSE-IC</h3>
        <a style={{"float":"right"}} href="/auth/signin" className="btn btn-primary btn-block">Login</a>
      </header>
    )
  }
  
  export default Header