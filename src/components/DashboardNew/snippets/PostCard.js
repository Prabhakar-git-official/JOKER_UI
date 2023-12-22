import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, ProgressBar, Form, InputGroup, Card, FormControl } from 'react-bootstrap';

import Image from '../../../assets/images/element_banner_sale.png';
import Icon from '../../../assets/images/post-icon-1.png';
import Logo from '../../../assets/images/modal-logo-new.png';
// import SLogo from '../../../assets/images/elem-original.png';
import SLogo from '../../../assets/images/launchpadJoker.png';
import jokercoin from '../../../assets/images/Jokercoin.png';
import stasisTetrahedron from '../../../assets/images/Statis Tetrahedron.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import ReactDomServer from 'react-dom/server';
import ButtonLoad from 'react-bootstrap-button-loader'
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { ethers } from 'ethers';
// import {appOptinLaunchpad, assetOptinLaunchpad, donateLaunchpad} from '../apicallfunction';
import '../../toast-style-override.css'
import launchpadDetails from './launchpad.json';
import node from '../nodeapi.json';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { updatealgobalance } from "../../formula";
 
// import url from '../../../../configurl';
import { Link } from 'react-router-dom';
import { launchpadAbi, launchpadAddress, saiTokenAbi, saiTokenAddress } from '../../../abi/abi';
import { Erc20TokenAddress, LaunchpadAddress, Erc20TokenAbi, LaunchpadAbi } from '../../../abi/LaunchPadabi';
const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";
const PostCard = () => {

    const [show, setShow] = React.useState(false);
    const [showDonate, setShowDonate] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDonate = () => setShowDonate(false);
    const handleShowDonate = () => setShowDonate(true);

    const[loaderAppOpt, setLoaderAppOpt] = useState(false);

    const handleShowLoadAppOpt = () => setLoaderAppOpt(true);
    const handleHideLoadAppOpt = () => setLoaderAppOpt(false);

    const[loaderAssetOpt, setLoaderAssetOpt] = useState(false);

    const handleShowLoadAssetOpt = () => setLoaderAssetOpt(true);
    const handleHideLoadAssetOpt = () => setLoaderAssetOpt(false);

    const[loaderParticipate, setLoaderParticipate] = useState(false);

    const handleShowLoadParticipate = () => setLoaderParticipate(true);
    const handleHideLoadParticipate = () => setLoaderParticipate(false);

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
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const [appOpt,setToAppOpt] = useState(false);
    const [assetOpt,setToAssetOpt] = useState(false);
    const [asset,setToasset] = useState("");
    const [amount_inp, setToamount] = useState("");
    const [amtReclaim, setToReclaim] = useState("");
    const [LocalAmount, setLocalAmount] = useState("");
    // const [show, setShow] = useState(false);
    const [value, setValue] = React.useState('');
    const [valueAddAddress, setValueAddAddress] = React.useState('');
    const [addrAddAddress, setValueAddrAddAddress] = React.useState('');
    const [algoBalance, setAlgoBalance] = useState("");
    const [elemBalance, setElemBalance] = useState("");
    const [algoDonated, setAlgoDonated] = useState("");
    const [ethBalance, setEthBalance] = useState();
    const[Saibalance,setSaibalance] = useState();
    // const[TotalCount,setTotalCount] = useState();
    const[MyDeposit,setMyDeposit] = useState();
    const[TotalDeposit,setTotalDeposit] = useState()
    const[minimumStake, setMinimumStake] = useState(0.0001);
    const[startEpoch, setStartEpoch] = useState();
    const[endEpoch, setEndEpoch] = useState();
    const[isepochCalculated, setisepochCalculated] = useState(false);

    const [minAlgo, setMinAlgo] = useState("");

    const handleAssetFalse = () => setToAssetOpt(false);
    const handleAssetTrue = () => setToAssetOpt(true);

    // Function to convert wei to ETH with decimal values
  const weiToEth = (wei) => ethers.utils.formatUnits(wei, 'ether');

    let appID_global = launchpadDetails['app1']['appID'];
    let escrow_global = "LMCGCWB7LOFIQBIKO663W4OOOQQCNWQGU23HCMLYXX3S35OXS47XLXLTXQ";
    let elementID_global = launchpadDetails['app1']['elemAssetID'];
    let whiteID_global = launchpadDetails['app1']['whiteAssetID'];
    let owner_global = "UTV3AUE6PTUDIBAT6EOP57IUJMW75MOXNP2XOZLMJX5CEBLDGTMYTR32CU";

    const walletBalance = async(props) => {
        console.log("balanceWei")
        // const web3 = new Web3(window.ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let launchpadContract =  new ethers.Contract(LaunchpadAddress,LaunchpadAbi,provider);
        if(localStorage.getItem("walletAddress")){
            // await provider.send("eth_requestAccounts", []);
            console.log("balanceWei")
            let bl = await provider.getBalance(localStorage.getItem("walletAddress"));
            let balance = await ethers.utils.formatEther(bl)
            console.log("balanceWei",balance)
            setEthBalance(parseFloat(balance).toFixed(5));

            // let jokerContract =  new ethers.Contract(Erc20TokenAddress,Erc20TokenAbi,provider);
            // let jokerbalance = await jokerContract.balanceOf(localStorage.getItem("walletAddress"));
            // let balanceinth = ethers.utils.formatUnits(jokerbalance, 18)
            let jokerbalance = await launchpadContract.getRewardAmount(localStorage.getItem("walletAddress"));
            let balanceinth = (jokerbalance / 10 ** 9).toFixed(2) ;
            console.log("jokerbalance",balanceinth);
            setSaibalance(balanceinth)
            let mydeposits = await launchpadContract.getStakeddAmount(localStorage.getItem("walletAddress"));
            let mydep = (mydeposits /10 **18).toFixed(4);
            setMyDeposit(mydep);
            let totaldeposit = await launchpadContract.getContractBalance();
            let totaldep = (totaldeposit /10 **18).toFixed(4);
            setTotalDeposit(totaldep);
            let minimumStake1 = await launchpadContract.minimumStake();
            let minStake = ethers.utils.formatUnits(minimumStake1, 18);
            console.log("minimum stake:", minStake);
            let startEpoch = await launchpadContract.getStartTimestamp();
            setStartEpoch(startEpoch);
            let endEpoch = await launchpadContract.getEndTimestamp();
            setEndEpoch(endEpoch);
        }
        // let totalcount = await launchpadContract.getContractBalance();
        // console.log("contract balance:", totalcount);
        // setTotalCount(ethers.utils.formatUnits(totalcount, 18))

        

        
      }
      useEffect(() => {
          walletBalance();
        //   profileImageFetch();
      },[]);

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

//     const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'}

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
              // //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            //   toast.success(`Transaction Successful with ${txId}`);
            let id = "https://testnet.algoexplorer.io/tx/" + txId;
            toast.success(toastDiv(id));
            handleHideLoadAssetOpt();
            handleHideLoadAppOpt();
            handleHideLoadParticipate();
            await updatealgobalance();
            // await sleep(5000);
            // reload();               
            break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  

        const AppOptIn = async () =>
        {
            handleShowLoadAppOpt();
            if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAppOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000 + 28500)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideLoadAppOpt();
            }
            else
            {
        //   let application = indexClient.searchForApplications(appID_global);
          // //console.log("Global State =", application);
        //   let appById = await algodClient.getApplicationByID(appID_global).do();
          // //console.log("Global State =", appById.params);
          let params = await algodClient.getTransactionParams().do();
        
          try {
        
            const txn = algosdk.makeApplicationOptInTxnFromObject({
                suggestedParams:params,
                from: localStorage.getItem("walletAddress"),
                appIndex: parseInt(appID_global),
            });
        
            const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
            // //toast.info("Transaction in Progress");
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
           //API for Connect wallet  stored in /lpTracker
        //   await appOptinLaunchpad(localStorage.getItem("walletAddress"), "Opted in to Launchpad app");
          //API end
            await waitForConfirmation(algodClient, response.txId);
            setToAppOpt(true);
            await countAsset();
            await minBal();
            // toast.success(`Transaction Success ${response.txId}`);
        }
        catch (err) {
            let ev = err.toString()
            let present = ev.indexOf("Cannot read properties of undefined")
            if(present > 1)
            {
            
            }
            else
            {
            toast.error(`Transaction Failed due to ${err}`);
            }
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
      //   console.log("Global State =", application);
      //   let appById = await algodClient.getApplicationByID(appID_global).do();
      //   console.log("Global State =", appById.params);
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
            await countAsset();
            await minBal();
          }catch(err) {
            let ev = err.toString()
            let present = ev.indexOf("reading '0'")
            if(present > 1)
            {
            
            }
            else
            {
            toast.error(`Transaction Failed due to ${err}`);
            }
              handleHideLoadAppOpt();
              console.error(err);
          }
          }
          }
        }

    const optinAsset = async () =>
    {
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
              assetIndex: elementID_global
          });
      
          const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
        //toast.info("Transaction in Progress");
          const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
          
          //API for Connect wallet  stored in /lpTracker
        //   await assetOptinLaunchpad(localStorage.getItem("walletAddress"), "Opted in to ELEM Asset");
          //API end

          await waitForConfirmation(algodClient, response.txId);
          setToAssetOpt(true);
          await countAsset();
          await minBal();
        //   toast.success(`Transaction Success ${response.txId}`);
      
      }
      catch (err) {
        let ev = err.toString()
        let present = ev.indexOf("Cannot read properties of undefined")
        if(present > 1)
        {
        
        }
        else
        {
          toast.error(`Transaction Failed due to ${err}`);
        }
          handleHideLoadAssetOpt();
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
        assetIndex: elementID_global
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
      await countAsset();
      await minBal();
    }catch (err) {
        handleHideLoadAssetOpt();
        let ev = err.toString()
        let present = ev.indexOf("Cannot read properties of undefined")
        if(present > 1)
        {
        
        }
        else
        {
        toast.error(err.toString());
        }
        console.error(err);
    }
    }
    }
  }

  const optinWhiteAsset = async () =>
  {
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
            assetIndex: whiteID_global
        });
    
        const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      //toast.info("Transaction in Progress");
        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        
        //API for Connect wallet  stored in /lpTracker
      //   await assetOptinLaunchpad(localStorage.getItem("walletAddress"), "Opted in to ELEM Asset");
        //API end

        await waitForConfirmation(algodClient, response.txId);
        setToAssetOpt(true);
        await countAsset();
        await minBal();
      //   toast.success(`Transaction Success ${response.txId}`);
    
    }
    catch (err) {
      let ev = err.toString()
      let present = ev.indexOf("Cannot read properties of undefined")
      if(present > 1)
      {
      
      }
      else
      {
        toast.error(`Transaction Failed due to ${err}`);
      }
        handleHideLoadAssetOpt();
        console.error(err);
    
    }
  }
  }
  }

  const assetWhiteOptInPera = async () =>
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
      assetIndex: whiteID_global
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
    await countAsset();
    await minBal();
  }catch (err) {
      handleHideLoadAssetOpt();
      let ev = err.toString()
      let present = ev.indexOf("Cannot read properties of undefined")
      if(present > 1)
      {
      
      }
      else
      {
      toast.error(err.toString());
      }
      console.error(err);
  }
  }
  }
}

    const Donate =async (Pop_amount) => {
        handleShowLoadParticipate();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadParticipate();
        }
        else{
        // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
        const accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
        if((parseFloat(accountInfo['account']['amount'])/1000000) < parseFloat(Pop_amount))
        {
            toast.error(`Your balance is ${(parseFloat(accountInfo['account']['amount'])/1000000)} Algos but trying to spend ${Pop_amount} Algos`);
            handleHideLoadParticipate();
        }
        else{
            if(appOpt === false)
            {
                toast.error("Please Opt-in to App and then purchase");
                handleHideLoadParticipate();
            }
            else{
                if(assetOpt === false)
                {
                    toast.error("Please Opt-in to Asset and then purchase");
                    handleHideLoadParticipate();
                }
                else{
            if(parseFloat(minAlgo) < (4000 + (parseFloat(Pop_amount) * 1000000)))
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadParticipate();
            }
            else
            {
        // var amt =  window.prompt("Enter the amount you want to donate"); 
        // let amount = parseInt(amt);
        let amount = parseFloat(Pop_amount) * 1000000;
        let index = parseInt(appID_global);
        // //console.log("appId inside donate", index)
        // //console.log("amonut pop", amount)
    
        try {
        //   const accounts = await myAlgoWallet.connect();
          // const addresses = accounts.map(account => account.address);
          const params = await algodClient.getTransactionParams().do();
    
          let appArgs1 = [];
          appArgs1.push(new Uint8Array(Buffer.from("donate")));

          let foreinAppId = [];
          foreinAppId.push(parseInt(launchpadDetails.app1.whiteAssetID));

          let sender = localStorage.getItem("walletAddress");
        //   let recv_escrow = escrow;
          // create unsigned transaction
          let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
            from:sender, 
            suggestedParams: params, 
            appIndex: index, 
            appArgs: appArgs1,
            foreignApps: foreinAppId
          })                    
          
          let program = new Uint8Array(Buffer.from(launchpadDetails['app1']['escrow'], "base64"));          
          let lsig = new algosdk.LogicSigAccount(program);
          console.log("Escrow =", lsig.address());
          
          let transaction2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: lsig.address(), 
            amount: parseInt(amount), 
             note: undefined,  
             suggestedParams: params
           });


          let sender_es = lsig.address();
          let receiver_es = localStorage.getItem("walletAddress");
          let amount_es = amount * 2;
          let assetID = parseInt(elementID_global) ;
          let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender_es, 
            to: receiver_es, 
            amount: parseInt(amount_es), 
            assetIndex: assetID, 
            suggestedParams: params
          }); 

          let transaction4 = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            freezeTarget: receiver_es, 
            freezeState: false,   
            assetIndex: launchpadDetails['app1']['whiteAssetID'],
            suggestedParams: params
           });

           let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: lsig.address(), 
            amount: 1000000,
            assetIndex: launchpadDetails['app1']['whiteAssetID'],  
            suggestedParams: params
           });

           let transaction6 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: sender,
            amount: 1000000,
            assetIndex: launchpadDetails['app1']['whiteAssetID'],  
            suggestedParams: params
           });

           let transaction7 = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            freezeTarget: receiver_es, 
            freezeState: true,   
            assetIndex: launchpadDetails['app1']['whiteAssetID'],
            suggestedParams: params
           });
          
          const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7]);
          const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7];
          txs[0].group = groupID;
          txs[1].group = groupID;
          txs[2].group = groupID;
          txs[3].group = groupID;
          txs[4].group = groupID;
          txs[5].group = groupID;
          txs[6].group = groupID;

          const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[4].toByte()]);
        //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
          const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
          const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
          const signedTx6 = algosdk.signLogicSigTransaction(txs[5], lsig);
          const signedTx7 = algosdk.signLogicSigTransaction(txs[6], lsig);
        //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());

          //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob, signedTx3.blob, signedTx4.blob, signedTx1[2].blob, signedTx6.blob, signedTx7.blob]).do();
      // //console.log("TxID", JSON.stringify(response, null, 1));
      //API for Connect wallet  stored in /lpTracker
    //   await donateLaunchpad(localStorage.getItem("walletAddress"), amount);
      //API end
      await waitForConfirmation(algodClient, response.txId);
      await globalState();
      await countAsset();
      await updatealgobalance();
    //   toast.success(`Transaction Successfully completed with ${response.txId}`);
    //   //toast.info(`Now you have obtained Element amount = ( ${(parseFloat(Pop_amount) * 2).toFixed(2)} ELEM )`);
        } catch (err) {
            let errToString = err.toString()
            let kycProcess = errToString.indexOf("asset not found in account")
            let verification = errToString.indexOf("underflow on subtracting 1000000 from sender amount 0")
            if(kycProcess > 1)
            {
                toast.warn("Please complete the KYC");
            }
            else if(verification > 1)
            {
                toast.warn("Please wait your KYC is under verification");
            }
            else
            {
            toast.error(err.toString());
            }
          handleHideLoadParticipate();
          console.error(err);
        }
    }
    }
}
}
        }
    }

    const DonatePera =async (Pop_amount) => {
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        setConnector(connector);
        handleShowLoadParticipate();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadParticipate();
        }
        else{
        // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
        const accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
        if((parseFloat(accountInfo['account']['amount'])/1000000) < parseFloat(Pop_amount))
        {
            toast.error(`Your balance is ${(parseFloat(accountInfo['account']['amount'])/1000000)} Algos but trying to spend ${Pop_amount} Algos`);
            handleHideLoadParticipate();
        }
        else{
            if(appOpt === false)
            {
                toast.error("Please Opt-in to App and then purchase");
                handleHideLoadParticipate();
            }
            else{
                if(assetOpt === false)
                {
                    toast.error("Please Opt-in to Asset and then purchase");
                    handleHideLoadParticipate();
                }
                else{
            if(parseFloat(minAlgo) < (4000 + (parseFloat(Pop_amount) * 1000000)))
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadParticipate();
            }
            else
            {
        // var amt =  window.prompt("Enter the amount you want to donate"); 
        // let amount = parseInt(amt);
        let amount = parseFloat(Pop_amount) * 1000000;
        let index = parseInt(appID_global);
        // //console.log("appId inside donate", index)
        // //console.log("amonut pop", amount)
    
        try {
        //   const accounts = await myAlgoWallet.connect();
          // const addresses = accounts.map(account => account.address);
          const params = await algodClient.getTransactionParams().do();
    
          let appArgs1 = [];
          appArgs1.push(new Uint8Array(Buffer.from("donate")));
          // let decAddr = algosdk.decodeAddress('EGUSS7HHM3ODVPW3Z2L55WPCZCR4TWSN2VVAKYPZKYEUER5BXM5N6YNH7I');
          // appArgs.push(decAddr.publicKey);
          //   // //console.log("(line:516) appArgs = ",appArgs)
          //localStorage.setItem("escrow", 'PKWSTDTMCYQQSFLNOW3W4TJN5VFJDR3KN5Q76G6OY6D4NFKHSFDZWC5BKY');
          let sender = localStorage.getItem("walletAddress");
        //   let recv_escrow = escrow;
          // create unsigned transaction
          let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
            from:sender, 
            suggestedParams: params, 
            appIndex: index, 
            appArgs: appArgs1
          })                    
          
          let program = new Uint8Array(Buffer.from(launchpadDetails['app1']['escrow'], "base64"));          
          let lsig = new algosdk.LogicSigAccount(program);
          console.log("Escrow =", lsig.address());
          
          let transaction2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: lsig.address(), 
            amount: amount, 
             note: undefined,  
             suggestedParams: params
           });


          let sender_es = lsig.address();
          let receiver_es = localStorage.getItem("walletAddress");
          // let receiver = "<receiver-address>"";
          let amount_es = amount * 2;
          let closeToRemaninder = undefined;
          let note = undefined;
          let assetID = parseInt(elementID_global) ;
          let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender_es, 
            to: receiver_es, 
            amount: amount_es, 
            assetIndex: assetID, 
            suggestedParams: params
          }); 

          let transaction4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: lsig.address(), 
            amount: 1000, 
             note: undefined,  
             suggestedParams: params
           });
          
          const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
          const txs = [ transaction1, transaction2, transaction3, transaction4];
          txs[0].group = groupID;
          txs[1].group = groupID;
          txs[2].group = groupID;
          txs[3].group = groupID;

          const escrow = algosdk.signLogicSigTransaction(txs[2], lsig);
        //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
                      // time to sign . . . which we have to do with walletconnect
                      const txns = [txs[0], txs[1], txs[2], txs[3]]
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
                         decodedResult[2] = escrow.blob;
                         let response = await algodClient.sendRawTransaction(decodedResult).do();
                         await waitForConfirmation(algodClient, response.txId);
      await waitForConfirmation(algodClient, response.txId);
      await globalState();
      await countAsset();
      await optCheck();
    //   toast.success(`Transaction Successfully completed with ${response.txId}`);
    //   //toast.info(`Now you have obtained Element amount = ( ${(parseFloat(Pop_amount) * 2).toFixed(2)} ELEM )`);
        } catch (err) {
          handleHideLoadParticipate();
          toast.error(`Transaction Failed due to ${err}`);
          console.error(err);
        }
    }
    }
}
}
        }
    }

    const globalState = async (index) =>
{
      try {
        let appById = await indexClient.lookupApplications(launchpadDetails.app1.appID).do();
         //console.log("app", appById['application']['params']['global-state']);
        setMap(appById['application']['params']['global-state']);

         //console.log("length", appById['application']['params']['global-state']['length']);
let endCount = appById['application']['params']['global-state']['length'];
for(let i = 0; i < endCount; i++)
{
        if(appById['application']['params']['global-state'][i]['key'] == "RW5kRGF0ZQ=="){
            let endDate_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
             //console.log("endDate", endDate_c);
            setenddt(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
        }
    }

        //  //console.log("R value", r);

        // map1.map((a)=>{
        //      //console.log("map", a);
        // })

        // map1.forEach((element) => {
        //      //console.log("Element", element)
        // });

        let appArgsRet = [];
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][0]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][1]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][2]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][3]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][4]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][5]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][6]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][7]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][8]['key']));
        //  //console.log("array", appArgsRet);

        // setrec(JSON.stringify(r['application']['params']['global-state'][0]['value'][`bytes`]));
        // setstartdt(JSON.stringify(r['application']['params']['global-state'][1]['value'][`uint`]));
        // settotal(JSON.stringify(r['application']['params']['global-state'][2]['value'][`uint`]));
        // setCreator(JSON.stringify(r['application']['params']['global-state'][3]['value'][`bytes`]));
        // setenddt(JSON.stringify(r['application']['params']['global-state'][4]['value'][`uint`]));
        // setclsdt(JSON.stringify(r['application']['params']['global-state'][5]['value'][`uint`]));
        // setgoal(JSON.stringify(r['application']['params']['global-state'][6]['value'][`uint`]));
        // setescrow(JSON.stringify(r['application']['params']['global-state'][7]['value'][`bytes`]));

        for (let i = 0; i <= 8; i++) { 

                        if(appArgsRet[i] == '"Q3JlYXRvcg=="'){
                            let creatorAddress_c =  JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]);
                             //console.log("creator address", creatorAddress_c)
                            let dec = new Uint8Array(Buffer.from(creatorAddress_c, "base64"));
                            let addr = algosdk.encodeAddress(dec);
                            setCreator(addr);
                        }
                        else if(appArgsRet[i] == '"RnVuZENsb3NlRGF0ZQ=="'){
                            let closeDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            setclsdt(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"R29hbA=="'){
                            let goalAmount_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
                            setgoal(goalAmount_c);
                        }
                        else if(appArgsRet[i] == '"UmVjZWl2ZXI="'){
                            let recv_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                            setrec(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]));
                        }
                        else if(appArgsRet[i] == '"U3RhcnREYXRl"'){
                            let startDate_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
                            setstartdt(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"VG90YWw="'){
                            let total_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
                            settotal(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"RXNjcm93"'){
                            let escrow_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]);
                            setescrow(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]));
                        }
                        let j = i + 1;
                        //  //console.log("time =", j, "then", JSON.stringify(await r['application']['params']['global-state'][6]['value'][`uint`]));
                        //  //console.log("state", goal);
                        //  //console.log("state", JSON.stringify(await r['application']['params']['global-state'][1]['value'][`uint`]));
                        // //let start = JSON.stringify(await r['application']['params']['global-state'][1]['value'][`uint`]);
                        let per = parseFloat((parseFloat(total/1000000)/parseFloat(goal/1000000)) * 100);
                        //  //console.log("----------------total =", total);
                        //  //console.log("----------------per =", per);
                        setPercent(per);
                }


        //return JSON.stringify(r['application']['params']['global-state'][7]['value'][`bytes`], null, 2);
      } catch (e) {
        //console.error(e);
        return JSON.stringify(e, null, 2);
      }
}

