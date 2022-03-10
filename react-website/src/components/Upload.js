import React, { useState } from "react";
import { Container } from 'reactstrap'
import CheckForm from "./CheckForm";

function Upload({ children }) {
  
  const [dataArr, setData] = useState({});
  const [isAttemptingUpload, setIsAttemptingUpload] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const validateFile = (file) => {
    var parts = file.name.split(".");
    if (parts[parts.length - 1] !== "json") {
      throw "Invalid file type fed. Please upload a valid *.json file."
    };
  };

  const generateDatum = (result) => {
    let jsonBody = JSON.parse(result).body;
    let jsonName = Object.getOwnPropertyNames(jsonBody)[0];
    let jsonData = jsonBody[jsonName];
    
    return {
      "name": jsonName,
      "data": {
        "headers": jsonData.columns,
        "rows": jsonData.rows
    }};
  };

  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  const generateDataArr = async (files) => {
    var dataArr = {};
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      validateFile(file);
      var readData = await readUploadedFileAsText(file);
      var datum = generateDatum(readData);
      dataArr[datum.name] = datum.data;
    };
    return dataArr;
  };

  const updateData = async (files) => {
    let dataArr = await generateDataArr(files);
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
      setIsAttemptingUpload(true);
      setIsUploadSuccessful(true);

    } catch (error) {
      console.error(error);
      setData({}); // reset back
      setIsAttemptingUpload(true);
      setIsUploadSuccessful(false);
    }
  };

  return (
    <Container>
      <h1>Data Upload</h1>
      <input type="file" multiple onChange={uploadFiles} />
      <br></br>
      <CheckForm dataArr={dataArr} isUploadSuccessful={isUploadSuccessful} isAttemptingUpload={isAttemptingUpload}/>
    </Container>
  );
};

export default Upload;
