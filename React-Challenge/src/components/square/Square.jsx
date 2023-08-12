import css from "./Square.module.css";
// A square can have a color, contain the chess pieces, and show movement symbols
const Square = (props) => {
  return (
    <div
      className={`${css.square} ${
        props.color == "black" ? css.black : css.white
      }`}
    ></div>
  );
};
export default Square;
