export default 
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