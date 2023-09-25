import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import USDC from '../../assets/images/usdc.jpg';
import ButtonLoad from 'react-bootstrap-button-loader';
import { updatealgobalance } from "../formula";

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import elemLogo from '../../assets/images/elem-original.png';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
import redeemDetails from '../Dashboard/stablecoin-only.json';
import usdcLogo from '../../assets/images/usdc-logo.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import node from './nodeapi.json'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";


const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";

const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
    
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

const StablecoinRedeem = () => {

    useEffect(() => {
        document.title = "ELEMENT | Redeem"
    }, [])

    const [show, setShow] = useState(true);
    const [connector, setConnector] = useState("");
    const [loadRedeem, setLoadRedeem] = useState(false);
    const [appOptDynamic, setAppOptDynamic] = useState(false);
    const [C_Percent, setC_Percent] = useState();
    const [usdcPrice, setUsdcPrice] = useState();
    const [elemPrice, setElemPrice] = useState();

    const handleShowRedeem = () => setLoadRedeem(true);
    const handleHideRedeem = () => setLoadRedeem(false);

    const [loadAssetOptUsdc, setLoadAssetOptUsdc] = useState(false);

    const handleShowAssetOptUsdc = () => setLoadAssetOptUsdc(true);
    const handleHideAssetOptUsdc = () => setLoadAssetOptUsdc(false);

    const [loadAssetOptElem, setLoadAssetOptElem] = useState(false);

    const handleShowAssetOptElem = () => setLoadAssetOptElem(true);
    const handleHideAssetOptElem = () => setLoadAssetOptElem(false);

    const [loadAppOpt, setLoadAppOpt] = useState(false);

    const handleShowAppOpt = () => setLoadAppOpt(true);
    const handleHideAppOpt = () => setLoadAppOpt(false);
    
    const [loadAppOptDynamic, setLoadAppOptDynamic] = useState(false);

    const handleShowAppOptDynamic = () => setLoadAppOptDynamic(true);
    const handleHideAppOptDynamic = () => setLoadAppOptDynamic(false);

    const [prerequisiteShow, setLoadPrerequisite] = useState(false);

    const handlePrerequisiteShow = () => setLoadPrerequisite(true);
    const handlePrerequisiteClose = () => setLoadPrerequisite(false);

    const [usdcAmount, setUsdcAmount ] = useState();
    const [assetUsdcOpt, setAssetUsdcOpt] = useState(false);
    const [assetElemOpt, setAssetElemOpt] = useState(false);
    const [usdcAmount1, setUsdcAmount1 ] = useState("");
    const [usdcAmount99, setUsdcAmount99 ] = useState("");
    const [elemAmount, setElemAmount ] = useState();
    const [tauAmount, setTauAmount ] = useState();
    const [appOpt, setAppOpt] = useState(false);

    const [usdcEinrAmount, setUsdcEinrAmount ] = useState("");
    const [usdcEinrAmount1, setUsdcEinrAmount1 ] = useState("");
    const [usdcEinrAmount99, setUsdcEinrAmount99 ] = useState("");
    const [elemEinrAmount, setElemEinrAmount ] = useState("");
    const [EinrAmount, setEinrAmount ] = useState("");

        //Einr states

        const [C_PercentEinr, setC_PercentEinr] = useState();
        const [usdcPriceEinr, setUsdcPriceEinr] = useState();
        const [elemPriceEinr, setElemPriceEinr] = useState();
        const [einrPrice, setEinrPrice] = useState();
        const [cRatioValueEinr, setCRatioValueEinr] = useState();

    const [assets, setAssets] = useState("");

    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [tauBalances, setTauBalances] = useState("");
    const [EinrBalances, setEinrBalances] = useState("");
    const [einrCir, setEinrCir] = useState("");
    const [tauCir, setTauCir] = useState("");

    const [minAlgo, setMinAlgo] = useState("");

    let appID_global = redeemDetails.dynamicStablecoinAppIdEinr;
    let tauID = redeemDetails.tauID;
    let einrID = redeemDetails.einrID;
    let elemID = redeemDetails.elemID;
    let usdcID = redeemDetails.usdcID;
    let totalSupply = 18446744073709551615;
    let elemReserve = redeemDetails.rebaseReserveAddress;

    let appID_dynamic = redeemDetails.dynamicStablecoinAppID;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

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
              handleHideAppOpt();
              handleHideRedeem();
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

        const reload = async () => {
            window.location.reload();
        }

        useEffect(async() => {
            await globalState();
        }, [C_Percent, usdcPrice, elemPrice]);
        
        const globalState = async () =>
        {
            let appGlobalStateGet = await algodClientGet.getApplicationByID(appID_dynamic).do();
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

        useEffect(async() => {
            await globalStateEinr();
        }, [C_PercentEinr, usdcPriceEinr, elemPriceEinr, einrPrice]);
        
        const globalStateEinr = async () =>
        {
            let appGlobalStateGet = await algodClientGet.getApplicationByID(appID_global).do();
            // console.log("app", appGlobalStateGet['params']['global-state']);
            let appGlobalState = appGlobalStateGet['params']['global-state'];
            let appGlobalStateCount = appGlobalStateGet['params']['global-state']['length'];
            for(let i = 0; i < appGlobalStateCount; i++)
            {
                if(appGlobalState[i]['key'] === "Q19SYXRpbw==")
                {
                    setC_PercentEinr(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("C_PercentEinr", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "dXNkY1ByaWNl")
                {
                    setUsdcPriceEinr(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("usdcPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "ZWxlbVByaWNl")
                {
                    setElemPriceEinr(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("elemPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "ZWluclByaWNl")
                {
                    setEinrPrice(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
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
              ////toast.info("Transaction in Progress");
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

        const optInAppDynamic = async () => 
        {
            handleShowAppOptDynamic();
            if (localStorage.getItem("walletAddress") === "")
                {
                    toast.error("Connect your wallet");
                    handleHideAppOptDynamic();
                }
                else{
                    if(parseFloat(minAlgo) < 101000)
                    {
                        toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                        handleHideAppOptDynamic();
                    }
                    else
                    {        
            let params = await algodClient.getTransactionParams().do();
                
            try {
          
              const txn = algosdk.makeApplicationOptInTxnFromObject({
                  suggestedParams:params,
                  from: localStorage.getItem("walletAddress"),
                  appIndex: parseInt(appID_dynamic),
              });
          
              const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
              //toast.info("Transaction in Progress");
              const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
              await waitForConfirmation(algodClient, response.txId);
              setAppOptDynamic(true);
              await minBal();
            //   toast.success(`Transaction Success ${response.txId}`);
          }
          catch (err) {
              handleHideAppOptDynamic();
              toast.error(`Transaction Failed due to ${err}`);
              console.error(err);
          }
        }
        }
        }
        
        const optInAppDynamicPera = async () => 
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
                    if(parseFloat(minAlgo) < 101000)
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
                  appIndex: parseInt(appID_dynamic),
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
              setAppOptDynamic(true);
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

const redeemTau = async () => 
{
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideRedeem();
        }
        else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideRedeem();
            }
            else
            {
                if(parseFloat(tauAmount) > parseFloat(tauBalances)/1000000)
                {
                    toast.error(`Insufficient TAU balance.`+"\n"+`Your balance is ${(parseFloat(tauBalances)/1000000).toFixed(2)} TAU but trying to enter ${tauAmount} TAU`);
                    handleHideRedeem();
                }
                else
                {
                    if(parseFloat(tauAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideRedeem();
                    }
                    else
                    { 
                try {
                    // const accounts = await myAlgoWallet.connect();
                    // const addresses = accounts.map(account => account.address);
                    const params = await algodClient.getTransactionParams().do();
              
                    let appArgs1 = [];
                    appArgs1.push(new Uint8Array(Buffer.from("redeemTau")));
            
                    let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                      from:localStorage.getItem("walletAddress"), 
                      suggestedParams: params, 
                      appIndex: parseInt(appID_dynamic), 
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
                    
                    let program = new Uint8Array(Buffer.from(redeemDetails.dynamicStablecoinEscrow, "base64"));          
                    let lsig = new algosdk.LogicSigAccount(program);
                    let programElem = new Uint8Array(Buffer.from(redeemDetails.elemReserve, "base64"));          
                    let lsigElem = new algosdk.LogicSigAccount(programElem);
                    //  console.log("Escrow =", lsigElem.address());
                    
                    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem("walletAddress"), 
                        to: lsig.address(), 
                        amount: parseInt(parseFloat(tauAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
                        assetIndex: parseInt(tauID), 
                        suggestedParams: params
                      });
            
                      let usdc95 = ((parseFloat(usdcAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 95)/100;
               
                    let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsig.address(), 
                        to: localStorage.getItem("walletAddress"), 
                        amount: parseInt(usdc95), 
                        assetIndex: parseInt(usdcID), 
                        suggestedParams: params
                      }); 

                      let usdc5 = ((parseFloat(usdcAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 5)/100;
               
                    let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsig.address(), 
                        to: redeemDetails.owner, 
                        amount: parseInt(usdc5), 
                        assetIndex: parseInt(usdcID), 
                        suggestedParams: params
                      });                       
            
                      let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsigElem.address(), 
                        to: localStorage.getItem("walletAddress"), 
                        amount: parseInt(parseFloat(elemAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
                        assetIndex: parseInt(elemID), 
                        suggestedParams: params
                      });
                       //// console.log("elem =",parseFloat(elemAmount).toFixed(6) * 1000000);
                    let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                      from: localStorage.getItem("walletAddress"), 
                      to: lsig.address(), 
                      amount: 2000, 
                       note: undefined,  
                       suggestedParams: params
                     });

                     let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem("walletAddress"), 
                        to: lsigElem.address(), 
                        amount: 1000, 
                         note: undefined,  
                         suggestedParams: params
                       });
                    
                    const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ]);
                    const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ];
                    txs[0].group = groupID;
                    txs[1].group = groupID;
                    txs[2].group = groupID;
                    txs[3].group = groupID;
                    txs[4].group = groupID;
                    txs[5].group = groupID;
                    txs[6].group = groupID;
            
            
                    const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[5].toByte(), txs[6].toByte()]);
                  //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
                    const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[2], lsig);
                    const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[3], lsig);
                    const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsigElem);
            
                    //toast.info("Transaction in Progress");
                const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob, signedTxEscrow1.blob, signedTxEscrow2.blob, signedTxEscrow3.blob, signedTx1[2].blob, signedTx1[3].blob ]).do();
                //// console.log("TxID", JSON.stringify(response, null, 1));
                await waitForConfirmation(algodClient, response.txId);
                setTauAmount("");
                await balAsset();
                await globalState();       
                await minBal();
                // toast.success(`Transaction Successfully completed with ${response.txId}`);
                  } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideRedeem();
        console.error(err);
      }
    }
    }
    }
    }
}

const redeemTauPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideRedeem();
        }
        else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideRedeem();
            }
            else
            {
                if(parseFloat(tauAmount) > parseFloat(tauBalances)/1000000)
                {
                    toast.error(`Insufficient TAU balance.`+"\n"+`Your balance is ${(parseFloat(tauBalances)/1000000).toFixed(2)} TAU but trying to enter ${tauAmount} TAU`);
                    handleHideRedeem();
                }
                else
                {
                    if(parseFloat(tauAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideRedeem();
                    }
                    else
                    { 
                try {
                    // const accounts = await myAlgoWallet.connect();
                    // const addresses = accounts.map(account => account.address);
                    const params = await algodClient.getTransactionParams().do();
              
                    let appArgs1 = [];
                    appArgs1.push(new Uint8Array(Buffer.from("redeemTau")));
            
                    let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                      from:localStorage.getItem("walletAddress"), 
                      suggestedParams: params, 
                      appIndex: parseInt(appID_dynamic), 
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
                    
                    let program = new Uint8Array(Buffer.from(redeemDetails.dynamicStablecoinEscrow, "base64"));          
                    let lsig = new algosdk.LogicSigAccount(program);
                    let programElem = new Uint8Array(Buffer.from(redeemDetails.elemReserve, "base64"));          
                    let lsigElem = new algosdk.LogicSigAccount(programElem);
                    //  console.log("Escrow =", lsigElem.address());
                    
                    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem("walletAddress"), 
                        to: lsig.address(), 
                        amount: parseInt(parseFloat(tauAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
                        assetIndex: parseInt(tauID), 
                        suggestedParams: params
                      });
            
                      let usdc95 = ((parseFloat(usdcAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 95)/100;
               
                    let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsig.address(), 
                        to: localStorage.getItem("walletAddress"), 
                        amount: parseInt(usdc95), 
                        assetIndex: parseInt(usdcID), 
                        suggestedParams: params
                      }); 

                      let usdc5 = ((parseFloat(usdcAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 5)/100;
               
                    let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsig.address(), 
                        to: redeemDetails.owner, 
                        amount: parseInt(usdc5), 
                        assetIndex: parseInt(usdcID), 
                        suggestedParams: params
                      });                       
            
                      let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsigElem.address(), 
                        to: localStorage.getItem("walletAddress"), 
                        amount: parseInt(parseFloat(elemAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
                        assetIndex: parseInt(elemID), 
                        suggestedParams: params
                      });
                       //// console.log("elem =",parseFloat(elemAmount).toFixed(6) * 1000000);
                    let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                      from: localStorage.getItem("walletAddress"), 
                      to: lsig.address(), 
                      amount: 2000, 
                       note: undefined,  
                       suggestedParams: params
                     });

                     let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem("walletAddress"), 
                        to: lsigElem.address(), 
                        amount: 1000, 
                         note: undefined,  
                         suggestedParams: params
                       });
                    
                    const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ]);
                    const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ];
                    txs[0].group = groupID;
                    txs[1].group = groupID;
                    txs[2].group = groupID;
                    txs[3].group = groupID;
                    txs[4].group = groupID;
                    txs[5].group = groupID;
                    txs[6].group = groupID;

      //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
        const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[2], lsig);
        const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[3], lsig);
        const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsigElem);
        // const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsig);
      //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
      const txns = [txs[0], txs[1], txs[2], txs[3], txs[4], txs[5], txs[6]]
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
    // console.log(result);
    // console.log(signedTxEscrow2.blob);
      // send and await
      decodedResult[2] = signedTxEscrow1.blob;
      decodedResult[3] = signedTxEscrow2.blob;
      decodedResult[4] = signedTxEscrow3.blob;
      let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setTauAmount("");
    await balAsset();
    await globalState();       
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideRedeem();
        console.error(err);
      }
    }
    }
    }
    }
}

