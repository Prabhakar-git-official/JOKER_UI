import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk, { Algod } from "algosdk";
import { useEffect,useState } from "react";
import config from "../configurl";
import axios from 'axios';
import { AppId,escrowProgram } from "./swapConfig";
import node from './DashboardNew/nodeapi.json';
const myAlgoWallet = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const baseServer = node['algodclient'];
const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

const indexerClient = new algosdk.Indexer('',node['indexerclient'], '');

export const walletBalance = async(idv)=>{
 
  let k;
  let k1;
  if(idv > 0){
    try{
      let ln = await axios.get(`${node['algodclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/assets/${idv}`);
      // console.log("ln",ln,ln.data['asset-holding'].amount)
      k = ln.data['asset-holding'].amount;
      k1 = false;
    }catch (err) {
      let ev = err.toString()
      let present = ev.indexOf("404")
      if(present > 1){
        console.error("err",err,present);
        k = 0;
        k1 = true;
      }
      
    }
    
  }
  else{
    let account1_info = (await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do());
    // console.log("accin",JSON.stringify(account1_info))      
    let calc=JSON.stringify(account1_info.account.amount); 
    k = calc;
    k1 = false;
  }
  
 
  return [k,k1];
}

export const escrowdata =async(appid,asset1Id,asset2Id) =>{
  let data = escrowProgram;
  let replacedData = data.replaceAll("Token1",asset1Id).replaceAll("Token2",asset2Id).replaceAll("appId",appid);
  let results = await algodClient.compile(replacedData).do();

  let program = new Uint8Array(Buffer.from(results.result, "base64"));

  // let lsig = algosdk.makeLogicSig(program);
  let lsig = new algosdk.LogicSigAccount(program);
  return lsig;
}
export const escrowdatacompile =async(appid,asset1,asset2) =>{

  let data = escrowProgram;
 
  let asset1Id,asset2Id;
//console.log("asset",asset1,asset2)
  if(asset1 === NaN || asset1 === undefined || asset1 === null||asset1 === ""){
      asset1Id = 0;
  }
  if(asset2 === NaN || asset2 === undefined || asset2 === null||asset2 === ""){
      asset2Id = 0;
  }
  if(asset1 > asset2){
      asset1Id = asset1;
      asset2Id = asset2;
  }
  else{
      asset1Id = asset2;
      asset2Id = asset1;
  }
// console.log("Token1",asset1Id,asset2Id)
  let replacedData = data.replaceAll("Token1",asset1Id).replaceAll("Token2",asset2Id).replaceAll("appId",appid);
  // console.log("compiled",replacedData)
  let results = await algodClient.compile(replacedData).do();

  return results;
}

export const addLiquidity =async(appid,asset1,asset2) =>{

let data = escrowProgram;

let asset1Id,asset2Id;
if(asset1 === NaN || asset1 === undefined || asset1 === null||asset1 === ""){
    asset1Id = 0;
}
if(asset2 === NaN || asset2 === undefined || asset2 === null||asset2 === ""){
    asset2Id = 0;
}
if(asset1 > asset2){
    asset1Id = asset1;
    asset2Id = asset2;
}
else{
    asset1Id = asset2;
    asset2Id = asset1;
}
// console.log("Token1",asset1Id,asset2Id)
let replacedData = data.replaceAll("Token1",asset1Id).replaceAll("Token2",asset2Id).replaceAll("appId",appid);
let results = await algodClient.compile(replacedData).do();
let accountInfoResponse = await indexerClient.lookupAccountByID(results.hash).do();

return accountInfoResponse;
}
export const asset1_price = (s1, s2) =>{
   let z = s2/s1;
   return z;
}
export const asset2_price = (s1, s2) =>{
  let z = s1/s2;
  return z;
}
export const convert1 = (asset_amount,s1,s2) =>{
  return (asset_amount * asset1_price(s1,s2));
}

export const convert2 = (asset_amount,s1,s2) =>{
  return (asset_amount * asset2_price(s1,s2));
}



