import { useState } from 'react'
import './App.css'

const turnos = {
  x:'x',
  o:'o'
}


const Squere = ({children, isSelected, updateBoard,  index  })=>{
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = ()=>{
    updateBoard(index)

  }
  return(
    <div onClick={handleClick} className={className} >
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
const [turn, setTurn] = useState(turnos.x)
const [winner, setWinner] = useState(null)
const checkWinner = (board)=>{
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
  
      return board[a]
    }
  }
  return null
}

const checkEndGame = (board)=>{
  return board.every((square)=>square !== null)
}

const resetGame = ()=>{
  setBoard(Array(9).fill(null))
  setTurn(turnos.x)
  setWinner(null)
}

const updateBoard = (index)=>{
  if(board[index] || winner) return
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)

  const newTurn = turn === turnos.x ? turnos.o : turnos.x
  setTurn(newTurn)
  const newWinner = checkWinner(newBoard)
  if(newWinner){
    setWinner(newWinner)
  }else if (checkEndGame(newBoard)){
    setWinner(false)
  }

}
  
  return (
    <>
      <main className="board">
        <h1>Tres en linea</h1>
        <button onClick={resetGame}>Emepzar de nuevo</button>
        <section className='game'>
          {
            board.map((_, index)=>{
              return(
             <Squere key={index} 
             index={index} 
             updateBoard={updateBoard}
             isSelected={turn === turnos.x}>
              {board[index]}
              </Squere>
              )
            })
          }
        </section>
        <section className='turn'>
          <Squere isSelected={turn === turnos.x}>{turnos.x}</Squere>
          <Squere isSelected={turn === turnos.o}>{turnos.o}</Squere>
        </section>
{winner !== null && (
  <section className='winner'>
    <div className='text'> <h2>
      {
        winner === false ? 'Empate' : `Ganador: `
      }</h2>
      <header className='win'>
        {
          winner && <Squere>{winner}</Squere>
        }
      </header>
      <footer>
        <button onClick={resetGame}>Emepzar de nuevo</button>
      </footer>
      </div>
    </section>
)}

      </main>
    </>
  )
}

export default App
