/////////////////////////////////////////////////////////////////////
//Linking to post URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/posts/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader";
import UpdatePostForm from './components/UpdatePostForm';

const UpdatePost = () => {

    return (
        <div>
            <AdminHeader pageTitle="Update Post" backURL="../../admin/react_manage_posts.html" />
            <div className="container">
                <div className="flexCtn">
                    <UpdatePostForm />
                </div>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UpdatePost />);