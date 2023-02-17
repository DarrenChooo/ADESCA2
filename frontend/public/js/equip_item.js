ITEMS_API_URL = `${API_URL  }/items/`;
USER_API_URL = `${API_URL  }/users/`
IMAGE_URL += '/images/';

const userid = localStorage.getItem('userid');
const itemid = window.location.search.split('=')[1]

const radarChart = document.getElementById("radar-chart")

window.onload = () => {
    const data = [];
    const stats = ["Damage", "Speed", "Cost", "Critrate", "Durability"];
    const currentItemStats = {};
    const incomingItemStats = {};

    // Exctracting of data using SQL
    axios.get(`${USER_API_URL  }join/${  userid}`, {})
        .then((user) => {
            axios.get(ITEMS_API_URL + user.data.equippeditem)
                .then((currentItem) => {

                    // Transforming stat data of currently equipped item by cleaning and grouping it
                    stats.map((stat) => {
                        if (stat == "Cost") {
                            if (currentItem.data[stat.toLowerCase()] <= 100) {
                                currentItemStats[stat] = 3
                            } else if (currentItem.data[stat.toLowerCase()] <= 1000) {
                                currentItemStats[stat] = 6
                            } else if (currentItem.data[stat.toLowerCase()] <= 3000) {
                                currentItemStats[stat] = 9
                            } else {
                                currentItemStats[stat] = 10
                            }
                        } else {
                            currentItemStats[stat] = currentItem.data[stat.toLowerCase()] / 10
                        }
                    });
                    data.push(currentItemStats)
                })
                .catch((error) => {
                    console.log(error)
                    alert(error)
                })
        })
        .then(() => {
            axios.get(ITEMS_API_URL + itemid)
                .then((incomingItem) => {

                    // Transforming stat data of currently equipped item by cleaning and grouping it
                    stats.map((stat) => {
                        if (stat == "Cost") {
                            if (incomingItem.data[stat.toLowerCase()] <= 100) {
                                incomingItemStats[stat] = 3
                            } else if (incomingItem.data[stat.toLowerCase()] <= 1000) {
                                incomingItemStats[stat] = 6
                            } else if (incomingItem.data[stat.toLowerCase()] <= 3000) {
                                incomingItemStats[stat] = 9
                            } else {
                                incomingItemStats[stat] = 10
                            }
                        } else {
                            incomingItemStats[stat] = incomingItem.data[stat.toLowerCase()] / 10
                        }
                    });
                    data.push(incomingItemStats)
                    console.log(data)
            const svg = d3
                .select(radarChart)
                .append("svg")
                .attr("width", 620)
                .attr("height", 620);

            const radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
            const ticks = [2, 4, 6, 8, 10];

            ticks.forEach((t) =>
                svg
                    .append("circle")
                    .attr("cx", 300)
                    .attr("cy", 300)
                    .attr("fill", "none")
                    .attr("stroke", "#FFFFF0")
                    .attr("r", radialScale(t))
            );


            ticks.forEach((t) =>
                svg
                    .append("text")
                    .attr("x", 305)
                    .attr("y", 295 - radialScale(t))
                    .style('fill', '#FFFFF0')
                    .text(t.toString())
            );

            function angleToCoordinate(angle, value) {
                const x = Math.cos(angle) * radialScale(value);
                const y = Math.sin(angle) * radialScale(value);
                return { x: 300 + x, y: 300 - y };
            }

            stats.map((stat, i) => {
                const ft_name = stat;
                const angle = Math.PI / 2 + (2 * Math.PI * i) / stats.length;
                const line_coordinate = angleToCoordinate(angle, 10);
                const label_coordinate = angleToCoordinate(angle, 11.2);

                // draw axis line
                svg
                    .append("line")
                    .attr("x1", 300)
                    .attr("y1", 300)
                    .attr("x2", line_coordinate.x)
                    .attr("y2", line_coordinate.y)
                    .attr("stroke", "#FFFFF0");

                // draw axis label
                svg
                    .append("text")
                    .attr("x", label_coordinate.x - 19)
                    .attr("y", label_coordinate.y + 6)
                    .style('fill', '#FFFFF0')
                    .text(ft_name);
            });

            const line = d3
                .line()
                .x((d) => d.x)
                .y((d) => d.y);
            const colors = ["#1560DB","#22A39F"];

            function getPathCoordinates(data_point) {
                const coordinates = [];
                for (let i = 0; i < stats.length; i++) {
                    const ft_name = stats[i];
                    const angle = Math.PI / 2 + (2 * Math.PI * i) / stats.length;
                    coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
                }
                const angle = Math.PI / 2 + (2 * Math.PI * 0) / stats.length;
                coordinates.push(angleToCoordinate(angle, data_point[stats[0]]));
                return coordinates;
            }

            for (let i = 0; i < data.length; i++) {
                console.log(data)
                const d = data[i];
                const color = colors[i];
                const coordinates = getPathCoordinates(d);

                // draw the path element
                svg
                    .append("path")
                    .datum(coordinates)
                    .attr("d", line)
                    .attr("stroke-width", 3)
                    .attr("stroke", color)
                    .attr("fill", color)
                    .attr("stroke-opacity", 0.7)
                    .attr("fill-opacity", 0.3);
            }    
                })
                .catch((error) => {
                    console.log(error)
                    alert(error)
                })
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });

}
