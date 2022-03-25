import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Card, CardBody, CardHeader } from 'reactstrap';
import axios from 'axios';

function CheckForm(props) {

    // const [postId, setPostId] = useState(null);
    const [template, setTemplate] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // const [isUploadSuccessfulJ, setisUploadSuccessfulJ] = useState(true);
    
    const baseSite = "http://localhost:8080";
    const apiPath = "/api/v1";
    const generatePath = "/generateData";
    const generateURL = baseSite + apiPath + generatePath;
    const templates = [
        {
            "templateId": 2,
            "templateName": "Complex_2",
            "dateCreated": "2022-03-24"
        },
        {
            "templateId": 3,
            "templateName": "Complex_3",
            "dateCreated": "2022-03-22"
        },
        {
            "templateId": 4,
            "templateName": "Complex_4",
            "dateCreated": "2022-03-21"
        }
    ];

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

    // const submitTemplate = (template) => {
    //     axios.post(generateURL, template, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/octet-stream',
    //             'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    //         },
    //         responseType: 'application/json',
    //     }).then((response) => {
    //         let res = JSON.parse(response).result
    //         if (res == "true") {
    //             setisUploadSuccessfulJ(true)
    //         } else {
    //             setisUploadSuccessfulJ(false)
    //         }
    //     })
    // }

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

    function JsonNames(data) {
        var names = [];
        for (let i = 0; i < data.data.length; ++i) {
            let fileName = data.data[i].name
            names.push(
                <li key={fileName} style={{fontSize: '15px'}}>{fileName}</li>
            );
        }
        console.log(names)
        return names;
    }

    // function GroupForm(group) {
    //     // console.log(group.group, JSON.stringify(group.group));
    //     let groupName = group.group.name;
    //     let groupItems = group.group.headers.map((datum) => 
    //         <div key={datum.name}>
    //         <Label check>
    //             <input type="checkbox" name={`${groupName}.${datum.name}`} {...register(`${groupName}.${datum.name}`)} defaultChecked />
    //             {" " + datum.name}
    //         </Label>
    //         </div>
    //     );
    //     return (<FormGroup className="mb-3">
    //         <h3>{groupName}.json</h3>
    //         {groupItems}
    //         </FormGroup>
    //     );
    // };


    // function FullForm(data) {
    //     // console.log(data.data, JSON.stringify(data.data));
    //     let groupItems = [];
    //     for (var datumName in data.data) {
    //         let datum = {
    //             "name": datumName,
    //             "headers": data.data[datumName].headers
    //         };
    //         groupItems.push(
    //             <div key={datumName}>
    //                 <GroupForm group={datum}/>
    //             </div>
    //         );
    //     };
    //     return groupItems;
    // };

    function switchTemplate(id) {
        console.log(id);
        setTemplate(id);
    }

    function TemplateForm() {
        var temps = [];
        for (let i = 0; i < templates.length; ++i) {
            let temp = templates[i];
            temps.push(
                <div key={temp.templateName}>
                    <Label style={{marginLeft: '10px'}} check>
                        <input style={{fontSize: '15px'}} type="radio" name='template' id={temp.templateId} 
                            onChange={setTemplate(temp.templateId)}/>
                        {"\xa0\xa0\xa0\xa0" + temp.templateName}
                    </Label>
                </div>
            );
        };
        return temps;
    }


    if (props.dataArr && !submitted) {
        return (
            <>
                <Form onSubmit={onSubmit()}>
                <div className="card round-borders blue-border ">
                    <p className="card-header" style={{fontSize:"20px"}}>Select your template:</p>
                    <CardBody>
                        <FormGroup>
                            <TemplateForm />
                        </FormGroup>
                    </CardBody>
                </div>
                <div className="card round-borders blue-border ">
                    <p className="card-header" style={{fontSize:"20px"}}>Here are the files you have submitted:</p>
                    <CardBody>
                        <ul>
                            <JsonNames data={props.dataArr} />
                        </ul>
                    </CardBody>
                </div>
                <Button className="green-submit" type='submit' onClick={onSubmit}>
                    Submit
                </Button>
                </Form>
            </>
        );
    } else if (!props.dataArr && !submitted) {
        return (
                <div className="card round-borders blue-border ">
                    <Form>
                        <p className="card-header" style={{fontSize:"20px"}}>Select your template:</p>
                        <CardBody>
                            <FormGroup>
                                <TemplateForm />
                            </FormGroup>
                        </CardBody>
                    </Form>
                </div>
        );
    } else if (props.dataArr && submitted) {
        return (
            <div className="message">
                <h2>
                    Form Submitted! <br/><br/>
                    Your file should be downloading in a few seconds. <br/><br/>
                </h2>
                <Link style={{color:'#459ec4'}} onClick={() => window.location.reload(false)}>Click here to render another report.</Link>
            </div>
        )
    } else {
        return (
            <>
            </>
        );
    };
};

export default CheckForm;
