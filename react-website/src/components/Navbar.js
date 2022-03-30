import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navigation() {


    return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>           
                <Link to='/' className='navbar-logo link'>
                    RENDR &nbsp;<i className='fa-solid fa-file-excel' />
                </Link>
            </div>
        </nav>
    </>
    )
}

export default Navigation