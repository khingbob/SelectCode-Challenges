import css from "./Square.module.css";
import wknight from "../../assets/wknight.png";
import bknight from "../../assets/bknight.png";
import wqueen from "../../assets/wqueen.png";
import bqueen from "../../assets/bqueen.png";
import dot from "../../assets/dot.png";
import { useEffect, useState } from "react";
/* A square gets passed the board, it can have a color and a highlight, contain the chess figures, and show movement symbols */
const Square = (props) => {
  //board state management
  //props.board is being spread to avoid mutation
  const board = [...props.board];
  const setBoard = props.setBoard;

  //clicked square state
  const clicked = props.clicked;
  const setClicked = props.setClicked;
  const cx = clicked ? clicked[0] : null;
  const cy = clicked ? clicked[1] : null;

  //id of the square container
  const id = props.id;

  //coordinates of the square
  const x = parseInt(props.id.split("|")[0]);
  const y = parseInt(props.id.split("|")[1]);

  //the figure on the square
  const figure = props.figure;

  //square highlight
  const highlight = props.highlight;

  //square color
  const squareColor = props.squareColor;

  /* object matching the figure prop with the imported variable  */
  const figures = {
    wknight,
    bknight,
    wqueen,
    bqueen,
    dot,
  };

  // matching the square color prop with the class-name of the modular css component
  const squareColors = {
    gray: css.gray,
    white: css.white,
  };
  // matching the highlight prop with the class-name of the modular css component
  const highlights = {
    selected: css.selected,
    attack: css.attack,
  };

  /* || CLEANERS */

  //removes the dots that the knight was showing when selected
  const knightDotsCleaner = (x, y) => {
    for (let xd = -2; xd <= 2; xd++) {
      if (xd == 0) continue;
      for (let yd = -2; yd <= 2; yd++) {
        if (Math.abs(Math.abs(xd) - Math.abs(yd)) != 1 || yd == 0) continue;
        if (x + xd >= 0 && x + xd < 8 && y + yd >= 0 && y + yd < 8) {
          board[x + xd][y + yd] = {
            key: x + xd + "|" + (y + yd),
            id: x + xd + "|" + (y + yd),
            squareColor: board[x + xd][y + yd].squareColor,
            highlight: null,
            // if the aim was a dot it has to be cleaned, otherwise the figure should stay
            figure:
              board[x + xd][y + yd].figure == "dot"
                ? null
                : board[x + xd][y + yd].figure,
          };
        }
      }
    }
  };

  // matching cleaners with the figures
  const cleaners = {
    bknight: knightDotsCleaner,
    wknight: knightDotsCleaner,
    // bqueen:queenDotsCleaner, wqueen: queenDotsCleaner,
  };

  /* || DIRECTIONS */

  //available movements for a knight
  const knightDirection = () => {
    for (let xd = -2; xd <= 2; xd++) {
      if (xd == 0) continue;
      for (let yd = -2; yd <= 2; yd++) {
        if (Math.abs(Math.abs(xd) - Math.abs(yd)) != 1 || yd == 0) continue;
        if (x + xd >= 0 && x + xd < 8 && y + yd >= 0 && y + yd < 8) {
          board[x + xd][y + yd] = {
            key: x + xd + "|" + (y + yd),
            id: x + xd + "|" + (y + yd),
            squareColor: board[x + xd][y + yd].squareColor,
            figure: board[x + xd][y + yd].figure ?? "dot",
            highlight: board[x + xd][y + yd].figure
              ? highlights["attack"]
              : null,
          };
        }
      }
    }
  };

  const directions = {
    wknight: knightDirection,
    bknight: knightDirection,
    // wqueen: queenDirection, bqueen: queenDirection
  };

  // Click-handler on a square
  const squareClick = () => {
    // cleaning if a figure was selected before
    if (clicked && board[cx][cy].figure) {
      cleaners[board[cx][cy].figure](cx, cy);
      board[cx][cy] = { ...board[cx][cy], highlight: null };
    }
    // giving a highlight if a figure was selected now
    if (figure && figure != "dot")
      board[x][y] = { ...board[x][y], highlight: "selected" };
    //showing the available movements for this figure
    figure && figure != "dot" && directions[figure]();
    //rerendering changes
    setBoard(board);
    //updating the last clicked square
    setClicked([x, y]);
  };

  return (
    <div
      className={`${css.square} ${squareColors[squareColor]}`}
      id={id}
      onClick={squareClick}
    >
      <div className={`${css.highlight} ${highlights[highlight]}`}>
        <img src={figures[figure]} className={css.figure} />
      </div>
    </div>
  );
};
export default Square;
