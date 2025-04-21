import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import Tile from "./Tile"; // Import the Tile component
import YouHaveWonDialog from "./YouHaveWonDialog"; // Updated import
import sliderImage from "./assets/slider.jpg"; // Import the slider image

function App() {
  const winningOrder = [1, 2, 3, 4, 5, 6, 7, 8, null];

  const shuffleTiles = () => {
    let tiles = [...winningOrder];
    for (let i = 0; i < 25000; i++) {
      const emptyIndex = tiles.indexOf(null);
      const validMoves = [
        emptyIndex - 1, // left
        emptyIndex + 1, // right
        emptyIndex - 3, // up
        emptyIndex + 3, // down
      ].filter(
        (move) =>
          move >= 0 && move < 9 && // Ensure move is within bounds
          !(emptyIndex % 3 === 0 && move === emptyIndex - 1) && // Prevent wrapping left
          !(emptyIndex % 3 === 2 && move === emptyIndex + 1) // Prevent wrapping right
      );

      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
    }
    return tiles;
  };

  const [tiles, setTiles] = useState(shuffleTiles());
  const [clickCount, setClickCount] = useState(0); // State to track the number of clicks
  const [isModalActive, setIsModalActive] = useState(false); // State to control the modal visibility

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
      emptyIndex - 1, // left
      emptyIndex + 1, // right
      emptyIndex - 3, // up
      emptyIndex + 3, // down
    ];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = tiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
      setClickCount(clickCount + 1); // Increment the click counter

      if (newTiles.every((tile, idx) => tile === winningOrder[idx])) {
        setIsModalActive(true); // Show the modal when the game is won
      }
    }
  };

  const solveBoard = () => {
    setTiles([...winningOrder]); // Set tiles to the winning order
    setIsModalActive(true); // Show the modal
  };

  const startOver = () => {
    setTiles(shuffleTiles()); // Reset tiles to a shuffled state
    setClickCount(0); // Reset the click counter
    setIsModalActive(false); // Hide the modal
  };

  return (
    <div className="container">
      <div className="has-text-centered">
        <img src={sliderImage} alt="Slider Game" style={{ maxWidth: "25%", height: "auto" }} />
      </div>

      {/* Modal for "You have Won" */}
      <YouHaveWonDialog
        isActive={isModalActive}
        clickCount={clickCount}
        onStartOver={startOver}
        onClose={() => setIsModalActive(false)}
      />

      <div className="notification is-info has-text-centered">
        Current Click Count: {clickCount}
      </div>
      <div className="buttons is-centered">
        <button className="button is-warning" onClick={solveBoard}>
          Cheat: Solve the Board
        </button>
        <button className="button is-primary" onClick={startOver}>
          Start Over
        </button>
      </div>
      <div className="columns is-centered">
        <div className="column is-narrow">
          <div className="box">
            <div className="tile is-ancestor is-vertical">
              <div className="tile is-parent is-vertical">
                <div className="columns is-multiline">
                  {tiles.map((tile, index) => (
                    <Tile
                      key={index}
                      tile={tile}
                      index={index}
                      onClick={handleTileClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
