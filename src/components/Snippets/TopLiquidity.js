import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import Icon1 from '../../assets/images/icon1.png';
import Icon2 from '../../assets/images/icon2.png';
import elem from '../../assets/images/elem-original.png';
import tau from '../../assets/images/tau-original.png';
import logo from '../../assets/images/logoasset.png';
import usdtlogo from '../../assets/images/usdtimg.png';

import taulogo from '../../assets/images/tau-original.png';
import elemlogo from '../../assets/images/elem-original.png';
import algologo from '../../assets/images/Algo.png';
import fireDb from '../../NFTFolder/firebase';
import einrlogo from '../../assets/images/EINR-original.png';
import selecttoken from '../../assets/images/selecttoken.png';

import usdclogo from '../../assets/images/usdc-logo.png';


import { useHistory } from "react-router-dom";
import {calltokenForUsers,callapiforuserslist,numberofpairs} from '../apicallfunction';
import moment from 'moment';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk, { Algod,base64 } from "algosdk";
import {postusertx,postuserdetail,updateusedetails} from '../apicallfunction';
import { Button, Col, Container, Modal, Row, Breadcrumb } from 'react-bootstrap';
import { AppId,escrowProgram } from '../swapConfig';
import { getpostdataall } from '../../firedbstore';
// import { createtxhash ,updatepairhistory,getmethod} from '../apicallfunction';
import { priceofalgoperusdc,priceOfCoin2,find_balance,checkassetin,checkotp,convert1,convert2,readingLocalstate,assetName,decodLocalState } from '../formula';

import { assert2Reserve, assert1Reserve } from '../formula';
import node from '../DashboardNew/nodeapi.json';
import { UsdcAppId,UsdtAppId,TauAppId, USDC } from '../DashboardNew/singlesidedAmmconfig';
import { globalstate } from '../StableswapConfig';
import { min } from 'big-integer';
// import AlgodClient from 'algosdk/dist/types/src/client/v2/algod/algod';
// const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
// }

// const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');
const algodClient = new algosdk.Algodv2('',node['algodclient'], '');

