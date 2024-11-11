import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './Graph.css';
import Navbar from '../Components/Navbar';
import axiosInstance from '../Axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const FeesGraph = () => {
  const [feesData, setFeesData] = useState([]);

  const [data, setData] = useState({
    labels: [], // Months
    datasets: [
      // {
      //   label: 'Pending Fees',
      //   data: [], // Pending fees data for each month
      //   backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color for pending
      //   borderColor: 'rgba(255, 99, 132, 1)', // Border color
      //   borderWidth: 1,
      // },
      {
        label: 'Completed Fees',
        data: [], // Completed fees data for each month
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Green color for completed
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/fee/graph/');
        setFeesData(response.data);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (feesData.length > 0) {
      const months = feesData.map(item => item.month);
      const pendingFees = feesData.map(item => item.pending);
      const completedFees = feesData.map(item => item.completed);

      setData({
        labels: months,
        datasets: [
       
          {
            label: 'Collected Fees',
            data: completedFees,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Green color for completed
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [feesData]);

  return (
    <div className="graph-container font-style">
      <Navbar />
      <h3 className="title graph-h3">Fees Collected Monthly</h3>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Fees Status by Month',
              color: '#fff',
              font: {
                size: 18,
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              titleColor: '#fff',
              bodyColor: '#fff',
            },
            legend: {
              labels: {
                color: '#fff',
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: '#444', 
              },
              ticks: {
                color: '#fff', // Dark theme tick color
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#444',
              },
              ticks: {
                color: '#fff', 
              },
            },
          },
        }}
      />
    </div>
  );
};

export default FeesGraph;
