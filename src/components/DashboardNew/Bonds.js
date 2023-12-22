import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import ButtonLoad from 'react-bootstrap-button-loader';
import { Link } from 'react-router-dom';
import USDC from '../../assets/images/usdc.jpg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import dimeLogo from '../../assets/images/dime.jpeg';
import Logo from '../../assets/images/modal-logo.png';
import Arrow from '../../assets/images/arrow-tr.svg';
import daiLogo from '../../assets/images/dai.jpeg';
import ModalSquareLogo from '../../assets/images/modal-square-logo.png';
import bondDetails from "../Dashboard/stablecoin-only.json";
import node from "./nodeapi.json"
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

import jokercoin from '../../assets/images/Jokercoin.png';
import stasiscoin  from '../../assets/images/stasiscoin.png';
import creditscoin from '../../assets/images/creditscoin.png';

import { updatealgobalance } from "../formula";
import { BondAbi, BondAddress, CREDITChainlinkAddress, ChainLinkABi, DAIAddress, DIMEAddress, DIMEChainlinkAddress, DaiAbi, DimeAbi, DimeContractABI, JOKERAddress, JOKERCOntractABI, JOKERChainlinkAddress, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress, TreasuryAbi, TreasuryAddress, TreasuryContractABI, USDCAddress, USDCChainlinkAddress, USDCContractABI } from '../../abi/abi';
import { ethers } from 'ethers';
/* global BigInt */

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();

const bridge = "https://bridge.walletconnect.org";


