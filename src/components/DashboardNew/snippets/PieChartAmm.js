import React, {useState, useEffect} from 'react';
import Doughnut from 'react-apexcharts';

const PieChart = ({x,z,y}) => {    
    const series1 = [1,parseFloat(x/z * 100)];
    const options1 = {
        chart: {
            height: 550,
            type: 'donut',
            toolbar: {
            show: false
            },
            stroke: {
                curve: 'straight'
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#55689e', '#919cff'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth',
            width: 5,
            colors: ['#252525']
        },
        tooltip: {
            theme: 'dark',
            shared: true
        },
        title: {
            show: false
        },
        markers: {
            size: 0
        },
        legend: {
            show: false
        }
    }
    
    return (
        (typeof window !== 'undefined') &&
            <div className='position-relative'>
                <h6 className='text-start'>{y}</h6>
                <Doughnut
                    options={options1}
                    series={series1}
                    type="donut"
                    height={250}
                />
                <h6 className='pie-center'>Coverage Ratio</h6>
            </div>
    );
}

export default PieChart