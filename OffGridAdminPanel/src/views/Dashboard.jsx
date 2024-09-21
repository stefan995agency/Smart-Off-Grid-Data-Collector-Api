import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboard() {
  const [latestData, setLatestData] = useState({
    total_production: 0,
    total_load: 0,
  });

  const [chartData, setChartData] = useState({
    production: [],
    load: [],
    labels: [],
  });

  // Fetch latest data
  const fetchLatestData = () => {
    axiosClient
      .get('/logs/latest')
      .then(({ data }) => {
        const { total_production, total_load } = data.data; // Adjust to match the structure returned by the API
        setLatestData({ total_production, total_load });
      })
      .catch((error) => {
        console.error('Error fetching latest data:', error);
      });
  };

  // Fetch chart data
  const fetchChartData = () => {
    axiosClient
      .get('/log')
      .then(({ data }) => {
        // Extract data for chart
        const production = data.map((log) => log.total_production);
        const load = data.map((log) => log.total_load);
        const labels = data.map((log) =>
          new Date(log.created_at).toLocaleString()
        ); // Convert timestamps to readable format

        setChartData({
          production,
          load,
          labels,
        });
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
      });
  };

  useEffect(() => {
    fetchLatestData();
    fetchChartData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Latest Data</h2>
        <p>Total Production: {latestData.total_production} W</p>
        <p>Total Load: {latestData.total_load} W</p>
      </div>
      <div>
        <h2>Total Production and Load Over Time</h2>
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Total Production (W)',
                data: chartData.production,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
              },
              {
                label: 'Total Load (W)',
                data: chartData.load,
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Watts',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
