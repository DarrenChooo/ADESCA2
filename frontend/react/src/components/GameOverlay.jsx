import useDidMountEffect from "./useDidMountEffect";

//Linking to users
const USER_URL = API_URL + '/users/';

//Linking to Images
const IMAGES_URL = IMAGE_URL + '/images/';

//Assign elements to a constant

export default function GameOverlay({gameStatus, setPlayerId}) {
    console.log('fu')    

    useDidMountEffect(() => {
        // Get user's info with userid
        console.log(gameStatus)
    }, [gameStatus])



    return (
        <div className="overlay">

        </div>
    )
}

