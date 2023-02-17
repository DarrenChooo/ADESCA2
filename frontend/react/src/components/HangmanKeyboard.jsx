export default function Keyboard({handleClick, setLettersArray}) {

    return (
        <div key={"keyboard"} id="keyboard" onClick={handleClick}>
            {setLettersArray.map((value, index) => {
                    
                return(
                    <>
                    {index % 9 ===0 && <div key={"divider" + index} className="divider"/>}
                    <button key={"lettersArr" + value} className="letters" id={value} data-value={value}>{value}</button>
                    </>
                )
            })}
        </div>
    )
}