const redeemEinr = async () => 
{
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideRedeem();
        }
        else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideRedeem();
            }
            else
            {
                if(parseFloat(EinrAmount) > parseFloat(EinrBalances)/1000000)
                {
                    toast.error(`Insufficient EINR balance.`+"\n"+`Your balance is ${(parseFloat(EinrBalances)/1000000).toFixed(2)} EINR but trying to enter ${EinrAmount} EINR`);
                    handleHideRedeem();
                }
                else
                {
                    if(parseFloat(EinrAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideRedeem();
                    }
                    else
                    { 
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
  
        let appArgs1 = [];
        appArgs1.push(new Uint8Array(Buffer.from("redeemEinr")));

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
        
        let program = new Uint8Array(Buffer.from(redeemDetails.dynamicStablecoinEscrowEinr, "base64"));          
        let lsig = new algosdk.LogicSigAccount(program);
        let programElem = new Uint8Array(Buffer.from(redeemDetails.elemReserve, "base64"));          
        let lsigElem = new algosdk.LogicSigAccount(programElem);
        //  console.log("Escrow =", lsigElem.address());
        
        let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsig.address(), 
            amount: parseInt(parseFloat(EinrAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
            assetIndex: parseInt(einrID), 
            suggestedParams: params
          });

          let usdc95 = (((parseFloat(usdcEinrAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 95)/100);
   
        let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(usdc95), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          }); 

          let usdc5 = (((parseFloat(usdcEinrAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 5)/100);
   
        let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: redeemDetails.owner, 
            amount: parseInt(usdc5), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          });                       

          let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsigElem.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(parseFloat(elemEinrAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
            assetIndex: parseInt(elemID), 
            suggestedParams: params
          });
           //// console.log("elem =",parseFloat(elemAmount).toFixed(6) * 1000000);
        let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem("walletAddress"), 
          to: lsig.address(), 
          amount: 2000, 
           note: undefined,  
           suggestedParams: params
         });

         let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsigElem.address(), 
            amount: 1000, 
             note: undefined,  
             suggestedParams: params
           });
        
        const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ]);
        const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
        txs[3].group = groupID;
        txs[4].group = groupID;
        txs[5].group = groupID;
        txs[6].group = groupID;


        const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[5].toByte(), txs[6].toByte()]);
      //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
        const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[2], lsig);
        const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[3], lsig);
        const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsigElem);

        //toast.info("Transaction in Progress");
    const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob, signedTxEscrow1.blob, signedTxEscrow2.blob, signedTxEscrow3.blob, signedTx1[2].blob, signedTx1[3].blob ]).do();
    //// console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    setEinrAmount("");
    await balAsset();
    await globalStateEinr();       
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideRedeem();
        console.error(err);
      }
    }
}
}
}
}

const redeemEinrPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideRedeem();
        }
        else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideRedeem();
            }
            else
            {
                if(parseFloat(EinrAmount) > parseFloat(EinrBalances)/1000000)
                {
                    toast.error(`Insufficient EINR balance.`+"\n"+`Your balance is ${(parseFloat(EinrBalances)/1000000).toFixed(2)} EINR but trying to enter ${EinrAmount} EINR`);
                    handleHideRedeem();
                }
                else
                {
                    if(parseFloat(EinrAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideRedeem();
                    }
                    else
                    { 
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
  
        let appArgs1 = [];
        appArgs1.push(new Uint8Array(Buffer.from("redeemEinr")));

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
        
        let program = new Uint8Array(Buffer.from(redeemDetails.dynamicStablecoinEscrowEinr, "base64"));          
        let lsig = new algosdk.LogicSigAccount(program);
        let programElem = new Uint8Array(Buffer.from(redeemDetails.elemReserve, "base64"));          
        let lsigElem = new algosdk.LogicSigAccount(programElem);
        //  console.log("Escrow =", lsigElem.address());
        
        let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsig.address(), 
            amount: parseInt(parseFloat(EinrAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
            assetIndex: parseInt(einrID), 
            suggestedParams: params
          });

          let usdc95 = (((parseFloat(usdcEinrAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 95)/100);
   
        let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(usdc95), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          }); 

          let usdc5 = (((parseFloat(usdcEinrAmount)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000 * 5)/100);
   
        let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: redeemDetails.owner, 
            amount: parseInt(usdc5), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          });                       

          let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsigElem.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(parseFloat(elemEinrAmount).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000), 
            assetIndex: parseInt(elemID), 
            suggestedParams: params
          });
           //// console.log("elem =",parseFloat(elemAmount).toFixed(6) * 1000000);
        let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem("walletAddress"), 
          to: lsig.address(), 
          amount: 2000, 
           note: undefined,  
           suggestedParams: params
         });

         let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsigElem.address(), 
            amount: 1000, 
             note: undefined,  
             suggestedParams: params
           });
        
        const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ]);
        const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
        txs[3].group = groupID;
        txs[4].group = groupID;
        txs[5].group = groupID;
        txs[6].group = groupID;


      //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
      const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[2], lsig);
      const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[3], lsig);
      const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsigElem);
    //   const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsig);
    //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
    const txns = [txs[0], txs[1], txs[2], txs[3], txs[4], txs[5], txs[6]]
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
    decodedResult[2] = signedTxEscrow1.blob;
    decodedResult[3] = signedTxEscrow2.blob;
    decodedResult[4] = signedTxEscrow3.blob;
    let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setEinrAmount("");
    await balAsset();
    await globalStateEinr();       
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideRedeem();
        console.error(err);
      }
    }
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
    ////toast.info("Transaction in Progress");
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
    ////toast.info("Transaction in Progress");
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

