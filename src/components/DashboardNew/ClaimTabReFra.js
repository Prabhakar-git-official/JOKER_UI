import React,{useEffect,useState} from 'react';
import { Card, Col} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { useHistory } from "react-router-dom";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import WalletConnect from "@walletconnect/client";
import configfile from '../../NFTFolder/config.json'
import { minAlgoBalance } from '../../NFTFolder/formula';
import dataauctionescrow from "../../Pyteal/escrowfractional";
import node from './nodeapi.json';
const algosdk = require('algosdk'); 
const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";

const ClaimTabReFra =({x})=>{

    let history=useHistory();

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[getIProfile,setgetIProfile]=useState([""]);               
    const[loader, setLoader] = useState(false);
    const [algobalanceApp,setalgobalanceApp] = useState("");    
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');    
    const [getValueId2,setValueId2] = useState([""]);    
    const [getassetprice,setassetprice]=useState("")     
    const [getTargetPrice,setTargetPrice]=useState("")              
    const [getTotal,setTotal]=useState("")              
    const [getTotal2,setTotal2]=useState("")              
    const [getListerLocal,setListerLocal]=useState("")                  
    const [getAssetAmountDc,setAssetAmountDc]=useState("")          
    // console.log("AssetAmount",getassetprice)
    // console.log("ListerLocal",getListerLocal)         
    // console.log("getTotal",getTotal)         
    // console.log("TP",getTargetPrice)         
    // console.log("getAssDc",getAssetAmountDc)                 
    // const [getTargetAmount,setTargetAmount] = useState("");         
    // const [getTotalValueNew,setTotalValueNew] = useState("");         
    // const [getCalculation,setCalculation] = useState("");    
    // console.log("GetCal",getCalculation)       
    // console.log("GetTar",getTargetAmount)
    // console.log("GetTotal",getTotalValueNew)
    //const [getTrue,setTrue] = useState(false);       
    useEffect(() => {        
        async function listenMMAccount() {    
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                  
        setalgobalanceApp("");      
        }
        else{          
            let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();                        
            setalgobalanceApp((accountInfo['account']['amount']/1000000));
      }    
    }
    listenMMAccount();
    }, []);
    const dbcallProfile=async()=>{            
      if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
      }
      else{
          const hasRestaurant = await fireDb.database()
          .ref(`userprofile/${localStorage.getItem('walletAddress')}`)
          .orderByKey().limitToFirst(1).once('value')
          .then(res => res.exists());          
          if(hasRestaurant)
          {
          let r=[];
          try {    
          firebase.auth().signInAnonymously().then((response)=>{           
          firebase.database().ref("userprofile").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
              if (data) {  
                  try{
  
                  
                  r.push({
                  Bio:data.val().Bio,
                  Customurl: data.val().Customurl,
                  Email: data.val().Email,
                  Imageurl:data.val().Imageurl,
                  Personalsiteurl: data.val().Personalsiteurl,
                  TimeStamp: data.val().TimeStamp,
                  Twittername: data.val().Twittername,
                  UserName: data.val().UserName,
                  WalletAddress: data.val().walletAddress,
                  bgurl:data.val().bgurl,
                  valid:data.val().valid
                  })                
              }   catch(e){                      
              }                 
              }
              else{
              setgetIProfile([""]);  
              }
              setgetIProfile(r);
          });         
          })         
          } catch (error) {          
          }                
          }else{
              setgetIProfile([""]);  
          }            
      }        
    }    
    useEffect(()=>{dbcallProfile()},[])        

    const waitForConfirmation = async function (algodclient, txId) {
        let status = (await algodclient.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {              
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
    };
    
    // const localstate2 =async(b)=>{
    //   const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');       
    //    let accountInfoResponse = await indexerClient.lookupAccountByID(b.ownerAddress).do();
    //    //let l =accountInfoResponse['account']['apps-local-state'][0]['key-value']['length']       
    //    let l =accountInfoResponse['account']['apps-local-state']['length']       
    //    for(let j=0;j<l;j++){
    //     let newV;
    //     for(let i = 0; i < l; i++)
    //      {          
    //          if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "cHJpY2U=")
    //          {
    //             setValueIdTotal(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint']);
    //             newV=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];              
    //              break;
    //          }   
    //      }             
    //      return newV;

    //    }
       
    // }       


     //pricelocal
     useEffect(()=>{
      const alreadyOpt2=async(x)=>{          
          console.log("OwnerAddress",x.CreatorAddress)
          let accountInfoResponse = await indexClient.lookupAccountByID(x.CreatorAddress).do();                                                 
          let jl =accountInfoResponse['account']['apps-local-state']['length']                        
          for(let j = 0; j < jl; j++){                
              if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
                  let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
                  for(let i = 0; i < l; i++)
                  {                                        
                      if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "cHJpY2Vsb2NhbA=="){
                          setassetprice(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);
                          break;
                      }
                  }

              }                
          }            
      }                
      alreadyOpt2(x);
  },[])


  //ListerLocal
  useEffect(()=>{
    const localstateNew2 =async(b)=>{        
        let accountInfoResponse = await indexClient.lookupAccountByID(x.CreatorAddress).do();                                                 
        let jl =accountInfoResponse['account']['apps-local-state']['length']                        
        for(let j = 0; j < jl; j++){                
            if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
                let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
                for(let i = 0; i < l; i++)
                {                                        
                    if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "TGlzdGVybG9jYWw="){                        
                        let dec = new Uint8Array(Buffer.from(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['bytes'], "base64"));
                        let addr = algosdk.encodeAddress(dec);
                        setListerLocal(addr);                              
                        break;
                    }
                }

            }                
        }                                       
    } 
    localstateNew2(x)
},[])

  //FALTargetPriceLocal
  useEffect(()=>{
    const localstateNew2 =async(b)=>{        
        let accountInfoResponse = await indexClient.lookupAccountByID(x.CreatorAddress).do();                                                 
        let jl =accountInfoResponse['account']['apps-local-state']['length']                        
        for(let j = 0; j < jl; j++){                
            if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
                let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
                for(let i = 0; i < l; i++)
                {                                        
                    if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "RkFMVGFyZ2V0UHJpY2VMb2NhbA=="){
                        //setValueIdNew2(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);  
                        setTargetPrice(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);                              
                        break;
                    }
                }

            }                
        }                                       
    } 
    localstateNew2(x)
},[])