const myAlgoWallet = new MyAlgoConnect();
let data = escrowProgram;
const TopLiquidity = () => {
  useEffect(() => {
    document.title = "ELEMENT | Analytics"
}, [])
    let history=useHistory();
    const[dbvalues,setdbvalue] = useState([])
    const [dt,setdt] = useState([]);
    const[ar1,setar1] = useState([]);
    const[ar2,setar2] = useState([]);
    const[ar3,setar3] = useState([]);
    const [s1, sets1] = useState("");
    const [s2, sets2] = useState("");
    const [ilt, setilt] = useState("");
    const[unclaimed_protocol_fees,setunclaimed_protocol_fees]= useState("");
    const[outstanding_asset1_amount,setoutstanding_asset1_amount]= useState("")
    const[outstanding_asset2_amount,setoutstanding_asset2_amount]= useState("")
    const[outstanding_liquidity_amount,setoutstanding_liquidity_amount]= useState("")
    const[shownvalue,setshownalue] = useState(false);
    const[a,seta] = useState([]);
    const [liquidity, setLiquidity] = React.useState(false);
    const [pair, setPair] = React.useState(false);
    const[aprice,setaprice]= useState([]);
    const handleClose = () => setShow(false);
    const [show, setShow] = React.useState(false);
    const [appId,setAppId] = useState("");
    const[swapstate,setswapstate] = useState([])
    
    const[swapstate1,setswapstate1] = useState([])
    const[swapstate2,setswapstate2] = useState([])
    const[b,setb] = useState([]);
    const [algoPrice, setAlgoPrice] = useState("");
    const [usdcPrice, setUsdcPrice] = useState("");
    const[c,setc] = useState([]);
    const[pageSize,setPageSize]=useState(0); 
   
    const[startingpage,setstap ] = useState(0);
    const[spvalue,setpvalue] = useState("");
  //console.log("avalue",a);
    const[amount2Value,setamount2] = useState("");
    const[amount1Value,setamount1] = useState("");
    // const handleLiquidiy = () => {setLiquidity(!liquidity); setPair(false)};
    const [handleLiquidiyopen,sethandleLiquidiyopen] = useState(false);
    const [handleLiquidiyclose,sethandleLiquidiyclose] = useState(false);
    const handlelopen =() =>{sethandleLiquidiyopen(true)}
    const handlelclose =() =>{sethandleLiquidiyopen(false)}
    const[a1balance,setas1balance]=useState("");
    const[a2balance,setas2balance]=useState("");
    const[samount1,setsAmount1] = useState("");
    const[samount2,setsAmount2] = useState("");
    const[rstate,setrstate]= useState([]);
    const[lofPar,setlengthOfPair] = useState("");
    const[pageoffset,setpageoffset] = useState("0");
    const[appOpted,setOpted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setpostperpage] = useState(4);
    let appID_global = AppId;

    let currentPosts;
    // Get current posts
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //console.log("bva",startingpage, indexOfLastPost)
    currentPosts = b.slice(startingpage, indexOfLastPost);
//console.log("current",currentPosts,indexOfLastPost);
// alert("entereing")
// console.log("statevalue",dbvalues)
  const readfirebasedata = async()=>{
    // let k =[];
    // k = await getpostdataall();
    // console.log("kvalue",k)
    let r=[];
    let rv =[];
    fireDb.auth().signInAnonymously().then(async(response)=>{       
      // console.log("data")  
      try {         
      fireDb.database().ref("LpPairs").on("value", (data) => {          
        if (data) { 
        //console.log("valuedata",data.val())
          r = (data.val())
        //console.log("rv",r)
          // rv.forEach((r)=>{
          // //console.log("mapvalues",r)
          // })
          Object.keys(r).map(async(k)=>{
          //console.log("mapvalues",r[k])
            rv.push(r[k])
          })
        //   data.forEach((d) => { 
        //     //console.log("value",d.val())                
        //       let value=d.val();  
        //        Object.keys(value).map(async(k)=>{
        //           // console.log("value",value)                                                       
        //               r.push({
        //                   id:value[k].id,
        //                   AssetId1:value[k].AssetId1,AssetId2:value[k].AssetId2,AssetId3:value[k].AssetId3,
        //                   AssetName1:value[k].AssetName1,AssetName2:value[k].AssetName2,escrow:value[k].escrow,tvl:value[k].tvl,
        //                   volume:value[k].volume,fees:value[k].fees,address:value[k].address,multipleusers:value[k].multipleusers
        //                 }) 
        //                 //  rv = r.reverse()
        //                 rv = (r.reverse())
        //               //console.log("reverser",rv)  
                        
        //       // console.log("rdatafinal",r) 
        //       })                          
        // })
        // console.log("val",rv)  

        setdbvalue(rv) 
        setb(rv);
        // return rv        
      }         
      });  
                   
    } catch (error) {
      //console.log('error occured during search', error);    
    } 
  // //console.log("data",r[0],r) 
   
  })
    // setdbvalue(k)
    // setb(k);
  }
  useEffect(()=>{readfirebasedata()},[])
useEffect(() =>{readvaliemethod()},[])
const readvaliemethod=async()=>{
  let k = await globalstate(algodClient,UsdcAppId);
       setswapstate(k)
       let k1 = await globalstate(algodClient,UsdtAppId);
       setswapstate1(k1)
       let k2 = await globalstate(algodClient,TauAppId);
       setswapstate2(k2)
  setOpted(await checkotp(appID_global));
  // let k = await callapiforuserslist(pageoffset);
// console.log("K",k)
  // setb(k);
 //  let c = k.slice(1, 4);
  let m =0;
// console.log("m",m)
  // k.map((r,i)=>{
  //   m = m + r.tvl;
  // })
  // let len = await numberofpairs();
  // setlengthOfPair(len)
// console.log("m",m)
   localStorage.setItem("tvl",m);

   let pk1 = await priceofalgoperusdc(algodClient);
   setAlgoPrice(pk1);
  //  let pk2 = await priceOfCoin2();
    setUsdcPrice(1);
  //console.log("priceofalgo",pk1)
  // **********
//  let k = await getmethod(1,2);
////console.log("K",k)
//  setb(k);
// //  let c = k.slice(1, 4);
//  let m =0;
////console.log("m",m)
//  k.map((r,i)=>{
//    m = m + r.tvl;
//  })
////console.log("m",m)
//   localStorage.setItem("tvl",m);

  // ********* firebase code
}


    const setpostcall = async()=>{
  //     if(pageoffset === 0){

  //     }
  //     else{
  //       setpageoffset(pageoffset - 1)
  //       let k = await callapiforuserslist(pageoffset - 1);
  // // console.log("K",k)
  //   setb(k);
  //     }
     
      //console.log("postperpage",postsPerPage)
      //   if(postsPerPage <= 4){
            
      //   }
      //   else{
        // setstap(indexOfLastPost-4)
        if(postsPerPage >=8){
        //console.log("indexval",startingpage,postsPerPage)
          setpostperpage(postsPerPage-4)
          // console.log("indexval1",startingpage,postsPerPage)
          setstap(startingpage - 4)
          // console.log("indexval2",startingpage,postsPerPage)
        //console.log("postperpage",currentPosts)
        }
        
      //   }
    
       
    }
    async function readLocalState(client, account,passvalue){
        let accountInfoResponse = await client.accountInformation(account).do();
      //console.log("accinfo",accountInfoResponse);
        let avalue,bvalue,cvalue;
        if(accountInfoResponse['apps-local-state'].length > 0){
          for(let i = 0; i< accountInfoResponse['apps-local-state'][0]['key-value'].length;i++){
            if(accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'] === "czE="){
             avalue = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
            //  setMax(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           //console.log(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
            }
            else if(accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'] === "czI="){
             bvalue = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
            //  setMax1(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           //console.log(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
            }
            else if(accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'] ===  "aWx0"){
             cvalue = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           //console.log(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
            }
          }
        }
        let pgsize = {"a":avalue,"b":bvalue,"c":cvalue,"name1":passvalue.asetName1,"name2":passvalue.asetName2,"id1":passvalue.asetId1,"id2":passvalue.asetId2}
        history.push({
            pathname: '/swap',          
            state: { detail: pgsize }
        })
    }
    async function readLocalStateValue(client, account, index1,asset1,asset2){
        let accountInfoResponse = await readingLocalstate(client,account);
        
        for(let i=0;i<15;i++){
          let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
          // console.log("keys",keys)
          if(keys === "czE="){
           sets1(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
          }
          if(keys === "czI="){
              sets2(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
          }
          if(keys === "aWx0"){
              setilt(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
            
            } 
          if(keys === "cA=="){
            setunclaimed_protocol_fees(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
          } 
          // if(keys.slice(0,2) === "bw"){
          //   let a1 = decodLocalState(String(keys));
           
          //   if(decodLocalState(keys) === asset1){
          //     setoutstanding_asset1_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
              
          //   } 
          //   if(decodLocalState(keys) === asset2){
          //     setoutstanding_asset2_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
             
          //   } 
          //   if(decodLocalState(keys) === asset3){
          //     setoutstanding_liquidity_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
          //   }
          // }          
         
        
         
        }
     
    }
    const waitForConfirmation = async function (algodclient, txId) {
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
            //Got the completed Transaction
          //console.log(
            //   "Transaction " +
            //     txId +
            //     " confirmed in round " +
            //     pendingInfo["confirmed-round"]
            // );
            break;
          }
          lastRound++;
          await algodclient.statusAfterBlock(lastRound).do();
        }
      };
    const buttonclick = async(pvalue) =>{

        await readLocalState(algodClient,pvalue.escrowAddress,pvalue);
       
    }

   
   const setincrm= async()=>{
     if(postsPerPage < (dbvalues.length)){
      setstap(indexOfLastPost)
      setpostperpage(postsPerPage+4)
     }
   
    ////console.log("lofpair",lofPar/10)
    //  if(parseInt(pageoffset) < parseInt((dbvalues.length / 4)-1))
    //  {
      // setpageoffset(pageoffset + 1)
      // let k = await callapiforuserslist(pageoffset + 1);
      // currentPosts = b.slice(indexOfLastPost, indexOfLastPost + 4);
 // console.log("K",k)
  //  setb(k);
    //  }
    
// console.log("not enter",postsPerPage,(b.length-4))
  //  if(postsPerPage > (b.length-4))
  //  {
  //    if((b.length)-postsPerPage > 0){
  //     // console.log("not enter")
  //       let k = (b.length)-postsPerPage;
  //       setpostperpage(postsPerPage+k)
  //       // setstap(startingpage)
  //       currentPosts= b.slice(indexOfLastPost, indexOfLastPost+k);
  //    }
     
  //  }
  //  else{
  //   setpostperpage(postsPerPage+4)
  //   // setstap(startingpage)
  //    currentPosts= b.slice(indexOfLastPost, indexOfLastPost+4);
  //  //console.log("current",currentPosts);
  //  }
    
   }
   
 //console.log("bvalue",b)

function SetValue1(Amountin){
    //console.log("aprice",aprice);
    let amount2 = convert1((Amountin * 1000000),aprice[0],aprice[1]);
  //console.log("amout2",amount2)
    setamount2(amount2/1000000);
    setsAmount1(Amountin * 1000000)
    setsAmount2(amount2)
  }
  function SetValue2(Amountin){
    let amount2 = convert2((Amountin * 1000000),aprice[0],aprice[1]);
  //console.log("amout2",amount2)
    setamount1(amount2/1000000);
    setsAmount1(amount2)
    setsAmount2(Amountin * 1000000)
  }
  const addli = async(as1,as2) =>{
    let s1 =  await find_balance(as1);
  //console.log("b1",s1,as1)
    setas1balance(s1);
    let s2 = await find_balance(as2);
    setas2balance(s2);
  //console.log("b2",s2)
    
    
  }

  console.log("swapstate",swapstate.Totalsupply/1000000)

  // const someNumber = 0.8900998
  function formatter(number){
    const formattedNumber = Number(
      number.toString().match(/^\d+(?:\.\d{0,3})?/)
    )
    return formattedNumber;
  }
  
  
  console.log("swapstate",formatter(swapstate.Totalsupply/1000000))

  const pass =async(pvalue)=>{
   
    addli(pvalue.asetId1,pvalue.asetId2)
    setpvalue(pvalue)
    let a1 = await readingLocalstate(algodClient,pvalue.escrowAddress);
  //console.log("values",a1);

    let b1 = assert1Reserve(a1);
   let  b2 = assert2Reserve(a1);
   
   let pr =[];
   pr.push(b1);
   pr.push(b2);
   setaprice(pr);
   readLocalStateValue(algodClient,pvalue.escrowAddress,appId,pvalue.asetId1,pvalue.asetId2);


   let sh = await checkassetin(pvalue.asetId3);
    if(sh === undefined || sh === null || sh===""){
      setshownalue(false);
    }
    else{
      setshownalue(true);
    }
   
   handlelopen();

  //console.log("asset1",b1,b2,pr)
    
  }
  const closevalue =()=>{
    setamount1(0)
    setamount2(0)
    handlelclose();
   
    // setas1balance(0);
    // setas2balance(0);
  }
  const optIn =async (assid) => {

    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
    const params = await algodClient.getTransactionParams().do();
  ;

   
    // console.log('Asset 3 ID: ', assetId3);
// console.log("appId inside donate", index)
try {


let optinTranscation = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  from:localStorage.getItem("walletAddress"),
  to :localStorage.getItem("walletAddress"),
  assetIndex: assid ,
  amount: 0,
  suggestedParams:params,
  
});


  
  const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
  toast.info("Optin Progress");

const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
//console.log("TxID", JSON.stringify(response, null, 1));
await waitForConfirmation(algodClient, response.txId);
toast.success(`Transaction Success ${response.txId}`);
toast.info("Optin Done Sucessfully");
setshownalue(true);
} catch (err) {
  toast.error(`Transaction Failed due to ${err}`);
  //console.error(err);
}

 
}
  const mint1call = async (appid,a1,a2,asn1,asn2) => {
 
    let index = parseInt(appid);
  //console.log("appId inside donate", index);
  //console.log("input1",a1)
  //console.log("input2",a2)
    setAppId(appid);
    let tokenid1 = spvalue.asetId1;
    let tokenid2 = spvalue.asetId2;
      
    let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appID_global);
    let results = await algodClient.compile(replacedData).do();

  //console.log("Hash = " + results.hash);
  //console.log("Result = " + results.result);

    
    let assetId3 = spvalue.asetId3;
  //console.log(assetId3)

    let program = new Uint8Array(Buffer.from(results.result, "base64"));

    let lsig = algosdk.makeLogicSig(program);
  //console.log("Escrow =", lsig.address()); 

    // readLocalStateValue(algodClient,results.hash,appId,tokenid1,tokenid2);

let i1 = Math.floor(a1);
let i2 = Math.floor(a2);
console.log("input1",i1)
  //console.log("input2",ilt)
let vl = s1+s2+ilt;
let tvl = s1 + s2;
    let total;
   

      let liquidity_asset_amount = Math.min(
        (i1 * ilt) / s1,
        (i2 * ilt) / s2
      );
      liquidity_asset_amount = liquidity_asset_amount - (liquidity_asset_amount * 0.05)
      //  let liquidity_asset_amount = Math.min(
      //   (i1 * aprice[3]) / aprice[0],
      //   (i2 * aprice[3]) / aprice[1]
      // );
    //console.log("liquidity_asset_amount",liquidity_asset_amount)
      // total = Math.floor((liquidity_asset_amount - liquidity_asset_amount )* 0.5);
      total = Math.floor(liquidity_asset_amount)
    //console.log("Total 2: ", total);
   

                          
          // this.setState({setLoading:false}) ;  
          // this.setState({setisOpenmkyc:true}); 
          try {

            const params = await algodClient.getTransactionParams().do();
            let sender = localStorage.getItem("walletAddress");
      
            let recv_escrow = lsig.address();
            let amount = 3000;
      
            let note1 = [];
            note1.push(new Uint8Array(Buffer.from("fee")));
            if(parseInt(tokenid2) == 0){
      
              let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                amount: amount,
                suggestedParams: params,
              });
        
              let appArg = [];
              appArg.push(new Uint8Array(Buffer.from("mint")));
        
              let foreignassets = [];
              foreignassets.push(parseInt(tokenid1));
              // foreignassets.push(parseInt(tokenid2));
              foreignassets.push(parseInt(assetId3));
            //console.log("asset3",assetId3)
              const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                from: recv_escrow,
                appIndex: index,
                appArgs: appArg,
                appAccounts: sender,
                accounts: [sender],
                foreignAssets: foreignassets,
                suggestedParams: params,
              });
      //console.log("3rdtran",i1)
              const transaction3 =
                algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: sender,
                  to: recv_escrow,
                  assetIndex: parseInt(tokenid1),
                  note: undefined,
                  accounts: sender,
                  amount: parseInt(Math.floor(i1)),
                  suggestedParams: params,
                });
        
              const transaction4 =
                algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: sender,
                  to: recv_escrow,
                  note: undefined,
                  accounts: sender,
                  amount: parseInt(Math.floor(i2)),
                  suggestedParams: params,
                });
        
              let foreignassetliquidity = [];
              foreignassetliquidity.push(parseInt(assetId3));
            //console.log(total);
              const transaction5 =
                algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: recv_escrow,
                  to: sender,
                  assetIndex: parseInt(assetId3),
                  note: undefined,
                  accounts: [recv_escrow],
                  appAccounts: recv_escrow,
                  foreignAssets: foreignassetliquidity,
                  amount: parseInt(total),
                  suggestedParams: params,
                });
                const groupID = algosdk.computeGroupID([
                  transaction1,
                  transaction2,
                  transaction3,
                  transaction4,
                  transaction5,
                ]);
                const txs = [
                  transaction1,
                  transaction2,
                  transaction3,
                  transaction4,
                  transaction5,
                ];
                for (let i = 0; i <= 4; i++) txs[i].group = groupID;
          
                const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
                const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
        
                const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
                toast.info("Transaction in Progress");
                const response = await algodClient
                  .sendRawTransaction([
                    signedTxArray[0].blob,
                    signedTx1.blob,
                    signedTxArray[1].blob,
                    signedTxArray[2].blob,
                    signedTx2.blob,
                  ])
                  .do();
              //console.log("TxID", JSON.stringify(response, null, 1));
                await waitForConfirmation(algodClient, response.txId);
      
              let an = asn1 +"/"+ asn2;
                // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Add Liquidity",total,0,asn1,asn2,amount);
                // await createtxhash(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
                // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
                await updateusedetails(tokenid1,tokenid2,tvl,vl,0);
                await postusertx(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
                toast.success(`Transaction Success ${response.txId}`);
                toast.info("Adding Liquidity is Successfully Done!")
                closevalue();
              //   setTxId(response.txId);
            }
            else{
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: sender,
              to: recv_escrow,
              amount: amount,
              suggestedParams: params,
            });
      
            let appArg = [];
            appArg.push(new Uint8Array(Buffer.from("mint")));
      
            let foreignassets = [];
            foreignassets.push(parseInt(tokenid1));
            foreignassets.push(parseInt(tokenid2));
            foreignassets.push(parseInt(assetId3));
            const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
              from: recv_escrow,
              appIndex: index,
              appArgs: appArg,
              appAccounts: sender,
              accounts: [sender],
              foreignAssets: foreignassets,
              suggestedParams: params,
            });
      
            const transaction3 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                assetIndex: parseInt(tokenid1),
                note: undefined,
                accounts: sender,
                amount: parseInt(Math.floor(i1)),
                suggestedParams: params,
              });
      
            const transaction4 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                assetIndex: parseInt(tokenid2),
                note: undefined,
                accounts: sender,
                amount: parseInt(Math.floor(i2)),
                suggestedParams: params,
              });
      
            let foreignassetliquidity = [];
            foreignassetliquidity.push(parseInt(assetId3));
        // console.log(total.toFixed(0));
            const transaction5 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                to: sender,
                assetIndex: parseInt(assetId3),
                note: undefined,
                accounts: [recv_escrow],
                appAccounts: recv_escrow,
                foreignAssets: foreignassetliquidity,
                amount: parseInt((total)),
                suggestedParams: params,
              });
              const groupID = algosdk.computeGroupID([
                transaction1,
                transaction2,
                transaction3,
                transaction4,
                transaction5,
              ]);
              const txs = [
                transaction1,
                transaction2,
                transaction3,
                transaction4,
                transaction5,
              ];
              for (let i = 0; i <= 4; i++) txs[i].group = groupID;
        
              const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
              const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
             
              const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
              toast.info("Transaction in Progress");
              const response = await algodClient
                .sendRawTransaction([
                  signedTxArray[0].blob,
                  signedTx1.blob,
                  signedTxArray[1].blob,
                  signedTxArray[2].blob,
                  signedTx2.blob,
                ])
                .do();
            //console.log("TxID", JSON.stringify(response, null, 1));
              await waitForConfirmation(algodClient, response.txId);
      let an = asn1 +"/"+asn2;
              // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Add Liquidity",total,0,asn1,asn2,amount);
              await updateusedetails(tokenid1,tokenid2,tvl,vl,0);
              await postusertx(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
              toast.success(`Transaction Success ${response.txId}`);
              toast.info("Adding Liquidity is successfully Done!")
              closevalue();
              // setTxId(response.txId);
            }
            
           
            
          } catch (err) {
            toast.error(`Transaction Failed due to ${err}`);
          //console.error(err);
          }                                         
        
    
  };

  const appOptIn = async () =>
{
  const myAlgoWallet = new MyAlgoConnect();
  // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
  
  
  
  let index = parseInt(appID_global);
  // console.log("appId inside donate", index)
try {
 
  const params = await algodClient.getTransactionParams().do();

  let optinTranscation = algosdk.makeApplicationOptInTxnFromObject({
    from:localStorage.getItem("walletAddress"),
    suggestedParams:params,
    appIndex:index
  });

  
    
    const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
    
    toast.info("Transaction in Progress");
const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
// console.log("TxID", JSON.stringify(response, null, 1));
await waitForConfirmation(algodClient, response.txId);

// await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In App",0,0,"","",0);

await postusertx("-",response.txId,"App Opt-In","-","-")
toast.success(`Transaction Success ${response.txId}`);
setOpted(true);
  } catch (err) {
    toast.error(`Transaction Failed due to ${err}`);
    // console.error(err);
  }
}
  
