import React from 'react';
import useFetchData from './hooks/useFetchData';

const App = () => {
    const { data, loading, error } = useFetchData('/hotel_bookings_1000.csv'); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Fetched CSV Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default App;
