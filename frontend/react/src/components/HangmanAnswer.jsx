export default function AnswerContainer({setAnswerArray, setCorrectGuesses}) {

    return (
        <div id="answerCtn">
            {setAnswerArray.map((letter, index) => {
                return (
                    setCorrectGuesses.includes(letter) 
                    ? <div key={letter + index} className="answerBox">{letter}</div> 
                    : <div key={letter + index} className="answerBox">_</div> 
                )
            })}
        </div>
    )
}