export const checkotp = async(appid)=>{
  let k1 = false;
  try{
    let ch = await axios.get(`${node['algodclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/applications/${appid}`);
    console.log("ch",ch.data)
    k1 = true;
  }catch(err){
    let ev = err.toString()
    let present = ev.indexOf("404")
    if(present > 1){
      console.error("err",err,present);
      k1 = false;
    }
  }


  return k1;
}
export const checkotpforanotheraddress = async(appid,addr)=>{
  let k1 = false;
  try{
    let ch = await axios.get(`${node['algodclient']}/v2/accounts/${addr}/applications/${appid}`);
    console.log("ch",ch.data)
    k1 = true;
  }catch(err){
    let ev = err.toString()
    let present = ev.indexOf("404")
    if(present > 1){
      console.error("err",err,present);
      k1 = false;
    }
  }


  return k1;
}
export const assetOptin = async(assid)=>{
let k = false;
if(parseInt(assid) === 0){
  k = true;
}
else{
  let v = await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
//console.log("assets",v.account)
  if(v.account.assets){
    for(let i = 0; i <  v.account.assets.length; i++)
    {
      // console.log("walletstop",v.account.assets[i]['asset-id']);
      if(v.account.assets[i]['asset-id'] === parseInt(assid) ){
        k = true;
        // console.log("walletstop1",i);
        break;
        
     }
    ////console.log("walletcrash",i);
   }
  }
  else{
    k = false;
  }
 

}


return k;
}

export const find_balance = async(assetId) =>{
  let k;
  if(assetId > 0){
      
      let account1_info = (await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do());
      
      account1_info.account.assets.map((role,index)=>{
          // console.log("amount",role['asset-id']);
          if(role['asset-id'] === parseInt(assetId)){
              // console.log("amount",role);
              k = role.amount;
              // console.log("amount",k);
          }
      })
  }
  else{
      let account1_info = (await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do());
      // console.log("accin",JSON.stringify(account1_info))      
      let calc=JSON.stringify(account1_info.account.amount); 
      k = calc;
      // console.log("kvalue",account1_info)
  }
  return k;
  

}

export const find_balance_escrow = async(assetId,escrow) =>{
  let k;
  
      let v = await indexerClient.lookupAssetBalances(assetId).do();
      // console.log("vvalue",v)
      v.balances.map((role,index)=>{
        if(role.address === escrow){
          k = role.amount;
        }
      })
  return k;
      
}
export const paddingValues = (assetid) =>{
  let k ="0x6f" + ( (Number(assetid).toString(16)).padStart(16, '0'))
//console.log("v",k)
  return k;
}
export const readingLocalstate = async(client, account) =>{
  
  let accountInfoResponse = await indexerClient.lookupAccountByID(account).do();
// console.log("acc",accountInfoResponse.account)
  return accountInfoResponse.account;
}
export const readingLocalstateWithAppid = async(appID) =>{
  let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${appID}`);
  // console.log("local",ln.data['apps-local-states']['0']['key-value'])
  // let accountInfoResponse = await indexerClient.lookupAccountByID(account).do();
  // let acc = accountInfoResponse.account['apps-local-state'];
  let keyvalue = ln.data['apps-local-states']['0']['key-value'];
//console.log("keyvalue",keyvalue)
  let edata =[];
  if(keyvalue === null || keyvalue === "" || keyvalue === undefined || keyvalue === 0){
    edata = 0;
  }
  else{
// keyvalue.map(async(v)=>
for(let v = 0;v<keyvalue.length;v++)
{
    // console.log("v",keyvalue[v]['key'])
      let set = Buffer.from(keyvalue[v]['key'], 'base64');
      
  //for decoding escrow address
      let b = (algosdk.encodeAddress(set.slice(0,32)))        
      // escAddr.push(b);

   //get three assets
   let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${b}/created-assets`);
  // console.log("ln",ln.data['assets']['0']['index'],ln.data)
  let assetId3 = ln.data['assets']['0']['index'];
  let asname =ln.data['assets']['0']['params']['name'];
  //  let accountInfoResponse = await algodClientGet.accountInformation(b).do();

  //  let assetId3 = accountInfoResponse['created-assets'][0]['index'];
  // let asname =  await indexerClient.lookupAssetByID(assetId3).do();


  //for decoding asset address
      let cal = await (algosdk.decodeUint64(set.slice(33,41)));
      let assId ;
      if(cal === 0){
        assId = "ALGO";
      }
      else{
        let asid = await axios.get(`${node['indexerclient']}/v2/assets/${cal}`);
        // console.log("asid",asid.data)
    //asset id
         assId = asid.data['asset']['params']['unit-name'];
      }
     
    //console.log((assId.asset.params.name));
      // assetname.push(assId.asset.params.name);

      let assBalance = keyvalue[v]['value']['uint']
    //console.log("balance",assBalance)
      // assetBalance.push(assBalance);

     let  ebdata ={
          "escrowAddress":b,
          "thirdasset":(asname).toUpperCase(),
          "assetid":cal,
          "assetname":(assId).toUpperCase(),
          "asbalance":assBalance
      }
      edata.push(ebdata)
  // //console.log("edata",edata)
  }
  // )
  }
 
  
  //console.log("edata",edata)
  return edata;
}
export const decodLocalState = (value)=>{
  let dec = new Uint8Array(Buffer.from(value, "base64"));
  let de = (algosdk.decodeUint64([dec[1],dec[2],dec[3],dec[4],dec[5],dec[6],dec[7],dec[8]]));
  return de;
}

