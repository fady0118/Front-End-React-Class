import { useEffect, useState } from 'react'
import './App.css'
import Menu from './Menu';

// define global vars
  // there are 7 columns in the game
  const COLS = 7;
  // there are 6 cells per column 
  const ROWS = 6;

// Cell component
  // they can hold the player discs
function Cell({value, onClick}){
  const className = `cell ${value} ${value !== null ? 'player' : ''}`;
  return(
    <button className={className} onClick={onClick}></button>
  );
}

// board component
function Board({board, currentPlayer, onBoardChange, OnPlayerChange, winningLine, setWinningLine, player1Name, player2Name}){
  // iterate through the col rows and place a disc at the lowest empty cell
  function handleClick(col){
    if (winningLine) return;
    const newBoard = board.map(row=>[...row]); // Create a copy of the board
    for(let row = ROWS-1; row>=0; row--){
      if(!newBoard[row][col]){
        newBoard[row][col] = currentPlayer;
        break;
      }
    }
    onBoardChange(newBoard);
    // Check for a winner after each move
  
      const result = checkWinner(newBoard);
      if(result){
        setWinningLine(result.line);
        const winBoard = board.map(row=>[...row]);
        result.line.forEach(([row,col])=>{
          winBoard[row][col] = "winner";
          
        });
        setTimeout(()=>{ // delay for the first regular animation
          onBoardChange(winBoard);
        setTimeout(()=>{ // delay for the win animation
          alert(`${result.winner} wins!`);
          // reset game
          onBoardChange(prevBoard => prevBoard.map(row => row.map(() => null)));
          OnPlayerChange(player1Name);
          setWinningLine(null);
        }, 1000);
        },800)
      }else{
        OnPlayerChange(currentPlayer === player1Name? player2Name : player1Name);
      }
    
  }

  return(
    <div className='Board'>
      {board.map((row,rowIndex)=>(
        <div key={rowIndex} className="Row">
          {row.map((cell, colIndex)=>(
            <Cell value={cell} onClick={()=>handleClick(colIndex)}/>
      ))}
        </div>
      ))}
    </div>
      
  );
}
// Game component
export default function Game({player1Name, player2Name, onGoBack, player1color, player2color}) {

  // initialize states
    // 2D 6*7 Array representing the board
    const [board, setBoard] = useState(Array.from({length:ROWS},()=>{return Array(COLS).fill(null)}));
    const [currentPlayer, setcurrentPlayer] = useState(player1Name); 
    const [winningLine, setWinningLine] = useState(null);
    // States callback functions
    const boardChange = (childData)=>{
      setBoard(childData);
    };
    const playerChange = (childData)=>{
      setcurrentPlayer(childData);
    };
    const setWinState = (childData)=>{
      setWinningLine(childData);
    }
    // Apply player-specific styles dynamically
    const playerNameClass = `${currentPlayer}_`;

    const style = document.createElement('style');
    style.type = 'text/css';
    const css = `
    .${player1Name}{background-color:${player1color};}
    .${player2Name}{background-color:${player2color};}
    .${player1Name}_{color:${player1color};}
    .${player2Name}_{color:${player2color};}
    `
    if(style.styleSheet){
      style.styleSheet.cssText = css;
    }else{
      style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);
  // create the structure and call the board component
  return (
    <>
      <div className="container">
        <h2 className="title">Connect Four Game</h2>
        <span>Current player: </span>
        <span className={playerNameClass}>{currentPlayer.charAt(0).toUpperCase()+currentPlayer.slice(1)}</span>
      </div>
      <Board board={board} onBoardChange={boardChange} currentPlayer={currentPlayer} OnPlayerChange={playerChange} winningLine={winningLine} setWinningLine={setWinState} player1Name={player1Name} player2Name={player2Name}/>
      <button className="backToMenu" onClick={onGoBack}>Go Back</button>
    </>
  );
}

// ConnectFour Win Logic
function checkWinner(board){
  // if win condition met return winner name, else return null
  // there's 8 possible sequences for a player to win he must place 4 discs in a horizontal, vertical or diagonal line 
  // since we check all cells in the loop we only need to check 4 of the 8 directions
  // iterate for all cells in the board check for winning conditions within boundries
  for(let i=0; i<ROWS; i++){
    for(let j=0; j<COLS; j++){
      // check if a player met the  win condition
      if(board[i][j]){
        // 1. horizontal rightwards
        if(j+3 < COLS && board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2] && board[i][j] === board[i][j+3]){
          return {winner: board[i][j], line: [[i,j], [i,j+1], [i,j+2], [i,j+3]]};
        }
        // 2. vertical downwards
        if(i+3 < ROWS && board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j]){
          return {winner: board[i][j], line: [[i,j], [i+1,j], [i+2,j], [i+3,j]]};
        }
        // 3. diagonal 225deg
        if(i+3 < ROWS && j-3 >= 0 && board[i][j] === board[i+1][j-1] && board[i][j] === board[i+2][j-2] && board[i][j] === board[i+3][j-3]){
          return {winner: board[i][j], line: [[i,j], [i+1,j-1], [i+2,j-2], [i+3,j-3]]};
        }
        // 4. diagonal 315deg
        if(i+3 < ROWS && j+3 < COLS && board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3]){
          return {winner: board[i][j], line: [[i,j], [i+1,j+1], [i+2,j+2], [i+3,j+3]]};
        }
      }
    }
  }
  return null;
}


