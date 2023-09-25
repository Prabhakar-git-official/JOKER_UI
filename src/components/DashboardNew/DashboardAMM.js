import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
// import { Button, Card, Form, InputGroup, Col, Container, Dropdown, Modal, OverlayTrigger,Accordion, Row, Tab, Tabs, Tooltip, Alert, Badge } from 'react-bootstrap';

import Layout from './LayoutT';
import PieChartTau from './snippets/PieChartAmm';
import dashboardDetails from '../Dashboard/stablecoin.json';
import firebase from '../../NFTFolder/firebase';
import { UsdcAppId,UsdtAppId, TauAppId, globalstate, Usdc, Usdt, TAU} from './singlesidedAmmconfig';
import algosdk, { Algod ,encodeUint64} from "algosdk";
import node from './nodeapi.json';
import ButtonLoad from 'react-bootstrap-button-loader';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { dualwalletconnect } from './walletconnection';

const algodClient = new algosdk.Algodv2('',node['algodclient'], '');

const DashboardNFT = () => {

    useEffect(() => {
        document.title = "ELEMENT | DashboardAMM"
    }, [])

    
    

    const  [TotalMintNFT,setTotalMintNFT] = useState("")
    const  [TotalMintRNFT,setTotalMintRNFT] = useState("")
    const  [TotalMintFNFT,setTotalMintFNFT] = useState("")
    const  [TotalMintANFT,setTotalMintANFT] = useState("")

    const  [TotalSaleNFT,setTotalSaleNFT] = useState("")
    const  [TotalSaleRNFT,setTotalSaleRNFT] = useState("")
    const  [TotalSaleFNFT,setTotalSaleFNFT] = useState("")
    const  [TotalSaleANFT,setTotalSaleANFT] = useState("")

    const  [TotalMintUsers,setTotalUsers] = useState("") 
    const  [TotalNFT,setTotalNFT] = useState("")
    const  [cashadded,setcashadded] = useState("")
    const  [liability,setliability] = useState("")
    const  [TotalNFT1,setTotalNFT1] = useState("")
    const  [cashadded1,setcashadded1] = useState("")
    const  [liability1,setliability1] = useState("")
    const  [TotalNFT2,setTotalNFT2] = useState("")
    const  [cashadded2,setcashadded2] = useState("")
    const  [liability2,setliability2] = useState("")
    const  [TotalBuyFNFT,setTotalBuyFNFT] = useState("")
    const  [TotalBuyANFT,setTotalBuyANFT] = useState("")    

    const[loader, setLoader] = useState(false);

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[loader1, setLoader1] = useState(false);

    const handleShowLoad1 = () => setLoader1(true);
    const handleHideLoad1 = () => setLoader1(false);
    const[loader2, setLoader2] = useState(false);

    const handleShowLoad2 = () => setLoader2(true);
    const handleHideLoad2 = () => setLoader2(false);

    const dbcallalgoTotal=async()=>{                        
            let totalnft;
            let k = await globalstate(algodClient,UsdcAppId)   
            console.log("k",k)   
            totalnft = (k.SlippageFee/1000000)
            setcashadded(k.cashAdded/1000000)
            setliability(k.Liability/1000000)
     
              setTotalNFT(totalnft)

              let k1 = await globalstate(algodClient,UsdtAppId)   
            console.log("k",k1)   
            let totalnft1 = (k1.SlippageFee/1000000)
            setcashadded1(k1.cashAdded/1000000)
            setliability1(k1.Liability/1000000)
     
              setTotalNFT1(totalnft1)

              let k2 = await globalstate(algodClient,TauAppId)   
            console.log("k",k2)   
            let totalnft2 = (k2.SlippageFee/1000000)
            setcashadded2(k2.cashAdded/1000000)
            setliability2(k2.Liability/1000000)
     
              setTotalNFT2(totalnft2)
             
    }  
    function formatter(number){
        const formattedNumber = Number(
          number.toString().match(/^\d+(?:\.\d{0,3})?/)
        )
        return formattedNumber;
      }               
    useEffect(()=>{dbcallalgoTotal()},[TotalNFT])
    // const dbcallalgo=async()=>{                
    //     let c=0;        
    //     let nft = 0;
    //     let rnft = 0;
    //     let fnft = 0;
    //     let anft = 0;
    //     let totalnft = 0;
    //     //firebase.auth().signInAnonymously().then((response)=>{      
    //       firebase.database().ref("imagerefAlgoltRoyalty").on("value", (data) => {
    //         if (data) {                
    //             data.forEach((d) => {                                    
    //                 c=c+1;                                                       
    //                 let values = d.val();
                    
    //                     if(values.NFTModel ==="NFT"){
    //                         nft = nft + 1;                                                        
    //                         totalnft = totalnft + 1;
    //                     }
    //                     else if(values.NFTModel ==="Royalty-NFT"){
    //                         rnft = rnft + 1;
    //                         totalnft = totalnft + 1;
    //                     }
    //                     else if(values.NFTModel ==="Auction-NFT"){
    //                         anft = anft + 1;
    //                         totalnft = totalnft + 1;
    //                     }else{
    //                         fnft = fnft + 1;
    //                         totalnft = totalnft + 1;
    //                     }                                                   
    //             });                                        
    //             setTotalMintNFT(nft)
    //             setTotalMintRNFT(rnft)
    //             setTotalMintFNFT(fnft)
    //             setTotalMintANFT(anft)
    //             setTotalNFT(totalnft)
    //           }                          
    //         });  
            
    //     //})        
    // }                 
    // useEffect(()=>{dbcallalgo()},[])
   
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
            //   assetCheck()
            //   checkbalan()
            //   resetstate()
            dbcallalgoTotal()
              toast.success(toastDiv(id,type));
              
              handleHideLoad();
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
        };
    const toastDiv = (txId,type) =>
    (
        <div>
           <p> {type} &nbsp;<a style={{color:'blue'}} href={txId} target="_blank" rel="noreferrer">View in algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="blue"/>
    </svg></a></p> 
        </div>
    );

    const claim1 = async () =>
    {
      handleShowLoad()
   //console.log("minb",mintotranser ,balanceid1)
    // if(balanceid1 >= mintotranser + 557000){
    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');



    let index = parseInt(UsdcAppId);
    ////console.log("appId inside donate", index)
    try {

    const params = await algodClient.getTransactionParams().do();

    let appArgsD = [];
    // let amtc = BondAmount * 1000000;
    appArgsD.push(new Uint8Array (Buffer.from("claim")));
  //   appArgsD.push(new Uint8Array (Buffer.from("ClaimUsdc")));
    // appArgsD.push(algosdk.encodeUint64(parseInt(amtc)));
    let senderd =localStorage.getItem("walletAddress");
    
    let assArgs = [];
    assArgs.push(parseInt(UsdcAppId));
    let assArgs1 = [];
    assArgs1.push(parseInt(Usdc));
    // assArgs1.push(parseInt(VEPTP));
    // assArgs1.push(parseInt(PTP));
    const optinTranscation = algosdk.makeApplicationNoOpTxnFromObject({
      suggestedParams: {
          ...params,
      },
      from: senderd,
      appIndex:UsdcAppId,
      appArgs: appArgsD,
    //   foreignApps:assArgs,
      foreignAssets:assArgs1
      
  });

    let transid=await dualwalletconnect(optinTranscation);
    await waitForConfirmation(algodClient, transid,"Claimed successfully");
   

    // setOpted(true)
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
     toast.error(`${err}`);
    }
   



    }


    }
    const claim2 = async () =>
    {
      handleShowLoad1()
   //console.log("minb",mintotranser ,balanceid1)
    // if(balanceid1 >= mintotranser + 557000){
    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');



    let index = parseInt(UsdcAppId);
    ////console.log("appId inside donate", index)
    try {

    const params = await algodClient.getTransactionParams().do();

    let appArgsD = [];
    // let amtc = BondAmount * 1000000;
    appArgsD.push(new Uint8Array (Buffer.from("claim")));
  //   appArgsD.push(new Uint8Array (Buffer.from("ClaimUsdc")));
    // appArgsD.push(algosdk.encodeUint64(parseInt(amtc)));
    let senderd =localStorage.getItem("walletAddress");
    
    let assArgs = [];
    assArgs.push(parseInt(UsdtAppId));
    let assArgs1 = [];
    assArgs1.push(parseInt(Usdt));
    // assArgs1.push(parseInt(VEPTP));
    // assArgs1.push(parseInt(PTP));
    const optinTranscation = algosdk.makeApplicationNoOpTxnFromObject({
      suggestedParams: {
          ...params,
      },
      from: senderd,
      appIndex:UsdtAppId,
      appArgs: appArgsD,
    //   foreignApps:assArgs,
      foreignAssets:assArgs1
      
  });

    let transid=await dualwalletconnect(optinTranscation);
    await waitForConfirmation(algodClient, transid,"Claimed successfully");
    handleHideLoad1()

    // setOpted(true)
    }catch (err) {
      handleHideLoad1()
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
     toast.error(`${err}`);
    }
   



    }


    }
    const claim3 = async () =>
    {
      handleShowLoad2()
   //console.log("minb",mintotranser ,balanceid1)
    // if(balanceid1 >= mintotranser + 557000){
    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');



    let index = parseInt(UsdcAppId);
    ////console.log("appId inside donate", index)
    try {

    const params = await algodClient.getTransactionParams().do();

    let appArgsD = [];
    // let amtc = BondAmount * 1000000;
    appArgsD.push(new Uint8Array (Buffer.from("claim")));
  //   appArgsD.push(new Uint8Array (Buffer.from("ClaimUsdc")));
    // appArgsD.push(algosdk.encodeUint64(parseInt(amtc)));
    let senderd =localStorage.getItem("walletAddress");
    
    let assArgs = [];
    assArgs.push(parseInt(TauAppId));
    let assArgs1 = [];
    assArgs1.push(parseInt(TAU));
    // assArgs1.push(parseInt(VEPTP));
    // assArgs1.push(parseInt(PTP));
    const optinTranscation = algosdk.makeApplicationNoOpTxnFromObject({
      suggestedParams: {
          ...params,
      },
      from: senderd,
      appIndex:TauAppId,
      appArgs: appArgsD,
    //   foreignApps:assArgs,
      foreignAssets:assArgs1
      
  });

    let transid=await dualwalletconnect(optinTranscation);
    await waitForConfirmation(algodClient, transid,"Claimed successfully");
    handleHideLoad2()
   

    // setOpted(true)
    }catch (err) {
      handleHideLoad2()
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
     toast.error(`${err}`);
    }
   



    }


    }


 
                     
    return (
        <Layout>
               <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                <Row>
                    <Col md={6} className="mb-4">                        
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">USDC 
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        It is the Stablecoin,it represent the slippage fees collected during swap.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                               
                            </div>
                            
                            </Col>
                            <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/application/" + UsdcAppId} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col>
                            
                            </Row>
                                                  
                            <hr className='mb-20 mt-0' />
                            <div className='mb-0'>                                
                                <Row className='justify-content-center'>
                                    <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">                                        
                                        {TotalNFT === 0 ? (
                                            <></>
                                        ):(
                                            <PieChartTau x={cashadded} z ={liability} y={"SlippageFee"}/>
                                        )}
                                    </Col>
                                    <Col xs={'auto'} sm={6}>
                                        
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect  fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Available Cash

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total stablecoin collected during Transaction.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(cashadded) ? (parseInt(cashadded).toFixed(4)).toLocaleString() : "0"} USDC</h6>
                                        </div>  
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Liability

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total Liability.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(liability) ? (parseInt(liability).toFixed(4)).toLocaleString() : "0"} USDC</h6>
                                        </div>  
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Coverage Ratio

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total Liability.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(liability) ? formatter(cashadded/liability) : "0"} USDC</h6>
                                        </div> 
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                                Total SlippageFee 

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total SlippageFee collected during swap.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{(TotalNFT) ? ((TotalNFT)) : "0"} USDC   </h6>
                                            
                                            {localStorage.getItem("walletAddress") === "LB22UYUUKJNMUDFN2BZSD5IXOVSJHJF3HG3ID6ENYUOSOZXDBQPSOHWWLU" ? (<>
                                                <ButtonLoad loading={loader} onClick={()=>claim1()}>Claim</ButtonLoad>
                                           </>):(<></>)} 
                                            
                                        </div>                                      
                                    </Col>
                                    
                                </Row>
                            </div>
                        </Card>                        
                      
                                                                 
                    </Col>
                    <Col md={6} className="mb-4">                        
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">USDT 
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        It is the Stablecoin,it represent the slippage fees collected during swap.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/application/" + UsdtAppId} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col>
                            </Row>
                                                        
                            <hr className='mb-20 mt-0' />
                            <div className='mb-0'>                                
                                <Row className='justify-content-center'>
                                    <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">                                        
                                        {TotalNFT1 === 0 ? (
                                            <></>
                                        ):(
                                            <PieChartTau x={cashadded1} z ={liability1} y={"SlippageFee"}/>
                                        )}
                                    </Col>
                                    <Col xs={'auto'} sm={6}>
                                         
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Available Cash

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total stablecoin collected during Transaction.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(cashadded1) ? (parseInt(cashadded1).toFixed(6)).toLocaleString() : "0"} USDT</h6>
                                        </div>  
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Liability

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total Liability.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(liability1) ? (parseInt(liability1).toFixed(4)).toLocaleString() : "0"} USDT</h6>
                                        </div>  
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Coverage Ratio

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total Liability.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(liability1) ? formatter(cashadded1/liability1) : "0"} USDT</h6>
                                        </div>  
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                                Total SlippageFee 

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total SlippageFee collected during swap.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{(TotalNFT1) ? ((TotalNFT1)) : "0"} USDT</h6>
                                            
                                            {localStorage.getItem("walletAddress") === "LB22UYUUKJNMUDFN2BZSD5IXOVSJHJF3HG3ID6ENYUOSOZXDBQPSOHWWLU" ? (<>
                                                <ButtonLoad loading={loader1} onClick={()=>claim2()}>Claim</ButtonLoad>
                                           </>):(<></>)} 
                                        </div>                                    
                                    </Col>
                                    
                                </Row>
                            </div>
                        </Card>                        
                      
                                                                 
                    </Col>
                    <Col md={6} className="mb-4">                        
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">TAU 
                            {/* <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        It is the Stablecoin,it represent the slippage fees collected during swap.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger> */}
                            </div>
                            </Col>
                            <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/application/" + TauAppId} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col>
                            </Row>
                                                        
                            <hr className='mb-20 mt-0' />
                            <div className='mb-0'>                                
                                <Row className='justify-content-center'>
                                    <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">                                        
                                        {TotalNFT2 === 0 ? (
                                            <></>
                                        ):(
                                            <PieChartTau x={cashadded2} z ={liability2} y={"SlippageFee"}></PieChartTau>
                                           
                                        )}
                                    </Col>
                                    <Col xs={'auto'} sm={6}>
                                        
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Available Cash

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total stablecoin collected during Transaction.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(cashadded2) ? (parseInt(cashadded2).toFixed(4)).toLocaleString() : "0"} TAU</h6>
                                        </div>  
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Liability

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total Liability.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(liability2) ? (parseInt(liability2).toFixed(4)).toLocaleString() : "0"} TAU</h6>
                                        </div> 
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                               Coverage Ratio

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total Liability.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{parseInt(liability2) ? formatter(cashadded2/liability2) : "0"} TAU</h6>
                                        </div>  
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#919cff" x="0" y="0" width="16" height="16"></rect></svg>
                                                Total SlippageFee 

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            The Total SlippageFee collected during swap.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <h6>{(TotalNFT2) ? ((TotalNFT2)) : "0"} TAU</h6>
                                           {localStorage.getItem("walletAddress") === "LB22UYUUKJNMUDFN2BZSD5IXOVSJHJF3HG3ID6ENYUOSOZXDBQPSOHWWLU" ? (<>
                                            <ButtonLoad loading={loader2} onClick={()=>claim3()}>Claim</ButtonLoad>
                                           </>):(<></>)} 
                                        </div>                                     
                                    </Col>
                                    
                                </Row>
                            </div>
                        </Card>                        
                      
                                                                 
                    </Col>
                  
                </Row>
            </Container>
        </Layout>
    );
};

export default DashboardNFT;