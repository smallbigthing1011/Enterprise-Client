import { makeStyles } from "@material-ui/core";
import { Chart, registerables } from "chart.js";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  chart: {
    height: "400px",
    width: "400px",
  },
});
const ChartBox = () => {
  const classes = useStyles();
  const [statistic, setStatistic] = useState({
    contributionNumber: {
      labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
      data: [11, 12, 13, 14, 15, 12],
    },
    contributionPercentage: {
      labels: ["Math", "Physics", "Chemistry", "Literature", "Social"],
      data: [15, 16, 15, 14, 100 - 15 - 16 - 15 - 14],
    },
    contributorNumber: {
      labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
      data: [11, 12, 13, 14, 15, 12],
    },
  });

  useEffect(() => {
    Chart.register(...registerables);
    var ctx = document.getElementById("contributionNumber");
    var ctx2 = document.getElementById("percentageCon");
    var ctx3 = document.getElementById("contributorNumber");

    let contributionNumberChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: statistic.contributionNumber.labels,
        datasets: [
          {
            label: "Number of contributions for each academic year",
            data: statistic.contributionNumber.data,
            backgroundColor: ["rgba(54, 162, 235, 0.8)"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    let percentagePieChart = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: statistic.contributionPercentage.labels,
        datasets: [
          {
            label: "Percentage of contributions by each Faculty",
            data: statistic.contributionPercentage.data,
            backgroundColor: ["rgba(104, 162, 235, 0.8)"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    let contributorNumberChart = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: statistic.contributorNumber.labels,
        datasets: [
          {
            label: "Number of contributions for each academic year",
            data: statistic.contributorNumber.data,
            backgroundColor: ["rgba(54, 162, 235, 0.8)"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return function cleanup() {
      contributionNumberChart.destroy();
      contributorNumberChart.destroy();
      percentagePieChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="contributionNumber" className={classes.chart}></canvas>
      <canvas id="percentageCon" className={classes.chart}></canvas>
      <canvas id="contributorNumber" className={classes.chart}></canvas>
    </div>
  );
};

export default ChartBox;
