import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import ButtonLoad from 'react-bootstrap-button-loader';
import { Link } from 'react-router-dom';
import USDC from '../../assets/images/usdc.jpg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Logo from '../../assets/images/modal-logo.png';
import Arrow from '../../assets/images/arrow-tr.svg';
import daiLogo from '../../assets/images/dai.jpeg';
import ModalSquareLogo from '../../assets/images/modal-square-logo.png';
import bondDetails from "../Dashboard/stablecoin-only.json";
import node from "./nodeapi.json"
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { updatealgobalance } from "../formula";
import { BondAbi, BondAddress, DAIAddress, DaiAbi, JUSDPoolAbi, JUSDPoolAddress, TreasuryAbi, TreasuryAddress } from '../../abi/abi';
import { ethers } from 'ethers';
/* global BigInt */

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();

const bridge = "https://bridge.walletconnect.org";


const Bond = () => {

    useEffect(() => {
        document.title = "ELEMENT | Bond"
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
    const[daiBlance,setdaiBlance] = useState("")
    
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
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          // console.log("Connected Successfully", account);
  
          // Create contract instance with the correct order of arguments
          const JusdPoolContract = new ethers.Contract(JUSDPoolAddress, JUSDPoolAbi, provider);
          const daiContract = new ethers.Contract(DAIAddress, DaiAbi, provider);
          const TresuryContract = new ethers.Contract(TreasuryAddress, TreasuryAbi, provider);
          const BondContract = new ethers.Contract(BondAddress, BondAbi, provider);

          let trasuryBlackBalance =  ethers.utils.formatUnits(await TresuryContract.getBlackBalance(TreasuryAddress),0);
          let blackprice =  ethers.utils.formatUnits(await JusdPoolContract.getBLACKPrice(),0);
          let daiprice = ethers.utils.formatUnits(await BondContract.getDAIPrice(),0);
          
          let blackpurchased = await BondContract.users(localStorage.getItem("walletAddress"));

          settreasurBalance(trasuryBlackBalance);
          setblackPrice(blackprice);
          setdaiPrice(daiprice);
          setblackPurchased(blackpurchased);

          let allowance =  ethers.utils.formatUnits(await daiContract.allowance(localStorage.getItem("walletAddress"),BondAddress),0);
          console.log("allowance", allowance)
          setAllowance(allowance);

          let daibalance = ethers.utils.formatUnits(await daiContract.balanceOf(localStorage.getItem("walletAddress")),0);
          setdaiBlance(daibalance)  
          console.log("Bond",trasuryBlackBalance,blackprice,daiprice,blackpurchased)
        //   let blackpurchased = ethers.utils.formatUnits





      }
    }

    // console.log("bond",blackPurchased.claimedAmount?ethers.utils.formatUnits(blackPurchased.claimedAmount,18) :0)
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
            //   // console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            // toast.success(`Transaction ${txId} is successful and confirmed in round ${pendingInfo["confirmed-round"]}`);
            let id = "https://testnet.algoexplorer.io/tx/" + txId;
            toast.success(toastDiv(id));
            handleHideLoadPurchase();
            handleHideLoadAppOpt();
            handleHideLoadAssetOpt();
            handleHideLoadClaim();
            handleHideLoadUsdcFund();
            await updatealgobalance();
            // await sleep(5000);
            // reload();  
            break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  

//         useEffect(async() => {
//             await TreasuryBalance()
//         }, [treasuryBalance]);        

// const TreasuryBalance = async () =>{
//     let balance = await algodClient.accountInformation("6ZJG2JCG2CAU7WAHEU5ZMFWIZGVNT65XZYVAOK4G7YHNHOCWBNXJTNCTYU").do();
//     // // console.log(balance['account']['assets'][0]['amount']);
//     setTreasuryBalance(parseFloat(balance['account']['assets'][0]['amount'])/1000000);
// }


const myAlgoOptIn = async () =>
{
    handleShowLoadAppOpt();
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
            handleHideLoadAppOpt();
        }
    }
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAppOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000 + 85500)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadAppOpt();
            }
            else
            {
//   let application = indexClient.searchForApplications(appID_global);
//   // console.log("Global State =", application);
//   let appById = await algodClient.getApplicationByID(appID_global).do();
//   // console.log("Global State =", appById.params);
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
    setToAppOpt(true);
    await minBal();
    //toast.success(`Transaction Success ${response.txId}`);
}
catch (err) {
    toast.error(err.toString());
    handleHideLoadAppOpt();
    console.error(err);
}
            }
        }
}

const appOptInPera = async () =>
  {
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowLoadAppOpt();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAppOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000 + 85500)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadAppOpt();
            }
            else
            {
//   let application = indexClient.searchForApplications(appID_global);
//   // console.log("Global State =", application);
//   let appById = await algodClient.getApplicationByID(appID_global).do();
//   // console.log("Global State =", appById.params);
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
      setToAppOpt(true);
      await minBal();
    }catch(err) {
        toast.error(err.toString());
        handleHideLoadAppOpt();
        console.error(err);
    }
    }
    }
  }

  const myAlgoOptInAsset = async () => {
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
            handleHideLoadAppOpt();
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
        assetIndex: elemID
    });

    const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    //toast.success(`Transaction Success ${response.txId}`);
    await waitForConfirmation(algodClient, response.txId);
    setToAssetOpt(true);
    await minBal();
}
catch (err) {
    handleHideLoadAssetOpt();
    toast.error(err.toString());
    console.error(err);

}
        }
    }
}