useEffect(async() =>{await fetch()},[goal, startdt, enddt, total])

useEffect(async() => {
    await first()
}, [day, hour, min, sec, lock]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const first = async () => {
    
      if(!isepochCalculated){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let launchpadContract =  new ethers.Contract(LaunchpadAddress,LaunchpadAbi,provider);

      let endEpoch1 = await launchpadContract.getEndTimestamp();
        // var us= 1710848002;
    var us= endEpoch1;
    console.log("time:",us);
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
// //console.log(countDowndate);
// var countDownDate = new Date().getTime() + (lock * 1000) ;
//alert(time);
    var x = setInterval(function() {
       var now = new Date().getTime();
      var distance = countDowndate - now ;
    //    //console.log("-------------------now", distance);
     //  //console.log(now);
      // Time calculations for days, hours, minutes and seconds
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    //    //console.log("date e", day);
    //    //console.log("hour e", hour);
    //    //console.log("min e", minutes);
    //    //console.log("sec e", seconds);

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

           //  //console.log('CountDown Finished');
        }
        else{
         setlock(true);
        }

    
      
    }, 1000);
       
setisepochCalculated(true);
      }

}

const fetch = async () => {
let index = parseInt(appID_global); //current app id need to be entered
setappid(index);
// await readLocalState(algodClient, localStorage.getItem("walletAddress"), index);
await globalState(index);
}

