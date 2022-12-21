import React, { useCallback, useEffect, useState } from "react";
import JsonData from "../api/jsonform.json";

const JsonForm = () => {
  const [itemList, setItemList] = useState([]);
  const [emptyObjState, setEmptyObjState] = useState({});

  // const emptyObj = { name: "", price: "", category: "", other: "" };
  const [data, setData] = useState({});

  const inputClassName =
    "bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:capitalize";
  const lableClassName =
    "block mb-2 text-sm font-bold text-gray-900 dark:text-white capitalize";

  const getEmptyObj = useCallback(() => {
    JsonData?.inputFiled.map(({ name, nested }) => {
      let obj = { [name]: "" };
      if (nested) {
        return nested.map((item) =>
          setEmptyObjState((prev) => ({
            ...prev,
            [name]: { ...prev[name], [item.name]: "" },
          })),
        );
      }
      // setEmptyObjState((prev) => ({ ...prev, ...obj }));
      setEmptyObjState((prev) => ({ ...prev, ...obj }));
    });
    return setData({ ...emptyObjState });
  }, []);

  useEffect(() => {
    getEmptyObj();
  }, [getEmptyObj]);

  const inputHandle = (e, nested = false) => {
    const name = e.target.name;
    const value = e.target.value;
    if (nested) {
      return setData({
        ...data,
        [nested]: { ...data[nested], [name]: value },
      });
    }
    return setData({ ...data, [name]: value });
  };

  const getDate = () => {
    const d = new Date();
    const day = d.getDate();
    const mm = d.getMonth() + 1;

    return `${day}/${mm} `;
  };

  const addItem = (e) => {
    e.preventDefault();
    const date = getDate();

    console.log(">>>", data);

    setItemList([
      ...itemList,
      { id: generateID(), createDate: date, updateDate: date, ...data },
    ]);
    return getEmptyObj();
  };

  const generateID = () => {
    if (itemList.length === 0) return 1;
    const lastId = itemList?.slice(-1);
    return lastId[0]?.id + 1;
  };

  const updateItem = (e, id) => {
    e.preventDefault();
    const check = itemList?.find((val) => val.id === id);
    if (!check) return alert("Item doesnot exist !!!!");

    const newUpdateData = itemList?.map((item) => {
      if (item.id === id) {
        return { ...data, updateDate: getDate() };
      }
      return item;
    });

    setItemList(newUpdateData);
    alert("update successfully !!!");
  };

  const editItem = (id) => {
    const getData = itemList?.find((item) => item.id === id);
    console.log(id, getData);
    // setUpdateId(id)
    // setUpdateStatus(true)
    return setData(getData);
  };

  const deleteItem = (id) => {
    if (id === data?.id)
      return alert("You cann't delete this item, it's updating !!!");

    return setItemList(itemList.filter((val, indx) => val.id !== id));
  };

  console.log("input >> ", data);
  console.log("list >> ", itemList);

  return (
    <section className="w-[95%]  mx-auto rounded-md my-5  grid md:grid-cols-2 gap-5">
      <div className="border px-5 py-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          JsonForm with Todo List Function !!!
        </h1>
        <form
          className="flex flex-col justify-center  gap-4"
          method="post"
          onSubmit={!data?.id ? addItem : (e) => updateItem(e, data?.id)}
        >
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {JsonData?.inputFiled?.map(({ name, type, nested }, indx) => {
              if (nested) {
                return nested?.map((val, keys) => {
                  return (
                    <div key={keys} className="">
                      <label htmlFor={val?.name} className={lableClassName}>
                        {val?.name?.replaceAll("_", " ")}
                      </label>
                      <input
                        type={val?.type}
                        name={val?.name}
                        id={val?.name}
                        value={data?.[name]?.[val?.name]}
                        placeholder={val?.name?.replaceAll("_", " ")}
                        className={inputClassName}
                        onChange={(e) => inputHandle(e, name)}
                      />
                    </div>
                  );
                });
              }
              return (
                <div key={indx} className="">
                  <label htmlFor={name} className={lableClassName}>
                    {name.replaceAll("_", " ")}
                  </label>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={nested ? data?.[nested]?.[name] : data?.[name]}
                    placeholder={name.replaceAll("_", " ")}
                    className={inputClassName}
                    onChange={
                      nested ? (e) => inputHandle(e, nested) : inputHandle
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-row justify-end items-center gap-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {!data?.id ? "Submit" : "Update"}
            </button>
            {data?.id ? (
              <button
                type="button"
                onClick={() => setData(emptyObjState)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add New
              </button>
            ) : null}
          </div>
        </form>
      </div>
      <div className="border px-5 py-6 rounded-md">
        <h1 className="text-center font-bold text-xl pb-6">Todo List</h1>
        {itemList?.length === 0 ? (
          <div className="text-center font-bold text-2xl text-gray-700">
            Todolist is not added !!!
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="text-sm font-bold border-b border-t">
              <tr>
                {Object.keys(itemList[0])?.map((name, indx) => (
                  <th scope="col" className="px-2 py-2 capitalize" key={indx}>
                    {name.replaceAll("_", " ")}
                  </th>
                ))}
                <th scope="col" className="px-2 py-2 capitalize text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {itemList
                ?.sort((a, b) => a.id - b.id)
                ?.map((item, indx) => {
                  const nameOfItem = Object.keys(item);
                  console.log(nameOfItem);
                  return (
                    <tr
                      key={indx}
                      className=" border-b text-black mb-2 rounded-md"
                    >
                      {nameOfItem.map((name, indx) => {
                        const checkNested = JsonData?.inputFiled?.find(
                          (item) => item?.name == name,
                        );

                        // if (checkNested?.nested) {
                        //   console.log(checkNested);
                        //   checkNested?.nested.map((val) => (
                        //     <td className="px-2 py-2 capitalize" key={indx}>
                        //       {val?.[]}
                        //     </td>
                        //   ));
                        // }
                        return (
                          <td className="px-2 py-2 capitalize" key={indx}>
                            {checkNested?.nested
                              ? checkNested?.nested?.map(
                                  (val) => `${item?.[name]?.[val?.name]}  `,
                                )
                              : item?.[name]}
                          </td>
                        );
                      })}
                      <td className="capitalize px-2 py-2">
                        <div className="flex flex-row justify-between gap-2 items-center capitalize text-blue-800 cursor-pointer">
                          <span title="Edit" onClick={() => editItem(item?.id)}>
                            edit
                          </span>
                          <span
                            title="Delete"
                            onClick={() => deleteItem(item?.id)}
                          >
                            delete
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default JsonForm;
