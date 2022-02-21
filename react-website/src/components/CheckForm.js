import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label, Card, CardBody } from 'reactstrap';

function CheckForm(props) {

    const [postId, setPostId] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    var inner = props.file ? Object.getOwnPropertyNames(props.file["body"])[0] : ""

    const onSubmit = data => {
            // console.log(data)
        for (const [key, value] of Object.entries(data)) {
            var index = props.file["body"][inner].columns.findIndex(x => x.name == key)
            props.file["body"][inner].columns[index].isSelected = value
        }
        xhr.send(props.file);
    }

    var url = "https://localhost:3000/post/json";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
    }};

    var data = `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    "Quantity": 1,
    "Price": 18.00
    }`;

    console.log(props.file)

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