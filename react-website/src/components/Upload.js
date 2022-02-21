import React, { useState } from "react";
import { Container } from 'reactstrap'
import CheckForm from "./CheckForm";

function Upload({ children }) {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      // console.log("e.target.result", JSON.parse(e.target.result).body);
      setFiles(JSON.parse(e.target.result)); // please change method eventually
    };
  };

  var foo = files ? files["body"][Object.getOwnPropertyNames(files["body"])[0]].columns : [];

  console.log(foo)


  return (
    <>
      <Container>
        <h1>Upload Json file - Example</h1>

        <input type="file" onChange={handleChange} />
        <CheckForm list={foo} file={files} />
      </Container>

    </>
  );
}

export default Upload
