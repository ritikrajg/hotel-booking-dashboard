import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const chartOptions = {
    chart: { id: 'visitors-per-country' },
    xaxis: { categories: data.map(item => item.country) },
    title: { text: 'Visitors Per Country' },
  };

  const chartSeries = [{ name: 'Visitors', data: data.map(item => item.visitors) }];

  return <Chart options={chartOptions} series={chartSeries} type="bar" height="350" />;
};

export default ColumnChart;
