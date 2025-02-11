// Sample data for charts and calculations
const data = {
    totalStudents: 3819,
    studentsPlaced: 3441,
    notInterestedCurrent: 4.7,
    notInterestedLast: 7.18,
    placementInterest: {
      interested: 75,
      notInterested: 25,
    },
    placementPercentage: {
      2017: 65,
      2018: 70,
      2019: 72,
      2020: 74,
      2021: 80,
    },
    arrearStatus: {
      cleared: 85,
      notCleared: 15,
    },
    organizationType: {
      IT: 50,
      Manufacturing: 30,
      Other: 20,
    },
    studentPerformance: {
      excellent: 40,
      good: 35,
      average: 20,
      poor: 5,
    },
  };
  
  // Update summary cards dynamically
  document.getElementById("totalStudents").textContent = data.totalStudents;
  document.getElementById("studentsPlaced").textContent = data.studentsPlaced;
  document.getElementById("notInterestedCurrent").textContent = `${data.notInterestedCurrent}%`;
  document.getElementById("notInterestedLast").textContent = `${data.notInterestedLast}%`;
  
  // Initialize charts
  function initializeCharts() {
    const placementInterestCtx = document.getElementById("placementInterestChart").getContext("2d");
    const placementPercentageCtx = document.getElementById("placementPercentageChart").getContext("2d");
    const arrearStatusCtx = document.getElementById("arrearStatusChart").getContext("2d");
    const organizationTypeCtx = document.getElementById("organizationTypeChart").getContext("2d");
    const studentPerformanceCtx = document.getElementById("studentPerformanceChart").getContext("2d");
  
    // Placement Interest Chart
    new Chart(placementInterestCtx, {
      type: "pie",
      data: {
        labels: ["Interested", "Not Interested"],
        datasets: [{
          data: [data.placementInterest.interested, data.placementInterest.notInterested],
          backgroundColor: ["#36a2eb", "#ff6384"],
        }],
      },
    });
  
    // Placement Percentage Chart
    new Chart(placementPercentageCtx, {
      type: "line",
      data: {
        labels: Object.keys(data.placementPercentage),
        datasets: [{
          label: "Placement Percentage",
          data: Object.values(data.placementPercentage),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "#36a2eb",
          fill: true,
        }],
      },
    });
  
    // Arrear Status Chart
    new Chart(arrearStatusCtx, {
      type: "bar",
      data: {
        labels: ["Cleared", "Not Cleared"],
        datasets: [{
          data: [data.arrearStatus.cleared, data.arrearStatus.notCleared],
          backgroundColor: ["#4caf50", "#f44336"],
        }],
      },
    });
  
    // Organization Type Chart
    new Chart(organizationTypeCtx, {
      type: "doughnut",
      data: {
        labels: ["IT", "Manufacturing", "Other"],
        datasets: [{
          data: Object.values(data.organizationType),
          backgroundColor: ["#ffcd56", "#36a2eb", "#ff6384"],
        }],
      },
    });
  
    // Student Performance Chart
    new Chart(studentPerformanceCtx, {
      type: "radar",
      data: {
        labels: ["Excellent", "Good", "Average", "Poor"],
        datasets: [{
          label: "Performance",
          data: Object.values(data.studentPerformance),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "#4bc0c0",
          pointBackgroundColor: "#4bc0c0",
        }],
      },
    });
  }
  
  // Filter functionality (basic implementation)
  document.getElementById("year").addEventListener("change", (e) => {
    const selectedYear = e.target.value;
    console.log(`Filter applied for year: ${selectedYear}`);
    // Add filtering logic here based on selected year
  });
  
  document.getElementById("department").addEventListener("change", (e) => {
    const selectedDept = e.target.value;
    console.log(`Filter applied for department: ${selectedDept}`);
    // Add filtering logic here based on selected department
  });
  
  // Initialize all charts
  initializeCharts();
  