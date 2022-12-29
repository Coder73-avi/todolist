import "./App.css";
import { useState } from "react";
import JsonData from "./api/newForm.json";
import Form from "./Components/Form";
// import JsonForm from "./Components/JsonForm";
// import MultipleTodo from "./Components/MultipleTodo";
// import SingleTodo from "./Components/SingleTodo";

function App() {
  const [data, setData] = useState({});

  return (
    <>
      {/* <SingleTodo /> */}
      {/* <MultipleTodo /> */}
      {/* <JsonForm /> */}
      <Form JsonData={JsonData} data={data} setData={setData} API={""} />
    </>
  );
}

export default App;
