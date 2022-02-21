import React from 'react';
import '../App.css';
import { Button } from './Button';
import './FunctionSection.css';

function FunctionSection() {
  return (
    <div className='function-container'>
        <video src='/videos/video-2.mp4' autoPlay muted loop />
        <h1>RENDR</h1>
        <p>Function Description</p>
        <div className="function-btns">
            <Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'>Function Button</Button>
            <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'>
                Function Button 2<i className="far fa-play-cirlce"/>
            </Button>
        </div>
    </div>
  )
}

export default FunctionSection