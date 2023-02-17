import React, { useRef, useEffect, useState } from "react";

const stats = ["Damage", "Speed", "Cost", "Critrate", "Durability"];

const cfg = {
  w: 330, //Width of the circle
  h: 330, //Height of the circle
  margin: { top: 70, right: 70, bottom: 70, left: 70 }, //The margins of the SVG
  levels: 3, //How many levels or inner circles should there be drawn
  maxValue: 0, //What is the value that the biggest circle will represent
  labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
  wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
  opacityArea: 0.35, //The opacity of the area of the blob
  dotRadius: 4, //The size of the colored circles of each blog
  opacityCircles: 0.1, //The opacity of the circles of each blob
  strokeWidth: 2, //The width of the stroke around each blob
  roundStrokes: true, //If true the area and stroke will follow a round path (cardinal-closed)
  color: d3.scaleOrdinal(["#4298F5"]), //Color function
};

let dataValue = [];

function ItemEquipStatsRadarChart({
  isItemSelected,
  equippedItemStats,
  inspectItem,
}) {
  const itemStatsChart = useRef();

  useEffect(() => {
    // Transforming stat data of currently inspected item by cleaning and grouping it
    stats.map((stat) => {
      if (stat == "Cost") {
        if (
          inspectItem[stat.toLowerCase()] == 0 ||
          inspectItem[stat.toLowerCase()] == undefined ||
          inspectItem[stat.toLowerCase()] == NaN
        ) {
          dataValue[stat] = 0;
        } else if (inspectItem[stat.toLowerCase()] <= 100) {
          dataValue[stat] = 3;
        } else if (inspectItem[stat.toLowerCase()] <= 1000) {
          dataValue[stat] = 6;
        } else if (inspectItem[stat.toLowerCase()] <= 3000) {
          dataValue[stat] = 9;
        } else {
          dataValue[stat] = 10;
        }
      } else {
        dataValue[stat] = inspectItem[stat.toLowerCase()] / 10;
      }
      dataValue.itemid = inspectItem.equippeditem;
    });

    let data = [
      [
        { axis: "Damage", value: dataValue.Damage },
        { axis: "Speed", value: dataValue.Speed },
        { axis: "Cost", value: dataValue.Cost },
        { axis: "Critrate", value: dataValue.Critrate },
        { axis: "Durability", value: dataValue.Durability },
      ],
    ];

    renderData(data);
  }, [equippedItemStats, inspectItem.equippeditem]);

  return (
    <div className="radar-chart-container">
      <div className="chart-container">
        <div className="title-container">
          <h1 className="title">{inspectItem.itemname}:</h1>
        </div>
        <div className="radar-chart" ref={itemStatsChart} />
      </div>
      <div className="stats-container" style={{ marginLeft: "auto" }}>
        {isItemSelected &&
          stats.map((stat) => (
            <div className="stat-container" key={stat}>
              <div className="stat-label">{stat}:</div>
              <div className="stat-value">
                {inspectItem[stat.toLowerCase()]}
              </div>
            </div>
          ))}
        {isItemSelected && (
          <button
            className="button"
            onClick={() => {
              window.location.assign(
                "/admin/react_update_item.html?itemid=" + inspectItem.itemid
              );
            }}
          >
            Manage Item
          </button>
        )}
      </div>
    </div>
  );

  function renderData(data) {
    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    var maxValue = 10;

    var allAxis = stats.map(function (i, j) {
        console.log(i);
        return i;
      }),
      total = allAxis.length,
      radius = Math.min(cfg.w / 2, cfg.h / 2),
      Format = d3.format("%"),
      angleSlice = (Math.PI * 2) / total;

    //Scale for the radius
    var rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

    if (itemStatsChart.current.firstChild) {
      itemStatsChart.current.removeChild(itemStatsChart.current.firstChild);
    }

    //Initiate the radar chart SVG
    let svg = d3
      .select(itemStatsChart.current)
      .append("svg")
      .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
      .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
      .attr("class", "radar");

    //Append a g element
    let g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          (cfg.w / 2 + cfg.margin.left) +
          "," +
          (cfg.h / 2 + cfg.margin.top) +
          ")"
      );

    //Filter for the outside glow
    let filter = g.append("defs").append("filter").attr("id", "glow"),
      feGaussianBlur = filter
        .append("feGaussianBlur")
        .attr("stdDeviation", "1.5")
        .attr("result", "coloredBlur");

    //Wrapper for the grid & axes
    let axisGrid = g.append("g").attr("class", "axisWrapper");

    //Draw the background circles
    axisGrid
      .selectAll(".levels")
      .data(d3.range(1, cfg.levels + 1).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", function (d, i) {
        return (radius / cfg.levels) * d;
      })
      .style("fill", "#FFFFFF")
      .style("stroke", "#00000F")
      .style("fill-opacity", cfg.opacityCircles);

    // render axis labels from center
    let axis = axisGrid
      .selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    //Append the lines
    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function (d, i) {
        return rScale(maxValue * 1) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr("y2", function (d, i) {
        return rScale(maxValue * 1) * Math.sin(angleSlice * i - Math.PI / 2);
      })
      .attr("class", "line")
      .style("stroke", "#4298F5")
      .style("stroke-width", "2px")
      .style("stroke-opacity", 0.25);

    //Append the labels at each axis
    axis
      .append("text")
      .attr("class", "legend")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("x", function (d, i) {
        return (
          rScale(maxValue * cfg.labelFactor) *
          Math.cos(angleSlice * i - Math.PI / 2)
        );
      })
      .attr("y", function (d, i) {
        return (
          rScale(maxValue * cfg.labelFactor) *
          Math.sin(angleSlice * i - Math.PI / 2)
        );
      })
      .text(function (d) {
        return d;
      })
      .call(wrap, cfg.wrapWidth);

    //The radial line function
    let radarLine = d3
      .lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(function (d) {
        return rScale(d.value);
      })
      .angle(function (d, i) {
        return i * angleSlice;
      });

    //Create a wrapper for the blobs
    let blobWrapper = g
      .selectAll(".radarWrapper")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
      .append("path")
      .attr("class", "radarArea")
      .style("fill-opacity", 0.2)
      .style("fill", function (d, i) {
        return cfg.color(i);
      })
      .attr("stroke", "#87CEFA")
      .attr("stroke-opacity", 0)
      .attr("stroke-width", "3px")
      .attr("d", function (d, i) {
        return radarLine(d);
      })
      .transition() // add transition
      .duration(400) // set transition duration to 0.4s
      .style("fill-opacity", cfg.opacityArea)
      .style("stroke-opacity", 1);

    //Render the bubbles at data points
    blobWrapper
      .selectAll(".radarCircle")
      .data(function (d, i) {
        return d;
      })
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", 0)
      .attr("cx", 0)
      .attr("cy", 0)
      .style("fill", function (d, i, j) {
        return cfg.color(j);
      })
      .transition() // add transition
      .duration(1000) // set transition duration to 1s
      .style("fill-opacity", 1)
      .attr("r", cfg.dotRadius)
      .attr("cx", function (d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr("cy", function (d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
      });

    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.4, // ems
          y = text.attr("y"),
          x = text.attr("x"),
          dy = parseFloat(text.attr("dy")),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy + "em");

        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }
  }
}

export default ItemEquipStatsRadarChart;