const Bond = () => {

    useEffect(() => {
        document.title = "ɈɸꝁΣℝ | Bond"
    }, [])

    const[appTotal,setAppTotal] = useState("");


    const [connector, setConnector] = useState("");

    const[loaderPurchase, setLoaderPurchase] = useState(false);

    const handleShowLoadPurchase = () => setLoaderPurchase(true);
    const handleHideLoadPurchase = () => setLoaderPurchase(false);

    const[loaderClaim, setLoaderClaim] = useState(false);

    const handleShowLoadClaim = () => setLoaderClaim(true);
    const handleHideLoadClaim = () => setLoaderClaim(false);

    const[loaderAppOpt, setLoaderAppOpt] = useState(false);

    const handleShowLoadAppOpt = () => setLoaderAppOpt(true);
    const handleHideLoadAppOpt = () => setLoaderAppOpt(false);

    const[loaderAssetOpt, setLoaderAssetOpt] = useState(false);

    const handleShowLoadAssetOpt = () => setLoaderAssetOpt(true);
    const handleHideLoadAssetOpt = () => setLoaderAssetOpt(false);

    const[loaderUsdcFund, setLoaderUsdcFund] = useState(false);

    const handleShowLoadUsdcFund = () => setLoaderUsdcFund(true);
    const handleHideLoadUsdcFund = () => setLoaderUsdcFund(false);

    const[startdt,setstartdt] = useState("");
    const[enddt,setenddt] = useState("");
    const[clsdt,setclsdt] = useState("");
    const[goal,setgoal] = useState("");
    const[total,settotal] = useState("");
    const[rec,setrec]= useState("");
    const[creator,setCreator]= useState("");
    const[escrow,setescrow]= useState("");
    const[appid,setappid]= useState("");
    const[percent,setPercent]= useState("");
    const[date,setdate]= useState("");
    const[timecf,settime]= useState("");
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const [bond, setBond] = React.useState("");
    const [stable,setToStable] = useState("");
    const [time,setToTime] = useState("");
    const [bondBalance, setBondBalance] = useState("");
    const [appOpt,setToAppOpt] = useState(false);
    const [assetOpt,setToAssetOpt] = useState(false);
    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [bondAmount, setBondAmount] = useState("");
    const[JokerInput,setJokerInput] = useState("");
    const [elemGet, setElemGet] = useState("");
    const [minAlgo, setMinAlgo] = useState("");
    const [bondHard, setBondHard] = React.useState("");
    const [stableHard,setToStableHard] = useState("");
    const [timeHard,setToTimeHard] = useState("");
    const [timeSplitHard,setToTimeSplitHard] = useState("");


    const [treasurBalance,settreasurBalance] = useState("");  
    const [blackPrice,setblackPrice] = useState("");  
    const [daiPrice,setdaiPrice] = useState("");  
    const [blackPurchased,setblackPurchased] = useState([]);  
    const[allowan,setAllowance] = useState("")
    const[allowan2,setAllowance2] = useState("")
    const[daiBlance,setdaiBlance] = useState("")
    const[JokerBlance,setJokerBlance] = useState("");
    const [rewardtime,setrewardtime] = useState("");

    const[dimePrice,setdimePrice] = useState("")
     const[JokerPrice,setJokerPrice] = useState("")
     const[USDCPrice,setUSDCPrice] = useState("")
   

    const[ClaimedTime,setClaimedTime] = useState("")
    const[DepoitTime,setDepoitTime] = useState("")
    const[UserReward,setUserReward] = useState("")   
    console.log("req",UserReward)
    const[ClaimedAmount,setClaimedAmount] = useState("");  
    const[TimeDuration,setTimeDuration] = useState("")
    const[TreasuryDollarvalue,setTreasuryDollarvalue] = useState("")
    console.log("time",Math.floor(new Date().getTime() / 1000),blackPurchased.depositTime? parseInt(ethers.utils.formatUnits(blackPurchased.depositTime,0))+120 :0)

    //// console.log("mapSet", map1);
    // let appId = setappid(46584645);

    let appID_global = parseInt(bondDetails.bondAppID);
    let usdcID = parseInt(bondDetails.usdcID);
    let elemID = parseInt(bondDetails.elemID);
    let escrowCompiled = bondDetails.bondEscrow;


    useEffect(()=>{displayValueCalculation()},[])

    const displayValueCalculation = async() =>{
      if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
      }
      else{
          console.log("useeffect")
        //   const provider = new ethers.providers.Web3Provider(window.ethereum)
        const url = "https://sepolia.infura.io/v3/886e9a53b5da4f6286230678f7591bde";
        const provider = new ethers.providers.JsonRpcProvider(url);
          // console.log("Connected Successfully", account);
        //new code

        const DimePriceContract = new ethers.Contract(DIMEChainlinkAddress, ChainLinkABi, provider);
        const USDCPriceContract = new ethers.Contract(USDCChainlinkAddress, ChainLinkABi, provider);
        const JokerPriceContract = new ethers.Contract(JOKERChainlinkAddress, ChainLinkABi, provider);
        const CreditPriceContract = new ethers.Contract(CREDITChainlinkAddress, ChainLinkABi, provider);
        const DimeContract = new ethers.Contract(DIMEAddress, DimeContractABI, provider);
        const USDCContract = new ethers.Contract(USDCAddress, USDCContractABI, provider);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryContractABI, provider);
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERCOntractABI, provider);

        let dimeprice = ethers.utils.formatUnits(await DimePriceContract.getChainlinkDataFeedLatestAnswer(),0);
       console.log("dimePrice",dimeprice)
        let usdcprice = ethers.utils.formatUnits(await USDCPriceContract.getChainlinkDataFeedLatestAnswer(),0);

        // let jokerPrice = ethers.utils.formatUnits(await DimePriceContract.getChainlinkDataFeedLatestAnswer(),0);
        let jokerPrice = 10 * 10e8;//for now it is given as 10$
        let Creditprice = ethers.utils.formatUnits(await CreditPriceContract.getChainlinkDataFeedLatestAnswer(),0);
        setdimePrice(dimeprice);
        setJokerPrice(jokerPrice);
        setUSDCPrice(usdcprice) 
        
        let allowance =  ethers.utils.formatUnits(await USDCContract.allowance(localStorage.getItem("walletAddress"),DIMEAddress),0);
        console.log("allowance", allowance)
        setAllowance(allowance);
        let allowance2 =  ethers.utils.formatUnits(await JOKERContract.allowance(localStorage.getItem("walletAddress"),DIMEAddress),0);
        console.log("allowance", allowance)
        setAllowance2(allowance2);

        let timeduration = ethers.utils.formatUnits(await DimeContract.timeDuration(),0);
        setTimeDuration(timeduration);          
        let blackpurchased = await DimeContract.users(localStorage.getItem("walletAddress"));
        setblackPurchased(blackpurchased);

        setClaimedTime(ethers.utils.formatUnits(blackpurchased.claimedTime,0))
        setDepoitTime(ethers.utils.formatUnits(blackpurchased.depositTime,0));
        setUserReward(ethers.utils.formatUnits(blackpurchased.userRewards,0))
        console.log("userRewards",ethers.utils.formatUnits(blackpurchased.userRewards,0))
        setClaimedAmount(ethers.utils.formatUnits(blackpurchased.claimedAmount,0))
        console.log("blackpurchased",blackPurchased);
        let rtime = ethers.utils.formatUnits(blackpurchased.claimedTime,0);
        let xtime = ethers.utils.formatUnits(blackpurchased.depositTime,0);
          if(rtime > 0){
            let s = parseInt(rtime) + parseInt(timeduration)
            setrewardtime(s)
        }
        else{
            let s = parseInt(xtime) + parseInt(timeduration)
            setrewardtime(s)
        }

        let daibalance = ethers.utils.formatUnits(await USDCContract.balanceOf(localStorage.getItem("walletAddress")),0);
          setdaiBlance(daibalance)  
          let Jokerbalance = ethers.utils.formatUnits(await JOKERContract.balanceOf(localStorage.getItem("walletAddress")),0);
          setJokerBlance(Jokerbalance)  


        let TrdimeBalance = ethers.utils.formatUnits(await TreasuryContract.getDimeBalance(),0)
        let TrUSDTBalance = ethers.utils.formatUnits(await TreasuryContract.getUsdtBalance(),0)

        let treasuryTotalValueinUSD = TrdimeBalance*dimeprice + TrUSDTBalance*usdcprice
        setTreasuryDollarvalue(treasuryTotalValueinUSD);
    
        //old one
  
          // Create contract instance with the correct order of arguments
        //   const JusdContract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
        //   const daiContract = new ethers.Contract(DAIAddress, DaiAbi, provider);
        //   const TresuryContract = new ethers.Contract(TreasuryAddress, TreasuryAbi, provider);
        //   const BondContract = new ethers.Contract(BondAddress, BondAbi, provider);

        //   let trasuryBlackBalance =  ethers.utils.formatUnits(await TresuryContract.getBlackBalance(TreasuryAddress),0);
        //   let blackprice =  ethers.utils.formatUnits(await JusdContract.black_price(),0);
        //   let daiprice = ethers.utils.formatUnits(await BondContract.getDAIPrice(),0);

        //   let timeduration = ethers.utils.formatUnits(await BondContract.timeDuration(),0);
        //   setTimeDuration(timeduration);
          
        //   let blackpurchased = await BondContract.users(localStorage.getItem("walletAddress"));

        //   settreasurBalance(trasuryBlackBalance);
        //   setblackPrice(blackprice);
        //   setdaiPrice(daiprice);
        //   setblackPurchased(blackpurchased);

        //   let allowance =  ethers.utils.formatUnits(await daiContract.allowance(localStorage.getItem("walletAddress"),BondAddress),0);
        //   console.log("allowance", allowance)
        //   setAllowance(allowance);

        //   let daibalance = ethers.utils.formatUnits(await daiContract.balanceOf(localStorage.getItem("walletAddress")),0);
        //   setdaiBlance(daibalance)  
        //   console.log("Bond",trasuryBlackBalance,blackprice,daiprice,blackpurchased)
        // //   let blackpurchased = ethers.utils.formatUnits
        
        // let rtime = ethers.utils.formatUnits(blackpurchased.claimedTime,0);
        // let xtime = ethers.utils.formatUnits(blackpurchased.depositTime,0);
        
        // if(rtime > 0){
        //     let s = parseInt(rtime) + parseInt(timeduration)
        //     setrewardtime(s)
        // }
        // else{
        //     let s = parseInt(xtime) + parseInt(timeduration)
        //     setrewardtime(s)
        // }
        




      }
    }

    // console.log("bond",blackPurchased.claimedAmount?ethers.utils.formatUnits(blackPurchased.claimedAmount,18) :0)
