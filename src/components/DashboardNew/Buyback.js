import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, Modal, FormControl, InputGroup } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import ButtonLoad from 'react-bootstrap-button-loader';
import USDC from '../../assets/images/usdc.jpg';
import elemLogo from '../../assets/images/elem-original.png';
import daiLogo from '../../assets/images/dai.jpeg';
import dimeLogo from '../../assets/images/dime.jpeg';
import blackLogo from '../../assets/images/black.jpeg';
import jusdLogo from '../../assets/images/JUSD.svg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import buybackDetails from '../Dashboard/stablecoin-only.json';
import node from './nodeapi.json';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { updatealgobalance } from "../formula";
import { ethers } from 'ethers';
import { JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress } from '../../abi/abi';
/* global BigInt */

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";
const Stablecoin = () => {

    useEffect(() => {
        document.title = "ELEMENT | Buyback"
    }, [])

    const [assetUsdcOpt, setAssetUsdcOpt] = useState(false);
    const [assetElemOpt, setAssetElemOpt] = useState(false);
    const [usdcAmount, setUsdcAmount ] = useState("");
    const [elemAmount, setElemAmount ] = useState("");
    const [appOpt, setAppOpt] = useState(false);
    const [minAlgo, setMinAlgo] = useState("");
    const [connector, setConnector] = useState("");
    const [C_Percent, setC_Percent] = useState();
    const [usdcPrice, setUsdcPrice] = useState();
    const [elemPrice, setElemPrice] = useState();

    const [prerequisiteShow, setLoadPrerequisite] = useState(false);

    const handlePrerequisiteShow = () => setLoadPrerequisite(true);
    const handlePrerequisiteClose = () => setLoadPrerequisite(false);

    const [loadAssetOptUsdc, setLoadAssetOptUsdc] = useState(false);

    const handleShowAssetOptUsdc = () => setLoadAssetOptUsdc(true);
    const handleHideAssetOptUsdc = () => setLoadAssetOptUsdc(false);

    const [loadAssetOptElem, setLoadAssetOptElem] = useState(false);

    const handleShowAssetOptElem = () => setLoadAssetOptElem(true);
    const handleHideAssetOptElem = () => setLoadAssetOptElem(false);

    const [loadAppOpt, setLoadAppOpt] = useState(false);

    const handleShowAppOpt = () => setLoadAppOpt(true);
    const handleHideAppOpt = () => setLoadAppOpt(false);

    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");

    const[loader, setLoader] = useState(false);

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);

    let appID_global = buybackDetails.dynamicStablecoinAppID;
    let tauID = buybackDetails.tauID;
    let einrID = buybackDetails.einrID;
    let elemID = buybackDetails.elemID;
    let usdcID = buybackDetails.usdcID;
    let totalSupply = 18446744073709551615;
    let elemReserve = buybackDetails.rebaseReserveAddress;

    

    const [fxsamount, setfxsamount] = useState("");
    const [blackvalue, setblackvalue] = useState("");
    const [collvalue, setcollvalue] = useState("");
    const[recollAvaible,setrecollAvaible] = useState(false);

    const calculateBuyBackValues = async(
        col_idx,
        fxs_dollar_value_d18,
        col_out_min       
      ) =>{
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const JusdPoolContract = new ethers.Contract(JUSDPoolAddress , JUSDPoolAbi, provider);
        const JUSDContract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
        // Constants
        const PRICE_PRECISION = 1e6; // Adjust as needed, ensure it matches the Solidity contract's precision
      
        // Get the number of missing decimals for collateral_amount
        const missing_decimals = 0; // Replace with the actual number of missing decimals
        let fxs_price = await ethers.utils.formatUnits(await JusdPoolContract.getFXSPrice(), 0);
        // Get the BLACK price and other required parameters
        const black_price = (await ethers.utils.formatUnits(await JusdPoolContract.getBLACKPrice(), 0))// Replace with the actual function to get the BLACK price
        const buyback_fee = 6000; // Replace with the actual buyback fee value (5% fee)
        let col_price = (await ethers.utils.formatUnits(await JusdPoolContract.collateral_prices(0), 0));
        let buybackamount = (await ethers.utils.formatUnits(await JusdPoolContract.buybackAvailableCollat(), 0));
        //newcode
        if(buybackamount > 0){
            setrecollAvaible(true);
        }
        else{
            setrecollAvaible(false);
        }
        const splited_value = (fxs_dollar_value_d18 * PRICE_PRECISION) / fxs_price;

        // Calculate fxs_amount
        const fxs_amount = (splited_value * 100) / PRICE_PRECISION;

        console.log("fxs_amount:", fxs_amount);
        const splited_value1 = (fxs_amount * 50) / 100;
        // const fxs_dollar_value_d181 = (splited_value1 * fxs_price) / PRICE_PRECISION;
        console.log("fxs_dollar_value_d181",splited_value,fxs_amount,splited_value1)
        const black_dollar_value_d18 = ((fxs_amount - splited_value1) * (black_price )) / PRICE_PRECISION;
        const collateral_equivalent_d18 = ((fxs_dollar_value_d18 + black_dollar_value_d18) * PRICE_PRECISION) / (await ethers.utils.formatUnits(await JusdPoolContract.collateral_prices(0), 0));
        console.log("collateral_equivalent_d18",collateral_equivalent_d18)
        const col_out = collateral_equivalent_d18 / 1; // In its natural decimals()
        const col_out_after_fee = (col_out * (PRICE_PRECISION - buyback_fee)) / PRICE_PRECISION;

      
        // const collateral_equivalent_d18 = (fxs_dollar_value_d18 * PRICE_PRECISION) / (await ethers.utils.formatUnits(await JusdPoolContract.collateral_prices(0), 0));
        // const col_out_before_fee = (collateral_equivalent_d18 * (PRICE_PRECISION + buyback_fee)) / PRICE_PRECISION;
        // const splited_value = (col_out_before_fee * 50) / 100;
        // const fxs_amount = (splited_value * PRICE_PRECISION) / fxs_price;

        // const black_dollar_value_d18 = ((col_out_before_fee - splited_value) * (PRICE_PRECISION / 1e9)) / PRICE_PRECISION;
        // const col_out = col_out_before_fee / (10 ** missing_decimals[col_idx]);
        //old
        // // Calculate the amount of FXS
        // const fxs_amount = (fxs_dollar_value_d18 * PRICE_PRECISION) / fxs_price;
      
        // // Calculate the split value
        // const splited_value = (fxs_amount * 50) / 100;
      
        // // Calculate black_dollar_value_d18
        // const black_dollar_value_d18 = ((fxs_amount - splited_value) * (black_price / 1e9)) / PRICE_PRECISION;
      
        // // Calculate collateral_equivalent_d18
        // const collateral_equivalent_d18 =
        //   (fxs_dollar_value_d18 + black_dollar_value_d18) *(await ethers.utils.formatUnits(await JusdPoolContract.collateral_prices(0), 0)) / PRICE_PRECISION;
      
        // // Calculate col_out
        // const col_out = (collateral_equivalent_d18 * 10 ** missing_decimals) / PRICE_PRECISION;
      
        // // Subtract the buyback fee
        // const col_out_after_fee = (col_out * (PRICE_PRECISION - buyback_fee)) / PRICE_PRECISION;
      
        
        setblackvalue(black_dollar_value_d18);
        setcollvalue(col_out_after_fee)
        // Check for slippage
        if (col_out < col_out_min) {
          throw new Error("Collateral slippage");
        }
        await calculateFxsAmount(fxs_dollar_value_d18,col_price,fxs_price)
      
        return {
          fxs_amount,
          black_dollar_value_d18,
          col_out,
        };
      }

    const getbuybackvalue = async(val) =>{

// Example usage:
        const col_idx = 0; // Replace with your value
        const fxs_dollar_value_d18 = val*1e18; // Replace with your value
        const col_out_min = 0; // Replace with your value
        const fxs_price = 2; // Replace with your value
        const buyback_fee = 5000; // Replace with your value (5% fee)
        let PRICE_PRECISION = 1e6;

                // Calculate splited_value
        

        const values = await calculateBuyBackValues(
        col_idx,
        fxs_dollar_value_d18,
        col_out_min    
        );

        console.log("fxs_amount:", values.fxs_amount);
        console.log("black_dollar_value_d18:", values.black_dollar_value_d18);
        console.log("col_out_after_fee:", values.col_out);
    }

    const calculateFxsAmount = async(fxs_dollar_value_d18,collateral_prices,fxs_price) =>{
        const PRICE_PRECISION = 1e6; // Replace with the actual value
        const missing_decimals = 0
        const col_idx = 0; // Replace with the desired col_idx value
        const buyback_fee = 6000; 

        // Calculate collateral_equivalent_d18
        const collateral_equivalent_d18 = (fxs_dollar_value_d18 * collateral_prices) / PRICE_PRECISION;
      
        // Calculate col_out without considering the fee and slippage
        const col_out = collateral_equivalent_d18 * 1;
      
        // Calculate the equivalent black_dollar_value_d18
        const black_dollar_value_d18 = (col_out / (PRICE_PRECISION - buyback_fee)) * 1e9;
      
        // Calculate the total fxs_dollar_value_d18
        const total_fxs_dollar_value_d18 = fxs_dollar_value_d18 + black_dollar_value_d18;
      
        // Calculate fxs_amount based on the split (50%)
        const splited_value = (total_fxs_dollar_value_d18 * 2) / (fxs_price / PRICE_PRECISION);
        const fxs_amount = splited_value;
        console.log("fxs_amount",fxs_amount)
        setfxsamount(fxs_amount);
      
        return fxs_amount;
      }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

     const reload = async () => {
        window.location.reload();
    }
    
    const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
    
        const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
        const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

        const toastDiv = (txId) =>
        (
            <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algo Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p> 
            </div>
        );
    
        const waitForConfirmation = async function (client, txId) {
            let status = (await client.status().do());
            let lastRound = status["last-round"];
              while (true) {
                const pendingInfo = await client.pendingTransactionInformation(txId).do();
                if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                  //Got the completed Transaction
                  //// console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                //   toast.success(`Transaction Successful with ${txId}`);
                //   toast.success(`Transaction ${txId} confirmed in round ${pendingInfo["confirmed-round"]}`);
                  let id = "https://testnet.algoexplorer.io/tx/" + txId;
                  toast.success(toastDiv(id));
                  handleHideLoad();
                  handleHideAppOpt();
                  handleHideAssetOptUsdc();
                  handleHideAssetOptElem();
                  await updatealgobalance();
                //   await sleep(5000);
                //   reload();
                  break;
                }
                lastRound++;
                await client.statusAfterBlock(lastRound).do();
              }
            }; 

            function toFixed(num, fixed) {
                var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
                return num.toString().match(re)[0];
            }

            useEffect(async() => {
                await globalState();
            }, [C_Percent, usdcPrice, elemPrice]);

            const globalState = async () =>
            {
                let appGlobalStateGet = await algodClientGet.getApplicationByID(appID_global).do();
                // console.log("app", appGlobalStateGet['params']['global-state']);
                let appGlobalState = appGlobalStateGet['params']['global-state'];
                let appGlobalStateCount = appGlobalStateGet['params']['global-state']['length'];
                for(let i = 0; i < appGlobalStateCount; i++)
                {
                    if(appGlobalState[i]['key'] === "Q19SYXRpbw==")
                    {
                        setC_Percent(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                        // console.log("C_Percent", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    }
                    if(appGlobalState[i]['key'] === "dXNkY1ByaWNl")
                    {
                        setUsdcPrice(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                        // console.log("usdcPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    }
                    if(appGlobalState[i]['key'] === "ZWxlbVByaWNl")
                    {
                        setElemPrice(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                        // console.log("elemPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    }
                }
            }  

            const optInApp = async () => 
            {
                handleShowAppOpt();
                if (localStorage.getItem("walletAddress") === "")
                    {
                        toast.error("Connect your wallet");
                        handleHideAppOpt();
                    }
                    else{
                        if(parseFloat(minAlgo) < 101000 + 171000)
                        {
                            toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                            handleHideAppOpt();
                        }
                        else
                        {        
                let params = await algodClient.getTransactionParams().do();
                    
                try {
              
                  const txn = algosdk.makeApplicationOptInTxnFromObject({
                      suggestedParams:params,
                      from: localStorage.getItem("walletAddress"),
                      appIndex: parseInt(appID_global),
                  });
              
                  const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
                  //////toast.info("Transaction in Progress");
                  const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
                  await waitForConfirmation(algodClient, response.txId);
                  setAppOpt(true);
                  await minBal();
                //   toast.success(`Transaction Success ${response.txId}`);
              }
              catch (err) {
                  handleHideAppOpt();
                  toast.error(`Transaction Failed due to ${err}`);
                  console.error(err);
              }
            }
            }
            }            

            const optInAppPera = async () => 
            {
                const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                setConnector(connector);
                handleShowAppOpt();
                if (localStorage.getItem("walletAddress") === "")
                    {
                        toast.error("Connect your wallet");
                        handleHideAppOpt();
                    }
                    else{
                        if(parseFloat(minAlgo) < 101000 + 171000)
                        {
                            toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                            handleHideAppOpt();
                        }
                        else
                        {        
                let params = await algodClient.getTransactionParams().do();
                    
                try {
              
                  const txn = algosdk.makeApplicationOptInTxnFromObject({
                      suggestedParams:params,
                      from: localStorage.getItem("walletAddress"),
                      appIndex: parseInt(appID_global),
                  });
              
                  let txId = txn.txID().toString();
              
                  // time to sign . . . which we have to do with walletconnect
                  const txns = [txn]
                  const txnsToSign = txns.map(txn => {
                    const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                    return {
                      txn: encodedTxn,
                  };
                });
                const requestParams = [ txnsToSign ];
                const request = formatJsonRpcRequest("algo_signTxn", requestParams);
              
                const result = await connector.sendCustomRequest(request);
                const decodedResult = result.map(element => {
                  return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                });
                  // send and await
                  await algodClient.sendRawTransaction(decodedResult).do();
                  await waitForConfirmation(algodClient, txId);
                  setAppOpt(true);
                  await minBal();
                //   toast.success(`Transaction Success ${response.txId}`);
              }
              catch (err) {
                  handleHideAppOpt();
                  toast.error(`Transaction Failed due to ${err}`);
                  console.error(err);
              }
            }
            }
            }

            const optInUsdcAsset = async () => 
            {
                handleShowAssetOptUsdc();
                if (localStorage.getItem("walletAddress") === "")
                    {
                        toast.error("Connect your wallet");
                        handleHideAssetOptUsdc();
                    }
                    else{
                        if(parseFloat(minAlgo) < 101000)
                        {
                            toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                            handleHideAssetOptUsdc();
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
                      assetIndex: parseInt(usdcID)
                  });
              
                  const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
                //////toast.info("Transaction in Progress");
                  const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
                  await waitForConfirmation(algodClient, response.txId);
                  setAssetUsdcOpt(true);
                  await minBal();
                //   toast.success(`Transaction Success ${response.txId}`);
              
              }
              catch (err) {
                  toast.error(`Transaction Failed due to ${err}`);
                  handleHideAssetOptUsdc();
                  console.error(err);
              
              }
            }
                    }
            }

            const optInUsdcAssetPera = async () => 
            {
                const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                setConnector(connector);
                handleShowAssetOptUsdc();
                if (localStorage.getItem("walletAddress") === "")
                    {
                        toast.error("Connect your wallet");
                        handleHideAssetOptUsdc();
                    }
                    else{
                        if(parseFloat(minAlgo) < 101000)
                        {
                            toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                            handleHideAssetOptUsdc();
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
                      assetIndex: parseInt(usdcID)
                  });
              
                  let txId = txn.txID().toString();
              
                  // time to sign . . . which we have to do with walletconnect
                  const txns = [txn]
                  const txnsToSign = txns.map(txn => {
                    const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                    return {
                      txn: encodedTxn,
                  };
                });
                const requestParams = [ txnsToSign ];
                const request = formatJsonRpcRequest("algo_signTxn", requestParams);
              
                const result = await connector.sendCustomRequest(request);
                const decodedResult = result.map(element => {
                  return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                });
                  // send and await
                  const response = await algodClient.sendRawTransaction(decodedResult).do();
                  await waitForConfirmation(algodClient, response.txId);
                  setAssetUsdcOpt(true);
                  await minBal();
                //   toast.success(`Transaction Success ${response.txId}`);
              
              }
              catch (err) {
                  toast.error(`Transaction Failed due to ${err}`);
                  handleHideAssetOptUsdc();
                  console.error(err);
              
              }
            }
                    }
            }

            const optInElemAsset = async () => 
            {
                handleShowAssetOptElem();
                if (localStorage.getItem("walletAddress") === "")
                    {
                        toast.error("Connect your wallet");
                        handleHideAssetOptElem();
                    }
                    else{
                        if(parseFloat(minAlgo) < 101000)
                        {
                            toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                            handleHideAssetOptElem();
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
                      assetIndex: parseInt(elemID)
                  });
              
                  const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
                //////toast.info("Transaction in Progress");
                  const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
                  await waitForConfirmation(algodClient, response.txId);
                  setAssetElemOpt(true);
                  await minBal();
                //   toast.success(`Transaction Success ${response.txId}`);
              }
              catch (err) {
                  toast.error(`Transaction Failed due to ${err}`);
                  handleHideAssetOptElem();
                  console.error(err);
              
              }
            }
                    }
            }

            const optInElemAssetPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowAssetOptElem();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptElem();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptElem();
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
          assetIndex: parseInt(elemID)
      });
  
      let txId = txn.txID().toString();
  
      // time to sign . . . which we have to do with walletconnect
      const txns = [txn]
      const txnsToSign = txns.map(txn => {
        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
        return {
          txn: encodedTxn,
      };
    });
    const requestParams = [ txnsToSign ];
    const request = formatJsonRpcRequest("algo_signTxn", requestParams);
  
    const result = await connector.sendCustomRequest(request);
    const decodedResult = result.map(element => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });
      // send and await
      const response = await algodClient.sendRawTransaction(decodedResult).do();
      await waitForConfirmation(algodClient, response.txId);
      setAssetElemOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptElem();
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
const buyback = async() =>{
    handleShowLoad();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, web31.getSigner(account));

        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        const mintTx = await JusdPoolContract.buyBackFxs(0,BigInt(parseInt(fxsamount)),1);
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("BuyBackDIME is Done succeefully");
        handleHideLoad();
    }catch(error){
        toast.error("buyBackFxs is not succeed");
        console.log("error",error)
        handleHideLoad();
    }

}


