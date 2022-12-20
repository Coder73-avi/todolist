import { useState } from "react";

function MultipleTodo() {
  const [itemList, setItemList] = useState([
    { id: 1, name: "mango" },
    { id: 2, name: "banana" },
    { id: 3, name: "apple" },
  ]);
  const [emptyObjState, setObjState] = useState({
    name: "",
    price: "",
    category: "",
    address: {
      country: "",
      city: "",
    },
  });
  // const emptyObj = { name: "", price: "", category: "", other: "" };
  const [data, setData] = useState(emptyObjState);
  // const [updateStatus, setUpdateStatus] = useState(false);
  // const [updateId, setUpdateId] = useState(null);

  const getDate = () => {
    const d = new Date();
    const day = d.getDate();
    const mm = d.getMonth() + 1;

    return `${day}/${mm} `;
  };

  const addItem = (e) => {
    e.preventDefault();
    const check = itemList?.find(
      (val) => val.name?.toLowerCase() === data?.name?.toLowerCase(),
    );
    if (check) return alert("Already exist !!!!");
    const date = getDate();

    console.log(">>>", data);

    setItemList([
      ...itemList,
      { id: generateUUID(9), createDate: date, updateDate: date, ...data },
    ]);
    return addNew();
  };

  const inputHandle = (e, nested = null) => {
    const name = e.target.name;
    const value = e.target.value;
    if (nested) {
      return setData({ ...data, [nested]: { ...data[nested], [name]: value } });
    }
    return setData({ ...data, [name]: value });
  };

  const generateUUID = (digits) => {
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
    let uuid = [];
    for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join("");
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

  const addNew = () => {
    setData(emptyObjState);
    // setUpdateId(null);
    // return setUpdateStatus(false);
    return;
  };

  return (
    <main className="App">
      <section className="w-[60%] border mx-auto rounded-md my-5 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Multiple Todo List !!!
        </h1>
        <form className="flex flex-col justify-center  gap-4">
          <input
            type="text"
            name="name"
            id=""
            placeholder="Item Name"
            className="border rounded-md outline-none text-sm px-3 py-2 "
            onChange={inputHandle}
            value={data?.name}
          />
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              name="price"
              id=""
              placeholder="Price"
              className="border rounded-md outline-none text-sm px-3 py-2 "
              onChange={inputHandle}
              value={data?.price}
            />
            <input
              type="text"
              name="category"
              id=""
              placeholder="Category"
              className="border rounded-md outline-none text-sm px-3 py-2 "
              onChange={inputHandle}
              value={data?.category}
            />
            <input
              type="text"
              name="country"
              id=""
              placeholder="Country"
              className="border rounded-md outline-none text-sm px-3 py-2 "
              onChange={(e) => inputHandle(e, "address")}
              value={data?.address?.country}
            />
            <input
              type="text"
              name="city"
              id=""
              placeholder="City"
              className="border rounded-md outline-none text-sm px-3 py-2 "
              onChange={(e) => inputHandle(e, "address")}
              value={data?.address?.city}
            />
          </div>

          <button
            className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md"
            onClick={data?.id ? (e) => updateItem(e, data?.id) : addItem}
          >
            {data?.id ? "Update" : "Add"}
          </button>
          {data?.id ? (
            <button
              className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md"
              onClick={addNew}
            >
              Add New
            </button>
          ) : null}
        </form>

        <div className="">
          <table className="w-full text-left">
            <thead className="text-sm font-bold border-b">
              <tr>
                <th scope="col" className="px-2 py-2">
                  Id
                </th>
                <th scope="col" className="px-2 py-2">
                  Items Name
                </th>
                <th scope="col" className="px-2 py-2">
                  Price
                </th>
                <th scope="col" className="px-2 py-2">
                  Category
                </th>
                <th scope="col" className="px-2 py-2">
                  Address
                </th>
                <th scope="col" className="px-2 py-2">
                  Create
                </th>
                <th scope="col" className="px-2 py-2">
                  Update
                </th>
                <th scope="col" className="px-2 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {itemList?.map((item, indx) => {
                return (
                  <tr
                    key={indx}
                    className=" border-b text-black mb-2 rounded-md"
                  >
                    <td className="capitalize px-2 py-2">{item?.id}</td>
                    <td className="capitalize px-2 py-2">
                      {item?.name || "none"}
                    </td>
                    <td className="capitalize px-2 py-2">
                      {item?.price || "none"}
                    </td>
                    <td className="capitalize px-2 py-2">
                      {item?.category || "none"}
                    </td>
                    <td className="capitalize px-2 py-2">
                      {item?.address?.city},{item?.address?.country || "none"}
                    </td>
                    <td className="capitalize px-2 py-2">
                      {item?.createDate || "none"}
                    </td>
                    <td className="capitalize px-2 py-2">
                      {item?.updateDate || "none"}
                    </td>
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
        </div>
      </section>
    </main>
  );
}

export default MultipleTodo;
