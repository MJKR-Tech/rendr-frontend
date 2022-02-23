import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label, Card, CardBody } from 'reactstrap';
import axios from 'axios';

function CheckForm(props) {

    const [postId, setPostId] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    var inner = props.file ? Object.getOwnPropertyNames(props.file["body"])[0] : ""

    const onSubmit = data => {
        for (const [key, value] of Object.entries(data)) {
            var index = props.file["body"][inner].columns.findIndex(x => x.name === key)
            props.file["body"][inner].columns[index].isSelected = value
        }
        console.log(props.file)

        axios.post("http://localhost:8080/loadSampleData", JSON.stringify(props.file), {
            method: 'POST',
            headers: {
                'Accept': 'application/octet-stream',
                'Content-Type': 'application/json'
            },
            responseType: 'blob', // important

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${inner}.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    }

    if (props.list) {
        return (
            <Card className="mt-3">
                <CardBody>
                    <h2>Select Columns for Rendering</h2>
                    <hr/>
                    <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup className="mb-3">
                        {props.list.map((item, index) => (
                            <div key={index}>
                            <Label check>
                                <input type="checkbox" name={item.name} {...register(item.name)} defaultChecked />
                                {" " + item.name}
                            </Label>
                            </div>
                        ))}
                        <Button color="primary" outline size="sm">Submit</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }

    return (
        <></>
    )
}

export default CheckForm