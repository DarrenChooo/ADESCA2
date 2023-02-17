//Linking to Floors
const FLOOR_URL = API_URL + '/floors/';
export default function GameBackgroundImage({
  floorId,
  setError
}) {
  React.useEffect(() => {
    if (floorId != null) {
      axios({
        method: 'get',
        url: FLOOR_URL + floorId
      }).then(response => {
        document.body.style.backgroundImage = `url('../images/${response.data.imageurl}')`;
      }).catch(error => {
        setError(error);
      });
    }
  }, [floorId]);
  return null;
}