API_URL = `${API_URL}/boss/`
IMAGE_URL = `${IMAGE_URL}/images/`
// Assigning divisions to a constant
const getBoss = document.getElementById("bossContent");
const adminTitle = document.getElementById("adminTitle")

window.onload = () => {

    axios.get(`${API_URL  }1`)
    .then(function (response) {

        getBoss.innerHTML = `<div class="card">
                                    <img class="image" src="${IMAGE_URL + response.data.imageurl}">
                                        <div class = "textContainer">
                                            <h1 class="mainText">${response.data.bossname}</h3>
                                            <form enctype="multipart/form-data" class="updateForm">

                                            <div class="input">
                                                <label for="updateBossName" class="inputLabel" >Input Boss Name</label>
                                                    <input type="text" id="updateBossName" name="updateBossName" placeholder="${response.data.bossname}" required>
                                            </div>
                                            <div class="input">
                                                <label for="updateBossHealth" class="inputLabel">Input Boss Health:</label>
                                                    <input type="text" id="updateBossHealth" name="updateBossHealth" placeholder="${response.data.bosshealth}" required>
                                            </div>
                                            <div class="input">
                                                <label for="updateBossReward" class="inputLabel">Input Boss Reward</label>
                                                    <input type="text" id="updateBossReward" name="updateBossReward" placeholder="${response.data.bossreward}" required>
                                            </div>
                                            <div class="input">
                                                <label for="updateBossImage" class="inputLabel">Input Boss Image ID</label>
                                                    <input type="text" id="updateBossImage" name="updateBossImage" placeholder="${response.data.imageid}" required>
                                            </div>

                                            <br/>
                                                <div class="button-container">
                                                    <button class="button" type="button" id="updateButton">Update</button>
                                                </div>

                                            </form>    
                                        </div>
                                    </div>
                                    `
    })
    .then(() => {

        const updateBossName = document.getElementById("updateBossName")
        const updateBossHealth = document.getElementById("updateBossHealth")
        const updateBossReward = document.getElementById("updateBossReward")
        const updateBossImage = document.getElementById("updateBossImage")
        
        updateButton.onclick = () => {

            const bossname = updateBossName.value
            const bosshealth = updateBossHealth.value
            const bossreward = updateBossReward.value
            const imageid = updateBossImage.value
        
            axios.put(`${API_URL  }1`, {
                bossname,
                bosshealth,
                bossreward,
                imageid,
            })
            .then(function () {
                alert(`Boss has been updated`);
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            });
        };
    })
    .then(()=> {
    })
    .catch((error) => {
        console.log(error)
    });
}
