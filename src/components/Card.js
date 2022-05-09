import React from "react";

const Card = (props) => {
  return (
    <div
      className={props.hp > 0 ? "card" : "card dead"}
      onClick={props.chosenChar}
    >
      <img
        className={props.playing ? "card--image" : "card--image--idle"}
        src={props.img}
        alt=""
      />
      <div className="card--name--div">
        <h3 className="card--name">{props.name}</h3>
        {props.playing ? <p>HP: {props.hp <= 0 ? "0" : props.hp}</p> : ""}
      </div>
    </div>
  );
};

export default Card;
