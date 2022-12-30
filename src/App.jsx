import "./App.css";
import { useState } from "react";
import JsonData from "./api/newForm.json";
import Form from "./Components/Form";
import JsonFormatter from "react-json-formatter";
// import JsonForm from "./Components/JsonForm";
// import MultipleTodo from "./Components/MultipleTodo";
// import SingleTodo from "./Components/SingleTodo";

function App() {
  const [data, setData] = useState({
    fullname: "abhishek magar",
    email: "aavishek60@gmail.com",
  });
  const jsonStyle = {
    propertyStyle: { color: "red" },
    stringStyle: { color: "green" },
    numberStyle: { color: "darkorange" },
  };
  return (
    <>
      {/* <SingleTodo /> */}
      {/* <MultipleTodo /> */}
      {/* <JsonForm /> */}
      <div className="w-[60%] mx-auto border p-3 max-h-[200px] overflow-y-auto my-5">
        <h1 className="my-2 text-lg font-bold text-gray-600 text-center p-2 border-b">
          Json Data
        </h1>
        <JsonFormatter
          json={JSON.stringify(JsonData)}
          tabWith={3}
          jsonStyle={jsonStyle}
        />
      </div>
      <Form JsonData={JsonData} data={data} setData={setData} API={""} />

      <div className="w-[60%] mx-auto border p-3 max-h-[200px] overflow-y-auto my-5">
        <h1 className="my-2 text-lg font-bold text-gray-600 text-center p-2 border-b">
          User Data
        </h1>
        <JsonFormatter
          json={JSON.stringify(data)}
          tabWith={3}
          jsonStyle={jsonStyle}
        />
      </div>
    </>
  );
}

export default App;