const buybackPera = async () =>
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowLoad();
    if (localStorage.getItem("walletAddress") === "")
    {
        toast.error("Connect your wallet");
        handleHideLoad();
    }
    else{
        if(parseFloat(minAlgo) < 2000)
        {
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
            handleHideLoad();
        }
        else
        { 
            if(parseFloat(elemAmount) > parseFloat(elemBalances)/1000000)
            {
                toast.error(`Insufficient ELEM balance. Your balance is ${(parseFloat(elemBalances)/1000000).toFixed(2)} ELEM but trying to enter ${elemAmount} ELEM`);
                handleHideLoad();
            }
            else
            { 
                if(parseFloat(elemAmount) > 0)
                {
                    toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                    handleHideLoad();
                }
                else
                {    
            try {
                // const accounts = await myAlgoWallet.connect();
                // const addresses = accounts.map(account => account.address);
                const params = await algodClient.getTransactionParams().do();
                 //// console.log("address", localStorage.getItem("walletAddress"));
                let appArgs1 = [];
                appArgs1.push(new Uint8Array(Buffer.from("buyback")));
        
                let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                  from:localStorage.getItem("walletAddress"), 
                  suggestedParams: params, 
                  appIndex: parseInt(appID_global), 
                  appArgs: appArgs1
                })                    
                
                
                let data = `#pragma version 5
        
                gtxn 0 TypeEnum
                int 6
                ==
                gtxn 0 ApplicationArgs 0
                byte "escrowOptin"
                ==
                &&
                bnz opt_in
                
                gtxn 0 TypeEnum
                int 6
                ==
                gtxn 0 ApplicationArgs 0
                byte "mintTau"
                ==
                &&
                bnz mintTau
                
                gtxn 0 TypeEnum
                int 6
                ==
                gtxn 0 ApplicationArgs 0
                byte "redeemTau"
                ==
                &&
                bnz redeemTau
                
                gtxn 0 TypeEnum
                int 6
                ==
                gtxn 0 ApplicationArgs 0
                byte "mintEinr"
                ==
                &&
                bnz mintEinr
                
                gtxn 0 TypeEnum
                int 6
                ==
                gtxn 0 ApplicationArgs 0
                byte "redeemEinr"
                ==
                &&
                bnz redeemEinr
                
                b failed
                
                opt_in:
                global GroupSize
                int 2
                ==
                bz failed
                gtxn 0 TypeEnum
                int 6
                ==
                
                gtxn 0 ApplicationID
                int 77396031 //appID
                ==
                &&
                
                gtxn 0 OnCompletion
                int NoOp
                ==
                
                int DeleteApplication
                gtxn 0 OnCompletion
                ==
                ||
                &&
                
                gtxn 1 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 0 RekeyTo
                global ZeroAddress
                ==
                &&
                bz failed
                b finish
                
                mintTau:
                global GroupSize
                int 6
                ==
                gtxn 0 TypeEnum
                int 6
                ==
                &&
                
                gtxn 0 ApplicationID
                int 77396031
                ==
                &&
                
                gtxn 0 OnCompletion
                int NoOp
                ==
                int DeleteApplication
                gtxn 0 OnCompletion
                ==
                ||
                &&
                
                gtxn 0 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 1 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 2 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 3 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 4 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 5 RekeyTo
                global ZeroAddress
                ==
                &&
                bnz finish
                b failed
                
                redeemTau:
                global GroupSize
                int 6
                ==
                gtxn 0 TypeEnum
                int 6
                ==
                &&
                
                gtxn 0 ApplicationID
                int 77396031
                ==
                &&
                
                gtxn 0 OnCompletion
                int NoOp
                ==
                int DeleteApplication
                gtxn 0 OnCompletion
                ==
                ||
                &&
                
                gtxn 0 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 1 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 2 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 3 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 4 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 5 RekeyTo
                global ZeroAddress
                ==
                &&
                bnz finish
                b failed
                
                mintEinr:
                global GroupSize
                int 6
                ==
                gtxn 0 TypeEnum
                int 6
                ==
                &&
                
                gtxn 0 ApplicationID
                int 77396031
                ==
                &&
                
                gtxn 0 OnCompletion
                int NoOp
                ==
                int DeleteApplication
                gtxn 0 OnCompletion
                ==
                ||
                &&
                
                gtxn 0 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 1 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 2 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 3 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 4 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 5 RekeyTo
                global ZeroAddress
                ==
                &&
                bnz finish
                b failed
                
                redeemEinr:
                global GroupSize
                int 6
                ==
                gtxn 0 TypeEnum
                int 6
                ==
                &&
                
                gtxn 0 ApplicationID
                int 77396031
                ==
                &&
                
                gtxn 0 OnCompletion
                int NoOp
                ==
                int DeleteApplication
                gtxn 0 OnCompletion
                ==
                ||
                &&
                
                gtxn 0 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 1 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 2 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 3 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 4 RekeyTo
                global ZeroAddress
                ==
                &&
                gtxn 5 RekeyTo
                global ZeroAddress
                ==
                &&
                bnz finish
                b failed
                
                failed:
                int 0
                return
                finish:
                int 1
                return`;
                
                
                
                let results = await algodClient.compile(data).do();
                //// console.log("Hash = " + results.hash);
                //// console.log("Result = " + results.result);
                
                let program = new Uint8Array(Buffer.from(buybackDetails.dynamicStablecoinEscrow, "base64"));          
                let lsig = new algosdk.LogicSigAccount(program);
                 //// console.log("Escrow =", lsig.address());
                
                 let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from: localStorage.getItem("walletAddress"), 
                    to: buybackDetails.elemReserveAddress, 
                    amount: parseInt((parseFloat(elemAmount).toFixed(6) * 1000000)), 
                    assetIndex: parseInt(elemID), 
                    suggestedParams: params
                  });
        
                  let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from: lsig.address(), 
                    to: localStorage.getItem("walletAddress"), 
                    amount: parseInt(parseFloat(usdcAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
                    assetIndex: parseInt(usdcID), 
                    suggestedParams: params
                  });
                  console.log("usdcAmount", parseInt(parseFloat(usdcAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000));
                let transaction4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: localStorage.getItem("walletAddress"), 
                  to: lsig.address(), 
                  amount: 1000, 
                   note: undefined,  
                   suggestedParams: params
                 });
                
                const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4 ]);
                const txs = [ transaction1, transaction2, transaction3, transaction4 ];
                txs[0].group = groupID;
                txs[1].group = groupID;
                txs[2].group = groupID;
                txs[3].group = groupID;

       //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
       const escrow = algosdk.signLogicSigTransaction(txs[2], lsig);
       //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
       const txns = [txs[0], txs[1], txs[2], txs[3]]
       const txnsToSign = txns.map(txn => {
         const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
         // console.log(encodedTxn);
         return {
           txn: encodedTxn,
       };
     });
     const requestParams = [ txnsToSign ];
     const request = formatJsonRpcRequest("algo_signTxn", requestParams);
   
     const result = await connector.sendCustomRequest(request);
     const decodedResult = result.map(element => {
       return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
     });
     // // console.log(result);
     // // console.log(escrow.blob);
       // send and await
       decodedResult[2] = escrow.blob;
       let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setUsdcAmount("");
    setElemAmount("");
    await balAsset();
    await globalState();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        handleHideLoad();
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
    }
}
}
}
}

