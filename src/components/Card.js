import React from "react";

const Card = (props) => {
  console.log(props);
  return (
    <div className={props.hp > 0 ? "card" : "card dead"}>
      <img className="card--image" src={props.img} alt="" />
      <h3>{props.name}</h3>
      <p>HP: {props.hp <= 0 ? "0" : props.hp}</p>
    </div>
  );
};

export default Card;
