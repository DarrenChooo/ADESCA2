/// //////////////////////////////////////////////////////////////////
// Linking to bankend
/// //////////////////////////////////////////////////////////////////
API_URL = `${API_URL}/users/`;
IMAGE_URL = `${IMAGE_URL}/images/`;

const floorid = window.localStorage.getItem('floorid');
const userid = window.localStorage.getItem('userid');
const barChart = document.getElementById('bar-chart');

window.onload = () => {
  axios.get(`${API_URL  }standing/${floorid}`, {})
        .then(function (body) {
          console.log(body)
          console.log(body.data)
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });
};

const data = [
  { user: "Lowest", floor: 1 },
  { user: `This is you`, floor: `${floorid}` },
  { user: "Highest", floor: 6 }
];

const svg = d3.select("#bar-chart");
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;

const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);
const g = svg.append("g")
  .attr("transform", `translate(${  margin.left  },${  margin.top  })`);

x.domain(data.map(function (d) { return d.user; }));
y.domain([0, d3.max(data, function (d) { return d.floor; })]);

g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", `translate(0,${  height  })`)
  .call(d3.axisBottom(x));

g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y).ticks(5, ""))
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 10)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Floor");

g.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function (d) { return x(d.user); })
  .attr("y", function (d) { return y(d.floor); })
  .attr("width", x.bandwidth())
  .attr("height", function (d) { return height - y(d.floor); })
  .on("mouseover", function () {
    d3.select(this)
      .transition()
      .duration(500)
      .style("fill", "red");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(500)
      .style("fill", "steelblue");
  });





