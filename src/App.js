import React from "react";
import Card from "./components/Card";

function App() {
  const [charData, setCharData] = React.useState([
    {
      id: 1,
      name: "",
      image: "",
    },
    {
      id: 2,
      name: "",
      image: "",
    },
  ]);
  const [randomNums, setRandomNums] = React.useState({
    randomOne: 1,
    randomTwo: 2,
  });
  const [health, setHealth] = React.useState({
    char: 50,
    enemy: 30,
  });

  function newChar() {
    setHealth({ char: 50, enemy: 30 });
    setRandomNums((prev) => {
      return {
        randomOne: Math.floor(Math.random() * 826) + 1,
        randomTwo: Math.floor(Math.random() * 826) + 1,
      };
    });
  }

  React.useEffect(() => {
    fetch(
      `https://rickandmortyapi.com/api/character/${randomNums.randomOne},${randomNums.randomTwo}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCharData(data);
      });
  }, [randomNums]);

  function attack() {
    setHealth((prevHp) => {
      return {
        ...prevHp,
        char: health.char - (Math.floor(Math.random() * 6) + 1),
        enemy: health.enemy - (Math.floor(Math.random() * 6) + 1),
      };
    });
  }

  function newGame() {
    setHealth({ char: 50, enemy: 30 });
  }

  return (
    <div className="App">
      <div className="container">
        <h2>Rick or Morty</h2>
        <button className="btn" onClick={newChar}>
          New Characters
        </button>
        <div className="card--container">
          <Card
            name={charData[0].name}
            img={charData[0].image}
            key={charData[0].id}
            hp={health.char}
          />
          <Card
            name={charData[1].name}
            img={charData[1].image}
            key={charData[1].id}
            hp={health.enemy}
          />
        </div>

        {health.enemy > 0 && health.char ? (
          <button className="btn--attack" onClick={attack}>
            Attack
          </button>
        ) : (
          <button className="btn--attack" onClick={newGame}>
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