const checklogo = (name,id)=>{
  if(name === "ALGO" && id === 0){
      return algologo;
  }
  else if(name === "USDC" && id === 78045387){
      return usdclogo;
  }
  else if(name === "ELEM"  && id === 78044331){
      return elemlogo;
  }
  else if(name === "TAU"  && id === 78043454){
      return taulogo;
  }
  else if(name === "EINR"  && id === 78044898){
      return einrlogo;
  }
  else{
    return selecttoken;
  }
} 
    return (
        <div className='mb-5'>


          {/* <center><h6>Before Add Liquidity go to Swap Page and do App Opt-In</h6></center> */}
          {/* <br></br> */}
            <h2 className="h3 text-uppercase mb-40">Top Liquidity Pairs</h2>
           
                <Modal show={handleLiquidiyopen} centered={true} size="lg" onHide={handlelclose}>
            <ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>
                <Modal.Body className='modal-liquidity-body'>
                <div className="modal_header mb-50 d-flex align-items-center">
                                <Button variant='reset' onClick={()=>closevalue()} className='p-0 me-4'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.828 7.00017H16V9.00017H3.828L9.192 14.3642L7.778 15.7782L0 8.00017L7.778 0.222168L9.192 1.63617L3.828 7.00017Z" fill="white"/>
                                    </svg>
                                </Button>

                                <h2 className="h3 mb-0" >ADD LIQUIDITY</h2>     
                            </div>

                            <Row className='justify-content-center'>
                                <Col md={7}>
                                    <div className="mb-2">
                                        <label className='d-flex align-items-center justify-content-between'>From <small>Balance: { a1balance > 0 ? parseFloat(a1balance/1000000).toFixed(3) : '0.0'} </small></label>

                                        <div className="balance-card d-flex align-items-center justify-content-between">
                                          {amount1Value ? (<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  value={amount1Value}  placeholder="0.0" autoComplete='off'/>
                                          </>):(<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  onChange={e => SetValue1(e.target.value)}   placeholder="0.0" autoComplete='off'/>
                                          </>)}
                                          <Button variant='filter'  >
                                          {spvalue.asetName1 === "ALGO"?
                                          (<> <img  width="31" height="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"></img></>):
                                          spvalue.asetName1 === "USDC" ?
                                        (<> <img  width="31" height="30" src={usdclogo}></img></>):
                                        spvalue.asetName1 === "ELEM" ?
                                        (<> <img  width="31" height="30" src={elem}></img></>):
                                        spvalue.asetName1 === "TAU" ?
                                        (<> <img  width="31" height="30" src={tau}></img></>):
                                        (<> <img  width="31" height="30" src={logo}></img></>)}
                                         
                                            {spvalue.asetName1}
                                            </Button>
                                      </div>
                                    </div>

                                    <div className="mb-2 pt-1 text-center">
                                        <Button variant='reset'>
                                            <svg width="62" height="61" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.919922" y="60.1743" width="60.0313" height="60.1591" rx="30" transform="rotate(-90 0.919922 60.1743)" fill="white"/>
                                                <path d="M30 29.1584V23.1553H32V29.1584H38V31.1595H32V37.1626H30V31.1595H24V29.1584H30Z" fill="black"/>
                                            </svg>
                                        </Button>
                                    </div>

                                    <div className="mb-20">
                                        <label className='d-flex align-items-center justify-content-between'>T0 <small>Balance: { a2balance > 0 ? parseFloat(a2balance/1000000).toFixed(4) :'0.0'}  </small></label>

                                        <div className="balance-card d-flex align-items-center justify-content-between">
                                          {amount2Value ? (<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  value={amount2Value}  placeholder="0.0" autoComplete='off'></input>
                                          </>):(<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  onChange={e => SetValue2(e.target.value)}  placeholder="0.0" autoComplete='off'></input>
                                          </>)}
                                          <Button variant='filter'  >
                                          {spvalue.asetName2 === "ALGO"?
                                          (<> <img  width="31" height="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"></img></>):
                                          spvalue.asetName2 === "USDC" ?
                                        (<> <img  width="31" height="30" src={usdclogo}></img></>):
                                        spvalue.asetName2 === "ELEM" ?
                                        (<> <img  width="31" height="30" src={elem}></img></>):
                                        spvalue.asetName2 === "TAU" ?
                                        (<> <img  width="31" height="30" src={tau}></img></>):
                                        (<> <img  width="31" height="30" src={logo}></img></>)}
                                            {spvalue.asetName2}</Button>
                                            {/* <FilterDropdown2 /> */}
                                        </div>
                                    </div>

                                    <div className="balance-card py-2 mb-10 d-flex align-items-center justify-content-between">
                                        <label>Pool Fee</label>

                                        <h6>0.86 ALGO</h6>
                                    </div>

                                    <p className="text-red">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                        unverified assets alert, be careful! */}
                                    </p>
{appOpted ? (<>
  {shownvalue ? (<>
  <Button className='btn w-100 mb-20 text-none btn-grad btn-xl' onClick={()=>mint1call(appID_global,samount1,samount2,spvalue.asetName1,spvalue.asetName2)}>ADD LIQUIDITY</Button>

</>):(<>
  <Button className='btn w-100 mb-20 text-none btn-grad btn-xl' onClick={()=>optIn(parseInt(spvalue.asetId3))}>Asset Opt-In</Button>

</>)}
</>):(<>
  <Button className='btn w-100 mb-20 text-none btn-grad btn-xl' onClick={()=>appOptIn()}>App Opt-In</Button>

</>)}


                                    <p className='d-flex'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </span>
                                        Once you create the pool, other users will be able to add liquidity to it.
                                    </p>

                                </Col>
                            </Row>
                                </Modal.Body>
            </Modal>
           
            <ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>

            <div className="table-group-outer table-group-lg">
                <div className="table-group-head ">
                    <div className="table-group-tr">
                        <div className="table-group-th table-group-td-count">#</div>
                        <div className="table-group-th">Name</div>
                        <div className="table-group-th"></div>
                        {/* <div className="table-group-th"></div> */}
                        {/* <div className="table-group-th"> */}
                            {/* <Dropdown>
                                <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                    Liquidity
                                </Dropdown.Toggle>

                              
                            </Dropdown> */}
                        {/* </div> */}
                        <div className="table-group-th  align-items-center">LP total supply</div>
                        <div className="table-group-th  align-items-center">Volume</div>
                        <div className="table-group-th  align-items-center">Slippage fees </div>
                        <div className="table-group-th">Coverage ratio</div>
                        {/* <div className="table-group-th">POOL</div> */}
                        {/* <div className="table-group-th"></div> */}
                        {/* <div className="table-group-th text-end">fees (yearly)</div> */}
                    </div>
                </div>
               

                    {/* {dbvalues ===null || dbvalues ==="" || dbvalues ===undefined || dbvalues.length == 0?(<>
                      
                        <div className="table-group-body text-gray-AA">
               <span className="d-block text-center">
                  <svg version="1.1" id="L9" width="80" height="80" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="0 0 100 100" enable-background="new 0 0 0 0">
                        <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                          <animateTransform 
                            attributeName="transform" 
                            attributeType="XML" 
                            type="rotate"
                            dur="1s" 
                            from="0 50 50"
                            to="360 50 50" 
                            repeatCount="indefinite" />
                      </path>
                    </svg>
                </span>
               <div className="table-group-body text-gray-AA" >

           
                    </div>
</div>
                    </>):(<> */}
                      <div className="table-group-tr">
