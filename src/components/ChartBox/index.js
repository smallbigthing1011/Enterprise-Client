import { Box, makeStyles, Typography } from "@material-ui/core";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import API_ENDPOINT from "../../endpoint";
import ContributionReport from "../ContributionReport";

const useStyles = makeStyles({
  chart: {
    height: "400px",
    width: "400px",
  },
});
const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const ChartBox = () => {
  const classes = useStyles();
  const [year, setYear] = useState("");
  const [yearArray, setYearArray] = useState([]);

  useEffect(async () => {
    let cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);
    const current = new Date();
    const currentYear = current.getFullYear();
    setYear(currentYear);
    const chartData = await (
      await fetch(`${API_ENDPOINT}/report/statistics/contributions`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "GET",
      })
    ).json();

    setYearArray(chartData.labels);
    const chartData2 = await (
      await fetch(`${API_ENDPOINT}/report/statictics/contributors`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "GET",
      })
    ).json();
    const chartData3 = await (
      await fetch(`${API_ENDPOINT}/report/statictics/year/${currentYear}`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "GET",
      })
    ).json();
    const newChartData = { ...chartData };
    newChartData.datasets.forEach(
      (item) => (item.backgroundColor = getRandomColor())
    );
    const newChartData2 = { ...chartData2 };
    newChartData2.datasets.forEach(
      (item) => (item.backgroundColor = getRandomColor())
    );
    const newChartData3 = { ...chartData3 };
    let arrayColor = [];
    for (let i = 0; i < newChartData3.labels.length; i++) {
      arrayColor.push(getRandomColor());
    }
    chartData3.datasets[0].backgroundColor = arrayColor;
    Chart.register(...registerables);

    var ctx = document.getElementById("contributionNumber").getContext("2d");
    var ctx2 = document.getElementById("contributorNumber").getContext("2d");
    let ctx3 = document.getElementById("percentage").getContext("2d");

    let contributionNumberChart = new Chart(ctx, {
      type: "bar",
      data: newChartData,
      options: {
        responsive: true,
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    let contributorNumberChart = new Chart(ctx2, {
      type: "bar",
      data: newChartData2,
      options: {
        responsive: true,
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    let percentageChart = new Chart(ctx3, {
      type: "pie",
      data: chartData3,
    });

    return function cleanup() {
      contributionNumberChart.destroy();
      contributorNumberChart.destroy();
      percentageChart.destroy();
    };
  }, []);

  return (
    <div>
      <Typography align="center" variant="h6">
        Number of contributions of each faculty in each year
      </Typography>
      <canvas id="contributionNumber" className={classes.chart}></canvas>
      <Typography align="center" variant="h6">
        Number of contributors of each faculty in each year
      </Typography>
      <canvas id="contributorNumber" className={classes.chart}></canvas>

      <Typography align="center" variant="h6">
        Percentage of each faculty in year {year}
      </Typography>
      <canvas id="percentage" className={classes.chart}></canvas>
      <Box>
        <ContributionReport></ContributionReport>
      </Box>
    </div>
  );
};

export default ChartBox;
