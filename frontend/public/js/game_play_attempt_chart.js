/// //////////////////////////////////////////////////////////////////
// Linking to gameDuration url
/// //////////////////////////////////////////////////////////////////
GAMEDURATION_URL = `${API_URL  }/gameDuration`;

// declaring 5 different arrays to store the number of attempts for each game
const game1Attempts = [];
const game2Attempts = [];
const game3Attempts = [];
const game4Attempts = [];
const game5Attempts = [];

// declaring 6th array to push in the highest attempt for each game
const allGamesAttempts = [];
let largestNumber = 0;

// axios GET request to retrive all data for the game duration table
axios.get(GAMEDURATION_URL, {})

    // Handle success response
    .then((response) => {

        response.data.map((data) => {
            // filtering data accrding to gameid, then push the attempt number into the 5 different game arrays
            if (data.gameid === 1) {
                game1Attempts.push(data.attempt);
            }
            if (data.gameid === 2) {
                game2Attempts.push(data.attempt);
            }
            if (data.gameid === 3) {
                game3Attempts.push(data.attempt);
            }
            if (data.gameid === 4) {
                game4Attempts.push(data.attempt);
            }
            if (data.gameid === 5) {
                game5Attempts.push(data.attempt);
            }

        })

        // for each game array, using for loop to get the highest attempt number then push it into the highest attempt array
        for (i = 0; i < game1Attempts.length; i++) {
            if (game1Attempts[i] > largestNumber) {
                largestNumber = game1Attempts[i];
            }
        }
        allGamesAttempts.push(largestNumber);
        largestNumber = 0;

        for (i = 0; i < game2Attempts.length; i++) {
            if (game2Attempts[i] > largestNumber) {
                largestNumber = game2Attempts[i];
            }
        }
        allGamesAttempts.push(largestNumber);
        largestNumber = 0;

        for (i = 0; i < game3Attempts.length; i++) {
            if (game3Attempts[i] > largestNumber) {
                largestNumber = game3Attempts[i];
            }
        }
        allGamesAttempts.push(largestNumber);
        largestNumber = 0;

        for (i = 0; i < game4Attempts.length; i++) {
            if (game4Attempts[i] > largestNumber) {
                largestNumber = game4Attempts[i];
            }
        }
        allGamesAttempts.push(largestNumber);
        largestNumber = 0;

        for (i = 0; i < game5Attempts.length; i++) {
            if (game5Attempts[i] > largestNumber) {
                largestNumber = game5Attempts[i];
            }
        }
        allGamesAttempts.push(largestNumber);
        largestNumber = 0;

        for (i = 0; i < allGamesAttempts.length; i++) {
            if (allGamesAttempts[i] > largestNumber) {
                largestNumber = allGamesAttempts[i];
            }
        }

        const index = allGamesAttempts.indexOf(largestNumber);

        console.log(allGamesAttempts);

        const width = 420;
            const height = 420;
            const radius = Math.min(width, height) / 2;

        const summary = document.getElementById("summary");

        d3.select(summary)
            .append("span")
            .append("p")
            // .attr("class", "label")
            .attr("text-anchor", "middle")
            .text(`Game ${index + 1} Has The Highest Attempt Count of ${largestNumber}`)
            .style("font-weight", "bold")
            .style("color", "black")
            .style("font-size", "30px")
            .style("margin", "auto");

        // let color = d3.scaleOrdinal(d3.schemeCategory10);
        const color = d3.scaleOrdinal()
            .range([
                "#b892fc",
                "#e2affd",
                "#c59cfc",
                "#d2a5fd",
                "#efbafb",
                "#f5c6fa",
                "#f9d4f9",
            ]);

        const pie = d3.pie()
            .value((d) => d);

        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${  width / 2  },${  height / 2  })`);

        const g = svg.selectAll(".arc")
            .data(pie(allGamesAttempts))
            .enter().append("g")
            .attr("class", "arc");

        // create tooltip element
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("padding", "15px")
            .style("background", "rgba(0,0,0,0.6)")
            .style("border-radius", "5px")
            .style("color", "#fff")
            .text("a simple tooltip");

        g.append("path")
            .attr("d", arc)
            .style("fill", (d, i) => color(i))
            .on("mouseover", function (d, i) {
                tooltip.html(`${i.data} Attempts`).style("visibility", "visible");
                d3.select(this).attr("filter", "brightness(60%)")

                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", width / 2)
                    .attr("y", height / 2 - 100)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .style("fill", "#ffffff")
                    .text(d.value);
            })

            .on("mousemove", function () {
                tooltip
                    .style("top", `${event.pageY - 10  }px`)
                    .style("left", `${event.pageX + 10  }px`);
            })

            .on("mouseout", function () {
                tooltip.html(``).style("visibility", "hidden");
                d3.select(this).attr("filter", "brightness(100%)")
                d3.select("#tooltip").remove();
            })

            .transition()
            .duration(1000)
            .attrTween("d", tweenPie);

        g.append("text")
            .transition()
            .duration(1000)
            .attr("transform", (d) => `translate(${  labelArc.centroid(d)  })`)
            .attr("dy", ".35em")
            .text((d, i) => d.value)
            .style("font-size", "20px");


        function tweenPie(b) {
            b.innerRadius = 0;
            const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
            return (t) => arc(i(t));
        }

    })

    // Handle error response
    .catch((error) => {
        alert(error);
        console.log(error);

    });
