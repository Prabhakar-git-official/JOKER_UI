import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ethers } from 'ethers';
import { JOKERAddress, JOKERCOntractABI, CREDITAddress, CreditcontractAbi, DIMEAddress, DimeContractABI } from '../../../abi/abi.js';

const AreaChart = () => {
  const [jokertotalsupply, setJokerTotalsupply] = useState(0);
  const [credittotalsupply, setCreditTotalsupply] = useState(0);
  const [dimetotalsupply, setDimeTotalsupply] = useState(0);
  const [treasuryTime, setTreasuryTime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await marketcapHistory();
    };

    fetchData();
  }, []);

  const marketcapHistory = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const jokercontract = new ethers.Contract(JOKERAddress, JOKERCOntractABI, provider);
    let totalSupplyOfJoker = ethers.utils.formatUnits(await jokercontract.totalSupply(), 9);
    setJokerTotalsupply(totalSupplyOfJoker);

    const creditcontract = new ethers.Contract(CREDITAddress, CreditcontractAbi, provider);
    let totalSupplyOfCredit = ethers.utils.formatUnits(await creditcontract.totalSupply(), 9);
    setCreditTotalsupply(totalSupplyOfCredit);

    const dimecontract = new ethers.Contract(DIMEAddress, DimeContractABI, provider);
    let totalSupplyOfDime = ethers.utils.formatUnits(await dimecontract.totalSupply(), 9);
    setDimeTotalsupply(totalSupplyOfDime);

    // Set your time periods here (in seconds)
    //setTreasuryTime([1672531200, 1675123200, 1677801600, 1680480000, 1683072000]); // Example dates for Nov 2023 - Mar 2024
    setTreasuryTime([
        new Date('November 1, 2023').getTime() / 1000,
        new Date('December 1, 2023').getTime() / 1000,
        new Date('January 1, 2024').getTime() / 1000,
        new Date('February 1, 2024').getTime() / 1000,
        new Date('March 1, 2024').getTime() / 1000,
      ]);
  };

  const jokerSeries = [
    {
      name: 'Joker Total Supply',
      data: [jokertotalsupply, jokertotalsupply-1000000, jokertotalsupply-2000000, jokertotalsupply-2000000, jokertotalsupply-2500000], // Replace with actual Joker data
    },
  ];

  const creditSeries = [
    {
      name: 'Credit Total Supply',
      data: [credittotalsupply, credittotalsupply+10000, credittotalsupply+100000, credittotalsupply-10000, credittotalsupply-200000], // Replace with actual Credit data
    },
  ];

  const dimeSeries = [
    {
      name: 'Dime Total Supply',
      data: [dimetotalsupply, dimetotalsupply+100000, dimetotalsupply+100000, dimetotalsupply+20000, dimetotalsupply+5000], // Replace with actual Dime data
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
      stroke: {
        curve: 'straight',
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    tooltip: {
      theme: 'dark',
      shared: true,
    },
    title: {
      text: '',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.2)',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 1,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
        categories: treasuryTime.map((timestamp) => timestamp * 1000), // Convert to milliseconds
        type: 'datetime', // Specify the x-axis type as datetime
        labels: {
          style: {
            colors: '#AAAAAA',
          },
          formatter: function (value) {
            const date = new Date(value);
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
          },
        },
      },
      
    yaxis: {
      title: false,
      labels: {
        formatter: function (value) {
          return value.toLocaleString();
        },
        style: {
          colors: '#AAAAAA',
        },
      },
      
  
    },
    legend: {
      show: false,
    },
  };

  return (
    (typeof window !== 'undefined') && (
      <div>
        <div className="row">
          <div className="col-md-6">
          <h6 className='sub-heading mb-0'>
            DIME TotalSupply</h6>
          <Chart options={options} series={dimeSeries} type="area" height={350} />
            
          </div>
          <div className="col-md-6">
          <h6 className='sub-heading mb-0'>
            CREDIT TotalSupply</h6>
          <Chart options={options} series={creditSeries} type="area" height={350} />
          </div>
        </div>
        <h6 className='sub-heading mb-0'>
            JOKER  TotalSupply</h6>
        <Chart options={options} series={jokerSeries} type="area" height={350} />
       
      </div>
    )
  );
};

export default AreaChart;