const reload = () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false); 
};

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

const mapTotal = map1.map((a)=>{
    return(
        <>{a.key === "VG90YWw=" ? parseFloat(parseFloat(a.value['uint'])/1000000).toFixed(2) : ''}</>
    )
})

const mapGoal = map1.map((a)=>{
    return(
        <>{a.key === "R29hbA==" ? parseFloat(a.value['uint'])/1000000 : ''}</>
    )
})

const totalElem = map1.map((a)=>{
    return(
        <>{a.key === "R29hbA==" ? parseFloat(a.value['uint'])/1000000 * 2 : ''}</>
    )
})

const totalSold = map1.map((a)=>{
    return(
        <>{a.key === "VG90YWw=" ? parseFloat(a.value['uint'])/1000000 * 2 : ''}</>
    )
})

const mapStartDate = map1.map((a)=>{
    return(
        <>{a.key === "U3RhcnREYXRl" ? ((new Date(parseFloat(a.value['uint'])*1000)).toLocaleString()).slice(0,10) : ''}</>
    )
})

const mapStartTime = map1.map((a)=>{
    return(
        <>{a.key === "U3RhcnREYXRl" ? ((new Date(parseFloat(a.value['uint'])*1000)).toLocaleString()).slice(11,23) : ''}</>
    )
})