const amountSet = (value) =>
{
    setElemAmount(value);
    setUsdcAmount((((parseFloat(value) * elemPrice)/usdcPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]));
}

useEffect(async () => {
    await balAsset();
}, [usdcBalances, elemBalances]);

const balAsset = async () =>
{
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = bal['account']['assets']['length'];
// // console.log(bal['account']['assets']);
for(let i = 0; i < l; i++)
{
    if(bal['account']['assets'][i]['asset-id'] === usdcID)
    {
        setUsdcBalances(bal['account']['assets'][i]['amount']);
        break;
    }
}
for(let j = 0; j < l; j++)
{
    if(bal['account']['assets'][j]['asset-id'] === elemID)
    {
        setElemBalances(bal['account']['assets'][j]['amount']);
        break;
    }
}

// setAssets(bal['account']['assets']);
}

useEffect(async() => {
    await minBal();
}, [minAlgo]);

const minBal = async () =>
{
    let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
    // // console.log("minBalanceApi", min['min-balance']);
    // setMinAlgo((min['amount'] - min['min-balance'] - 100000) < 0 || (min['amount'] - min['min-balance'] - 100000) === 'NaN' ? 0 : (min['amount'] - min['min-balance'] - 100000));
    setMinAlgo(min['amount'] - min['min-balance']);
    // console.log("minBalance", minAlgo);
}

