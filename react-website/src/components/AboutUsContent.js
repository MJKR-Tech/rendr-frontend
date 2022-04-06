import React from 'react';
import '../App.css';
import './FunctionSection.css';

function FunctionSection() {
  return (
    <div className='function-container'>
        <div className='title'>
          <h1>User Guide</h1>
        </div>
        <div className='content'>
          <p>
            RENDR is an utility application built to perform data compliation and to populate financial reports. 
            In general, the application works by using an excel template to serve as a base format of the report, then populates the relevant fields with Jackson data uploaded by the user.
          </p>
        </div>
        <div className='content'>
          <p>
            Before a user upload a template file, the following format should be followed for the ease of data population:
          </p>
        </div>
        <div className='subContentL'>
          <div>
            <h3>
              Single Cell Content
            </h3>
            <p>
              For single cell content, the root data cell should contain the flag "<code>## </code>" before the name of the json field.
            </p>
            <ul>
              <li>As shown in the diagram, each data cell with "<code>## </code>" will be mapped to one data field in the json data file.</li>
            </ul>
          </div>
          <img className='imageR' src='/images/ExcelTemplate.png' alt='Excel Template' width="500"/>
        </div>
        <div className='subContentR'>
          <img className='imageL' src='/images/ExcelTemplate.png' alt='Excel Template' width="500"/>
          <div>
            <h3>
              Dynamic Row Content
            </h3>
            <p>
              For dynamic row content, the root date cell should contain the flag "<code>!!> </code>" before the name of the json field.
            </p>
            <ul>
              <li>As shown in the diagram, each data cell with "<code>## </code>" will be mapped to one data field in the json data file.</li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default FunctionSection