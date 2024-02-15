import React, { useState,useEffect } from 'react';
import Layout from "./LayoutT";
import {
    Link
  } from "react-router-dom";
import { Button, Col, Container, Modal, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
// import PoolParent from './snippets/PoolParent';
import PoolChild from './snippets/PoolChild';
import PoolChild1 from './snippets/PoolChild1';
import PoolChild11 from './snippets/PoolChild11';
import ButtonLoad from 'react-bootstrap-button-loader';
import axios from 'axios';
import algologo from '../../assets/images/Algo.png';
// import elemlogo from '../../assets/images/elem-original.png';
import elemlogo from '../../assets/images/elem-original-old.png';


import jokercoin from '../../assets/images/Jokercoin.png';
import stasiscoin  from '../../assets/images/stasiscoin.png';
import creditscoin from '../../assets/images/creditscoin.png';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';
import algosdk, { Algod ,encodeUint64} from "algosdk";
import node from './nodeapi.json';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { FormControl, InputGroup } from "react-bootstrap";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { PtpstakingAppAdress,PtpstakingAppId,swapAppAdress,swapAppId,PTP,VEPTP,lpstakingAppAdress,lpstakingAppId,UsdcAppId,UsdtAppId,TauAppId,USDC,USDT,USDCE,USDTE, usdcStakingappid, usdtStakingappid, TauStakingappid, usdcStakingappaddress, usdtStakingappaddress, TauStakingappaddress } from './singlesidedAmmconfig';
import { greaterAsset,AppDetails,globalstate,getD,getY ,getvaluesfromnode} from '../StableswapConfig';
import { walletBalance,checkotp } from '../formula';
import { createtpairhistory } from '../apicallfunction';

const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');
const bridge = "https://bridge.walletconnect.org";


function PoolNew() {
    let usdtpriceoracle =70116137
    let usdcpriceoracle =70116074
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [trade, setTrade] = useState(false);
    const handleToggle = () => setShow(!show);
    const handleToggle1 = () => setShow1(!show1);
    const handleTrade = () => setTrade(!trade);
    const [BondAmount, setBondAmount] = useState();
    const[appOpted,setOpted] = useState(false);

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[usdcprice,setusdcprice] = useState("")
    const[BoostingApr, setBoostingApr] = useState("");
    const[loader, setLoader] = useState(false);
    const handleShowLoad1 = () => setLoader1(true);
    const handleHideLoad1 = () => setLoader1(false);
    const[loader1, setLoader1] = useState(false);
    const[functname, setfunctname] = useState("");
    const[stakedAmount, setstakedAmount] = useState("");
    const[stakedtime, settstakedtime] = useState("");
    const[totalPTP, settotalPTP] = useState("");
    const[ptpbalance, setptpbalance] = useState("");
    const[ptpptpoptin, setptpptpoptin] = useState(false);
    const[veptpptpbalance, setveptpptpbalance] = useState("");
    const[veptpptpoptin, setveptpptpoptin] = useState(true);
    const[claimamount, setclaimamount] = useState("");
    const[usdcstakedAmount, setusdcstakedAmount] = useState("");
    const[taustakedAmount, settaustakedAmount] = useState("");

    const[usdtstakedAmount, setusdtstakedAmount] = useState("");
    const[Circulatingsupply,setcirculatingsupply] = useState("");
    const[Theme,setTheme] = useState("");

    useEffect(() => {first()},[claimamount])
    const first = async()=>{
        let staketime,stakeamount;

        
        try{
            let bal = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${PtpstakingAppId}`);
            console.log("Balance",bal.data['apps-local-states'][0]['key-value']);
            bal.data['apps-local-states'][0]['key-value'].map((r)=>{
                if(r['key'] == "U3Rha2VkQW1vdW50" ){
                    stakeamount = r.value.uint;
                    setstakedAmount(r.value.uint)
                }
                if(r['key'] == "U3Rha2VkVGltZQ=="){
                    settstakedtime(r.value.uint)
                    staketime = r.value.uint;
                }
            })
        }catch(err){
            setstakedAmount(0)
        }
        
        let veptpb,ptpb ;
        let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${PtpstakingAppAdress}/assets`);
        // console.log("Balance",ln.data);
        ln.data['assets'].map((r)=>{
            if(r['asset-id'] == PTP){
                ptpb = r.amount;
                settotalPTP(r.amount)
            }
            if(r['asset-id'] == VEPTP){
                veptpb = r.amount;
                // setveptpptpbalance(r.amount)
            }
        })
        let [p,popt] = await walletBalance(PTP);
        setptpbalance(p);
        setptpptpoptin(popt)
        let [vebal,vopt] = await walletBalance(VEPTP);
        setveptpptpbalance(vebal);
        setveptpptpoptin(vopt);
        console.log("opted",vopt)

        //claim calculations
        let secondsElapsed = (Date.now()/1000) - staketime;
        let pending =parseInt(((stakeamount * (secondsElapsed * 388888))+(1000000/2))/1000000);
        let maxVePtpCap = stakeamount * 100;
        let amountToCap,toAmount;
       
        if(vebal < maxVePtpCap){
            amountToCap = maxVePtpCap - vebal;
            if(pending >= amountToCap){
                toAmount = amountToCap
            }
            else{
                toAmount = pending;
            }
            console.log("secondsElapsed",secondsElapsed,pending,amountToCap)
        }
        else{
            toAmount = 0;
        }
        console.log(toAmount,veptpptpbalance,maxVePtpCap)
        setclaimamount(toAmount)
        setOpted(await checkotp(PtpstakingAppId));
        
        let usdcstakeamount,usdtstakeamount,taustakeamount;
        try{
            let bal = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${usdcStakingappid}`);
            console.log("Balance",bal.data['apps-local-states'][0]['key-value']);
           
            bal.data['apps-local-states'][0]['key-value'].map((r)=>{
                if(r['key'] == "VXNkY0xQU3Rha2VkQW1vdW50" ){
                    usdcstakeamount = (r.value.uint)
                    setusdcstakedAmount(usdcstakeamount)
                }
            })
            let bal1 = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${usdtStakingappid}`);

            bal1.data['apps-local-states'][0]['key-value'].map((r)=>{
                if(r['key'] == "VXNkdExQU3Rha2VkQW1vdW50" ){
                    usdtstakeamount = (r.value.uint)
                    setusdtstakedAmount(usdtstakeamount)
                }
            })
            let bal2 = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${TauStakingappid}`);

            bal1.data['apps-local-states'][0]['key-value'].map((r)=>{
                if(r['key'] == "VGF1TFBTdGFrZWRBbW91bnQ=" ){
                    taustakeamount = (r.value.uint)
                    settaustakedAmount(taustakeamount)
                }
            })
            // bal.data['apps-local-states'][0]['key-value'].map((r)=>{
            //     if(r['key'] == "VXNkY1N0YWtlZEFtb3VudA==" ){
            //         usdcstakeamount = (r.value.uint)
            //         setusdcstakedAmount(usdcstakeamount)
            //     }
            //     if(r['key'] == "VXNkdFN0YWtlZEFtb3VudA==" ){
            //         usdtstakeamount = (r.value.uint)
            //         setusdtstakedAmount(usdtstakeamount)
            //     }
                
                
            // })
        }catch(err){
            usdcstakeamount = 0;
            setusdcstakedAmount(usdcstakeamount)
            usdtstakeamount = 0;
            setusdtstakedAmount(usdtstakeamount)
            taustakeamount = 0;
            settaustakedAmount(taustakeamount)
        }

        let bal = await globalstate(algodClient,usdcpriceoracle);
        console.log("getprice",bal.price);
        setusdcprice(bal.price)

        let weightofdeposit = (1000000000000 - veptpb);
        setcirculatingsupply(veptpb)
        let boostingapr = 150000000000000 * ((ptpb)/(weightofdeposit * ptpb))
        console.log("boostingapr",boostingapr)
        setBoostingApr(boostingapr)

        let lpptpb,l1,l2,l3;
        let ln1 = await axios.get(`${node['indexerclient']}/v2/accounts/${usdcStakingappaddress}/assets`);
        ln1.data['assets'].map((r)=>{
            if(r['asset-id'] == PTP){
                l1 = r.amount;
                // settotalusdce(r.amount)
            }
           
        })
        let ln2 = await axios.get(`${node['indexerclient']}/v2/accounts/${usdtStakingappaddress}/assets`);
        ln2.data['assets'].map((r)=>{
            if(r['asset-id'] == PTP){
                l2 = r.amount;
                // settotalusdce(r.amount)
            }
           
        })
        let ln3 = await axios.get(`${node['indexerclient']}/v2/accounts/${TauStakingappaddress}/assets`);
        ln3.data['assets'].map((r)=>{
            if(r['asset-id'] == PTP){
                l3 = r.amount;
                // settotalusdce(r.amount)
            }
           
        })
        lpptpb = l1+l2+l3;

        let circulatingsupply =(4000000 * 1000000)-(lpptpb + ptpb)
        // setcirculatingsupply(circulatingsupply);
        console.log("circulatingsupply",circulatingsupply,lpptpb)


    }
   
    const resetstate = async()=>{
        setBondAmount("");

    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
   } 
      const waitForConfirmation = async function (algodclient, txId,type) {
          let status = await algodclient.status().do();
          let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient
              .pendingTransactionInformation(txId)
              .do();
            if (
              pendingInfo["confirmed-round"] !== null &&
              pendingInfo["confirmed-round"] > 0
            ) {
              let id = "https://testnet.algoexplorer.io/tx/" + txId;
              
              toast.success(toastDiv(id,type));
              await first()
              handleHideLoad();
              first()
              resetstate()
              
              
              
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
        };
        const waitForConfirmationForoptin = async function (algodclient, txId,type) {
            let status = await algodclient.status().do();
            let lastRound = status["last-round"];
            while (true) {
              const pendingInfo = await algodclient
                .pendingTransactionInformation(txId)
                .do();
              if (
                pendingInfo["confirmed-round"] !== null &&
                pendingInfo["confirmed-round"] > 0
              ) {
                let id = "https://testnet.algoexplorer.io/tx/" + txId;
                
                toast.success(toastDiv(id,type));
                // await first()
                setveptpptpoptin(false)
                handleHideLoad();
                // first()
                // resetstate()
                
                
                
                break;
              }
              lastRound++;
              await algodclient.statusAfterBlock(lastRound).do();
            }
          };
        
          const toastDiv = (txId,type) =>
          (
              <div>
                 <p> {type} &nbsp;<a style={{color:'#919cff'}} href={txId} target="_blank" rel="noreferrer">View in algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="blue"/>
          </svg></a></p> 
              </div>
          );

        const zeroinputcheck = async(amount) =>{
            if(amount == "" || amount == 0 || amount == undefined || amount == null){
              toast.error(`Zero input not allowed`)
              handleHideLoad()
              return 1;
              
            }
            else{
             return 0;
           }
          }
          const abovebalance = async(amount,balance) =>{
           if(amount > balance){
             toast.error(`Entered Amount is greater than your balance`)
             handleHideLoad()
             return 1;
             
           }
           else{
             return 0;
           }
         }

        const stake = async()=>{
            try{
              let rt = await zeroinputcheck(BondAmount)
              if(rt==1){
                return;
              }
              rt = await abovebalance(BondAmount*1000000,ptpbalance)
              if(rt==1){
                return;
              }
              const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
              const params = await algodClient.getTransactionParams().do();
              let senderd =localStorage.getItem("walletAddress");
              let appIDa = PtpstakingAppId;
              // let assetIda = 104654999;
              let receiverD = PtpstakingAppAdress;
              let appArgsD = [];
        
              appArgsD.push(new Uint8Array (Buffer.from("Stake")));
              appArgsD.push(algosdk.encodeUint64(parseInt(3)));
              let amtc = BondAmount *1000000;
              let assArgs = [];
              assArgs.push(parseInt(swapAppId));
        
              assArgs.push(parseInt(lpstakingAppId));
              
              let assArgs1 = [];
              if(usdcstakedAmount>0 && usdtstakedAmount > 0){
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
              else if(usdcstakedAmount>0){
                assArgs1.push(parseInt(USDCE));
                assArgs1.push(parseInt(USDTE));
                
              }
              else if(usdtstakedAmount>0){
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
              else{
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
             
        
              assArgs1.push(parseInt(VEPTP));
              
        
              const txna = algosdk.makeApplicationNoOpTxnFromObject({
                suggestedParams: {
                    ...params,
                },
                from: senderd,
                appIndex:appIDa,
                appArgs: appArgsD,
                foreignApps:assArgs,
                foreignAssets:assArgs1,
                accounts:[senderd]
                
            });
              
              const txna1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  suggestedParams: {
                      ...params,
                  },
                  from: senderd,
                  to: receiverD,
                  amount : amtc,
                  assetIndex: parseInt(PTP)
              });
              const transArrayD = [ txna, txna1 ];
        const groupID = algosdk.computeGroupID(transArrayD)
        for (let i = 0; i < 2; i++) 
        transArrayD[i].group = groupID;
        if(localStorage.getItem("walletName") === "myAlgoWallet"){

        const signedTxnsdo = await myAlgoWallet.signTransaction([transArrayD[0].toByte(),transArrayD[1].toByte()]);
        const responsedo = await algodClient.sendRawTransaction([signedTxnsdo[0].blob,signedTxnsdo[1].blob]).do();
        console.log(responsedo.txId);
        await waitForConfirmation(algodClient, responsedo.txId,"ELEM is Staked Successfully");
        await createtpairhistory(responsedo.txId,"ELEM Stake",amtc/1000000,PtpstakingAppId);

        }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [transArrayD[0], transArrayD[1]]
            const txnsToSign = txns.map(txn => {
              const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
             //console.log(encodedTxn);
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
            await waitForConfirmation(algodClient, response.txId,"ELEM is Staked Successfully");
            // await updatealgobalance()
            await createtpairhistory(response.txId,"ELEM Stake",amtc/1000000,PtpstakingAppId);
      
      
         // localStorage.setItem("Staked","stakedbalance");
         
  
  
          }
        handleToggle1();
        } 
              
            catch (err) {
                console.error(err);
                toast.error(`${err}`)
                handleHideLoad()
                } 
           }

           const Unstake = async()=>{
            try{
                let rt = await zeroinputcheck(BondAmount)
                if(rt==1){
                    return;
                  }
                  rt = await abovebalance(BondAmount*1000000,stakedAmount)
                  if(rt==1){
                    return;
                  }
              const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
              const params = await algodClient.getTransactionParams().do();
              let senderd =localStorage.getItem("walletAddress");
              let appIDa = PtpstakingAppId;
              // let assetIda = 104654999;
              let receiverD = PtpstakingAppAdress;
              let appArgsD = [];
              let amtc = BondAmount * 1000000;
              appArgsD.push(new Uint8Array (Buffer.from("Unstake")));
              appArgsD.push(algosdk.encodeUint64(parseInt(amtc)));
              

              if(usdcstakedAmount>0 && usdtstakedAmount > 0){
                appArgsD.push(algosdk.encodeUint64(parseInt(3)));
              }
              else if(usdcstakedAmount>0){
                appArgsD.push(algosdk.encodeUint64(parseInt(2)));
              }
              else if(usdtstakedAmount>0){
                appArgsD.push(algosdk.encodeUint64(parseInt(1)));
              }
              else{
                appArgsD.push(algosdk.encodeUint64(parseInt(3)));
              }
            //   appArgsD.push(algosdk.encodeUint64(parseInt(3)));
             
              let assArgs = [];
              assArgs.push(parseInt(swapAppId));
        
              assArgs.push(parseInt(lpstakingAppId));
              let assArgs1 = [];
              if(usdcstakedAmount>0 && usdtstakedAmount > 0){
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
              else if(usdcstakedAmount>0){
                assArgs1.push(parseInt(USDCE));
                assArgs1.push(parseInt(USDTE));
                
              }
              else if(usdtstakedAmount>0){
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
              else{
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
            //   assArgs1.push(parseInt(USDTE));
            //   assArgs1.push(parseInt(USDCE));
              assArgs1.push(parseInt(VEPTP));
              assArgs1.push(parseInt(PTP));
             
              const txna = algosdk.makeApplicationNoOpTxnFromObject({
                suggestedParams: {
                    ...params,
                },
                from: senderd,
                appIndex:appIDa,
                appArgs: appArgsD,
                foreignApps:assArgs,
                foreignAssets:assArgs1
                
            });
              console.log("veptpptpbalance",veptpptpbalance)
              const txna1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  suggestedParams: {
                      ...params,
                  },
                  from: senderd,
                  to: receiverD,
                  amount : parseInt(veptpptpbalance ? veptpptpbalance:0),
                  assetIndex: parseInt(VEPTP)
              });
              const transArrayD = [ txna, txna1 ];
        const groupID = algosdk.computeGroupID(transArrayD)
        for (let i = 0; i < 2; i++) 
        transArrayD[i].group = groupID;
        if(localStorage.getItem("walletName") === "myAlgoWallet"){

        const signedTxnsdo = await myAlgoWallet.signTransaction([transArrayD[0].toByte(),transArrayD[1].toByte()]);
        const responsedo = await algodClient.sendRawTransaction([signedTxnsdo[0].blob,signedTxnsdo[1].blob]).do();
        await waitForConfirmation(algodClient, responsedo.txId," Unstaked successfully");
        await createtpairhistory(responsedo.txId,"ELEM UnStake",amtc/1000000,PtpstakingAppId);

        }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [transArrayD[0], transArrayD[1]]
            const txnsToSign = txns.map(txn => {
              const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
             //console.log(encodedTxn);
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
            await waitForConfirmation(algodClient, response.txId,"Unstaked successfully");
        await createtpairhistory(response.txId,"ELEM UnStake",amtc/1000000,PtpstakingAppId);

            // await updatealgobalance()
      
      
         // localStorage.setItem("Staked","stakedbalance");
         
  
  
          }
        handleToggle1();
        // console.log(responsedo.txId);
        } 
              
            catch (err) {
                console.error(err);
               toast.error(`${err}`)
                handleHideLoad()
                } 
           }
           const veptpclaim = async()=>{
               handleShowLoad()
            try{
              const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
              const params = await algodClient.getTransactionParams().do();
              let senderd =localStorage.getItem("walletAddress");
              let appIDa = PtpstakingAppId;
              // let assetIda = 104654999;
              let receiverD = PtpstakingAppAdress;
              let appArgsD = [];
              appArgsD.push(new Uint8Array (Buffer.from("Claim")));
              
              if(usdcstakedAmount>0 && usdtstakedAmount > 0){
                appArgsD.push(algosdk.encodeUint64(parseInt(3)));
              }
              else if(usdcstakedAmount>0){
                appArgsD.push(algosdk.encodeUint64(parseInt(2)));
              }
              else if(usdtstakedAmount>0){
                appArgsD.push(algosdk.encodeUint64(parseInt(1)));
              }
              else{
                appArgsD.push(algosdk.encodeUint64(parseInt(3)));
              }
              
              let assArgs = [];
              assArgs.push(parseInt(swapAppId));
        
              assArgs.push(parseInt(lpstakingAppId));
              
              let assArgs1 = [];
              
              if(usdcstakedAmount>0 && usdtstakedAmount > 0){
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
              else if(usdcstakedAmount>0){
                assArgs1.push(parseInt(USDCE));
                assArgs1.push(parseInt(USDTE));
                
              }
              else if(usdtstakedAmount>0){
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
              else{
                assArgs1.push(parseInt(USDTE));
                assArgs1.push(parseInt(USDCE));
              }
        
              assArgs1.push(parseInt(VEPTP));
              assArgs1.push(parseInt(PTP));
              const txna = algosdk.makeApplicationNoOpTxnFromObject({
                suggestedParams: {
                    ...params,
                },
                from: senderd,
                appIndex:appIDa,
                appArgs: appArgsD,
                foreignApps:assArgs,
                foreignAssets:assArgs1,
                accounts:[senderd]
                
            });
              
        //       const txna1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        //           suggestedParams: {
        //               ...params,
        //           },
        //           from: senderd,
        //           to: receiverD,
        //           amount : amtc,
        //           assetIndex: parseInt(usdtlp)
        //       });
              const transArrayD = [ txna ];
        const groupID = algosdk.computeGroupID(transArrayD)
        for (let i = 0; i < 1; i++) 
        transArrayD[i].group = groupID;
        if(localStorage.getItem("walletName") === "myAlgoWallet"){

        const signedTxnsdo = await myAlgoWallet.signTransaction(transArrayD[0].toByte());
        const responsedo = await algodClient.sendRawTransaction(signedTxnsdo.blob).do();
        await waitForConfirmation(algodClient, responsedo.txId,"Claimed successfully");
        await createtpairhistory(responsedo.txId,"Claim",claimamount/1000000,PtpstakingAppId);

        console.log(responsedo.txId);
        }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [transArrayD[0]]
            const txnsToSign = txns.map(txn => {
              const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
             //console.log(encodedTxn);
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
            await waitForConfirmation(algodClient, response.txId,"Claimed successfully");
        await createtpairhistory(response.txId,"Claim",claimamount/1000000,PtpstakingAppId);

            // await updatealgobalance()
      
      
         // localStorage.setItem("Staked","stakedbalance");
         
  
  
          }
        } 
              
            catch (err) {
                console.error(err);
               toast.error(`${err}`)
                handleHideLoad()
                } 
           }

           const clickevent = async(givename) =>{
            setfunctname(givename);
            handleToggle1();
           }
           const depositOrwithdraw = async()=>{
               handleShowLoad();
               functname == "Deposit" ? await stake():await Unstake();
           }
           const appOptIn = async () =>
    {
      handleShowLoad()
   //console.log("minb",mintotranser ,balanceid1)
    // if(balanceid1 >= mintotranser + 557000){
    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');



    let index = parseInt(PtpstakingAppId);
    ////console.log("appId inside donate", index)
//     try {

//     const params = await algodClient.getTransactionParams().do();

//     let optinTranscation = algosdk.makeApplicationOptInTxnFromObject({
//     from:localStorage.getItem("walletAddress"),
//     suggestedParams:params,
//     appIndex:index
//     });

//     let transid=await dualwalletconnect(optinTranscation);
//     await waitForConfirmationForoptin(algodClient, transid,"App Opt-In is completed successfully");
//     // await updatealgobalance()
//     // const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());

//     // //toast.info("Transaction in Progress");
//     // const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
//     // ////console.log("TxID", JSON.stringify(response, null, 1));
//     // await waitForConfirmation(algodClient, response.txId,"App Opt-In");
    

//     // await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In App",0,0,"","",0);

//     // await postusertx("-",response.txId,"App Opt-In","-","-")

//     setOpted(true)
//     }catch (err) {
//       handleHideLoad()
//    //console.log("err",err.toString())
//     let ev = err.toString()
//     let present = ev.indexOf("balance")   
//     let present4 = ev.indexOf("already")
//     let present5 = ev.indexOf("blocked")
//     //console.log("err",ev)
//     if(present > 1){
//     toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
//     }
//     else if(present4 > 1){
//     toast.error(`Already opted the App `);
//     }
//     else if(present5 > 1){
//     toast.error(`Allow the pop up window and try again`);
//     }
//     else{
//      toast.error(`${err}`);
//     }
   



//     //console.error(err);
//     // }
//     }
//     else{
// handleHideLoad()
//     toast.error("You are not having enough Algo to do Transaction");
//     }
try {

    const params = await algodClient.getTransactionParams().do();

    let txna = algosdk.makeApplicationOptInTxnFromObject({
    from:localStorage.getItem("walletAddress"),
    suggestedParams:params,
    appIndex:UsdcAppId
    });
    let txna1 = algosdk.makeApplicationOptInTxnFromObject({
      from:localStorage.getItem("walletAddress"),
      suggestedParams:params,
      appIndex:UsdtAppId
      });
    let txna2 = algosdk.makeApplicationOptInTxnFromObject({
      from:localStorage.getItem("walletAddress"),
      suggestedParams:params,
      appIndex:TauAppId
      });
      let txna3 = algosdk.makeApplicationOptInTxnFromObject({
      from:localStorage.getItem("walletAddress"),
      suggestedParams:params,
      appIndex:usdcStakingappid
      });
      let txna4 = algosdk.makeApplicationOptInTxnFromObject({
      from:localStorage.getItem("walletAddress"),
      suggestedParams:params,
      appIndex:usdtStakingappid
      });
      let txna5 = algosdk.makeApplicationOptInTxnFromObject({
      from:localStorage.getItem("walletAddress"),
      suggestedParams:params,
      appIndex:TauStakingappid
      });
      let txna6 = algosdk.makeApplicationOptInTxnFromObject({
      from:localStorage.getItem("walletAddress"),
      suggestedParams:params,
      appIndex:PtpstakingAppId
      });
    const transArrayD = [ txna, txna1,txna2,txna3,txna4,txna5,txna6 ];
        const groupID = algosdk.computeGroupID(transArrayD)
        for (let i = 0; i < 7; i++) 
        transArrayD[i].group = groupID;
        if(localStorage.getItem("walletName") === "myAlgoWallet"){

        const signedTxnsdo = await myAlgoWallet.signTransaction([transArrayD[0].toByte(),transArrayD[1].toByte(),transArrayD[2].toByte(),transArrayD[3].toByte(),transArrayD[4].toByte(),transArrayD[5].toByte(),transArrayD[6].toByte()]);
        const responsedo = await algodClient.sendRawTransaction([signedTxnsdo[0].blob,signedTxnsdo[1].blob,signedTxnsdo[2].blob,signedTxnsdo[3].blob,signedTxnsdo[4].blob,signedTxnsdo[5].blob,signedTxnsdo[6].blob]).do();
        console.log(responsedo.txId);

    // let transid=await dualwalletconnect(optinTranscation);
    await waitForConfirmationForoptin(algodClient, responsedo.txId,"App Opt-In is completed successfully");
    await createtpairhistory(responsedo.txId,"App Opt-In",0,0);

    
        }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
          const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
          const txns = [transArrayD[0], transArrayD[1],transArrayD[2]]
          const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
           //console.log(encodedTxn);
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
          await waitForConfirmationForoptin(algodClient, response.txId,"App Opt-In is completed successfully");
          await createtpairhistory(response.txId,"App Opt-In",0,0);
    
    
       // localStorage.setItem("Staked","stakedbalance");
       


        }
    // const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());

    // //toast.info("Transaction in Progress");
    // const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
    // ////console.log("TxID", JSON.stringify(response, null, 1));
    // await waitForConfirmation(algodClient, response.txId,"App Opt-In");
    

    // await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In App",0,0,"","",0);

    // await postusertx("-",response.txId,"App Opt-In","-","-")

    setOpted(true)
    }catch (err) {
      handleHideLoad()
   //console.log("err",err.toString())
    let ev = err.toString()
    let present = ev.indexOf("balance")   
    let present4 = ev.indexOf("already")
    let present5 = ev.indexOf("blocked")
    //console.log("err",ev)
    if(present > 1){
    toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
    }
    else if(present4 > 1){
    toast.error(`Already opted the App `);
    }
    else if(present5 > 1){
    toast.error(`Allow the pop up window and try again`);
    }
    else{
      toast.error(`${err}`)
    }
   



    //console.error(err);
    }

            }

           const callingMax = async() =>{
               let balan ;
            functname == "Deposit" ? balan = ptpbalance :balan = stakedAmount;
            setBondAmount(balan/1000000)
           }
           const assetoptin = async() => {
               handleShowLoad1()
               try{
                const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
                const params = await algodClient.getTransactionParams().do();
                let sender =localStorage.getItem("walletAddress");
             
              const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  suggestedParams: {
                      ...params,
                  },
                  from: sender,
                  to:sender,
                  assetIndex: VEPTP,
                  amount : 0,
              });
              //let appArgs = [];
              //appArgs.push(new Uint8Array (Buffer.from("assetoptin")));
             
               
            //   const myAlgoConnect = new MyAlgoConnect();
            if(localStorage.getItem("walletName") === "myAlgoWallet"){

                const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
                const response = await algodClient.sendRawTransaction([signedTxn.blob]).do();
                await waitForConfirmationForoptin(algodClient, response.txId,"Asset Opt-In is completed successfully");
                    }
                    else if(localStorage.getItem("walletName") === "PeraWallet"){
                      const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                      const txns = [txn]
                      const txnsToSign = txns.map(txn => {
                        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                       //console.log(encodedTxn);
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
                      await waitForConfirmationForoptin(algodClient, response.txId,"Asset Opt-In is completed successfully");
                      // await updatealgobalance()
                
                
                   // localStorage.setItem("Staked","stakedbalance");
                   
            
            
                    }
            //   console.log("TxId =", response.txId);
              handleHideLoad1()
               }catch (err) {
                console.error(err);
               toast.error(`${err}`)
                handleHideLoad1()
                } 
            
            }
            useEffect(() => {
              const storedTheme = localStorage.getItem('Theme') || 'dark';
              setTheme(storedTheme);
            }, []);


    return ( 
        <Layout>
               <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                {/* .accordion-body */}
                <Modal show={show1} className="modal-dashboard" centered onHide={handleToggle1}>
                <Modal.Header className="mb-0" closeButton />
                <Modal.Body className="pt-0">
                    <Modal.Title className="text-center mb-4">Confirm {functname} <img src={stasiscoin} alt='image' width={23} height={23} className="mx-1" /> ELEM</Modal.Title>
                    
                    <div className="d-flex text-muted align-items-center justify-content-between flex-wrap">
                        {/* <p className="mb-3">Deposited: 
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    {parseFloat(stakedAmount/1000000).toFixed(3)} ELEM
                                </Tooltip>
                            }
                            >
                                <div className="d-inline-block ms-1"> {parseFloat(stakedAmount/1000000).toFixed(3)} ELEM</div>
                            </OverlayTrigger>
                        </p> */}
                        <p className="mb-3">My wallet balance: 
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    User Balance
                                </Tooltip>
                            }
                            >
                                <div className="d-inline-block ms-1">{ptpbalance?parseFloat(ptpbalance/1000000).toFixed(4):'0.0'} ELEM</div>
                            </OverlayTrigger>
                        </p>
                    </div>

                    <InputGroup className='input-group-max input-group-max-lg mb-3'>
                        <FormControl
                            // disabled={true}
                            value={BondAmount}
                            type='number'
                            placeholder="0.00"
                            className="ps-1 pb-0"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setBondAmount(e.target.value)}
                        />
                        <Button variant="outline-purple" className='btn-xs-d rounded' onClick={()=>callingMax()} >Max</Button>
                    </InputGroup>

                    {/* <div className="mb-0 d-flex align-items-center justify-content-between">
                        <p className="mb-0 pe-2">Amount {functname}ing (after fee)
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    The amount you are {functname}ing to the pool (after fee).
                                </Tooltip>
                            }
                            >
                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                            </OverlayTrigger>
                        </p>

                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                            <Tooltip id={`tooltip-right`}>
                                0.0 ELEM
                            </Tooltip>
                        }
                        >
                            <strong className="text-white">0.0 ELEM</strong>
                        </OverlayTrigger>
                    </div> */}
                    {/* <div className="mb-0 d-flex align-items-center justify-content-between">
                        <p className="mb-0 pe-2">Fee
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    The amount you are {functname}ing to the pool (after fee).
                                </Tooltip>
                            }
                            >
                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                            </OverlayTrigger>
                        </p>

                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                            <Tooltip id={`tooltip-right`}>
                                0.0 ELEM
                            </Tooltip>
                        }
                        >
                            <strong className="text-white">0.0 ELEM</strong>
                        </OverlayTrigger>
                    </div> */}
                    <div className="mb-0 d-flex align-items-center justify-content-between">
                        <p className="mb-0 pe-2">My total deposits
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    The amount you are {functname}ed to the pool (after fee).
                                </Tooltip>
                            }
                            >
                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                            </OverlayTrigger>
                        </p>

                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                            <Tooltip id={`tooltip-right`}>
                                {parseFloat(stakedAmount/1000000).toFixed(3)} ELEM
                            </Tooltip>
                        }
                        >
                            <strong className="text-white">{stakedAmount ? parseFloat(stakedAmount/1000000).toFixed(3): '0.0'} ELEM</strong>
                        </OverlayTrigger>
                    </div>
                    <div className="mb-0 d-flex align-items-center justify-content-between">
                        {/* <p className="mb-0 pe-2">Pool Share
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    The amount you are {functname}ing to the pool (after fee).
                                </Tooltip>
                            }
                            >
                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                            </OverlayTrigger>
                        </p>

                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                            <Tooltip id={`tooltip-right`}>
                                0.0 %
                            </Tooltip>
                        }
                        >
                            <strong className="text-white">0.00 %</strong>
                        </OverlayTrigger> */}
                    </div>

                    <Row className="mt-4 mb-3">
                        <Col sm={6} className="mb-sm-0 mb-2">
                            <Button variant="blue" className="w-100" onClick={handleToggle1}>Cancel</Button>
                        </Col>
                        <Col sm={6} className="mb-sm-0 mb-2">
                            {appOpted ? (<>
                                <ButtonLoad loading={loader} variant="blue" className="w-100"
                             onClick={()=>depositOrwithdraw()} 
                             >{functname}</ButtonLoad>
                            </>):(<>
                                <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>appOptIn()}>
                            Opt-In App
                        </ButtonLoad>
                            </>)}
                        
                            
                        </Col>
                    </Row>

                    {/* <p className="text-muted text-center"><small>In bankrun situation, LPs might only be able to withdraw in the over-covered tokens.</small></p> */}
                </Modal.Body>
            </Modal>
                <Modal show={trade} className="modal-dashboard" centered onHide={handleTrade}>
                    <Modal.Header closeButton>
                        <Modal.Title>Trade <img src={elemlogo} alt='image' width={23} height={23} className="mx-2" /> ELEM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'>
                            <span className='text-white'>TraderJoe</span>
                            <img src={elemlogo} width={23} height={23} alt="TraderJoe" />
                        </Button>
                        <Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'>
                            <span className='text-white'>Pangolin</span>
                            <img src={elemlogo} width={23} height={23} alt="Pangolin" />
                        </Button>
                        <Button variant='gray' className='d-flex p-3 justify-content-between w-100 align-items-center'>
                            <span className='text-white'>Add ELEM to MetaMask</span>
                            <img src={elemlogo} width={23} height={23} alt="Add ELEM to MetaMask" />
                        </Button>
                    </Modal.Body>
                </Modal>


                
                <div className='pools-tab'>
                    <Tabs
                    defaultActiveKey="main"
                    id="tab-example"
                    className="mb-24 justify-content-center"
                    >
                         <Tab eventKey="main" title={<span style={{ color: Theme === 'light' ? 'black' : 'white' }}>Main Pool</span>}>
                         <PoolChild1 />
                         <PoolChild />
                         <PoolChild11 />
      
      {/* <PoolChild2 /> */}
      {/* <PoolChild3 /> */}
      {/* <PoolChild />
      <PoolChild /> */}
    </Tab>
                        {/* <Tab eventKey="alt" title="Alt Pools">
                            <PoolParent />
                            <PoolParent />
                            <PoolParent />
                            <PoolParent />
                        </Tab>
                        <Tab eventKey="factory" title="Factory Pools">
                            <PoolParent />
                            <PoolParent />
                            <PoolParent />
                            <PoolParent />
                        </Tab> */}
                    </Tabs>
                </div>

            </Container>
        </Layout>
     );
}

export default PoolNew;