//TotalLocal
useEffect(()=>{
  const localstateTotal =async(b)=>{        
      let accountInfoResponse = await indexClient.lookupAccountByID(x.CreatorAddress).do();                                                 
      let jl =accountInfoResponse['account']['apps-local-state']['length']                        
      for(let j = 0; j < jl; j++){                
          if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
              let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
              for(let i = 0; i < l; i++)
              {                                        
                  if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "VG90YWxsb2NhbA=="){
                      //setValueIdNew2(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);  
                      setTotal(((accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint'])*1000000));                              
                      break;
                  }
              }

          }                
      }                                       
  } 
  localstateTotal(x)
},[])


//assetamountlocal
useEffect(()=>{
  const localstateTotal =async(b)=>{        
      let accountInfoResponse = await indexClient.lookupAccountByID(x.CreatorAddress).do();                                                 
      let jl =accountInfoResponse['account']['apps-local-state']['length']                        
      for(let j = 0; j < jl; j++){                
          if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
              let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
              for(let i = 0; i < l; i++)
              {                                        
                  if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "YXNzZXRhbW91bnRsb2NhbA=="){
                      //setValueIdNew2(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);  
                      setTotal2(((accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint'])*1000000));                              
                      break;
                  }
              }

          }                
      }                                       
  } 
  localstateTotal(x)
},[])


//localAssetamountDC
useEffect(()=>{
  const localstateAssetamountDC =async(b)=>{        
      let accountInfoResponse = await indexClient.lookupAccountByID(x.CreatorAddress).do();                                                 
      let jl =accountInfoResponse['account']['apps-local-state']['length']                        
      for(let j = 0; j < jl; j++){                
          if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
              let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
              for(let i = 0; i < l; i++)
              {                                        
                  if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "YXNzZXRhbW91bnRsb2NhbERj"){
                      //setValueIdNew2(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);  
                      setAssetAmountDc(((accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint'])));                              
                      break;
                  }
              }

          }                
      }                                       
  } 
  localstateAssetamountDC(x)
},[])



    
    // const localstate2new =async(b)=>{
    //     const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');       
    //    let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
    //    let l =accountInfoResponse['account']['apps-local-state'][0]['key-value']['length']       
    //    let newVnew;
    //    let addr;
    //    for(let i = 0; i < l; i++)
    //      {         
    //          if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "TGlzdGVy")
    //          {               
    //             let dec = new Uint8Array(Buffer.from(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['bytes'], "base64"));
    //             addr = algosdk.encodeAddress(dec);             
    //              break;
    //          }   
    //      }             
    //      return addr;
    // } 
       
    // const localstate2copy =async(b)=>{
    //   const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');     
    //   let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();       
    //   let l =accountInfoResponse['account']['assets']['length']      
    //   let assamount;
    //    for(let i = 0; i < l; i++)
    //      {          
    //          if(accountInfoResponse['account']['assets'][i]['asset-id'] === parseInt(b.Assetid))
    //          {               
    //            assamount =accountInfoResponse['account']['assets'][i]['amount']      
    //             break;
    //          }   
    //      }
    //   return assamount           
    // } 

    useEffect(()=>{
      const localstate2 =async(b)=>{
      const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');      
      let accountInfoResponse = await indexerClient.lookupAccountByID(localStorage.getItem('walletAddress')).do();       
      let l =accountInfoResponse['account']['assets']['length']      
       for(let i = 0; i < l; i++)
         {          
             if(parseInt(accountInfoResponse['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))
             {
                setValueId2(accountInfoResponse['account']['assets'][i]['amount']);          
                break;
             }
   
         }      
      } 
      localstate2(x)
    },[])


    // useEffect(()=>{    
    //   const Testing =async(b)=>{
    //     const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');       
    //     let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
    //     let accountInfoResponseOwn = await indexerClient.lookupAccountByID(localStorage.getItem('walletAddress')).do();
    //     let accountInfoResponseduplicate = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
    //     let lown =accountInfoResponseOwn['account']['assets']['length']
    //     let lowduplicate =accountInfoResponseduplicate['account']['assets']['length']
    //     let l =accountInfoResponse['account']['apps-local-state'][0]['key-value']['length']        
    //     let escrowassetamount;
    //       for(let i = 0; i < lowduplicate; i++)
    //       {              
    //           if(parseInt(accountInfoResponseduplicate['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))//escrow asset value
    //           {                                    
    //               escrowassetamount = accountInfoResponseduplicate['account']['assets'][i]['amount']
    //               break;
    //           }   
    //       }         
          
    //       let localamount;
    //       for(let i = 0; i < lown; i++)
    //         {                
    //             if(parseInt(accountInfoResponseOwn['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))//local asset value
    //             {                                        
    //                 localamount = accountInfoResponseOwn['account']['assets'][i]['amount'];
    //                 break;
    //             }   
    //       }                    
    //       let newV;//Total => price changed
    //       for(let i = 0; i < l; i++)
    //         {                
    //             if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "cHJpY2U=")
    //             {                    
    //                 newV=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];    
    //                 setAssetPriceValue(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'])                            
    //                 break;
    //             }   
    //       }          

    //       let newValueTotal;//Total => price changed
    //       for(let i = 0; i < l; i++)
    //         {                
    //             if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "VG90YWw=")
    //             {                    
    //                 newValueTotal=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];    
    //                 setTotalValueNew(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'])                            
    //                 break;
    //             }   
    //       }          

    //       let newVnew;//assetamount
    //       for(let i = 0; i < l; i++)
    //         {                
    //             if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "YXNzZXRhbW91bnQ=")
    //             {             
    //                 newVnew=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];  
    //                 setAssetAmountValue(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'])                               
    //                 break;
    //             }   
    //       }          
    //       let newV2;//FALTargetPrice
    //       for(let i = 0; i < l; i++)
    //         {                
    //             if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "RkFMVGFyZ2V0UHJpY2U=")
    //             {                  
    //                 newV2=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];                 
    //                 setTargetAmount(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint']);
    //                 break;
    //             }   
    //       }   
    //       setCalculation(newVnew * ((parseFloat(newV))))             
    //       newV = (newV * newVnew)          
    //       if((newV === newV2) && (parseInt(escrowassetamount) === 0) && (parseInt(localamount) >= 10)){            
    //         setTrue(true)
    //       }
    //       else{                        
    //         setTrue(false)
    //       }
    //   }
    // Testing(x)
    // },[])
    
    // const Testing =async(b)=>{
    //   const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');       
    //   let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
    //   let accountInfoResponseOwn = await indexerClient.lookupAccountByID(localStorage.getItem('walletAddress')).do();
    //   let accountInfoResponseduplicate = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
    //   let lown =accountInfoResponseOwn['account']['assets']['length']
    //   let lowduplicate =accountInfoResponseduplicate['account']['assets']['length']
    //   let l =accountInfoResponse['account']['apps-local-state'][0]['key-value']['length']        
    //   let escrowassetamount;
    //     for(let i = 0; i < lowduplicate; i++)
    //     {              
    //         if(parseInt(accountInfoResponseduplicate['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))//escrow asset value
    //         {                                  
    //             escrowassetamount = accountInfoResponseduplicate['account']['assets'][i]['amount']
    //             break;
    //         }   
    //     }         
        
    //     let localamount;
    //     for(let i = 0; i < lown; i++)
    //       {                
    //           if(parseInt(accountInfoResponseOwn['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))//local asset value
    //           {                                      
    //               localamount = accountInfoResponseOwn['account']['assets'][i]['amount'];
    //               break;
    //           }   
    //     }                    
    //     let newV;//Total => price changed
    //     for(let i = 0; i < l; i++)
    //       {                
    //           if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "cHJpY2U=")
    //           {                    
    //               newV=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];  
    //               setAssetPriceValue(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'])                              
    //               break;
    //           }   
    //     }      
    //     let newValueTotal;//Total => price changed
    //       for(let i = 0; i < l; i++)
    //         {                
    //             if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "VG90YWw=")
    //             {                    
    //                 newValueTotal=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];    
    //                 setTotalValueNew(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'])                            
    //                 break;
    //             }   
    //       }              
    //     let newVnew;//assetamount
    //     for(let i = 0; i < l; i++)
    //       {                
    //           if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "YXNzZXRhbW91bnQ=")
    //           {             
    //               newVnew=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];   
    //               setAssetAmountValue(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'])                              
    //               break;
    //           }   
    //     }          
    //     let newV2;//FALTargetPrice
    //     for(let i = 0; i < l; i++)
    //       {                
    //           if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "RkFMVGFyZ2V0UHJpY2U=")
    //           {                  
    //               newV2=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];    
    //               setTargetAmount(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint']);             
    //               break;
    //           }   
    //     }   
    //     setCalculation(newVnew * ((parseFloat(newV))))                     
    //     newV = (newV * newVnew)
    //     if((newV === newV2) && (parseInt(escrowassetamount) === 0) && (parseInt(localamount) >= 10)){          
    //       setTrue(true)
    //     }
    //     else{                      
    //       setTrue(false)
    //     }
    // }

    const setpricedb=async(b)=>{      
        if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 3){
            toast.warning(`Insufficient balance to create NFT`,{autoClose:5000})
            handleHideLoad()            
        }
        else if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
            toast.warning(`please connect your wallet`,{autoClose:5000})
            handleHideLoad()            
        }        
        else{
        let minbalance=await minAlgoBalance()
        if(minbalance < (961000+2000)){
          toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
          handleHideLoad()
        }
        else{              
          // let NNewv=await localstate2(b)
          // let Nanew= await localstate2new(b)          
          //await Testing(b);        
          if((getTargetPrice === (getassetprice*getAssetAmountDc)) && (getTotal === 0 || getTotal2 === 0)){
          //move to owned Fractional-Db 
          handleShowLoad()
          let index = parseInt(configfile['fractionalappId']);  
          let dataopreplace = dataauctionescrow.replaceAll("AppID",parseInt(configfile['fractionalappId'])).replaceAll("AssId",parseInt(b.Assetid))                  
          const params = await algodClient.getTransactionParams().do();            
          params.fee = 1000;
          params.flatFee = true;                  
          let results = await algodClient.compile(dataopreplace).do();                
          let program = new Uint8Array(Buffer.from(results.result, "base64"));            
          let lsig = new algosdk.LogicSigAccount(program);                        
          try {                        
            let recv_escrow = lsig.address();
            let amount = 1000;                  
            let foreignassets = [];
            foreignassets.push(parseInt(b.Assetid));
      

            let transaction1u = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: localStorage.getItem('walletAddress'), 
              to: recv_escrow, 
              amount: amount,               
              note: undefined,  
              suggestedParams: params
             });

             let appArgu = [];       
             appArgu.push(new Uint8Array(Buffer.from("unfreeze")));                   
            
            const transaction2u = algosdk.makeApplicationNoOpTxnFromObject({
                from: localStorage.getItem('walletAddress'), 
                appIndex: index,
                accounts: [lsig.address()],
                appArgs: appArgu,                            
                suggestedParams: params
            });            
                        
            let ftxnasset = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({          
              from: recv_escrow, 
              note:undefined,
              assetIndex:parseInt(b.Assetid),
              freezeTarget:localStorage.getItem('walletAddress'), 
              freezeState:false, 
              suggestedParams: params
            }) 
            const groupIDu = algosdk.computeGroupID([ transaction1u, transaction2u,ftxnasset]);
            const txsu = [ transaction1u, transaction2u,ftxnasset];
            txsu[0].group = groupIDu;
            txsu[1].group = groupIDu;
            txsu[2].group = groupIDu;              
            let responseu = "";      
            if(localStorage.getItem("walletName") === "myAlgoWallet")
            {              
            const signedTx1u = await myAlgoWallet.signTransaction([txsu[0].toByte(),txsu[1].toByte()]);            
            const signedTx3u = algosdk.signLogicSigTransaction(txsu[2], lsig);                              
            responseu = await algodClient.sendRawTransaction([ signedTx1u[0].blob,signedTx1u[1].blob,signedTx3u.blob]).do();            
            await waitForConfirmation(algodClient, responseu.txId);            
            let idu = "https://testnet.algoexplorer.io/tx/" + responseu.txId; 
            toast.success(toastDiv(idu))                       
            }
            else if(localStorage.getItem("walletName") === "PeraWallet"){
              const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
              const txns = [txsu[0],txsu[1],txsu[2]]            
              const txnsToSign = txns.map(txn => {
              const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");            
              return {
                txn: encodedTxn,
              };
              });                      
              const signedTx5 = algosdk.signLogicSigTransaction(txns[2], lsig);          
              const requestParams = [ txnsToSign ];
              const request = formatJsonRpcRequest("algo_signTxn", requestParams);
              const result = await connector.sendCustomRequest(request);
              const decodedResult = result.map(element => {
              return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
              });          
              decodedResult[2] = signedTx5.blob;              
              responseu = await algodClient.sendRawTransaction(decodedResult).do()          
              await waitForConfirmation(algodClient, responseu.txId);                      
              let id = "https://testnet.algoexplorer.io/tx/" + responseu.txId;          
              toast.success(toastDiv(id));
              //done();          
            }            

            //owned db writes here
            fireDb.auth().signInAnonymously().then((responses)=>{                     
              let dateset=new Date().toDateString();                    
              fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem('walletAddress')}`).child(b.keyId).remove().then(()=>{
                fireDb.database().ref(`imageFractiontruebuy/${localStorage.getItem('walletAddress')}`).child(b.keyId).set({
                  Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:lsig.address(),keyId:b.keyId,
                  NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'),
                  TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
                  CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink,NFTModel:b.NFTModel
              }).then(()=>{                    
              let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                  const db = refactivity.push().key;                         
                  refactivity.child(db).set({
                  Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:"Unfreeze-Buy-NFT",keyId:db,
                  NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'),                
                  TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
                  CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
              })
                  .then(async()=>{          
                      toast.dismiss();                                                                        
                      toast.success(`claim NFT `,{autoClose: 3000});            
                      handleHideLoad()                      
                      await sleep(8000);
                      history.push("/my-NFT")
                      window.location.reload(false);                          
                  })                 
              })             
            })
            })

            } catch (err) {
              console.error(err);          
              toast.error(`your browser appearing issue`,{autoClose: 5000});            
              handleHideLoad()
            }                                              
          //
          }
          else{
          handleShowLoad()                         
          let index = parseInt(configfile['fractionalappId']);  
          let dataopreplace = dataauctionescrow.replaceAll("AppID",parseInt(configfile['fractionalappId'])).replaceAll("AssId",parseInt(b.Assetid))                
          const params = await algodClient.getTransactionParams().do();            
          params.fee = 1000;
          params.flatFee = true;                
          let results = await algodClient.compile(dataopreplace).do();                
          let program = new Uint8Array(Buffer.from(results.result, "base64"));           
          let lsig = new algosdk.LogicSigAccount(program);                       
        try {                        
        let recv_escrow = lsig.address();
        let amount = 3000;                  
        let foreignassets = [];
        foreignassets.push(parseInt(b.Assetid));      
        let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem('walletAddress'), 
          to: recv_escrow, 
          amount: amount, 
          note: undefined,  
          suggestedParams: params
        });
      
        let appArg = [];
        
        appArg.push(new Uint8Array(Buffer.from("reclaim")));               
        
        const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
            from: recv_escrow, 
            appIndex: index,
            appArgs: appArg,
            accounts: [b.CreatorAddress],
            foreignAssets:foreignassets,
            suggestedParams: params
          });
                  
          let ftxnasset = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({          
            from: recv_escrow, 
            note:undefined,
            assetIndex:parseInt(b.Assetid),
            freezeTarget:localStorage.getItem('walletAddress'), 
            freezeState:false, 
            suggestedParams: params
          })          

          const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem('walletAddress'),
            to: recv_escrow,
            assetIndex: parseInt(b.Assetid),
            note: undefined,
            amount: parseInt(getValueId2),
            suggestedParams: params
          });

          let transaction4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from:recv_escrow , 
            to:localStorage.getItem('walletAddress'), 
            amount: parseFloat((getValueId2*(parseFloat(getassetprice)/1000000))*1000000),                
            suggestedParams: params 
        });
                
                  
        const groupID = algosdk.computeGroupID([ transaction1, transaction2,ftxnasset , transaction3, transaction4]);
        const txs = [ transaction1, transaction2,ftxnasset , transaction3, transaction4];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
        txs[3].group = groupID;    
        txs[4].group = groupID;            
        //let response = "";      
        if(localStorage.getItem("walletName") === "myAlgoWallet")
        {              
        const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
        const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
        const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
        const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);        
        let response;
        response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob,signedTx4.blob ]).do();              
        await waitForConfirmation(algodClient, response.txId);            
        let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
        toast.success(toastDiv(id));        
        let cl=response.txId;            
          //db here                  
          fireDb.auth().signInAnonymously().then((responses)=>{                     
            let dateset=new Date().toDateString();                    
            fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem('walletAddress')}`).child(b.keyId).remove().then(()=>{            
            let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                const db = refactivity.push().key;                         
                refactivity.child(db).set({
                Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:"Reclaim-Algos",keyId:db,
                NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'),                
                TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
                CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
            })
                .then(async()=>{          
                    toast.dismiss();                                                                        
                    toast.success(`claim Algos `,{autoClose: 3000});            
                    handleHideLoad()                      
                    await sleep(9000);
                    history.push("/my-NFT")
                    window.location.reload(false);                          
                })                 
            })                       
          })
          //db end here                  
        }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
          // const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
          // const txns = [txs[0], txs[1], txs[2],txs[3],txs[4]]            
          // const txnsToSign = txns.map(txn => {
          // const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");          
          // return {
          //   txn: encodedTxn,
          // };
          // });        
          //   const signedTx3 = algosdk.signLogicSigTransaction(txns[1], lsig);
          //   const signedTx4 = algosdk.signLogicSigTransaction(txns[2], lsig);
          //   const signedTx5 = algosdk.signLogicSigTransaction(txns[4], lsig);
          //   const requestParams = [ txnsToSign ];
          //   const request = formatJsonRpcRequest("algo_signTxn", requestParams);
          //   const result = await connector.sendCustomRequest(request);
          //   const decodedResult = result.map(element => {
          //     return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
          //   });            
          //   decodedResult[1] = signedTx3.blob;
          //   decodedResult[2] = signedTx4.blob;
          //   decodedResult[4] = signedTx5.blob;
          //   response = await algodClient.sendRawTransaction(decodedResult).do()          
          //   await waitForConfirmation(algodClient, response.txId);                      
          //   let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
          //   toast.success(toastDiv(id));
          toast.error(`Fractional NFT Not support in Perawallet`,{autoClose: 8000});   
          handleHideLoad()          
        }                                        
      } catch (err) {
              console.error(err);              
              toast.error(`your browser appearing issue`,{autoClose: 5000});            
              handleHideLoad()             
            }

          }                    
        }              
        }            
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
   

    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );
    return(           
                <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                <Card className='card-dash p-3 d-block border-0'>
                    <div className='card-img text-center mb-2'>
                            <img src={x.Imageurl} alt="image" className='img-fluid' />                        
                    </div>
                    <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>                        
                    </div>
                    <h5 className='mb-2'>{x.NFTName} <br />
                                        </h5>
                                        <h6 className='mb-2'>Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NFT </h6>
                                        <p className='subheading mb-0'>
                                        <span className='text-success'>
                                            {x.NFTPrice === null || x.NFTPrice === "" || x.NFTPrice === undefined ?(
                                                <>{configfile.nullvalue}</>
                                            ):(
                                              <>
                                              {getValueId2 === null || getValueId2 === undefined || getValueId2 === null ?(
                                                <h6>{(x.NFTPrice/1000000)}
                                                </h6>
                                              ):(
                                                <h6>{(x.NFTPrice/1000000)}
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(getValueId2)}
                                                </h6>
                                              )}                                                
                                              </>
                                            )}                                                                                    
                                        </span>
                                        </p>                                        
                                        <br/>
                    
                        {(getTargetPrice === (getassetprice*getAssetAmountDc)) && (getTotal === 0 || getTotal2 === 0) ?(
                        <>                                            
                        <h5 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />                        
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Claim</ButtonLoad> 
                        </h5>                         
                        </>
                      ):(
                          <h5 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />                                                
                          <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Re-Claim</ButtonLoad> 
                          </h5>                         
                        // <>                        
                        // {(getTargetPrice === (getTotal*1000000)) ? (
                        //   <h5 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />                        
                        //   <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Claim</ButtonLoad> 
                        //   </h5>                         
                        // ):(
                        //   <h5 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />                                                
                        //   <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Re-Claim</ButtonLoad> 
                        //   </h5>                         
                        // )}                        
                        // </>
                      )}                                             
                </Card>
                </Col>                
        
    )
}

export default ClaimTabReFra;