//     const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
// }

// const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

     const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Sepolia Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p>  
        </div>
    );

    

//         useEffect(async() => {
//             await TreasuryBalance()
//         }, [treasuryBalance]);        

// const TreasuryBalance = async () =>{
//     let balance = await algodClient.accountInformation("6ZJG2JCG2CAU7WAHEU5ZMFWIZGVNT65XZYVAOK4G7YHNHOCWBNXJTNCTYU").do();
//     // // console.log(balance['account']['assets'][0]['amount']);
//     setTreasuryBalance(parseFloat(balance['account']['assets'][0]['amount'])/1000000);
// }



                  






useEffect(async() => {
    await first()
}, [rewardtime]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const first = async () => {

    var us= rewardtime;
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
        
      console.log("date e", rewardtime,day);
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



     

// useEffect(async () => {
//     await elemRecv();
// }, [setElemGet]);






const connectToEthereum = async () => {
    try {
      if (window.ethereum) {
        let k = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("K",k)
        
        const web3= new ethers.providers.Web3Provider(window.ethereum);
        return web3;
      } else {
        throw new Error('No Ethereum wallet found.');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

const purchaseBond = async() =>{
    handleShowLoadPurchase();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const DimeContract = new ethers.Contract(DIMEAddress, DimeContractABI, web31.getSigner(account));

        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        const mintTx = await DimeContract.participateInBond(BigInt(parseInt(bondAmount)),BigInt(parseInt(JokerInput)));
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        await displayValueCalculation()
        toast.success("Bond purchased successfully");
        
        handleHideLoadPurchase();
        await sleep(1600);
    }catch(error){
        toast.error("Bond is not succeed",`${error}`);
        console.log("error",error)
        handleHideLoadPurchase();
    }
}

const approve = async() =>{
    handleShowLoadPurchase();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const USdcContract = new ethers.Contract(USDCAddress, USDCContractABI, web31.getSigner(account));

        const mintTx = await USdcContract.approve(DIMEAddress,BigInt(10000000000*1e9));
      
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        await sleep(2000);
        toast.success(toastDiv(id));
       
        await displayValueCalculation();
        toast.success("Approve is Done successfully");
        handleHideLoadPurchase();
    }catch(error){
        toast.error("Approve is not succeed",`${error}`);
        console.log("error",error)
        handleHideLoadPurchase();
    }

}

const approveJOKER = async() =>{
    handleShowLoadPurchase();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERCOntractABI, web31.getSigner(account));

        const mintTx = await JOKERContract.approve(DIMEAddress,BigInt(10000000000*1e9));
      
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        await sleep(2000);
        toast.success(toastDiv(id));
        
        await displayValueCalculation();
        toast.success("Approve is Done successfully");
        handleHideLoadPurchase();
    }catch(error){
        toast.error("Approve is not succeed",`${error}`);
        console.log("error",error)
        handleHideLoadPurchase();
    }

}

const claimWalletCheck = async () =>
{
    handleHideLoadClaim()
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const DimeContract = new ethers.Contract(DIMEAddress, DimeContractABI, web31.getSigner(account));

        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        const mintTx = await DimeContract.claim();
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        await sleep(2000);
        toast.success(toastDiv(id));
        await displayValueCalculation();
        toast.success("Claim  successfully");
        handleHideLoadClaim();
    }catch(error){
        toast.error("Claim is not succeed",`${error}`);
        console.log("error",error)
        handleHideLoadClaim();
    }
}

