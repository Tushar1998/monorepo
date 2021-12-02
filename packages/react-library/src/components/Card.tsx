import React, { useState } from 'react';
import "./card.css";
import isEmpty from "lodash/isEmpty"

interface ICard {
  /**
   * The title for the card
   */
  name?: string;
}

export default function Card({ name }: ICard) {

  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  console.log("Card", name)

  return (
    <div className="card">
      <p className="title">{isEmpty(name) ? "Value Empty" : name}</p>
      <p className="title">{!isEmpty(name) ? "Value Empty" : name}</p>
      <p>Count -- {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
