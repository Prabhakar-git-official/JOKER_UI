import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import USDC from '../../assets/images/usdc.jpg';
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
import { BLACKAddress, BlackAbi, DAIAddress, DIMEAddress, DaiAbi, DimeAbi, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress } from '../../abi/abi';

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

    const [assets, setAssets] = useState("");
    const [usdcLock, setUsdcLock] = useState("");
    const [assetEinrOpt, setAssetEinrOpt] = useState(false);
    const [assetTauOpt, setAssetTauOpt] = useState(false);
    const [appOpt, setAppOpt] = useState(false);
    const [appOptDynamic, setAppOptDynamic] = useState(false);

    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [tauBalances, setTauBalances] = useState("");
    const [EinrBalances, setEinrBalances] = useState("");
    const [einrCir, setEinrCir] = useState("");
    const [tauCir, setTauCir] = useState("");

    const [minAlgo, setMinAlgo] = useState("");
    const [C_Percent, setC_Percent] = useState();
    const [usdcPrice, setUsdcPrice] = useState();
    const [elemPrice, setElemPrice] = useState();
    const [cRatioValue, setCRatioValue] = useState();
    
         
    
    const[fxsValue,setfxsValue] = useState("")
    const[blackValue,setblackValue] = useState("")
    const[fraxValue,setfraxValue] = useState("")
    const[daiAmount,setdaiAmount] = useState("")
    const[fxsAmount,setfxsAmount] = useState("")
    const[mintenabled,setMintEnabled] = useState(true)
    
    const[RedeemEnabled,setRedeemEnabled] = useState(true)
    const[allowan,setAllowance] = useState("")
    const[JUsdALlowance,setJUsdALlowance] = useState("")

    const[collatout,setcollatout] = useState("")
    const[fxsOut,setfxsOut] = useState("")
    const[blackOut,setblackOut] = useState("")
    const[inputValue,setinputValue] = useState("")
    //Einr states

    const [C_PercentEinr, setC_PercentEinr] = useState();
    const [usdcPriceEinr, setUsdcPriceEinr] = useState();
    const [elemPriceEinr, setElemPriceEinr] = useState();
    const [einrPrice, setEinrPrice] = useState();
    const [cRatioValueEinr, setCRatioValueEinr] = useState();

    let appID_global = mintDetails.dynamicStablecoinAppIdEinr;
    let tauID = mintDetails.tauID;
    let einrID = mintDetails.einrID;
    let elemID = mintDetails.elemID;
    let usdcID = mintDetails.usdcID;
    let totalSupply = 18446744073709551615;
    let elemReserve = mintDetails.rebaseReserveAddress;
    let elemTreasury = mintDetails.rebaseElemTreasury;

    let appID_dynamic = mintDetails.dynamicStablecoinAppID;

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
            const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
            const daiCpntract = new ethers.Contract(DAIAddress, DaiAbi, provider);
            const JUSDcontract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
            let frax_price =  ethers.utils.formatUnits(await JusdPoolContract.getFRAXPrice(),0);
            console.log("frax_price")
            let mint_price_threshold =  ethers.utils.formatUnits(await JusdPoolContract.mint_price_threshold(),0);
            console.log("collateral_price", frax_price,mint_price_threshold)
            if((frax_price) >= mint_price_threshold){
                setMintEnabled(true)
            }
            else{
                setMintEnabled(false)
            }
            let redeem_price_threshold =  ethers.utils.formatUnits(await JusdPoolContract.redeem_price_threshold(),0);
            if(parseInt(frax_price) <= parseInt(redeem_price_threshold)){
                setRedeemEnabled(true)
                console.log("Redeem ENabled",true,redeem_price_threshold,frax_price)
            }
            else{
                setRedeemEnabled(false)
                console.log("Redeem ENabled",false)
            }
            
            let allowance =  ethers.utils.formatUnits(await daiCpntract.allowance(localStorage.getItem("walletAddress"),JUSDPoolAddress),0);
            console.log("allowance", allowance)
            setAllowance(allowance);

            let jusdallowance = ethers.utils.formatUnits(await JUSDcontract.allowance(localStorage.getItem("walletAddress"),JUSDPoolAddress),0);
            setJUsdALlowance(jusdallowance)
        }
      }

      const calculateJUSDmint = async(e)=>{
        

        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const account = accounts[0]; // Use the first account
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
        const JUSDContract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
        let collateral_price = await JusdPoolContract.collateral_prices(0);
        let col_ratio = await JUSDContract.global_collateral_ratio();
        let fxs_price = await JusdPoolContract.getFXSPrice();
        let black_price = await JusdPoolContract.getBLACKPrice();
        console.log("collateral_price", await ethers.utils.formatUnits(collateral_price, 0))
        let collat_needed = e * 1e18;
        let PRICE_PRECISION = 1e6;

        // let  frax_amount = (collat_needed * (await ethers.utils.formatUnits(collateral_price, 0))) / ((await ethers.utils.formatUnits(col_ratio, 0)* PRICE_PRECISION) ); //amount need to pass
        // console.log("frax_amount",frax_amount)

        let  frax_amount = (((collat_needed * PRICE_PRECISION)/(await ethers.utils.formatUnits(collateral_price, 0))) * PRICE_PRECISION)/ (await ethers.utils.formatUnits(col_ratio, 0) ); //amount need to pass
        console.log("frax_amount",frax_amount)
        setdaiAmount(collat_needed);
        setfxsAmount(frax_amount)
        const frax_for_collat = (frax_amount * (await ethers.utils.formatUnits(col_ratio, 0))) / PRICE_PRECISION;
        console.log("frax_for_collat",frax_for_collat)
        const frax_for_fxs = frax_amount - frax_for_collat;
        //    const collat_needed = getFRAXInCollateral(col_idx, frax_for_collat);
        const splited_value = (frax_for_fxs * 50) / 100;

        const fxs_needed = (splited_value * PRICE_PRECISION) / (await ethers.utils.formatUnits(fxs_price, 0)); // Implement getFXSPrice function
        const black_needed = (frax_for_fxs - splited_value) * PRICE_PRECISION / ((await ethers.utils.formatUnits(black_price, 0)) ); // Implement getBLACKPrice function
        const total_frax_mint = (frax_amount *  (PRICE_PRECISION - 3000)) / PRICE_PRECISION; //minting_fee[col_idx] = 3000;
        console.log("fxs_needed",fxs_needed,black_needed,total_frax_mint)
        setfxsValue(fxs_needed);
        setblackValue(black_needed);
        setfraxValue(total_frax_mint)


     
      
    
      

      }
      const  calculateRedeemValues = async(
        col_idx,
        frax_amount,
        fxs_out_min,
        col_out_min        
      )  => {
        // Constants
        const PRICE_PRECISION = 1e6; // Adjust as needed, ensure it matches the Solidity contract's precision
        let redemption_fee = 5500;
        // Calculate frax_after_fee
        const frax_after_fee = (frax_amount * (PRICE_PRECISION - redemption_fee)) / PRICE_PRECISION;
        console.log("col_ratio",frax_after_fee, frax_amount)
        // Initialize values
        let collat_out = 0;
        let fxs_out = 0;
        let black_out = 0;
     
        

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
        const JUSDContract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);

        let col_ratio =  await ethers.utils.formatUnits((await JUSDContract.global_collateral_ratio()),0);

        // Assumes $1 FRAX in all cases
        if (col_ratio >= PRICE_PRECISION) {
          // 1-to-1 or overcollateralized
          collat_out = await ethers.utils.formatUnits(await JusdPoolContract.getFRAXInCollateral(col_idx, BigInt(frax_after_fee)),0);
        } else if (col_ratio == 0) {
          // Algorithmic
          const splited_value = (frax_after_fee * 50) / 100;
          fxs_out = (splited_value * PRICE_PRECISION) /await ethers.utils.formatUnits(await JusdPoolContract.getFXSPrice(), 0);
          black_out = (frax_after_fee - splited_value) * PRICE_PRECISION / ((await ethers.utils.formatUnits(await JusdPoolContract.getBLACKPrice(), 0)) );
        } else {
          // Fractional
        
          let fx_in = ( ethers.utils.formatUnits(await JusdPoolContract.getFRAXInCollateral(col_idx, BigInt(frax_after_fee)),0));
          console.log("col_ratio",fx_in)
          collat_out = ( fx_in * col_ratio) / PRICE_PRECISION;
         
          const splited_value = (frax_after_fee * 50) / 100;
          fxs_out = (splited_value * (PRICE_PRECISION - col_ratio)) / await ethers.utils.formatUnits(await JusdPoolContract.getFXSPrice(), 0);;
          black_out = (frax_after_fee - splited_value) * (PRICE_PRECISION - col_ratio) / ((await ethers.utils.formatUnits(await JusdPoolContract.getBLACKPrice(), 0)) );
        }
        setcollatout(collat_out);
        setfxsOut(fxs_out)
        setblackOut(black_out)
        return {
          collat_out,
          fxs_out,
          black_out,
        };
      }

    const getReddemValue = async(val) =>{
        setinputValue(val*1e18)
        let col_idx = 0;
        // let frax_amount = e *1e18;
        const values = await calculateRedeemValues(col_idx,val*1e18,1,1);
        console.log("values",values)
    }
      
      
      

    const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
    
        const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
        const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

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
              handleHideMint();
              handleHideAppOpt();
              handleHideAppOptDynamic();
              handleHidecRatioLoad();
              handleHideAssetOptTau();
              handleHideAssetOptEinr();
              handleHidecRatioLoad();
              await updatealgobalance();
            //   await sleep(5000);
            //   reload();
              break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  
        
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
        }, [C_PercentEinr, usdcPriceEinr, elemPriceEinr]);
        
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

        useEffect(async () => {
            await balAsset();
        }, [assets, usdcBalances, elemBalances]);
        
        const balAsset = async () =>
        {
        let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
        let l = 0;
        if(bal['account']['assets'])
        {
        l = bal['account']['assets']['length'];
        }
        // // console.log(bal['account']['assets']);
        for(let i = 0; i < l; i++)
        {
            if(bal['account']['assets'])
            {
            if(bal['account']['assets'][i]['asset-id'] === usdcID)
            {
                setUsdcBalances(bal['account']['assets'][i]['amount']);
                break;
            }
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
            await cir();
        }, [tauCir, einrCir, usdcLock]);

        const cir =async () =>
        {
            let escrow = await indexClient.lookupAccountByID(mintDetails.swapTauEscrowAddress).do();            
        let eL = escrow['account']['assets']['length'];
        // setUsdcLock();
        for(let i = 0; i < eL; i++)
        {
            if(escrow['account']['assets'][i]['asset-id'] === usdcID)
            {
                setUsdcLock(escrow['account']['assets'][i]['amount']);
                break;
            }
        }
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

const optInApp = async () => 
{
    handleShowAppOpt();
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
            handleHideAppOpt();
        }
    }
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
      //toast.info("Transaction in Progress");
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
            handleHideAppOptDynamic();
        }
    }
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