<div className="table-group-td table-group-td-count">1</div>
<div className="table-group-td">
    <div className="d-flex align-items-center td-cell">
        <img src={usdclogo} alt='icon' />
        <span className=' text-truncate'>USDC</span>
    </div>
</div>
<div className="table-group-td"></div>
<div className="table-group-td">{parseFloat(swapstate.Totalsupply/1000000).toFixed(3)}</div>
 <div className="table-group-td">$ {parseFloat(swapstate.cashAdded/1000000).toFixed(3)}</div>
{/* <div className="table-group-td">{parseFloat(pageSize.volume/1000000).toFixed(3)}</div> */}
<div className="table-group-td"> $ {parseFloat(Math.abs(swapstate.SlippageFee)/1000000).toFixed(3)  }</div>
<div className="table-group-td">{swapstate.cashAdded?formatter(swapstate.cashAdded/swapstate.Liability):'0.0'}</div>

</div>
<div className="table-group-tr">
<div className="table-group-td table-group-td-count">2</div>

<div className="table-group-td">
    <div className="d-flex align-items-center td-cell">
        <img src={usdtlogo} alt='icon' />
        <span className=' text-truncate'>USDT</span>
    </div>
</div>
<div className="table-group-td"></div>

<div className="table-group-td">{parseFloat(swapstate1.Totalsupply/1000000).toFixed(3)}</div>

 <div className="table-group-td">$ {parseFloat(swapstate1.cashAdded/1000000).toFixed(3)}</div>


