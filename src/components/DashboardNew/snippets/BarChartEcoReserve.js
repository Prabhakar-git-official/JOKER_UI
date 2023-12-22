import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import node from '../nodeapi.json';

import axios from 'axios';
import { ethers } from 'ethers';
import moment from 'moment';
import { JOKERAddress,CREDITAddress,CreditcontractAbi,JOKERCOntractABI,BlackAbi, BondAbi, BondAddress, CommunityWallet, DAIAddress, DIMEAddress, DaiAbi, DimeAbi, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress, TreasuryAddress,DIMEChainlinkAddress,CREDITChainlinkAddress,JOKERChainlinkAddress,ChainLinkABi,CreditpolicyAbi,CreditPolicyContractAddress,DimeContractABI,ECOReserveAddress,ECOReserveABI, USDCAddress, USDCContractABI, USDCChainlinkAddress } from '../../../abi/abi.js';


const BarChartMarketcap = () => {
    const [treasury, setTreasury] = useState([]);
    const [treasuryTime, setTreasuryTime] = useState([]);

    const [jokerMarketCap, setJokerMarketCap] = useState(0);
    const [creditMarketCap, setCreditMarketCap] = useState(0);
    const [dimeMarketCap, setDimeMarketCap] = useState(0);
    const [series1, setSeries1] = useState([]);
  

    const [CreditPrice, setCreditPrice] = useState("");
    const [DimePrice, setDimePrice] = useState("");
    const [JokerPrice, setJokerPrice] = useState("");


    const [JokerValue, setJokerValue] = useState("");
    const [CreditValue, setCreditValue] = useState("");
    const [DimeValue, setDimeValue] = useState("");
    const [UsdcValue, setUsdcValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            await marketcapHistory();
        };

        fetchData();
    }, []);


    const marketcapHistory = async () =>
    {
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        const url = "https://sepolia.infura.io/v3/886e9a53b5da4f6286230678f7591bde";
        const provider = new ethers.providers.JsonRpcProvider(url);
        const dimepricedashboard = new ethers.Contract(DIMEChainlinkAddress,ChainLinkABi,provider);
        const jokerpricedashboard = new ethers.Contract(JOKERChainlinkAddress,ChainLinkABi,provider);
        const creditpricedashboard = new ethers.Contract(CREDITChainlinkAddress,ChainLinkABi,provider);
        // const usdcpricedashboard = new ethers.Contract(USDCChainlinkAddress,ChainLinkABi,provider);
        let dimeprice =  ethers.utils.formatUnits(await dimepricedashboard.getChainlinkDataFeedLatestAnswer(),8);
      
        let jokerprice =  ethers.utils.formatUnits(await jokerpricedashboard.getChainlinkDataFeedLatestAnswer(),8);
        let creditprice =  ethers.utils.formatUnits(await creditpricedashboard.getChainlinkDataFeedLatestAnswer(),8);
        // let usdcprice =  ethers.utils.formatUnits(await usdcpricedashboard.getChainlinkDataFeedLatestAnswer(),8);
        //const jokerprice = 1; // Replace with actual price
        //const creditprice = 20; // Replace with actual price
        //const dimeprice = 10; // Replace with actual price
       
        setCreditPrice(creditprice);
        setDimePrice(dimeprice);
        setJokerPrice(10*jokerprice);

        const jokercontract = new ethers.Contract(JOKERAddress, JOKERCOntractABI, provider);
        const creditcontract = new ethers.Contract(CREDITAddress, CreditcontractAbi, provider);
        const dimecontract = new ethers.Contract(DIMEAddress, DimeContractABI, provider);
        // const USDCcontract = new ethers.Contract(USDCAddress,USDCContractABI,provider);

        let jokerBalance = ethers.utils.formatUnits(await jokercontract.balanceOf(ECOReserveAddress),9);
        let creditBalance = ethers.utils.formatUnits(await creditcontract.balanceOf(ECOReserveAddress),9);
        let dimeBalance = ethers.utils.formatUnits(await dimecontract.balanceOf(ECOReserveAddress),9);
        // let usdcBalance = ethers.utils.formatUnits(await USDCcontract.balanceOf(ECOReserveAddress),9);

        setJokerValue(jokerBalance * 10*jokerprice);
        setCreditValue(creditBalance*creditprice);
        setDimeValue(dimeBalance*dimeprice);
        // setUsdcValue(usdcBalance*usdcprice)


        console.log("checkp",JokerPrice);
        console.log("check");
       
        let totalSupplyOfJoker = ethers.utils.formatUnits(await jokercontract.totalSupply(),0);
         const jokerMarketCap = (jokerprice * totalSupplyOfJoker)/1e17; // Replace totalSupplyOfJoker with the actual total supply
        //const jokerMarketCap = 100;
       console.log("Jmarket",jokerMarketCap);
       
        let totalSupplyOfCredit = ethers.utils.formatUnits(await creditcontract.totalSupply(),0);
        const creditMarketCap = (creditprice * totalSupplyOfCredit)/1e17; // Replace totalSupplyOfCredit with the actual total supply
        //const creditMarketCap =150;
       
        let totalSupplyOfDime = ethers.utils.formatUnits(await dimecontract.totalSupply(),0);
        const dimeMarketCap = (dimeprice * totalSupplyOfDime)/1e17; // Replace totalSupplyOfDime with the actual total supply
        //const dimeMarketCap=50;
       setJokerMarketCap(jokerMarketCap);
       setCreditMarketCap(creditMarketCap);
       setDimeMarketCap(dimeMarketCap);
       //setTreasuryTime([1639756800, 1639843200, 1639929600, 1640016000, 1640102400, 1640188800]);
    }

    // const series1 = [
    //     {
    //         name: "",
    //         data: [treasury[11]/1000000, treasury[10]/1000000, treasury[9]/1000000, treasury[8]/1000000, treasury[7]/1000000, treasury[6]/1000000, treasury[5]/1000000, treasury[4]/1000000, treasury[3]/1000000, treasury[2]/1000000, treasury[1]/1000000, treasury[0]/1000000]
    //     }
    //   ]
    const options = {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['JOKER', 'DIME', 'CREDIT'],
        },
        yaxis: {
            title: {
                text: 'Total Value'
            },
            labels: {
                formatter: function (val) {
                    return val.toLocaleString();
                }
                
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val.toLocaleString();
                }
            }
        },
        colors: ['rgb(77, 77, 77)', '#3498db', '#2ecc71'],
    };

    const series = [
        {
            name: 'ECO Reserve',
            data: [JokerValue, DimeValue, CreditValue]
             //data: [200000000, 10000000, 20000000]
        }
    ];

