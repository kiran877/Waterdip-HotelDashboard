import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import Chart from 'react-apexcharts';

const TimeSeriesChart = ({ url }) => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({ series: [], categories: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            const parsedData = Papa.parse(response.data, { header: true }).data;

           
            const visitorsPerDay = {};

            parsedData.forEach(row => {
                const date = `${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`;
                const totalVisitors = parseInt(row.adults) + parseInt(row.children) + parseInt(row.babies);

                if (!visitorsPerDay[date]) {
                    visitorsPerDay[date] = 0;
                }
                visitorsPerDay[date] += totalVisitors;
            });

            const categories = Object.keys(visitorsPerDay);
            const seriesData = Object.values(visitorsPerDay);

            setChartData({
                series: [{ name: 'Total Visitors', data: seriesData }],
                categories: categories,
            });
        };

        fetchData();
    }, [url]);

    return (
        <div>
            <h2>Number of Visitors per Day</h2>
            <Chart
                options={{
                    xaxis: {
                        categories: chartData.categories,
                    },
                    title: {
                        text: 'Visitors per Day',
                    },
                    stroke: {
                        curve: 'smooth',
                    },
                }}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default TimeSeriesChart;