const print = () => {
     //// console.log("usdc =", usdcAmount);
     //// console.log("elem =", elemAmount);
     //// console.log("tau =", tauAmount);
}

useEffect(async () => {
    await balAsset();
}, [usdcBalances, elemBalances, tauBalances, EinrBalances, tauCir]);

const balAsset = async () =>
{
    // indexClient
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = bal['account']['assets']['length'];
let appLength = bal['account']['apps-local-state']['length'];
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
for(let j = 0; j < l; j++)
{
    if(bal['account']['assets'][j]['asset-id'] === tauID)
    {
        setTauBalances(bal['account']['assets'][j]['amount']);
        break;
    }
}
for(let j = 0; j < l; j++)
{
    if(bal['account']['assets'][j]['asset-id'] === einrID)
    {
        setEinrBalances(bal['account']['assets'][j]['amount']);
        break;
    }
}

// setAssets(bal['account']['assets']);
}

useEffect(async () => {
    await cir();
}, [tauCir, einrCir]);

const cir = async () =>
{
    let escrow = await indexClient.lookupAccountByID(redeemDetails.swapTauEscrowAddress).do();
// // console.log(bal['account']['assets']);
let eL = escrow['account']['assets']['length'];
// // console.log(l);
for(let k = 0; k < eL; k++)
{
    if(escrow['account']['assets'][k]['asset-id'] === tauID)
    {
        setTauCir(escrow['account']['assets'][k]['amount']);
        break;
    }
}
for(let k = 0; k < eL; k++)
{
    if(escrow['account']['assets'][k]['asset-id'] === einrID)
    {
        setEinrCir(escrow['account']['assets'][k]['amount']);
        break;
    }
}
}