const optInTauAsset = async () => 
{
    handleShowAssetOptTau();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptTau();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptTau();
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
          assetIndex: parseInt(tauID)
      });
  
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, response.txId);
      setAssetTauOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptTau();
      console.error(err);
  
  }
}
        }
}

const optInTauAssetPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowAssetOptTau();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptTau();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptTau();
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
          assetIndex: parseInt(tauID)
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
      setAssetTauOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptTau();
      console.error(err);
  
  }
}
        }
}

const optInEinrAsset = async () => 
{
    handleShowAssetOptEinr();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptEinr();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptEinr();
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
          assetIndex: parseInt(einrID)
      });
  
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, response.txId);
      setAssetEinrOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptEinr();
      console.error(err);
  
  }
}
        }
}

const optInEinrAssetPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowAssetOptEinr();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptEinr();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptEinr();
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
          assetIndex: parseInt(einrID)
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
      setAssetEinrOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptEinr();
      console.error(err);
  
  }
}
        }
}

const reload = async () => {
    window.location.reload();
}


const mintTau = async () => 
{

    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
        if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then mint");
            handleHideMint();
        }
        else{
            if(assetTauOpt === false)
            {
                toast.error("Please Opt-in TAU asset and then mint");
                handleHideMint();
            }
            else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideMint();
            }
            else
            {
                if(parseFloat(usdcAmount) > parseFloat(usdcBalances)/1000000)
                {
                    toast.error(`Insufficient USDC balance.`+"\n"+`Your balance is ${(parseFloat(usdcBalances)/1000000).toFixed(2)} USDC but trying to enter ${usdcAmount} USDC`);
                    handleHideMint();
                }
                else if(parseFloat(elemAmount) > parseFloat(elemBalances)/1000000)
                {
                    toast.error(`Insufficient ELEM balance.`+"\n"+`Your balance is ${(parseFloat(elemBalances)/1000000).toFixed(2)} ELEM but trying to enter ${elemAmount} ELEM`);
                    handleHideMint();
                }
                else
                {
                    if(parseFloat(usdcAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideMint();
                    }
                    else
                    { 
                try {
                    // const accounts = await myAlgoWallet.connect();
                    // const addresses = accounts.map(account => account.address);
                    let tauAmountInside = parseFloat(parseFloat((usdcAmount * usdcPrice) + (elemAmount * elemPrice)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
                    console.log("tauAmount", tauAmountInside);
                    const params = await algodClient.getTransactionParams().do();
                     //// console.log("address", localStorage.getItem("walletAddress"));
                    let appArgs1 = [];
                    appArgs1.push(new Uint8Array(Buffer.from("mintTau")));
            
                    let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                      from:localStorage.getItem("walletAddress"), 
                      suggestedParams: params, 
                      appIndex: parseInt(appID_dynamic), 
                      appArgs: appArgs1
                    })                    
                    
                    let programTau = new Uint8Array(Buffer.from(mintDetails.dynamicStablecoinEscrow, "base64"));          
                    let lsigTau = new algosdk.LogicSigAccount(programTau);
                    let programElem = new Uint8Array(Buffer.from(mintDetails.elemReserve, "base64"));          
                    let lsigElem = new algosdk.LogicSigAccount(programElem);
                     //// console.log("Escrow =", lsig.address());
                    
                    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem("walletAddress"), 
                        to: lsigTau.address(), 
                        amount: parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000), 
                        assetIndex: parseInt(usdcID), 
                        suggestedParams: params
                      });
                      // console.log("usdc", parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000));
                    let elem25 = (parseFloat(elemAmount * 1000000) * 25)/100; 
                    // let floor2 = Math.floor(elem25);
                    // // console.log("25% floor =",floor2 * 1000000);
                       //// console.log("25% =",elem25 * 1000000);
                    let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem("walletAddress"), 
                        to: elemTreasury, 
                        amount: parseInt(elem25), 
                        assetIndex: parseInt(elemID), 
                        suggestedParams: params
                      }); 

                      let elem75 = (parseFloat(elemAmount * 1000000) * 75)/100; 
                      // let floor2 = Math.floor(elem25);
                      // // console.log("25% floor =",floor2 * 1000000);
                         //// console.log("25% =",elem25 * 1000000);
                      let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                          from: localStorage.getItem("walletAddress"), 
                          to: lsigElem.address(), 
                          amount: parseInt(elem75), 
                          assetIndex: parseInt(elemID), 
                          suggestedParams: params
                        }); 
                        let tau99 = (parseFloat(tauAmountInside * 1000000) * 99)/100;
                      // console.log("elem", parseInt(elem));
                      // console.log("tau", tauAmount);
                      console.log("tau98", parseInt(tau99)); 
                      let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsigTau.address(), 
                        to: localStorage.getItem("walletAddress"), 
                        amount: parseInt(tau99), 
                        assetIndex: parseInt(tauID), 
                        suggestedParams: params
                      });
                      
                      let tau1 = (parseFloat(tauAmountInside * 1000000) * 1)/100;
                      // console.log("elem", parseInt(elem));
                      // console.log("tau", tauAmount);
                      console.log("tau2", parseInt(tau1)); 
                      let transaction6 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsigTau.address(), 
                        to: mintDetails.owner, 
                        amount: parseInt(tau1), 
                        assetIndex: parseInt(tauID), 
                        suggestedParams: params
                      });                      
                     
                    let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                      from: localStorage.getItem("walletAddress"), 
                      to: lsigTau.address(), 
                      amount: 2000, 
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
            
                    const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[2].toByte(), txs[3].toByte(), txs[6].toByte()]);
                  //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
                    const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[4], lsigTau);
                    const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[5], lsigTau);
                  //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
            
                    //toast.info("Transaction in Progress");
                const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob, signedTx1[2].blob, signedTx1[3].blob, signedTxEscrow1.blob, signedTxEscrow2.blob, signedTx1[4].blob]).do();
    //// console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    setUsdcAmount("");
    setElemAmount("");
    setTauAmount("");
    await balAsset();
    await balPrint();
    await globalState();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        handleHideMint();
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
    }
}
}
}
}
    }
}

const mintTauPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
        if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then mint");
            handleHideMint();
        }
        else{
            if(assetTauOpt === false)
            {
                toast.error("Please Opt-in TAU asset and then mint");
                handleHideMint();
            }
            else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideMint();
            }
            else
            {
                if(parseFloat(usdcAmount) > parseFloat(usdcBalances)/1000000)
                {
                    toast.error(`Insufficient USDC balance.`+"\n"+`Your balance is ${(parseFloat(usdcBalances)/1000000).toFixed(2)} USDC but trying to enter ${usdcAmount} USDC`);
                    handleHideMint();
                }
                else if(parseFloat(elemAmount) > parseFloat(elemBalances)/1000000)
                {
                    toast.error(`Insufficient ELEM balance.`+"\n"+`Your balance is ${(parseFloat(elemBalances)/1000000).toFixed(2)} ELEM but trying to enter ${elemAmount} ELEM`);
                    handleHideMint();
                }
                else
                {
                    if(parseFloat(usdcAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideMint();
                    }
                    else
                    { 
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        let tauAmountInside = parseFloat(parseFloat((usdcAmount * usdcPrice) + (elemAmount * elemPrice)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
        console.log("tauAmount", tauAmountInside);
        const params = await algodClient.getTransactionParams().do();
         //// console.log("address", localStorage.getItem("walletAddress"));
        let appArgs1 = [];
        appArgs1.push(new Uint8Array(Buffer.from("mintTau")));

        let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
          from:localStorage.getItem("walletAddress"), 
          suggestedParams: params, 
          appIndex: parseInt(appID_dynamic), 
          appArgs: appArgs1
        })                    
        
        let programTau = new Uint8Array(Buffer.from(mintDetails.dynamicStablecoinEscrow, "base64"));          
        let lsigTau = new algosdk.LogicSigAccount(programTau);
        let programElem = new Uint8Array(Buffer.from(mintDetails.elemReserve, "base64"));          
        let lsigElem = new algosdk.LogicSigAccount(programElem);
         //// console.log("Escrow =", lsig.address());
        
        let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsigTau.address(), 
            amount: parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          });
          // console.log("usdc", parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000));
        let elem25 = (parseFloat(elemAmount * 1000000) * 25)/100; 
        // let floor2 = Math.floor(elem25);
        // // console.log("25% floor =",floor2 * 1000000);
           //// console.log("25% =",elem25 * 1000000);
        let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: elemTreasury, 
            amount: parseInt(elem25), 
            assetIndex: parseInt(elemID), 
            suggestedParams: params
          }); 

          let elem75 = (parseFloat(elemAmount * 1000000) * 75)/100; 
          // let floor2 = Math.floor(elem25);
          // // console.log("25% floor =",floor2 * 1000000);
             //// console.log("25% =",elem25 * 1000000);
          let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
              from: localStorage.getItem("walletAddress"), 
              to: lsigElem.address(), 
              amount: parseInt(elem75), 
              assetIndex: parseInt(elemID), 
              suggestedParams: params
            }); 
            let tau99 = (parseFloat(tauAmountInside * 1000000) * 99)/100;
          // console.log("elem", parseInt(elem));
          // console.log("tau", tauAmount);
          console.log("tau98", parseInt(tau99)); 
          let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsigTau.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(tau99), 
            assetIndex: parseInt(tauID), 
            suggestedParams: params
          });
          
          let tau1 = (parseFloat(tauAmountInside * 1000000) * 1)/100;
          // console.log("elem", parseInt(elem));
          // console.log("tau", tauAmount);
          console.log("tau2", parseInt(tau1)); 
          let transaction6 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsigTau.address(), 
            to: mintDetails.owner, 
            amount: parseInt(tau1), 
            assetIndex: parseInt(tauID), 
            suggestedParams: params
          });                      
         
        let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem("walletAddress"), 
          to: lsigTau.address(), 
          amount: 2000, 
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

        let escrow1 = algosdk.signLogicSigTransaction(txs[4], lsigTau);
        let escrow2 = algosdk.signLogicSigTransaction(txs[5], lsigTau);
        // time to sign . . . which we have to do with walletconnect
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
      // console.log(escrow.blob);
        // send and await
        decodedResult[4] = escrow1.blob;
        decodedResult[5] = escrow2.blob;
        let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setUsdcAmount("");
    setElemAmount("");
    setTauAmount("");
    await balAsset();
    await balPrint();
    await globalState();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        handleHideMint();
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
    }
}
}
}
}
    }
}

