import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import { updatealgobalance } from "../formula";

import ButtonLoad from 'react-bootstrap-button-loader';
import USDC from '../../assets/images/usdc.jpg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Logo from '../../assets/images/modal-logo.png';
import Arrow from '../../assets/images/arrow-tr.svg';
import ModalSquareLogo from '../../assets/images/modal-square-logo.png';
import faucetDetails from "../Dashboard/stablecoin-only.json";
import node from "./nodeapi.json"
import elemLogo from '../../assets/images/elem-original.png';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
import usdtLogo from '../../assets/images/usdtimg.png';
import jokercoin from '../../assets/images/Jokercoin.png';
import stasiscoin  from '../../assets/images/stasiscoin.png';
import creditscoin from '../../assets/images/creditscoin.png';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { CREDITAddress, CreditcontractAbi, DIMEAddress, DimeContractABI, FaucetAddress, FaucetContractABI, JOKERAddress, JOKERCOntractABI, TreasuryAddress, TreasuryContractABI, USDCAddress, USDCContractABI } from '../../abi/abi';
import { ethers } from 'ethers';
/* global BigInt */

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";
const Faucet = () => {

    useEffect(() => {
        document.title = "ELEMENT | Faucet"
    }, [])

    const[appTotal,setAppTotal] = useState("");

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

    //ELEM
    const[loaderElemAssetOpt, setLoaderElemAssetOpt] = useState(false);

    const handleShowLoadElemAssetOpt = () => setLoaderElemAssetOpt(true);
    const handleHideLoadElemAssetOpt = () => setLoaderElemAssetOpt(false);

    //TAU
    const[loaderTauAssetOpt, setLoaderTauAssetOpt] = useState(false);

    const handleShowLoadTauAssetOpt = () => setLoaderTauAssetOpt(true);
    const handleHideLoadTauAssetOpt = () => setLoaderTauAssetOpt(false);
    //EINR
    const[loaderEinrAssetOpt, setLoaderEinrAssetOpt] = useState(false);

    const handleShowLoadEinrAssetOpt = () => setLoaderEinrAssetOpt(true);
    const handleHideLoadEinrAssetOpt = () => setLoaderEinrAssetOpt(false);

    //USDT
    const[loaderUsdtAssetOpt, setLoaderUsdtAssetOpt] = useState(false);

    const handleShowLoadUsdtAssetOpt = () => setLoaderUsdtAssetOpt(true);
    const handleHideLoadUsdtAssetOpt = () => setLoaderUsdtAssetOpt(false);

    const[loaderUsdcFund, setLoaderUsdcFund] = useState(false);

    const handleShowLoadUsdcFund = () => setLoaderUsdcFund(true);
    const handleHideLoadUsdcFund = () => setLoaderUsdcFund(false);

    //ELEM
    const[loaderElemFund, setLoaderElemFund] = useState(false);

    const handleShowLoadElemFund = () => setLoaderElemFund(true);
    const handleHideLoadElemFund = () => setLoaderElemFund(false);

    //TAU
    const[loaderTauFund, setLoaderTauFund] = useState(false);

    const handleShowLoadTauFund = () => setLoaderTauFund(true);
    const handleHideLoadTauFund = () => setLoaderTauFund(false);

    //EINR
    const[loaderEinrFund, setLoaderEinrFund] = useState(false);

    const handleShowLoadEinrFund = () => setLoaderEinrFund(true);
    const handleHideLoadEinrFund = () => setLoaderEinrFund(false);

    //USDT
    const[loaderUsdtFund, setLoaderUsdtFund] = useState(false);

    const handleShowLoadUsdtFund = () => setLoaderUsdtFund(true);
    const handleHideLoadUsdtFund = () => setLoaderUsdtFund(false);

    const [bondBalance, setBondBalance] = useState([]);
    const [appOpt,setToAppOpt] = useState(false);
    const [elemAssetOpt,setToElemAssetOpt] = useState(false);
    const [usdcAssetOpt,setToUsdcAssetOpt] = useState(false);
    const [tauAssetOpt,setToTauAssetOpt] = useState(false);
    const [einrAssetOpt,setToEinrAssetOpt] = useState(false);
    const [usdtAssetOpt,setToUsdtAssetOpt] = useState(false);

    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [tauBalances, setTauBalances] = useState("");
    const [einrBalances, setEinrBalances] = useState("");
    const [usdtBalances, setUsdtBalances] = useState("");
    const [bondAmount, setBondAmount] = useState("");
    const [minAlgo, setMinAlgo] = useState("");
    const [connector, setConnector] = useState("");

    
    const [usdcBlance, setusdcBlance] = useState("");    
    const [JokerBlance, setJokerBlance] = useState("");    
    const [DimeBlance, setDimeBlance] = useState("");
    const [CreditBlance, setCreditBlance] = useState("");
    //console.log("mapSet", map1);
    // let appId = setappid(46584645);

    let appID_global = parseInt(faucetDetails.bondAppID);
    let usdcID = parseInt(faucetDetails.usdcID);
    let elemID = parseInt(faucetDetails.elemID);
    let tauID = parseInt(faucetDetails.tauID);
    let einrID = parseInt(faucetDetails.einrID);
    let usdtID = parseInt(faucetDetails.usdtID);

//     const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
// }

// const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');

    const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

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

    useEffect(()=>{displayValueCalculation()},[])

    const displayValueCalculation = async() =>{
      if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
      }
      else{
          console.log("useeffect")
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          // console.log("Connected Successfully", account);
        //new code

        const FaucetContract = new ethers.Contract(FaucetAddress, FaucetContractABI, provider);
        
        const DimeContract = new ethers.Contract(DIMEAddress, DimeContractABI, provider);
        const USDCContract = new ethers.Contract(USDCAddress, USDCContractABI, provider);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryContractABI, provider);
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERCOntractABI, provider);
        const CreditContract = new ethers.Contract(CREDITAddress, CreditcontractAbi, provider);
        

        let daibalance = ethers.utils.formatUnits(await USDCContract.balanceOf(localStorage.getItem("walletAddress")),0);
          setusdcBlance(daibalance)  
          let Jokerbalance = ethers.utils.formatUnits(await JOKERContract.balanceOf(localStorage.getItem("walletAddress")),0);
          setJokerBlance(Jokerbalance)  
          let Dimebalance = ethers.utils.formatUnits(await DimeContract.balanceOf(localStorage.getItem("walletAddress")),0);
          setDimeBlance(Dimebalance) 
          let Creditbalance = ethers.utils.formatUnits(await CreditContract.balanceOf(localStorage.getItem("walletAddress")),0);
          setCreditBlance(Creditbalance) 





      }
    }

    const waitForConfirmation = async function (client, txId) {
        let status = (await client.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await client.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
            //   console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            // toast.success(`Transaction ${txId} is successful and confirmed in round ${pendingInfo["confirmed-round"]}`);
            let id = "https://testnet.algoexplorer.io/tx/" + txId;
            toast.success(toastDiv(id));
            handleHideLoadAssetOpt();
            handleHideLoadElemAssetOpt();
            handleHideLoadTauAssetOpt();
            handleHideLoadEinrAssetOpt();
            handleHideLoadUsdtAssetOpt();

            handleHideLoadUsdcFund();
            handleHideLoadElemFund();
            handleHideLoadTauFund();
            handleHideLoadEinrFund();
            handleHideLoadUsdtFund();
            await updatealgobalance();
            // await sleep(5000);
            // reload();  
            break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  

//asset optin code
const OptInUsdc = async () => {
    handleShowLoadAssetOpt();
    if(localStorage.getItem("userType") === "login")
    {
    let settings = {
        shouldSelectOneAccount: true,
        openManager: true
    }
    let account = await myAlgoWallet.connect(settings);
        if (account[0].address != localStorage.getItem("walletAddress"))
        {
            toast.error(`Select this address ${localStorage.getItem("walletAddress")}`);
            handleHideLoadAssetOpt();
        }
    }
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadAssetOpt();
            }
            else
            {
  
  let params = await algodClient.getTransactionParams().do();
  
  try {

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams: params,
        from: localStorage.getItem("walletAddress"),
        to: localStorage.getItem("walletAddress"),
        amount: 0,
        assetIndex: usdcID
    });

    const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    //toast.success(`Transaction Success ${response.txId}`);
    await waitForConfirmation(algodClient, response.txId);
    setToUsdcAssetOpt(true);
    // await minBal();
}
catch (err) {
    handleHideLoadAssetOpt();
    toast.error(err.toString());
    console.error(err);

}
        }
    }
}

