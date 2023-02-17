// Declare Global Variables to be used
const graphData = []
const graphXAxis = []

// Get all users' data
axios({
    method: 'get',
    url: `${API_URL  }/users/`
})
    .then((response) => {
        response.data.map((value) => {
            if (value.role == "Player") {
                graphData.push({"floorid": value.floorid, "userstatus": value.userstatus, "lastloggedin": value.lastloggedin})
            }
        })
    })
    axios({
        method: 'get',
        url: `${API_URL  }/floors/allFloors`
    })
    .then((response) => {
        response.data.map((value) => {
            graphXAxis.push({"floorid": value.floorid})
        })
    })
    .then(() => {
        const data = []

        const groups = graphXAxis.map(d => d.floorid)

        // Declare arrays to store users details
        const floorArr = [...new Set(graphXAxis.map(d =>  (d.floorid)))]

        // Labels for the stacked data 
        const subgroups = ["online", "away", "offline"]

        // Loop through each floor by id
        floorArr.map((floorValue, floorIndex) => {
            // Declare variables to count users status
            let awayCount = 0; let offlineCount = 0; let onlineCount = 0
        
            graphData.map((value, index) => {
                if (floorValue == value.floorid) {
                    // Get Current Time
                    const currentTime = (new Date()).toISOString().split('.')[0]

                    // Convert ISO Date into milliseconds
                    const start = new Date(currentTime).getTime();
                    const end = new Date(value.lastloggedin).getTime();

                    // Get difference between current time and last logged in time
                    const milliseconds = Math.abs(end - start).toString()
                    const playerSeconds = parseInt(milliseconds / 1000);

                    // Check if user status is away, offline or online with timestamp
                    if (value.userstatus  == "offline" && playerSeconds < 86400) {
                        awayCount++
                    } else if (value.userstatus  == "offline" && playerSeconds > 86400){
                        offlineCount++ 
                    } else {
                        onlineCount++
                    }
                }
                if (index == graphData.length - 1) {
                    const floor = floorIndex + 1
                    const obj = {
                        "floor" : JSON.stringify(floor),
                        "online" : JSON.stringify(onlineCount),
                        "offline" : JSON.stringify(offlineCount),
                        "away" : JSON.stringify(awayCount)
                    }
                    data.push(obj)
                } 
            })
        })

        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 30, bottom: 20, left: 50};
        const width = 350; 
        const height = 350

        // append the barSvg object to the body of the page
        const barSvg = d3.select("#barGraph")
            .append("svg")
            .attr("width", width + margin.left + margin.right + 370)
            .attr("height", height + margin.top + margin.bottom + 150)
            .attr("margin", "auto")
            .append("g")
            .attr("transform", `translate(95 , 80)`)

        // X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width + 200])
            .padding([0.25])
            barSvg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .style("font-size", "17px")
            .attr("stroke-width", '1.5px')

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, graphData.length])
            .range([ height, 0]);
            barSvg.append("g")
            .call(d3.axisLeft(y))
            .style("font-size", "17px")
            .attr("stroke-width", '1.5px')

        // X axis label
        barSvg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width + 200)
            .attr("y", height + margin.top + 50)
            .style("font-weight", "bold")
            .style("font-size", "18px")
            .text("Floor Number");

        // Y axis label
        barSvg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 5)
            .attr("x", -margin.top + 15)
            .style("font-weight", "bold")
            .style("font-size", "18px")
            .text("Number of Players")

        // Color palette = one color per subgroup
        const colour = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#5cc76a','#ffb22e','#ef3f5c'])

        // Stack the data --> stacks per subgroup 
        const stackedData = d3.stack()
        .keys(subgroups)
        (data)

        /// ////////////////////////////////////////////// 
        // Create a tooltip
        /// ////////////////////////////////////////////// 
        const tooltip = d3.select("#barGraph")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "15px")
            .style("width", "220px")
            .style("text-align", "left")
            .style("position", "absolute")

        // Three function that change the tooltip when user hover / move / leave a cell
        const barMouseOver = function(event, d) {
            const subgroupName = d3.select(this.parentNode).datum().key;
            const subgroupValue = d.data[subgroupName];
            tooltip 
                .html( `Player Status: ${  subgroupName  }<br>` 
                    + `Number of Players in Floor ${  d.data.floor  }: ${  subgroupValue}`)
                .style("opacity", 1)

            // Style the tooltip according to the value of the graph,
            subgroupName == "online" ? 
                tooltip.style("color", "#5cc76a") : 
            subgroupName == "away" ?
                tooltip.style("color", "#ffb22e") : 
                tooltip.style("color", "#ef3f5c")  

            // Reduce opacity of all rect to 0.2
            d3.selectAll(".myRect").style("opacity", 0.3)

            // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
            d3.selectAll(`.${subgroupName}`).style("opacity",1)
        }

        const barMouseMove = function(event, d) {
            tooltip
                .style("top",`${event.pageY - 10 }px`)
                .style("left", `${event.pageX + 10}px`)
        }

        const barMouseLeave = function(event, d) {
            tooltip
                .style("opacity", 0)
            d3.selectAll(".myRect").style("opacity",1)
        }
        
        // Show the bars
        barSvg.append("g")
        .selectAll("g")
        // Loop key per key = group per group
        .data(stackedData)
        .join("g")
            .attr("fill", d => colour(d.key))
            .attr("class", d => `myRect ${  d.key}`)
            .selectAll("rect")
            // Loop subgroup per subgroup to add all rectangles
            .data(d => d)
            .join("rect")
                .attr("x", d => x(d.data.floor))
                .attr("height", function(d) { return height - y(0); }) // always equal to 0
                .attr("y", function(d) { return y(0); })
                .attr("width",x.bandwidth())
            .on("mouseover", barMouseOver)
            .on("mousemove", barMouseMove)
            .on("mouseleave", barMouseLeave)

        // Adding title to the graph
        barSvg.append("text")
            .attr("x", (width / 1.3))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "18px") 
            .style("text-decoration", "underline")  
            .text("Floor vs Number of Players Bar Graph [Hoverable]");

        // Legend for the bar graph
        const yArr = [30, 70, 110];
        const colourArr = [ "#5cc76a", "#ffb22e", "#ef3f5c"];
        subgroups.map((value, index) => {
            const capitaliseValue = value.charAt(0).toUpperCase() + value.slice(1)

            barSvg.append("circle")
                .attr("cx", 580)
                .attr("cy", yArr[index])
                .attr("r", 10)
                .style("fill", colourArr[index])
                .style("padding", "13px")
                
            barSvg.append("text")
                .attr("x", 600)
                .attr("y", yArr[index])
                .text(capitaliseValue)
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .attr("alignment-baseline","middle")
        })

        // Adding animation for bar graph
        barSvg.selectAll("rect")
            .transition()
            .duration(1400)
            .attr("y", d => y(d[1]) - 1)
            .attr("height", d => y(d[0]) - y(d[1]))
            .delay((d,i) => i*120)

        const donutMargin = 40; const donutWidth = 350; const donutHeight = 350

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        const radius = Math.min(donutWidth, donutHeight) / 2 - donutMargin

        // append the svg object to the body of the page - Donut Chart for floors
        const donutSvg = d3.select("#donutGraph")
        .append("svg")
            .attr("width", donutWidth + 150)
            .attr("height", donutHeight - 65)
        .append("g")
            .attr("transform", `translate(${donutWidth / 2 + 75},${donutHeight / 2  - 25})`);

        // Transforming data
        const donutChartArr = []
        const donutChartTitleArr = []

        data.forEach((value, index) => {
            donutChartArr.push(parseInt(value.online) + parseInt(value.offline) + parseInt(value.away))
            donutChartTitleArr.push(`Floor ${  value.floor}`)
        })

        const donutColourArr = ["#F66D44", "#FEAE65", "#AADEA7", "#64C2A6", "#2D87BB", "#E6F69D"]

        // Set the color scale
        const colour2 = d3.scaleOrdinal()
        .range(donutColourArr)

        // Compute the position of each group on the pie:
        const pie = d3.pie()
        .value(d=>d[1])

        // The arc generator for the donut
        const arc = d3.arc()
            .innerRadius(radius * 0.6) // Size of the donut hole
            .outerRadius(radius * 0.85)

        // Another arc that won't be drawn. Just for labels positioning
        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

        const data_ready = pie(Object.entries(donutChartArr))

        // Three function that change the tooltip when user hover / move / leave a cell
        const donutMouseOver = function(event, d) {
            const playerAmount = d.value
            
            // Create variable to store colour based on donut graph
            let colour 
            colour = donutColourArr[parseInt(d.data[0])]

            // Declare variable to store index of selected number in the data array
            
            const sum = [...donutChartArr].reduce((sum , a) => sum + a, 0)
            const percentage = Math.round(playerAmount / sum * 100) / 1

            tooltip 
                .html(`Number of Players: ${  playerAmount  }<br>` 
                + `Percentage of Players: ${  percentage  }%`)
                .style("opacity", 1)
                .style("color", colour) 
        }

        const donutMouseMove = function(event, d) {
            tooltip
                .style("top",`${event.pageY - 10 }px`)
                .style("left", `${event.pageX + 10}px`)
        }

        const donutMouseLeave = function(event, d) {
            tooltip
                .style("opacity", 0)
        }
        
        // Building the donut chart with the arc function.
        donutSvg
            .selectAll('allSlices')
            .data(data_ready)
            .join('path')
            .attr('d', arc)
            .attr('fill', d => colour2(d.data[0]))
            .style("opacity", 1)
            .on("mouseover", donutMouseOver)
            .on("mousemove", donutMouseMove)
            .on("mouseleave", donutMouseLeave)

        // Adding animation for donut graph
        donutSvg.selectAll("path")
            .transition()
            .duration(1400)
            .attrTween("d", function (d) {
                if (d) {
                    const i = d3.interpolate(d.startAngle, d.endAngle);
                    return function (t) {
                    d.endAngle = i(t);
                    return arc(d);
                    };
                }
            });

        // Declare variable to store index of highest number in the data array
        const highestFloorIndex = donutChartArr.indexOf(Math.max(...donutChartArr))

        const floorName = donutChartTitleArr[highestFloorIndex]

        // Append text in the middle to show insights of chart 
        donutSvg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-1.1em")
            .text(floorName)
            .style("font-size", "18px")
            .style("font-weight", "bold");

        donutSvg.append("text")
            .attr("text-anchor", "middle")
            .text("has the highest");

        donutSvg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.1em")
            .text("amount of players");

        const sum = [...donutChartArr].reduce((sum , a) => sum + a, 0)
        const highestPercentage = Math.round(Math.max(...donutChartArr) / sum * 100) / 1

        donutSvg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "2.2em")
            .text(`at ${ highestPercentage  }%`)
            .style("font-size", "18px")
            .style("font-weight", "bold")

        // Adding polylines between chart and label
        donutSvg
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
                .attr("stroke", "black")
                .style("fill", "none")
                .attr("stroke-width", 0.7)
                .attr('points', function(d) {
                    // Check if there are any values in the respective floors 
                    if (d.data[1] != 0 ){
                        const posA = arc.centroid(d) // Insertion of line in the slice
                        const posB = outerArc.centroid(d) // Line break: we use the other arc generator that has been built only for that
                        const posC = outerArc.centroid(d); // Label position = almost the same as posB
                        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // Multiply by 1 or -1 to put it on the right or on the left
                        return [posA, posB, posC]
                    }
                })

        // Add the polylines between chart and labels:
        donutSvg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
            .style("font-weight", "bold")
            .style("font-size", "14px")
            .text( function(d) { 
                if (d.data[1] != 0 ){
                    return `Floor ${  parseInt(d.data[0]) + 1}`
                }
            } )
            .attr('transform', function(d) {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${  pos  })`;
            })
            .style('text-anchor', function(d) {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })

         // append the svg object to the body of the page - Donut Chart for floors
        const donutSvg2 = d3.select("#donutGraph2")
            .append("svg")
                .attr("width", donutWidth + 150)
                .attr("height", donutHeight - 65)
            .append("g")
                .attr("transform", `translate(${donutWidth / 2 + 75},${donutHeight / 2  - 25})`);

        let awayCount = 0 ; let offlineCount = 0; let onlineCount = 0
        // Create new Array to store data - Transformation
        graphData.map((value, index) => {
            const currentTime = (new Date()).toISOString().split('.')[0]

            // Convert ISO Date into milliseconds
            const start = new Date(currentTime).getTime();
            const end = new Date(value.lastloggedin).getTime();

            // Get difference between current time and last logged in time
            const milliseconds = Math.abs(end - start).toString()
            const playerSeconds = parseInt(milliseconds / 1000);

            // Check if user status is away, offline or online with timestamp
            if (value.userstatus  == "offline" && playerSeconds < 86400) {
                awayCount++
            } else if (value.userstatus  == "offline" && playerSeconds > 86400){
                offlineCount++ 
            } else {
                onlineCount++
            }
        })

        const donutChartArr2 = []
        donutChartArr2.push(`online: ${ onlineCount}`, `away: ${ awayCount}`, `offine: ${ offlineCount}`)

        // Compute the position of each group on the pie:
        const pies = d3.pie()
        .value(d=>d[1])

        const jsonObj = {
            Online: onlineCount,
            Away: awayCount,
            Offline: offlineCount
        }

        const data_ready2 = pies(Object.entries(jsonObj))

        const newColourArr = []

        // Check the status to match the correct colour code to be printed on the graph
        donutChartArr2.map((value, index) => {
            const status = value.split(':')[0]

            status == "online" ? 
                newColourArr.push("#5cc76a") : 
            status == "away" ?
                newColourArr.push("#ffb22e") : 
                newColourArr.push("#ef3f5c")  
        })

        // Make new colour array
        const colour3 = d3.scaleOrdinal()
            .range(newColourArr)

        // Make new function to cater to new donut chart 
        const donutMouseOver2 = function(event, d) {
            const playerAmount = d.value
            
            // Create variable to store colour based on donut graph

            // Declare variable to store index of selected number in the data array

            const sum = [...donutChartArr].reduce((sum , a) => sum + a, 0)
            const percentage = Math.round(playerAmount / sum * 100) / 1

            let selectedColour

            tooltip 
                .html(`Number of Players: ${  playerAmount  }<br>` 
                + `Percentage of Players: ${  percentage  }%`)
                .style("opacity", 1)
                .style("color", function(s) { 
                    d.data[0] == 'Online' ?
                        selectedColour = '#5cc76a' :
                    d.data[0] == 'Away' ?
                        selectedColour = '#ffb22e' :
                        selectedColour = '#ef3f5c' 
                    return selectedColour})
        }

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        donutSvg2
            .selectAll('allSlices')
            .data(data_ready2)
            .join('path')
            .attr('d', d3.arc()
                .innerRadius(radius * 0.6)       // This is the size of the donut hole
                .outerRadius(radius * 0.85)
            )
            .attr('fill', d => colour3(d.data[0]))
            .on("mouseover", donutMouseOver2)
            .on("mousemove", donutMouseMove)
            .on("mouseleave", donutMouseLeave)
            
        // Adding animation for donut graph
        donutSvg2.selectAll("path")
        .transition()
        .duration(1400)
        .attrTween("d", function (d) {
            if (d) {
                const i = d3.interpolate(d.startAngle, d.endAngle);
                return function (t) {
                d.endAngle = i(t);
                return arc(d);
                };
            }
        });

        const valueArr = []

        // Re-transform Array
        donutChartArr2.map((value, index) => {
            const chartValue = value.split(':')[1]

            valueArr.push(parseInt(chartValue))
        })

        // Declare variable to store index of highest number in the data array
        const highestFloorIndex2 = valueArr.indexOf(Math.max(...valueArr))
        const status = (donutChartArr2[highestFloorIndex2]).split(":")[0]
        const capitaliseStatus = status.charAt(0).toUpperCase() + status.slice(1)


        const sum2 = [...valueArr].reduce((sum , a) => sum + a, 0)
        const highestPercentage2 = Math.round(Math.max(...valueArr) / sum2 * 100) / 1

        // Append text in the middle to show insights of chart 
        donutSvg2.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.5em")
            .text(`About ${  highestPercentage2  }%`)
            .style("font-size", "18px")
            .style("font-weight", "bold");

        donutSvg2.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.75em")
            .text("of players are");

        donutSvg2.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.9em")
            .text(capitaliseStatus)
            .style("font-size", "18px")
            .style("font-weight", "bold")
        

        // Adding polylines between chart and label
        donutSvg2
        .selectAll('allPolylines')
        .data(data_ready2)
        .enter()
        .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 0.7)
            .attr('points', function(d) {
                // Check if there are any values in the respective floors 
                if (d.data[1] != 0 ){
                    const posA = arc.centroid(d) // Insertion of line in the slice
                    const posB = outerArc.centroid(d) // Line break: we use the other arc generator that has been built only for that
                    const posC = outerArc.centroid(d); // Label position = almost the same as posB
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // Multiply by 1 or -1 to put it on the right or on the left
                    return [posA, posB, posC]
                }
            })

        // Add the polylines between chart and labels:
        donutSvg2
            .selectAll('allLabels')
            .data(data_ready2)
            .enter()
            .append('text')
            .style("font-weight", "bold")
            .style("font-size", "14px")
            .text(function (d) {
                // Check if there are any values in the respective status
                if (d.data[1] != 0 ){
                    return d.data[0] 
                }
            }
            )
            .attr('transform', function(d) {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${  pos  })`;
            })
            .style('text-anchor', function(d) {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
    
        })
.catch((error) => {
    console.log(error)
})
