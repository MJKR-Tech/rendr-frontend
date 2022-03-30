import axios from "axios";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import CheckForm from "./CheckForm";

function Upload({ children }) {
  
  const [dataArr, setData] = useState(false);
  const baseSite = "http://localhost:8080";
  const apiPath = "/api/v1";
  const generatePath = "/uploadTemplate";
  const generateURL = baseSite + apiPath + generatePath;
  // const [reset, setReset] = useState(false);
  // const [uploadedTemplate, setUploadedTemplate] = useState(false);
  const history = useHistory();

  const updateData = async (files) => {
    let dataArr = files;
    if (Object.keys(dataArr).length === 0) {
      throw new Error("Data fed is empty."); 
    }
    return dataArr;
  };

  const uploadFiles = async (event) => {
    setData({});

    try {
      let dataArr = await updateData(event.target.files);
      console.log(dataArr);
      setData(dataArr);

    } catch (error) {
      console.error(error);
      setData({}); // reset back
    }
  };

  // const deleteTemplate = async (index) => {
  //   axios.delete(baseSite + apiPath + "/deleteTemplate/" + index)
  //     .then((res => {
  //       console.log('deleted' + index);
  //       setReset(!reset);
  //     }))
  //     .catch((err) => {console.log(err)});
  // }

  const uploadTemplates = async (event) => {
    let template = await event.target.files[0];
    const formData = new FormData();
    formData.append('file', template, template.name);

    axios.post(generateURL, formData, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then((res => {
        console.log('success');
        // setUploadedTemplate(true);
        // setReset(!reset);
        // console.log(reset);
        // window.location.reload(); 
        history.go(0);
      }))
      .catch((err) => {console.log(err)});
  };

  return (
    <div className="wrapper">
      <div className="outer-container">
        <div style={{display:'block'}}>
          <div className="container">
            <div className="template-upload">
              <input type="file" onChange={uploadTemplates} accept=".xls,.xlsx" />
              <p style={{margin:"auto"}}>Upload new templates</p>
            </div>
          </div>
          <div className="container">
            <div className="file-upload">
              <input type="file" multiple onChange={uploadFiles} accept=".json" />
              <p style={{margin:"auto"}}>Upload your JSON files</p>
            </div>
          </div>
          {/* <div className="container">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Delete a template by index"/>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onClick={deleteTemplate}>Delete</button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="container">
          <CheckForm dataArr={dataArr} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