const assetOptInPera = async () =>
  {
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowLoadAssetOpt();
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
        assetIndex: elemID
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
      setToAssetOpt(true);
      await minBal();
    }catch (err) {
        handleHideLoadAssetOpt();
        toast.error(err.toString());
        console.error(err);
    }
    }
    }
  }


                const myAlgoWalletExchange =async () => {
                // if(((parseFloat(stable)/1000000).toFixed(2) === 0.00 && (parseFloat(bond)/1000000).toFixed(2) === 0.00) || ((parseFloat(stable)/1000000).toFixed(2) === 'NaN' && (parseFloat(bond)/1000000).toFixed(2) === 'NaN'))
                // {
                    handleShowLoadPurchase();
                    let Pop_amount = bondAmount;
                    if(Pop_amount === "")
                    {
                        toast.error("Input field should not be left empty. Please enter some values");
                        handleHideLoadPurchase();
                    } 
                    else
                    {  
                    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
                    if (localStorage.getItem("walletAddress") === "")
                    {
                        toast.error("Connect your wallet");
                        handleHideLoadPurchase();
                    }
                    else{
                        if(appOpt === false)
                        {
                            toast.error("Please Opt-in to App and then purchase bond");
                            handleHideLoadPurchase();
                        }
                        else{ 
                            if(parseFloat(minAlgo) < 2000)
                            {
                                toast.error("Insufficient Algo balance. Please get more Algos from dispenser.");
                                handleHideLoadPurchase();
                            }
                            else
                            {
                            if(parseFloat(Pop_amount) > parseFloat(usdcBalances)/1000000)
                            {
                                toast.error(`Insufficient USDC balance. Your balance is ${(parseFloat(usdcBalances)/1000000).toFixed(2)} USDC but try to enter ${Pop_amount} USDC`);
                                handleHideLoadPurchase();
                            }
                            else
                            {
                                if(parseFloat(Pop_amount) <= 0)
                                {
                                    toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                                    handleHideLoadPurchase();
                                }
                                else
                                { 
                    // var amt =  window.prompt("Enter the amount you want to donate"); 
                    // let amount = parseInt(amt) * 1000000;
                    let amount = parseFloat(Pop_amount).toFixed(6) * 1000000;
                  let index = parseInt(appID_global);
                    // console.log("appId inside donate", index)
                
                    try {
                    //   const accounts = await myAlgoWallet.connect();
                      // const addresses = accounts.map(account => account.address);
                      const params = await algodClient.getTransactionParams().do();
                
                      let appArgs1 = [];
                      appArgs1.push(new Uint8Array(Buffer.from("discount_buy")));
                      // let decAddr = algosdk.decodeAddress('EGUSS7HHM3ODVPW3Z2L55WPCZCR4TWSN2VVAKYPZKYEUER5BXM5N6YNH7I');
                      // appArgs.push(decAddr.publicKey);
                      //   // console.log("(line:516) appArgs = ",appArgs)
                      //localStorage.setItem("escrow", 'PKWSTDTMCYQQSFLNOW3W4TJN5VFJDR3KN5Q76G6OY6D4NFKHSFDZWC5BKY');
                      let sender = localStorage.getItem("walletAddress");
                      let recv_escrow = escrow;
                      // create unsigned transaction
                      let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                        from:sender, 
                        suggestedParams: params, 
                        appIndex: index, 
                        appArgs: appArgs1
                      })                    
                      
                      
                      let data = `#pragma version 5

                      gtxn 1 TypeEnum
                      int 4
                      ==
                      bnz opt_in
                      
                      gtxn 0 ApplicationArgs 0
                      byte "get_token"
                      ==
                      bnz get_token
                      
                      opt_in:
                      global GroupSize
                      int 2
                      ==
                      bz failed
                      gtxn 0 TypeEnum
                      int 6
                      ==
                      
                      gtxn 0 ApplicationID
                      int 71951577 //appID
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
                      int 1
                      return
                      
                      get_token:
                      global GroupSize
                      int 2
                      ==
                      bz failed
                      gtxn 0 TypeEnum
                      int 6
                      ==
                      
                      gtxn 0 ApplicationID
                      int 71951577 //appID
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
                      int 1
                      return
                      
                      failed:
                      int 0
                      return`;
                      
                      
                      
                      let results = await algodClient.compile(data).do();
                      // console.log("Hash = " + results.hash);
                      // console.log("Result = " + results.result);
                      
                      let program = new Uint8Array(Buffer.from(escrowCompiled, "base64"));
                      
                      let lsig = new algosdk.LogicSigAccount(program);
                      console.log("amount =", amount);
                      
                      let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: sender, 
                        to: lsig.address(), 
                        amount: parseInt(amount), 
                        assetIndex: usdcID,
                        suggestedParams: params
                       });
  
                      
                      const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
                      const txs = [ transaction1, transaction2];
                      txs[0].group = groupID;
                      txs[1].group = groupID;
  
                      const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte()]);
                      // const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
  
                      //toast.info("Transaction in Progress");
                  const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob]).do();
                  // console.log("TxID", JSON.stringify(response, null, 1));
                  await waitForConfirmation(algodClient, response.txId);
                  setTim1();
                  setTim2();
                  setTim3();
                  setTime4();
                  setBondAmount("");
                  await balAsset();
                  await fetch(); 
                  await first();   
                  await minBal();            
                  //toast.success(`Transaction Success ${response.txId}`);
                    } catch (err) {
                      handleHideLoadPurchase();
                      toast.error(err.toString());
                      console.error(err);
                    }
                }
                }
                }
                }
                }
                }
                // }
                // else{
                //     toast.error(`Claim all remaining Bond to exchange`);
                // }

                
                
                  
                        //  mapTotal();
                        //  mapGoal();
                        
                          
                          // Use the AlgoSigner encoding library to make the transactions base
                          
                  
                    }

                    const ExchangePera =async () => {
                        // if(((parseFloat(stable)/1000000).toFixed(2) === 0.00 && (parseFloat(bond)/1000000).toFixed(2) === 0.00) || ((parseFloat(stable)/1000000).toFixed(2) === 'NaN' && (parseFloat(bond)/1000000).toFixed(2) === 'NaN'))
                        // {
                            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                            setConnector(connector);
                            handleShowLoadPurchase();
                            let Pop_amount = bondAmount;
                            if(Pop_amount === "")
                            {
                                toast.error("Input field should not be left empty. Please enter some values");
                                handleHideLoadPurchase();
                            } 
                            else
                            {  
                            // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
                            if (localStorage.getItem("walletAddress") === "")
                            {
                                toast.error("Connect your wallet");
                                handleHideLoadPurchase();
                            }
                            else{
                                if(appOpt === false)
                                {
                                    toast.error("Please Opt-in to App and then purchase bond");
                                    handleHideLoadPurchase();
                                }
                                else{ 
                                    if(parseFloat(minAlgo) < 2000)
                                    {
                                        toast.error("Insufficient Algo balance. Please get more Algos from dispenser.");
                                        handleHideLoadPurchase();
                                    }
                                    else
                                    {
                                    if(parseFloat(Pop_amount) > parseFloat(usdcBalances)/1000000)
                                    {
                                        toast.error(`Insufficient USDC balance. Your balance is ${(parseFloat(usdcBalances)/1000000).toFixed(2)} USDC but try to enter ${Pop_amount} USDC`);
                                        handleHideLoadPurchase();
                                    }
                                    else
                                    {
                                            if(parseFloat(Pop_amount) <= 0)
                                            {
                                                toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                                                handleHideLoadPurchase();
                                            }
                                            else
                                            { 
                            // var amt =  window.prompt("Enter the amount you want to donate"); 
                            // let amount = parseInt(amt) * 1000000;
                            let amount = parseFloat(Pop_amount).toFixed(6) * 1000000;
                          let index = parseInt(appID_global);
                            // console.log("appId inside donate", index)
                        
                            try {
                            //   const accounts = await myAlgoWallet.connect();
                              // const addresses = accounts.map(account => account.address);
                              const params = await algodClient.getTransactionParams().do();
                        
                              let appArgs1 = [];
                              appArgs1.push(new Uint8Array(Buffer.from("discount_buy")));
                              // let decAddr = algosdk.decodeAddress('EGUSS7HHM3ODVPW3Z2L55WPCZCR4TWSN2VVAKYPZKYEUER5BXM5N6YNH7I');
                              // appArgs.push(decAddr.publicKey);
                              //   // console.log("(line:516) appArgs = ",appArgs)
                              //localStorage.setItem("escrow", 'PKWSTDTMCYQQSFLNOW3W4TJN5VFJDR3KN5Q76G6OY6D4NFKHSFDZWC5BKY');
                              let sender = localStorage.getItem("walletAddress");
                              let recv_escrow = escrow;
                              // create unsigned transaction
                              let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                                from:sender, 
                                suggestedParams: params, 
                                appIndex: index, 
                                appArgs: appArgs1
                              })                    
                              
                              
                              let data = `#pragma version 5
        
                              gtxn 1 TypeEnum
                              int 4
                              ==
                              bnz opt_in
                              
                              gtxn 0 ApplicationArgs 0
                              byte "get_token"
                              ==
                              bnz get_token
                              
                              opt_in:
                              global GroupSize
                              int 2
                              ==
                              bz failed
                              gtxn 0 TypeEnum
                              int 6
                              ==
                              
                              gtxn 0 ApplicationID
                              int 71951577 //appID
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
                              int 1
                              return
                              
                              get_token:
                              global GroupSize
                              int 2
                              ==
                              bz failed
                              gtxn 0 TypeEnum
                              int 6
                              ==
                              
                              gtxn 0 ApplicationID
                              int 71951577 //appID
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
                              int 1
                              return
                              
                              failed:
                              int 0
                              return`;
                              
                              
                              
                              let results = await algodClient.compile(data).do();
                              // console.log("Hash = " + results.hash);
                              // console.log("Result = " + results.result);
                              
                              let program = new Uint8Array(Buffer.from(escrowCompiled, "base64"));
                              
                              let lsig = new algosdk.LogicSigAccount(program);
                              // console.log("Escrow =", lsig.address());
                              
                              let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                                from: sender, 
                                to: lsig.address(), 
                                amount: amount, 
                                assetIndex: usdcID,
                                suggestedParams: params
                               });
          
                              
                              const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
                              const txs = [ transaction1, transaction2];
                              txs[0].group = groupID;
                              txs[1].group = groupID;
          
                        // time to sign . . . which we have to do with walletconnect
                        const txns = [txs[0], txs[1]]
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
                           let response = await algodClient.sendRawTransaction(decodedResult).do();
                          await waitForConfirmation(algodClient, response.txId);
                          setTim1();
                          setTim2();
                          setTim3();
                          setTime4();
                          setBondAmount("");
                          await balAsset();
                          await fetch(); 
                          await first();   
                          await minBal();
                          //toast.success(`Transaction Success ${response.txId}`);
                            } catch (err) {
                              handleHideLoadPurchase();
                              toast.error(err.toString());
                              console.error(err);
                            }
                        }
                        }
                        }
                        }
                        }
                        }
                        // }
                        // else{
                        //     toast.error(`Claim all remaining Bond to exchange`);
                        // }
        
                        
                        
                          
                                //  mapTotal();
                                //  mapGoal();
                                
                                  
                                  // Use the AlgoSigner encoding library to make the transactions base
                                  
                          
                            }                    



