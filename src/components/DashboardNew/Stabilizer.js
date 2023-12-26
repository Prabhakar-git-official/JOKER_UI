import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import ethlogo from '../../assets/images/ethLogo.png';
import ButtonLoad from 'react-bootstrap-button-loader';
import { updatealgobalance } from "../formula";
import BigNumber from "bignumber.js";
import Web3 from 'web3';
/* global BigInt */

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import elemLogo from '../../assets/images/elem-original.png';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
import mintDetails from '../Dashboard/stablecoin-only.json';
import usdcLogo from '../../assets/images/usdc-logo.png';
import daiLogo from '../../assets/images/dai.jpeg';
import dimeLogo from '../../assets/images/dime.jpeg';
import blackLogo from '../../assets/images/black.jpeg';
import jusdLogo from '../../assets/images/JUSD.svg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import node from './nodeapi.json'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

import {ethers} from 'ethers';
import { BLACKAddress, BlackAbi, DAIAddress, DIMEAddress, DaiAbi, DimeAbi, HayTokenAbi, HayTokenAddress, HelioProviderAbi, HelioProviderAddress, InteractionAbi, InteractionAddress, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress, ceTokenAddress } from '../../abi/abi';

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";

const Stablecoin = () => {

    useEffect(() => {
        document.title = "ELEMENT | Mint"
    }, [])

    const [show, setShow] = useState(true);
    const [connector, setConnector] = useState("");

    const [cRatioUpdateShow, setCRatioUpdateShow] = useState(false);

    const handleCRatioUpdateShow = () => setCRatioUpdateShow(true);
    const handleCRatioUpdateClose = () => setCRatioUpdateShow(false);

    const [cRatioUpdateShowEinr, setCRatioUpdateShowEinr] = useState(false);

    const handleCRatioUpdateShowEinr = () => setCRatioUpdateShowEinr(true);
    const handleCRatioUpdateCloseEinr = () => setCRatioUpdateShowEinr(false);

    const [cRatioLoad, setcRatioLoad] = useState(false);

    const handleShowcRatioLoad = () => setcRatioLoad(true);
    const handleHidecRatioLoad = () => setcRatioLoad(false);

    const [loadMint, setLoadMint] = useState(false);

    const handleShowMint = () => setLoadMint(true);
    const handleHideMint = () => setLoadMint(false);

    const [loadAppOpt, setLoadAppOpt] = useState(false);

    const handleShowAppOpt = () => setLoadAppOpt(true);
    const handleHideAppOpt = () => setLoadAppOpt(false);

    const [loadAppOptDynamic, setLoadAppOptDynamic] = useState(false);

    const handleShowAppOptDynamic = () => setLoadAppOptDynamic(true);
    const handleHideAppOptDynamic = () => setLoadAppOptDynamic(false);

    const [loadAssetOptTau, setLoadAssetOptTau] = useState(false);

    const handleShowAssetOptTau = () => setLoadAssetOptTau(true);
    const handleHideAssetOptTau = () => setLoadAssetOptTau(false);

    const [loadAssetOptEinr, setLoadAssetOptEinr] = useState(false);

    const handleShowAssetOptEinr = () => setLoadAssetOptEinr(true);
    const handleHideAssetOptEinr = () => setLoadAssetOptEinr(false);    
    
    const [prerequisiteShow, setLoadPrerequisite] = useState(false);

    const handlePrerequisiteShow = () => setLoadPrerequisite(true);
    const handlePrerequisiteClose = () => setLoadPrerequisite(false);

    const [usdcAmount, setUsdcAmount ] = useState();
    const [elemAmount, setElemAmount ] = useState();
    const [tauAmount, setTauAmount ] = useState();
    const [usdcAmountEinr, setUsdcAmountEinr ] = useState();
    const [elemAmountEinr, setElemAmountEinr ] = useState();
    const [einrAmount, setEinrAmount ] = useState();

  

    

    const [minAlgo, setMinAlgo] = useState("");
    const [C_Percent, setC_Percent] = useState();
    const [usdcPrice, setUsdcPrice] = useState();
    const [elemPrice, setElemPrice] = useState();
    const [cRatioValue, setCRatioValue] = useState();
    
         
    
    const[DepositAmount,SetDepositAmount] = useState("")
    const[walletsBalance,setwalletBalance] = useState("")
    const[collateralTowithdraw,setcollateralTowithdraw] = useState("")
    const[CollateralBalance,setCollateralBalance] = useState("")
    const[BorrowedAmount,setBorrowedAmount] = useState("")
    const[AvailabletoBorrow,setAvailabletoBorrow] = useState("") 
    const[HayBalance,setHayBalance] = useState("")
    const[allowan,setAllowance] = useState("")
   



    



    // const algosdk = require('algosdk');
    // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
    // const port = '';
    
    // const token = {
    //    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
    // }
    
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

      useEffect(()=>{fraxCalculation()},[])

      const fraxCalculation = async() =>{
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        }
        else{
            console.log("useeffect")
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const hayTokenContract = new ethers.Contract(HayTokenAddress, HayTokenAbi, provider);
            let allowance =  ethers.utils.formatUnits(await hayTokenContract.allowance(localStorage.getItem("walletAddress"),InteractionAddress),0);
            console.log("allowance", allowance)
            // setAllowance(allowance);
            let Haybalance = ethers.utils.formatUnits(await hayTokenContract.balanceOf(localStorage.getItem("walletAddress")),0);
            if( parseFloat(allowance) >= parseFloat(Haybalance) ){
                setAllowance(1);
            }
            else{
                setAllowance(0);
            }
            let walletbala = await walletBalance();            
            let withdrawnVal = await withdrawnValue();            
            const InteractionContract = new ethers.Contract(InteractionAddress, InteractionAbi, provider);
            let DepositedAmounts =  ethers.utils.formatUnits(await InteractionContract.locked(ceTokenAddress,localStorage.getItem("walletAddress")),18);
            
            setwalletBalance(ethers.utils.formatUnits(walletbala),18);
            setcollateralTowithdraw(ethers.utils.formatUnits(withdrawnVal),18);
            setCollateralBalance(DepositedAmounts)

            let borrValue = await repayBorrowValue();
            let availableToBorrow = await BorrowValue();

            setBorrowedAmount(ethers.utils.formatUnits(borrValue),18);
            setAvailabletoBorrow(ethers.utils.formatUnits(availableToBorrow),18)
            setHayBalance(ethers.utils.formatUnits(Haybalance),18)
        }
      }

      const walletBalance = async() => {
        let ethBalance;
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        }
        else{
        const response = await fetch(`https://api-goerli.basescan.org/api?module=account&action=balance&address=${localStorage.getItem("walletAddress")}&tag=latest`);
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
        ethBalance = balanceWei;
          
        }
        return ethBalance;
      }

      const depositETH = async() =>{
        if(parseFloat(DepositAmount) >= parseFloat(0.1)){
            handleShowMint();
            try{
                const web31 = await connectToEthereum();
                if (!web31) return;
        
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0]; // Use the first account
        
                console.log("Connected Successfully", account);
        
                // Create contract instance with the correct order of arguments
                const depositContract = new ethers.Contract(HelioProviderAddress, HelioProviderAbi, web31.getSigner(account));
        
                // const val = ethers.utils.formatUnits(100000000000000, 0);
                // let k = Web3.utils.toBN(1000000000000000000n);
                // const val11 = ethers.utils.formatUnits(100000000000000, 18);
                // const val1 =  ethers.utils.parseUnits(val11, 18);;
                // Send the transaction and wait for it to be mined
                let depositValue = DepositAmount*1e18;
                const mintTx = await depositContract.provide({ value: BigInt(parseInt(depositValue))});
                await mintTx.wait();
                console.log("minttx",mintTx.hash);
                // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
                let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
                toast.success(toastDiv(id));
                await fraxCalculation();
                await resetValues();
                toast.success("Deposit is Done succeefully");
                handleHideMint();
            }catch(error){
                toast.error("Deposit is not succeed");
                console.log("error",error)
                handleHideMint();
            }
        }
        else{
            toast.error("Try to deposit greater than 0.1");
        }
       
    
    }

    const changeDepositValue = async(value)=>{
        let ethbalance = await walletBalance();
        if(value === 100){
            let balancewithGasPrice = parseFloat(ethbalance/1e18) - parseFloat(0.000631217512668702);
            SetDepositAmount((balancewithGasPrice*value)/100);
        }else{
            let balancewithGasPrice = parseFloat(ethbalance/1e18);
            SetDepositAmount((balancewithGasPrice*value)/100);
        }
        
    }

    const stopExecute = async(value,depositvalue,data) =>{
        
        if(parseFloat(depositvalue) > parseFloat(value)){
            toast.error(`Your entered amount is Greater than ${data} limit`)
            return 0;
        }
        else{
            return 1; 
        }
    }

    const withdrawETH = async() =>{
        let availabletowithdraw = await withdrawnValue();
        let stopvalue = await stopExecute(availabletowithdraw,DepositAmount*1e18,"withdraw");
        if(stopvalue === 0){
            return;
        }
        if(parseFloat(DepositAmount) >= parseFloat(0.001)){
            handleShowMint();
            try{
                const web31 = await connectToEthereum();
                if (!web31) return;
        
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0]; // Use the first account
        
                console.log("Connected Successfully", account);
        
                // Create contract instance with the correct order of arguments
                const depositContract = new ethers.Contract(HelioProviderAddress, HelioProviderAbi, web31.getSigner(account));
        
              
                // Send the transaction and wait for it to be mined
                let depositValue = DepositAmount*1e18;
                const mintTx = await depositContract.release(account, BigInt(parseInt(depositValue)));
                await mintTx.wait();
                console.log("minttx",mintTx.hash);
                // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
                let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
                toast.success(toastDiv(id));
                await fraxCalculation();
                await resetValues();
                toast.success("Withdraw is Done succeefully");
                handleHideMint();
            }catch(error){
                toast.error("Withdraw is not succeed");
                console.log("error",error)
                handleHideMint();
            }
        }
        else{
            toast.error("Try to Withdraw greater than 0.001");
        }
       
    
    }

    const withdrawnValue = async() =>{
        let diffAmount;
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        }
        else{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const InteractionContract = new ethers.Contract(InteractionAddress, InteractionAbi, provider);
            
            let borrowedAmounts =  ethers.utils.formatUnits(await InteractionContract.borrowed(ceTokenAddress,localStorage.getItem("walletAddress")),0);
            let DepositedAmounts =  ethers.utils.formatUnits(await InteractionContract.locked(ceTokenAddress,localStorage.getItem("walletAddress")),0);
             diffAmount = Math.abs(borrowedAmounts - DepositedAmounts);
        }
        return diffAmount;
    }

    const changeWithdrawValue = async(value)=>{
        let ethbalance = await withdrawnValue();    
        let balancewithGasPrice = parseFloat(ethbalance/1e18);
        SetDepositAmount((balancewithGasPrice*value)/100);
    }
    const BorrowJUSD = async() =>{ 
        let availabletoborrowed = await BorrowValue();
        let stopvalue = await stopExecute(availabletoborrowed,DepositAmount*1e18,"Borrow");
        if(stopvalue === 0){
            return;
        }       
        handleShowMint();
        try{
            const web31 = await connectToEthereum();
            if (!web31) return;
    
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]; // Use the first account
    
            console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const InteractionContract = new ethers.Contract(InteractionAddress, InteractionAbi, web31.getSigner(account));
    
            
            // Send the transaction and wait for it to be mined
            let depositValue = DepositAmount*1e18;
            const mintTx = await InteractionContract.borrow(ceTokenAddress, BigInt(parseInt(depositValue)));
            await mintTx.wait();
            console.log("minttx",mintTx.hash);
            // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
            let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
            toast.success(toastDiv(id));
            await fraxCalculation();
            await resetValues();
            toast.success("Borrow is Done succeefully");
            handleHideMint();
        }catch(error){
            toast.error("Borrow is not succeed");
            console.log("error",error)
            handleHideMint();
        }            
    }
    const BorrowValue = async() =>{
        let diffAmount;
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        }
        else{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const InteractionContract = new ethers.Contract(InteractionAddress, InteractionAbi, provider);
            
            let AvailableBorrow =  ethers.utils.formatUnits(await InteractionContract.availableToBorrow(ceTokenAddress,localStorage.getItem("walletAddress")),0);
            // let DepositedAmounts =  ethers.utils.formatUnits(await InteractionContract.locked(ceTokenAddress,localStorage.getItem("walletAddress")),0);
            diffAmount = AvailableBorrow;
        }
        return diffAmount;
    }
    const changeBorrowValue = async(value)=>{
        let ethbalance = await BorrowValue();    
        let balancewithGasPrice = parseFloat(ethbalance/1e18);
        SetDepositAmount((balancewithGasPrice*value)/100);
    }
   
    const RepayJUSD = async() =>{ 
        let availabletoborrowed = await repayBorrowValue();
        let stopvalue = await stopExecute(availabletoborrowed,DepositAmount*1e18,"Repay");
        if(stopvalue === 0){
            return;
        }       
        handleShowMint();
        try{
            const web31 = await connectToEthereum();
            if (!web31) return;
    
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]; // Use the first account
    
            console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const InteractionContract = new ethers.Contract(InteractionAddress, InteractionAbi, web31.getSigner(account));
    
            
            // Send the transaction and wait for it to be mined
            let depositValue = DepositAmount*1e18;
            const mintTx = await InteractionContract.payback(ceTokenAddress, BigInt(parseInt(depositValue)));
            await mintTx.wait();
            console.log("minttx",mintTx.hash);
            // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
            let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
            toast.success(toastDiv(id));
            await fraxCalculation();
            await resetValues();
            toast.success("Repay is Done succeefully");
            handleHideMint();
        }catch(error){
            toast.error("Repay is not succeed");
            console.log("error",error)
            handleHideMint();
        }            
    }

    const approve = async() =>{
        handleShowMint();
        try{
            const web31 = await connectToEthereum();
            if (!web31) return;
    
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]; // Use the first account
    
            console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const hayContract = new ethers.Contract(HayTokenAddress, HayTokenAbi, web31.getSigner(account));
    
            const mintTx = await hayContract.approve(InteractionAddress,BigInt(10000000000*1e18));
           
            await mintTx.wait();
            console.log("minttx",mintTx.hash);
            // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
            let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
            toast.success(toastDiv(id));
            toast.success("Approve JUSD is Done succeefully");
            await fraxCalculation();
            await resetValues();
            handleHideMint();
        }catch(error){
            toast.error("Approve is not succeed",`${error}`);
            console.log("error",error)
            handleHideMint();
        }
    
    }

    const repayBorrowValue = async() =>{
        let diffAmount;
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        }
        else{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // console.log("Connected Successfully", account);
    
            // Create contract instance with the correct order of arguments
            const InteractionContract = new ethers.Contract(InteractionAddress, InteractionAbi, provider);
            
            let AvailableBorrow =  ethers.utils.formatUnits(await InteractionContract.borrowed(ceTokenAddress,localStorage.getItem("walletAddress")),0);
            // let DepositedAmounts =  ethers.utils.formatUnits(await InteractionContract.locked(ceTokenAddress,localStorage.getItem("walletAddress")),0);
            diffAmount = AvailableBorrow;
        }
        return diffAmount;
    }
    const repaychangeBorrowValue = async(value)=>{
        let ethbalance = await repayBorrowValue();    
        let balancewithGasPrice = parseFloat(ethbalance/1e18);
        SetDepositAmount((balancewithGasPrice*value)/100);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

     const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Base Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p> 
        </div>
        
    );

    const resetValues = async() =>{
        SetDepositAmount("");
    }

    


    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        {/* {show ? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShow(false)} dismissible>
                                <p><strong className='text-purple'>Mint (2 Steps):</strong>  < br />
                                1. Enter in the amount of USDC you would like to deposit and press MINT. < br />
                                2. Claim your TAU tokens.</p>
                                <p><strong className='text-purple'>Redeem (2 Steps):</strong>  < br />
                                1. Enter in the amount of TAU you would like to redeem and press Redeem. < br />
                                2. Claim your USDC tokens.</p>
                                <p><strong className='text-purple'>Note:</strong> The “Approve“ is only needed when minting for the first time.</p>
                            </Alert>

                            : null
                        } */}

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                            <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the Amount of USDC by which the requirement of ELEM and The amount of TAU or EINR minted can to automatically generated and displayed. <br /><br /><strong className='text-purple'>2.</strong> Once you acquire the desired amount of TAU to mint click on "Mint TAU" or "Mint EINR" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="deposit" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="deposit" title="Stabilize cbUSD to BUSD">
                                <div className="group-row mb-20">
                                <Row>
                                    <Col sm={12} className="mb-3">
                                        <h5 className='mb-3 font-semibold'>The Stabilizer exists to ensure cbUSD is pegged to the dollar. Depositing your cbUSD will gradually convert it into BUSD. This is only useful if cbUSD is trading under one dollar on Curve.</h5>
                                    </Col>
                                </Row>
                                <Row>
                                  <Col sm={12} className="mb-3">
                                    <div className="table-responsive">
                                      <table className="table table-bordered table-striped">
                                        <thead>
                                          <tr>
                                            <th>Your cbUSD</th>
                                            <th>Deposited cbUSD</th>
                                            <th>Stabilizable BUSD</th>
                                            <th>Your BUSD</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                <Col sm={6} className="mb-3">
                                <Row>
                                    <Col sm={2} className="mb-3 me-2">
                                        <Button variant='link' className='btn-currency p-0'>
                                            <img src={ethlogo} alt="ETH" height="30"/>
                                        </Button>
                                    </Col>
                                    <Col sm={8}>
                                        <FormControl
                                            value={DepositAmount}
                                            type='number'
                                            placeholder="0.00"
                                            aria-label="Amount to deposit"
                                            aria-describedby="basic-addon2"
                                            onChange={(e) => SetDepositAmount(e.target.value)}
                                        />
                                    </Col>
                                    
                                </Row>
                                <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={depositETH}>
                                    Deposit
                                </ButtonLoad>
                                <Card.Body className="d-flex justify-content-center">
                                <Row className="mb-1">
                                <Col sm={3} className="pe-1">
                                    <ButtonLoad className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(25)}>
                                        25%
                                    </ButtonLoad>
                                </Col>
                                <Col sm={3} className="pe-1">
                                    <ButtonLoad  className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(50)}>
                                        50%
                                    </ButtonLoad>
                                </Col>
                                <Col sm={3} className="pe-1">
                                    <ButtonLoad  className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(75)}>
                                        75%
                                    </ButtonLoad>
                                </Col>
                                <Col sm={3}>
                                    <ButtonLoad  className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(100)}>
                                        100%
                                    </ButtonLoad>
                                </Col>
                                </Row>
                                </Card.Body>
                                <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={depositETH}>
                                    Stabilize
                                </ButtonLoad>
                                </Col>
                                <Col sm={6} className="mb-3">
                                <Row>
                                    <Col sm={2} className="mb-3 me-2">
                                        <Button variant='link' className='btn-currency p-0'>
                                            <img src={ethlogo} alt="ETH" height="30"/>
                                        </Button>
                                    </Col>
                                    <Col sm={8}>
                                        <FormControl
                                            value={DepositAmount}
                                            type='number'
                                            placeholder="0.00"
                                            aria-label="Amount to deposit"
                                            aria-describedby="basic-addon2"
                                            onChange={(e) => SetDepositAmount(e.target.value)}
                                        />
                                    </Col>                            
                                </Row>
                                <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={depositETH}>
                                    Deposit
                                </ButtonLoad>
                                <Card.Body className="d-flex justify-content-center">
                                <Row className="mb-1">
                                <Col sm={3} className="pe-1">
                                    <ButtonLoad className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(25)}>
                                        25%
                                    </ButtonLoad>
                                </Col>
                                <Col sm={3} className="pe-1">
                                    <ButtonLoad  className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(50)}>
                                        50%
                                    </ButtonLoad>
                                </Col>
                                <Col sm={3} className="pe-1">
                                    <ButtonLoad  className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(75)}>
                                        75%
                                    </ButtonLoad>
                                </Col>
                                <Col sm={3}>
                                    <ButtonLoad  className='btn btn-blue btn-sm percentage-item w-auto' onClick={()=>changeDepositValue(100)}>
                                        100%
                                    </ButtonLoad>
                                </Col>
                                </Row>
                                </Card.Body>
                                <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={depositETH}>
                                    Claim and Withdraw
                                </ButtonLoad>
                                </Col>
                                </Row>
                                <Row>
                                <div className="mt-4">
                                <h5 style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Global Stabilizer Status</h5>
                                    <div className="d-flex larger">
                                        <div className="col-6">
                                            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Total Deposited cbUSD:</span>
                                        </div>
                                        <div className="col-6 text-end">
                                            <span>{walletsBalance? parseFloat(walletsBalance).toFixed(5): "0.00"} ETH</span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-6">
                                            <span>Total BUSD Deposited in alpaca:</span>
                                        </div>
                                        <div className="col-6 text-end">
                                            <span>{CollateralBalance? parseFloat(CollateralBalance).toFixed(5): "0.00"} ETH</span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-6">
                                            <span>Total BUSD Available for Stabilization:</span>
                                        </div>
                                        <div className="col-6 text-end">
                                            <span>{collateralTowithdraw? parseFloat(collateralTowithdraw).toFixed(5): "0.00"} ETH</span>
                                        </div>
                                    </div>
                                    {/* <div className="d-flex">
                                        <div className="col-6">
                                            <span>BUSD APY:</span>
                                        </div>
                                        <div className="col-6 text-end">
                                            <span>0.000%</span>
                                        </div>
                                    </div> */}
                                </div>
                                </Row>
                                </div>
                                </Tab>
                                {/* <Tab eventKey="borrow" title="Borrow">
                             
                                </Tab> */}
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            <Modal show={prerequisiteShow} className="modal-dashboard" centered onHide={handlePrerequisiteClose}>
            <div className="pt-xl-0 pt-4">   
                <Link className='text-white mb-20' to="/dashboard"><span className='text-blue'>Go to Dashboard &nbsp;</span>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6389 8.36952L18.8028 8.2H18.567H0.967033C0.700676 8.2 0.486002 8.10872 0.33782 7.95548C0.189347 7.80195 0.1 7.57826 0.1 7.3C0.1 7.02174 0.189347 6.79805 0.33782 6.64452C0.486002 6.49128 0.700676 6.4 0.967033 6.4H18.567H18.8064L18.6382 6.22972L14.0939 1.63048C14.0937 1.63036 14.0936 1.63023 14.0935 1.63011C13.7445 1.26887 13.7447 0.730627 14.0939 0.369516C14.4414 0.0101614 14.9564 0.0101614 15.3039 0.369516L21.7831 7.06952C21.939 7.23075 21.939 7.46925 21.7831 7.63048L15.3039 14.3305C14.9564 14.6898 14.4414 14.6898 14.0939 14.3305C13.7445 13.9692 13.7445 13.4308 14.0939 13.0695L18.6389 8.36952Z" fill="blue" stroke="currentColor" strokeWidth="0.2"/>
                                </svg>
                </Link>
                </div><br/>
                <Modal.Header>
                    <Modal.Title>Please perform the below actions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* { appOpt === false ? <ButtonLoad loading={loadAppOpt} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinWalletCheck}>
                        <span className='text-white'>1. App Opt-in (EINR)</span>
                        
                    </ButtonLoad> : <></>}
                    { appOptDynamic === false ? <ButtonLoad loading={loadAppOptDynamic} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinDynamicWalletCheck}>
                        <span className='text-white'>2. App Opt-in (TAU)</span>
                       
                    </ButtonLoad> : <></>}                    
                    { assetTauOpt === false ? <ButtonLoad loading={loadAssetOptTau} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={assetOptinTauWalletCheck}>
                        <span className='text-white'>3. Opt-in TAU asset</span>
                        
                    </ButtonLoad> : <></>}
                    { assetEinrOpt === false ? <ButtonLoad loading={loadAssetOptEinr} variant='primary' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={assetOptinEinrWalletCheck}>
                        <span className='text-white'>4. Opt-in EINR asset</span>
                        
                    </ButtonLoad> : <></>} */}
                </Modal.Body>
            </Modal>
            <Modal show={cRatioUpdateShow} className="modal-dashboard" centered onHide={handleCRatioUpdateClose}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update TAU</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' >
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            <Modal show={cRatioUpdateShowEinr} className="modal-dashboard" centered onHide={handleCRatioUpdateCloseEinr}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update EINR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' >
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            </Container>
        </Layout>
    );
};

export default Stablecoin;