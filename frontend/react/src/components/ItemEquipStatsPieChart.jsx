import React, { useRef, useEffect, useState } from "react";

function ItemEquipStatsPieChart({ equippedItemStats, setInspectItem }) {
  const [topItems, setTopItems] = useState(["", "", ""]);
  const popularItemChart = useRef();
  const color = [
    "#87CEEB",
    "#ADD8E6",
    "#B0E0E6",
    "#87CEFA",
    "#6495ED",
    "#1E90FF",
    "#4682B4",
    "#00BFFF",
    "#87CEFF",
    "#87CEE6",
    "#00C5CD",
    "#5F9EA0",
    "#00B2EE",
    "#00B5C5",
    "#00B8B8",
    "#00C957",
    "#00CCCC",
    "#00D2D2",
    "#00E5EE",
    "#00F5F5",
  ];
  let totalItems = 0;
  let item1 = "itemname",
    item2 = "itemname",
    item3 = "itemname";
  useEffect(() => {
    totalItems = equippedItemStats.reduce((sum, item) => {
      return sum + parseInt(item.count);
    }, 0);
    renderData(equippedItemStats);
    console.log(equippedItemStats);
    if (equippedItemStats.length > 0) {
      setTopItems([
        equippedItemStats[0].itemname,
        equippedItemStats[1].itemname,
        equippedItemStats[2].itemname,
      ]);
    }
  }, [equippedItemStats]);

  return (
    <div className="pie-chart-container">
      <div className="title-container">
        <h1 className="title">Most popular item:</h1>
      </div>
      <div className="pie-chart" ref={popularItemChart} />
      <div id="legend-container">
        <h3 className="sub-title">Top items:</h3>
        <div id="legend-item-container">
          <div id="legend-color-1"></div>
          <h3 id="legend-label">{topItems[0]}</h3>
        </div>

        <div id="legend-item-container">
          <div id="legend-color-2"></div>
          <h3 id="legend-label">{topItems[1]}</h3>
        </div>

        <div id="legend-item-container">
          <div id="legend-color-3"></div>
          <h3 id="legend-label">{topItems[2]}</h3>
        </div>
      </div>
    </div>
  );

  function renderData(equippedItemStats) {
    var width = 280,
      height = 280,
      radius = Math.min(width, height) / 2;

    if (popularItemChart.current.firstChild) {
      popularItemChart.current.removeChild(popularItemChart.current.firstChild);
    }

    equippedItemStats.sort(function (a, b) {
      return b.count - a.count;
    });

    var svg = d3
      .select(popularItemChart.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(140,140)");

    var arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 25);

    var pie = d3
      .pie()
      .value(function (d) {
        return d.count;
      })
      .sort(null);

    var g = svg
      .selectAll("arc")
      .data(pie(equippedItemStats))
      .enter()
      .append("g")
      .attr("class", "arc");

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

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
        return color[d.index];
      })
      .on("mouseover", function (d) {
        tooltip
          .html(`${d.data.itemname}`)
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
        setInspectItem(d.data);
      });
    if (totalItems > 0) {
      console.log(totalItems);
      var text1 = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0em")
        .text(`${Math.round((equippedItemStats[0].count / totalItems) * 100)}%`)
        .style("font-size", "54px");

      var text2 = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "2em")
        .text(`of users are using the`)
        .style("font-size", "18px");

      var text3 = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "3em")
        .text(`${equippedItemStats[0].itemname}`)
        .style("font-size", "20px");
    }

    // Animation
    d3.selectAll("path")
      .transition()
      .duration(2000)
      .attrTween("d", function (d) {
        if (d) {
          var i = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = i(t);
            return arc(d);
          };
        }
      });
  }
}

export default ItemEquipStatsPieChart;