const globalState = async (index) =>
{
      try {
        let appById = await algodClientGet.getApplicationByID(appID_global).do();
        setMap(appById['params']['global-state']);
        let accountInfoResponse = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
        // // console.log("R value", appById);
        // // console.log("local", accountInfoResponse);
        // // console.log("stable", accountInfoResponse['apps-local-state'])
        let c = 0;

        if( accountInfoResponse['account']['apps-local-state'].length === null|| accountInfoResponse['account']['apps-local-state'].length ===undefined||accountInfoResponse['account']['apps-local-state'].length===""){
            // alert("check");
         }
        else{
        
        
        //   // console.log("User",accountInfoResponse['account']['apps-local-state'].length);
          for (let i = 0; i < accountInfoResponse['account']['apps-local-state'].length; i++) { 
              if (accountInfoResponse['account']['apps-local-state'][i].id == parseInt(appID_global)) {
                //   // console.log("User's local state:",accountInfoResponse['account']['apps-local-state'][i].id);
                  let acccheck= accountInfoResponse['account']['apps-local-state'][i][`key-value`]; 
                //   // console.log("Usercheck",acccheck);
                //   // console.log("User",accountInfoResponse['account']['apps-local-state'][i][`key-value`]);
                
                  if(accountInfoResponse['account']['apps-local-state'][i][`key-value`]=== null|| accountInfoResponse['account']['apps-local-state'][i][`key-value`] === undefined||accountInfoResponse['account']['apps-local-state'][i][`key-value`]===""){
                    // alert("check");
                 }
                else{
        for (let n = 0; n < accountInfoResponse['account']['apps-local-state'][i][`key-value`].length; n++) {
                    //   // console.log(accountInfoResponse['account']['apps-local-state'][i][`key-value`][n]);
                      //setStakedBalance(accountInfoResponse['account']['apps-local-state'][i][`key-value`][n]);
                      
                      let rewardkey =accountInfoResponse['account']['apps-local-state'][i]['key-value'][n];
                     if(rewardkey['key'] === "TXlBbW91bnRCb25k"){
                    //    stakedbalancenew=accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint'];
                    setBond(accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint']);
                     }
                    if(rewardkey['key'] === "TXlBbW91bnRTdGFibGU="){
                    //   rewardbalancenew=accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint'];
                    // // console.log("stable",accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint']);
                    setToStable(accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint']);
                    //   // console.log("rewardcheck",accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint']);
                    }
                    if(rewardkey['key'] === "TXlUaW1l"){
                    //   usertimenew = accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint'];
                    // // console.log("MyTime",accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint']);
                    setToTime(parseInt(accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint'])+300);
                    //   // console.log("rewardcheck",accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint']);
                    let myTime = parseInt(accountInfoResponse['account']['apps-local-state'][i]['key-value'][n]['value']['uint']);
                    let myTimeSet = parseInt((parseInt(parseInt(new Date().getTime()/1000) - myTime))/(300));
                    console.log("timeSplit", parseInt((parseInt(parseInt(new Date().getTime()/1000) - myTime))/(300)));
                    if(myTimeSet < 5 && myTimeSet > 0)
                    {
                        setToTimeSplitHard(myTimeSet);
                    }
                    else if(myTimeSet <= 0)
                    {
                        setToTimeSplitHard(0);
                    }
                    else
                    {
                        setToTimeSplitHard(5);
                    }
                    }
                      
                  }
        
                }
        
                  
              }
          }
        }


        // // console.log("c =", c);
        // map1.map((a)=>{
        //     // console.log("map", a);
        // })

        // map1.forEach((element) => {
        //     // console.log("Element", element)
        // });

        let appArgsRet = [];
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][0]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][1]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][2]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][3]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][4]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][5]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][6]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][7]['key']));
        // // console.log("array", appArgsRet);

        // setrec(JSON.stringify(r['application']['params']['global-state'][0]['value'][`bytes`]));
        // setstartdt(JSON.stringify(r['application']['params']['global-state'][1]['value'][`uint`]));
        // settotal(JSON.stringify(r['application']['params']['global-state'][2]['value'][`uint`]));
        // setCreator(JSON.stringify(r['application']['params']['global-state'][3]['value'][`bytes`]));
        // setenddt(JSON.stringify(r['application']['params']['global-state'][4]['value'][`uint`]));
        // setclsdt(JSON.stringify(r['application']['params']['global-state'][5]['value'][`uint`]));
        // setgoal(JSON.stringify(r['application']['params']['global-state'][6]['value'][`uint`]));
        // setescrow(JSON.stringify(r['application']['params']['global-state'][7]['value'][`bytes`]));

        for (let i = 0; i <= 7; i++) { 

                        if(appArgsRet[i] == '"Q3JlYXRvcg=="'){
                            let creatorAddress_c =  JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                            // // console.log("creator address", creatorAddress_c)
                            setCreator(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                        }
                        else if(appArgsRet[i] == '"RW5kRGF0ZQ=="'){
                            let endDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            setenddt(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"RnVuZENsb3NlRGF0ZQ=="'){
                            let closeDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            setclsdt(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"R29hbA=="'){
                            let goalAmount_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            setgoal(goalAmount_c);
                        }
                        else if(appArgsRet[i] == '"UmVjZWl2ZXI="'){
                            let recv_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                            setrec(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                        }
                        else if(appArgsRet[i] == '"U3RhcnREYXRl"'){
                            let startDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            setstartdt(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"VG90YWw="'){
                            let total_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            settotal(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"RXNjcm93"'){
                            let escrow_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                            setescrow(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                        }
                        let j = i + 1;
                        // // console.log("time =", j, "then", JSON.stringify(await r['application']['params']['global-state'][6]['value'][`uint`]));
                        // // console.log("state", goal);
                        // // console.log("state", JSON.stringify(await r['application']['params']['global-state'][1]['value'][`uint`]));
                        // //let start = JSON.stringify(await r['application']['params']['global-state'][1]['value'][`uint`]);
                        let per = parseFloat((parseFloat(total/1000000)/parseFloat(goal/1000000)) * 100);
                        // // console.log("----------------total =", total);
                        // // console.log("----------------per =", per);
                        setPercent(per);
                }


        //return JSON.stringify(r['application']['params']['global-state'][7]['value'][`bytes`], null, 2);
      } catch (e) {
        //console.error(e);
        return JSON.stringify(e, null, 2);
      }
}

useEffect(async() =>{await fetch()},[bond, stable, time])

useEffect(async() => {
    await first()
}, [day, hour, min, sec, lock]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const first = async () => {

    var us= time;
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
        
    //   // console.log("date e", day);
    //   // console.log("hour e", hour);
    //   // console.log("min e", minutes);
    //   // console.log("sec e", seconds);

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

const fetch = async () => {
let index = parseInt(appID_global); //current app id need to be entered
setappid(index);
// await readLocalState(algodClient, localStorage.getItem("walletAddress"), index);
await globalState(index);
}

const myAlgoWalletClaim =async () => {
    handleShowLoadClaim();

    let amount_es;
    if(((parseInt(stable) * 20) / 100 >= parseInt(bond))){ //1080 >= 570
        amount_es = parseInt(bond);
    }
    else{
        amount_es = ((parseInt(stable) * 20) / 100) * parseInt(timeSplitHard);
    }
    // // console.log("amount-es", amount_es);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadClaim();
        }
        else{
            if(lock === true)
        {
            toast.error(`Claim is locked for ${day} Day : ${hour} Hours : ${min} Minutes : ${sec} Seconds`);
            handleHideLoadClaim();
        }
        else{
            if(parseFloat(minAlgo) < 1000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadClaim();
            }
            else
            {
            if(amount_es === 'NaN')
            {
                toast.error("Claiming amount is either zero or not a valid number");
                handleHideLoadClaim();
            }
            else
            {

//   const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');

 
//   let amount = parseInt(amountsend);
  let index = parseInt(appID_global);
  // console.log("appId inside donate", index)

  try {
    // const accounts = await myAlgoWallet.connect();
    // const addresses = accounts.map(account => account.address);
    const params = await algodClient.getTransactionParams().do();

    let appArgs1 = [];
    appArgs1.push(new Uint8Array(Buffer.from("get_token")));
    // let decAddr = algosdk.decodeAddress('EGUSS7HHM3ODVPW3Z2L55WPCZCR4TWSN2VVAKYPZKYEUER5BXM5N6YNH7I');
    // appArgs.push(decAddr.publicKey);
    //   // console.log("(line:516) appArgs = ",appArgs)
    //localStorage.setItem("escrow", 'PKWSTDTMCYQQSFLNOW3W4TJN5VFJDR3KN5Q76G6OY6D4NFKHSFDZWC5BKY');
    let sender = localStorage.getItem("walletAddress");
    let recv_escrow = escrow;
    // create unsigned transaction
    let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
      from:sender, 
      suggestedParams: params, 
      appIndex: index, 
      appArgs: appArgs1
    })   
    
    
    let data = `#pragma version 5

    gtxn 1 TypeEnum
    int 4
    ==
    bnz opt_in
    
    gtxn 0 ApplicationArgs 0
    byte "get_token"
    ==
    bnz get_token
    
    opt_in:
    global GroupSize
    int 2
    ==
    bz failed
    gtxn 0 TypeEnum
    int 6
    ==
    
    gtxn 0 ApplicationID
    int 71951577 //appID
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
    int 1
    return
    
    get_token:
    global GroupSize
    int 2
    ==
    bz failed
    gtxn 0 TypeEnum
    int 6
    ==
    
    gtxn 0 ApplicationID
    int 71951577 //appID
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
    int 1
    return
    
    failed:
    int 0
    return`;
    
    
    
    let results = await algodClient.compile(data).do();
    // // console.log("Hash = " + results.hash);
    // // console.log("Result = " + results.result);
    
    let program = new Uint8Array(Buffer.from(escrowCompiled, "base64"));
    
    let lsig = new algosdk.LogicSigAccount(program);
    // // console.log("Escrow =", lsig.address());
    
    let sender_es = lsig.address();
    let receiver_es = localStorage.getItem("walletAddress");
    // let receiver = "<receiver-address>"";
    // // console.log("amount rebase=", amount_es);
    // let assetID = 50812029 ;
    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: sender_es, 
      to: receiver_es,  
      amount: parseInt(amount_es), 
      assetIndex: elemID, 
      suggestedParams: params
    }); 
    console.log("amount_Es", amount_es);


  
    const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
    const txs = [ transaction1, transaction2 ];
    txs[0].group = groupID;
    txs[1].group = groupID;
    
    
    const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
    const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
    //toast.info(`Transaction in Progress`)
const response = await algodClient.sendRawTransaction([ signedTx1.blob, signedTx2.blob]).do();
// console.log("TxID", JSON.stringify(response, null, 1));
await waitForConfirmation(algodClient, response.txId);
setTim1();
setTim2();
setTim3();
setTime4();
setBondAmount("");
await balAsset();
await fetch(); 
await first();   
await minBal();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadClaim();
    toast.error(err.toString());
    console.error(err);
  }
        }
    }
    }
}


      //  mapTotal();
      //  mapGoal();
      
        
        // Use the AlgoSigner encoding library to make the transactions base
        

  }

  const ClaimPera =async () => {

    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);    
    handleShowLoadClaim();

    let amount_es;
    if(((parseInt(stable) * 20) / 100 >= parseInt(bond))){
        amount_es = parseInt(bond);
    }
    else{
        amount_es = (parseInt(stable) * 20) / 100;
    }
    // console.log("amount-es", amount_es);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadClaim();
        }
        else{
            if(lock === true)
        {
            toast.error(`Claim is locked for ${day} Day : ${hour} Hours : ${min} Minutes : ${sec} Seconds`);
            handleHideLoadClaim();
        }
        else{
            if(parseFloat(minAlgo) < 1000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadClaim();
            }
            else
            {
            if(amount_es === 'NaN')
            {
                toast.error("Claiming amount is either zero or not a valid number");
                handleHideLoadClaim();
            }
            else
            {

//   const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');

 
//   let amount = parseInt(amountsend);
  let index = parseInt(appID_global);
  // console.log("appId inside donate", index)

  try {
    // const accounts = await myAlgoWallet.connect();
    // const addresses = accounts.map(account => account.address);
    const params = await algodClient.getTransactionParams().do();

    let appArgs1 = [];
    appArgs1.push(new Uint8Array(Buffer.from("get_token")));
    // let decAddr = algosdk.decodeAddress('EGUSS7HHM3ODVPW3Z2L55WPCZCR4TWSN2VVAKYPZKYEUER5BXM5N6YNH7I');
    // appArgs.push(decAddr.publicKey);
    //   // console.log("(line:516) appArgs = ",appArgs)
    //localStorage.setItem("escrow", 'PKWSTDTMCYQQSFLNOW3W4TJN5VFJDR3KN5Q76G6OY6D4NFKHSFDZWC5BKY');
    let sender = localStorage.getItem("walletAddress");
    // create unsigned transaction
    let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
      from:sender, 
      suggestedParams: params, 
      appIndex: index, 
      appArgs: appArgs1
    })   
    
    
    let data = `#pragma version 5

    gtxn 1 TypeEnum
    int 4
    ==
    bnz opt_in
    
    gtxn 0 ApplicationArgs 0
    byte "get_token"
    ==
    bnz get_token
    
    opt_in:
    global GroupSize
    int 2
    ==
    bz failed
    gtxn 0 TypeEnum
    int 6
    ==
    
    gtxn 0 ApplicationID
    int 71951577 //appID
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
    int 1
    return
    
    get_token:
    global GroupSize
    int 2
    ==
    bz failed
    gtxn 0 TypeEnum
    int 6
    ==
    
    gtxn 0 ApplicationID
    int 71951577 //appID
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
    int 1
    return
    
    failed:
    int 0
    return`;
    
    
    
    let results = await algodClient.compile(data).do();
    // // console.log("Hash = " + results.hash);
    // // console.log("Result = " + results.result);
    
    let program = new Uint8Array(Buffer.from(escrowCompiled, "base64"));
    
    let lsig = new algosdk.LogicSigAccount(program);
    // // console.log("Escrow =", lsig.address());
    
    let sender_es = lsig.address();
    let receiver_es = localStorage.getItem("walletAddress");
    // let receiver = "<receiver-address>"";
    // // console.log("amount rebase=", amount_es);
    // let assetID = 50812029 ;
    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: sender_es, 
      to: receiver_es,  
      amount: amount_es, 
      assetIndex: elemID, 
      suggestedParams: params
    }); 
    


  
    const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
    const txs = [ transaction1, transaction2 ];
    txs[0].group = groupID;
    txs[1].group = groupID;
    
    const escrow = algosdk.signLogicSigTransaction(txs[1], lsig);
    const txns = [txs[0], txs[1]]
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
    decodedResult[1] = escrow.blob;
    let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setTim1();
    setTim2();
    setTim3();
    setTime4();
    setBondAmount("");
    await balAsset();
    await fetch(); 
    await first();   
    await minBal();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadClaim();
    toast.error(err.toString());
    console.error(err);
  }
        }
    }
    }
}


      //  mapTotal();
      //  mapGoal();
      
        
        // Use the AlgoSigner encoding library to make the transactions base
        

  }

