import css from "./Square.module.css";
import wknight from "../../assets/wknight.png";
import bknight from "../../assets/bknight.png";
import wqueen from "../../assets/wqueen.png";
import bqueen from "../../assets/bqueen.png";
import dot from "../../assets/dot.png";
/* A square gets passed the board, it can have a color and a highlight, contain the chess figures, and show movement symbols */
const Square = (props) => {
  //board state management
  //props.board is being spread to avoid mutation
  const board = [...props.board];
  const setBoard = props.setBoard;

  //players turn: true -> white, false -> black
  const whiteTurn = props.whiteTurn;
  const setWhiteTurn = props.setWhiteTurn;

  if (whiteTurn) {
    document.getElementById("whiteTurn").style.opacity = 1;
    document.getElementById("blackTurn").style.opacity = 0;
  } else {
    document.getElementById("whiteTurn").style.opacity = 0;
    document.getElementById("blackTurn").style.opacity = 1;
  }

  //previously clicked square state
  const clicked = props.clicked;
  const setClicked = props.setClicked;
  //clicked coordinates
  const cx = clicked ? clicked[0] : null;
  const cy = clicked ? clicked[1] : null;

  //id of the square container
  const id = props.id;

  //coordinates of this square
  const x = parseInt(props.id.split("|")[0]);
  const y = parseInt(props.id.split("|")[1]);

  //the figure on the square
  const figure = props.figure;

  //square highlight
  const highlight = props.highlight;

  //square color
  const squareColor = props.squareColor;

  // object matching the figure prop with the imported variable
  const figures = {
    wknight,
    bknight,
    wqueen,
    bqueen,
    dot,
  };

  //matching figures with their colors
  //white -> true, black -> false
  const colors = {
    wknight: true,
    wqueen: true,
    bknight: false,
    bqueen: false,
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
    check: css.check,
  };

  /* || Actions with direction dots */

  const knightDots = (x, y, action) => {
    // (x,y) is the coordinates of the knight
    // a dot can be set or cleaned as an action
    for (let xd = -2; xd <= 2; xd++) {
      if (xd === 0) continue;
      for (let yd = -2; yd <= 2; yd++) {
        if (Math.abs(Math.abs(xd) - Math.abs(yd)) != 1 || yd === 0) continue;
        if (x + xd >= 0 && x + xd < 8 && y + yd >= 0 && y + yd < 8) {
          board[x + xd][y + yd] = {
            ...board[x + xd][y + yd],
            // on set-action if there is an enemy figure it highlights, if it's a queen it's set to check
            // on clean all the highlights are removed
            highlight:
              action === "set"
                ? (board[x + xd][y + yd].figure === "bqueen" ||
                    board[x + xd][y + yd].figure === "wqueen") &&
                  colors[board[x + xd][y + yd].figure] !== whiteTurn
                  ? "check"
                  : board[x + xd][y + yd].figure &&
                    colors[board[x + xd][y + yd].figure] !== whiteTurn &&
                    "attack"
                : null,
            // on set if there is not a figure on the position then a dot should be set
            // on clean if there is a dot it should be removed
            figure:
              action === "set"
                ? board[x + xd][y + yd].figure ?? "dot"
                : board[x + xd][y + yd].figure === "dot"
                ? null
                : board[x + xd][y + yd].figure,
          };
        }
      }
    }
  };

  const queenDots = (x, y, action) => {
    // the action with the dot
    const queenDot = (xi, yi) => {
      board[xi][yi] = {
        ...board[xi][yi],
        // on set if there is no figures a dot should be set
        // on clean if there is a dot it should be cleaned
        figure:
          action === "set"
            ? board[xi][yi].figure ?? "dot"
            : board[xi][yi].figure === "dot"
            ? null
            : board[xi][yi].figure,
        // on set if there is an enemy figure it should highlight
        // on clean all the highlights are removed
        highlight:
          action === "set"
            ? board[xi][yi].figure &&
              colors[board[xi][yi].figure] !== whiteTurn &&
              "attack"
            : null,
      };
      // checks if a playable figure was hit
      return board[xi][yi].figure && board[xi][yi].figure !== "dot";
    };

    // dotting goes starting from the figure outwards to avoid dots going behind the figures

    // horizontal left
    for (let xi = x - 1; xi >= 0; xi--) {
      if (queenDot(xi, y)) break;
    }
    // diagonal up-left
    for (let xi = x - 1, yi = y + 1; xi >= 0 && yi < 8; xi--, yi++) {
      if (queenDot(xi, yi)) break;
    }
    // vertical up
    for (let yi = y + 1; yi < 8; yi++) {
      if (queenDot(x, yi)) break;
    }
    // diagonal up-right
    for (let xi = x + 1, yi = y + 1; xi < 8 && yi < 8; xi++, yi++) {
      if (queenDot(xi, yi)) break;
    }
    // horizontal right
    for (let xi = x + 1; xi < 8; xi++) {
      if (queenDot(xi, y)) break;
    }
    // diagonal down-right
    for (let xi = x + 1, yi = y - 1; xi < 8 && yi >= 0; xi++, yi--) {
      if (queenDot(xi, yi)) break;
    }
    // vertical down
    for (let yi = y - 1; yi >= 0; yi--) {
      if (queenDot(x, yi)) break;
    }
    // diagonal down-left
    for (let xi = x - 1, yi = y - 1; xi >= 0 && yi >= 0; xi--, yi--) {
      if (queenDot(xi, yi)) break;
    }
  };

  //matching the String value of figure with the functions
  const dotsActions = {
    wknight: knightDots,
    bknight: knightDots,
    wqueen: queenDots,
    bqueen: queenDots,
  };

  // Click-handler on a square
  const squareClick = () => {
    // a figure movement
    if (figure === "dot") {
      //cleaning all the dots
      dotsActions[board[cx][cy].figure](cx, cy, "clean");
      //moving the figure
      board[x][y] = { ...board[x][y], figure: board[cx][cy].figure };
      board[cx][cy] = { ...board[cx][cy], highlight: null, figure: null };
      setWhiteTurn(!whiteTurn);
    }
    //taking a piece
    else if (
      board[x][y].highlight === "attack" ||
      board[x][y].highlight === "check"
    ) {
      let takenPiece = board[x][y].figure;
      board[x][y].figure = board[cx][cy].figure;
      dotsActions[board[cx][cy].figure](cx, cy, "clean");
      board[cx][cy] = { ...board[cx][cy], highlight: null, figure: null };
      setWhiteTurn(!whiteTurn);

      //End-Game
      if (takenPiece === "wqueen") {
        document.getElementById("blackWon").classList.add("endGameExpansion");
      } else if (takenPiece === "bqueen") {
        document.getElementById("whiteWon").classList.add("endGameExpansion");
      }
    } else {
      //deselecting a figure
      if (clicked && board[cx][cy].figure) {
        dotsActions[board[cx][cy].figure](cx, cy, "clean");
        board[cx][cy] = { ...board[cx][cy], highlight: null };
      }
      //making the figures selctable only on the right players turn
      if (colors[figure] === whiteTurn) {
        // giving a highlight if a figure has been selected now
        if (figure && figure !== "dot")
          board[x][y] = { ...board[x][y], highlight: "selected" };

        //showing the available movements for this figure
        figure && figure != "dot" && dotsActions[figure](x, y, "set");
      }
    }
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
