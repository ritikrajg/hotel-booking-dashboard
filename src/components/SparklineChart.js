import React from 'react';
import Chart from 'react-apexcharts';

const SparklineChart = ({ label, data }) => {
  const chartOptions = {
    chart: { type: 'line', sparkline: { enabled: true } },
    title: { text: label, align: 'center' },
  };

  const chartSeries = [{ name: label, data }];

  return <Chart options={chartOptions} series={chartSeries} type="line" height="100" />;
};

export default SparklineChart;