const Finish = async () => {

    const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');

 
    //   let amount = parseInt(amountsend);
      let index = parseInt(appID_global);
      // console.log("appId inside", index)
    
      try {
        const accounts = await myAlgoWallet.connect();
        const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
    
        let appArgs1 = [];
        appArgs1.push(new Uint8Array(Buffer.from("finish")));
        let sender = localStorage.getItem("walletAddress");
        // create unsigned transaction
        let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
          from:sender, 
          suggestedParams: params, 
          appIndex: index, 
          appArgs: appArgs1
        })   


        const signedTx1 = await myAlgoWallet.signTransaction(transaction1.toByte());
        //toast.info(`Transaction in Progress`)
    const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
    // console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    //toast.success(`Transaction Successful with ${response.txId}`);
      } catch (err) {
        toast.error(err.toString());
        console.error(err);
      }

}


const usdcFund = async () =>
{
    handleShowLoadUsdcFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadUsdcFund();
        }
        else{

let usdcFundProgram = new Uint8Array(Buffer.from("BSABATEZIhIiQzIEgQISMwAQIhIQMwEQgQQSQQACIkOBAEM=", "base64"));

let lsigusdcFund = new algosdk.LogicSigAccount(usdcFundProgram);
// // console.log("Escrow =", lsigusdcFund.address());

try {

    const params = await algodClient.getTransactionParams().do();

    let sender = localStorage.getItem("walletAddress");
    let escrow = lsigusdcFund.address();
    // create unsigned transaction
    let transaction1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender, 
        to: sender,  
        amount: 0, 
        assetIndex: parseInt(usdcID), 
        suggestedParams: params
      });    

    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: escrow, 
      to: sender,  
      amount: 10 * 1000000, 
      assetIndex: parseInt(usdcID), 
      suggestedParams: params
    }); 

    const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
    const txs = [ transaction1, transaction2 ];
    txs[0].group = groupID;
    txs[1].group = groupID;
    
    
    const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
    const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsigusdcFund);
    // toast.info(`Transaction in Progress`)
