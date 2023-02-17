export default function Tries({setTries}) {

    return (
        <div id="tries">
            <h1 key={"try" + setTries} id="triesCount">Tries: {setTries}</h1>
        </div>
    )
}