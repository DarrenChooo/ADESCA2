function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return `%${  (`00${  c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded', function () {
    const loginFormContainer = document.querySelector('#loginFormContainer');

    loginFormContainer.onsubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const webFormData = new FormData();

        // Declare userId to global variable
        let userid
        webFormData.append('username', username);   
        webFormData.append('password', password);
        axios.post(`${API_URL  }/users/login`,{username , password})
            .then(function (response) {
                userData = parseJwt(response.data)
                const {userid} = userData
                axios({
                    method: 'put',
                    url: `${API_URL  }/users/status/${userid}`,
                    data: {
                        status: "online"
                    }
                })
                .then((response) => {
                    console.log(`Updated userid:${userid}'s status to online`);
                })
                .catch((error) => {
                    console.log(error)
                })
                if (userData.role == 'Player') {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('userid', userData.userid);
                    localStorage.setItem('rolename', userData.role);
                    localStorage.setItem('floorid', userData.floorid);
                    window.location.assign('../user/react_floor.html');
                    return;
                }
                if (userData.role == 'Admin') {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('userid', userData.userid);
                    localStorage.setItem('rolename', userData.role);
                    localStorage.setItem('floorid', userData.floorid);
                    window.location.assign('../admin/home.html');
                    
                }
            })
            .catch(function (response) {
                // Handle error
                console.dir(response);
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    theme: 'sunset',
                    timeout: '6000',
                    text: 'Unable to login. Check your email and password',
                }).show();

            });
    };

})


