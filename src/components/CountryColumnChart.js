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
                    chart: {
                        height: 350,
                        type: 'bar',
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            dataLabels: {
                                position: 'top', 
                            },
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return val ;
                        },
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ['#304758'],
                        },
                    },
                    xaxis: {
                        categories: chartData.categories,
                        position: 'top',
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false,
                        },
                        crosshairs: {
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    colorFrom: '#D8E3F0',
                                    colorTo: '#BED1E6',
                                    stops: [0, 100],
                                    opacityFrom: 0.4,
                                    opacityTo: 0.5,
                                },
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    yaxis: {
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false,
                        },
                        labels: {
                            show: false,
                        },
                    },
                    title: {
                        text: 'Number of Visitors per Country',
                        floating: true,
                        offsetY: 330,
                        align: 'center',
                        style: {
                            color: '#444',
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
