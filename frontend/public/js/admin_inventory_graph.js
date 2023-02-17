const  INVENTORY_URL = API_URL+"/inventory/";
const  ITEM_URL = API_URL+"/items/";
// console.log(ITEM_URL)
// console.log(INVENTORY_URL)

const chartContainer = document.getElementById('chartContainer')
const barChart = document.getElementById('barChart')

const searchIpt = document.getElementById('searchInput')
window.onload = () => {

  axios.get(ITEM_URL)
    .then(() => {
      searchIcon.addEventListener('click', event => {
        // delete previous graph
        if (barChart.firstChild) {
          barChart.removeChild(barChart.firstChild);
        }
        if (pieChart.firstChild) {
          pieChart.removeChild(pieChart.firstChild);
        }
        // prevent page from refreshing
        event.preventDefault()
        axios.get(`${INVENTORY_URL  }search/user/${searchIpt.value}`, {})
          .then((response) => {
            if (response.data.length == 0) {
              alert("No results found");
              // previous page inner html
              return;
            }
            const userData = [];
            response.data.map((item) => {
              userData.push({ "itemname": item.itemname, "quantity": item.quantity, "cost": item.cost })
            })
            // console.log(userData)

            // set the dimensions and margins of the graph
            const margin = { top: 50, right: 30, bottom: 100, left: 60 };
              const width = 750 - margin.left - margin.right;
              const height = 500 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#barChart")
              .append("svg")
              .style("background-color", "white")
              .style("padding", "30px")
              .style("margin", "20px")
              .style("border-radius", "5px")
              .style("display", "flex")
              .style("margin-left", "auto")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
                `translate(${  margin.left  },${  margin.top  })`);

            // title of the graph
            svg.append("text")
              .attr("x", (width / 2))
              .attr("y", 0 - (margin.top / 2))
              .attr("text-anchor", "middle")
              .style("font-size", "20px")
              .style("font-weight", "bold")
              .style("text-decoration", "underline")
              .text("Inventory Graph (Hoverable)");

            // X axis 
            const x = d3.scaleBand()
              .range([0, width])
              .domain(userData.map(function (d) { return d.itemname; }))
              .padding(0.2);
            svg.append("g")
              .attr("transform", `translate(0,${  height  })`)
              .call(d3.axisBottom(x))
              .selectAll("text")
              .transition()
              .duration(1000)
              .attr("transform", "translate(-10,0)rotate(-45)")
              .attr("font-size", "12px")
              .style("font-weight", "bold")
              .style("text-anchor", "end");

            // make y axis dynamic
            const quantityData = []
            const itemNameData = []
            const costData = []

            userData.forEach((item) => {
              quantityData.push(item.quantity)
              itemNameData.push(item.itemname)
              costData.push(item.cost)
            })

            const yaxisData = Math.max(...quantityData)

            // Add Y axis
            const y = d3.scaleLinear()
              .domain([0, yaxisData])
              .range([height, 0]);
            svg.append("g")
              .call(d3.axisLeft(y))
              .attr("font-size", "12px")
              .style("font-weight", "bold")

            // text label for the y axis
            svg.append("text")
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("y", -40)
              .attr("dx", "-110px")
              .attr("transform", "rotate(-90)")
              .style("font-weight", "bold")
              .text("Quantity (Weapons)");

            // style tooltip
            const tooltip = d3.select("body")
              .append("div")
              .style("position", "absolute")
              .style("z-index", "10")
              .style("visibility", "hidden")
              .style("background", "black")
              .style("border-radius", "6px")
              .style("border", "2px")
              .style("border-style", "solid")
              .style("border-color", "white")
              .style("color", "white")
              .style("padding", "15px")
              .style("opacity", .7)
              .text("");

            // Bars
            svg.selectAll("mybar")
              .data(userData)
              .enter()
              .append("rect")
              .attr("x", function (d) { return x(d.itemname); })
              .attr("y", function (d) { return y(0); }) // start animation from y=0
              .attr("width", x.bandwidth())
              .attr("height", function (d) { return 0; }) // start animation with height=0
              .attr("fill", "#2c6acc")
              // hover effect appears when mouse hovers over bar
              .on("mouseover", function (d) {
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr("fill", "#3e2ccc")

                // tooltip appears when mouse hovers over bar
                tooltip
                  .html(`Quantity: ${  d.quantity  }<br>` +
                    `Cost: ${  d.cost}`,)
                  .style("visibility", "visible")
              })

              // tooltip follows mouse
              .on("mousemove", function () {
                return tooltip.style("top", `${d3.event.pageY - 10  }px`).style("left", `${d3.event.pageX + 10  }px`);
              })

              // hover effect disappears when mouse leaves bar
              .on("mouseout", function (d) {
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr("fill", "#2c6acc")
                tooltip.style("visibility", "hidden")
              })
              .transition() // start animation
              .duration(1000) // animation duration in milliseconds
              .attr("y", function (d) { return y(d.quantity); }) // end animation at y position calculated from quantity
              .attr("height", function (d) { return height - y(d.quantity); }) // end animation with height calculated from quantity

            // Text labels
            svg.selectAll("mylabels")
              .data(userData)
              .enter()
              .append("text")
              .attr("x", function (d) { return x(d.itemname) + x.bandwidth() / 2; })
              .attr("text-anchor", "middle")
              .attr("font-size", "14px")
              .style("font-weight", "bold")
              .text(function (d) { return d.quantity; })
              .transition()  // start animation
              .duration(1200)  // animation duration in milliseconds
              .attr("y", function (d) { return y(d.quantity) - 5; });

            // PIECHART CODE
            // make quantityData an object
            const quantityDataObj = quantityData.reduce(function (acc, cur, index) {
              acc[index] = cur;
              return acc;
            }, {});

            // make itemNameData an object
            const itemNameDataObj = itemNameData.reduce(function (acc, cur, index) {
              acc[index] = cur;
              return acc;
            }, {});

            // make costData an object
            const costDataObj = costData.reduce(function (acc, cur, index) {
              acc[index] = cur;
              return acc;
            }, {});

            // set the dimensions and margins of the graph
            const pieWidth = 500;
              const pieHeight = 500;
              const pieMargin = 100

            // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
            const radius = Math.min(pieWidth, pieHeight) / 2 - pieMargin

            // append the svg object to the div called 'my_dataviz'
            const svg2 = d3.select("#pieChart")
              .append("svg")
              .style("background-color", "white")
              .style("padding", "30px")
              .style("margin", "20px")
              .style("border-radius", "5px")
              .style("display", "flex")
              .style("margin-left", "auto")
              .attr("width", pieWidth)
              .attr("height", pieHeight)
              .append("g")
              .attr("transform", `translate(${  pieWidth / 2  },${  pieHeight / 2  })`);

            // set the color scale
            const range = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0", "#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]
            const color = d3.scaleOrdinal(range)

            // combine cost and quantity data
            const costAndQuantityData = {};
            for (var i = 0; i < Object.keys(quantityDataObj).length; i++) {
              costAndQuantityData[costDataObj[i]] = quantityDataObj[i];
            }
            
            // combine item and quantity data
            const itemAndQtyData = {};
            for (var i = 0; i < Object.keys(quantityDataObj).length; i++) {
              itemAndQtyData[itemNameDataObj[i]] = quantityDataObj[i];
            }
            
            // find highest quantity but the swordname
            const highestQuantity = Math.max(...Object.values(itemAndQtyData));
            const highestQuantityItem = Object.keys(itemAndQtyData).find(key => itemAndQtyData[key] === highestQuantity);

            // find highest percentage
            const maxCount = Math.max(...Object.values(itemAndQtyData));
            const totalCount = Object.values(itemAndQtyData).reduce((a, b) => a + b, 0);
            const highestPercent = Math.round((maxCount / totalCount) * 100);

            // Compute the position of each group on the pie:
            const pie = d3.pie()
              .sort(null) // Do not sort group by size
              .value(function (d) { return d.value; })
            const data_ready = pie(d3.entries(itemAndQtyData, costDataObj))
            const data_ready2 = pie(d3.entries(costAndQuantityData))

            // The arc generator
            const arc = d3.arc()
              .innerRadius(radius * 0.5)         // This is the size of the donut hole
              .outerRadius(radius * 0.8)

            // Another arc that won't be drawn. Just for labels positioning
            const outerArc = d3.arc()
              .innerRadius(radius * 0.9)
              .outerRadius(radius * 0.9)

            // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
            svg2
              .selectAll('allSlices')
              .data(data_ready)
              .enter()
              .append('path')
              .attr('d', arc)
              .attr('fill', function (d) { return (color(d.data.key)) })
              .attr("stroke", "white")
              .style("stroke-width", "2px")
              .style("opacity", 0.7)

              // new data for cost and quantity (tooltip)
              .data(data_ready2)
              .on("mouseover", function (d) {
                d3.select(this)
                  .transition()
                  .duration(300)
                  .style("opacity", 0.7)
                // tooltip appears when mouse hovers over bar
                tooltip
                  .html(`Quantity: ${  d.data.value  }<br>` +
                    `Cost: ${  d.data.key}`,)
                  .style("visibility", "visible")
              })

              .on("mousemove", function () {
                return tooltip
                  .style("top", `${d3.event.pageY - 10  }px`)
                  .style("left", `${d3.event.pageX + 10  }px`);
              })

              // hover effect disappears when mouse leaves bar
              .on("mouseout", function (d) {
                d3.select(this)
                  .transition()
                  .duration(300)
                tooltip.style("visibility", "hidden")
              })

            // center text in pie chart
            svg2
              .append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "-1.2em")
              .text("Most Bought Item")
              .style("font-size", "18px")
              .style("font-weight", "bold");

            svg2
              .append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "0.7em")
              .text(highestQuantityItem)
              .style("font-size", "14px")

            svg2
              .append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "2.2em")
              .text(`at ${  highestPercent  }%`)
              .style("font-size", "18px")
              .style("font-weight", "bold");

            // Add the polylines between chart and labels:
            svg2
              .selectAll('allPolylines')
              .data(data_ready)
              .enter()
              .append('polyline')
              .attr("stroke", "black")
              .style("fill", "none")
              .attr("stroke-width", 1)
              .attr('points', function (d) {
                const posA = arc.centroid(d) // line insertion in the slice
                const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                const posC = outerArc.centroid(d); // Label position = almost the same as posB
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
              })

            // Add the polylines between chart and labels:
            svg2
              .selectAll('allLabels')
              .data(data_ready)
              .enter()
              .append('text')
              .text(function (d) { /* console.log(d.data); */ return d.data.key })
              .attr('transform', function (d) {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${  pos  })`;
              })
              .style('text-anchor', function (d) {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
              })
              .style("font-size", "14px")
              .style("font-weight", "bold")
          })
          .catch((error) => {
            console.log(error)
          })
      })
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })
}