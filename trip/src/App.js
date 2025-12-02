import { useState } from "react";

/* 
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
*/

export default function App() {
  const [items, setItms] = useState([]);




  function handleAddItems(ele) {
    setItms((items) => [...items, ele]);
  
  }

  function handleDeleteItems(id) {
    setItms((cur) => cur.filter((ele) => ele.id !== id));
  }

  function handleToggleItem(id) {
    setItms((cur) =>
      cur.map((ele) => (ele.id === id ? { ...ele, packed: !ele.packed } : ele))
    );
  }

  function handleClearList (){
    const confirmed = window.confirm("Are you sure you want to delete all items ?? ")
  
  if (confirmed)  setItms([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList 
      items={items} 
      onDelteItem={handleDeleteItems} 
      handleToggleItem={handleToggleItem} 
      onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="add item ...."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>add</button>
    </form>
  );
}

function PackingList({ items, onDelteItem , handleToggleItem , onClearList}) {
  const [sortBy , setSortBy] = useState("input")

    let sortedItems ; 
    if (sortBy === "input") sortedItems = items
    if (sortBy === "description") sortedItems = items.slice().sort((a,b)=> a.description.localeCompare(b.description))
    if (sortBy === "packed") sortedItems = items.slice().sort((a,b)=> Number(a.packed) - Number(b.packed))
  return (
    <div className="list">
      <ul>
        {sortedItems.map((ele) => (
          <Item key={ele.id} item={ele} onDelteItem={onDelteItem} handleToggleItem={handleToggleItem} />
        ))}
      </ul>

      <div className="actions">
       <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
        <option value="input" >Sort by input order</option>
         <option value="description">
          Sort by description
         </option>
         <option value="packed">
          Sort by packed status
         </option>
       </select>
       <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDelteItem  , handleToggleItem}) {
 
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=> handleToggleItem(item.id)}  />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
   
  if (!items.length) {
    return <p className="stats">
      Start adding some items to your pcking list🚀
    </p>
  }

  const numItems = items.length
  const packedItem = items.filter((ele)=> ele.packed).length
  const percentage = Math.round((packedItem / numItems ) * 100)
  return (
    <footer className="stats">
      <strong>
        {percentage === 100 ? "you got everything ! Ready to go ✈️" : `
            👜 You have ${numItems} items on your list , and you have already packed ${packedItem} (${percentage}%)
        `}
    
      </strong>
    </footer>
  );
}