const mapEndDate = map1.map((a)=>{
    return(
        <>{a.key === "RW5kRGF0ZQ==" ? ((new Date(parseFloat(a.value['uint'])*1000)).toLocaleString()).slice(0,10) : ''}</>
    )
})

const mapCreator = map1.map((a)=>{
    return(
        <>{a.key === "Q3JlYXRvcg==" ? a.value['byte'] : ''}</>
    )
})

const mapRecv = map1.map((a)=>{
    return(
        <>{a.key === "UmVjZWl2ZXI=" ? parseFloat(a.value['uint'])/1000000 : ''}</>
    )
})

const mapEscrow = map1.map((a)=>{
    return(
        <>{a.key === "RXNjcm93" ? parseFloat(a.value['uint'])/1000000 : ''}</>
    )
})

const mapCloseDate = map1.map((a)=>{
    return(
        <>{a.key === "RnVuZENsb3NlRGF0ZQ==" ? parseFloat(a.value['uint'])/1000000 : ''}</>
    )
})

let mapPercent = parseFloat((ReactDomServer.renderToString(mapTotal))/parseFloat(ReactDomServer.renderToString(mapGoal))*100).toFixed(4);


useEffect(async() => {
    await optCheck();
}, [assetOpt, appOpt, algoDonated]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
 //console.log(accountInfo);
let assetCount = accountInfo['account']['assets']['length']
//  //console.log(l);
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'][i]['asset-id'] === elementID_global)
    {
        setToAssetOpt(true);
        break;
    }
}

