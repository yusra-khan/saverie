import "./counter.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useState, useEffect } from "react";

let count = false;
const Counter = (props) => {
  const item = props.item;
  const cart = JSON.parse(sessionStorage.getItem("cart"));
  const [counter, setCounter] = useState(cart && cart[item] ? cart[item] : 0);

  const handleClick1 = () => {
    if (props.qty_available>0 && counter < props.qty_available) {
      setCounter(counter + 1);
      count += 1;
    }

    if (props.counterUpdate) {
      props.counterUpdate(1);
    }
  };
  const handleClick2 = () => {
    {
      if (counter > 0) {
        setCounter(counter - 1);
        count -= 1;
        if (props.counterUpdate) {
          props.counterUpdate(-1);
        }
      }
    }
  };
  return (
    <div>
      <div className="buttons">
        <button onClick={handleClick2} className="btn">
          <FaMinus />
        </button>
        <span className="counter">{counter}</span>
        <button onClick={handleClick1} className="btn">
          <FaPlus />
        </button>
      </div>
      <div className="max">Max: {props.qty_available}</div>
    </div>
  );
};

export default Counter;
// export {count};