{/* <div className="table-group-td">{parseFloat(pageSize.volume/1000000).toFixed(3)}</div> */}
<div className="table-group-td">$ {parseFloat(Math.abs(swapstate1.SlippageFee)/1000000).toFixed(3)  }</div>
<div className="table-group-td">{swapstate1.cashAdded?formatter(swapstate1.cashAdded/swapstate1.Liability):'0.0'}</div>

</div>
<div className="table-group-tr">
<div className="table-group-td table-group-td-count">3</div>
<div className="table-group-td">
    <div className="d-flex align-items-center td-cell">
        <img src={taulogo} alt='icon' />
        <span className=' text-truncate'>TAU</span>
    </div>
</div>
<div className="table-group-td"></div>

<div className="table-group-td">{parseFloat(swapstate2.Totalsupply/1000000).toFixed(3)}</div>

 <div className="table-group-td">$ {parseFloat(swapstate2.cashAdded/1000000).toFixed(3)}</div>


{/* <div className="table-group-td">{parseFloat(pageSize.volume/1000000).toFixed(3)}</div> */}
<div className="table-group-td">$ {parseFloat(Math.abs(swapstate2.SlippageFee)/1000000).toFixed(3)  }</div>
<div className="table-group-td">{swapstate2.cashAdded?formatter(swapstate2.cashAdded/swapstate2.Liability):'0.0'}</div>

