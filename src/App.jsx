import { useState } from 'react';
import './App.css';

function App() {
  const [itemList, setItemList] = useState([{id:1, name:"mango"}, {id:2, name:"banana"}, {id:3,name:"apple"}])
  const [data, setData] = useState("")
  const [updateStatus, setUpdateStatus] = useState(false)
  const [updateId, setUpdateId] = useState(null)

  const addItem = (e) =>{
    e.preventDefault();
    const check = itemList?.find((val)=> val.name?.toLowerCase() === data.toLowerCase() )
    console.log(">>>", data)
    if(check) return alert("Already exist !!!!")
     setItemList([...itemList, {id:generateUUID(9), "name":data}])
     return setData("")
  }

  const generateUUID = (digits) => {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
}

  const updateItem = (e, indx) => {
      e.preventDefault();
      const check = itemList?.find((val)=> val.id === updateId )
      if(!check) return alert("Item doesnot exist !!!!")

      const newUpdateData = itemList?.map((item)=>{
        if(item.id === updateId) {
          return {...item, name:data}
        }
        return item;
      })

      setItemList(newUpdateData)
      alert("update successfully !!!")

  }

  const editItem = (id) => {
      const getData = itemList?.find((item)=> item.id === id);
      console.log(id, getData)
      setUpdateId(id)
      setUpdateStatus(true)
      return setData(getData.name)
  }

  const deleteItem = (id) =>{
    if(id === updateId) return alert("You cann't delete this item, it's updating !!!")

    return setItemList(itemList.filter((val, indx)=> val.id !== id))
  }

const addNew = () =>{
  setData("");
  setUpdateId(null);
  return setUpdateStatus(false)
}


  return (
    <main className="App">
      <section className='w-[40%] border mx-auto rounded-md my-5 p-4'>
        <h1 className='text-2xl font-bold text-center mb-4'>Todo List !!!</h1>
        <form className='flex flex-row justify-center items-center gap-4'>
          <input type="text" name="name" id="" placeholder='Todo Items' className='border rounded-md outline-none text-sm px-3 py-2 ' onChange={(e)=>setData(e.target.value) } value={data} />
          <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md" onClick={(updateStatus) ? updateItem : addItem}>{(updateStatus) ? "Update" : "Add"}</button>
          {updateStatus ?  <button className='px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md' onClick={addNew}>Add New</button> : null}
        </form>

        <div className='px-10 my-5'>
          <ul className=''>
            {itemList?.map((item, indx)=>{
              return (
                <li key={indx} className="px-3 py-2 bg-teal-500 text-white mb-2 flex flex-row justify-between items-center rounded-md"><div className='capitalized'>{item?.name}</div>
                 <div className='flex flex-row justify-between gap-2 items-center capitalize text-blue-800 cursor-pointer'>
                  <span title="Edit" onClick={()=>editItem(item?.id)}>edit</span>
                  <span title='Delete' onClick={()=>deleteItem(item?.id)}>delete</span>
                  </div>
                 </li>
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default App;
