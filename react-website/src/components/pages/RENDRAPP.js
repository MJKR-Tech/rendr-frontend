import React from 'react';
import '../../App.css';
import { Container, Form } from 'reactstrap'
import Upload from '../Upload';

function RENDRAPP() {
  return (
    <>
      <div className="rendr-background">
        {/* <Container className="outer-container"> */}
          <Upload>
              {/* <button>Upload Files</button> */}
          </Upload>
        {/* </Container> */}
      </div>
    </>
  )
}

export default RENDRAPP;
