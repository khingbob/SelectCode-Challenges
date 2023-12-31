import css from "./Chessboard.module.css";
import Square from "../square/Square";
import { useEffect, useState } from "react";
/* The chessboard will contain all the squares
  The coordinate system starts from the bottom left with 0 */
const Chessboard = () => {
  // Coordinates of squares: board[x][y]
  // When squares inside of the board array change, it rerenders
  const [board, setBoard] = useState([]);

  // The last clicked square. Used for clean-up purposes
  const [clicked, setClicked] = useState(null);

  // Player Turn: true -> white, false -> black to easilly toggle it
  const [whiteTurn, setWhiteTurn] = useState(true);

  const initialSetup = () => {
    setBoard([]);
    setClicked(null);
    setWhiteTurn(true);
    let tempBoard = [];
    for (let x = 0; x < 8; x++) {
      let column = [];
      let a = x % 2 == 0 ? "white" : "gray";
      let b = x % 2 == 0 ? "gray" : "white";
      for (let y = 0; y < 8; y++) {
        column.push({
          key: x + "|" + y,
          id: x + "|" + y,
          //color of the square
          squareColor: y % 2 == 0 ? a : b,
          //setting up figures
          figure:
            (y == 1 && (x < 4 ? "wqueen" : "wknight")) ||
            (y == 6 && (x < 4 ? "bqueen" : "bknight")) ||
            null,
        });
      }
      tempBoard.push(column);
    }
    setBoard(tempBoard);
  };

  useEffect(() => {
    initialSetup();
    // Restart button click
    for (let i = 0; i < 2; i++) {
      document
        .getElementsByClassName("restart")
        [i].addEventListener("click", (e) => {
          initialSetup();
          document.getElementsByClassName("endGame")[i].className = "endGame";
        });
    }
  }, []);
  return (
    <div id={css.chessboard}>
      {board.map((rows) =>
        rows.map((data) => (
          <Square
            board={board}
            setBoard={setBoard}
            key={data.key}
            id={data.id}
            squareColor={data.squareColor}
            highlight={data.highlight}
            figure={data.figure}
            clicked={clicked}
            setClicked={setClicked}
            whiteTurn={whiteTurn}
            setWhiteTurn={setWhiteTurn}
          />
        ))
      )}
    </div>
  );
};
export default Chessboard;
