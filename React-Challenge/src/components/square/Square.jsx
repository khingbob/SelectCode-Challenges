import css from "./Square.module.css";
import wknight from "../../assets/wknight.png";
import bknight from "../../assets/bknight.png";
import wqueen from "../../assets/wqueen.png";
import bqueen from "../../assets/bqueen.png";
// A square can have a color, contain the chess figures, and show movement symbols
const Square = (props) => {
  let figures = {
    wknight: wknight,
    bknight: bknight,
    wqueen: wqueen,
    bqueen: bqueen,
  };
  return (
    <div
      className={`${css.square} ${
        props.color == "gray" ? css.gray : css.white
      }`}
    >
      <img src={figures[props.figure]} className={css.figure} />
    </div>
  );
};
export default Square;
