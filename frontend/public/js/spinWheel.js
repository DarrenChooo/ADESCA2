const userId = localStorage.getItem("userid");

const  INVENTORY_URL = API_URL+"/inventory/";
const  ITEM_URL = API_URL+"/items/";
const SPIN_API_URL = API_URL + "/spin/"


const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
// Object that stores values of minimum and maximum angle for a value
// get all rewards
const rewards = [];
axios.get(`${SPIN_API_URL  }/all`)
    .then((response) => {
        // itemname is null if no reward
        response.data.forEach((item) => {
            if (item.itemname == null) {
                item.itemname = "No Reward!";
            }
            // push itemname into rewards array
            rewards.push(item.itemname);
        });

        // Object that stores values of minimum and maximum angle for a value
        const rotationValues = [
            { minDegree: 0, maxDegree: 30, value: rewards[0] }, // 2
            { minDegree: 31, maxDegree: 90, value: rewards[1] }, // 1
            { minDegree: 91, maxDegree: 150, value: rewards[2] }, // 6
            { minDegree: 151, maxDegree: 210, value: rewards[3] }, // 5
            { minDegree: 211, maxDegree: 270, value: rewards[4] }, // 4
            { minDegree: 271, maxDegree: 360, value: rewards[5] }, // 3

        ];

        // Size of each piece
        const data = [16, 16, 16, 16, 16, 16];
        // background color for each piece
        const pieColors = [
            "#6495ED",
            "#1E90FF",
            "#6495ED",
            "#1E90FF",
            "#6495ED",
            "#1E90FF",
        ];

        // Create chart
        const myChart = new Chart(wheel, {
            // Plugin for displaying text on pie chart
            plugins: [ChartDataLabels],
            // Chart Type Pie
            type: "pie",
            data: {
                // Labels(values which are to be displayed on chart)
                labels: [rewards[1], rewards[0], rewards[5], rewards[4], rewards[3], rewards[2]],
                // Settings for dataset/pie
                datasets: [
                    {
                        backgroundColor: pieColors,
                        data,
                    },
                ],
            },
            options: {
                // Responsive chart
                responsive: true,
                animation: { duration: 0 },
                plugins: {
                    // hide tooltip and legend
                    tooltip: false,
                    legend: {
                        display: false,
                    },
                    // display labels inside pie chart
                    datalabels: {
                        color: "#ffffff",
                        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                        font: { size: 24 },
                    },
                },
            },
        });
        const valueGenerator = (angleValue) => {
            for (const i of rotationValues) {
                // if the angleValue is between min and max then display it
                if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
                    // get itemid from itemname
                    axios.get(`${ITEM_URL  }/search/${  i.value}`)
                        .then((response) => {
                            const itemId = response.data[0].itemid;
                            const itemName = response.data[0].itemname;
                            // Display final value
                            finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
                            spinBtn.disabled = false;
                            axios.post(INVENTORY_URL, {
                                userid: userId,
                                itemid: itemId,
                                quantity: 1
                            }).then(() => {
                                // alert user that item has been rewarded
                                alert(`${itemName} has been rewarded`)
                                window.location.href = "/user/react_floor.html"
                            }).catch((error) => {
                                console.log(error);
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        }

        // Spinner count
        let count = 0;
        // 100 rotations for animation and last rotation for result
        let resultValue = 101;
        // Start spinning
        spinBtn.addEventListener("click", () => {
            spinBtn.disabled = true;
            // Empty final value
            finalValue.innerHTML = `<p>Good Luck!</p>`;
            // Generate random degrees to stop at
            const randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
            // Interval for rotation animation
            const rotationInterval = window.setInterval(() => {
                // Set rotation for piechart
                /*
                Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
                */
                myChart.options.rotation = myChart.options.rotation + resultValue;
                // Update chart with new value;
                myChart.update();
                // If rotation>360 reset it back to 0
                if (myChart.options.rotation >= 360) {
                    count += 1;
                    resultValue -= 5;
                    myChart.options.rotation = 0;
                } else if (count > 15 && myChart.options.rotation == randomDegree) {
                    valueGenerator(randomDegree);
                    clearInterval(rotationInterval);
                    count = 0;
                    resultValue = 101;
                }
            }, 10);
        });
    }).catch((error) => {
        console.log(error);
    });