export const assetName= async(assetid) =>{
  const assets = await indexerClient.lookupAssetByID(assetid).do();
  return (assets.asset.params.name);
}

export const assertReserver12 = async(accountInfoResponse)=>{

  let s1,s2;
  // for(let i=0;i<15;i++)
  accountInfoResponse['apps-local-state'][0]['key-value'].map((r,i)=>{
    if(r['key'] === "czE="){
      s1 = r['value']['uint'];
    }
    if(r['key']  ===  "czI="){
      s2 = r['value']['uint'];
     //console.log("s2",s2)
     }
  })
  



  return [s1,s2] ;

}
export const assert1Reserve = (accountInfoResponse) =>{
  let s1;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys === "czE="){
          s1 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
        // console.log("s1",s1)
          break;
      }
  }
  return s1;
}

export const assert2Reserve = (accountInfoResponse) =>{
  let s2;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys ===  "czI="){
       s2 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
      //console.log("s2",s2)
        break;
      }
  }
  return s2;
}
export const assert3Reserve = (accountInfoResponse) =>{
  let s3;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys ===   "aWx0"){
       s3 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
       break;
      //console.log("s3",s3)
      }
  }
  return s3;
}

export const rewardasset1 = async(asset1,appid) =>{
  let rs1;
  for(let i=0;i<15;i++){
      // let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${appid}`);
      // console.log("local",ln.data['apps-local-states']['0']['key-value'])
      // let accountInfoResponse = await indexerClient.lookupAccountByID(account).do();
      // let acc = accountInfoResponse.account['apps-local-state'];
      let keys = ln.data['apps-local-states']['0']['key-value'];
      // console.log("keys",keys)
      if(keys.slice(0,2) === "bw"){
        //console.log("a1","coming")
          let a1 = decodLocalState(String(keys));
        //console.log("a1",a1)
          if(a1 === Number(asset1)){
            rs1 = (ln.data['apps-local-states']['0']['key-value'][i]['value']['uint'])
        //console.log("outstanding", rs1  )
            break;
          } 
         
        }   
  }
  return rs1;
}
export const rewardasset2 = (accountInfoResponse,asset2) =>{
  let rs2;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys.slice(0,2) === "bw"){
          let a1 = decodLocalState(String(keys));
        //console.log("a1",a1)
        
          if(a1 === Number(asset2)){
              rs2 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
              break;
          //console.log("ilt", rs2)
          } 
          
        }   
  }
  return rs2;
}
export const rewardasset3 = (accountInfoResponse,asset3) =>{
  let rs3;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys.slice(0,2) === "bw"){
          let a1 = decodLocalState(String(keys));
        //console.log("decodLocalState",a1,String(asset3))
         
          if(a1 === Number(asset3)){

              rs3 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
              break;
            //console.log("issued liquidity", rs3 )
          } 
          
          
        }   
  }
  return rs3;
}
export const asset1id = async(accountInfoResponse) =>{
  let s1;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys === "YTE="){
       let s = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
      //console.log("s1",s1)
        let assId =  await indexerClient.lookupAssetByID(s).do();
      //console.log((assId.asset.params.name));
        s1 = assId.asset.params.name;
        break;
      }
  }
  return s1;
}
export const asset2id =async(accountInfoResponse) =>{
  let s1;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys === "YTI="){
          let s = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
        //console.log("s1",s1)
          let assId =  await indexerClient.lookupAssetByID(s).do();
        //console.log((assId.asset.params.name));
          s1 = assId.asset.params.name;
          break;
      }
  }
  return s1;
}
export const asset3id = (accountInfoResponse) =>{
  let s1;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys === "bHQ="){
       s1 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
       break;
      //console.log("s1",s1)
      }
  }
  return s1;
}
export const asset1WithId = async(accountInfoResponse) =>{
  let s1;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys === "YTE="){
       s1 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
       break;
      // //console.log("s1",s1)
      //   let assId =  await indexerClient.lookupAssetByID(s).do();
      // //console.log((assId.asset.params.name));
      //   s1 = assId.asset.params.name;
      }
  }
  return s1;
}
export const asset2WithId =async(accountInfoResponse) =>{
  let s1;
  for(let i=0;i<15;i++){
      let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
      // console.log("keys",keys)
      if(keys === "YTI="){
          s1 = (accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
          break;
          // console.log("s1",s1)
          // let assId =  await indexerClient.lookupAssetByID(s).do();
          // console.log((assId.asset.params.name));
          // s1 = assId.asset.params.name;
      }
  }
  return s1;
}
export const  amount_out_with_slippage =(outAmount,fees)=>{
  return outAmount - (outAmount * fees);
}
export const price =(inA,outA)=>{
  return outA / inA ;
}
export const priceOfCoin1 = async()=>{
  let priceofcoin;
  await axios
  .get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  )
  .then(res => {
    let ap = (res.data);
  // //console.log("result",res.data);
    ap.map((a)=>{
      if(a.id === "algorand"){
        priceofcoin = (a.current_price)
      //console.log("a.id", a.current_price )
      } 
          
})
  })
 return priceofcoin;
}
export const priceOfCoin2 = async()=>{
  let priceofcoin1val;
 await axios
  .get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  )
  .then(res => {
    let ap = (res.data);
  // //console.log("result",res.data);
    ap.map((a)=>{
      if(a.id === "usd-coin"){
        priceofcoin1val = (a.current_price)
       
      //console.log("a.id1", a.current_price )
      } 
          
})
  })
  return priceofcoin1val;
}
export const walletAsset =async(indx,addr)=>{
  const assets = await indx.lookupAccountByID(addr).do();
  return assets.account['assets'];
}
export const walletAssetDetails =async(assdetails)=>{
  let avalues=[];
  if(assdetails === null || assdetails === undefined || assdetails === ""){
      
  }
  else{
      assdetails.map(async(r,i)=>{
          const assets = await indexerClient.lookupAssetByID(r['asset-id']).do();
          let k =(assets.asset.params['unit-name']);
          let k1 =(assets.asset.params['name']);
          let kvalue ={
              "unitname":k,
              "name":k1,
              "amount":r.amount,
              "id":r['asset-id']
          }
          avalues.push(kvalue);
      })
  }
 
 
  return avalues;
}
export const usdcbalance = async(assetid)=>{
  let asb;
  const assetBalances = await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
//console.log("assetid",assetBalances.account.assets);
if(assetBalances.account.assets){
  for(let i = 0;i<assetBalances.account.assets.length;i++){
    if(assetBalances.account.assets[i]['asset-id'] ==parseInt(78045387))
        {
            asb = assetBalances.account.assets[i]['amount'];
            break;
          //console.log("assetid",r['amount']);
        }
  }
}
else{
  asb =0;
}
 
  return asb;
}
export const checkassetin =async(id)=>{
  let assetid = await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
// //console.log("assetid",assetid.account['assets']);
  let k;
  for(let i = 0;i<assetid.account['assets'].length;i++){
    if(assetid.account['assets'][i]['asset-id'] === parseInt(id)){
      k = true;
      break;
    }
  }
  
// console.log("assetid",k);
  return k;
}