const OptInElem = async () => {
    handleShowLoadElemAssetOpt();
    if(localStorage.getItem("userType") === "login")
    {
    let settings = {
        shouldSelectOneAccount: true,
        openManager: true
    }
    let account = await myAlgoWallet.connect(settings);
        if (account[0].address != localStorage.getItem("walletAddress"))
        {
            toast.error(`Select this address ${localStorage.getItem("walletAddress")}`);
            handleHideLoadElemAssetOpt();
        }
    }
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadElemAssetOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadElemAssetOpt();
            }
            else
            {
  
  let params = await algodClient.getTransactionParams().do();
  
  try {

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams: params,
        from: localStorage.getItem("walletAddress"),
        to: localStorage.getItem("walletAddress"),
        amount: 0,
        assetIndex: elemID
    });

    const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    //toast.success(`Transaction Success ${response.txId}`);
    await waitForConfirmation(algodClient, response.txId);
    setToElemAssetOpt(true);
    // await minBal();
}
catch (err) {
    handleHideLoadElemAssetOpt();
    toast.error(err.toString());
    console.error(err);

}
        }
    }
}

const OptInTau = async () => {
    handleShowLoadTauAssetOpt();
    if(localStorage.getItem("userType") === "login")
    {
    let settings = {
        shouldSelectOneAccount: true,
        openManager: true
    }
    let account = await myAlgoWallet.connect(settings);
        if (account[0].address != localStorage.getItem("walletAddress"))
        {
            toast.error(`Select this address ${localStorage.getItem("walletAddress")}`);
            handleHideLoadTauAssetOpt();
        }
    }
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadTauAssetOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadTauAssetOpt();
            }
            else
            {
  
  let params = await algodClient.getTransactionParams().do();
  
  try {

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams: params,
        from: localStorage.getItem("walletAddress"),
        to: localStorage.getItem("walletAddress"),
        amount: 0,
        assetIndex: tauID
    });

    const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    //toast.success(`Transaction Success ${response.txId}`);
    await waitForConfirmation(algodClient, response.txId);
    setToTauAssetOpt(true);
    // await minBal();
}
catch (err) {
    handleHideLoadTauAssetOpt();
    toast.error(err.toString());
    console.error(err);

}
        }
    }
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

