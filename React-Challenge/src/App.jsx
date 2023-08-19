import Chessboard from "./components/chessboard/Chessboard";
/* The App component will contain:
 - the chessboard itself,
 - a window that shows whose move it is,
 and the coming components that are related to the game proccess. */
const App = () => {
  return (
    <>
      {/* Black Turn Message */}
      <div id="blackTurn" className="turns">
        Your Turn
      </div>

      <Chessboard />

      {/* White Turn Message */}
      <div id="whiteTurn" className="turns">
        Your Turn
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