const amountSet = (value)=>{
    setTauAmount(value);
    setElemAmount(((parseFloat(value) * (1 - C_Percent))/elemPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setUsdcAmount(((parseFloat(value) * C_Percent)/usdcPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // setUsdcAmount99((parseFloat(value)/2 * 99 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // setUsdcAmount1((parseFloat(value)/2 * 1 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // // console.log(value);
}

const amountSetEinr = (value)=>{
    setEinrAmount(value);
    setElemEinrAmount((((parseFloat(value) * (1 - C_PercentEinr))/elemPriceEinr)*einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setUsdcEinrAmount((((parseFloat(value) * C_PercentEinr)/usdcPriceEinr)*einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // setUsdcEinrAmount99((parseFloat(value)/200 * 99 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // setUsdcEinrAmount1((parseFloat(value)/200 * 1 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // // console.log(value);
}

const balCheckTau = async () =>
{        //// console.log("usdc 1 percent", Number.isInteger(parseFloat(usdcAmount1.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0])));
    handleShowRedeem();   
    if((parseFloat(tauBalances/1000000)) < parseFloat(tauAmount))
        {
            toast.error(`Your balance is ${(parseFloat(tauBalances/1000000)).toFixed(2)} TAU but trying to spend ${tauAmount} TAU`);
            handleHideRedeem();
        }
        else
        {
            await redeemTauWalletCheck();
        }
}

const balCheckEinr = async () =>
{
    handleShowRedeem();
        if((parseFloat(EinrBalances/1000000)) < parseFloat(EinrAmount))
        {
            toast.error(`Your balance is ${(parseFloat(EinrBalances/1000000)).toFixed(2)} EINR but trying to spend ${EinrAmount} EINR`);
        }
        else
        {
            await redeemEinrWalletCheck();
        }
}

const tauMax = () =>
{
    // console.log("max", parseFloat(tauBalances)/1000000);
    amountSet((parseFloat(tauBalances)/1000000).toString() === 'NaN' || (parseFloat(tauBalances)/1000000) === null ? '0' : parseFloat(tauBalances)/1000000);
}

const einrMax = () =>
{
    // // console.log("max", parseFloat(tauBalances)/1000000);
    amountSetEinr((parseFloat(EinrBalances)/1000000).toString() === 'NaN' || (parseFloat(EinrBalances)/1000000) === null ? '0' : parseFloat(EinrBalances)/1000000);
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
        setAppOpt(true);
        break;
    }
}
for(let j = 0; j < appCount; j++)
{
    if(accountInfo['account']['apps-local-state'][j]['id'] === appID_dynamic)
    {
        setAppOptDynamic(true);
        break;
    }
}
}

useEffect(async() => {
    optinModal();
},[prerequisiteShow, assetUsdcOpt, assetElemOpt, appOpt, appOptDynamic]);

const optinModal = () =>
{
    if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === '')
    {
        handlePrerequisiteClose();
    }
    else
    {
    if(assetUsdcOpt === false || assetElemOpt === false || appOpt === false || appOptDynamic === false)
    {
        handlePrerequisiteShow();
    }
    else{
        handlePrerequisiteClose();
    }
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

const appOptinDynamicWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInAppDynamic();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInAppDynamicPera();
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

const redeemTauWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await redeemTau();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await redeemTauPera();
    }
}

const redeemEinrWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await redeemEinr();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await redeemEinrPera();
    }
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
                                                <strong className='text-purple'>1.</strong> Enter the amount of TAU or EINR you want to Burn and redeem equivalent USDC and ELEM. The values of USDC and ELEM will be automatically generated and displayed.<br /><br /><strong className='text-purple'>2.</strong> For Redeem 1% fee will be reducted from the amount of USDC you will be received. Now click on "Redeem TAU" or "Redeem EINR" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="mint" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="mint" title="Redeem TAU">
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={tauLogo} alt="TAU" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>TAU</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(tauBalances) ? (parseFloat(tauBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={tauAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => amountSet(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={tauMax}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={elemLogo} alt="ELEM" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>ELEM</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={((parseFloat(tauAmount) * (1 - C_Percent))/elemPrice).toFixed(6)} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>                                    
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={USDC} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>USDC</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(usdcBalances) ? (parseFloat(usdcBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={(((parseFloat(tauAmount) * C_Percent)/usdcPrice) * 0.95).toFixed(6)}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Max mint per tx</span>
                                            <strong className='font-semibold'>0.00 USDC</strong>
                                        </div> */}
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Rate : 1 USDC = 1 TAU = 0.33 ELEM</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Redemption fee (5%) : {(((parseFloat(tauAmount) * C_Percent)/usdcPrice) * 0.05) ? (((parseFloat(tauAmount) * C_Percent)/usdcPrice) * 0.05).toFixed(6) : '0'} USDC</strong>
                                        </div>
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(tauAmount).toFixed(2) === 'NaN' ? '0.00' : parseFloat(tauAmount).toFixed(2)} TAU</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> */}
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                            <ButtonLoad loading={loadRedeem} className='btn w-100 btn-blue' onClick={balCheckTau}>
                                                Redeem TAU
                                            </ButtonLoad>
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
                                <Tab eventKey="redeem" title="Redeem EINR">
                                <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={einrLogo} alt="TAU" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>EINR</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={EinrAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => amountSetEinr(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={einrMax}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={elemLogo} alt="ELEM" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>ELEM</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={(((parseFloat(EinrAmount) * (1 - C_PercentEinr))/elemPriceEinr)*einrPrice).toFixed(6)} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>                                    
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={USDC} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>USDC</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(usdcBalances) ? (parseFloat(usdcBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={(((parseFloat(EinrAmount) * C_PercentEinr)/usdcPriceEinr)*einrPrice * 0.95).toFixed(6)}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Max mint per tx</span>
                                            <strong className='font-semibold'>0.00 USDC</strong>
                                        </div> */}
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Rate : 1 USDC = 76 EINR = 0.33 ELEM</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Redemption fee (5%) : {(((parseFloat(EinrAmount) * C_PercentEinr)/usdcPriceEinr)*einrPrice * 0.05) ? (((parseFloat(EinrAmount) * C_PercentEinr)/usdcPriceEinr)*einrPrice * 0.05).toFixed(6) : '0'} USDC</strong>
                                        </div>
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(tauAmount).toFixed(2) === 'NaN' ? '0.00' : parseFloat(tauAmount).toFixed(2)} TAU</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> */}
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                            <ButtonLoad loading={loadRedeem} className='btn w-100 btn-blue' onClick={balCheckEinr}>
                                                Redeem EINR
                                            </ButtonLoad>
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
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
                    { appOpt === false ? <ButtonLoad loading={loadAppOpt} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinWalletCheck}>
                        <span className='text-white'>1. App Opt-in (EINR)</span>
                        {/* <img src={PeraWalletLogo} alt="MetaMask" /> */}
                    </ButtonLoad> : <></>}
                    { appOptDynamic === false ? <ButtonLoad loading={loadAppOptDynamic} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinDynamicWalletCheck}>
                        <span className='text-white'>2. App Opt-in (TAU)</span>
                        {/* <img src={PeraWalletLogo} alt="MetaMask" /> */}
                    </ButtonLoad> : <></>}   
                    { assetUsdcOpt === false ? <ButtonLoad loading={loadAssetOptUsdc} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={assetOptinUsdcWalletCheck}>
                        <span className='text-white'>3. Opt-in USDC asset</span>
                        {/* <img src={PeraWalletLogo} alt="MetaMask" /> */}
                    </ButtonLoad> : <></>}
                    { assetElemOpt === false ? <ButtonLoad loading={loadAssetOptElem} variant='primary' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={assetOptinElemWalletCheck}>
                        <span className='text-white'>4. Opt-in ELEM asset</span>
                         {/* <img src={MyAlgoLogo} alt="My Algo Wallet" />  */}
                    </ButtonLoad> : <></>}
                </Modal.Body>
            </Modal>
            </Container>
        </Layout>
    );
};

export default StablecoinRedeem;