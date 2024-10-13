import React from 'react';
import Chart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  const chartOptions = {
    chart: { id: 'visitors-per-day' },
    xaxis: { type: 'datetime' },
    title: { text: 'Visitors Per Day' },
  };

  const chartSeries = [
    {
      name: 'Visitors',
      data: data.map(item => [new Date(item.date).getTime(), item.visitors]),
    },
  ];

  return <Chart options={chartOptions} series={chartSeries} type="line" height="350" />;
};

export default TimeSeriesChart;
