import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import Chart from 'react-apexcharts';
import './SparklineCharts.css'; 

const SparklineCharts = ({ url }) => {
    const [data, setData] = useState([]);
    const [totalAdults, setTotalAdults] = useState([]);
    const [totalChildren, setTotalChildren] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            const parsedData = Papa.parse(response.data, { header: true }).data;

            let adultVisitors = [];
            let childVisitors = [];

            parsedData.forEach(row => {
                adultVisitors.push(parseInt(row.adults) || 0);
                childVisitors.push(parseInt(row.children) || 0);
            });

            setTotalAdults(adultVisitors);
            setTotalChildren(childVisitors);
            setData(parsedData);
        };

        fetchData();
    }, [url]);

   
    const totalAdultVisitors = totalAdults.reduce((acc, curr) => acc + curr, 0);
    const totalChildVisitors = totalChildren.reduce((acc, curr) => acc + curr, 0);
    
    
    const commonChartOptions = {
        chart: {
            type: 'line',
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: Array.from({ length: totalAdults.length }, (_, i) => `Day ${i + 1}`),
            show: false,
        },
        yaxis: {
            show: false,
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
            y: {
                formatter: (val) => val,
            },
        },
    };

    return (
        <div className="sparkline-charts-container">
            <h2>Visitors</h2>
            
            <div className="chart-card">
                <h4>Total Adult Visitors</h4>
                <Chart
                    options={{ ...commonChartOptions }}
                    series={[{ name: 'Adults', data: totalAdults }]}
                    type="line"
                    height={100}
                />
                <p>Total: {totalAdultVisitors}</p>
            </div>

            
            <div className="chart-card">
                <h4>Total Child Visitors</h4>
                <Chart
                    options={{ ...commonChartOptions }}
                    series={[{ name: 'Children', data: totalChildren }]}
                    type="line"
                    height={100}
                />
                <p>Total: {totalChildVisitors}</p>
            </div>
        </div>
    );
};

export default SparklineCharts;
