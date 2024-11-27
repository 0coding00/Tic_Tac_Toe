export default function GameOver({winner,onResart}){
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner &&  <p>{winner} , is the winner :0</p>}
            {!winner &&  <p>It's A Draw</p>}
            <button onClick={onResart}>Rematch!</button>
        </div>
    );
}