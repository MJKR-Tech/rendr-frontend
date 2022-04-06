import React from 'react'
import { Form, FormGroup, CardBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function EditTemplateForm(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory();
    const baseSite = "http://localhost:8080";
    const apiPath = "/api/v1";
    const generatePath = "/deleteTemplate/";
    const generateURL = baseSite + apiPath + generatePath;

    const onSubmit = (formData) => {
        console.log(formData);
        axios.delete(generateURL + formData.templates)
            .then((response) => {
                // console.log(response)
                history.go(0);
            });
    }

    const EditTemplateForm = () => {
        return (
            <>
                {props.templates.map(templ => {
                    let temps = [];
                    for (let i = 0; i < templ.length; ++i) {
                        let temp = templ[i];
                        let tempId = temp.templateId
                        temps.push(
                            <div key={temp.templateId}>
                                <div style={{marginLeft: '10px'}} check="false">
                                    <input style={{fontSize: '15px'}} {...register("templates", {required: true})} 
                                            type="checkbox" id="templates" value={tempId} />
                                    {"\xa0\xa0\xa0\xa0" + temp.templateName}
                                </div>
                            </div>
                        );
                    };
                    return (
                        temps
                    );
                })}
            </>
        )
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
                <FormGroup>
                    <EditTemplateForm />
                    {console.log(errors)}
                    {errors.templates && <div className="invalid-feedback" style={{marginLeft:'10px'}}>
                        Please select at least one template for deletion
                    </div>}
                    <button type="submit" style={{float: "right", margin: "0px 5px 10px 0px"}} 
                            className="btn btn-danger btn-sm">Delete</button>
                </FormGroup>
            </CardBody>
        </Form>
    )
}