</div>              
                        {/* {currentPosts.map((pageSize)=>{
                        
                            return(<>
                            <div className=" text-gray-AA" >
                            
                            
<div className="table-group-tr">
<div className="table-group-td">
    <div className="d-flex align-items-center td-cell">
        <img src={checklogo(pageSize.AssetName1,pageSize.AssetId1)} alt='icon' />
        <img src={checklogo(pageSize.AssetName2,pageSize.AssetId2)} alt='icon' />
        <span className=' text-truncate'>{pageSize.AssetName1}/{pageSize.AssetName2}</span>
    </div>
</div>
<div className="table-group-td"></div>


{(pageSize.AssetName1=== "ALGO" || pageSize.AssetName2 ==="ALGO") ? 
(<>
<div className="table-group-td">$ {parseFloat((pageSize.tvl/1000000)* (algoPrice/1000000)).toFixed(3)}</div>
</>) :
 (pageSize.AssetName1=== "USDC" || pageSize.AssetName2 ==="USDC") ?
 (<>
 <div className="table-group-td">$ {parseFloat((pageSize.tvl/1000000) * usdcPrice).toFixed(3)}</div>
 </>):
 (<>
 <div className="table-group-td">{parseFloat(pageSize.tvl/1000000).toFixed(3)}</div>
 </>)}

<div className="table-group-td">{parseFloat(pageSize.volume/1000000).toFixed(3)}</div>
<div className="table-group-td">$ {parseFloat((pageSize.fees * (algoPrice/1000000))/1000000).toFixed(3)  }</div>
<div className="table-group-td">{parseFloat(pageSize.fees/1000000).toFixed(3)}</div>

</div>
</div></>)
 
})}
                     */}
                     {/* </>)} */}
                
            </div>

            <div className="pagination-footer d-flex align-items-center justify-content-between">
                {/* <p>showing {startingpage+1}-{startingpage + 4} from {parseFloat(dbvalues.length/4).toFixed(0)} Page</p> */}

                <div className="d-flex pagination align-items-center">
                    {/* <Button variant='arrow'  onClick={()=>{setpostcall()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Button>
                    <Button variant='arrow' onClick={()=>{setincrm()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </Button> */}
{/* 
                    <Button variant='page' onClick={()=>{setpostcall()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Button>
                    <Button variant='page' onClick={()=>{setincrm()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </Button> */}
                </div>
            </div>
         
           


        </div>
    );
};

export default TopLiquidity;
