import css from "./Chessboard.module.css";
import Square from "../square/Square";
/* The chessboard will contain all the squares */
/* The coordinate system starts from the bottom left with 0 */
const Chessboard = () => {
  // Coordinates of figures
  let board = [];
  // Initial setup
  for (let x = 0; x < 8; x++) {
    let column = [];
    let a = x % 2 == 0 ? "white" : "gray";
    let b = x % 2 == 0 ? "gray" : "white";
    for (let y = 0; y < 8; y++) {
      column.push(
        <Square
          key={x + "|" + y}
          //color of the square
          color={y % 2 == 0 ? a : b}
          figure={
            (y == 1 && (x < 4 ? "wqueen" : "wknight")) ||
            (y == 6 && (x < 4 ? "bqueen" : "bknight"))
          }
        />
      );
    }
    board.push(column);
  }
  return <div id={css.chessboard}>{board}</div>;
};
export default Chessboard;