useEffect(async() => {
    await optCheck();
}, [assetUsdcOpt, assetElemOpt, appOpt]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
 //// console.log(accountInfo);
let assetCount = accountInfo['account']['assets']['length']
// // console.log(l);
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'][i]['asset-id'] === usdcID)
    {
        setAssetUsdcOpt(true);
        break;
    }
}
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'][i]['asset-id'] === elemID)
    {
        setAssetElemOpt(true);
        break;
    }
}
const apps = accountInfo['account']['apps-local-state'];
 //// console.log("app", apps['length']);
// setAssets(bal['account']['assets']);
let appCount = apps['length'];
// // console.log(l);
for(let j = 0; j < appCount; j++)
{
    if(accountInfo['account']['apps-local-state'][j]['id'] === appID_global)
    {
        // console.log(accountInfo['account']['apps-local-state'][j]['id']);
        setAppOpt(true);
        break;
    }
}
}

useEffect(async() => {
    optinModal();
},[prerequisiteShow, assetUsdcOpt, assetElemOpt, appOpt]);

const optinModal = () =>
{
    if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === '')
    {
        handlePrerequisiteClose();
    }
    else
    {
    let card = 0;
    if(card === 1)
    {
        handlePrerequisiteShow();
    }
    // else{
    //     handlePrerequisiteClose();
    }
}

const appOptinWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInApp();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInAppPera();
    }
}

const assetOptinUsdcWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInUsdcAsset();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInUsdcAssetPera();
    }
}

const assetOptinElemWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInElemAsset();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInElemAssetPera();
    }
}


const elemMax = () =>
{
    // console.log("max", parseFloat(elemBalances)/1000000);
    amountSet((parseFloat(elemBalances)/1000000).toString() === 'NaN' || (parseFloat(elemBalances)/1000000) === null ? '0' : parseFloat(elemBalances)/1000000);
}

    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        <Card className='card-dash d-block border-0 mb-4'>
                        <div className="d-flex align-items-center float-end mt-1 acc-h-links mb-4">
                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the ELEM amount and check whether the required USDC amount is displayed.<br /><br /><strong className='text-purple'>2.</strong> Once you confirmed the required USDC amount click on "Buyback" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                        </div><br/><br/>
                            <div className="group-row mb-20">
                                <Row>
                                    <Col sm={5} className="mb-sm-0 mb-3">
                                        <Button variant='link' className='btn-currency p-0'>
                                            <img src={dimeLogo} alt="ELEM" />
                                            <div className="ms-3 text-start">
                                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances)/1000000 ? (parseFloat(elemBalances)/1000000).toFixed(2): '0.00'}</h5> */}
                                                <h5 className='mb-0 font-semibold'>DIME</h5>
                                            </div>
                                        </Button>
                                    </Col>
                                    <Col sm={7}>
                                        <div className="input-group-max px-3 input-group-max-lg w-100">
                                        <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            // value={elemAmount}
                                                            type='text'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => getbuybackvalue(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={elemMax}>Max</Button>
                                        </InputGroup>
                                            {/* <input type="number" placeholder='0.00' className='form-control' value={elemAmount} onChange={(e) => amountSet(e.target.value)}/> */}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="group-row">
                                <Row>
                                    <Col sm={5} className="mb-sm-0 mb-3">
                                        <Button variant='link' className='btn-currency p-0'>
                                            <img src={blackLogo} alt="ELEM" />
                                            <div className="ms-3 text-start">
                                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances)/1000000 ? (parseFloat(elemBalances)/1000000).toFixed(2): '0.00'}</h5> */}
                                                <h5 className='mb-0 font-semibold'>BLACK</h5>
                                            </div>
                                        </Button>
                                    </Col>
                                    <Col sm={7}>
                                        <div className="input-group-max px-3 input-group-max-lg w-100">
                                        
                                            <input type="number"  className='form-control' value={parseFloat(blackvalue) ? (parseFloat(blackvalue)/1e18).toFixed(8): '0.00'} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-sm-4 p-2">
                                <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                            </div>
                            <div className="group-row">
                                <Row>
                                    <Col sm={5} className="mb-sm-0 mb-3">
                                        <Button variant='link' className='btn-currency p-0'>
                                            <img src={daiLogo} alt="USDC" />
                                            <div className="ms-3 text-start">
                                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(usdcBalances)/1000000 ? (parseFloat(usdcBalances)/1000000).toFixed(2): '0.00'}</h5> */}
                                                <h5 className='mb-0 font-semibold'>DAI</h5>
                                            </div>
                                        </Button>
                                    </Col>
                                    <Col sm={7}>
                                        <div className="input-group-max px-3 input-group-max-lg w-100">
                                            <input type="number" placeholder='0.00' value={parseFloat(collvalue) ? (parseFloat(collvalue)/1e18).toFixed(8): '0.00'}readonly disabled className='form-control' />
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <hr className='my-4' />

                            <div className="mb-20">
                                <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                    <span> </span>
                                    {/* <strong className='font-semibold'>Rate : 1 USDC = 0.33 ELEM</strong> */}
                                </div>
                            </div>
                            {recollAvaible ? (<>
                                <ButtonLoad loading={loader} className='btn w-100 btn-blue' onClick={buyback}>
                                Buyback
                            </ButtonLoad>
                </>):(<>
                   
                <ButtonLoad disabled={true}  className='btn w-100 btn-blue' onClick={buyback}>
                                Buyback  Not Available
                            </ButtonLoad>
                </>)}
                            
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
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <center><span>Collateral is not balanced</span></center>
                    {/* { appOpt === false ? <ButtonLoad loading={loadAppOpt} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinWalletCheck}>
                        <span className='text-white'>1. App Opt-in</span>
                        <img src={PeraWalletLogo} alt="MetaMask" />
                    </ButtonLoad> : <></>}
                    { assetUsdcOpt === false ? <ButtonLoad loading={loadAssetOptUsdc} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={assetOptinUsdcWalletCheck}>
                        <span className='text-white'>2. Opt-in USDC asset</span>
                         <img src={PeraWalletLogo} alt="MetaMask" /> 
                    </ButtonLoad> : <></>}
                    { assetElemOpt === false ? <ButtonLoad loading={loadAssetOptElem} variant='primary' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={assetOptinElemWalletCheck}>
                        <span className='text-white'>3. Opt-in ELEM asset</span>
                         {/* <img src={MyAlgoLogo} alt="My Algo Wallet" />  
                    </ButtonLoad> : <></>} */}
                </Modal.Body>
            </Modal>                
            </Container>
        </Layout>
    );
};

export default Stablecoin;