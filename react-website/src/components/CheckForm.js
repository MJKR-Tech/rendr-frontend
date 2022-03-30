import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label, Card, CardBody, CardHeader } from 'reactstrap';
import axios from 'axios';

function CheckForm(props) {

    // const [postId, setPostId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    // const [refresh, setRefresh] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [templates, setTemplates] = useState([]);
    // const [isUploadSuccessfulJ, setisUploadSuccessfulJ] = useState(true);
    
    const baseSite = "http://localhost:8080";
    const apiPath = "/api/v1";
    const generatePath = "/generateData";
    const generateURL = baseSite + apiPath + generatePath;
    useEffect(() => {
        const getTemplates = async () => {
            let getURL = baseSite + apiPath + "/getTemplates";
            await axios.get(getURL)
            .then((res) => {
                var newTemplates = [];
                newTemplates.push(res.data);
                setTemplates(newTemplates);
            }).catch((err) => {
                console.log(err);
            });
        };

        getTemplates();
    }, []);
    // const templates = [
    //     {
    //         "templateId": 2,
    //         "templateName": "Complex_2",
    //         "dateCreated": "2022-03-24"
    //     },
    //     {
    //         "templateId": 3,
    //         "templateName": "Complex_3",
    //         "dateCreated": "2022-03-22"
    //     },
    //     {
    //         "templateId": 4,
    //         "templateName": "Complex_4",
    //         "dateCreated": "2022-03-21"
    //     }
    // ];

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
          var readData = await readUploadedFileAsText(file);
          var datum = generateDatum(readData);
          dataArr[datum.name] = datum.data;
        };
        return dataArr;
      };

    const onSubmit = async (formData) => {
        console.log(formData)
        if (formData.template != undefined) {
            try {
                let dataArr = await generateDataArr(props.dataArr);
                let filename = "Sample";
                let jsonFile = {
                    templateId: 0,
                    jsonObjects: [],
                    fileName: ""
                }
                jsonFile.templateId = formData.template;
                jsonFile.jsonObjects = dataArr;
                jsonFile.fileName = formData.fileName;
                console.log(jsonFile);
                submitForm(jsonFile, filename);
                setSubmitted(true);
            } catch(error) {
            }
        }
        // for (var groupName in newDataArr) {
        //     let headers = newDataArr[groupName].headers;
        //     for (var num = 0; num < headers.length; num++) {
        //         let singleName = headers[num].name;
        //         headers[num].isSelected = formData[groupName][singleName];
        //     }
        // }
        // setSubmitted(true);
        // submitForm(newDataArr, filename);
    };

    function JsonNames(data) {
        var names = [];
        for (let i = 0; i < data.data.length; ++i) {
            let fileName = data.data[i].name
            names.push(
                <li key={fileName} style={{fontSize: '15px'}}>{fileName}</li>
            );
        }
        // console.log(names)
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

    // async function TemplateForm() {
    //     var templates = getTemplates();
    //     var temps = [];
        // for (let i = 0; i < templates.length; ++i) {
        //     let temp = templates[i];
        //     let tempId = temp.templateId
        //     temps.push(
        //         <div key={temp.templateName}>
        //             <div style={{marginLeft: '10px'}} check>
        //                 <input style={{fontSize: '15px'}} {...register("template")} type="radio" value={tempId} required />
        //                 {"\xa0\xa0\xa0\xa0" + temp.templateName}
        //             </div>
        //         </div>
        //     );
        // };
        // return temps;
    // }

    // const {ref, ...fileName} = register("fileName", {required:true, pattern:/^[^\\\/\:\*\?\"\<\>\|\.]+(\.[^\\\/\:\*\?\"\<\>\|\.]+)+$/});
    const required = "This field is required";
    const maxLength = "Your input exceed maximum length of 255 characters";
    const pattern = "Your file name should only use alphanumeric characters, \xa0\xa0'\xa0-\xa0'\xa0\xa0 , \xa0\xa0'\xa0_\xa0'\xa0\xa0 , \xa0\xa0'\xa0.\xa0'\xa0\xa0 and space"
    const errorMessage = error => {
        return <div className="invalid-feedback">{error}</div>;
    }

    if (props.dataArr) {
        return (
            <>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card round-borders blue-border ">
                        <p className="card-header" style={{fontSize:"20px"}}>Select your template:</p>
                        <CardBody>
                            <FormGroup>
                                {
                                    templates.map(templ => {
                                        let temps = [];
                                        for (let i = 0; i < templ.length; ++i) {
                                            let temp = templ[i];
                                            let tempId = temp.templateId
                                            temps.push(
                                                <div key={temp.templateName}>
                                                    <div style={{marginLeft: '10px'}} check>
                                                        <input style={{fontSize: '15px'}} {...register("template")} type="radio" value={tempId} required />
                                                        {"\xa0\xa0\xa0\xa0" + temp.templateName}
                                                    </div>
                                                </div>
                                            );
                                        };
                                        return (
                                            temps
                                        );
                                    })
                                }
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
                    <div className="file-name-input">
                        <input type='text' className="form-control" placeholder='Name Your File e.g. Report 1' name="fileName"
                        {...register("fileName", {required:true, pattern: /^[0-9a-zA-Z_\-. ]+$/, maxLength:255})} />
                        {errors.fileName && errors.fileName.type === "required" && errorMessage(required)}
                        {errors.fileName && errors.fileName.type === "maxLength" && errorMessage(maxLength)}
                        {errors.fileName && errors.fileName.type === "pattern" && errorMessage(pattern)}
                    </div>
                    <Button className="green-submit" type='submit'>
                        Submit
                    </Button>
                </Form>
                {submitted ? <Redirect to="/form-submitted" /> : <div />}
            </>
        );
    } else if (!props.dataArr) {
        return (
            <div className="card round-borders blue-border ">
                <Form>
                    <p className="card-header" style={{fontSize:"20px"}}>Select your template:</p>
                    <CardBody>
                        <FormGroup>
                            {
                                templates.map(templ => {
                                    let temps = [];
                                    for (let i = 0; i < templ.length; ++i) {
                                        let temp = templ[i];
                                        let tempId = temp.templateId
                                        temps.push(
                                            <div key={temp.templateName}>
                                                <div style={{marginLeft: '10px'}} check>
                                                    <input style={{fontSize: '15px'}} {...register("template")} type="radio" value={tempId} required />
                                                    {"\xa0\xa0\xa0\xa0" + temp.templateName}
                                                </div>
                                            </div>
                                        );
                                    };
                                    return (
                                        temps
                                    );
                                })
                            }
                        </FormGroup>
                    </CardBody>
                </Form>
            </div>
        );
    } else {
        return (
            <>
            </>
        );
    };
};

export default CheckForm;
