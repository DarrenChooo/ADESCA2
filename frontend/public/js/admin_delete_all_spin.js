
API_URL = "http://localhost:3000/api/spin/";

const deleteAllButton = document.getElementById('deleteAll');
deleteAllButton.onclick = () => {
axios.delete(`${API_URL }/all`)
.then(function (response) {
    console.log(response)
    window.location.reload()
})
.catch((error) => {
    console.log(error)
})
}