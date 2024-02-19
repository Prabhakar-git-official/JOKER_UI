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

import jokercoin from '../../assets/images/Jokercoin.png';
import stasiscoin  from '../../assets/images/stasiscoin.png';
import creditscoin from '../../assets/images/creditscoin.png';

import {ethers} from 'ethers';
import { BLACKAddress, BlackAbi, CREDITChainlinkAddress, ChainLinkABi, DAIAddress, DIMEAddress, DIMEChainlinkAddress, DaiAbi, DimeAbi, jokerAddressForMinting, JOKERAddress, JOKERABI2, JOKERCOntractABI, JOKERChainlinkAddress, JUSDAbi, JUSDAddress, JUSDPoolAbi, JUSDPoolAddress, USDCAddress, USDCChainlinkAddress, USDCContractABI } from '../../abi/abi';
import { MintContractAddress } from '../../abi/abi';
import { MintContractABI } from '../../abi/abi';
import { ECOReserveAddress } from '../../abi/abi';
import { ECOReserveABI } from '../../abi/abi';

// const algosdk = require('algosdk');
// const myAlgoWallet = new MyAlgoConnect();
// const bridge = "https://bridge.walletconnect.org";

const ControlledSwap = () => {

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

    const [usdcAmount, setUsdcAmount ] = useState("");
    console.log("usdcAmount",usdcAmount)
    const [jokerAmount, setjokerAmount ] = useState("");
    const [elemAmount, setElemAmount ] = useState();
    const [tauAmount, setTauAmount ] = useState();
    const [usdcAmountEinr, setUsdcAmountEinr ] = useState();
    const [elemAmountEinr, setElemAmountEinr ] = useState();
    const [einrAmount, setEinrAmount ] = useState();
    const [ethvalue, setethValue ] = useState("");
    const [assets, setAssets] = useState("");
    const [usdcLock, setUsdcLock] = useState("");
    const [assetEinrOpt, setAssetEinrOpt] = useState(false);
    const [assetTauOpt, setAssetTauOpt] = useState(false);
    const [appOpt, setAppOpt] = useState(false);
    const [appOptDynamic, setAppOptDynamic] = useState(false);

    const [activeTab, setActiveTab] = useState('mint');
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
    const[allowan2,setAllowance2] = useState("")
    const[JUsdALlowance,setJUsdALlowance] = useState("")

    const[collatout,setcollatout] = useState("")
    const[fxsOut,setfxsOut] = useState("")
    const[blackOut,setblackOut] = useState("")
    const[inputValue,setinputValue] = useState("")
    //Einr states

    const [C_PercentEinr, setC_PercentEinr] = useState();
    const [usdcPriceEinr, setUsdcPriceEinr] = useState();
    const [elemPriceEinr, setElemPriceEinr] = useState();
    const [DimeToken, setDimeToken] = useState();
    const [CreditToken, setCreditToken] = useState("");

    const[JokerPrice,setJokerPrice] = useState("")
    const[USDCPrice,setUSDCPrice] = useState("")
    const[CreditPrice,setCreditPrice] = useState("")
    const[dimePrice,setdimePrice] = useState("")
    const [usdcBalances, setUsdcBalances] = useState("");
    const[JokerBlance,setJokerBlance] = useState("");
    const[JokerInput,setJokerInput] = useState("");
    const[lpValue,setlpValue] = useState("");

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
            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            const url = "https://goerli.infura.io/v3/b1a500c779c94f89bc791ca58b3f1601";
            const provider = new ethers.providers.JsonRpcProvider(url);
            // console.log("Connected Successfully", account);

            //new code
        // const DimePriceContract = new ethers.Contract(DIMEChainlinkAddress, ChainLinkABi, provider);
        // const USDCPriceContract = new ethers.Contract(USDCChainlinkAddress, ChainLinkABi, provider);
        // const JokerPriceContract = new ethers.Contract(JOKERChainlinkAddress, ChainLinkABi, provider);
        // const CreditPriceContract = new ethers.Contract(CREDITChainlinkAddress, ChainLinkABi, provider);
        
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, provider);
        // const USDCContract = new ethers.Contract(USDCAddress, USDCContractABI, provider);

        // const MintContract = new ethers.Contract(MintContractAddress, MintContractABI, provider);
        // const ECOReserveContract = new ethers.Contract(ECOReserveAddress, ECOReserveABI, provider);

        // let usdcprice = ethers.utils.formatUnits(await USDCPriceContract.getChainlinkDataFeedLatestAnswer(),0);
        // let dimeprice = ethers.utils.formatUnits(await DimePriceContract.getChainlinkDataFeedLatestAnswer(),0);
        // let Creditprice = ethers.utils.formatUnits(await CreditPriceContract.getChainlinkDataFeedLatestAnswer(),0);

        // let jokerPrice = ethers.utils.formatUnits(await DimePriceContract.getChainlinkDataFeedLatestAnswer(),0);
        let jokerPrice = 10 * 10e8;//for now it is given as 10$

        setJokerPrice(jokerPrice);
        // setUSDCPrice(usdcprice) 
        // setdimePrice(dimeprice);
        // setCreditPrice(Creditprice);

        // let daibalance = ethers.utils.formatUnits(await USDCContract.balanceOf(localStorage.getItem("walletAddress")),0);
        // setUsdcBalances(daibalance)  
        let Jokerbalance = ethers.utils.formatUnits(await JOKERContract.balanceOf(localStorage.getItem("walletAddress")),9);
        setJokerBlance(Jokerbalance) 
        console.log("joker bal swap",Jokerbalance); 
        console.log("joker bal swap",JokerBlance); 

        // let allowance =  ethers.utils.formatUnits(await USDCContract.allowance(localStorage.getItem("walletAddress"),MintContractAddress),0);
        // console.log("allowance1", allowance)
        // setAllowance(allowance);
        let allowance2 =  ethers.utils.formatUnits(await JOKERContract.allowance(localStorage.getItem("walletAddress"),localStorage.getItem("walletAddress")),0);
        console.log("allowance2", allowance2)
        setAllowance2(allowance2);


            
            
            
            
            
            
            
            //old code
    
            // Create contract instance with the correct order of arguments
            // const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
            // const daiCpntract = new ethers.Contract(DAIAddress, DaiAbi, provider);
            // const JUSDcontract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
            // let frax_price =  ethers.utils.formatUnits(await JusdPoolContract.getFRAXPrice(),0);
            // console.log("frax_price")
            // let mint_price_threshold =  ethers.utils.formatUnits(await JusdPoolContract.mint_price_threshold(),0);
            // console.log("collateral_price", frax_price,mint_price_threshold)
            // if((frax_price) >= mint_price_threshold){
            //     setMintEnabled(true)
            // }
            // else{
            //     setMintEnabled(false)
            // }
            // let redeem_price_threshold =  ethers.utils.formatUnits(await JusdPoolContract.redeem_price_threshold(),0);
            // if(parseInt(frax_price) <= parseInt(redeem_price_threshold)){
            //     setRedeemEnabled(true)
            //     console.log("Redeem ENabled",true,redeem_price_threshold,frax_price)
            // }
            // else{
            //     setRedeemEnabled(false)
            //     console.log("Redeem ENabled",false)
            // }
            
            // let allowance =  ethers.utils.formatUnits(await daiCpntract.allowance(localStorage.getItem("walletAddress"),JUSDPoolAddress),0);
            // console.log("allowance", allowance)
            // setAllowance(allowance);

            // let jusdallowance = ethers.utils.formatUnits(await JUSDcontract.allowance(localStorage.getItem("walletAddress"),JUSDPoolAddress),0);
            // setJUsdALlowance(jusdallowance)
        }
      }

      const changeinput = async(e) =>{
        const url = "https://goerli.infura.io/v3/b1a500c779c94f89bc791ca58b3f1601";
            const provider = new ethers.providers.JsonRpcProvider(url);
        setjokerAmount(e);
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, provider);
        console.log("avaxSpent",e)
        let avaxSpent = ethers.utils.formatUnits(await JOKERContract.checkSwapValue(e*1e9,[JOKERAddress,"0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"]),0);
        console.log("avaxSpent",parseFloat(avaxSpent/1e18))
        let feesdeductedvalue = (parseFloat(avaxSpent)*50/100)/1e18;
        setethValue(feesdeductedvalue)     
      }

      const changeinput2 = async(e) =>{
        const url = "https://goerli.infura.io/v3/b1a500c779c94f89bc791ca58b3f1601";
            const provider = new ethers.providers.JsonRpcProvider(url);
        setjokerAmount(e);
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, provider);
        console.log("avaxSpent",e)
        let avaxSpent = ethers.utils.formatUnits(await JOKERContract.checkLiquidityValue(e*1e9),0);
        console.log("avaxSpent2",parseFloat(avaxSpent/1e18))
        let feesdeductedvalue = parseFloat(avaxSpent/1e18);
        setethValue(feesdeductedvalue);
        console.log("usereth",feesdeductedvalue);
        let lpValue = ethers.utils.formatUnits(await JOKERContract.checkLpValue(e*1e9,avaxSpent),0);
    console.log("lp",lpValue);
    // console.log("liquidity fees",avaxSpent,(avaxSpent*0.0997/100),feesdeducted-(avaxSpent*2/100))
    setlpValue(parseFloat(lpValue)-(parseFloat(lpValue*2/100)))     
      }


      const calculateJUSDmint = async(value)=>{
        setJokerBlance(value)
        //new code
        //Jokervalue = ((1-cPercentage)*(daiAmount*daiPrice)) / (cPercentage*blackPrice)
        let calculatedValue = ((1-0.5)*(value*1e9*USDCPrice))/(0.5*JokerPrice); 
        console.log("calculated",calculatedValue,Math.abs(calculatedValue));
        setJokerInput((Math.abs(calculatedValue)));

        let Totaldollarvalue = (value*1e9*USDCPrice) + ((Math.abs(calculatedValue)) * JokerPrice);
        let reducedTotalDollarvalue = Totaldollarvalue -(Totaldollarvalue * 10/100)
        let creditTokenMint = reducedTotalDollarvalue/CreditPrice;
        setCreditToken(creditTokenMint)
        console.log("value",creditTokenMint,value)

        console.log("creditToken",(value*1e9*USDCPrice) ,((Math.abs(calculatedValue)) * JokerPrice))
       
        //old code
        

        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const account = accounts[0]; // Use the first account
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // // console.log("Connected Successfully", account);

        // // Create contract instance with the correct order of arguments
        // const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
        // const JUSDContract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
        // let collateral_price = await JusdPoolContract.collateral_prices(0);
        // let col_ratio = await JUSDContract.global_collateral_ratio();
        // let fxs_price = await JusdPoolContract.getFXSPrice();
        // let black_price = await JusdPoolContract.getBLACKPrice();
        // console.log("collateral_price", await ethers.utils.formatUnits(collateral_price, 0))
        // let collat_needed = e * 1e18;
        // let PRICE_PRECISION = 1e6;

        // // let  frax_amount = (collat_needed * (await ethers.utils.formatUnits(collateral_price, 0))) / ((await ethers.utils.formatUnits(col_ratio, 0)* PRICE_PRECISION) ); //amount need to pass
        // // console.log("frax_amount",frax_amount)

        // let  frax_amount = (((collat_needed * PRICE_PRECISION)/(await ethers.utils.formatUnits(collateral_price, 0))) * PRICE_PRECISION)/ (await ethers.utils.formatUnits(col_ratio, 0) ); //amount need to pass
        // console.log("frax_amount",frax_amount)
        // setdaiAmount(collat_needed);
        // setfxsAmount(frax_amount)
        // const frax_for_collat = (frax_amount * (await ethers.utils.formatUnits(col_ratio, 0))) / PRICE_PRECISION;
        // console.log("frax_for_collat",frax_for_collat)
        // const frax_for_fxs = frax_amount - frax_for_collat;
        // //    const collat_needed = getFRAXInCollateral(col_idx, frax_for_collat);
        // const splited_value = (frax_for_fxs * 50) / 100;

        // const fxs_needed = (splited_value * PRICE_PRECISION) / (await ethers.utils.formatUnits(fxs_price, 0)); // Implement getFXSPrice function
        // const black_needed = (frax_for_fxs - splited_value) * PRICE_PRECISION / ((await ethers.utils.formatUnits(black_price, 0)) ); // Implement getBLACKPrice function
        // const total_frax_mint = (frax_amount *  (PRICE_PRECISION - 3000)) / PRICE_PRECISION; //minting_fee[col_idx] = 3000;
        // console.log("fxs_needed",fxs_needed,black_needed,total_frax_mint)
        // setfxsValue(fxs_needed);
        // setblackValue(black_needed);
        // setfraxValue(total_frax_mint)


     
      
    
      

      }
      const calculateDIMEmint = async(value)=>{
          setUsdcAmount(value)
        //new code
        //Jokervalue = ((1-cPercentage)*(daiAmount*daiPrice)) / (cPercentage*blackPrice)
        let calculatedValue = ((1-0.5)*(value*1e9*USDCPrice))/(0.5*JokerPrice);
        console.log("calculated",calculatedValue,Math.abs(calculatedValue));
        setJokerInput((Math.abs(calculatedValue)));

        let Totaldollarvalue = (value*1e9*USDCPrice) + ((Math.abs(calculatedValue)) * JokerPrice);
        let reducedTotalDollarvalue = Totaldollarvalue -(Totaldollarvalue * 10/100)
        let DimeTokenMint = reducedTotalDollarvalue/dimePrice;
        setDimeToken(DimeTokenMint)
        console.log("CreditPrice",DimeTokenMint,dimePrice,CreditPrice)
      

        // console.log("creditToken",(value*1e9*USDCPrice) ,((Math.abs(calculatedValue)) * JokerPrice))

        //old code
        

        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const account = accounts[0]; // Use the first account
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // // console.log("Connected Successfully", account);

        // // Create contract instance with the correct order of arguments
        // const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
        // const JUSDContract = new ethers.Contract(JUSDAddress, JUSDAbi, provider);
        // let collateral_price = await JusdPoolContract.collateral_prices(0);
        // let col_ratio = await JUSDContract.global_collateral_ratio();
        // let fxs_price = await JusdPoolContract.getFXSPrice();
        // let black_price = await JusdPoolContract.getBLACKPrice();
        // console.log("collateral_price", await ethers.utils.formatUnits(collateral_price, 0))
        // let collat_needed = e * 1e18;
        // let PRICE_PRECISION = 1e6;

        // // let  frax_amount = (collat_needed * (await ethers.utils.formatUnits(collateral_price, 0))) / ((await ethers.utils.formatUnits(col_ratio, 0)* PRICE_PRECISION) ); //amount need to pass
        // // console.log("frax_amount",frax_amount)

        // let  frax_amount = (((collat_needed * PRICE_PRECISION)/(await ethers.utils.formatUnits(collateral_price, 0))) * PRICE_PRECISION)/ (await ethers.utils.formatUnits(col_ratio, 0) ); //amount need to pass
        // console.log("frax_amount",frax_amount)
        // setdaiAmount(collat_needed);
        // setfxsAmount(frax_amount)
        // const frax_for_collat = (frax_amount * (await ethers.utils.formatUnits(col_ratio, 0))) / PRICE_PRECISION;
        // console.log("frax_for_collat",frax_for_collat)
        // const frax_for_fxs = frax_amount - frax_for_collat;
        // //    const collat_needed = getFRAXInCollateral(col_idx, frax_for_collat);
        // const splited_value = (frax_for_fxs * 50) / 100;

        // const fxs_needed = (splited_value * PRICE_PRECISION) / (await ethers.utils.formatUnits(fxs_price, 0)); // Implement getFXSPrice function
        // const black_needed = (frax_for_fxs - splited_value) * PRICE_PRECISION / ((await ethers.utils.formatUnits(black_price, 0)) ); // Implement getBLACKPrice function
        // const total_frax_mint = (frax_amount *  (PRICE_PRECISION - 3000)) / PRICE_PRECISION; //minting_fee[col_idx] = 3000;
        // console.log("fxs_needed",fxs_needed,black_needed,total_frax_mint)
        // setfxsValue(fxs_needed);
        // setblackValue(black_needed);
        // setfraxValue(total_frax_mint)


     
      
    
      

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

  

const mintCREDIT = async() =>{
    handleShowMint();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const MintContract = new ethers.Contract(MintContractAddress, MintContractABI, web31.getSigner(account));


        console.log("jokerprice amount",JokerPrice,USDCPrice,usdcAmount*1e9,JokerInput)
        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        const mintTx = await MintContract.mintCreditAndAddLiquidity(BigInt(parseInt(usdcAmount*1e9)),BigInt(parseInt(JokerInput-10)));
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        await fraxCalculation();
        toast.success("Mint is Done successfully");
        handleHideMint();
    }catch(error){
        toast.error("Mint is not succeed",`${error}`);
        console.log("error",error)
        handleHideMint();
    }

}
const swapjoker = async() =>{
    handleShowMint();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);
        console.log("Joker amount:", jokerAmount * 1e9);
        // Create contract instance with the correct order of arguments
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, web31.getSigner(account));
        const mintTx = await JOKERContract.swapTokensForBNBUSer(BigInt(jokerAmount * 1e9),{gasLimit: 3000000});
                  
              
                await mintTx.wait();
                console.log("minttx",mintTx.hash);
        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        // const mintTx = await MintContract.mintDimeAndAddLiquidity(BigInt(parseInt(usdcAmount*1e9)),BigInt(parseInt(JokerInput-10)));
        // await mintTx.wait();
        // console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        await fraxCalculation();
        toast.success("Mint is Done successfully");
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
        // Create contract instance with the correct order of arguments
        const USdcContract = new ethers.Contract(USDCAddress, USDCContractABI, web31.getSigner(account));

        const mintTx = await USdcContract.approve(MintContractAddress,BigInt(10000000000*1e9));
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        await sleep(2000);
        await fraxCalculation();
        toast.success(toastDiv(id));
        toast.success("Approve is Done successfully");
        handleHideMint();
    }catch(error){
        toast.error("Approve is not succeed",`${error}`);
        console.log("error",error)
        handleHideMint();
    }

}
const approveJOKER = async() =>{
    handleShowMint();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, web31.getSigner(account));

        const mintTx = await JOKERContract.approve(localStorage.getItem("walletAddress"),BigInt(jokerAmount*1e9));
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
        await sleep(2000);
        await fraxCalculation();
        toast.success(toastDiv(id));
        toast.success("Approve is Done successfully");
        handleHideMint();
    }catch(error){
        toast.error("Approve is not succeed",`${error}`);
        console.log("error",error)
        handleHideMint();
    }

}

