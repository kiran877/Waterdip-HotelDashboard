import React from 'react';
import useFetchData from './hooks/useFetchData';
import TimeSeriesChart from './components/TimeSeriesChart';
import CountryColumnChart from './components/CountryColumnChart'; 
import SparklineCharts from './components/SparklineCharts'; // Import the SparklineCharts component
import './App.css'; // Import your CSS file

const App = () => {
    const { data, loading, error } = useFetchData('/hotel_bookings_1000.csv'); 
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="app-container">
            <h1>Hotel Bookings Data Visualization</h1>
            <div className="chart-container">
                <div className="chart">
                    
                    <TimeSeriesChart url="/hotel_bookings_1000.csv" />
                </div>
                <div className="chart">
                   
                    <CountryColumnChart url="/hotel_bookings_1000.csv" />
                </div>
                <div className="chart">
                    
                    <SparklineCharts url="/hotel_bookings_1000.csv" />
                </div>
            </div>
        </div>
    );
};

export default App;
