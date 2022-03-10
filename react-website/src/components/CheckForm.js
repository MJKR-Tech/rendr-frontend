import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label, Card, CardBody } from 'reactstrap';
import axios from 'axios';

function CheckForm(props) {

    const [postId, setPostId] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const site = "http://localhost:8080/loadSampleData";

    const submitForm = (json, outputFilename) => {
        axios.post(site, json, {
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

    if (props.isUploadSuccessful) {
        return (
            <Card className="mt-3">
                <CardBody>
                    <h2>Select Columns for Rendering</h2>
                    <hr/>
                    <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>
                        <FullForm data={props.dataArr} />
                        <Button color="primary" outline size="sm">Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        );

    } else if (props.isAttemptingUpload && !props.isUploadSuccessful) {
        return (
            <Card>
                <CardBody>
                    <h4>
                        Unsuccessful file(s) upload.<br/>
                        Allowed file extensions: .json<br/>
                        Ensure data in file(s) are in proper format.
                    </h4>
                </CardBody>
            </Card>
        );

    } else {
        // !props.isAttemptingUpload --> just visited page
        return (
            <Card>
            <CardBody>
                <h2>
                    Welcome! Upload your files above.
                </h2>
            </CardBody>
        </Card>
        );
    };
};

export default CheckForm;
