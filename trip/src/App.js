import { useState } from "react";

 
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "charger", quantity: 1, packed: true },
      { id: 4, description: "Shoes", quantity: 2, packed: false },
     
];




 export default function App (){
  return <div className="app">
  <Logo/>
  <Form/>
  <PackingList/>
  <Stats/>
  </div>
 }

function Logo () {
  return <h1> 🌴 Far Away 👜</h1>
}

function Form (){
  const [description , setDescription] = useState("")
  const [quantity , setQuantity] = useState(1)
  function handleSubmit (e){
    e.preventDefault()
    if (!description) return  ; 
    const newItem = {
      description : description  
      , quantity : quantity , 
      packed : false , 
      id : Date.now() 
    }

    console.log(newItem)
    setDescription("")
    setQuantity(1)

  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3 >What do you need for your 😍 trip ?</h3>
      <select value={quantity}
      onChange={(e)=>setQuantity(Number(e.target.value))}
      >
       {Array.from({length:20},(_,i)=> i+1).map((num)=> (
        <option key={num} value={num}>{num}</option>
       ))}
      </select>
      <input type="text" placeholder="add item ...."  
      value={description}
      onChange={(e)=>{
    setDescription(e.target.value)
      } }
      />
      <button>add</button>
    </form>
  )
}


function PackingList (){
  return <div className="list"> 
  <ul>
    {initialItems.map((ele)=> <Item key={ele.id} item={ele} />)}
  </ul>
  </div>
}

function Item ({item}){
return <li>
  
  <span style={item.packed ? {textDecoration:"line-through"} : {}}> {item.quantity} {item.description} </span>
  <button>❌</button>

</li>
}


function Stats (){
  return (
    <footer className="stats">
      <strong>
        👜 You have X items on your list , and you already packed X (x%)
      </strong>

    </footer>
  )
}