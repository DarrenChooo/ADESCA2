/////////////////////////////////////////////////////////////////////
//Linking to Post and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/posts/';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader";
import AddPostForm from './components/AddPostForm';

const AddPost = () => {

    return (
        <div>
            <AdminHeader pageTitle="Add Post" backURL="../../user/user_manage_post.html" />

            <AddPostForm />

        </div>
    )

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AddPost />);