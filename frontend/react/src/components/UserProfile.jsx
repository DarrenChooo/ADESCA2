//Linking to users
const USER_URL = API_URL + '/users/';

//Linking to Images
const IMAGES_URL = IMAGE_URL + '/images/';

//Assign elements to a constant
const userid = window.localStorage.getItem('userid')

export default function UserProfile({setPlayerUsername, setPlayerId, floorId, setFloorId, setUserImageUrl}) {

    const [userData, setUserData] = React.useState({});
        React.useEffect(() => {
            axios({
                method: 'get',
                url: USER_URL + `join/${userid}`
            })
            .then((response) => {
                if (floorId === null) {
                    setFloorId(response.data.floorid)
                    setUserImageUrl(response.data.userimageurl)
                    setUserData(response.data)
                    setPlayerUsername(response.data.username)
                    setPlayerId(response.data.userid)
                } else {
                    setUserImageUrl(response.data.userimageurl)
                    setUserData(response.data)
                    setPlayerUsername(response.data.username)
                    setPlayerId(response.data.userid)
                }
            })
            .catch((error) => {
                window.alert(`Failed to retrieve User's details`)
                console.log(error)
            })
        }, [])

    return (
        <div id="profile">
            <div className="profileImage">
                <img src={IMAGES_URL + userData.userimageurl}/>
            </div>
            <div className="profileDetails">
                <h3>Profile: {userData.username}</h3>
                <h3>StarDust: {userData.quantity}</h3>
            </div>
        </div>
    )
}

