export default function Instructions({changeGameState}) {

    // Function to set user is ready
    function changeGameState() {
        setGameState(false)
    }

    return (
        <div key="instructions">
            <h2>This is a hangman game based from a random word generator</h2>
            <h2>You get ten tries before its game over</h2>
            <h2>There will be a timer of 3 minutes</h2>
            <div className="buttonCtn">
                <button onClick={changeGameState} className="startButton" type="button">Start Game</button> 
            </div>
        </div>
    )
}