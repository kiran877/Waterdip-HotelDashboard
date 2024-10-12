// src/hooks/useFetchData.js
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const useFetchData = (filePath) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(filePath);
                const text = await response.text(); // Read the response as text
                Papa.parse(text, {
                    header: true, // Parse the first line as headers
                    complete: (results) => {
                        setData(results.data); // Set parsed data
                        setLoading(false); // Set loading to false
                    },
                    error: (err) => {
                        setError('Error parsing CSV data');
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, [filePath]);

    return { data, loading, error };
};

export default useFetchData;
