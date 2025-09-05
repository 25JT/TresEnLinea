import { Squere } from "./Squere";
export function WinnerModal  ({ winner, resetGame }) {
    if (winner === null)
        return null
        const winnerText = winner === false ? 'Empate' : `GANO: `;

        return (
            <section className='winner'>
                <div className='text'> 
                    <h2>
                    {
                        winnerText
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
        )
    
}