const mintEinr = async () => 
{

    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
            if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then mint");
            handleHideMint();
        }
        else{
            if(assetEinrOpt === false)
            {
                toast.error("Please Opt-in EINR asset and then mint")
                handleHideMint();
            }
            else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideMint();
            }
            else
            {
                if(parseFloat(usdcAmount) > parseFloat(usdcBalances)/1000000)
                {
                    toast.error(`Insufficient USDC balance.`+"\n"+`Your balance is ${(parseFloat(usdcBalances)/1000000).toFixed(2)} USDC but trying to enter ${usdcAmount} USDC`);
                    handleHideMint();
                }
                else if(parseFloat(elemAmount) > parseFloat(elemBalances)/1000000)
                {
                    toast.error(`Insufficient ELEM balance.`+"\n"+`Your balance is ${(parseFloat(elemBalances)/1000000).toFixed(2)} ELEM but trying to enter ${elemAmount} ELEM`);
                    handleHideMint();
                }
                else
                {
                    if(parseFloat(usdcAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideMint();
                    }
                    else
                    { 
        try {
            // const accounts = await myAlgoWallet.connect();
            // const addresses = accounts.map(account => account.address);
            const params = await algodClient.getTransactionParams().do();
             //// console.log("address", localStorage.getItem("walletAddress"));
            let elemAmountOfEinr =  parseFloat((((1 - C_PercentEinr)*(usdcAmountEinr * usdcPriceEinr))/(C_PercentEinr * elemPriceEinr))).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
            let einrAmountOfEinr =  (parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
            let appArgs1 = [];
            appArgs1.push(new Uint8Array(Buffer.from("mintEinr")));
    
            let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
              from:localStorage.getItem("walletAddress"), 
              suggestedParams: params, 
              appIndex: parseInt(appID_global), 
              appArgs: appArgs1
            })                    
            
            let programEinr = new Uint8Array(Buffer.from(mintDetails.dynamicStablecoinEscrowEinr, "base64"));          
            let lsigEinr = new algosdk.LogicSigAccount(programEinr);
            let programElem = new Uint8Array(Buffer.from(mintDetails.elemReserve, "base64"));          
            let lsigElem = new algosdk.LogicSigAccount(programElem);
             //// console.log("Escrow =", lsig.address());
            
            let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem("walletAddress"), 
                to: lsigEinr.address(), 
                amount: parseInt(parseFloat(usdcAmountEinr).toFixed(6) * 1000000), 
                assetIndex: parseInt(usdcID), 
                suggestedParams: params
              });
              // console.log("usdc", parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000));
            let elem25 = ((parseFloat(elemAmountOfEinr * 1000000) * 25)/100); 
            // let floor2 = Math.floor(elem25);
            // // console.log("25% floor =",floor2 * 1000000);
               //// console.log("25% =",elem25 * 1000000);
            let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem("walletAddress"), 
                to: elemTreasury, 
                amount: parseInt(elem25), 
                assetIndex: parseInt(elemID), 
                suggestedParams: params
              }); 

              let elem75 = ((parseFloat(elemAmountOfEinr * 1000000) * 75)/100); 
              // let floor2 = Math.floor(elem25);
              // // console.log("25% floor =",floor2 * 1000000);
                 //// console.log("25% =",elem25 * 1000000);
              let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: localStorage.getItem("walletAddress"), 
                  to: lsigElem.address(), 
                  amount: parseInt(elem75), 
                  assetIndex: parseInt(elemID), 
                  suggestedParams: params
                }); 
                let einr99 = (parseFloat(einrAmountOfEinr * 1000000) * 99)/100;
              // console.log("elem", parseInt(elem));
              // console.log("tau", tauAmount);
              console.log("tau98", parseInt(einr99)); 
              let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: lsigEinr.address(), 
                to: localStorage.getItem("walletAddress"), 
                amount: parseInt(einr99), 
                assetIndex: parseInt(einrID), 
                suggestedParams: params
              });
              
              let einr1 = (parseFloat(einrAmountOfEinr * 1000000) * 1)/100;
              // console.log("elem", parseInt(elem));
              // console.log("tau", tauAmount);
              console.log("tau2", parseInt(einr1)); 
              let transaction6 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: lsigEinr.address(), 
                to: mintDetails.owner, 
                amount: parseInt(einr1), 
                assetIndex: parseInt(einrID), 
                suggestedParams: params
              });                      
             
            let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: localStorage.getItem("walletAddress"), 
              to: lsigEinr.address(), 
              amount: 2000, 
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
    
            const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[2].toByte(), txs[3].toByte(), txs[6].toByte()]);
          //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
            const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[4], lsigEinr);
            const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[5], lsigEinr);
          //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
    
            //toast.info("Transaction in Progress");
        const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob, signedTx1[2].blob, signedTx1[3].blob, signedTxEscrow1.blob, signedTxEscrow2.blob, signedTx1[4].blob]).do();
    //// console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    setUsdcAmountEinr("");
    setElemAmountEinr("");
    setEinrAmount("");
    await balAsset();
    await balPrint();
    await globalStateEinr();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideMint();
        console.error(err);
      }
    }
}
}
}
}
    }
}

const mintEinrPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
            if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then mint");
            handleHideMint();
        }
        else{
            if(assetEinrOpt === false)
            {
                toast.error("Please Opt-in EINR asset and then mint")
                handleHideMint();
            }
            else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideMint();
            }
            else
            {
                if(parseFloat(usdcAmount) > parseFloat(usdcBalances)/1000000)
                {
                    toast.error(`Insufficient USDC balance.`+"\n"+`Your balance is ${(parseFloat(usdcBalances)/1000000).toFixed(2)} USDC but trying to enter ${usdcAmount} USDC`);
                    handleHideMint();
                }
                else if(parseFloat(elemAmount) > parseFloat(elemBalances)/1000000)
                {
                    toast.error(`Insufficient ELEM balance.`+"\n"+`Your balance is ${(parseFloat(elemBalances)/1000000).toFixed(2)} ELEM but trying to enter ${elemAmount} ELEM`);
                    handleHideMint();
                }
                else
                {
                    if(parseFloat(usdcAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideMint();
                    }
                    else
                    { 
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
        //// console.log("address", localStorage.getItem("walletAddress"));
       let elemAmountOfEinr =  parseFloat((((1 - C_PercentEinr)*(usdcAmountEinr * usdcPriceEinr))/(C_PercentEinr * elemPriceEinr))).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
       let einrAmountOfEinr =  (parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
       let appArgs1 = [];
       appArgs1.push(new Uint8Array(Buffer.from("mintEinr")));

       let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
         from:localStorage.getItem("walletAddress"), 
         suggestedParams: params, 
         appIndex: parseInt(appID_global), 
         appArgs: appArgs1
       })                    
       
       let programEinr = new Uint8Array(Buffer.from(mintDetails.dynamicStablecoinEscrowEinr, "base64"));          
       let lsigEinr = new algosdk.LogicSigAccount(programEinr);
       let programElem = new Uint8Array(Buffer.from(mintDetails.elemReserve, "base64"));          
       let lsigElem = new algosdk.LogicSigAccount(programElem);
        //// console.log("Escrow =", lsig.address());
       
       let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: localStorage.getItem("walletAddress"), 
           to: lsigEinr.address(), 
           amount: parseInt(parseFloat(usdcAmountEinr).toFixed(6) * 1000000), 
           assetIndex: parseInt(usdcID), 
           suggestedParams: params
         });
         // console.log("usdc", parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000));
       let elem25 = ((parseFloat(elemAmountOfEinr * 1000000) * 25)/100); 
       // let floor2 = Math.floor(elem25);
       // // console.log("25% floor =",floor2 * 1000000);
          //// console.log("25% =",elem25 * 1000000);
       let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: localStorage.getItem("walletAddress"), 
           to: elemTreasury, 
           amount: parseInt(elem25), 
           assetIndex: parseInt(elemID), 
           suggestedParams: params
         }); 

         let elem75 = ((parseFloat(elemAmountOfEinr * 1000000) * 75)/100); 
         // let floor2 = Math.floor(elem25);
         // // console.log("25% floor =",floor2 * 1000000);
            //// console.log("25% =",elem25 * 1000000);
         let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
             from: localStorage.getItem("walletAddress"), 
             to: lsigElem.address(), 
             amount: parseInt(elem75), 
             assetIndex: parseInt(elemID), 
             suggestedParams: params
           }); 
           let einr99 = (parseFloat(einrAmountOfEinr * 1000000) * 99)/100;
         // console.log("elem", parseInt(elem));
         // console.log("tau", tauAmount);
         console.log("tau98", parseInt(einr99)); 
         let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: lsigEinr.address(), 
           to: localStorage.getItem("walletAddress"), 
           amount: parseInt(einr99), 
           assetIndex: parseInt(einrID), 
           suggestedParams: params
         });
         
         let einr1 = (parseFloat(einrAmountOfEinr * 1000000) * 1)/100;
         // console.log("elem", parseInt(elem));
         // console.log("tau", tauAmount);
         console.log("tau2", parseInt(einr1)); 
         let transaction6 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: lsigEinr.address(), 
           to: mintDetails.owner, 
           amount: parseInt(einr1), 
           assetIndex: parseInt(einrID), 
           suggestedParams: params
         });                      
        
       let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
         from: localStorage.getItem("walletAddress"), 
         to: lsigEinr.address(), 
         amount: 2000, 
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

       const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[4], lsigEinr);
       const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[5], lsigEinr);
        // time to sign . . . which we have to do with walletconnect
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
      // console.log(escrow.blob);
        // send and await
        decodedResult[4] = signedTxEscrow1.blob;
        decodedResult[5] = signedTxEscrow2.blob;
        let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setUsdcAmountEinr("");
    setElemAmountEinr("");
    setEinrAmount("");
    await balAsset();
    await balPrint();
    await globalStateEinr();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideMint();
        console.error(err);
      }
    }
}
}
}
}
    }
}

