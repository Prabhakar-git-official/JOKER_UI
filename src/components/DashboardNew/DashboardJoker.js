import React, {useState, useEffect} from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import AreaChart from './snippets/AreaChart';
import AreaChartTau from './snippets/AreaChartTau';
import AreaChartasaswap from './snippets/AreaChartASAswap';
import AreaChartMintFeeTau from './snippets/AreaChartMintFeeTau';
import BarChartMarketcap from './snippets/BarChartMarketcap';
import BarCharttreasuryvalue from './snippets/BarChartTreasuryvalue';
import AreaCharttotalsupply from './snippets/AreaCharttotalsupply';
import BarChartPrice from './snippets/BarChartPrice';
import AreaChartElemReserve from './snippets/AreaChartElemReserve';
import AreaChartMintFeeEinr from './snippets/AreaChartMintFeeEinr';
import AreaChartRedeemFee from './snippets/AreaChartRedeemFee';
import AreaChartTauCollateral from './snippets/AreaChartTauCollateral';
import AreaChartEinrCollateral from './snippets/AreaChartEinrCollateral';
import LineChart from './snippets/LineChart';
import PieChartElem from './snippets/PieChartStable';
import PieChartBurnVault from './snippets/PieChartBurnVault';
import PieChartBurnVault1 from './snippets/PieChartBurnVault1';
import PieChartEinr from './snippets/PieChartStable';
import node from './nodeapi.json';
import dashboardDetails from '../Dashboard/stablecoin-only.json';
import config from '../../NFTFolder/config.json'
import axios from 'axios';

import jokercoin from '../../assets/images/Jokercoin.png';
import stasiscoin  from '../../assets/images/stasiscoin.png';
import creditscoin from '../../assets/images/creditscoin.png';


import AreaChartNFT from './snippets/AreaChartNFT'
import Logo from '../../assets/images/algorand-logo.png';
import { ethers } from 'ethers';
import { JOKERAddress,CREDITAddress,CreditcontractAbi,JOKERCOntractABI,BlackAbi, BondAbi, BondAddress, CommunityWallet, DAIAddress, DIMEAddress, DaiAbi, DimeAbi, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress, TreasuryAddress,DIMEChainlinkAddress,CREDITChainlinkAddress,JOKERChainlinkAddress,ChainLinkABi,CreditpolicyAbi,CreditPolicyContractAddress,DimeContractABI,ECOReserveAddress,ECOReserveABI, DAOReserveAddress, USDCAddress, USDCContractABI, USDCChainlinkAddress } from '../../abi/abi';
import PieChart from './snippets/PieChartStable';
import BarChartTreasuryvalue from './snippets/BarChartTreasuryvalue';

