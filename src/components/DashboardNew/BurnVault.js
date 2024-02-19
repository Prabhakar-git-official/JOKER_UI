import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import node from './nodeapi.json';
import dashboardDetails from '../Dashboard/stablecoin-only.json';
import config from '../../NFTFolder/config.json'
import axios from 'axios';
import USDC from '../../assets/images/usdc.jpg';
import AreaChartNFT from './snippets/AreaChartNFT'
import Logo from '../../assets/images/algorand-logo.png';
import { ethers } from 'ethers';

/* global BigInt */
import stasiscoin  from '../../assets/images/stasiscoin.png';
import { JOKERAddress,CREDITAddress,CreditcontractAbi,USDCAddress,USDCChainlinkAddress,USDCContractABI, JOKERABI2, JOKERCOntractABI,BlackAbi, BondAbi, BondAddress, CommunityWallet, DAIAddress, DIMEAddress, DaiAbi, DimeAbi, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress, TreasuryAddress,DIMEChainlinkAddress,CREDITChainlinkAddress,JOKERChainlinkAddress,ChainLinkABi,CreditpolicyAbi,CreditPolicyContractAddress,DimeContractABI,ECOReserveAddress,ECOReserveABI,BurnVaultAddress,BurnVaultABI2 } from '../../abi/abi';
import PieChart from './snippets/PieChartStable';
import BarChartTreasuryvalue from './snippets/BarChartTreasuryvalue';
import { Erc20TokenAddress, LaunchpadAddress, Erc20TokenAbi, LaunchpadAbi } from '../../abi/LaunchPadabi';
import jokercoin from '../../assets/images/Jokercoin.png';
import stasisTetrahedron from '../../assets/images/Statis Tetrahedron.png';