const response = await algodClient.sendRawTransaction([ signedTx1.blob, signedTx2.blob]).do();
// // console.log("TxID", JSON.stringify(response, null, 1));
await waitForConfirmation(algodClient, response.txId);
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadUsdcFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}

useEffect(async () => {
    await balAsset();
}, [usdcBalances, elemBalances, bondAmount, appTotal]);

const balAsset = async () =>
{
    // indexClient
let gApp = await indexClient.lookupApplications(bondDetails.bondAppID).do();
// // console.log(gApp['application']['params']['global-state']);
let gAppLen = gApp['application']['params']['global-state']['length'];

for(let j = 0; j < gAppLen; j++)
{
    if(gApp['application']['params']['global-state'][j]['key'] === "VG90YWw=")
    {
        setAppTotal(gApp['application']['params']['global-state'][j]['value']['uint']);
        // // console.log("gAppTotal =",gApp['application']['params']['global-state'][j]['value']['uint']);
        break;
    }
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = bal['account']['assets']['length'];    
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


}

// setAssets(bal['account']['assets']);
} 

useEffect(async() => {
    await BondBalance()
}, [bondBalance]);        

const BondBalance = async () =>{
let balance = await indexClient.lookupAccountByID(bondDetails.b_escrow).do();
// // console.log(balance['account']['assets'][0]['amount']);
let assetCount = balance['account']['assets']['length']
// // console.log(l);
for(let i = 0; i < assetCount; i++)
{
    if(balance['account']['assets'][i]['asset-id'] === elemID)
    {
setBondBalance(parseFloat(balance['account']['assets'][i]['amount'])/1000000);
break;
    }
}
}

