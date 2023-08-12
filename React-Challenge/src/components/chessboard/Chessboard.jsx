import css from "./Chessboard.module.css";
import Square from "../square/Square";
/* The chessboard will contain all the squares */
const Chessboard = () => {
  return (
    <div id={css.chessboard}>
      <Square color="black" />
    </div>
  );
};
export default Chessboard;
