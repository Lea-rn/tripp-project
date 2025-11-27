import "./app.css"

import { useState } from "react";
import "./styles.css";

const Cards = [
  {
    id: 3457,
    question: "What language is React Based on ?",
    answer: "javascript",
  },
  {
    id: 7336,
    question: "What are the building blocks of react apps ?",
    answer: "Components",
  },
  {
    id: 8832,
    question:
      "What's the name of the syntaxe we use to describe a ui in React ?",
    answer: "JSX",
  },

  {
    id: 1297,
    question: "How to pass data from parent to child components ?",
    answer: "Props",
  },

  {
    id: 9103,
    question: "How to give components memory ?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completly synchronised with state ?",
    answer: "Controlled element",
  },
];

export default function Flashcards() {
  const [selectedId, setSelectedId] = useState(null); /// 7336
  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }
  return (
    <div className="card-container">
      {Cards.map((ele) => (
        <div
          key={ele.id}
          className={ele.id == selectedId ? "selected" : "card"}
          onClick={() => handleClick(ele.id)}
        >
          <p>{ele.id === selectedId ? ele.answer : ele.question}</p>
        </div>
      ))}
    </div>
  );
}
