import React from 'react';
import '../../App.css';
import { Container, Form } from 'reactstrap'
import Upload from '../Upload';

function Home() {
  return (
    <>
        <Upload>
            <button>Upload Files</button>
        </Upload>
    </>
  )
}

export default Home