// const options1 = {
//     chart: {
//         height: 350,
//         type: 'area',
//         toolbar: {
//             show: false
//         },
//         stroke: {
//             curve: 'straight'
//         },
//         zoom: {
//             enabled: false
//         }
//     },
//     colors: ['rgba(59, 130, 246, 0.5)'],
//     dataLabels: {
//         enabled: false,
//     },
//     stroke: {
//         curve: 'smooth',
//         width: 1,
//     },
//     tooltip: {
//         theme: 'dark',
//         shared: true
//     },
//     title: {
//         text: '',
//         align: 'left'
//     },
//     fill: {
//         type: 'gradient',
//         gradient: {
//             shadeIntensity: 1,
//             inverseColors: false,
//             opacityFrom: 0.45,
//             opacityTo: 0.05,
//             stops: [20, 100, 100, 100]
//         },
//     },
//     grid: {
//         borderColor: 'rgba(255, 255, 255, 0.2)',
//         row: {
//             colors: ['transparent', 'transparent'],
//             opacity: 1
//         },
//         xaxis: {
//             lines: {
//                 show: false
//             }
//         },
//         yaxis: {
//             lines: {
//                 show: false
//             }
//         },
//     },
//     markers: {
//         size: 0
//     },
//     xaxis: {
//         categories: treasuryTime.map(timestamp => new Date(timestamp * 1000)),
//         title: false,
//         labels: {
//             style: {
//                 colors: '#AAAAAA'
//             }
//         }
//     },
//     yaxis: {
//         title: false,
//         labels: {
//             show: false,
//             formatter: function (value) {
//                 return value.toLocaleString()
//             },
//             style: {
//                 colors: '#AAAAAA'
//             }
//         }
//     },
//     legend: {
//         show: false
//     }
// };

return (
        (typeof window !== 'undefined') &&
        <Chart
            options={options}
            series={series}
            type="bar"
            height={350}
        />
    );
    
}

export default BarChartMarketcap