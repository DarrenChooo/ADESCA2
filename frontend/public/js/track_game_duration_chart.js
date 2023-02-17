/// //////////////////////////////////////////////////////////////////
// Linking to gameDuration url
/// //////////////////////////////////////////////////////////////////
GAMEDURATION_URL = `${API_URL  }/gameDuration`;

const today = new Date();
const time = today.getHours().toString() + today.getMinutes().toString();

console.log(time);

axios.get(GAMEDURATION_URL, {})

    // Handle success response
    .then((response) => {
        // console.log(response.data[0].duration);

        // the following section declares the array different 7 duration ranges according game 1
        const game1Range1 = [];
        const game1Range2 = [];
        const game1Range3 = [];
        const game1Range4 = [];
        const game1Range5 = [];

        // the following section declares the array different 7 duration ranges according game 2
        const game2Range1 = [];
        const game2Range2 = [];
        const game2Range3 = [];
        const game2Range4 = [];
        const game2Range5 = [];

        // the following section declares the array different 7 duration ranges according game 3
        const game3Range1 = [];
        const game3Range2 = [];
        const game3Range3 = [];
        const game3Range4 = [];
        const game3Range5 = [];

        // the following section declares the array different 7 duration ranges according game 4
        const game4Range1 = [];
        const game4Range2 = [];
        const game4Range3 = [];
        const game4Range4 = [];
        const game4Range5 = [];

        // the following section declares the array different 7 duration ranges according game 5
        const game5Range1 = [];
        const game5Range2 = [];
        const game5Range3 = [];
        const game5Range4 = [];
        const game5Range5 = [];

        // the following section declares the array for the total stats data for each of the 5 games
        const game1Stats = [];
        const game2Stats = [];
        const game3Stats = [];
        const game4Stats = [];
        const game5Stats = [];

        response.data.map((data) => {
            // For game 1
            if (data.gameid === 1 && data.duration >= 0 && data.duration <= 1) {
                game1Range1.push(data.userid);
            }
            if (data.gameid === 1 && data.duration >= 2 && data.duration <= 5) {
                game1Range2.push(data.userid);
            }
            if (data.gameid === 1 && data.duration >= 6 && data.duration <= 10) {
                game1Range3.push(data.userid);
            }
            if (data.gameid === 1 && data.duration >= 11 && data.duration <= 15) {
                game1Range4.push(data.userid);
            }
            if (data.gameid === 1 && data.duration > 15) {
                game1Range5.push(data.userid);
            }

            // For game 2 
            if (data.gameid === 2 && data.duration >= 0 && data.duration <= 1) {
                game2Range1.push(data.userid);
            }
            if (data.gameid === 2 && data.duration >= 2 && data.duration <= 5) {
                game2Range2.push(data.userid);
            }
            if (data.gameid === 2 && data.duration >= 6 && data.duration <= 10) {
                game2Range3.push(data.userid);
            }
            if (data.gameid === 2 && data.duration >= 11 && data.duration <= 15) {
                game2Range4.push(data.userid);
            }
            if (data.gameid === 2 && data.duration > 15) {
                game2Range5.push(data.userid);
            }

            // For game 3
            if (data.gameid === 3 && data.duration >= 0 && data.duration <= 1) {
                game3Range1.push(data.userid);
            }
            if (data.gameid === 3 && data.duration >= 2 && data.duration <= 5) {
                game3Range2.push(data.userid);
            }
            if (data.gameid === 3 && data.duration >= 6 && data.duration <= 10) {
                game3Range3.push(data.userid);
            }
            if (data.gameid === 3 && data.duration >= 11 && data.duration <= 15) {
                game3Range4.push(data.userid);
            }
            if (data.gameid === 3 && data.duration > 15) {
                game3Range5.push(data.userid);
            }

            // For game 4
            if (data.gameid === 4 && data.duration >= 0 && data.duration <= 1) {
                game4Range1.push(data.userid);
            }
            if (data.gameid === 4 && data.duration >= 2 && data.duration <= 5) {
                game4Range2.push(data.userid);
            }
            if (data.gameid === 4 && data.duration >= 6 && data.duration <= 10) {
                game4Range3.push(data.userid);
            }
            if (data.gameid === 4 && data.duration >= 11 && data.duration <= 15) {
                game4Range4.push(data.userid);
            }
            if (data.gameid === 4 && data.duration > 15) {
                game4Range5.push(data.userid);
            }

            // For game 5
            if (data.gameid === 5 && data.duration >= 0 && data.duration <= 1) {
                game5Range1.push(data.userid);
            }
            if (data.gameid === 5 && data.duration >= 2 && data.duration <= 5) {
                game5Range2.push(data.userid);
            }
            if (data.gameid === 5 && data.duration >= 6 && data.duration <= 10) {
                game5Range3.push(data.userid);
            }
            if (data.gameid === 5 && data.duration >= 11 && data.duration <= 15) {
                game5Range4.push(data.userid);
            }
            if (data.gameid === 5 && data.duration > 15) {
                game5Range5.push(data.userid);
            }

            // arr.push(data.userid)

        })

        // Pushing the array length of each game range into the game stats for the needed for the graph
        game1Stats.push(game1Range1.length);
        game1Stats.push(game1Range2.length);
        game1Stats.push(game1Range3.length);
        game1Stats.push(game1Range4.length);
        game1Stats.push(game1Range5.length);

        // Pushing the length of each game range into the game stats for the needed for the graph
        game2Stats.push(game2Range1.length);
        game2Stats.push(game2Range2.length);
        game2Stats.push(game2Range3.length);
        game2Stats.push(game2Range4.length);
        game2Stats.push(game2Range5.length);

        // Pushing the length of each game range into the game stats for the needed for the graph
        game3Stats.push(game3Range1.length);
        game3Stats.push(game3Range2.length);
        game3Stats.push(game3Range3.length);
        game3Stats.push(game3Range4.length);
        game3Stats.push(game3Range5.length);

        // Pushing the length of each game range into the game stats for the needed for the graph
        game4Stats.push(game4Range1.length);
        game4Stats.push(game4Range2.length);
        game4Stats.push(game4Range3.length);
        game4Stats.push(game4Range4.length);
        game4Stats.push(game4Range5.length);

        // Pushing the length of each game range into the game stats for the needed for the graph
        game5Stats.push(game5Range1.length);
        game5Stats.push(game5Range2.length);
        game5Stats.push(game5Range3.length);
        game5Stats.push(game5Range4.length);
        game5Stats.push(game5Range5.length);

        // Pushing the length of each game range into the game stats for the needed for the graph
        console.log(game1Stats);
        console.log(game2Stats);
        console.log(game3Stats);
        console.log(game4Stats);
        console.log(game5Stats);

        const data = [
            {
                game: 'Game 1',
                stats: game1Stats
            },
            {
                game: 'Game 2',
                stats: game2Stats
            },
            {
                game: 'Game 3',
                stats: game3Stats
            },
            {
                game: 'Game 4',
                stats: game4Stats
            },
            {
                game: 'Game 5',
                stats: game5Stats
            }
        ];

        const ids = ['range1', 'range2', 'range3', 'range4', 'range5'];
        const durationRange = ['Less than 1 minute', '2 to 5 minutes', '6 to 10 minutes', '11 to 15 minutes', 'More than 15 minutes'];

        // populating the categoeries checkboxes
        d3.select('.categories').selectAll('.checkbox')
            .data(ids)
            .enter()
            .append('div')
            .attr('class', 'checkbox')
            .append('label').html((id, index) => {
                const checkbox = `<input id="${  id  }" type="checkbox" class="category" checked="true">`;
                return `${checkbox + durationRange[index]  }&nbsp&nbsp&nbsp&nbsp`;

            });

        // declaring variables used for the size and margin of the graph
        const margin = { top: 20, right: 50, bottom: 30, left: 100 };
            const width = 700 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

        // the scale for the game range value
        const x = d3.scale.linear().range([0, width]);

        // the scale for each game
        const y0 = d3.scale.ordinal().rangeBands([0, height], .1);

        // the scale for each game range
        const y1 = d3.scale.ordinal();

        // declaring the colour scheme for each bar
        const color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#fa9287"]);

        //
        const xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.format("d"));

        const yAxis = d3.svg.axis()
            .scale(y0)
            .orient("left");

        const svg = d3.select(".graph").append("svg")
            .attr("width", width + margin.left + margin.right + 400)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${  margin.left  },${  margin.top  })`);

        d3.select('.categories').selectAll('.category').on('change', () => {
            const x = d3.select('.categories').selectAll('.category:checked');
            const ids = x[0].map((category) => category.id);

            updateGraph(ids);
        });
        const updateGraph = (selectedIds) => {

            const gamesData = data.map((gameData) => ({

                    game: gameData.game,
                    ranges: selectedIds.map((selectedId) => {
                        const index = ids.findIndex((id) => selectedId === id);

                        return {
                            id: ids[index],
                            name: durationRange[index],
                            value: gameData.stats[index]
                        };
                    })
                }));


            // x domain is between 0 and the maximun value in any ranges.value
            x.domain([0, d3.max(gamesData, (d) => d3.max(d.ranges, (d) => d.value))]);

            // y0 domain is all the game names
            y0.domain(gamesData.map((d) => d.game));

            // y1 domain is all the range names, we limit the range to from 0 to a y0 band
            y1.domain(ids).rangeRoundBands([0, y0.rangeBand()]);

            svg.selectAll('.axis.x').call(xAxis);
            svg.selectAll('.axis.y').call(yAxis);

            const game = svg.selectAll(".game")
                .data(gamesData);

            game.enter().append("g")
                .attr("class", "game")
                .attr("transform", (d) => `translate(0, ${  y0(d.game)  })`)
                .on("click", (d) => {
                    console.log(d.game)
                    if (d.game === "Game 1") {
                        console.log(d.game)
                        localStorage.setItem("gameGraph", "Game 1");
                        window.location.href = "/admin/indiv_game_duration_chart.html?gameChartId=1"
                    }
                    else if (d.game === "Game 2") {
                        console.log(d.game)
                        localStorage.setItem("gameGraph", "Game 2");
                        window.location.href = "/admin/indiv_game_duration_chart.html?gameChartId=2"
                    }
                    else if (d.game === "Game 3") {
                        console.log(d.game)
                        localStorage.setItem("gameGraph", "Game 3");
                        window.location.href = "/admin/indiv_game_duration_chart.html?gameChartId=3"
                    }
                    else if (d.game === "Game 4") {
                        console.log(d.game)
                        localStorage.setItem("gameGraph", "Game 4");
                        window.location.href = "/admin/indiv_game_duration_chart.html?gameChartId=4"
                    }
                    else if (d.game === "Game 5") {
                        console.log(d.game)
                        localStorage.setItem("gameGraph", "Game 5");
                        window.location.href = "/admin/indiv_game_duration_chart.html?gameChartId=5"
                    }

                });

            const range = game.selectAll("rect")
                .data((d) => d.ranges);

            // append a new rect every time we have an extra data vs dom element
            range.enter().append("rect")
                .attr('width', 0);

            // this updates will happend neither inserting new elements or updating them
            range
                .attr("x", 0)
                .attr("y", (d, index) => y1(ids[index]))
                .attr("id", (d) => d.id)
                .style("fill", (d) => color(d.name))
                .text((d) => d.name)
                .transition()
                .attr("width", (d) => x(d.value))
                .attr("height", y1.rangeBand());

            range.exit().transition().attr("width", 0).remove();

            const legend = svg.selectAll(".legend")
                .data(gamesData[0].ranges.map((range) => range.name));

            legend.enter().append("g");
            legend
                .attr("class", "legend")
                .attr("transform", (d, i) => `translate(0,${  200 + i * 20  })`);

            const legendColor = legend.selectAll('.legend-color').data((d) => [d]);

            legendColor.enter().append("rect");
            legendColor
                .attr('class', 'legend-color')
                .attr("x", width + 240)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            const legendText = legend.selectAll('.legend-text').data((d) => [d]);;

            legendText.enter().append("text");
            legendText
                .attr('class', 'legend-text')
                .attr("x", width + 230)
                .attr("y", 15)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text((d) => d);

            legend.exit().remove();
        }
        renderGraph();

        function renderGraph() {

            x.domain([0, 0]);

            // y0 domain is all the game names
            y0.domain(data.map((d) => d.game));

            // y1 domain is all the range names, we limit the range to from 0 to a y0 band
            y1.domain(durationRange).rangeRoundBands([0, y0.rangeBand()]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0,${  height  })`)
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            const w = d3.select('.categories').selectAll('.category:checked');
            const ids = w[0].map((category) => category.id);
            updateGraph(ids);
        }


    })

    // error repsonse
    .catch((error) => {
        alert(error);
        console.log(error);
    })
