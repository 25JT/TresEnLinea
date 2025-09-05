import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Squere } from './components/Squere.jsx'
import { turnos } from './constants'
import { checkWinner, checkEndGame } from './components/logic/board'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(turnos.x)
  const [winner, setWinner] = useState(null)




  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turnos.x)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === turnos.x ? turnos.o : turnos.x
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
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
            board.map((_, index) => {
              return (
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
        <WinnerModal winner={winner} resetGame={resetGame} />

      </main>
    </>
  )
}

export default App
