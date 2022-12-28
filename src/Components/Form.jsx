import { CssSyntaxError } from "postcss";
import React, { useCallback, useEffect, useState } from "react";
import JsonData from "../api/newForm.json";
import { validataion } from "../validataion/formValidataion";

const Form = () => {
  // const [itemList, setItemList] = useState([]);
  const [errors, setErrors] = useState({});

  // const emptyObj = { name: "", price: "", category: "", other: "" };
  const [data, setData] = useState({});

  const inputClassName =
    "bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:capitalize";
  const lableClassName =
    "mb-2 text-sm font-bold text-gray-900 dark:text-white capitalize";

  const getEmptyObj = useCallback(() => {
    return JsonData?.inputFiled.map(({ name }) => {
      let obj = { [name]: "" };
      setData((prev) => ({ ...prev, ...obj }));
      return true;
    });
  }, []);
  // console.log(">>data >>", data);

  useEffect(() => {
    getEmptyObj();
  }, [getEmptyObj]);

  const inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newObj = { [name]: value };
    setData({ ...data, ...newObj });

    const check = validataion(newObj);
    if (Object.keys(check).length !== 0) {
      return setErrors({ ...errors, ...check });
    }

    return delete errors[name];
  };

  const onSubmitBtn = (e) => {
    e.preventDefault();
    const check = validataion(data);
    if (Object.keys(check).length !== 0) setErrors(check);
    console.log(check);
  };

  // const generateID = () => {
  //   if (itemList.length === 0) return 1;
  //   const lastId = itemList?.slice(-1);
  //   return lastId[0]?.id + 1;
  // };

  const ShowError = ({ name }) => {
    if (errors.hasOwnProperty(name)) {
      return <span className={"error_box"}>{errors[name]}</span>;
    }
    return false;
  };

  return (
    <section className="md:w-[70%] lg:w-[50%]  mx-auto rounded-md my-5  ">
      <div className="border px-8 py-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">Form !!!</h1>
        <form
          className="flex flex-col justify-center  gap-4"
          method="post"
          onSubmit={onSubmitBtn}
        >
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {JsonData?.inputFiled?.map(({ name, type }, indx) => {
              return (
                <div key={indx} className="">
                  <div className="flex flex-row gap-2 items-center flex-wrap">
                    <label htmlFor={name} className={lableClassName}>
                      {name.replaceAll("_", " ")}
                    </label>
                    <ShowError name={name} />
                  </div>
                  <input
                    type={type}
                    name={name.toLowerCase()}
                    id={name}
                    value={data?.[name]}
                    placeholder={name.replaceAll("_", " ")}
                    className={inputClassName}
                    onChange={inputHandle}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-row justify-end items-center gap-4">
            <button
              type="submit"
              className="capitalize text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;