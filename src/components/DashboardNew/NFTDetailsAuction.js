import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Link ,useLocation} from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown, Table,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import CardImage from '../../assets/images/card-image.jpg';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import configfile from '../../NFTFolder/config.json'
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import datanewpriceAuction from '../../Pyteal/escrowauctionnew';
import Logo from '../../assets/images/algorand-logo.png';
import node from './nodeapi.json';
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import WalletConnect from "@walletconnect/client";
import { minAlgoBalance } from '../../NFTFolder/formula';
const algosdk = require('algosdk'); 
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";

const NFTDetailsAuction = (props) => {
    useEffect(() => {
        document.title = "ELEMENT | NFTDetails"
    }, [])
    const [AssetOpt,setToAssetOpt] = useState(false) 
    const [getprices,setprices]=useState(0)    
    const [minAlgo, setMinAlgo] = useState("");    
    const [getValueIdNew,setValueIdNew]=useState("")        
    const [getValueIdNewHB,setValueIdNewHB]=useState("")        
    console.log("Amount",getValueIdNew)
    console.log("AmountHB",getValueIdNewHB)
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[algobalanceApp,setalgobalanceApp]=useState([""]);    
    const location = useLocation();
    const history = useHistory();    
    const[getIProfile,setgetIProfile]=useState([""]); 
    const [toAppOptAuction,setToAppOptAuction] = useState(false);          
    const [toAuctiontimeend,settoAuctiontimeend] = useState("");     
    const [EscrowHB,setEscrowHB] = useState("");    
    console.log("EsHB",EscrowHB)
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');        
    useEffect(()=>{
        const localstateNew1 =async(b)=>{
          const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');         
         let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
         let l =accountInfoResponse['account']['apps-local-state']['length']         
         for(let i = 0; i < l; i++){
            let lj = accountInfoResponse['account']['apps-local-state'][i]['key-value']['length'];                        
            for(let j = 0; j < lj; j++)
           {                
               if(accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['key'] === "cHJpY2U=")
               {                
                    setValueIdNew((accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['value']['uint']));                                      
                    break;
               }                                   
           }                    

         }
         
        } 
        localstateNew1(location.state.allData)
    },[])

    useEffect(()=>{
        const localstateNew1HB =async(b)=>{
          const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');         
         let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
         let l =accountInfoResponse['account']['apps-local-state']['length']         
         for(let i = 0; i < l; i++){
            let lj = accountInfoResponse['account']['apps-local-state'][i]['key-value']['length'];                        
            for(let j = 0; j < lj; j++)
           {    
            console.log("HBHB",accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['key'])            
               if(accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['key'] === "VXBkYXRlZHByaWNl")
               {                

                    setValueIdNewHB((accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['value']['uint']));                                      
                    break;
               }                                   
           }                    

         }
         
        } 
        localstateNew1HB(location.state.allData)
    },[])


    useEffect(()=>{
        const localstateNew1 =async(b)=>{
          const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');         
         let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
         let l =accountInfoResponse['account']['apps-local-state'][0]['key-value']['length']         
         
         for(let i = 0; i < l; i++)
           {                        
               if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "SGlnaGVzdEJpZGRlcg==")
               {
                  console.log("HB",accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['bytes'])                  
                  let dec = new Uint8Array(Buffer.from(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['bytes'], "base64"));
                  let addr = algosdk.encodeAddress(dec);                                    
                  setEscrowHB(addr);                  
                  break;
               }                                   
           }                    
        } 
        localstateNew1(location.state.allData)
    },[])

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


    useEffect(()=>{
        const AlreadyAppOptin=async()=>{
          let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();                        
          const apps = accountInfo['account']['apps-local-state'];
          let appCount = apps['length'];
          for(let j = 0; j < appCount; j++)
          { 
              if(accountInfo['account']['apps-local-state'][j]['id'] === configfile.auctionappId)
              {
                  setToAppOptAuction(true);
                  break;
              }
          }
        }  
        
        AlreadyAppOptin();
  
    },[])

    useEffect(()=>{
        const alreadyOpt=async()=>{
            if(location.state === null || location.state === undefined || location.state === "" ){
            }else{            
            let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
            let assetCount = accountInfo['account']['assets']['length'];            
            for(let i = 0; i < assetCount; i++)
            {                
                if(accountInfo['account']['assets'][i]['asset-id'] === parseInt(location.state.allData.Assetid))
                {                                        
                    setToAssetOpt(true);
                    break;
                }
            }
        }          
        }
        alreadyOpt();
    },[])


    useEffect(()=>{
        if(location.state === null || location.state === undefined || location.state === "" ){
        }else{
        const GetBidTime=async()=>{
          let accountInfo = await indexClient.lookupAccountByID(location.state.allData.EscrowAddress).do();                                 
          const apps = accountInfo['account']['apps-local-state'];
          let appCount = apps['length'];
          for(let j = 0; j < appCount; j++)
          { 
              if(accountInfo['account']['apps-local-state'][j]['id'] === configfile.auctionappId)
              {               
                let ccount = accountInfo['account']['apps-local-state'][j]['key-value']['length']
                for(let k=0;k<ccount;k++) {
                    
                    if(accountInfo['account']['apps-local-state'][j]['key-value'][k]['key'] === "RkFMRW5kRGF0ZQ==")
                    {                                                
                        settoAuctiontimeend(accountInfo['account']['apps-local-state'][j]['key-value'][k]['value']['uint'])
                        break;
                    }                    
                }                                                  
              }
          }
        }  
        GetBidTime();
        }                  
    },[])


    const dbcallPro=async()=>{                    
            if(location.state === null || location.state === undefined || location.state === "" ){
            }else{
            try {  
            firebase.auth().signInAnonymously().then(async(response)=>{           
            const hasRestaurant = await fireDb.database()
            .ref(`userprofile/${location.state.allData.ownerAddress}`)
            .orderByKey().limitToFirst(1).once('value')
            .then(res => res.exists());                  
            if(hasRestaurant)
            {
                let r=[];            
                firebase.auth().signInAnonymously().then((response)=>{         
                firebase.database().ref("userprofile").child(location.state.allData.ownerAddress).on("value", (data) => {          
                    if (data) {                      
                        r.push({                
                            Imageurl:data.val().Imageurl,                
                            Bio:data.val().Bio,
                            Customurl: data.val().Customurl,
                            Email: data.val().Email,                            
                            Personalsiteurl: data.val().Personalsiteurl,
                            TimeStamp: data.val().TimeStamp,
                            Twittername: data.val().Twittername,
                            UserName: data.val().UserName,
                            WalletAddress: data.val().WalletAddress,
                            bgurl:data.val().bgurl,
                            valid:data.val().valid
                        })                
                    }
                    else{
                    setgetIProfile([""]);  
                    }
                    setgetIProfile(r);
                  });  
                })                
            }else{
                setgetIProfile([""]);  
            }
        })
                } catch (error) {                   
                }             
            }
                       
    }    
    useEffect(()=>{dbcallPro()},[])

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

    const BuyNFT =async()=>{
        if(location.state.allData === null || location.state.allData === "" || location.state.allData === undefined ){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else if(location.state === null || location.state === "" || location.state === undefined){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
            toast.warning(`please connect wallet`,{autoClose:5000})
            handleHideLoad()            
        }
        else if(location.state.allData.ownerAddress === localStorage.getItem("walletAddress"))
        {   
            toast.warning(`please connect Another wallet`,{autoClose:5000})
            handleHideLoad()            
        }            
        else if(algobalanceApp === 0 || algobalanceApp === ""){
            toast.warning(`your wallet balance below 1`,{autoClose:5000})
            handleHideLoad()            
        }
        else if((parseFloat((parseInt(getValueIdNew)))/1000000) >= algobalanceApp ){
            toast.warning(`your balance not enough to purchase this nft`,{autoClose:5000})
            handleHideLoad()            
        }
        else if((parseFloat(getValueIdNew)/1000000) >= parseFloat(getprices)){
            console.log("GetValue",(getValueIdNew/1000000))//1.5 <= 2.2 
            toast.warning(`Please Enter above Bidding Price`,{autoClose:5000})
            handleHideLoad()            
        }
        else if((parseFloat(location.state.allData.NFTPrice)/1000000) === parseFloat(getprices)){
            toast.warning(`Please Enter above Bidding Price`,{autoClose:5000})
            handleHideLoad()            
        }
        else if((parseFloat(getValueIdNewHB)/1000000) >= parseFloat(getprices)){
            toast.warning(`Please Enter above Bidding Price`,{autoClose:5000})
            handleHideLoad()            
        }
        else{        
        let minbalance=await minAlgoBalance()
        let minAss = await minBal()        
        let mbalance = (961000+1000+(parseInt(getValueIdNew))+1000)
        if(minAss < mbalance){            
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        else if(minbalance < mbalance){
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }        
        else if(algobalanceApp  < (((parseInt(getValueIdNew))/1000000)+2)  )
        {            
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }
        else{            
            handleShowLoad()  
            toast.dismiss();
            let index = parseInt(configfile['auctionappId']);            
            toast.info("NFT Purchase InProgress",{autoClose: 5000});              
            const params = await algodClient.getTransactionParams().do();                
            params.fee = 1000;
            params.flatFee = true;              
            let dataopreplace = datanewpriceAuction.replaceAll("AppID",configfile['auctionappId']).replaceAll("AssId",parseInt(location.state.allData.Assetid))            
            let results = await algodClient.compile(dataopreplace).do();                
            let program = new Uint8Array(Buffer.from(results.result, "base64"));                  
            let lsig = new algosdk.LogicSigAccount(program);                                
        try{                        
             let appArg = [];
             appArg.push(new Uint8Array(Buffer.from("invest")));
             appArg.push(algosdk.encodeUint64(parseFloat((getprices*1000000))))            
             
             //lsig
             const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                 from: localStorage.getItem('walletAddress'), 
                 appIndex: index,
                 appArgs: appArg,
                 accounts: [lsig.address()],
                 foreignAssets : [parseInt(location.state.allData.Assetid)],
                 suggestedParams: params
               });                                                              
            let response = ""
            if(localStorage.getItem("walletName") === "myAlgoWallet")
            {
            const signedTx1 = await myAlgoWallet.signTransaction(transaction2.toByte());                        
            response = await algodClient.sendRawTransaction(signedTx1.blob).do();            
            await waitForConfirmation(algodClient, response.txId);
          }else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [transaction2]                        
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
            response = await algodClient.sendRawTransaction(decodedResult).do()
            await waitForConfirmation(algodClient, response.txId);            
          }
                      
            let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
            toast.success(toastDiv(id));                        
            toast.success(`Asset Bidding ${response.txId}`,{autoClose: 8000});                                      
            toast.success(`NFT Bidding Successfully`,{autoClose: 8000});            
            handleHideLoad()
            await doneduplicate()
            done()            
        }catch (err) {        
            console.error(err);
            toast.warning(`you are facing error `,{autoClose:5000})                    
            handleHideLoad()
        }                           
        }
        }                    
    }


    const CliamNFT =async(b)=>{
        if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
            toast.warning(`please connect your wallet`,{autoClose:5000})
            handleHideLoad()            
          } 
          else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 3){
            toast.warning(`Insufficient balance to create NFT`,{autoClose:5000})
            handleHideLoad()            
          }
          else if((parseFloat((parseInt(getValueIdNew)))/1000000) >= algobalanceApp ){
            toast.warning(`your balance not enough to purchase this nft`,{autoClose:5000})
            handleHideLoad()            
          }      
          else{
            let minbalance=await minAlgoBalance()
            if(minbalance < (961000+2000)){
                toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
                handleHideLoad()
            }else if(EscrowHB === localStorage.getItem('walletAddress')){
              let index = parseInt(configfile['auctionappId']);  
              let dataopreplace = datanewpriceAuction.replaceAll("AppID",parseInt(configfile['auctionappId'])).replaceAll("AssId",parseInt(b.Assetid))                      
              const params = await algodClient.getTransactionParams().do();            
              params.fee = 1000;
              params.flatFee = true;                      
              let results = await algodClient.compile(dataopreplace).do();                
              let program = new Uint8Array(Buffer.from(results.result, "base64"));                 
              let lsig = new algosdk.LogicSigAccount(program);                            
              try {                        
                let recv_escrow = lsig.address();                
                let foreignassets = [];
                foreignassets.push(parseInt(b.Assetid));                          
                let decAddr = algosdk.decodeAddress(lsig.address());                
                 let appArg = [];       
                 appArg.push(new Uint8Array(Buffer.from("claim")));      
                 appArg.push(decAddr.publicKey);                                          
                 const transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                  from: localStorage.getItem('walletAddress'), 
                  appIndex: index,
                  appArgs: appArg,
                  accounts: [lsig.address()],
                  foreignAssets : [parseInt(b.Assetid)],
                  suggestedParams: params
                });
    
                let transaction2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                      from: localStorage.getItem('walletAddress'), 
                      to: recv_escrow, 
                      amount:parseFloat(((getValueIdNewHB/1000000)*1000000)), 
                       note: undefined,  
                       suggestedParams: params
                     });                
                const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: recv_escrow,
                      to: localStorage.getItem('walletAddress'),
                      assetIndex: parseInt(b.Assetid),
                      note: undefined,
                      amount: 1,
                      suggestedParams: params
                    });
    
                let transaction3new = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                        from:recv_escrow , 
                        to:location.state.allData.ownerAddress, 
                        amount: parseFloat(((getValueIdNewHB/1000000)*1000000)),                 
                        suggestedParams: params
                });
          const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3,transaction3new]);
          const txs = [ transaction1, transaction2, transaction3,transaction3new];
          txs[0].group = groupID;
          txs[1].group = groupID;
          txs[2].group = groupID;      
          txs[3].group = groupID;      
          let response = "";      
          let id = ""
          if(localStorage.getItem("walletName") === "myAlgoWallet")
          {
                
          const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte()]);          
          const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);                
          const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);                
          response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob, signedTx3.blob,signedTx4.blob]).do();          
          await waitForConfirmation(algodClient, response.txId);            
          id = "https://testnet.algoexplorer.io/tx/" + response.txId;                
          toast.success(toastDiv(id));
          }else if(localStorage.getItem("walletName") === "PeraWallet"){
    
                const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                const txns = [txs[0], txs[1], txs[2],txs[4]]            
                const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");                
                return {
                  txn: encodedTxn,
              };
            });        
              const signedTx2 = algosdk.signLogicSigTransaction(txns[2], lsig);
              const signedTx3 = algosdk.signLogicSigTransaction(txns[3], lsig);          
              const requestParams = [ txnsToSign ];
              const request = formatJsonRpcRequest("algo_signTxn", requestParams);
              const result = await connector.sendCustomRequest(request);
              const decodedResult = result.map(element => {
                return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
              });              
              decodedResult[2] = signedTx2.blob;
              decodedResult[3] = signedTx3.blob;
              response = await algodClient.sendRawTransaction(decodedResult).do()          
              await waitForConfirmation(algodClient, response.txId);                      
              id = "https://testnet.algoexplorer.io/tx/" + response.txId;          
              toast.success(toastDiv(id));
              
          }     
                let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
                let dateset=new Date().toDateString();
                firebase.auth().signInAnonymously().then((response)=>{                              
                fireDb.database().ref(`imageSaleAlgosAuction/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                fireDb.database().ref(`imageAuctionbuy/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                    Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:(parseFloat((getValueIdNewHB/1000000)*1000000)),
                    EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                    NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                    ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                    TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                    Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                    CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                    NFTChannel:"",
                    SocialLink:"",
                    NFTModel:location.state.allData.NFTModel
                      }).then(()=>{                          
                                let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                const db = refactivity.push().key;                         
                                refactivity.child(db).set({
                                Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:(parseFloat((getValueIdNewHB)*1000000)),
                                EscrowAddress:"BuyNFT",keyId:db,
                                NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                TimeStamp:dateset,NFTDescription:id,HistoryAddress:a,
                                Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                NFTChannel:"",
                                SocialLink:"",NFTModel:location.state.allData.NFTModel
                            })
                        .then(async()=>{     
                            toast.dismiss() 
                            toast.success(`NFT Purchased Successfully`,{autoClose: 8000});                                                        
                            handleHideLoad()
                            await doneduplicate()
                            done()                            
                        })                                                
                        handleHideLoad()
                        done()                                            
                })
                })                        
                })
            //})                    
                } catch (err) {
                  console.error(err);                  
                  toast.error(`your browser appearing issue`,{autoClose: 5000});            
                  handleHideLoad()
                }                                 
            }
            else {
                toast.error(`your are Not Highest Bidder`,{autoClose: 5000});            
                handleHideLoad()
            }
          }        

    }

    const minBal = async () =>
    {
      let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();      
      let sub = min['amount'] - min['min-balance']    
      setMinAlgo(sub);      
    }

    const BuyOptNFT=async()=>{
        if(location.state.allData === null || location.state.allData === "" || location.state.allData === undefined ){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else if(location.state === null || location.state === "" || location.state === undefined){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else{              
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
            toast.warning(`please connect wallet`,{autoClose:5000})
            handleHideLoad()            
        }
        else{          
        if(location.state.allData.ownerAddress === localStorage.getItem("walletAddress"))
        {   
            toast.warning(`please connect Another wallet`,{autoClose:5000})
            handleHideLoad()            
        }            
        else{                    
        if(algobalanceApp === 0 || algobalanceApp === ""){
            toast.warning(`your wallet balance below 1`,{autoClose:5000})
            handleHideLoad()            
        }        
        else{
        let minbalance=await minAlgoBalance()
        let minAss = await minBal()        
        let mbalance = (101000+101000+4000)    
        if(minAss < mbalance){
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
            handleHideLoad()
        }                
        else if(minbalance < mbalance){
            toast.dismiss();
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }        
        else if(algobalanceApp  < (((parseInt(getValueIdNew))/1000000)+2)  )
        {            
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }        
        else{            
            handleShowLoad()                 
            const algosdk = require('algosdk');                          
            let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));                                                          
            let params = await algodClient.getTransactionParams().do();            
            params.fee = 1000;
            params.flatFee = true;              
            toast.info("NFT Purchase InProgress",{autoClose: 5000});  
            try {                
            const params = await algodClient.getTransactionParams().do();                            
            let dataelem = datanewpriceAuction.replaceAll("AppID",configfile['auctionappId']).replaceAll("AssId",parseInt(location.state.allData.Assetid))                        
            let resultselem = await algodClient.compile(dataelem).do();                            
            let programelem = new Uint8Array(Buffer.from(resultselem.result, "base64"));                  
            let lsigelem = new algosdk.LogicSigAccount(programelem);            
            console.log("EscrowAddress",lsigelem.address())
            try{            
            const transactionass = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: localStorage.getItem('walletAddress'),
                  to: localStorage.getItem('walletAddress'),
                  assetIndex: parseInt(location.state.allData.Assetid),
                  note: undefined,
                  amount: 0,
                  suggestedParams: params
              });            
            //here popup
              let transactionfund = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem('walletAddress'), 
                to: lsigelem.address(), 
                amount: parseInt(3000), 
                note: undefined,  
                suggestedParams: params
               });
                         
                const groupIDfirst = algosdk.computeGroupID([ transactionass, transactionfund]);
                const txsfirst = [ transactionass, transactionfund];
                txsfirst[0].group = groupIDfirst;
                txsfirst[1].group = groupIDfirst;                
               let responsefirst =""
               if(localStorage.getItem("walletName") === "myAlgoWallet")
               {                
                const signedTx1first = await myAlgoWallet.signTransaction([txsfirst[0].toByte(),txsfirst[1].toByte()]);
                responsefirst = await algodClient.sendRawTransaction([signedTx1first[0].blob,signedTx1first[1].blob]).do();                  
                await waitForConfirmation(algodClient, responsefirst.txId);
  
                toast.dismiss()
                toast.success(`Asset opt-in successfull`,{autoClose: 5000});                
                if(toAppOptAuction){
                    handleHideLoad()
                    doneduplicate()                    
                }                
                else{
                    await OptinAppHere()                    
                    handleHideLoad()
                    doneduplicate()              
                }                
                }else if(localStorage.getItem("walletName") === "PeraWallet"){
                
                const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });             
                const txns = [txsfirst[0], txsfirst[1]]                  
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
                responsefirst = await algodClient.sendRawTransaction(decodedResult).do()
                await waitForConfirmation(algodClient, responsefirst.txId);  
                toast.dismiss()
                toast.success(`Asset opt-in successfull`,{autoClose: 8000});                
                if(toAppOptAuction){
                    handleHideLoad()
                    doneduplicate()                    
                }                
                else{
                    await OptinAppHere()                    
                    handleHideLoad()
                    doneduplicate()              
                }                
                }            
            }catch (err) {        
                console.error(err);
                toast.dismiss()
                toast.warning(`your browser appearing issue .`,{autoClose:5000})                
            }
              
              } catch (err) {
                  console.error("error",err);             
                  toast.dismiss()
                  toast.error(`your browser appearing issue`,{autoClose:5000})
                  handleHideLoad()                  
            }          
        }                                                      
        }               
        }
        }
    }
    }     
    
    const doneduplicate=async()=>{
        await sleep(3000);        
        window.location.reload(false);    
    } 
    
    const OptinAppHere=async()=>{
        const params = await algodClient.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;        
  
        let transaction1 = algosdk.makeApplicationOptInTxnFromObject({
            from: localStorage.getItem('walletAddress'),                     
            appIndex:configfile['auctionappId'],          
            suggestedParams: params
        });        
        let response2;
        if(localStorage.getItem("walletName") === "myAlgoWallet"){
            const signedTx1first = await myAlgoWallet.signTransaction(transaction1.toByte());
            response2 = await algodClient.sendRawTransaction(signedTx1first.blob).do();                                                      
        }else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [transaction1]            
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
            response2 = await algodClient.sendRawTransaction(decodedResult).do()                      
        }         
        await waitForConfirmation(algodClient,response2.txId);
        let id = "https://testnet.algoexplorer.io/tx/" + response2.txId;
        toast.success(toastDiv(id));
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const done=async()=>{
        await sleep(7000);
        history.push("/my-NFT")
        window.location.reload(false);    
    } 

    const done2=async()=>{
        await sleep(3000);
        history.push("/my-NFT")
        window.location.reload(false);    
    } 

      const toastDiv = (txId) =>
        (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
            </svg></p></a></p>  
        </div>
        );        
    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <Row className='mb-4'>
                    <Col md={4} className="mb-md-0 mb-4">
                        <Card className='card-dash d-block'>
                        
                        {location.state === null || location.state === "" || location.state === undefined ? ( 
                            <img src={CardImage} alt="img" className='img-fluid' />
                        ):(
                            <img src={location.state.allData.Imageurl} alt="img" className='img-fluid' style={{height:"20%",width:'50%'}} />
                        )}
                            
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className='card-dash border-0 d-block'>                            
                            {location.state === null || location.state === "" || location.state === undefined ? ( 
                                <>
                                <h2 className='subheading mb-0'>{configfile.nullvalue}</h2>
                                <p>{configfile.nullvalue}</p>                                
                                </>
                            ):(
                                <>
                                <h6 className='subheading mb-0'>NFT Name :  <strong>{location.state.allData.NFTName} </strong></h6>
                                <p>{location.state.allData.NFTDescription}</p>                                
                                </>
                             )}
                                                                                
                                <>                            
                                {getValueIdNew === "" || getValueIdNew === undefined || getValueIdNew === null ?(
                                    <p>{configfile.nullvalue}</p>
                                ):(
                                    <>
                                    {getValueIdNewHB === "" || getValueIdNewHB === undefined || getValueIdNewHB === null ?(                                    
                                        <>
                                        <h6 className='d-flex mb-3 align-items-center'>                                    
                                        Highest Bid :&nbsp;
                                        <p>{configfile.nullvalue}</p>
                                        </h6>
                                        </>
                                    ):(
                                        <>
                                        <h6 className='d-flex mb-3 align-items-center'>                                    
                                        Highest Bid :&nbsp;
                                        {((parseFloat((getValueIdNewHB/1000000))))}
                                        </h6>
                                        <br></br>
                                        </>
                                    )}                                    
                                    </>
                                )}
                                </>                                                                                                                                
                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                <>
                                    <h2 className='d-flex mb-3 align-items-center'>
                                    <img src={Logo} alt="logo" className='me-2 avatar-pic' />
                                    <p>{configfile.nullvalue}</p>                                
                                    </h2>                                
                                </>
                                ):(
                                    <h3 className='d-flex mb-3 align-items-center'>
                                        <img src={Logo} alt="logo" className='me-2 avatar-pic' />
                                        {(location.state.allData.NFTPrice/1000000)}    
                                    </h3>                                                                                 
                                )}
                                {AssetOpt ? (
                                    <>
                                    {(toAuctiontimeend) > (Math.floor(new Date().getTime()/1000.0)) ?(
                                        <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                        <input type="number" placeholder='Enter Bidding Algos' className='form-control' value={((getprices))} onChange={event => setprices((event.target.value))} />
                                        <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyNFT()}}>Bid NFT</ButtonLoad>   
                                        </div>
                                    ):( 
                                        <>
                                        {(EscrowHB === null || EscrowHB === undefined || EscrowHB === "" || EscrowHB === 0 || getValueIdNewHB === null || getValueIdNewHB === undefined || getValueIdNewHB === "" || getValueIdNewHB === 0) ? (
                                            <ButtonLoad disabled loading={loader} className='btn btn-blue' >Target Time End</ButtonLoad>
                                        ):(
                                            <>
                                            {EscrowHB === localStorage.getItem('walletAddress') ? (
                                                <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{CliamNFT(location.state.allData)}}>Buy NFT</ButtonLoad>                                           
                                            ):(
                                                <ButtonLoad disabled loading={loader} className='btn btn-blue' >Target Time End</ButtonLoad>
                                            )}
                                            </>                                            
                                        )}
                                        </>                                           
                                    )}
                                    </>                                                                        
                                ):(
                                    <>
                                    {(toAuctiontimeend) > (Math.floor(new Date().getTime()/1000.0)) ?(
                                        <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyOptNFT()}}>Optin NFT</ButtonLoad>                                    
                                    ):(
                                        <ButtonLoad disabled loading={loader} className='btn btn-blue' >Target Time End</ButtonLoad>
                                    )}                                    
                                    </>
                                )}                                                                                            
                        </Card>
                    </Col>
                </Row>
                <Row className='mb-5'>
                    <Col md={4} className="mb-md-0 mb-4">
                        <Card className='card-dash border-0 d-block'>
                            <h3>NFT Information</h3>
                            
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>NFT Contract :</h6>
                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/address/${location.state.allData.EscrowAddress}`} target="_blank" rel="noopener noreferrer">                                                                    
                                    <strong>{location.state.allData.EscrowAddress.slice(0,6)}....{location.state.allData.EscrowAddress.slice(52,58)}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                    </a>
                                )}                                                                
                            </div>
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>Token ID :</h6>

                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/asset/${location.state.allData.Assetid}`} target="_blank" rel="noopener noreferrer">                                
                                    <strong>{location.state.allData.Assetid}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                            </svg>
                                    </a>
                                )}
                                
                            </div>
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>Creator's Address :</h6>
                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/address/${location.state.allData.CreatorAddress}`} target="_blank" rel="noopener noreferrer">                                
                                    <strong>{location.state.allData.CreatorAddress.slice(0,6)}....{location.state.allData.CreatorAddress.slice(52,58)}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                    </a>
                                )}                                
                            </div>
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>Owner's Address :</h6>
                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/address/${location.state.allData.ownerAddress}`} target="_blank" rel="noopener noreferrer">                                
                                    <strong>{location.state.allData.ownerAddress.slice(0,6)}....{location.state.allData.ownerAddress.slice(52,58)}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                    </a>
                                )}                                
                            </div>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className='card-dash mb-4 d-block border-0'>
                            <div className='d-flex flex-wrap flex-lg-nowrap create-art'>
                            {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                  <img src="https://bscstation.finance/images/logo-defaul.png" alt="art" className='me-3' />
                            ):(
                                <>
                                {getIProfile[0].Imageurl === "" || getIProfile[0].Imageurl === null || getIProfile[0].Imageurl === undefined ?(
                                    <h3 className='d-flex mb-3 align-items-center'>                                
                                    <img src={CardImage} alt="logo" className='me-2 avatar-pic' />
                                    {configfile.nullvalue}                                    
                                    </h3>                                
                                ):(                                    
                                    <h3 className='d-flex mb-3 align-items-center'>                                
                                    <img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />                                    
                                </h3>

                                )}                             
                                </>
                            )}                              
                                <div className=''>
                                {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <h6 className='subheading mb-0'>Artist : &nbsp; <strong>{getIProfile[0].UserName} </strong></h6>
                                )}
                                    
                                    <p className='subheading mb-0'>Social :  &nbsp;
                                    {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                        <strong>{configfile.nullvalue}</strong>
                                    ):(
                                        <>
                                        {getIProfile[0].Personalsiteurl === "" || getIProfile[0].Personalsiteurl === null || getIProfile[0].Personalsiteurl === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                            <>                                            
                                            <strong>{getIProfile[0].Personalsiteurl}</strong>                                           
                                            </>
                                        ):(                                        
                                        <>
                                            <strong>{getIProfile[0].Personalsiteurl}</strong>
                                        </>                                        
                                        )}
                                        </>                                        
                                    )}
                                    </p>
                                    <p className='subheading mb-0'>Wallet address :  &nbsp;                                    
                                        <>
                                        {(location.state  === null || location.state  === "" || location.state === " " || location.state === undefined || location.state === '') ? (
                                            <a  href={"https://testnet.algoexplorer.io/address/" + configfile.nullvalue} target="_blank" rel="noreferer">
                                            <strong>{configfile.nullvalue}.... </strong>
                                            &nbsp;
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                    </svg>
                                            </a>                                                                                
                                        ):(
                                        <a  href={"https://testnet.algoexplorer.io/address/" + location.state.allData.ownerAddress} target="_blank" rel="noreferer">
                                        <strong>{location.state.allData.ownerAddress.slice(0,12)}....{location.state.allData.ownerAddress.slice(52,58)} </strong>
                                        &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                        </a>                                                              
                                        )}                                        
                                        </>                                 
                                    </p>                                    
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>                          
            </Container>
        </Layout>
    )
}

export default NFTDetailsAuction;