const print = () => {
     //// console.log("usdc =", usdcAmount);
     //// console.log("elem =", elemAmount);
     //// console.log("tau =", tauAmount);
}

const amountSetEinr = (value)=>{
    setUsdcAmountEinr(value);
    setElemAmountEinr(parseFloat((((1 - C_PercentEinr)*(value * usdcPriceEinr))/(C_PercentEinr * elemPriceEinr))).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setEinrAmount((parseFloat((value * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // // console.log((parseFloat((value * usdcPrice) + (elemAmount * elemPrice))/einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
}

const amountSetTau = (value)=>{
    setUsdcAmount(value);
    setElemAmount(parseFloat(((1 - C_Percent)*(value * usdcPrice))/(C_Percent * elemPrice)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setTauAmount(parseFloat((value * usdcPrice) + (elemAmount * elemPrice)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
}

useEffect(async() => {
    await optCheck();
}, [assetTauOpt, assetEinrOpt, appOpt]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
 //// console.log(accountInfo);
 let assetCount;
 if(accountInfo['account']['assets'])
 {
    assetCount = accountInfo['account']['assets']['length'];
 }
// // console.log(l);
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'])
    {
    if(accountInfo['account']['assets'][i]['asset-id'] === tauID)
    {
        setAssetTauOpt(true);
        break;
    }
    }
}
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'])
    {
    if(accountInfo['account']['assets'][i]['asset-id'] === einrID)
    {
        setAssetEinrOpt(true);
        break;
    }
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

useEffect(async () => {
    await balPrint();
}, [tauBalances, EinrBalances]);

const balPrint = async () =>
{
    // indexClient
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = 0;
if(bal['account']['assets'])
{
l = bal['account']['assets']['length'];
}

for(let k = 0; k < l; k++)
{
    if(bal['account']['assets'])
    {
    if(bal['account']['assets'][k]['asset-id'] === tauID)
    {
        setTauBalances(bal['account']['assets'][k]['amount']);
        break;
    }
    }
}
for(let m = 0; m < l; m++)
{
    if(bal['account']['assets'])
    {
    if(bal['account']['assets'][m]['asset-id'] === einrID)
    {
        setEinrBalances(bal['account']['assets'][m]['amount']);
        break;
    }
    }
}

// setAssets(bal['account']['assets']);
}

// const balCheckMintTau = async () =>
// {       handleShowMint();
//      //// console.log("elem", (parseFloat(elemBalances/1000000)));
//         if((parseFloat(elemBalances/1000000)) < parseFloat(elemAmount))
//         {
//             toast.error(`Your balance is ${(parseFloat(elemBalances/1000000)).toFixed(2)} ELEM but trying to spend ${elemAmount} ELEM`);
//             handleHideMint();
//         }
//         else if((parseFloat(usdcBalances/1000000)) < parseFloat(usdcAmount))
//         {
//             toast.error(`Your balance is ${(parseFloat(usdcBalances/1000000)).toFixed(2)} USDC but trying to spend ${usdcAmount} USDC`);
//             handleHideMint();
//         }
//         else
//         {
//             await mintTauWalletCheck();
//         }
// }

const mintJUsd = async() =>{
    handleShowMint();
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
        const mintTx = await JusdPoolContract.mintFrax(0,BigInt(fxsAmount),1,BigInt(daiAmount+1e18),1,false);
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Mint is Done succeefully");
        handleHideMint();
    }catch(error){
        toast.error("Mint is not succeed",`${error}`);
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
        const daiContract = new ethers.Contract(DAIAddress, DaiAbi, web31.getSigner(account));

        const mintTx = await daiContract.approve(JUSDPoolAddress,BigInt(10000000000*1e18));
        const blackContract = new ethers.Contract(BLACKAddress, BlackAbi, web31.getSigner(account));

        const mintTx2 = await blackContract.approve(JUSDPoolAddress,BigInt(10000000000*1e18));
        const DimeContract = new ethers.Contract(DIMEAddress, DimeAbi, web31.getSigner(account));

        const mintTx3 = await DimeContract.approve(JUSDPoolAddress,BigInt(10000000000*1e18));
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Approve is Done succeefully");
        handleHideMint();
    }catch(error){
        toast.error("Approve is not succeed",`${error}`);
        console.log("error",error)
        handleHideMint();
    }

}
const approvejusd = async() =>{
    handleShowMint();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const jusdContract = new ethers.Contract(JUSDAddress, JUSDAbi, web31.getSigner(account));

        const mintTx = await jusdContract.approve(JUSDPoolAddress,BigInt(10000000000*1e18));
       
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Approve JUSD is Done succeefully");
        handleHideMint();
    }catch(error){
        toast.error("Approve is not succeed",`${error}`);
        console.log("error",error)
        handleHideMint();
    }

}


const redeemfxs = async() =>{
    handleShowMint();
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
        const mintTx = await JusdPoolContract.redeemFrax(0,BigInt(inputValue),1,1);
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Redeem is Done succeefully");
        handleHideMint();
    }catch(error){
        toast.error("Redeem is not succeed");
        console.log("error",error)
        handleHideMint();
    }

}
// const balCheckMintEinr = async () =>
// {       handleShowMint();
//         if((parseFloat(elemBalances/1000000)) < parseFloat(elemAmount))
//         {
//             toast.error(`Your balance is ${(parseFloat(elemBalances/1000000)).toFixed(2)} ELEM but trying to spend ${elemAmount} ELEM`);
//             handleHideMint();
//         }
//         else if((parseFloat(usdcBalances/1000000)) < parseFloat(usdcAmount))
//         {
//             toast.error(`Your balance is ${(parseFloat(usdcBalances/1000000)).toFixed(2)} USDC but trying to spend ${usdcAmount} USDC`);
//             handleHideMint();
//         }
//         else
//         {
//             await mintEinrWalletCheck();
//         }
// }

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

const usdcMaxEinr = () =>
{
    if(parseFloat(usdcBalances) >= parseFloat(elemBalances) * 15)
    {
        amountSetEinr((parseFloat(elemBalances)/1000000 * 15).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    }
    else
    {
        amountSetEinr((parseFloat(usdcBalances)/1000000).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    }
}

const usdcMaxTau = () =>
{
    if(parseFloat(usdcBalances) >= parseFloat(elemBalances) * 15)
    {
        amountSetTau((parseFloat(elemBalances)/1000000 * 15).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    }
    else
    {
        amountSetTau((parseFloat(usdcBalances)/1000000).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    }
    }

// useEffect(async() => {
//     optinModal();
// },[prerequisiteShow, appOpt, appOptDynamic, assetTauOpt, assetEinrOpt]);

// const optinModal = () =>
// {
//     if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === '')
//     {
//         handlePrerequisiteClose();
//     }
//     else
//     {
//     if( appOpt === false || assetTauOpt === false || assetEinrOpt === false || appOptDynamic === false)
//     {
//         handlePrerequisiteShow();
//     }
//     else{
//         handlePrerequisiteClose();
//     }
//     }
// }

// const appOptinWalletCheck = async () =>
// {
//     if(localStorage.getItem("walletName") === "myAlgoWallet")
//     {
//         await optInApp();
//     }
//     else if(localStorage.getItem("walletName") === "PeraWallet")
//     {
//         await optInAppPera();
//     }
// }

// const appOptinDynamicWalletCheck = async () =>
// {
//     if(localStorage.getItem("walletName") === "myAlgoWallet")
//     {
//         await optInAppDynamic();
//     }
//     else if(localStorage.getItem("walletName") === "PeraWallet")
//     {
//         await optInAppDynamicPera();
//     }
// }

// const assetOptinTauWalletCheck = async () =>
// {
//     if(localStorage.getItem("walletName") === "myAlgoWallet")
//     {
//         await optInTauAsset();
//     }
//     else if(localStorage.getItem("walletName") === "PeraWallet")
//     {
//         await optInTauAssetPera();
//     }
// }

// const assetOptinEinrWalletCheck = async () =>
// {
//     if(localStorage.getItem("walletName") === "myAlgoWallet")
//     {
//         await optInEinrAsset();
//     }
//     else if(localStorage.getItem("walletName") === "PeraWallet")
//     {
//         await optInEinrAssetPera();
//     }
// }

const mintTauWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await mintTau();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await mintTauPera();
    }
}

const mintEinrWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await mintEinr();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await mintEinrPera();
    }
}

const globalStateRatioCallTau = async () =>
{
    handleShowcRatioLoad();
    try{
    const params = await algodClient.getTransactionParams().do();
    //// console.log("address", localStorage.getItem("walletAddress"));
   let cRatio = parseInt((parseFloat(cRatioValue)/100) * 1000000);
   // console.log("cRatio", cRatio);
   let appArgs1 = [];
   appArgs1.push(new Uint8Array(Buffer.from("collateralPercent")));
   appArgs1.push(algosdk.encodeUint64(cRatio));

   let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
     from:localStorage.getItem("walletAddress"), 
     suggestedParams: params, 
     appIndex: parseInt(appID_dynamic), 
     appArgs: appArgs1
   })

   const signedTxn = await myAlgoWallet.signTransaction(transaction1.toByte());
   //toast.info("Transaction in Progress");
     const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
     await waitForConfirmation(algodClient, response.txId);
    } catch (err) {
        handleHidecRatioLoad();    
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
}

const globalStateRatioCallEinr = async () =>
{
    handleShowcRatioLoad();
    try{
    const params = await algodClient.getTransactionParams().do();
    //// console.log("address", localStorage.getItem("walletAddress"));
   let cRatio = parseInt((parseFloat(cRatioValue)/100) * 1000000);
   // console.log("cRatio", cRatio);
   let appArgs1 = [];
   appArgs1.push(new Uint8Array(Buffer.from("collateralPercent")));
   appArgs1.push(algosdk.encodeUint64(cRatio));

   let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
     from:localStorage.getItem("walletAddress"), 
     suggestedParams: params, 
     appIndex: parseInt(appID_global), 
     appArgs: appArgs1
   })

   const signedTxn = await myAlgoWallet.signTransaction(transaction1.toByte());
   //toast.info("Transaction in Progress");
     const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
     await waitForConfirmation(algodClient, response.txId);
    } catch (err) {
        handleHidecRatioLoad();    
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
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
                                                <strong className='text-purple'>1.</strong> Enter the Amount of USDC by which the requirement of ELEM and The amount of TAU or EINR minted can to automatically generated and displayed. <br /><br /><strong className='text-purple'>2.</strong> Once you acquire the desired amount of TAU to mint click on "Mint TAU" or "Mint EINR" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="mint" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="mint" title="Mint JUSD">
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={daiLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>DAI</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(usdcBalances) ? (parseFloat(usdcBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={usdcAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => calculateJUSDmint(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={usdcMaxTau}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={dimeLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>DIME</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(fxsValue) ? (parseFloat(fxsValue)/1e18).toFixed(2) : '0.00'}</h5> */}
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(fxsValue) ? (parseFloat(fxsValue)/1e18).toFixed(8) : '0.00'} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={blackLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>BLACK</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(blackValue) ? (parseFloat(blackValue)/1e18).toFixed(8) : '0.00'} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jusdLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JUSD</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(tauBalances) ? (parseFloat(tauBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(fraxValue) ? (parseFloat(fraxValue)/1e18).toFixed(8) : '0.00'}/>
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
                                            {/* <strong className='font-semibold'>Rate : 1 USDC = 1 TAU = 0.33 ELEM</strong> */}
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            {/* <strong className='font-semibold'>Minting fee (1%) : { parseFloat((usdcAmount * usdcPrice) + (elemAmount * elemPrice) * 0.01) ? ((parseFloat((usdcAmount * usdcPrice) + (elemAmount * elemPrice)) * 0.01)).toFixed(6) : '0'} TAU</strong> */}
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
                                        {allowan > daiAmount ? 
                                        (<>
                                         {mintenabled ? 
                                        (<>
                                         <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={mintJUsd}>
                                                Mint JUSD
                                            </ButtonLoad>
                                        </>):(<>
                                            <ButtonLoad disabled={true} className='btn w-100 btn-blue mb-20' >
                                                Mint JUSD is not Available
                                            </ButtonLoad>
                                        </>)}
                                        </>):(<>
                                            <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={approve}>
                                                Approve
                                            </ButtonLoad>
                                        </>)}
                                       
                                           
                                            { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShow}>
                                                Collateral Ratio
                                            </Button> : <></>}  
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
                                <Tab eventKey="redeem" title="Redeem">
                                <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jusdLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JUSD</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(usdcBalances) ? (parseFloat(usdcBalances)/1000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            // value={usdcAmountEinr}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => getReddemValue(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={usdcMaxEinr}>Max</Button>
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
                                                    <img src={daiLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>DAI</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5> */}

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(collatout) ? (parseFloat(collatout)/1e18).toFixed(8) : '0.00'} /> 
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={dimeLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>DIME</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5> */}

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(fxsOut) ? (parseFloat(fxsOut)/1e18).toFixed(8) : '0.00'} /> 
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={blackLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>BLACK</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(blackOut) ? (parseFloat(blackOut)/1e18).toFixed(8) : '0.00'}/>
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
                                            {/* <strong className='font-semibold'>Rate : 1 USDC = 76 EINR = 0.33 ELEM</strong> */}
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            {/* <strong className='font-semibold'>Minting fee (1%) : {((parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice) * 0.01) ? ((parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice) * 0.01).toFixed(6) : '0'} EINR</strong> */}
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
                                        {JUsdALlowance > inputValue ? 
                                        (<>
                                         {RedeemEnabled ? 
                                        (<>
                                          <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={redeemfxs}>
                                            Redeem
                                            </ButtonLoad>
                                        </>):(<>
                                            <ButtonLoad disabled={true} className='btn w-100 btn-blue mb-20' >
                                            Redeem not Available
                                            </ButtonLoad>
                                        </>)}
                                        </>):(<>
                                            <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={approvejusd}>
                                            Approve JUSD
                                            </ButtonLoad>
                                        </>)}
                                       
                                          
                                            { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShowEinr}>
                                                Collateral Ratio
                                            </Button> : <></>}
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

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' onClick={globalStateRatioCallTau}>
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

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' onClick={globalStateRatioCallEinr}>
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