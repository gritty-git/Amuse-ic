import React, { Fragment, useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadView = () => {
  const notify = (msg) => toast.dark(msg);
  const [file, setFile] = useState('');
  const [filenames, setFilenames] = useState([]);
  
  const onChange = e => {
    
    setFile(e.target.files);
    
  };

  const onSubmit = async e => {
    e.preventDefault();
    Object.keys(file).map(async (key,idx) => {
      const formData = new FormData();
      formData.append('file', file[key]);
      try {
        console.log("uploading "+file[key].name);
        const res = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }        
        });
        console.log("uploaded "+file[key].name);
        notify("Uploaded " + file[key].name + " !!" + idx);
        setFilenames(prevValue => {
          return [...prevValue, file[key].name];
        });
      } catch (err) {
        if (err.response.status === 500) {
          notify('There was a problem with the server');
        } else {
          notify(err.response.data.msg);
        }
        
      }
    })
    

    
  };

  return (
    
    <Fragment>
      <ToastContainer/>
      
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <input type='file' multiple onChange={onChange}/>
          <br/><br/>
          <label>
            {"To Upload : "}
            <ul>
              {Object.keys(file).filter((key) => {
                return filenames.indexOf(file[key].name)===-1;
              })
              .map((key,idx) => {
                return <li>{file[key].name}</li>
              })}
            </ul>
            {"Uploaded : "}
            <ul>
              {Object.keys(filenames)
              .map((key,idx) => {
                return <li style={{"color":"green"}}>{filenames[key]}</li>
              })}
            </ul>
          </label>
        </div>
        <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4' />
      </form>
    </Fragment>
  );
};

export default UploadView;
