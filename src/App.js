import React from 'react';
import useFetchData from './hooks/useFetchData';
import TimeSeriesChart from './components/TimeSeriesChart'; // Adjust the path as necessary

const App = () => {
    const { data, loading, error } = useFetchData('/hotel_bookings_1000.csv'); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {/* Add the TimeSeriesChart component here */}
            <TimeSeriesChart url="/hotel_bookings_1000.csv" />
        </div>
    );
};

export default App;
