import Chessboard from "./components/chessboard/Chessboard";
/* The App component will contain:
 - the chessboard itself,
 - a window that shows whose move it is,
 and the coming components that are related to the game proccess. */
const App = () => {
  return (
    <>
      <div id="blackTurn" className="turns">
        Your Turn
      </div>
      <Chessboard />
      <div id="whiteTurn" className="turns">
        Your Turn
      </div>
    </>
  );
};
export default App;