import ReactDomServer from 'react-dom/server';
import ButtonLoad from 'react-bootstrap-button-loader'

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
// const algosdk = require('algosdk');
const Dashboard = () => {

    const [show, setShow] = React.useState(false);
    const [showDonate, setShowDonate] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    

    const [address, setAddress] = React.useState(false);
    const [connector, setConnector] = useState("");
    const [accounts, setaccount] = useState("");
    let[startdt,setstartdt] = useState("");
    const[enddt,setenddt] = useState("");
    const[clsdt,setclsdt] = useState("");
    const[goal,setgoal] = useState("");
    const[total,settotal] = useState("");
    const[rec,setrec]= useState("");
    const[creator,setCreator]= useState("");
    const[escrow,setescrow]= useState("");
    const[appid,setappid]= useState("");
    const[percent,setPercent]= useState(parseFloat(""));
    const[date,setdate]= useState("");
    const[time,settime]= useState("");
    const[JokerInput,setJokerInput] = useState("");
    const[ETHInput,setETHInput] = useState("");
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState("");
    const[lockcheck,setchecklock]= useState("");
     

    const [assetOpt,setToAssetOpt] = useState(false);
    
    // const [show, setShow] = useState(false);
    const [value, setValue] = React.useState('');
    const [valueAddAddress, setValueAddAddress] = React.useState('');
    const [addrAddAddress, setValueAddrAddAddress] = React.useState('');
    const [algoBalance, setAlgoBalance] = useState("");
    const [elemBalance, setElemBalance] = useState("");
    const [algoDonated, setAlgoDonated] = useState("");
    const [jokerpriceinusd, setJokerPriceinUSD] = useState();
    
    const[Saibalance,setSaibalance] = useState();
    // const[TotalCount,setTotalCount] = useState();
    const[MyDeposit,setMyDeposit] = useState();
    const[TotalDeposit,setTotalDeposit] = useState()
    const[minimumStake, setMinimumStake] = useState(0.0001);
    const[startEpoch, setStartEpoch] = useState();
    const[endEpoch, setEndEpoch] = useState();
    const[isepochCalculated, setisepochCalculated] = useState(false);

    const [minAlgo, setMinAlgo] = useState("");

    const [maxta,setmaxt] = useState("");
    const [jokerBalance,setJokerbalance] = useState("");
    const [usdcbalance,setUSDCBlance] = useState("");
    
    const [circulatingbalance,setcirculatingbalance] = useState("");
    const [Jokervaultbalance,setJokerVaultBalance] = useState("");
    const [ethBalance, setEthBalance] = useState();
    const [burn,setburn] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    var[dis,setDis] = useState("");
    const[t11,setTim11 ] = useState("");
    const[t21,setTim21] = useState("");
    const[t31,setTim31 ] = useState("");
    const[t41,setTime41] = useState("");
    var [lct,setlct] = useState("");
    var [date1, setdate1]=useState("");
    var [time1, settime1]=useState("");
    const [lock1 ,setlock1]=useState("");
    const[allowan,setAllowance] = useState("")
    const [swapamountjoker, setswapAmountjoker] = useState("");
    
    const handleAssetFalse = () => setToAssetOpt(false);
    const handleAssetTrue = () => setToAssetOpt(true);


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
  const url = "https://goerli.infura.io/v3/b1a500c779c94f89bc791ca58b3f1601";
  const provider = new ethers.providers.JsonRpcProvider(url);

   const burnvaultContract =  new ethers.Contract(BurnVaultAddress,BurnVaultABI2,provider);
   // Create contract instance with the correct order of arguments
   const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, provider);
   const jokerpricedashboard = new ethers.Contract(JOKERChainlinkAddress,ChainLinkABi,provider);
   const USDCPriceContract = new ethers.Contract(USDCChainlinkAddress, ChainLinkABi, provider);
   const USDCContract = new ethers.Contract(USDCAddress, USDCContractABI, provider);

   useEffect(() => {
    walletBalance();
  //   profileImageFetch();
},[]);
    const walletBalance = async() => {

        console.log("balanceWei")
        
 
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
            console.log("NotbalanceWei")
        }
        else{
            let response = await fetch(`https://api-goerli.etherscan.io/api?module=account&action=balance&address=${localStorage.getItem("walletAddress")}&tag=latest`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              let balanceWei;
              const data = await response.json();
              if (data.status === '1') {
                balanceWei = data.result;
              } else {
                throw new Error('API response was not successful');
              }
              setEthBalance(parseFloat(balanceWei/1e18).toFixed(5))
            let Jokerbalance = ethers.utils.formatUnits(await JOKERContract.balanceOf(localStorage.getItem("walletAddress")),0);
       
            setJokerbalance(Jokerbalance);
            console.log("joker bal swap",Jokerbalance);
            let maxtx = ethers.utils.formatUnits(await burnvaultContract.maxTxAmount(),0)
            // let maxtx = await burnvaultContract.methods.maxTxAmount().call();
            setmaxt(maxtx);
            
         
            let jokervaultbalance = ethers.utils.formatUnits(await burnvaultContract.getBurnVaultBLACKBalance(),0)
            // let  jokervaultbalance = await burnvaultContract.methods.getBurnVaultBLACKBalance().call();
            setJokerVaultBalance(jokervaultbalance);

            // let usdcprice = ethers.utils.formatUnits(await USDCPriceContract.getChainlinkDataFeedLatestAnswer(),0);
           // let jokerPrice = 10 * 10e8;//for now it is given as 10$
            // setJokerPriceinUSD(jokerpricedashboard*10);

            let burnbalan = ethers.utils.formatUnits(await burnvaultContract.senderBurnBalance(localStorage.getItem("walletAddress")),0);
            
            let bb = maxta - burnbalan;
            console.log("bb",bb);
            setburn(Math.abs(bb/1e9));
            // let usdcbalance = ethers.utils.formatUnits(await USDCContract.balanceOf(localStorage.getItem("walletAddress")),0);
            // setUSDCBlance(usdcbalance)  
            // console.log("usdcbalance",usdcbalance)
              
            let checklock = await burnvaultContract.lock(localStorage.getItem("walletAddress"));
             setchecklock(checklock);
          
              let  loc = ethers.utils.formatUnits(await burnvaultContract.secondsLeft(localStorage.getItem("walletAddress")),0);
              console.log("loc",loc);
              setlct(loc);

              console.log("loc1",loc);
            //   var allowan = await blackcontract.methods.allowance(account[0],contracts.burnvault.address).call();
              let allowance =  ethers.utils.formatUnits(await JOKERContract.allowance(localStorage.getItem("walletAddress"),BurnVaultAddress),0);
              console.log("allowance", allowance)
              setAllowance(allowance);
            




         
        }
    
        

        
      }
     

   


    const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Sepolia Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p>  
        </div>
    );

useEffect(async() =>{await fetch()},[goal, startdt, enddt, total])