// const algosdk = require('algosdk');
const Dashboard = () => {

    useEffect(() => {
        document.title = "JOKER | Dashboard"
    }, [])

    const [einrCir, setEinrCir] = useState("");
    const [elemCir, setElemCir] = useState("");
    const [tauCir, setTauCir] = useState("");
    const [usdcFee, setUsdcFee] = useState("");
    const [tauFee, setTauFee] = useState("");
    const [einrFee, setEinrFee] = useState("");
    const [elemBalance, setElemBalance] = useState("");
    const [elemReserveBalance, setElemReserveBalance] = useState("");
    const [tauBalance, setTauBalance] = useState("");
    const [usdcTauBalance, setUsdcTauBalance] = useState("");
    const [einrBalance, setEinrBalance] = useState("");
    const [usdcEinrBalance, setUsdcEinrBalance] = useState("");
    const [nftBalance, setnftBalance] = useState("");
    const[asaswapelembalance,setasaswapelembalance] = useState("");
    const [jokerMarketCap, setJokerMarketCap] = useState(0);
    const [creditMarketCap, setCreditMarketCap] = useState(0);
    const [dimeMarketCap, setDimeMarketCap] = useState(0);

  

    const [CreditPrice, setCreditPrice] = useState("");
    const [DimePrice, setDimePrice] = useState("");
    const [JokerPrice, setJokerPrice] = useState("");
    const [TreasuryPrice, setTreasuryPrice] = useState("");
    const [Colratio, setColratio] = useState("");


    const [TrDaiBalance, setTrDaiBalance] = useState("");
    const [TrDimeBalance, setTrDimeBalance] = useState("");
    const [TrJokerBalance, setTrJokerBalance] = useState("");
    const [ComDimeBalance, setComDimeBalance] = useState("");
    const [nextrebasetime, setnextrebasetime] = useState("");
    const [nextrebasetimedime, setnextrebasetimeDime] = useState("");
    const[timecf,settime]= useState("");
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const[date,setdate]= useState("");

    const[timecdime,settimedime]= useState("");
    const[daydime,setTime4dime]= useState("");
    const[hourdime,setTim1dime]= useState("");
    const[mindime,setTim2dime]= useState("");
    const[secdime,setTim3dime]= useState("");
    const[lockdime,setlockdime]= useState(""); 
    const[datedime,setdatedime]= useState("");
    const[TotalSupply,setTotalSupply] = useState("");
    const[JokerTotalSupply,setJokerTotalSupply] = useState("");
    const[CreditTotalSupply,setCreditTotalSupply] = useState("");
    const[LiquidityValue,setLiquidity] = useState("");
    const[DAOValue,setDAOValue] = useState("");
    const[BondValue,setBondValue] = useState("");



    

    useEffect(() => {
        const fetchData = async () => {
            await cir();
        };
    
        fetchData();
    }, []);
    
    const cir =async () =>
    {
        const url = "https://sepolia.infura.io/v3/886e9a53b5da4f6286230678f7591bde";
        const provider = new ethers.providers.JsonRpcProvider(url);
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        // const jusdpoolcontract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
        const dimepricedashboard = new ethers.Contract(DIMEChainlinkAddress,ChainLinkABi,provider);
        const jokerpricedashboard = new ethers.Contract(JOKERChainlinkAddress,ChainLinkABi,provider);
         const creditpricedashboard = new ethers.Contract(CREDITChainlinkAddress,ChainLinkABi,provider);
        let dimeprice =  ethers.utils.formatUnits(await dimepricedashboard.getChainlinkDataFeedLatestAnswer(),0);
      
        let jokerprice =  ethers.utils.formatUnits(await jokerpricedashboard.getChainlinkDataFeedLatestAnswer(),0);
        let creditprice =  ethers.utils.formatUnits(await creditpricedashboard.getChainlinkDataFeedLatestAnswer(),0);
       
        setCreditPrice(creditprice);
        setDimePrice(dimeprice);
        setJokerPrice(jokerprice*10);
     

        const Creditcontract = new ethers.Contract(CreditPolicyContractAddress,CreditpolicyAbi, provider);
       
        let lastepoch = ethers.utils.formatUnits(await Creditcontract.lastRebaseTimestampSec(),0);
        console.log("lastepo1",lastepoch);
        let epochhours = ethers.utils.formatUnits(await Creditcontract.minRebaseTimeIntervalSec(),0);
       
        let added = parseInt(lastepoch) + parseInt(epochhours)
        console.log("lastepoch",lastepoch,epochhours,added)
        setnextrebasetime(added)
        console.log("lastepore",nextrebasetime);
        const Dimecontract = new ethers.Contract(DIMEAddress,DimeContractABI, provider);
        const Jokercontract = new ethers.Contract(JOKERAddress,JOKERCOntractABI, provider);
        const CreditTokencontract = new ethers.Contract(CREDITAddress,CreditcontractAbi, provider);
        let lastepochdime = ethers.utils.formatUnits(await Dimecontract.lastEpoch(),0);

        let totalsupply = ethers.utils.formatUnits(await Dimecontract.totalSupply(),0);
        setTotalSupply(totalsupply)
     
        let jokertotalsupply = ethers.utils.formatUnits(await Jokercontract.totalSupply(),0);
        setJokerTotalSupply(jokertotalsupply)

        let credittotalsupply = ethers.utils.formatUnits(await CreditTokencontract.totalSupply(),0);
        setCreditTotalSupply(credittotalsupply)
        console.log("credit",credittotalsupply)

        setLiquidity(ethers.utils.formatUnits(await Jokercontract.balanceOf(JOKERAddress),0))

        let epochhoursdime = ethers.utils.formatUnits(await Dimecontract.epochHours(),0);
        let addeddime = parseInt(lastepochdime) + parseInt(epochhoursdime)
        console.log("lastepochdime",addeddime)
        setnextrebasetimeDime(addeddime)
        console.log("lastepore",nextrebasetimedime);
        const Ecoreservecontract = new ethers.Contract(ECOReserveAddress,ECOReserveABI, provider);
        let Credittotalbalance = ethers.utils.formatUnits(await Ecoreservecontract.getTreasuryBalanceCredit(),9);
        console.log("creditvalue1",creditvalue);
        let creditvalue =Credittotalbalance * creditprice;
        console.log("creditvalue",creditvalue);
        let dimetotalbalance = ethers.utils.formatUnits(await Ecoreservecontract.getTreasuryBalanceDime(),9);
        let dimevalue =dimetotalbalance*dimeprice;
        let jokertotalbalance = ethers.utils.formatUnits(await Ecoreservecontract.getTreasuryBalanceJoker(),9);
        let jokervalue =jokertotalbalance*jokerprice;
        setTreasuryPrice(creditvalue + dimevalue +jokervalue);

        let jokerBalance = ethers.utils.formatUnits(await Jokercontract.balanceOf(DAOReserveAddress),9);
        let creditBalance = ethers.utils.formatUnits(await CreditTokencontract.balanceOf(DAOReserveAddress),9);
        let dimeBalance = ethers.utils.formatUnits(await Dimecontract.balanceOf(DAOReserveAddress),9);

        const USDCcontract = new ethers.Contract(USDCAddress,USDCContractABI,provider);
        const usdcpricedashboard = new ethers.Contract(USDCChainlinkAddress,ChainLinkABi,provider);
        let usdcprice =  ethers.utils.formatUnits(await usdcpricedashboard.getChainlinkDataFeedLatestAnswer(),0);
        let dimeBalance1 = ethers.utils.formatUnits(await Dimecontract.balanceOf(TreasuryAddress),9);
        let usdcBalance1 = ethers.utils.formatUnits(await USDCcontract.balanceOf(TreasuryAddress),9);

        setDAOValue(jokerBalance*jokerprice + creditBalance*creditprice + dimeBalance*dimeprice);
        setBondValue(dimeBalance1*dimeprice + usdcBalance1*usdcprice)



        // const jokercontract = new ethers.Contract(JOKERAddress, JOKERCOntractABI, provider);
        // let totalSupplyOfJoker = ethers.utils.formatUnits(await jokercontract.totalSupply(),0);
        // const jokerMarketCap = JokerPrice * totalSupplyOfJoker; // Replace totalSupplyOfJoker with the actual total supply
       
        // const creditcontract = new ethers.Contract(CreditAddress, CreditcontractAbi, provider);
        // let totalSupplyOfCredit = ethers.utils.formatUnits(await creditcontract.totalSupply(),0);
        // const creditMarketCap = CreditPrice * totalSupplyOfCredit; // Replace totalSupplyOfCredit with the actual total supply
        
    //     const dimecontract = new ethers.Contract(DIMEAddress, DimeContractABI, provider);
    //     let totalSupplyOfDime = ethers.utils.formatUnits(await dimecontract.totalSupply(),0);
    //     const dimeMarketCap = DimePrice * totalSupplyOfDime; // Replace totalSupplyOfDime with the actual total supply
   
    //    setJokerMarketCap(jokerMarketCap);
    //    setCreditMarketCap(creditMarketCap);
    //    setDimeMarketCap(dimeMarketCap);
      

        

        // let trdaiBalance = ethers.utils.formatUnits(await daicontract.balanceOf(TreasuryAddress),18);
        // let trdimeBalance = ethers.utils.formatUnits(await dimecontract.balanceOf(TreasuryAddress),18);
        // let trjokerBalance = ethers.utils.formatUnits(await jokercontract.balanceOf(TreasuryAddress),9);
        // let communitydimeBalance = ethers.utils.formatUnits(await dimecontract.balanceOf(CommunityWallet),18);

        // setTrDaiBalance(trdaiBalance);
        // setTrDimeBalance(trdimeBalance);
        // setTrJokerBalance(trjokerBalance);
        // setComDimeBalance(communitydimeBalance);

        




    }

    useEffect(async() => {
        await first()
    }, [nextrebasetime]);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
    
    const first = async () => {
    console.log("lasteporebase",nextrebasetime);
        var us= nextrebasetime;
        var ff=new Date(us);
    setdate(ff.toDateString());
    var hours = ff.getHours();
      var minutes = ff.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      settime( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us * 1000;
    //// console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
        var x = setInterval(function() {
           var now = new Date().getTime();
          var distance = countDowndate - now ;
        //   // console.log("-------------------now", distance);
         // // console.log(now);
          // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
          console.log("date e", day);
          console.log("hour e", hour);
          console.log("min e", minutes);
          console.log("sec e", seconds);
    
          // Output the result in an element with id="demo"
         // document.getElementById("demo").innerHTML = hours + "h "
         // + minutes + "m " + seconds + "s ";
        setTime4(days);
        setTim1(hours);
        setTim2(minutes);
        setTim3(seconds);
    
    
        
        
        
        
          // If the count down is over, write some text 
          if (distance < 0) {
                clearInterval(x);
                setlock(false);
    
               // // console.log('CountDown Finished');
            }
            else{
             setlock(true);
            }
    
        
          
        }, 1000);
       
    
    }
  
   useEffect(async() => {
        await dimerebase()
    }, [nextrebasetimedime]);
    
   
    
    const dimerebase = async () => {
    console.log("lasteporebase",nextrebasetime);
        var us= nextrebasetimedime;
        var ff=new Date(us);
    setdatedime(ff.toDateString());
    var hours = ff.getHours();
      var minutes = ff.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      settimedime( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us * 1000;
    //// console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
        var x = setInterval(function() {
           var now = new Date().getTime();
          var distance = countDowndate - now ;
        //   // console.log("-------------------now", distance);
         // // console.log(now);
          // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
          console.log("date e", day);
          console.log("hour e", hour);
          console.log("min e", minutes);
          console.log("sec e", seconds);
    
          // Output the result in an element with id="demo"
         // document.getElementById("demo").innerHTML = hours + "h "
         // + minutes + "m " + seconds + "s ";
        setTime4dime(days);
        setTim1dime(hours);
        setTim2dime(minutes);
        setTim3dime(seconds);
    
    
        
        
        
        
          // If the count down is over, write some text 
          if (distance < 0) {
                clearInterval(x);
                setlockdime(false);
    
               // // console.log('CountDown Finished');
            }
            else{
             setlockdime(true);
            }
    
        
          
        }, 1000);
       
    
    }
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple"><img src={jokercoin} width={35} height={35}></img>&nbsp;JOKER   
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       JOKER
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <hr className='mb-20 mt-0' />
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JOKERAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>
                           

                              <div className='mb-20'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        Price
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(JokerPrice/1e8)?parseFloat(JokerPrice/1e8).toFixed(3):"0"}</h4>
                                </div>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        MarketCap
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(JokerTotalSupply / 1e8) ? parseFloat((JokerTotalSupply*JokerPrice) / 1e17).toFixed(3) : "0"}</h4>
                                </div>

                                <div>
                                <h6 className='sub-heading mb-0'>
                                 Liquidity Value
                                </h6>
                                 <h4 className='mb-2'>${parseFloat(LiquidityValue / 1e8) ? parseFloat((LiquidityValue*JokerPrice) / 1e17).toFixed(3) : "0"}</h4>
                                   
                                </div>

                               
                            </div>
                        </div>                    
                        </Card>
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple"> <img src={stasiscoin} width={35} height={35}></img>&nbsp; DIME  
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       DIME
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <hr className='mb-20 mt-0' />
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + DIMEAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>
                            <div className='mb-20'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        Price
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(DimePrice / 1e8) ? parseFloat(DimePrice / 1e8).toFixed(3) : "0"}</h4>
                                </div>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        MarketCap
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(TotalSupply / 1e8) ? parseFloat((TotalSupply*DimePrice) / 1e17).toFixed(3) : "0"}</h4>
                                </div>

                                <div>
                                <h6 className='sub-heading mb-0'>
                                Next Rebase Time 
                                </h6>
                                 <h4 className='mb-2'>{lockdime == true ? (<>{daydime}d:{hourdime}h:{mindime}m:{secdime}s</>):(<>00d:00h:00m:00s</>)}</h4>
                                   
                                </div>

                               
                            </div>
                        </div>
                
                        </Card>
                       
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple"><img src={creditscoin} width={35} height={35}></img>&nbsp;CREDIT
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <hr className='mb-20 mt-0' />
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JOKERAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>
                           <div className='mb-20'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        Price
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(CreditPrice/1e8)?parseFloat(CreditPrice/1e8).toFixed(3):"0"}</h4>
                                </div>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        MarketCap
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(CreditTotalSupply / 1e8) ? parseFloat((CreditTotalSupply*CreditPrice) / 1e17).toFixed(3) : "0"}</h4>
                                </div>
                                <div >
                                <h6 className='sub-heading mb-0'>
                                    Timing for Next Rebase
                                </h6>
                                <h4 className='mb-2'>{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>00d:00h:00m:00s</>)}</h4>
                               
                            </div>  
                                </div>
                                </div>                    
                        </Card>
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Treasury Price 
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + DAIAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>
                            <hr className='mb-20 mt-0' />
                             

                              <div className='mb-20'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        Bond 
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(BondValue/1e8)?parseFloat(BondValue/1e8).toFixed(2):"0"}</h4>
                                </div>
                                <div>
                                    <h6 className='sub-heading mb-0'>
                                        ECO Reserve
                                    </h6>
                                    <h4 className='mb-2'>${parseFloat(TreasuryPrice/1e8)?parseFloat(TreasuryPrice/1e8).toFixed(2):"0"}</h4>
                                </div>
                                <div >
                                <h6 className='sub-heading mb-0'>
                                    DAO Reserve
                                </h6>
                                <h4 className='mb-2'>${parseFloat(DAOValue/1e8)?parseFloat(DAOValue/1e8).toFixed(2):"0"}</h4>
                               
                            </div>  
                                </div>
                                </div>                     
                        </Card>

                  
                       
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Treasuryvalue    
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <Col>
                            {/* <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JUSDAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a> */}
                            </Col>
                            </Row>
                            <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    Treasury value
                                </h6>
                                {/* <h4 className='mb-2'>{Colratio?(Colratio*1000):"0"}%</h4> */}
                                <hr className='mb-20 mt-0' />
                                <div className='mb-0'>
                                <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <BarCharttreasuryvalue/>
                                    </Col>
                                    </div>
                            </div>                      
                        </Card>

                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Burn Vault    
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <Col>
                            {/* <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JUSDAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a> */}
                            </Col>
                            </Row>
                            <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    Total value
                                </h6>
                                
                                <Row className='justify-content-center'>
                                    <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                    <PieChartBurnVault />
                                    </Col>
                                    <Col xs={'auto'} sm={6}>
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="black" x="0" y="0" width="16" height="16"></rect></svg>
                                                JOKER value in dollars

                                              
                                            </div>
                                            {/* <h6>{parseInt((tauTotalSupply - parseFloat(tauCir)/1000000)) ? (parseInt((tauTotalSupply - parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6> */}
                                        </div>
                                        <div className='mb-20'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="rgb(77, 77, 77)" x="0" y="0" width="16" height="16"></rect></svg>
                                                USDC value in dollars

                                               
                                            </div>
                                            {/* <h6>{(parseInt((parseFloat(tauCir)/1000000))) ? (parseInt((parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6> */}
                                        </div>
                                    </Col>
                                </Row>
                               
                                {/* <h4 className='mb-2'>{Colratio?(Colratio*1000):"0"}%</h4> */}
                                {/* <hr className='mb-20 mt-0' />
                                <div className='mb-0'>
                                <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <BarCharttreasuryvalue/>
                                    </Col>
                                    </div> */}
                            </div>                      
                        </Card>
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Overall JOKER Token  
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <Col>
                            {/* <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JUSDAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a> */}
                            </Col>
                            </Row>
                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Total value
                                </h6> */}
                                  <hr className='mb-20 mt-0' />
                                <Row className='justify-content-center'>
                                    <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                    <PieChartBurnVault1 />
                                    </Col>
                                    <Col xs={'auto'} sm={6}>
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="black" x="0" y="0" width="16" height="16"></rect></svg>
                                                JOKER Token in Burn Vault 
                                              
                                              
                                            </div>
                                            {/* <h6>{parseInt((tauTotalSupply - parseFloat(tauCir)/1000000)) ? (parseInt((tauTotalSupply - parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6> */}
                                        </div>
                                        <div className='mb-20'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="rgb(77, 77, 77)" x="0" y="0" width="16" height="16"></rect></svg>
                                             Overall JOKER Token

                                               
                                            </div>
                                            {/* <h6>{(parseInt((parseFloat(tauCir)/1000000))) ? (parseInt((parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6> */}
                                        </div>
                                    </Col>
                                </Row>
                               
                                {/* <h4 className='mb-2'>{Colratio?(Colratio*1000):"0"}%</h4> */}
                                {/* <hr className='mb-20 mt-0' />
                                <div className='mb-0'>
                                <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <BarCharttreasuryvalue/>
                                    </Col>
                                    </div> */}
                            </div>                      
                        </Card>
                       
                    
                        

                    </Col>
                    <Col md={6}>
                   

                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Marketcap    
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <Col>
                            {/* <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JUSDAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a> */}
                            </Col>
                            </Row>
                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Marketcap
                                </h6> */}
                                {/* <h4 className='mb-2'>{Colratio?(Colratio*1000):"0"}%</h4> */}
                                <hr className='mb-20 mt-0' />
                                <div className='mb-0'>
                                <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <BarChartMarketcap/>
                                    </Col>
                                    </div>
                            </div>                      
                        </Card>
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Price   
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <Col>
                            {/* <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JUSDAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a> */}
                            </Col>
                            </Row>
                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Price
                                </h6> */}
                                {/* <h4 className='mb-2'>{Colratio?(Colratio*1000):"0"}%</h4> */}
                                <hr className='mb-20 mt-0' />
                                <div className='mb-0'>
                                <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <BarChartPrice/>
                                    </Col>
                                    </div>
                            </div>                      
                        </Card>
                      
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">TotalSupply    
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                            <Col>
                            {/* <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://goerli.basescan.org/address/" + JUSDAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a> */}
                            </Col>
                            </Row>
                            <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    totalSupply
                                </h6>
                                {/* <h4 className='mb-2'>{Colratio?(Colratio*1000):"0"}%</h4> */}
                                <hr className='mb-20 mt-0' />
                                <div className='mb-0'>
                                <Col xs={12} sm={12} className="mb-sm-0 text-center mb-3">
                                        <AreaCharttotalsupply/>
                                    </Col>
                                    </div>
                            </div>                      
                        </Card>
                        
                      
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Dashboard;