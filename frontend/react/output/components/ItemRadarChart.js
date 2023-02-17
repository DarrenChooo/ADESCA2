import React, { useRef, useState } from "react";
const ITEMS_API_URL = API_URL + "/items/";
const USER_API_URL = API_URL + "/users/";
IMAGE_URL = IMAGE_URL + "/images/";
const userid = localStorage.getItem("userid");
let stats = ["Damage", "Speed", "Cost", "Critrate", "Durability"];
let newData = [];
export default function ItemRadarChart({
  setIncomingItem,
  itemId,
  setError,
  error,
  setEquippedItem
}) {
  const radarChartRef = useRef();
  const [loading, setLoading] = useState(false);
  const [currentItemStats, setCurrentItemStats] = React.useState({
    itemid: 0,
    Damage: 0,
    Speed: 0,
    Cost: 0,
    Critrate: 0,
    Durability: 0
  });
  const [incomingItemStats, setIncomingItemStats] = React.useState({
    itemid: 0,
    Damage: 0,
    Speed: 0,
    Cost: 0,
    Critrate: 0,
    Durability: 0
  });

  // Get currently equipped weapon stats
  React.useEffect(() => {
    // Exctracting of data using SQL
    (async () => {
      const newValues1 = {};
      const response = await axios.get(`${USER_API_URL}join/${userid}`).catch(error => {
        console.log(error);
        alert(error + "??");
      });
      setEquippedItem(response.data);

      // Transforming stat data of currently equipped item by cleaning and grouping it
      stats.map(stat => {
        if (stat == "Cost") {
          if (response.data[stat.toLowerCase()] <= 100) {
            newValues1[stat] = 3;
          } else if (response.data[stat.toLowerCase()] <= 1000) {
            newValues1[stat] = 6;
          } else if (response.data[stat.toLowerCase()] <= 3000) {
            newValues1[stat] = 9;
          } else {
            newValues1[stat] = 10;
          }
        } else {
          newValues1[stat] = response.data[stat.toLowerCase()] / 10;
        }
        newValues1.itemid = response.data.equippeditem;
      });
      // Collating all new stat values in a seperate object allows ReactJS to not have to rerender as many times, thus improving application performace
      setCurrentItemStats(newValues1);
    })();
  }, []);

  // Get incoming itemid equipment stats
  React.useEffect(() => {
    // Exctracting of data using SQL
    (async () => {
      setLoading(true);
      const newValues2 = {};
      const response2 = await axios.get(ITEMS_API_URL + itemId).catch(error => {
        console.log(error.message);
        setError([true, error.message]);
      });
      setIncomingItem(response2.data);

      // Transforming stat data of item that is being viewed by cleaning and grouping it
      stats.map(stat => {
        if (stat == "Cost") {
          if (response2.data[stat.toLowerCase()] <= 100) {
            newValues2[stat] = 3;
          } else if (response2.data[stat.toLowerCase()] <= 1000) {
            newValues2[stat] = 6;
          } else if (response2.data[stat.toLowerCase()] <= 3000) {
            newValues2[stat] = 9;
          } else {
            newValues2[stat] = 10;
          }
        } else {
          newValues2[stat] = response2.data[stat.toLowerCase()] / 10;
        }
        newValues2.itemid = itemId;
      });
      setIncomingItemStats(newValues2);
      setLoading(false);
    })();
  }, [itemId]);
  React.useEffect(() => {
    newData = [currentItemStats, incomingItemStats];
    renderData(newData);
  }, [currentItemStats.itemid, incomingItemStats.itemid]);
  return /*#__PURE__*/React.createElement("div", {
    ref: radarChartRef,
    id: "radarChart"
  });
  function renderData(data) {
    if (data.length == 2) {
      // Clearing previously rendered D3JS SVGs, if any, to only display new SVG
      if (radarChartRef.current.firstChild) {
        radarChartRef.current.removeChild(radarChartRef.current.firstChild);
      }
      console.log("Rendering data: ", data);
      let svg = d3.select(radarChartRef.current).append("svg").attr("width", 630).attr("height", 630);
      let radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
      let ticks = [2, 4, 6, 8, 10];

      // Appending radial lines
      ticks.forEach(t => svg.append("circle").attr("cx", 300).attr("cy", 300).attr("fill", "none").attr("stroke", "#FFFFF0").attr("r", radialScale(t)));

      //  Appending radial line labels (eg. 2, 4, 6, 8, 10)
      ticks.forEach(t => svg.append("text").attr("x", 305).attr("y", 295 - radialScale(t)).style("fill", "#FFFFF0").text(t.toString()));
      function angleToCoordinate(angle, value) {
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {
          x: 300 + x,
          y: 300 - y
        };
      }
      stats.map((stat, i) => {
        let ft_name = stat;
        let angle = Math.PI / 2 + 2 * Math.PI * i / stats.length;
        let line_coordinate = angleToCoordinate(angle, 10);
        let label_coordinate = angleToCoordinate(angle, 11.2);

        // Draw axis line
        svg.append("line").attr("x1", 300).attr("y1", 300).attr("x2", line_coordinate.x).attr("y2", line_coordinate.y).attr("stroke", "#FFFFF0");

        // Draw axis label
        svg.append("text").attr("x", label_coordinate.x - 25).attr("y", label_coordinate.y + 2).style("fill", "#FFFFF0").text(ft_name);
      });
      let line = d3.line().x(d => d.x).y(d => d.y);
      let colors = ["#1560DB", "#22A39F"];

      // Calculating coordinates of data points in radar chart
      function getPathCoordinates(data_point) {
        let coordinates = [];
        for (var i = 0; i < stats.length; i++) {
          let ft_name = stats[i];
          let angle = Math.PI / 2 + 2 * Math.PI * i / stats.length;
          coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
        }
        let angle = Math.PI / 2 + 2 * Math.PI * 0 / stats.length;
        coordinates.push(angleToCoordinate(angle, data_point[stats[0]]));
        return coordinates;
      }

      // Retrieving coordinates of data points
      for (let i = 0; i < 2; i++) {
        let d = data[i];
        let color = colors[i];
        let coordinates = getPathCoordinates(d);

        // Appending lines to connect data points in radar chart
        svg.append("path").datum(coordinates).attr("d", line).attr("stroke-width", 3).attr("stroke", color).attr("fill", color).attr("stroke-opacity", 0.7).attr("fill-opacity", 0.1);
      }
    }
  }
}