const changeInputValue = async(value) =>{
    setBondAmount(value*1e9);
    //blackvalue = ((1-cPercentage)*(daiAmount*daiPrice)) / (cPercentage*blackPrice)
    let calculatedValue = ((1-0.9)*(value*1e9*USDCPrice))/(0.9*JokerPrice);
    console.log("calculated",calculatedValue,Math.abs(calculatedValue)*JokerPrice,value*1e9*USDCPrice);
    setJokerInput((Math.abs(calculatedValue)));
    
}

    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
            <div className="d-flex mb-24 align-items-center justify-content-center">
                    <div>
                        <h6 className='sub-heading mb-0'>
                            Treasury Balance 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total USD worth of ELEM available for bond.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h3 className='mb-0 text-187'>${TreasuryDollarvalue ? (parseFloat(TreasuryDollarvalue/1e18) ).toFixed(4) : "0"}</h3>
                    </div>
                    {/* <div className='ms-sm-5 ms-4'>
                        <h6 className='sub-heading mb-0'>
                            BLACK Market Price
                            <OverlayTrigger
                                key="left"
                                placement="left"
                                overlay={
                                    <Tooltip id={`tooltip-left`}>
                                        ELEM asset price.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h3 className='mb-0 text-187'>${blackPrice ? (parseFloat((blackPrice/1e18)) ).toFixed(6) : "0"}</h3>
                    </div> */}
                </div>

                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={stasiscoin} alt="logo" />
                                <span className='ms-3'>DIME</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        ${dimePrice ? (parseFloat((dimePrice/1e8)) ).toFixed(4) : "0"}
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                     Price of  1 DIME asset
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        {/* ROI */}
                                    </h6>
                                    {/* <h5 className='mb-0 d-flex align-items-center'>
                                        20%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Return of Investment in percentage
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5> */}
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Total time required to claim all ELEM Assets
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        {ClaimedAmount?parseFloat(ClaimedAmount/1e9).toFixed(4) :0}
                                        <OverlayTrigger
                                key="left"
                                placement="left"
                                overlay={
                                    <Tooltip id={`tooltip-left`}>
                                        Total DIME purchased in bond represented .
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex flex-wrap justify-content-end align-items-center float-sm-end mt-1 mb-sm-0 mb-2 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z" fill="#CCCCCC"></path></svg>
                                    {/* <span className='ms-1 text-white'>View Contract</span> */}
                                </a>

                                {/* <h6 className='d-flex ms-md-4 ms-3 align-items-center d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you investment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>
                                
                                <h6 className='ms-md-4 ms-3 d-flex align-items-center mb-0'>
                                    <Link to="/faucet">USDC Faucet</Link>
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this USDC faucet <br/>You will be redirected to Faucet webpage. In Faucet you can obtain USDC asset. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   */}
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={3}>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{daiBlance ? (parseFloat(daiBlance)/1e9).toFixed(4) : '0'} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                            <Col> <div className="acc-title me-2 d-flex ">
                                <img src={USDC} alt="logo" />
                                {/* <span className='ms-3'>USDC</span> */}
                                    
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            // disabled={true}
                                                            // value={bondAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => changeInputValue(e.target.value)}
                                                        />
                                                        {/* <Button variant="outline-purple" className='btn-xs-d' onClick={maxButton}>Max</Button> */}
                                                    </InputGroup>
                                                    </div> 
                                                </Col>
{/*                                                 
                                                <Col xs="auto">
                                                {allowan > bondAmount ? <Button loading={loaderPurchase} className='btn btn-blue' onClick={purchaseBond}>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={approve}>
                                                    Approve DAI
                                                    </ButtonLoad>}
                                                </Col> */}
                                            </Row>
                                            {/* <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> {(parseFloat(bondAmount) / 2).toFixed(2) === 'NaN' || (parseFloat(bondAmount) / 2).toFixed(2) === null ? '0.00' : (parseFloat(bondAmount) / 2).toFixed(2)} ELEM</h6> 
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div> */}
                                        </Col>
                                        <Col md={3}>
                                            <h6><span className='text-sm text-gray-d'>Your JOKER Balance: </span>{JokerBlance ? (parseFloat(JokerBlance)/1e9).toFixed(4) : '0'} JOKER</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                            <Col> <div className="acc-title me-2 d-flex ">
                                <img src={jokercoin} alt="logo" />
                                {/* <span className='ms-3'>USDC</span> */}
                                    
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={JokerInput?parseFloat(JokerInput/1e9).toFixed(4):'0.0'}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            // onChange={(e) => JokerInput(e.target.value)}
                                                        />
                                                        {/* <Button variant="outline-purple" className='btn-xs-d' onClick={maxButton}>Max</Button> */}
                                                    </InputGroup>
                                                    </div> 
                                                </Col>
                                                
                                                
                                            </Row>
                                          
                                        </Col>
                                        <Col md={3}>
                                            {/* <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{daiBlance ? (parseFloat(daiBlance)/1e18).toFixed(4) : '0'} DAI</h6> */}
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                            
                                                
                                                <Col >
                                                <br/>
                                                {allowan > bondAmount ?( allowan2 > JokerInput ? 
                                                    (<><Button loading={loaderPurchase} className='btn btn-blue' onClick={purchaseBond}>
                                                        Purchase Bond
                                                    </Button></>) :
                                                    (<><ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={approveJOKER}>
                                                    Approve JOKER
                                                    </ButtonLoad></>) ):(<>
                                                        <ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={approve}>
                                                    Approve USDC
                                                    </ButtonLoad>
                                                    </>) }
                                                
                                                
                                                {/* allowan2 > bondAmount ? (<><Button loading={loaderPurchase} className='btn btn-blue' onClick={purchaseBond}>
                                                        Purchase Bond
                                                    </Button></>): <ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={approveJOKER}>
                                                    Approve JOKER
                                                    </ButtonLoad>:<ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={approve}>
                                                    Approve USDC
                                                    </ButtonLoad>} */}
                                                </Col>
                                            </Row>
                                          
                                        </Col>
                                        <Col md={3}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span> {UserReward?parseFloat(UserReward/1e9).toFixed(4) :0} DIME</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                              <Col>
{ClaimedTime ? 
(<>
{parseInt(UserReward) >1e4  ? 
  (<>
  {ClaimedTime > 0 ? 
                                                (<>
                                                {(parseInt(ClaimedTime)+parseInt(TimeDuration)) <= (Math.floor(new Date().getTime() / 1000)) ? (<>
                                                    <ButtonLoad loading={loaderClaim} className='btn w-100 btn-blue' onClick={claimWalletCheck}>Claim </ButtonLoad>
                                                </>):(<>
                                                
                                                    <ButtonLoad disabled={true} className='btn w-100 btn-blue' >Claim </ButtonLoad>
                                                </>)}
                                                </>):(<>
                                                {(parseInt(DepoitTime)+parseInt(TimeDuration)) <= (Math.floor(new Date().getTime() / 1000)) ? (<>
                                                    <ButtonLoad loading={loaderClaim} className='btn w-100 btn-blue' onClick={claimWalletCheck}>Claim </ButtonLoad>
                                                </>):(<>
                                                    <ButtonLoad disabled={true} className='btn w-100 btn-blue' >Claim </ButtonLoad>
                                                </>)}
                                                </>) }
  </>):(<>
    <ButtonLoad disabled={true} className='btn w-100 btn-blue' >Claim </ButtonLoad>
  </>)}  
  
</>):(<>
    <ButtonLoad disabled={true} className='btn w-100 btn-blue' >Claim </ButtonLoad>
</>)}
                                              
                                                {/* {ethers.utils.formatUnits(blackPurchased.userRewards,18) == true ? <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button> : appOpt == true && assetOpt == true  && bond != 0 && stable != 0 ? <ButtonLoad loading={loaderClaim} className='btn w-100 btn-blue' onClick={claimWalletCheck}>
                                                        Claim
                                                    </ButtonLoad> : <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>} */}
                                                </Col>
                                                <Col xs="auto">
                                                {/* {appOpt === false ? <><ButtonLoad loading={loaderAppOpt} className='btn w-40 btn-blue' onClick={appOptinWalletCheck}>
                                                        App Optin
                                                    </ButtonLoad>&nbsp;</> : <><Button disabled className='btn w-40 btn-blue'>
                                                        App Opted
                                                    </Button>&nbsp;</>}
                                                    {assetOpt === false ? <ButtonLoad loading={loaderAssetOpt} className='btn w-40 btn-blue' onClick={assetOptinWalletCheck}>
                                                        Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-40 btn-blue'>
                                                        Asset Opted
                                                    </Button></> } */}
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Your claimable rewards.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    {/* <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> {(parseFloat(bond)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(bond)/1000000).toFixed(2)} ELEM</h6> */}
                                                </div>
                                                <div className='ms-4'>
                                                    {rewardtime ? (<>
                                                        <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until for next claim</span> {lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<></>)} </h6>
                                                    </>):(<></>)}
                                                    
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item className='mb-24' eventKey="1">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>GMI - 1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mb-24' eventKey="3">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mb-24' eventKey="4">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>GMI - 1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mb-24' eventKey="8">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mb-24' eventKey="1">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>GMI - 1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body> 
                    </Accordion.Item>*/}
                </Accordion>
            </Container>
        </Layout>
    );
};

export default Bond;