useEffect(async() => {
    await optCheck();
}, [assetOpt, appOpt]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
// console.log(accountInfo);
let assetCount = accountInfo['account']['assets']['length']
// // console.log(l);
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'][i]['asset-id'] === elemID)
    {
        setToAssetOpt(true);
        break;
    }
}

const apps = accountInfo['account']['apps-local-state'];
console.log("app", apps);
// setAssets(bal['account']['assets']);
let appCount = apps['length'];
// // console.log(l);
for(let j = 0; j < appCount; j++)
{
    if(accountInfo['account']['apps-local-state'][j]['id'] === appID_global)
    {
        setToAppOpt(true);
        break;
    }
}
}
const reload = () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false); 
};

    window.onload = () => {
        let reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
        }
    }      

// useEffect(async () => {
//     await elemRecv();
// }, [setElemGet]);

useEffect(async() => {
    await minBal();
}, [minAlgo]);

const minBal = async () =>
{
    let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
    // // console.log("minBalanceApi", min['min-balance']);
    setMinAlgo(min['amount'] - min['min-balance']);
    // console.log("minBalance", minAlgo);
}

const maxButton = async () =>{
    setBondAmount(parseFloat(usdcBalances)/1000000)
}

const appOptinWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await myAlgoOptIn();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await appOptInPera();
    }
}

const assetOptinWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await myAlgoOptInAsset();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await assetOptInPera();
    }
}

const exchangeWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await myAlgoWalletExchange();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await ExchangePera();
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

const purchaseBond = async() =>{
    handleShowLoadPurchase();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const bondContract = new ethers.Contract(BondAddress, BondAbi, web31.getSigner(account));

        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        const mintTx = await bondContract.depositDAI(BigInt(bondAmount*1e18));
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Bond purchased succeefully");
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
        const daiContract = new ethers.Contract(DAIAddress, DaiAbi, web31.getSigner(account));

        const mintTx = await daiContract.approve(BondAddress,BigInt(10000000000*1e18));
      
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Approve is Done succeefully");
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
        const bondContract = new ethers.Contract(BondAddress, BondAbi, web31.getSigner(account));

        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        const mintTx = await bondContract.claim();
        // await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://goerli.basescan.org/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        toast.success("Claim  succeefully");
        handleHideLoadClaim();
    }catch(error){
        toast.error("Claim is not succeed",`${error}`);
        console.log("error",error)
        handleHideLoadClaim();
    }
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
                        <h3 className='mb-0 text-187'>${treasurBalance ? (parseFloat(treasurBalance*(blackPrice/1e9)) / 1e9).toFixed(4) : "0"}</h3>
                    </div>
                    <div className='ms-sm-5 ms-4'>
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
                        <h3 className='mb-0 text-187'>${blackPrice ? (parseFloat((blackPrice/1e9)) ).toFixed(4) : "0"}</h3>
                    </div>
                </div>

                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={daiLogo} alt="logo" />
                                <span className='ms-3'>DAI</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        ${daiPrice ? (parseFloat((daiPrice/1e6)) ).toFixed(4) : "0"}
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Discount Price of ELEM asset
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
                                        {blackPurchased.claimedAmount?ethers.utils.formatUnits(blackPurchased.claimedAmount,18) :0}
                                        <OverlayTrigger
                                key="left"
                                placement="left"
                                overlay={
                                    <Tooltip id={`tooltip-left`}>
                                        Total ELEM purchased in bond represented in USD.
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
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your DAI Balance: </span>{daiBlance ? (parseFloat(daiBlance)/1e18).toFixed(4) : '0'} DAI</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={bondAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => setBondAmount(e.target.value)}
                                                        />
                                                        {/* <Button variant="outline-purple" className='btn-xs-d' onClick={maxButton}>Max</Button> */}
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                {allowan > bondAmount ? <Button loading={loaderPurchase} className='btn btn-blue' onClick={purchaseBond}>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad loading={loaderPurchase} className='btn btn-blue' onClick={approve}>
                                                    Approve DAI
                                                    </ButtonLoad>}
                                                </Col>
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
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span> {blackPurchased.userRewards?ethers.utils.formatUnits(blackPurchased.userRewards,18) :0} Black</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
{blackPurchased.claimedTime ? 
(<>
  {ethers.utils.formatUnits(blackPurchased.claimedTime,0) > 0 ? 
                                                (<>
                                                {(parseInt(ethers.utils.formatUnits(blackPurchased.claimedTime,0))+120) <= (Math.floor(new Date().getTime() / 1000)) ? (<>
                                                    <ButtonLoad loading={loaderClaim} className='btn w-100 btn-blue' onClick={claimWalletCheck}>Claim </ButtonLoad>
                                                </>):(<>
                                                
                                                    <ButtonLoad disabled={true} className='btn w-100 btn-blue' >Claim </ButtonLoad>
                                                </>)}
                                                </>):(<>
                                                {(parseInt(ethers.utils.formatUnits(blackPurchased.depositTime,0))+120) <= (Math.floor(new Date().getTime() / 1000)) ? (<>
                                                    <ButtonLoad loading={loaderClaim} className='btn w-100 btn-blue' onClick={claimWalletCheck}>Claim </ButtonLoad>
                                                </>):(<>
                                                    <ButtonLoad disabled={true} className='btn w-100 btn-blue' >Claim </ButtonLoad>
                                                </>)}
                                                </>) }
</>):(<>
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
                                                            Please Opt-In the address to app and asset to use the bond.
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
                                                    {/* <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span> {lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<></>)} </h6> */}
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