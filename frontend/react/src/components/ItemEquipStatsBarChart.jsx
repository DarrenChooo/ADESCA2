import React, { useState, useEffect, useRef } from "react";

let rects;
let x;
let y;
let svg;
// set the dimensions and margins of the graph
const margin = { top: 30, right: 0, bottom: 30, left: 60 };
const height = 410 - margin.top - margin.bottom;

export default function ItemEquipStatsBarChart({
  equippedItemStats,
  setEquippedItemStats,
  setInspectItem,
}) {
  const [equippedItemsChartSorting, setEquippedItemsChartSorting] =
    useState("");
  const equippedItemsChart = useRef();
  const equippedItemsChartSorter = useRef();

  useEffect(() => {
    axios
      .get(API_URL + `stats/equippeditems`)
      .then((stats) => {
        setEquippedItemStats(stats.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let count = 0;
    if (equippedItemStats[0]) {
      equippedItemStats.sort(function (a, b) {
        return b.count - a.count;
      });
      count = equippedItemStats[0].count;
    }

    renderData(equippedItemStats, count);
  }, [equippedItemStats]);

  useEffect(() => {
    updateData(
      rects,
      x,
      y,
      svg,
      height,
      equippedItemStats,
      equippedItemsChartSorting
    );
  }, [equippedItemsChartSorting]);

  return (
    <div className="bar-chart-container">
      <div className="title-container">
        <h1 className="title">Users have been equipping these items:</h1>
        <select
          className="dropdown-select"
          ref={equippedItemsChartSorter}
          value={equippedItemsChartSorting}
          onChange={updateSorting}
        >
          <option value="sort-alph">Sort by Alphabetical</option>
          <option value="sort-asc">Sort by Ascending</option>
          <option value="sort-desc">Sort by Descending</option>
        </select>
      </div>
      <div className="bar-chart" ref={equippedItemsChart}></div>
    </div>
  );

  function updateSorting() {
    setEquippedItemsChartSorting(equippedItemsChartSorter.current.value);
  }

  function renderData(equippedItemStats, count) {
    // Clear previously rendered charts
    if (equippedItemsChart.current.firstChild) {
      equippedItemsChart.current.removeChild(
        equippedItemsChart.current.firstChild
      );
    }
    // set the width of the graph
    let width = equippedItemStats.length * 90 - margin.left - margin.right;

    equippedItemStats.sort(function (a, b) {
      return a.itemname.localeCompare(b.itemname);
    });

    // append the svg object to the div in the page
    svg = d3
      .select(equippedItemsChart.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // create tooltip element
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "rgba(0,0,0,0.35)")
      .style("border-radius", "5px")
      .style("color", "#fff");
    // X axis
    x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        equippedItemStats.map(function (item) {
          return item.itemname;
        })
      )
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x-axis")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "center");

    // Add Y axis
    y = d3.scaleLinear().domain([0, count]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add horizontal grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisRight(y).tickSize(width).tickFormat(""))
      .style("stroke-dasharray", "10,10")
      .style("opacity", 0.1);

    // Bars
    rects = svg
      .selectAll("mybar")
      .data(equippedItemStats)
      .enter()
      .append("rect")
      .attr("x", function (item) {
        return x(item.itemname);
      })
      .attr("y", function (item) {
        return y(item.count);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (item) {
        return height - y(item.count);
      })
      .attr("fill", "#4298F5")
      .attr("height", function (d) {
        return height - y(0);
      }) // always equal to 0
      .attr("y", function (d) {
        return y(0);
      })
      .on("mouseover", function (d) {
        tooltip
          .html(`Equipped by ${d.count} users`)
          .style("visibility", "visible");
        d3.select(this).attr("fill", "#2E7FDA");
      })
      .on("mousemove", function () {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
        d3.select(this).attr("fill", "#4298F5");
      })
      .on("click", function (d, i) {
        setInspectItem(d);
      });

    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (item) {
        return y(item.count);
      })
      .attr("height", function (item) {
        return height - y(item.count);
      })
      .delay(function (d, i) {
        return i * 70;
      });
  }

  function updateData(
    rects,
    x,
    y,
    svg,
    height,
    equippedItemStats,
    equippedItemsChartSorting
  ) {
    // Sort data based on sorting value
    if (equippedItemsChartSorting === "sort-alph") {
      equippedItemStats.sort(function (a, b) {
        return a.itemname.localeCompare(b.itemname);
      });
    } else if (equippedItemsChartSorting === "sort-asc") {
      equippedItemStats.sort(function (a, b) {
        return a.count - b.count;
      });
    } else if (equippedItemsChartSorting === "sort-desc") {
      equippedItemStats.sort(function (a, b) {
        return b.count - a.count;
      });
    }
    // Update the x-axis
    x.domain(
      equippedItemStats.map(function (item) {
        return item.itemname;
      })
    );
    console.log("updating chart");
    svg.select(".x-axis").call(d3.axisBottom(x));

    // Update the rectangles
    rects.data(equippedItemStats);
    rects.exit().remove();
    rects
      .enter()
      .append("rect")
      .attr("x", (item) => x(item.itemname))
      .attr("y", (item) => y(item.count))
      .attr("width", x.bandwidth())
      .attr("height", (item) => height - y(item.count))
      .attr("fill", "#69b3a2")
      .on("mouseover", function (d) {
        // Show the tooltip when the rectangle is hovered over
        tooltip
          .style("visibility", "visible")
          .html(`Item: ${d.itemname} <br> Equipped by: ${d.count}`);
      })
      .on("mousemove", function () {
        // Move the tooltip with the cursor as it moves over the rectangle
        return tooltip
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        // Hide the tooltip when the cursor is not over the rectangle
        return tooltip.style("visibility", "hidden");
      });
    rects
      .transition()
      .duration(1000)
      .attr("x", (d) => x(d.itemname))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count));
  }
}
