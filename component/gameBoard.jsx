
export default function GameBoard({onSelectSquare,board}){
    // const [gameBoard,updateGameBoard]=useState(initialGameBoard);
    // function handleClickButton(rowIndex,colIndex){
    //     updateGameBoard((prevBoard)=>{
    //         const updatedBoard = [...prevBoard.map(innerArray=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex]=curSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }
 
        return(
        <ol id="game-board">
            {board.map((row,rowIndex) =>(
                 <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex)=>(
                    <li key={colIndex}>
                    <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                </li>
            ))}
                </ol>
            </li>
        ))}
        </ol>
    );
}