export const assetUnitName = async(v) =>{
const assets = await indexerClient.lookupAssetByID(v).do();
let unitname = (assets.asset.params['unit-name']);
let name = (assets.asset.params['name']);
let id = (assets.asset.index);
return [unitname,name,id];
}


export const swapinput =async(appid,asset1,asset2) =>{

let data = escrowProgram;

let asset1Id,asset2Id;
if(asset1 === NaN || asset1 === undefined || asset1 === null||asset1 === ""){
    asset1Id = 0;
}
if(asset2 === NaN || asset2 === undefined || asset2 === null||asset2 === ""){
    asset2Id = 0;
}
if(asset1 > asset2){
    asset1Id = asset1;
    asset2Id = asset2;
}
else{
    asset1Id = asset2;
    asset2Id = asset1;
}
// console.log("Token1",asset1Id,asset2Id)
let replacedData = data.replaceAll("Token1",asset1Id).replaceAll("Token2",asset2Id).replaceAll("appId",appid);
// console.log("compiled",replacedData)
let results = await algodClient.compile(replacedData).do();
console.log("enter")
let compiled,k1;
let aset3d;
let rs1 = 0;
let rs2 = 0;
let rs3 = 0;
try{
  compiled = await readingLocalstate(algodClientGet,results.hash);
  let as3 = await axios.get(`${node['algodclient']}/v2/accounts/${results.hash}`); 
  aset3d = (as3.data['created-assets']['0'].index) 
  k1 = false;
  rs1 = await assert1Reserve(compiled);
  rs2 = await assert2Reserve(compiled);
  rs3 = await assert3Reserve(compiled);
}catch(err){
  let ev = err.toString()
      let present = ev.indexOf("404")
      if(present > 1){
        console.error("err",err,present);
        k1 = true;
      }
}


// console.log("reserver1,reserve2",rs1,rs2)
return [rs1,rs2,k1,aset3d,rs3];
}

