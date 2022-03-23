import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label, Card, CardBody } from 'reactstrap';
import axios from 'axios';

function CheckForm(props) {

    // const [postId, setPostId] = useState(null);
    const [templates, setTemplates] = useState();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [isUploadSuccessful, setIsUploadSuccessful] = useState(true);
    
    const baseSite = "http://localhost:8080";
    const apiPath = "/api/v1";
    const generateURL = baseSite + apiPath + "/generateData";
    const templateURL = baseSite + apiPath + "/uploadTemplate";

    const submitForm = (json, outputFilename) => {
        axios.post(generateURL, json, {
            method: 'POST',
            headers: {
                'Accept': 'application/octet-stream',
                'Content-Type': 'application/json'
            },
            responseType: 'blob', // important

        }).then((response) => {
            let url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${outputFilename}.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    };

    const submitTemplate = (file) => {
        console.log(file)
        axios.post(templateURL, file, {
            method: 'POST',
            headers: {
                'Accept': 'application/octet-stream',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'application/json',
        }).then((response) => {
            let res = JSON.parse(response).result
            if (res == "true") {
                setIsUploadSuccessful(true)
            } else {
                setIsUploadSuccessful(false)
            }
        })
    }

    // const validateFile = (file) => {
    //     var parts = file.name.split(".");
    //     if (parts[parts.length - 1].subString(0, 3) !== "xls") {
    //       throw "Invalid file type fed. Please upload a valid *.json file."
    //     };
    //   };

    // const generateDatum = (result) => {
    //     let jsonBody = JSON.parse(result).body;
    //     let jsonName = Object.getOwnPropertyNames(jsonBody)[0];
    //     let jsonData = jsonBody[jsonName];
        
    //     return {
    //       "name": jsonName,
    //       "data": {
    //         "headers": jsonData.columns,
    //         "rows": jsonData.rows
    //     }};
    //   };

    // const readUploadedFileAsText = (inputFile) => {
    //     const temporaryFileReader = new FileReader();
      
    //     return new Promise((resolve, reject) => {
    //       temporaryFileReader.onerror = () => {
    //         temporaryFileReader.abort();
    //         reject(new DOMException("Problem parsing input file."));
    //       };
      
    //       temporaryFileReader.onload = () => {
    //         resolve(temporaryFileReader.result);
    //       };
    //       temporaryFileReader.readAsText(inputFile);
    //     });
    //   };

    // const generateDataArr = async (files) => {
    //     var templates = {};
    //     for (var i = 0; i < files.length; i++) {
    //       var file = files[i];
    //       validateFile(file);
    //       var readData = await readUploadedFileAsText(file);
    //       var datum = generateDatum(readData);
    //       templates[datum.name] = datum.data;
    //     };
    //     return templates;
    //   };

    const updateData = async (files) => {
        let templates = files;
        if (Object.keys(templates).length === 0) {
          throw "Data fed is empty."; 
        }
        return templates;
      };

    const uploadTemplates = async (event) => {
        setTemplates({});

        try {
            // let template = await updateData(event.target.files);
            console.log(event.target.files);
            setTemplates(event.target.files);
            submitTemplate(event.target.files)
      
          } catch (error) {
            console.error(error);
            setTemplates({}); // reset back
          }
        
    };

    function onSubmit(formData) {
        let filename = "Sample";
        let newDataArr = props.dataArr;

        for (var groupName in newDataArr) {
            let headers = newDataArr[groupName].headers;
            for (var num = 0; num < headers.length; num++) {
                let singleName = headers[num].name;
                headers[num].isSelected = formData[groupName][singleName];
            }
        }

        console.log(newDataArr);
        setSubmitted(true);
        submitForm(newDataArr, filename);
    };

    function GroupForm(group) {
        // console.log(group.group, JSON.stringify(group.group));
        let groupName = group.group.name;
        let groupItems = group.group.headers.map((datum) => 
            <div key={datum.name}>
            <Label check>
                <input type="checkbox" name={`${groupName}.${datum.name}`} {...register(`${groupName}.${datum.name}`)} defaultChecked />
                {" " + datum.name}
            </Label>
            </div>
        );
        return (<FormGroup className="mb-3">
            <h3>{groupName}.json</h3>
            {groupItems}
            </FormGroup>
        );
    };

    function FullForm(data) {
        // console.log(data.data, JSON.stringify(data.data));
        let groupItems = [];
        for (var datumName in data.data) {
            let datum = {
                "name": datumName,
                "headers": data.data[datumName].headers
            };
            groupItems.push(
                <div key={datumName}>
                    <GroupForm group={datum}/>
                </div>
            );
        };
        return groupItems;
    };

    if (props.isUploadSuccessful && !submitted && isUploadSuccessful) {
        return (
            <div style={{display:"block"}}>
                <div className="file-upload2">
                    <input type="file" onChange={uploadTemplates} ></input>
                    <p style={{margin:"auto"}}>Upload your excel templates</p>
                </div>
                <Card className="mt-3">
                    <CardBody className="m5">
                        <h2>Select Columns for Rendering</h2>
                        <hr/>
                        <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>
                            <FullForm data={props.dataArr} />
                            <Button style={{float:'right'}} color="primary" size="sm">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    } else if (props.isUploadSuccessful && !isUploadSuccessful) {
        return (
            <div style={{display:"block"}}>
                <div className="file-upload2">
                    <input type="file" multiple onChange={uploadTemplates} ></input>
                    <p style={{margin:"auto"}}>Upload your excel templates</p>
                </div>
                <p style={{color:'red'}}>Error! Please check that you have uploaded an excel file (.xls or .xlsx)</p>
                <Card className="mt-3">
                    <CardBody className="m5">
                        <h2>Select Columns for Rendering</h2>
                        <hr/>
                        <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>
                            <FullForm data={props.dataArr} />
                            <Button style={{float:'right'}} color="primary" size="sm">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    } else if (props.isUploadSuccessful && submitted) {
        return (
            <div className="message">
                <h2>
                    Form Submitted! <br/><br/>
                    Your file should be downloading in a few seconds. <br/><br/>
                </h2>
                <Link style={{color:'#459ec4'}} onClick={() => window.location.reload(false)}>Click here to render another report.</Link>
            </div>
        )
    } else if (props.isAttemptingUpload && !props.isUploadSuccessful) {
        return (
            <div className="message">
                <h4>
                    Unsuccessful file(s) upload.<br/>
                    Allowed file extensions: .json<br/>
                    Ensure data in file(s) are in proper format.
                </h4>
            </div>
        );

    } else {
        // !props.isAttemptingUpload --> just visited page
        return (
            <div className="message">
                <h2>
                    Upload Your Files Here!
                </h2>
            </div>
        );
    };
};

export default CheckForm;
