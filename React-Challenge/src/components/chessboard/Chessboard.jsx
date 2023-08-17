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

  useEffect(() => {
    // Initial setup
    let tempBoard = [];
    for (let x = 0; x < 8; x++) {
      let row = [];
      let a = x % 2 == 0 ? "white" : "gray";
      let b = x % 2 == 0 ? "gray" : "white";
      for (let y = 0; y < 8; y++) {
        row.push({
          key: x + "|" + y,
          id: x + "|" + y,
          //color of the square
          squareColor: y % 2 == 0 ? a : b,
          figure:
            (y == 1 && (x < 4 ? "wqueen" : "wknight")) ||
            (y == 6 && (x < 4 ? "bqueen" : "bknight")) ||
            null,
        });
      }
      tempBoard.push(row);
    }
    setBoard(tempBoard);
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
          />
        ))
      )}
    </div>
  );
};
export default Chessboard;
