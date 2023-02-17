export default function TicTacToePlayerTurn(props) {

    return (

        <div id="whosTurn">

            {props.winner && (
                <>

                    {/* display the winner if the winner or a draw is detected */}
                    <p>
                        {props.winner === "draw"

                            ? "It's a draw!"
                            : `${props.winner === props.symbol

                                ? "Congrats! You won the game!"
                                : "You lost the game. Better luck next time!"


                            }`}
                    </p>

                </>
            )}

            {!props.winner && (
                <>

                    {/* display who's turn if winner is not detected */}
                    {props.symbol === props.turn ? (
                        <p>It's your turn!</p>

                    )
                        : (
                            <p>It's the computer's turn</p>

                        )}
                        
                </>

            )}

        </div >

    )

}

