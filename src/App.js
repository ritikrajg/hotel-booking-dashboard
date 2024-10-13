import React, { useEffect, useState } from 'react';
import { parseCSVData } from './dataParser';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2022-12-31');

  useEffect(() => {
    parseCSVData('/hotel_bookings_1000.csv')
      .then(data => setData(data))
      .catch(err => console.error('Failed to load data', err));
  }, []);

  useEffect(() => {
    // Filter data based on selected date range
    const filtered = data.filter(booking => {
      const bookingDate = dayjs(`${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`);
      return bookingDate.isBetween(startDate, endDate, null, '[]');
    });
    setFilteredData(filtered);
  }, [data, startDate, endDate]);

  const visitorsPerDay = filteredData.reduce((acc, curr) => {
    const date = `${curr.arrival_date_year}-${curr.arrival_date_month}-${curr.arrival_date_day_of_month}`;
    if (!acc[date]) acc[date] = 0;
    acc[date] += curr.adults + curr.children + curr.babies;
    return acc;
  }, {});

  const visitorsPerCountry = filteredData.reduce((acc, curr) => {
    if (!acc[curr.country]) acc[curr.country] = 0;
    acc[curr.country] += curr.adults + curr.children + curr.babies;
    return acc;
  }, {});

  return (
    <div>
      <h1>Hotel Booking Dashboard</h1>

      {/* Date selectors */}
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </label>

      {/* Charts */}
      <TimeSeriesChart data={Object.keys(visitorsPerDay).map(date => ({ date, visitors: visitorsPerDay[date] }))} />
      <ColumnChart data={Object.keys(visitorsPerCountry).map(country => ({ country, visitors: visitorsPerCountry[country] }))} />
      <SparklineChart label="Adults" data={filteredData.map(b => b.adults)} />
      <SparklineChart label="Children" data={filteredData.map(b => b.children)} />
    </div>
  );
};

export default App;
