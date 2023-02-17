// Linking to Floors and Images URL
// Importing React libraries
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

// Importing web components from other jsx files
import AdminNavBar from "./components/AdminNavBar";
import AdminSearchBar from "./components/AdminSearchBar";
import RetrieveFloors from './components/RetrieveFloors';
import ErrorPage from "./components/ErrorPage";

const FLOOR_URL = `${API_URL}/floors/`;
IMAGE_URL += '/images/';

function ManageFloors() {
    const [floors, setFloors] = useState([]);

    // For error handling
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [errorData, setErrorData] = React.useState("")

    useEffect(() => {
        axios({
            method: 'get',
            url: `${FLOOR_URL}allFloors`
        })
        .then((response) => {
            setFloors(response.data)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.response.status)
            setErrorData(error.response.data)
        })

        // Listen to click on search icon button
        searchIcon.addEventListener('click', event => {
            event.preventDefault()

            axios({
                method: 'get',
                url: `${FLOOR_URL}name/${searchInput.value}`
            })
            .then((response) => {
                setFloors(response.data)
            })
            .catch((error) => {
                setError(true)
                setErrorMessage(error.response.status)
                setErrorData(error.response.data)
            })
        })

        // Listen to 'enter' key on search input
        searchInput.addEventListener('keypress', event => {
            if (event.key === "Enter") {
                event.preventDefault()

                axios({
                    method: 'get',
                    url: `${FLOOR_URL}name/${searchInput.value}`
                })
                .then((response) => {
                    setFloors(response.data)
                })
                .catch((error) => {
                    setError(true)
                    setErrorMessage(error.response.status)
                    setErrorData(error.response.data)
                })
            }
        })
    }, [])

    return (
        <>
            { error ? (
                <ErrorPage setErrorMessage={errorMessage} setErrorData={errorData}/>
            ) : (
                <div>
                    <AdminNavBar pageTitle="Floor Manager" />
                    <div className="bodyContainer">
                        <div className="flexContainer">
                            <AdminSearchBar addURL="/admin/react_add_floors.html" />
                            <RetrieveFloors setError={setError} setErrorMessage={setErrorMessage} setErrorData={setErrorData} floors={floors} />
                        </div>
                    </div>
                </div>
            )}
        </>
        
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ManageFloors />);