useEffect(async() => {
    await first()
}, [day, hour, min, sec, lock,lct]);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 const first = async () => {
    console.log("lasteporebase",lct);
        var us= lct;
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

    window.onload = () => {
        let reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
            popShow();
        }
    }

const popShow = async () => {
    handleShow();
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
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, web31.getSigner(account));
        //const mintTx = await JOKERContract.methods.approve(BurnVaultAddress,BigInt(10000000000*1e9)).send({from:localStorage.getItem("walletAddress")});
         const mintTx = await JOKERContract.approve(BurnVaultAddress,BigInt(10000000000*1e9));
      
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
        await walletBalance();
        await sleep(2000);
        toast.success(toastDiv(id));
       
        // await displayValueCalculation();
        toast.success("Approve is Done succeefully");
        handleHideLoadPurchase();
    }catch(error){
        toast.error("Approve is not succeed",`${error}`);
        console.log("error",error)
        handleHideLoadPurchase();
    }

}

const purchaseBond = async() =>{
            if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
                toast.warning(`please connect your wallet`,{autoClose: 5000});            
                // handleHideLoadParticipate()                     
              }
             
              else{        
            //   handleShowLoadParticipate(); 
              const web3 = await connectToEthereum();
              if (!web3) return;
      
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              const account = accounts[0]; // Use the first account
      
              console.log("Connected Successfully", account);
      
            //   // Create contract instance with the correct order of arguments
            const burnvaultcontract = new ethers.Contract(BurnVaultAddress, BurnVaultABI2, web3.getSigner(localStorage.getItem("walletAddress")));
      
         
            let maxtx = ethers.utils.formatUnits(await burnvaultContract.maxTxAmount(),0)
            let burnbalan = ethers.utils.formatUnits(await burnvaultContract.senderBurnBalance(localStorage.getItem("walletAddress")),0)
            
            // var burnbalan  = await burnvaultcontract.methods.senderBurnBalance(account[0]).call();
            var bb = maxtx - burnbalan;
            console.log(bb);
            var burnab1=(bb);                
      
            //   const val = 10000000000000;
            const val = swapamountjoker;
            console.log("valcheck",val,maxtx);
   //alert(maxtx);
   if(val<=  maxtx){
    console.log("valcheck",val);
    if( val <= burnab1){
        let amount = val;
        console.log("amountcheck",amount);
        const depositTx =await burnvaultcontract.swap(amount,{gasLimit:3000000});
        
        await depositTx.wait();
       toast.success("Swapped successfully",{autoClose: 5000}); 
            //   let id = "https://testnet.algoexplorer.io/tx/" + txId;
            //   toast.success(toastDiv(id));
              // setMinStart(true)
            await walletBalance();
            //   handleHideLoadParticipate() ;
            //   handleCloseDonate();
  
    //  bvb();
    }
    else{
        toast.error("Swap Failed",{autoClose: 5000}); 
      }
    }
  
  
  else{
  
    toast.error("The amount you entered must be less than the Maximum Transcation amount",{autoClose: 5000}); 
      
  }
            
            
        }   
}

