import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import Chart from 'react-apexcharts';

const CountryColumnChart = ({ url }) => {
    const [chartData, setChartData] = useState({ series: [], categories: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            const parsedData = Papa.parse(response.data, { header: true }).data;

            
            const visitorsPerCountry = {};

            parsedData.forEach(row => {
                const country = row.country; 
                const totalVisitors = parseInt(row.adults) + parseInt(row.children) + parseInt(row.babies);

                if (!visitorsPerCountry[country]) {
                    visitorsPerCountry[country] = 0;
                }
                visitorsPerCountry[country] += totalVisitors;
            });

            const categories = Object.keys(visitorsPerCountry);
            const seriesData = Object.values(visitorsPerCountry);

            setChartData({
                series: [{ name: 'Total Visitors', data: seriesData }],
                categories: categories,
            });
        };

        fetchData();
    }, [url]);

    return (
        <div>
            <h2>Column Chart: Number of Visitors per Country</h2>
            <Chart
                options={{
                    xaxis: {
                        categories: chartData.categories,
                    },
                    title: {
                        text: 'Visitors per Country',
                    },
                    dataLabels: {
                        enabled: true,
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                        },
                    },
                }}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default CountryColumnChart;