export const amount1_input =async(asset1,asset2,rs1,rs2)=>{
let asset1Id,asset2Id,out1,out2;
//   if(asset1 > asset2){
//      out = await asset1_price(rs1,rs2);
//     asset1Id = asset1;
//     asset2Id = asset2;
// }
// else{
//     asset1Id = asset2;
//     asset2Id = asset1;
//     out = await asset2_price(rs1,rs2);
// }
out1 = await asset1_price(rs1,rs2);
out2 = await asset2_price(rs1,rs2);
return [out1,out2];
}

export const minAlgoBalance =async()=>{
  let ln = await axios.get(`${node['algodclient']}/v2/accounts/${localStorage.getItem("walletAddress")}`);
  // console.log("ln",ln.data)

// let acindo = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
// console.log("accinfo",acindo.amount -acindo['min-balance']) 
return ln.data.amount - ln.data['min-balance'];
}
export const mintotrx = async()=>{
  let ln = await axios.get(`${node['algodclient']}/v2/accounts/${localStorage.getItem("walletAddress")}`);

//console.log("s1",ln.data['min-balance'])
  return ln.data['min-balance']
}

export const swappingcalculations = async(appId,tokId1,tokId2)=>{
    let dtdata = await escrowdatacompile(appId,parseInt(tokId1),parseInt(tokId2));
   
      let compiled = await readingLocalstate(algodClientGet,dtdata.hash)
      let re1 = await assert1Reserve(compiled);
      let re2 = await assert2Reserve(compiled); 
      let re3 = await assert3Reserve(compiled); 
      // console.log("dtdata",dtdata)
      let accountInfoResponse = await algodClientGet.accountInformation(dtdata.hash).do();
    // console.log("account",accountInfoResponse);
      let as3 = accountInfoResponse['created-assets'][0]['index'];
     
      let program = new Uint8Array(Buffer.from(dtdata.result, "base64"));

      // let ls = algosdk.makeLogicSig(program);
      let ls = new algosdk.LogicSigAccount(program);

      return [ls,re1,re2,re3,as3]
}

