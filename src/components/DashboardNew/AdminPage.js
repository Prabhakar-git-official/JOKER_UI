import React, {useState, useEffect} from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import ButtonLoad from 'react-bootstrap-button-loader';
import AreaChart from './snippets/AreaChart';
import AreaChartTau from './snippets/AreaChartTau';
import AreaChartasaswap from './snippets/AreaChartASAswap';
import AreaChartMintFeeTau from './snippets/AreaChartMintFeeTau';
import AreaChartEinr from './snippets/BarChartMarketcap';
import AreaChartElemReserve from './snippets/AreaChartElemReserve';
import AreaChartMintFeeEinr from './snippets/AreaChartMintFeeEinr';
import AreaChartRedeemFee from './snippets/AreaChartRedeemFee';
import AreaChartTauCollateral from './snippets/AreaChartTauCollateral';
import AreaChartEinrCollateral from './snippets/AreaChartEinrCollateral';
import LineChart from './snippets/LineChart';
import PieChartElem from './snippets/PieChartStable';
import PieChartTau from './snippets/PieChartStable';
import PieChartEinr from './snippets/PieChartStable';
import node from './nodeapi.json';
import dashboardDetails from '../Dashboard/stablecoin-only.json';
import config from '../../NFTFolder/config.json'
import axios from 'axios';
import { elemToken } from '../swapConfig';
import AreaChartNFT from './snippets/AreaChartNFT'
import Logo from '../../assets/images/algorand-logo.png';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import { ethers } from 'ethers';
import { BLACKAddress, BlackAbi, BondAbi, BondAddress, CommunityWallet, DAIAddress, DIMEAddress, DaiAbi, DimeAbi, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress, TreasuryAddress } from '../../abi/abi';
/* global BigInt */