const addLiquidity2 = async() =>{
    handleShowMint();
    if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        handleHideMint();
        toast.error(`Your are not connected the wallet`);
    }
    else{
        try{
            const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        //0xEfF92A263d31888d860bD50809A8D171709b7b1c
        const JOKERContract = new ethers.Contract(JOKERAddress, JOKERABI2, web31.getSigner(account));
         let avaxV = parseFloat(ethvalue*1e18).toFixed(0);
            // const JOKERContract = new ethers.Contract(jokerAddressForMinting, JOKERCOntractABI,  signer);
            const mintTx = await JOKERContract.addLiquidityUser(BigInt(jokerAmount * 1e9),{
                value:  BigInt(avaxV),gasLimit: 3000000
              });
              
          
            await mintTx.wait();
            console.log("minttx",mintTx.hash);
            // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
            let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
            await sleep(2000);
            await fraxCalculation();
            toast.success(toastDiv(id));
             setethValue("");
            setjokerAmount(""); 
            
            toast.success("Liquidity is Added Successfully");
            handleHideMint();

        }catch(error){
            toast.error(error.toString());
            console.error(error);
            handleHideMint();
        }

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
       
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Approve JUSD is Done successfully");
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
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Redeem is Done successfully");
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




const usdcMaxTau = () =>
{
    setUsdcAmount(JokerBlance/1e9);
    changeinput(JokerBlance/1e9)
   
    }
    const jokerMaxTau = () =>
{
    setjokerAmount(JokerBlance);
    changeinput(JokerBlance);
   
    }
    const jokerMaxTau2 = () =>
{
    setjokerAmount(JokerBlance);
    changeinput2(JokerBlance);
   
    }
    const usdcMaxDime = () =>
{
    setUsdcAmount(usdcBalances/1e9);
    calculateDIMEmint(usdcBalances/1e9)
   
    }

    
    

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


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
                                                 {activeTab === 'mint' ? (
                                    <>
                                        <strong className='text-purple'>1.</strong> Enter the Amount of JOKER you want to swap, equivalent Goerli ETH will be displayed automatically. <br /><br />
                                        <strong className='text-purple'>2.</strong> Once you approve the desired amount of ETH to swap click on "Swap" button which will provide Goerli ETH for the given JOKER.
                                    </>
                                ) : (
                                    // Tooltip content for the 'Mint DIME' tab
                                    <>
                                        <strong className='text-purple'>1.</strong> Enter the amount of JOKER you want to provide as liquidity. <br /><br />
                                        <strong className='text-purple'>2.</strong> Once you approve the desired amount of JOKER for liquidity, click on "Add Liquidity" button to provide liquidity to the pool.
                                    </>
                                )}
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="mint" className='dashboard-tabs' id="tab-example-1" onSelect={(tab) => handleTabChange(tab)}>
                                <Tab eventKey="mint" title="Swap">
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jokercoin} alt="Joker" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JOKER</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {JokerBlance != "" || JokerBlance != 0 ? (parseFloat(JokerBlance)).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={jokerAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => changeinput(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={jokerMaxTau}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    
                                    {/* <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jokercoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JOKER</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(JokerBlance) ? (parseFloat(JokerBlance)/1e9).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(JokerInput) ? (parseFloat(JokerInput)/1e9).toFixed(4) : '0.00'}/>
                                                </div>
                                            </Col>
                                         
                                        </Row>
                                    </div> */}
                                   <div className="py-2 px-sm-4 px-2 d-flex justify-content-center">
    <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'>
        <svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path>
        </svg>
    </Button>
</div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={creditscoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>ETH</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(tauBalances) ? (parseFloat(tauBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(ethvalue) ? (parseFloat(ethvalue)).toFixed(15) : '0.00'}/>
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
                                            <span>Exchange Rate </span>
                                            <strong className='font-semibold'>$1 JOKER = ${parseFloat((2*CreditPrice)/1e8).toFixed(3)} ETH</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Minting Fee </span>
                                            <strong className='font-semibold'>5% USDT : 5% JOKER</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(jokerAmount).toFixed(15) === 'NaN' ? '0.00' : parseFloat(jokerAmount/1e9).toFixed(15)} ETH</strong>
                                        </div>
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> */}
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                        {( allowan2 >= (jokerAmount * 1e9) ? 
                                                    (<><Button loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={swapjoker}>
                                                        Swap
                                                    </Button></>) :
                                                    (<><ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={approveJOKER}>
                                                    Approve JOKER
                                                    </ButtonLoad></>) )}
                                        {/* {allowan > daiAmount ? 
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
                                        </>)} */}
                                       
                                           
                                            {/* { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShow}>
                                                Collateral Ratio
                                            </Button> : <></>}   */}
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
                                <Tab eventKey="Mint DIME" title="Add Liquidity">
                                <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jokercoin} alt="JOKER" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JOKER</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(JokerBlance) ? (parseFloat(JokerBlance)).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={jokerAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => changeinput2(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={jokerMaxTau2}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    
                                    {/* <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jokercoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JOKER</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(JokerBlance) ? (parseFloat(JokerBlance)/1e9).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(JokerInput) ? (parseFloat(JokerInput)/1e9).toFixed(4) : '0.00'}/>
                                                </div>
                                            </Col>
                                         
                                        </Row>
                                    </div> */}
                                    <div className="py-2 px-sm-4 px-2 d-flex justify-content-center">
    <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'>
        <svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path>
        </svg>
    </Button>
</div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={stasiscoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>ETH</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(tauBalances) ? (parseFloat(tauBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(ethvalue) ? (parseFloat(ethvalue)).toFixed(15) : '0.00'}/>
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
                                            <span>Exchange Rate </span>
                                            <strong className='font-semibold'> $1 USDC + $1 JOKER = ${parseFloat((2*dimePrice)/1e8).toFixed(4)} DIME</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Minting Fee </span>
                                            <strong className='font-semibold'>5% USDT : 5% JOKER</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{lpValue?parseFloat(Math.abs(lpValue/1e18)).toFixed(15):"0.0"}  LP</strong>
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
                                        {( allowan2 >= (jokerAmount * 1e9) ? 
                                                    (<><Button loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={addLiquidity2}>
                                                        Add liquidity
                                                    </Button></>) :
                                                    (<><ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={approveJOKER}>
                                                    Approve JOKER
                                                    </ButtonLoad></>) )
                                                    // :(<>
                                                    //     <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={approve}>
                                                    // Approve USDC
                                                    // </ButtonLoad>
                                                    // </>) 
                                                    }
                                        {/* {allowan > daiAmount ? 
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
                                        </>)} */}
                                       
                                           
                                            {/* { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShow}>
                                                Collateral Ratio
                                            </Button> : <></>}   */}
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

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center'>
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            </Container>
        </Layout>
    );
};

export default ControlledSwap;