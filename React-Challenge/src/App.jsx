import Chessboard from "./components/chessboard/Chessboard";
import rotate from "./assets/rotate.png";
import { useEffect } from "react";
import squareCss from "./components/square/Square.module.css";
/* The App component will contain:
 - the chessboard itself,
 - a window that shows whose move it is,
 and the coming components that are related to the game proccess. */

const App = () => {
  useEffect(() => {
    // function to shorten getting by class name
    const clas = (clas) => document.getElementsByClassName(clas);
    let deg = 180;
    //rotating the desk on button click
    document.getElementById("rotate").addEventListener("click", () => {
      document.getElementById("root").style.transform = `rotate(${deg}deg)`;
      //rotating the figures in the opposite direction
      for (let i = 0; i < clas(squareCss.figure).length; i++) {
        clas(squareCss.figure)[i].style.transform = `rotate(-${deg}deg)`;
      }
      //rotating the turns messages
      for (let i = 0; i < clas("turns").length; i++) {
        clas("turns")[i].style.transform = `rotate(-${deg}deg)`;
      }
      //rotating the endgame messages
      for (let i = 0; i < clas("endGame").length; i++) {
        clas("endGame")[
          i
        ].style.transform = `translate(-50%, -50%) rotate(-${deg}deg)`;
      }
      deg += 180;
    });
  }, []);
  return (
    <>
      {/* Black Turn Message */}
      <div id="blackTurn" className="turns">
        Your Turn
      </div>

      <Chessboard />

      {/* Right column */}
      <div id="rightColumn">
        {/* Rotate button */}
        <img id="rotate" src={rotate} />
        {/* White Turn Message */}
        <div id="whiteTurn" className="turns">
          Your Turn
        </div>
      </div>

      {/* White Won Message */}
      <div id="whiteWon" className="endGame">
        <div className="endGameText">White Won!</div>
        <div className="restart">Restart</div>
      </div>

      {/* Black Won Message */}
      <div id="blackWon" className="endGame">
        <div className="endGameText">Black Won!</div>
        <div className="restart">Restart</div>
      </div>
    </>
  );
};
export default App;
