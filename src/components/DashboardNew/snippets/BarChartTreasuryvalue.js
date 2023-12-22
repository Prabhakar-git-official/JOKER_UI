import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import node from '../nodeapi.json';

import axios from 'axios';
import { ethers } from 'ethers';
import moment from 'moment';
import { JOKERAddress,CREDITAddress,TreasuryAddress,USDCChainlinkAddress,CreditcontractAbi,JOKERCOntractABI,BlackAbi, BondAbi, BondAddress, CommunityWallet, DAIAddress, DIMEAddress, DaiAbi, DimeAbi, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress,DIMEChainlinkAddress,CREDITChainlinkAddress,JOKERChainlinkAddress,ChainLinkABi,CreditpolicyAbi,CreditPolicyContractAddress,DimeContractABI,ECOReserveAddress,ECOReserveABI ,TreasuryContractABI} from '../../../abi/abi.js';


const BarChartTreasuryvalue = () => {
    const [treasury, setTreasury] = useState([]);
    const [treasuryTime, setTreasuryTime] = useState([]);

    const [jokertreasuryvalue, setTreasuryPricejoker] = useState(0);
    const [credittreasuryvalue, setTreasuryPricecredit] = useState(0);
    const [dimetreasuryvalue, setTreasuryPricedime] = useState(0);
    const [usdctreasuryvalue, setTreasuryPriceusdc] = useState(0);
    const [series1, setSeries1] = useState([]);
  
    const[USDCPrice,setUSDCPrice] = useState("");
    const [CreditPrice, setCreditPrice] = useState("");
    const [DimePrice, setDimePrice] = useState("");
    const [JokerPrice, setJokerPrice] = useState("");

    

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
       
        const USDCPriceContract = new ethers.Contract(USDCChainlinkAddress, ChainLinkABi, provider);

        let dimeprice =  ethers.utils.formatUnits(await dimepricedashboard.getChainlinkDataFeedLatestAnswer(),0);
      
        let jokerprice =  ethers.utils.formatUnits(await jokerpricedashboard.getChainlinkDataFeedLatestAnswer(),0);
        let creditprice =  ethers.utils.formatUnits(await creditpricedashboard.getChainlinkDataFeedLatestAnswer(),0);
        //const jokerprice = 1; // Replace with actual price
        //const creditprice = 20; // Replace with actual price
        //const dimeprice = 10; // Replace with actual price
        let usdcprice = ethers.utils.formatUnits(await USDCPriceContract.getChainlinkDataFeedLatestAnswer(),0);
        setUSDCPrice(usdcprice) 
        setCreditPrice(creditprice);
        setDimePrice(dimeprice);
        setJokerPrice(10*jokerprice);
        console.log("checkp",JokerPrice);
        console.log("check");
        const Ecoreservecontract = new ethers.Contract(ECOReserveAddress,ECOReserveABI, provider);
        let Credittotalbalance = ethers.utils.formatUnits(await Ecoreservecontract.getTreasuryBalanceCredit(),9);
        console.log("creditvalue1",creditvalue);
        let creditvalue =Credittotalbalance * creditprice;
        console.log("creditvalue",creditvalue);
        let dimetotalbalance = ethers.utils.formatUnits(await Ecoreservecontract.getTreasuryBalanceDime(),9);
        let dimevalue =dimetotalbalance*dimeprice;
        setTreasuryPricecredit(creditvalue);
        setTreasuryPricedime(creditvalue);
        let jokertotalbalance = ethers.utils.formatUnits(await Ecoreservecontract.getTreasuryBalanceJoker(),9);
        let jokervalue =jokertotalbalance*jokerprice;
        setTreasuryPricejoker(jokervalue);
        // const Bondreserve= new ethers.Contract(TreasuryAddress,TreasuryContractABI,provider);
        // let usdctotalbalance = ethers.utils.formatUnits(await Bondreserve.getUsdtBalance(),9);
        // let usdcvalue =usdctotalbalance*usdcprice;
        // setTreasuryPriceusdc(usdcvalue);

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
            categories: ['JOKER', 'CREDIT', 'DIME'],
        },
        yaxis: {
            title: {
                text: 'Treasury Value'
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
            name: 'Treasuryvalue',
            data: [jokertreasuryvalue, credittreasuryvalue, dimetreasuryvalue]
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

export default BarChartTreasuryvalue