//Dispenser code        

const usdcFund = async () =>
{
    handleShowLoadUsdcFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadUsdcFund();
        }
        else{

// console.log("Escrow =", lsigusdcFund.address());

try {

    const web31 = await connectToEthereum();
    if (!web31) return;

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // Use the first account

    console.log("Connected Successfully", account);

    // Create contract instance with the correct order of arguments
    const FaucetContract = new ethers.Contract(FaucetAddress, FaucetContractABI, web31.getSigner(account));

    const mintTx = await FaucetContract.dispense("USDC");
  
    // await mintTx.wait();
    console.log("minttx",mintTx.hash);
    // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
    let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
    await sleep(2000);
    toast.success(toastDiv(id));
    
    await displayValueCalculation();
    toast.success("Dispense is Done succeefully");
    handleHideLoadUsdcFund()
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadUsdcFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}

const elemFund = async () =>
{
    handleShowLoadElemFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadElemFund();
        }
        else{


try {

    const web31 = await connectToEthereum();
    if (!web31) return;

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // Use the first account

    console.log("Connected Successfully", account);

    // Create contract instance with the correct order of arguments
    const FaucetContract = new ethers.Contract(FaucetAddress, FaucetContractABI, web31.getSigner(account));

    const mintTx = await FaucetContract.dispense("DIME");
  
    // await mintTx.wait();
    console.log("minttx",mintTx.hash);
    // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
    let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
    await sleep(2000);
    toast.success(toastDiv(id));
    
    await displayValueCalculation();
    toast.success("Dispense is Done succeefully");
    handleHideLoadElemFund();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadElemFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}


const tauFund = async () =>
{
    handleShowLoadTauFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadTauFund();
        }
        else{


try {

    const web31 = await connectToEthereum();
    if (!web31) return;

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // Use the first account

    console.log("Connected Successfully", account);

    // Create contract instance with the correct order of arguments
    const FaucetContract = new ethers.Contract(FaucetAddress, FaucetContractABI, web31.getSigner(account));

    const mintTx = await FaucetContract.dispense("CREDIT");
  
    // await mintTx.wait();
    console.log("minttx",mintTx.hash);
    // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
    let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
    await sleep(2000);
    toast.success(toastDiv(id));
    
    await displayValueCalculation();
    toast.success("Dispense is Done succeefully");
    handleHideLoadTauFund();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadTauFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}

const einrFund = async () =>
{
    handleShowLoadEinrFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadEinrFund();
        }
        else{

try {

    const web31 = await connectToEthereum();
    if (!web31) return;

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // Use the first account

    console.log("Connected Successfully", account);

    // Create contract instance with the correct order of arguments
    const FaucetContract = new ethers.Contract(FaucetAddress, FaucetContractABI, web31.getSigner(account));

    const mintTx = await FaucetContract.dispense("JOKER");
  
    // await mintTx.wait();
    console.log("minttx",mintTx.hash);
    // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
    let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
    await sleep(2000);
    toast.success(toastDiv(id));
    
    await displayValueCalculation();
    toast.success("Dispense is Done succeefully");
    handleHideLoadEinrFund();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadEinrFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}










const usdcFundWalletCheck = async () =>
{
    // if(localStorage.getItem("walletName") === "myAlgoWallet")
    // {
        await usdcFund();
    // }
    // else if(localStorage.getItem("walletName") === "PeraWallet")
    // {
    //     await usdcFundPera();
    // }
}

const elemFundWalletCheck = async () =>
{
    // if(localStorage.getItem("walletName") === "myAlgoWallet")
    // {
        await elemFund();
    // }
    // else if(localStorage.getItem("walletName") === "PeraWallet")
    // {
    //     await elemFundPera();
    // }
}

const tauFundWalletCheck = async () =>
{
    // if(localStorage.getItem("walletName") === "myAlgoWallet")
    // {
        await tauFund();
    // }
    // else if(localStorage.getItem("walletName") === "PeraWallet")
    // {
    //     await tauFundPera();
    // }
}

const einrFundWalletCheck = async () =>
{
    // if(localStorage.getItem("walletName") === "myAlgoWallet")
    // {
        await einrFund();
    // }
    // else if(localStorage.getItem("walletName") === "PeraWallet")
    // {
    //     await einrFundPera();
    // }
}



    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
            <div className="d-flex mb-24 align-items-center justify-content-center">
                    <div>
                        <h3 className='mb-0 text-187'>
                            Faucet 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Assets required to test our ecosystem is available here.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h3>
                        {/* <h3 className='mb-0 text-187'>${(parseFloat(bondBalance) / 3).toFixed(2)}</h3> */}
                    </div>
                    {/* <div className='ms-sm-5 ms-4'>
                        <h6 className='sub-heading mb-0'>
                            ELEM Market Price
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
                        <h3 className='mb-0 text-187'>$3.00</h3>
                    </div> */}
                </div>

                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 USDC
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of USDC asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(usdcBlance)/1e9).toFixed(2) === 'NaN' || (parseFloat(usdcBlance)/1e9).toFixed(2) === null ? '0.00' : (parseFloat(usdcBlance)/1e9).toFixed(2)} USDC
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's USDC balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
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
                                                    Total time required to claim all ELEM asset
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
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="USDC Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                {/* <Col xs="auto">
                                                    {usdcAssetOpt === false ? <ButtonLoad loading={loaderAssetOpt} className='btn w-100 btn-blue' onClick={() => usdcWalletCheck()}>
                                                        USDC Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-100 btn-blue'>
                                                        USDC Asset Opted
                                                    </Button></> }
                                                </Col> */}
                                                <Col>
                                                <ButtonLoad loading={loaderUsdcFund} className='btn w-20 btn-blue' onClick={() => usdcFundWalletCheck()}>
                                                        Dispense 
                                                    </ButtonLoad>
                                                </Col>
                                                {/* <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense USDC.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col> */}
                                            </Row>
                                           
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className='mb-24' eventKey="1">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={stasiscoin} alt="logo" />
                                <span className='ms-3'>DIME</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 DIME
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of DIME asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(DimeBlance)/1e9).toFixed(2) === 'NaN' || (parseFloat(DimeBlance)/1e9).toFixed(2) === null ? '0.00' : (parseFloat(DimeBlance)/1e9).toFixed(2)} DIME
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's DIME balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
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
                                                    Total time required to claim all ELEM asset
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
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="DIME Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            {/* <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>{(parseFloat(stable)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(stable)/1000000 * 20 / 100).toFixed(2)} ELEM</h6> */}
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                
                                                <Col>
                                                <ButtonLoad loading={loaderElemFund} className='btn w-20 btn-blue' onClick={() => elemFundWalletCheck()}>
                                                        Dispense 
                                                    </ButtonLoad>
                                                </Col>
                                                
                                            </Row>
                                            {/* <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> {(parseFloat(bond)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(bond)/1000000).toFixed(2)} ELEM</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span> {lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<></>)} </h6>
                                                </div>
                                            </div> */}
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className='mb-24' eventKey="2">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={creditscoin} alt="logo" />
                                <span className='ms-3'>CREDITS</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 CREDITS
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of CREDIT asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(CreditBlance)/1e9).toFixed(2) === 'NaN' || (parseFloat(CreditBlance)/1e9).toFixed(2) === null ? '0.00' : (parseFloat(CreditBlance)/1e9).toFixed(2)} CREDIT
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's CREDIT balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
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
                                                    Total time required to claim all ELEM asset
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
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="CREDIT Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            {/* <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>{(parseFloat(stable)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(stable)/1000000 * 20 / 100).toFixed(2)} ELEM</h6> */}
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                {/* <Col xs="auto">
                                                    {tauAssetOpt === false ? <ButtonLoad loading={loaderTauAssetOpt} className='btn w-100 btn-blue' onClick={() => tauWalletCheck()}>
                                                        TAU Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-100 btn-blue'>
                                                        TAU Asset Opted
                                                    </Button></> }
                                                </Col> */}
                                                <Col>
                                                <ButtonLoad loading={loaderTauFund} className='btn w-20 btn-blue' onClick={() => tauFundWalletCheck()}>
                                                        Dispense 
                                                    </ButtonLoad> 
                                                </Col>
                                               
                                            </Row>
                                            {/* <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> {(parseFloat(bond)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(bond)/1000000).toFixed(2)} ELEM</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span> {lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<></>)} </h6>
                                                </div>
                                            </div> */}
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className='mb-24' eventKey="3">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={jokercoin} alt="logo" />
                                <span className='ms-3'>JOKER</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 JOKER
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of JOKER asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(JokerBlance)/1e9).toFixed(2) === 'NaN' || (parseFloat(JokerBlance)/1e9).toFixed(2) === null ? '0.00' : (parseFloat(JokerBlance)/1e9).toFixed(2)} JOKER
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's JOKER balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
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
                                                    Total time required to claim all ELEM asset
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
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="JOKER Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            {/* <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>{(parseFloat(stable)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(stable)/1000000 * 20 / 100).toFixed(2)} ELEM</h6> */}
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                               
                                                <Col>
                                                <ButtonLoad loading={loaderEinrFund} className='btn w-20 btn-blue' onClick={() => einrFundWalletCheck()}>
                                                        Dispense 
                                                    </ButtonLoad>
                                                </Col>
                                               
                                            </Row>
                                            {/* <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> {(parseFloat(bond)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(bond)/1000000).toFixed(2)} ELEM</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span> {lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<></>)} </h6>
                                                </div>
                                            </div> */}
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

export default Faucet;