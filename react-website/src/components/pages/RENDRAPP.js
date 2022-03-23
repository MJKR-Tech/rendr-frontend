import React from 'react';
import '../../App.css';
import { Container, Form } from 'reactstrap'
import Upload from '../Upload';

function RENDRAPP() {
  return (
    <>
        <video src='/videos/video-1.mp4' autoPlay muted loop />
        <Upload>
            <button>Upload Files</button>
        </Upload>
    </>
  )
}

export default RENDRAPP;
