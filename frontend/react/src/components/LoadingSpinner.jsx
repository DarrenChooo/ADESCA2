import React from "react";

export default function LoadingSpinner({setLoadingWords}) {
    
    return (
        <div key="spinnerContainer" className="spinnerContainer">
            <h1 key ="loadingWords" className="loadingWords">{setLoadingWords}</h1>
            <div key="loadingSpinner" className="loadingSpinner">
            </div>
        </div>
    );
}