const apps = accountInfo['account']['apps-local-state'];
 console.log("app", apps);
// setAssets(bal['assets']);
let appCount = apps['length'];
//  //console.log(l);
for(let j = 0; j < appCount; j++)
{ 
    if(accountInfo['account']['apps-local-state'][j]['id'] === appID_global)
    {
        setToAppOpt(true);
        break;
    }
}
for(let j = 0; j < appCount; j++)
{ 
    if(accountInfo['account']['apps-local-state'][j]['id'] === appID_global)
    {
        if(accountInfo['account']['apps-local-state'][j]['key-value'] === null)
        {
             //console.log("inside localstate")
        }
        else{
            for(let i = 0; i < 2; i++)
            {
                // if(accountInfo['account']['apps-local-state'][j]['key-value'] === "bXlBbW91bnRHaXZlbg==")
                // { 
                    setAlgoDonated(accountInfo['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);
                    break;
                // }
            }
        }
    }
}
}

useEffect(async() => {
    await countAsset()
}, [algoBalance, elemBalance, algoDonated]);

  const countAsset = async () =>
  {
    let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();             
    //console.log(accountInfo);
        setAlgoBalance(accountInfo['account']['amount']);
        let l = accountInfo['account']['assets']['length'];

        for(let j = 0; j < l; j++)
        {
            if(accountInfo['account']['assets'][j]['asset-id'] === elementID_global)
            {
                setElemBalance(accountInfo['account']['assets'][j]['amount']);
                break;
            }
        }
        
        const apps = accountInfo['account']['apps-local-state'];

        let appCount = apps['length'];

        for(let j = 0; j < appCount; j++)
        { 
            if(accountInfo['account']['apps-local-state'][j]['id'] === appID_global)
            {
                if(accountInfo['account']['apps-local-state'][j]['key-value'] === null)
                {
                     //console.log("inside localstate")
                }
                else{
                    if(accountInfo['account']['apps-local-state'][j]['key-value'] === "bXlBbW91bnRHaXZlbg==")
                    {
                    setAlgoDonated(accountInfo['account']['apps-local-state'][j]['key-value'][0]['value']['uint']);
                    break;
                    }
                }
            }
        }        
}

        useEffect(async() => {
            await minBal();
        }, [minAlgo]);

        const minBal = async () =>
        {
            let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
            // console.log("minBalanceApi", min['min-balance']);
            setMinAlgo(min['amount'] - min['min-balance']);
            console.log("minBalance", minAlgo);
        }

        const appOptinWalletCheck = async () =>
        {
            if(localStorage.getItem("walletName") === "myAlgoWallet")
            {
                await AppOptIn();
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
                await optinAsset();
            }
            else if(localStorage.getItem("walletName") === "PeraWallet")
            {
                await assetOptInPera();
            }
        }
        
        // const donateWalletCheck = async (value) =>
        // {   
        //     if(localStorage.getItem("walletName") === "myAlgoWallet")
        //     {
        //         await Donate(value);
        //     }
        //     else if(localStorage.getItem("walletName") === "PeraWallet")
        //     {
        //         await DonatePera(value);
        //     }
        // }   
        
        // const donateWalletCheck = async(value) =>{
        //     if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        //         toast.warning(`please connect your wallet`,{autoClose: 5000});            
        //         handleHideLoadParticipate()                     
        //       }
             
        //       else{        
        //       handleShowLoadParticipate(); 
        //       const web3 = await connectToEthereum();
        //       if (!web3) return;
      
        //       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //       const account = accounts[0]; // Use the first account
      
        //       console.log("Connected Successfully", account);
      
        //       // Create contract instance with the correct order of arguments
        //       const launchpadContract = new ethers.Contract(launchpadAddress, launchpadAbi, web3.getSigner(account));
      
        //       const val = 10000000000000;
        //       // Send the transaction and wait for it to be mined
        //       const mintTx = await launchpadContract.deposit(val, { value: val });
        //       await mintTx.wait();
        //       toast.success("Particiapted successfully",{autoClose: 5000}); 
        //     //   let id = "https://testnet.algoexplorer.io/tx/" + txId;
        //     //   toast.success(toastDiv(id));
        //       // setMinStart(true)
        //       handleHideLoadParticipate() ;
        //       handleCloseDonate();
        // }   
        // }

        const donateWalletCheck = async(value) =>{
            if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
                toast.warning(`please connect your wallet`,{autoClose: 5000});            
                handleHideLoadParticipate()                     
              }
             
              else{        
              handleShowLoadParticipate(); 
              const web3 = await connectToEthereum();
              if (!web3) return;
      
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              const account = accounts[0]; // Use the first account
      
              console.log("Connected Successfully", account);
      
              // Create contract instance with the correct order of arguments
              const launchpadContract = new ethers.Contract(LaunchpadAddress, LaunchpadAbi, web3.getSigner(account));
      
            //   const val = 10000000000000;
            const val = value * 10 ** 18;
            const valueInWei = ethers.utils.parseEther(value.toString()); // Convert to string before passing it to BigNumber
            console.log("val", valueInWei);

            // Send the transaction and wait for it to be mined
            const depositTx = await launchpadContract.stake({ value: valueInWei });
            await depositTx.wait();
            await walletBalance();
            toast.success("Particiapted successfully",{autoClose: 5000}); 
            //   let id = "https://testnet.algoexplorer.io/tx/" + txId;
            //   toast.success(toastDiv(id));
              // setMinStart(true)
            
              handleHideLoadParticipate() ;
              handleCloseDonate();
        }   
        }

