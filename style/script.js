// Example data
const placementData = {
    labels: ["2016", "2017", "2018", "2019", "2020"],
    placed: [88.87, 100.00, 94.29, 81.90, 18.10],
    notPlaced: [11.13, 0.00, 5.71, 18.10, 81.90]
  };
  
  const performanceData = {
    labels: ["High Performing", "Medium Performing", "Low Performing"],
    values: [2212, 1252, 187]
  };
  
  // Chart.js for Placement Data
  const ctx1 = document.getElementById("placement-chart").getContext("2d");
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: placementData.labels,
      datasets: [
        {
          label: "Placed",
          data: placementData.placed,
          borderColor: "green",
          fill: false
        },
        {
          label: "Not Placed",
          data: placementData.notPlaced,
          borderColor: "red",
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Placement % by Year"
      }
    }
  });
  
  // Chart.js for Performance Data
  const ctx2 = document.getElementById("performance-chart").getContext("2d");
  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: performanceData.labels,
      datasets: [
        {
          label: "Number of Students",
          data: performanceData.values,
          backgroundColor: ["#003366", "#0066cc", "#99ccff"]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Student Performance"
      }
    }
  });
  