export const addLiqFunction =async(appid,asn1,asn2)=>{
let results = await escrowdatacompile(appid,asn1,asn2);
  let compiled = await readingLocalstate(algodClientGet,results.hash)
  let se1 = await assert1Reserve(compiled);
  let se2 = await assert2Reserve(compiled); 
  let ilet = await assert3Reserve(compiled);
  let ass3id = await compiled['created-assets'][0]['index'];
    let assetId3 = ass3id;
    let aopt = await assetOptin(assetId3);
  //console.log("first",assetId3) 
    // let program = new Uint8Array(Buffer.from(results.result, "base64"));

    //   let ls = algosdk.makeLogicSig(program);
    //console.log("dat",ass3id,aopt,compiled,se1,se2,ilet)
return [ass3id,aopt,compiled,se1,se2,ilet]
}

export const As3WithId =async(compiled)=>{
// console.log("compiled",compiled['created-assets']['0'].index)
let ass3id = await compiled['created-assets']['0']['index'];
let aopt = await assetOptin(ass3id);
return aopt;
}

export const burnassetamount = async(asset1,asset2,appid)=>{
  let addr = await escrowdatacompile(appid,asset1,asset2)
//console.log("addr",addr.hash)
  let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${addr.hash}/apps-local-state?application-id=${appid}`);
 
  let keys = ln.data['apps-local-states']['0']['key-value'];
//console.log("keys",keys)
  let rs1,rs2;
  keys.map((r,i) =>{
    let s = ln.data['apps-local-states']['0']['key-value'][i]['key']
    // console.log("a1",s.slice(0,2))
  if(s.slice(0,2) === "bw"){
      //console.log("a1","coming")
        let a1 = decodLocalState(String(s));
      // console.log("a1",a1)
        if(a1 === Number(asset1)){
          rs1 = (ln.data['apps-local-states']['0']['key-value'][i]['value']['uint'])
      //console.log("outstanding1", rs1  )
        
        }
        if(a1 === Number(asset2)){
           rs2 = (ln.data['apps-local-states']['0']['key-value'][i]['value']['uint'])
       //console.log("outstanding2", rs2  )
         
         } 
      
      } 
  })
    
 return[rs1,rs2];
}

export const updatealgobalance = async()=>{
  let account1_info = (await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do());
  // console.log("accin",JSON.stringify(account1_info))      
  let calc=JSON.stringify(account1_info.account.amount); 
  localStorage.setItem("walletbalance",(calc/1000000))
}

export const priceofalgoperusdc = async(algodClientGet)=>{
  let price ;
  let appById1 = await algodClientGet.getApplicationByID(parseInt(53083112)).do();
  for(let i=0;i<2;i++){
        
    if(appById1['params']['global-state'][i]['key']==="cHJpY2U="){
    let pricenew = appById1['params']['global-state'][i]['value']['uint'];
    price = (appById1['params']['global-state'][i]['value']['uint']);
  //console.log("priceofalgoperusdc",price);
    }
  }
  return price/1000000;
}

