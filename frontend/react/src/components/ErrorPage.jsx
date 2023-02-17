export default function ErrorPage({setErrorMessage, setErrorData}) {
    
    return (
        <div className="errorPage">
            <h1>{setErrorMessage}</h1>
            <div className="cloakWrapper">
                <div className="cloakContainer">
                    <div className="cloak"></div>
                </div>
            </div>
            <div className="info">
                <h2>We can't find that page</h2>
                <p>We're fairly sure that page used to be here, but seems to have gone missing. Please refresh the page.</p>
                <h3>{setErrorData}</h3>
            </div>
        </div>
    )
}

