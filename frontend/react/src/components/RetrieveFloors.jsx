export default function RetrieveFloors({floors, setError, setErrorMessage, setErrorData}) {

    const deleteFloor = event => {
        event.preventDefault();
        const floorId = event.target.id
        axios({
            method: 'delete',
            url: API_URL + `/floors/${floorId}`
        })
        .then((response) => {
            alert(response.data.message)
            location.reload()
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.response.status)
            setErrorData(error.response.data)
        })
    }

    return (
        <div id="contentBody">
            {floors.map((response) => {
                return (
                <div className= "card">
                    <img className="contentImg" src = {IMAGE_URL + response.imageurl}/>
                    <div className = "dataCtn"> 
                        <h3>Level - {response.floorid}, {response.floorname}</h3>
                        <a href={"/admin/react_update_floors.html?floorid=" + response.floorid}>
                            <button className="updateBtn">Update</button>
                        </a>
                        <button onClick={deleteFloor} id={response.floorid} className="deleteBtn">Delete</button>    
                    </div>
                </div>
                )
            })}
        </div>
    )
}