const algosdk = require('algosdk');
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

  

    const [JusdPrice, setJusdPrice] = useState("");
    const [DimePrice, setDimePrice] = useState("");
    const [BlackPrice, setBlackPrice] = useState("");
    const [Colratio, setColratio] = useState("");


    const [TrDaiBalance, setTrDaiBalance] = useState("");
    const [TrDimeBalance, setTrDimeBalance] = useState("");
    const [TrBlackBalance, setTrBlackBalance] = useState("");
    const [ComDimeBalance, setComDimeBalance] = useState("");
    const [nextrebasetime, setnextrebasetime] = useState("");

    const[timecf,settime]= useState("");
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const[date,setdate]= useState("");

    const[loaderPurchase, setLoaderPurchase] = useState(false);

    const handleShowLoadPurchase = () => setLoaderPurchase(true);
    const handleHideLoadPurchase = () => setLoaderPurchase(false);

    
    const[loaderPurchase1, setLoaderPurchase1] = useState(false);

    const handleShowLoadPurchase1 = () => setLoaderPurchase1(true);
    const handleHideLoadPurchase1 = () => setLoaderPurchase1(false)
    const [bondAmount, setBondAmount] = useState("");



    const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
    
        const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
        const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

        const tauID = dashboardDetails.tauID;
        const einrID = dashboardDetails.einrID;
        const elemID = dashboardDetails.elemID;
        const usdcID = dashboardDetails.usdcID;
        const tauTotalSupply = 18446744073709.551615;
        const elemTotalSupply = 18446744073709.551615;
        const einrTotalSupply = 18446744073709.551615;

    useEffect(async() => {
        await cir();
    }, []);

    const cir =async () =>
    {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const jusdpoolcontract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
        let jusdprice =  ethers.utils.formatUnits(await jusdpoolcontract.getFRAXPrice(),6);
        let dimeprice =  ethers.utils.formatUnits(await jusdpoolcontract.getFXSPrice(),6);
        let blackprice =  ethers.utils.formatUnits(await jusdpoolcontract.getBLACKPrice(),6);
        const jusdcontract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
        let collratio =  ethers.utils.formatUnits(await jusdcontract.global_collateral_ratio(),6);
        setJusdPrice(jusdprice);
        setDimePrice(dimeprice);
        setBlackPrice(blackprice);
        setColratio(collratio);

        const daicontract = new ethers.Contract(DAIAddress, DaiAbi, provider);
        const dimecontract = new ethers.Contract(DIMEAddress, DimeAbi, provider);
        const blackcontract = new ethers.Contract(BLACKAddress, BlackAbi, provider);

        let trdaiBalance = ethers.utils.formatUnits(await daicontract.balanceOf(TreasuryAddress),18);
        let trdimeBalance = ethers.utils.formatUnits(await dimecontract.balanceOf(TreasuryAddress),18);
        let trblackBalance = ethers.utils.formatUnits(await blackcontract.balanceOf(TreasuryAddress),9);
        let communitydimeBalance = ethers.utils.formatUnits(await dimecontract.balanceOf(CommunityWallet),18);

        setTrDaiBalance(trdaiBalance);
        setTrDimeBalance(trdimeBalance);
        setTrBlackBalance(trblackBalance);
        setComDimeBalance(communitydimeBalance);

        const Bondcontract = new ethers.Contract(BondAddress, BondAbi, provider);
        let lastepoch = ethers.utils.formatUnits(await Bondcontract.lastEpoch(),0);
        let epochhours = ethers.utils.formatUnits(await Bondcontract.epochHours(),0);
       
        let added = parseInt(lastepoch) + parseInt(epochhours)
        console.log("lastepoch",lastepoch,epochhours,added)
        setnextrebasetime(added)





    }

    useEffect(async() => {
        await first()
    }, [nextrebasetime]);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
    
    const first = async () => {
    
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
            const jusdcontract = new ethers.Contract(JUSDAddress, JUSDAbi, web31.getSigner(account));
    
            // const val = ethers.utils.formatUnits(100000000000000, 0);
            // let k = Web3.utils.toBN(1000000000000000000n);
            // const val11 = ethers.utils.formatUnits(100000000000000, 18);
            // const val1 =  ethers.utils.parseUnits(val11, 18);;
            // Send the transaction and wait for it to be mined
            const mintTx = await jusdcontract.freezeToken(true);
            // await mintTx.wait();
            console.log("minttx",mintTx.hash);
            // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
            let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
            toast.success(toastDiv(id));
            toast.success("JUSD Freezed succeefully");
            // await displayValueCalculation()
            handleHideLoadPurchase();
            await sleep(1600);
        }catch(error){
            toast.error("Freezed is not succeed",`${error}`);
            console.log("error",error)
            handleHideLoadPurchase();
        }
    }
    const freezeAddress = async() =>{
        handleShowLoadPurchase1();
        try{
            const web31 = await connectToEthereum();
            if (!web31) return;
    
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]; // Use the first account
    
            console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const jusdcontract = new ethers.Contract(JUSDAddress, JUSDAbi, web31.getSigner(account));
    
            // const val = ethers.utils.formatUnits(100000000000000, 0);
            // let k = Web3.utils.toBN(1000000000000000000n);
            // const val11 = ethers.utils.formatUnits(100000000000000, 18);
            // const val1 =  ethers.utils.parseUnits(val11, 18);;
            // Send the transaction and wait for it to be mined
            const mintTx = await jusdcontract.freezeWallet(bondAmount,true);
            // await mintTx.wait();
            console.log("minttx",mintTx.hash);
            // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
            let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
            toast.success(toastDiv(id));
            toast.success("JUSD Freezed succeefully");
            // await displayValueCalculation()
            handleHideLoadPurchase1();
            await sleep(1600);
        }catch(error){
            toast.error("Freezed is not succeed",`${error}`);
            console.log("error",error)
            handleHideLoadPurchase1();
        }
    }

    const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algo Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p>  
        </div>
    );
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Freeze Token
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
                                    JUSD
                                </h6>
                                <br/>
                                {/* <h4 className='mb-2'>{Colratio?Colratio:"0"}%</h4> */}
                                { localStorage.getItem("walletAddress") === "0xd72558ab56489747360657ab4802176ce18b49e5"  ? <ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={purchaseBond} >
                                                       Freeze JUSD
                                                    </ButtonLoad>:<ButtonLoad disabled={true} className='btn btn-blue'>Freeze JUSD
                                                    </ButtonLoad>}
                            </div>                      
                        </Card>
                       
                       

                        

                    </Col>
                    <Col md={6}>
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Freeze Wallet Address
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
                                  Enter address to Freeze JUSD
                                </h6>
                                <br/>
                                <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={bondAmount}
                                                            type='text'
                                                            placeholder="address"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => setBondAmount(e.target.value)}
                                                        />
                                                        {/* <Button variant="outline-purple" className='btn-xs-d' onClick={maxButton}>Max</Button> */}
                                                    </InputGroup>
                                                    <br/>
                                {/* <h4 className='mb-2'>{Colratio?Colratio:"0"}%</h4> */}
                                { localStorage.getItem("walletAddress") === "0xd72558ab56489747360657ab4802176ce18b49e5"  ? <ButtonLoad loading={loaderPurchase1} className='btn btn-blue' onClick={freezeAddress} >
                                                       Freeze  JUSD
                                                    </ButtonLoad>:<ButtonLoad disabled={true} className='btn btn-blue'>Freeze JUSD
                                                    </ButtonLoad>}
                            </div>                      
                        </Card>
                      

                         

                        
                      
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Dashboard;