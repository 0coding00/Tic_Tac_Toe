import GameBoard from "../component/gameBoard"
import Player from "../component/player"
import Log from "../component/Log.jsx"
import GameOver from "../component/GameOver.jsx"
import { useState } from "react"
import { WINNING_COMPINATION } from "./winning-compination.js"
const PLAYERS={
X:'Player 1',
O:'Player 2',
}
const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];
function deriveWinner(gameBoard,playerName){
  let winner=null;
  for(const compination of WINNING_COMPINATION){
    const fisrtSquareSymbol=gameBoard[compination[0].row][compination[0].col];
    const secondSquareSymbol=gameBoard[compination[1].row][compination[1].col];
    const thirdSquareSymbol=gameBoard[compination[2].row][compination[2].col];
    if(fisrtSquareSymbol && fisrtSquareSymbol===secondSquareSymbol && fisrtSquareSymbol===thirdSquareSymbol){
      winner=playerName[fisrtSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns){
  let gameBoard=[...initialGameBoard.map(array=>[...array])];
  for(const turn of gameTurns){
     const  {square,player} = turn
     const  {row,col} = square
     gameBoard[row][col]=player
  }
  return gameBoard;
};
function handleActivePlayer(gameTurns){
  let currPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currPlayer='O';
  }
  return currPlayer;
}

function App() {
  const [gameTurns,setGameTurns]=useState([]);
  const [playerName,setPlayerName]=useState(
   { X:'Player 1',
    O: 'Player 2',
  }
  );
  const activePlayer=handleActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,playerName);
  const hasDraw=gameTurns.length===9 && !winner;
  function handleRematch(){
    setGameTurns([]);
  }
  function handlePlayerName(symbol,newName){
    setPlayerName(prevName =>{
      return{
             ...prevName,
      [symbol]:newName
    }}    ) }
  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns(prevTurns => {
      const currPlayer=handleActivePlayer(prevTurns);
      const updateTurns=[
          {square:{row:rowIndex,col:colIndex},
      player:currPlayer},...prevTurns
    ]
    return updateTurns;
    } )
  }
  return <main>
    <div id="game-container">
    <ol id="players" className="highlight-player">
    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayerName} />
    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'}  onChangeName={handlePlayerName}/>
    </ol>
      {(winner || hasDraw ) && <GameOver winner={winner} onResart={handleRematch}/>}
      <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} curSymbol={activePlayer}/>
    </div>
      <Log  turns={gameTurns}/>
  </main>
}
export default App
