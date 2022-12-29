import "./App.css";
import { useState } from "react";
import JsonData from "./api/newForm.json";
import Form from "./Components/Form";
// import JsonForm from "./Components/JsonForm";
// import MultipleTodo from "./Components/MultipleTodo";
// import SingleTodo from "./Components/SingleTodo";
import { validataion } from "./validataion/formValidataion";

function App() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const check = validataion(data);
    if (Object.keys(check).length !== 0) setErrors(check);
    console.log(check);
  };

  return (
    <>
      {/* <SingleTodo /> */}
      {/* <MultipleTodo /> */}
      {/* <JsonForm /> */}
      <Form
        JsonData={JsonData}
        data={data}
        setData={setData}
        onSubmit={onSubmit}
        errors={errors}
        setErrors={setErrors}
      />
    </>
  );
}

export default App;
