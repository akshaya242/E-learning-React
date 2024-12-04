import React from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"; // Import necessary Chart.js components
import "./Report.css";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = ({ data, closeReport }) => {
  if (!data) return null;

  const { courseId, totalSubscribers, progress } = data;

  // Prepare data for the bar chart
  const chartData = {
    labels: progress.map(student => student.name), // Student names as labels
    datasets: [
      {
        label: "Completed Lectures",
        data: progress.map(student => student.completedLectures), // Number of completed lectures
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Student Progress Chart',
        font: {
          size: 18,
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: totalSubscribers, // Set max value based on totalSubscribers
      },
    },
  };

  return (
    <div className="report-container">
      <button onClick={closeReport} className="close-btn">Close Report</button>
      <h2>Course Report</h2>
      <p><strong>Course ID:</strong> {courseId}</p>
      <p><strong>Total Subscribers:</strong> {totalSubscribers}</p>

      <table className="report-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Completed Lectures</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.completedLectures}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add the Bar Chart below the table */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Report;
