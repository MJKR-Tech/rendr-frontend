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
          <h5>
            RENDR is an utility application built to perform data compliation and to populate financial reports. 
            In general, the application works by using an excel template to serve as a base format of the report, then populates the relevant fields with Jackson data uploaded by the user.
          </h5>
        </div>
        <div className='content'>
          <h5>
            1. Before a user upload a template file, the following format should be followed for the ease of data population:
          </h5>
        </div>
        <div className='subContentL'>
          <div>
            <h5>
              Single Cell Content
            </h5>
            <p>
              For single cell content, the root data cell must contain the flag "<code>## </code>" before the name of the json field.
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
            <h5>
              Dynamic Row Content
            </h5>
            <p>
              For dynamic row content, the root date cell must contain the flag "<code>!!> </code>" before the name of the json field.
            </p>
            <ul>
              <li>As shown in the diagram, each data cell with "<code>!!> </code>" will be mapped to one data field in the json data file.</li>
            </ul>
          </div>
        </div>
        <div className='subContentL'>
          <div>
            <h5>
              Dynamic Column Content
            </h5>
            <p>
              For dynamic column content, the root date cell must contain the flag "<code>!!v </code>" before the name of the json field.
            </p>
            <ul>
              <li>As shown in the diagram, each data cell with "<code>!!v </code>" will be mapped to one data field in the json data file.</li>
            </ul>
          </div>
          <img className='imageR' src='/images/ExcelTemplate.png' alt='Excel Template' width="500"/>
        </div>
    </div>
  )
}

export default FunctionSection