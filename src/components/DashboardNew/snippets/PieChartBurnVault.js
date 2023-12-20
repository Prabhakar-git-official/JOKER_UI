import React, {useState, useEffect} from 'react';
import Doughnut from 'react-apexcharts';
import node from '../nodeapi.json';
import dashboardDetails from '../../Dashboard/stablecoin.json';
import { ethers } from 'ethers';
import { BurnVaultAddress, ChainLinkABi, JOKERAddress, JOKERCOntractABI, JOKERChainlinkAddress, USDCAddress, USDCChainlinkAddress, USDCContractABI } from '../../../abi/abi';

const algosdk = require('algosdk');
const PieChart = ({x}) => {
    const [elemCir, setElemCir] = useState();
    const [reserve, setReserve] = useState();
    const [circulating, setCirculating] = useState();

    const [jokerValue, setjokerValue] = useState("");
    const [usdcValue, setusdcValue] = useState("");
    // const indexClient = new algosdk.Indexer("", node["indexerclient", ""]);

    // const elemID = dashboardDetails.elemID;

    useEffect(async() => {
        await elemGet()
    }, []);  

    const elemGet = async () =>
    {
        const url = "https://sepolia.infura.io/v3/886e9a53b5da4f6286230678f7591bde";
        const provider = new ethers.providers.JsonRpcProvider(url);
        const jokercontract = new ethers.Contract(JOKERAddress,JOKERCOntractABI,provider);
        let revenueJOKER = ethers.utils.formatUnits(await jokercontract.balanceOf(BurnVaultAddress),9);

        const USDCcontract = new ethers.Contract(USDCAddress,USDCContractABI,provider);
        let revenueUSDC = ethers.utils.formatUnits(await USDCcontract.balanceOf(BurnVaultAddress),9);

        const jokerpricedashboard = new ethers.Contract(JOKERChainlinkAddress,ChainLinkABi,provider);
        const usdcpricedashboard = new ethers.Contract(USDCChainlinkAddress,ChainLinkABi,provider);
       
       let jokerprice =  ethers.utils.formatUnits(await jokerpricedashboard.getChainlinkDataFeedLatestAnswer(),8);
       let usdcprice =  ethers.utils.formatUnits(await usdcpricedashboard.getChainlinkDataFeedLatestAnswer(),8);

       setjokerValue(revenueJOKER*jokerprice*10)
       setusdcValue(revenueUSDC*usdcprice)
    }

    const series1 = [usdcValue, jokerValue];
    const options1 = {
        chart: {
            height: 350,
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
        colors: ['#55689e', '#2c3862'],
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
            text: '',
            align: 'left'
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
            <Doughnut
                options={options1}
                series={series1}
                type="donut"
                height={250}
            />
    );
}

export default PieChart