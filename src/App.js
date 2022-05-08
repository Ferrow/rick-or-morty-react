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
  const [dead, setDead] = React.useState({ char: false, enemy: false });
  const [playing, setPlaying] = React.useState(true);

  function newChar() {
    setHealth({ char: 50, enemy: 30, charAlive: true, enemyAlive: true });
    setDead({ char: false, enemy: false });
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

  /* const cardEl = charData.map((char) => {
    return <Card name={char.name} img={char.image} key={char.id} hp={health} />;
  });
*/
  /* function attack() {
    setPlaying(true);
    setHealth((prevHp) => {
      if (health.enemy > 0 && health.char > 0) {
        return {
          ...prevHp,
          char: health.char - (Math.floor(Math.random() * 6) + 1),
          enemy: health.enemy - (Math.floor(Math.random() * 6) + 1),
        };
      } else if (health.enemy <= 0) {
        setPlaying(false);
        setDead({ char: false, enemy: true });
        return { ...prevHp, enemy: 0, enemyAlive: false };
      } else if (health.char <= 0) {
        setPlaying(false);
        setDead({ char: true, enemy: false });
        return { ...prevHp, char: 0, charAlive: false };
      }
    });
  }
*/

  function attack() {
    setPlaying(true);
    if (health.enemy > 0 && health.char > 0) {
      setHealth((prevHp) => {
        return {
          ...prevHp,
          char: health.char - (Math.floor(Math.random() * 6) + 1),
          enemy: health.enemy - (Math.floor(Math.random() * 6) + 1),
        };
      });
    } else if (health.enemy <= 0) {
      setPlaying(false);
      setDead({ char: false, enemy: true });
      setHealth((prevHp) => {
        return { ...prevHp, enemy: 0 };
      });
    } else if (health.char <= 0) {
      setPlaying(false);
      setDead({ char: true, enemy: false });
      setHealth((prevHp) => {
        return { ...prevHp, char: 0 };
      });
    }
  }

  function newGame() {
    setHealth({ char: 50, enemy: 30 });
    setPlaying(true);
    setDead({ char: false, enemy: false });
  }

  console.log(dead.enemy);

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
            isAlive={!dead.char}
          />
          <Card
            name={charData[1].name}
            img={charData[1].image}
            key={charData[1].id}
            hp={health.enemy}
            isAlive={!dead.enemy}
          />
        </div>

        {playing ? (
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