const max = () =>
{
    if(minAlgo === 0)
    {
        setValue(0);
    }
    else
    {
        setValue((parseFloat(minAlgo)/1000000) - 0.004);
    }
}

    return (
        
        <>
        <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>
                   <Modal show={showDonate} centered onHide={handleCloseDonate} className="modal-dashboard shadow-sm p-3 mb-5 bg-black rounded">
                {/* <Modal.Header className="btn-close btn-close-white" closeButton /> */}
                <Modal.Body className='p-0'>
                    <Button className='modal-close' onClick={handleCloseDonate} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                    <div className="pb-2 px-3">
                  
                        <img src={jokercoin} width="80" className="mx-auto mb-1 d-block" alt="icon" />
                        <h5 className="mb-1 text-center">JOKER</h5>
                        <p className="mb-2 pb-1 text-center"></p>

                        <Form className='form-area'>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <center><Form.Label><h5>Sale</h5></Form.Label></center> <br/>
                            <center><Form.Label><p>Spendable ETH Balance:&nbsp;{(parseFloat(ethBalance - 0.00003)).toFixed(2) === 'NaN' ?<>0.00</> :(parseFloat(ethBalance - 0.00003)).toFixed(2)} ETH</p></Form.Label></center> <br/>
                            <center><Form.Label><p>Minimum Stake Amount:&nbsp; {minimumStake} ETH</p></Form.Label></center> <br/>
                            {/* <Form.Control type="text" placeholder="Enter Amount" value={value} onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}/> */}
                            <div className="input-group-max px-3 input-group-max-lg w-100">
                            <InputGroup>
                                <FormControl
                                    // disabled={true}
                                    value={value}
                                    type='number'
                                    placeholder="0.00"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                {/* <Button variant="primary" className='btn-xs-d' onClick={max}>Max</Button> */}
                            </InputGroup>
                            </div>
                        </Form.Group>
                            <ButtonLoad loading={loaderParticipate} style ={{backgroundColor : 'Black'}}size="lg" className='w-100' onClick={()=>donateWalletCheck(value)}>
                                Participate
                            </ButtonLoad>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            <Card className='card-dash border-0 d-block'>
                <div className="mb-3">
                    <img src={stasisTetrahedron} className="w-100 img-fluid rounded-16" alt="post img" />
                </div>

                <div className="post-card-title mb-2 w-100 d-flex align-items-center">
                    <img src={jokercoin} width="50" height="50" alt="icon" />
                    <div>
                        <h6 className='m-0'>Launchpad</h6>
                        <span className='d-block'>JOKER</span>
                    </div>
                </div>

                <div className="post-card-body mb-3">
                    <div className="d-flex align-items-start justify-content-between">
                        <span>Total Sale</span>
                        <div className="h6 text-end">1000000 JOKER</div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between">
                        <span>Starts On <br/> Ends On </span>
                        {/* <div className="h6 text-end">{mapStartDate} <small className='d-block'>≈</small></div> */}
                        <strong className="text-end">{startEpoch ? ((new Date(parseFloat(startEpoch)*1000)).toLocaleString()) : 'NaN' } <br/> {endEpoch ?((new Date(parseFloat(endEpoch)*1000)).toLocaleString()) : 'NaN'}</strong>
                    </div>
                </div>

                <div className="post-card-footer">
                    <div>
                    <Button className='w-100' style={{backgroundColor : 'Black'}} onClick={handleShow}>Participate</Button><br/><br/>
                    {/* <Button className='w-100' onClick={optinWhiteAsset}>White Asset Optin</Button> */}
                    {/* <Button variant="blue" onClick={indexerCheck}>check</Button><br/><br/> */}

                    {/* {localStorage.getItem("walletAddress") === creator ? (<><Button variant="blue" onClick={handleAddress}>ADD ADDRESS</Button><br/><br/></>):(<></>)} */}
                        
                    
                    </div>
                    {/* <div className="h6 text-end"> <Link to="/"><h6>Project Website</h6></Link> </div> */}
                    {/* <div className="h6 text-end text-uppercase">Official Announcement</div> */}
                </div>
            </Card>
            
            <Modal
                show={show}
                size={'lg'}
                centered={true}
                onHide={handleClose}
                className="modal-dashboard"
                keyboard={false}
            >
                {/* <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></> */}
                <Modal.Header className='align-items-start' closeButton>
                    <div className="d-flex flex-wrap align-items-start justify-content-between">
                        <div className="d-flex align-items-center flex-wrap modal-head">
                        <img src={jokercoin} width="60" height="60" alt="icon" /> <div className="h6 mb-14" style={{ fontSize: '40px' }}>JOKER</div>

                            {/* {appOpt === false ? <><ButtonLoad loading={loaderAppOpt} variant="primary" className='py-1' onClick={()=>appOptinWalletCheck()} style={{textTransform:"capitalize"}}>App Opt-in</ButtonLoad><p style={{color:"red"}}>(Please Opt-In App to Participate)</p></> : <></>} */}
                    
                            {/* <span>(Opt-in only one time)</span> */}
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    {/* <Button className='modal-close' onClick={handleClose} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button> */}
                    
                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                        <strong className="p">Minimum Stake Amount</strong>
                            <div className="h6 mb-10">{minimumStake ? minimumStake : "NaN"} ETH</div>
                        </div>
                        <div className='d-flex ms-auto pt-2 flex-column align-items-end'>
                            <strong className="p">Your Balance</strong>
                            <div className="h6 mb-10">{(parseFloat(ethBalance)).toFixed(2) === 'NaN' ?<>0.00</> :(parseFloat(ethBalance)).toFixed(2)}&nbsp; ETH</div>
                            <div className="h6 mb-10">{(parseFloat(Saibalance)).toFixed(2) === 'NaN' ?<>0.00</> :(parseFloat(Saibalance)).toFixed(2)}&nbsp; JOKER</div>
                        </div>
                        </div>

                    <div className="d-flex mb-10 flex-wrap align-items-start justify-content-between">
                        <div>
                            {/* <strong>Round</strong> */}
                            {parseFloat((ReactDomServer.renderToString(mapTotal))) != parseFloat((ReactDomServer.renderToString(mapGoal))) ? <div className="p mb-0 text-uppercase" style={{color:"green"}}>Sale in Progress</div> : <div className="p mb-0 text-uppercase" style={{color:"red"}}>Sale Ended</div>}
                        </div>
                        <div className='text-md-end'>
                            <strong>Time Left</strong>
                            <div className="h6 mb-0">{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>{0}d:{0}h:{0}m:{0}s</>)}</div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="d-flex justify-content-between">
                            <strong>Start</strong>
                            <strong>End</strong>
                        </div>
                        <ProgressBar className='no-shadow' now={MyDeposit? (MyDeposit/TotalDeposit)*100 : 0} />
                        <div className="d-flex justify-content-between">
                            <strong>{(MyDeposit && TotalDeposit)? parseFloat((MyDeposit/TotalDeposit)*100).toFixed(4):0}%</strong>
                            <strong>{ MyDeposit ? parseFloat(MyDeposit).toFixed(4) : 0}  / {TotalDeposit }  ETH</strong>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                            <strong className="p">Your Contribution</strong>
                            <div className="h6 mb-10">{MyDeposit ? MyDeposit : '0'} ETH</div>
                            {/* <div className="h6 mb-10">{(parseFloat(algoDonated) * 2/1000000).toFixed(2) === 'NaN' ? <>0.000</> : (parseFloat(algoDonated) * 2/1000000).toFixed(2)} ELEM Purchased</div> */}
                        </div>
                    <div className="mb-10 d-flex flex-column align-items-end">
                        {/* {assetOpt === false ? <><ButtonLoad loading={loaderAssetOpt} variant="primary" className='mb-10 py-1' onClick={()=>assetOptinWalletCheck() } style={{textTransform:"capitalize"}}>Asset Opt-in</ButtonLoad><p className='mb-10' style={{color:"red"}}>(Please Opt-In Asset to Participate)</p><br/></> : <></>} */}
                        {/* {appOpt === false || assetOpt === false ? 
                        <ButtonLoad disabled loading={loaderParticipate} variant="primary" className='mb-10 py-1' onClick={()=>handleShowDonate()} style={{textTransform:"capitalize"}}>Participate</ButtonLoad> : <> */}
                        <ButtonLoad loading={loaderParticipate} variant="primary" className='mb-10 py-1' onClick={()=>handleShowDonate()} style={{textTransform:"capitalize",backgroundColor : 'Black'}}>Participate</ButtonLoad>
                        {/* </>} */}
                    </div>
                    </div>

                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                            <strong className="mb-0">Total Allocation</strong>
                            <div className="h6 mb-0">{1000000} JOKER</div>
                            {/* <strong>ELEM</strong> */}
                        </div>
                        {/* <div className='d-flex flex-column align-items-end'>
                            <strong>Total Sold</strong>
                            <div className="h6 mb-0">{TotalCount? parseFloat(1000000 - TotalCount) : 0} SAI</div> */}
                            {/* <strong>ALGO</strong> */}
                        {/* </div> */}
                    </div>
                </Modal.Body>
            </Modal>

            {/* <Modal
                show={address}
                size={'lg'}
                centered={true}
                onHide={handleCloseAddress}
                keyboard={false}
            >
                <Modal.Body className='p-md-5'>
                    <Button className='modal-close' onClick={handleCloseAddress} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                    {/* <Form className='form-area'>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" value={addrAddAddress} onChange={(e) => setValueAddrAddAddress(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Asset ID:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Asset" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Amount" value={valueAddAddress} onChange={(e) => setValueAddAddress(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}/>
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="grad" onClick={() => addAddress(addrAddAddress, whiteID_global, valueAddAddress, appID_global)}>
                                Add Address
                            </Button>
                        </div>
                    </Form>
                    <p className='mt-md-5 mt-4 text-gray'>(Adding Address Function will be visible only to the App creator - Normal users can't access this function)</p>
                </Modal.Body>
            </Modal> */}
        </>
    );
};

export default PostCard;