import React from "react";
import Card from "./components/Card";

function App() {
  const [allCharData, setAllCharData] = React.useState([]);
  const [charData, setCharData] = React.useState([
    {
      id: "",
      name: "",
      image: "",
    },
  ]);
  const [enemy, setEnemy] = React.useState([
    {
      id: "",
      name: "",
      image: "",
    },
  ]);

  const [playing, setPlaying] = React.useState(false);
  const [randomNums, setRandomNums] = React.useState({
    randomOne: 1,
  });

  const [health, setHealth] = React.useState({
    char: 50,
    enemy: 30,
  });
  /*
  function newChar() {
    setHealth({ char: 50, enemy: 30 });
    setRandomNums((prev) => {
      return {
        randomOne: Math.floor(Math.random() * 826) + 1,
        randomTwo: Math.floor(Math.random() * 826) + 1,
      };
    });
  }
*/

  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/`)
      .then((res) => res.json())
      .then((data) => {
        setAllCharData(data.results);
      });
  }, []);

  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${randomNums.randomOne}`)
      .then((res) => res.json())
      .then((data) => {
        setEnemy(data);
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
    setPlaying(true);
  }

  function newChar() {
    setHealth({ char: 50, enemy: 30 });
    setRandomNums((prev) => {
      return {
        randomOne: Math.floor(Math.random() * 826) + 1,
      };
    });
  }

  /* function prevHandle(id) {
    setAllCharData((oldChar) =>
      oldChar.map((item) => {
        return item.id === id
          ? setSelectedCharData({
              id: item.id,
              name: item.name,
              image: item.image,
            })
          : item;
      })
    );
    setPlaying(true);
  }
  */

  function prevHandle(id) {
    allCharData.map((item) => {
      return (
        item.id === id &&
        setCharData([
          {
            id: item.id,
            name: item.name,
            image: item.image,
          },
        ])
      );
    });
    setPlaying(true);
  }

  const allCharDataEl = allCharData.map((item) => {
    return (
      <Card
        name={item.name}
        img={item.image}
        key={item.id}
        hp={50}
        chosenChar={() => prevHandle(item.id)}
      />
    );
  });

  console.log(charData);

  return (
    <div className="App">
      {playing ? (
        <div className="container">
          <h2>Rick or Morty</h2>
          <button className="btn" onClick={newChar}>
            New Enemy
          </button>
          <div className="card--container">
            <Card
              name={charData[0].name}
              img={charData[0].image}
              key={charData[0].id}
              hp={health.char}
              playing={playing}
            />
            <Card
              name={enemy.name}
              img={enemy.image}
              key={enemy.id}
              hp={health.enemy}
              playing={playing}
            />
          </div>

          {health.enemy > 0 && health.char > 0 ? (
            <button className="btn--attack" onClick={attack}>
              Attack
            </button>
          ) : (
            <button className="btn--attack" onClick={newGame}>
              New Game
            </button>
          )}
        </div>
      ) : (
        <div className="idle--container">
          <h2 className="char--header">Choose your Character</h2>
          <div className="char--container">{allCharDataEl}</div>
          <div className="buttons">
            <button>Prev</button>
            <button>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