const changeInputValue = async(value) =>{
    console.log("value2",value*2);
    setETHInput(value*2);
    let swapAmount=value*1e9;
    setswapAmountjoker(swapAmount);
      console.log("valuej",swapamountjoker)

    let circulate = ethers.utils.formatUnits(await burnvaultContract.getCirculatingSupply(),9)
    let usdcbalanceincontract = ethers.utils.formatUnits(await USDCContract.balanceOf(BurnVaultAddress),9);
   
    let tokenPerUSDT = (circulate / usdcbalanceincontract);
     
    //   uint256 totalUSDT = (_tokenAmount.div(tokenPerUSDT)).mul(1e9);
       let calculatedValue = (swapAmount / tokenPerUSDT);
       console.log("calculated value",calculatedValue);
    // let calculatedValue = ((1-0.9)*(value*1e9*USDCPrice))/(0.9*JokerPrice);
    // console.log("calculated",calculatedValue,Math.abs(calculatedValue)*JokerPrice,value*1e9*USDCPrice);
    setJokerInput(calculatedValue);
    
    
}


    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
            <div className="d-flex mb-24 align-items-center justify-content-center">
                    <div>
                        <h6 className='sub-heading mb-0'>
                            Joker Balance 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total Joker available in Burnvault.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h3 className='mb-0 text-187'>${Jokervaultbalance ? (parseFloat(Jokervaultbalance/1e9) ) : "0"}</h3>
                    </div>
                   
                </div>

                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={jokercoin} alt="logo" />
                                <span className='ms-3'>Joker</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Joker Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    ${parseFloat(jokerpriceinusd/1e8)?parseFloat(jokerpriceinusd/1e8):"0"}
                                        {/* ${jokerpriceinusd ? (parseFloat((jokerpriceinusd/1e8)) ).toFixed(4) : "0"} */}
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
                                    
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Max Txn Limit
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {maxta?parseFloat(maxta/1e9).toFixed(4) :0}
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                  Maximum Transaction Limit 
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Available Swap Limit
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        {burn?parseFloat(burn).toFixed(4) :0}
                                        <OverlayTrigger
                                key="left"
                                placement="left"
                                overlay={
                                    <Tooltip id={`tooltip-left`}>
                                       Available Swap Limit
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
                                <a href={'https://sepolia.etherscan.io/address/' + BurnVaultAddress} rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z" fill="#CCCCCC"></path></svg>
                                    {/* <span className='ms-1 text-white'>View Contract</span> */}
                                </a>

                                
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="BurnVault">
                                    <Row className='row-divider'>
                                    <Col md={3}>

                                            <h6><span className='text-sm text-gray-d'>Your JOKER Balance: </span>{jokerBalance ? (parseFloat(jokerBalance)/1e9).toFixed(4) : '0'} JOKER</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                            <Col> <div className="acc-title me-2 d-flex ">
                                <img src={jokercoin} alt="logo" />
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
                                                
                                                
                                            </Row>
                                          
                                        </Col>
                                        <Col md={3}>
                                            <h6><span className='text-sm text-gray-d'>Your ETH Balance: </span>{ethBalance ? (parseFloat(ethBalance)).toFixed(4) : '0.00'} ETH</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                            <Col> <div className="acc-title me-2 d-flex ">
                                <img src={USDC} alt="logo" />
                                {/* <span className='ms-3'>USDC</span> */}
                                    
                                <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            // disabled={true}
                                                            readOnly={true}
                                                            value={ETHInput?parseFloat(ETHInput).toFixed(4):'0.00'}
                                                            type='number'
                                                            // placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        
                                                        />
                                                        {/* <Button variant="outline-purple" className='btn-xs-d' onClick={maxButton}>Max</Button> */}
                                                    </InputGroup>
                                                    </div> 
                                                </Col>

                                            </Row>
                                          
                                        </Col>
                                      
                                        <Col md={3}>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                            
                                                
                                                <Col >
                                                <br/>
                                                {allowan > swapamountjoker ? (
  <Button loading={loaderPurchase} className='btn btn-blue' onClick={purchaseBond}>
    Swap Joker
  </Button>
) : (
  <ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={approveJOKER}>
    Approve JOKER
  </ButtonLoad>
)}
                                                
                                           
                                                </Col>
                                            </Row>
                                          
                                        </Col>
                                        {lockcheck ?(
                                        <Col md={3}>

                                            <h6><span className='text-sm text-gray-d'>Time left for Swap </span>  </h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                              <Col>                                
                                              <h4 className='mb-2'>{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>00d:00h:00m:00s</>)}</h4>

                                                </Col>
                                                <Col xs="auto">
                                              
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                           YOU NEED TO WAIT FOR DEPOSIT  TILL THIS TIME
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
                                            
                                            </div>
                                        </Col>
                                         ):(<>
                                             <Col md={3}>

<h6><span className='text-sm text-gray-d'>Time left for Swap </span>  </h6>
<Row className='flex-nowrap align-items-center mb-2 gx-3'>
  <Col>                                
  <h4 className='mb-2'>Wallet Not Locked</h4>

    </Col>
    <Col xs="auto">
  
    </Col>
    <Col xs="auto">
    <OverlayTrigger
        key="left"
        placement="left"
        overlay={
            <Tooltip id={`tooltip-left`}>
             Wallet Not locked
            </Tooltip>
        }
        >
            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
        </OverlayTrigger>
    </Col>
   
</Row>

</Col>   
                                            </>)}
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    
                </Accordion>
            </Container>
        </Layout>
    );
};

export default Dashboard;