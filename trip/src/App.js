import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./Packinglist";
import Stats from "./Stats";




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







