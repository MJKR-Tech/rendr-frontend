import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button } from 'reactstrap'
import CheckForm from "./CheckForm";

function Upload({ children }) {
  
  // const [templates, setTemplates] = useState(false);
  const [dataArr, setData] = useState(false);
  const [templates, setTemplates] = useState([]);
  // const [jUpload, setJUpload] = useState(false);
  const baseSite = "http://localhost:8080";
  const apiPath = "/api/v1";
  const generatePath = "/uploadTemplate";
  const generateURL = baseSite + apiPath + generatePath;
  // var templates = [];
  // getTemplates();
  // const [isUploadSuccessfulJ, setIsUploadSuccessfulJ] = useState(false);

  // const validateFile = (file) => {
  //   var parts = file.name.split(".");
  //   if (parts[parts.length - 1] !== "json") {
  //     throw "Invalid file type fed. Please upload a valid *.json file."
  //   };
  // };

  // const generateDatum = (result) => {
  //   let jsonBody = JSON.parse(result).body;
  //   let jsonName = Object.getOwnPropertyNames(jsonBody)[0];
  //   let jsonData = jsonBody[jsonName];
    
  //   return {
  //     "name": jsonName,
  //     "data": {
  //       "headers": jsonData.columns,
  //       "rows": jsonData.rows
  //   }};
  // };

  // const readUploadedFileAsText = (inputFile) => {
  //   const temporaryFileReader = new FileReader();
  
  //   return new Promise((resolve, reject) => {
  //     temporaryFileReader.onerror = () => {
  //       temporaryFileReader.abort();
  //       reject(new DOMException("Problem parsing input file."));
  //     };
  
  //     temporaryFileReader.onload = () => {
  //       resolve(temporaryFileReader.result);
  //     };
  //     temporaryFileReader.readAsText(inputFile);
  //   });
  // };

  // const generateDataArr = async (files) => {
  //   var dataArr = {};
  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];
  //     validateFile(file);
  //     var readData = await readUploadedFileAsText(file);
  //     var datum = generateDatum(readData);
  //     dataArr[datum.name] = datum.data;
  //   };
  //   return dataArr;
  // };

  const updateData = async (files) => {
    // let dataArr = await generateDataArr(files);
    let dataArr = files;
    if (Object.keys(dataArr).length === 0) {
      throw "Data fed is empty."; 
    }
    return dataArr;
  };

  const uploadFiles = async (event) => {
    setData({});

    try {
      let dataArr = await updateData(event.target.files);
      console.log(dataArr);
      setData(dataArr);
      // setJUpload(true);
      // setIsUploadSuccessfulJ(true);

    } catch (error) {
      console.error(error);
      setData({}); // reset back
      // setJUpload(false);
      // setIsUploadSuccessfulJ(false);
    }
  };
  
  // const updateTemplates = async (files) => {
  //   let templates = files;
  //   if (Object.keys(templates).length === 0) {
  //     throw "Data fed is empty."; 
  //   }
  //   return templates;
  // };

  const uploadTemplates = async (event) => {
    let template = event.target.files;
    console.log(template)

    axios.post(generateURL, template, {
      method: "POST",
      headers: {
        'Accept': 'application/octet-stream'
      },
      data: template,
    })
      .then((res => {
        console.log('success');
      }))
      .catch((err) => {console.log(err)})
    // getTemplates();
  };

  // if (!isUploadSuccessfulJ && !isUploadSuccessfulT) {
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
        </div>
        <div className="container">
          <CheckForm dataArr={dataArr}/>
        </div>
      </div>
    </div>
  );
};

export default Upload;
