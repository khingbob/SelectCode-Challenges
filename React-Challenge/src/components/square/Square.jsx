import css from "./Square.module.css";
import wknight from "../../assets/wknight.png";
import bknight from "../../assets/bknight.png";
import wqueen from "../../assets/wqueen.png";
import bqueen from "../../assets/bqueen.png";
import { useState } from "react";
/* A square gets passed the board, it can have a color, contain the chess figures, and show movement symbols */
const Square = (props) => {
  //current square color
  const [color, setColor] = useState(props.color);
  //initial square color
  const squareColor = props.color;
  //board state management
  const board = props.board;
  const setBoard = props.setBoard;

  const id = props.id;
  const figure = props.figure;

  let figures = {
    wknight: wknight,
    bknight: bknight,
    wqueen: wqueen,
    bqueen: bqueen,
  };
  let colors = {
    gray: css.gray,
    white: css.white,
    selected: css.selected,
  };
  //click outside of this square
  document.addEventListener("click", (e) => {
    if (!document.getElementById(id).contains(e.target)) {
      setColor(squareColor);
    }
  });
  const squareClick = () => {
    let x = parseInt(props.id.split("|")[0]);
    let y = parseInt(props.id.split("|")[1]);
    figure && setColor("selected");
  };

  return (
    <div
      className={`${css.square} ${colors[color]}`}
      id={id}
      onClick={squareClick}
      onBlur={() => {
        setColor("white");
      }}
    >
      <img src={figures[figure]} className={css.figure} />
    </div>
  );
};
export default Square;
