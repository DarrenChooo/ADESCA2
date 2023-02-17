API_URL_CURRENCY = `${API_URL  }/currency/`;
API_URL += '/users/';


// For INSERT User section 
const addUserButton = document.getElementById('submitButton');
const insertNameInput = document.getElementById('usernameInput');
const insertPasswordInput = document.getElementById('passwordInput');
const insertRoleInput = "Player";
const registerStatus = document.getElementById('updateStatus');

/// //////////////////////////////////////////////////////////////////
// Function to INSERT User
/// //////////////////////////////////////////////////////////////////
addUserButton.onclick = () => {
    const iUserName =  insertNameInput.value;
    const iPassword = insertPasswordInput.value;
    const iRole = insertRoleInput;

    axios.post(API_URL, {
        role: iRole,
        username : iUserName, 
        password: iPassword,
    })
    
    .then((response) => {
        const user = response.data.result
        const userId = user.userid
        console.log(userId);
        axios.post(`${API_URL_CURRENCY  }${userId}`, {
            quantity:100
        })
        .then((response) => {
            const currency = response.data
            console.log(currency);
            console.log("accountcreated");
            registerStatus.innerHTML = ``
            registerStatus.innerHTML += `<p>You have successfully registered.</p>`
            
        })
            // Add a default time stamp when users create accounts
            axios({
                method: 'put',
                url: `${API_URL  }/status/${userId}`,
                data: {
                    status: "offline"
                }
            })
            .then(() => {
            })
            .catch((error) => {
                console.log(error)
            })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
        alert("failed to create");
    })
}