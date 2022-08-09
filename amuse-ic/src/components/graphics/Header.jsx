import React,{useState} from "react";
import Modal from 'react-modal';
import UploadView from "../views/UploadView";

Modal.setAppElement('#root');
function Header(props) {  
  const [modalIsOpen, setOpenModal] = useState(false);

  const [isDropdownOpened , setDropdownOpen ] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!isDropdownOpened);
  function openModal() {
    setOpenModal(true);
  }
  function closeModal() {
    setOpenModal(false);
  }
    return (
      <div>
        <header className="draggable header">
          <h3 style={{"float":"left","fontWeight":"bold"}}>AMUSE-IC</h3>
          {props.loggedIn
            ?
            <div style={{"float":"right"}}>
            
            <button type="button" onClick={toggleDropDown} className="btn btn-success">{props.username}</button>
            {isDropdownOpened ? <div style={{"backgroundColor":"whitesmoke"}}><button style={{"margin":"9px"}} type="button" onClick={openModal} className="btn btn-primary">Upload</button><a role="button" style={{"margin":"9px"}} className="btn btn-danger" href="/auth/signout">Sign Out</a></div>:<></>}
            </div>
            :
            <a style={{"float":"right"}} href="/auth/signin" className="btn btn-primary btn-block">Login</a>
          }

        </header>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          
        >
          
          <button className="btn btn-danger mb-2" onClick={closeModal}>X</button>
          <UploadView/>
        </Modal>
      </div>
    )
  }
  
  export default Header;