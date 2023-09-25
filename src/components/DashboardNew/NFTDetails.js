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
import datanewpriceTHiru from '../../Pyteal/escrowroyalty';
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

const NFTDetails = (props) => {
    useEffect(() => {
        document.title = "ELEMENT | NFTDetails"
    }, [])
    const [AssetOpt,setToAssetOpt] = useState(false)     
    const [minAlgo, setMinAlgo] = useState("");     
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[algobalanceApp,setalgobalanceApp]=useState([""]);    
    const[assetbalanceApp,setassetbalanceApp]=useState("");  
    console.log("AssetBalance",assetbalanceApp)     
    const location = useLocation();
    const history = useHistory();        
    const[getIProfile,setgetIProfile]=useState([""]);       
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');    
    const [getValueIdCreator,setValueIdCreator] = useState([""]);       
    useEffect(()=>{
        const assetBalance=async()=>{
            if(location.state === null || location.state === undefined || location.state === "" ){
            }else{                            
            let accountInfoResponseduplicate = await indexClient.lookupAccountByID(location.state.allData.EscrowAddress).do();
            let lowduplicate =accountInfoResponseduplicate['account']['assets']['length']            
            for(let i = 0; i < lowduplicate; i++)
                {                    
                    if(parseInt(accountInfoResponseduplicate['account']['assets'][i]['asset-id']) === parseInt(location.state.allData.Assetid))
                    {                 
                        setassetbalanceApp(accountInfoResponseduplicate['account']['assets'][i]['amount'])
                        break;
                    }   
                }                                
        }          
        }
        assetBalance();
    },[])
    useEffect(()=>{
        const localstate2Creator =async(b)=>{
          const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');        
          let accountInfoResponse = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
          console.log("reclaimCre",accountInfoResponse['account']['apps-local-state'])
          let l =accountInfoResponse['account']['apps-local-state']['length']      
          for(let i = 0; i < l; i++)
             {              
              let m = accountInfoResponse['account']['apps-local-state'][i]['key-value']['length']
              for(let j = 0; j < m; j++)
                {                    
                    if(accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['key'] === "Q3JlYXRvcg==")
                    {
                      console.log("loopreclaim",accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['value']['bytes'])                      
                      let dec = new Uint8Array(Buffer.from(accountInfoResponse['account']['apps-local-state'][i]['key-value'][j]['value']['bytes'], "base64"));
                      let addr = algosdk.encodeAddress(dec);                      
                      setValueIdCreator(addr);              
                      break;
                    }    
                }                                 
           }              
        } 
        localstate2Creator(location.state.allData)
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
        const alreadyOpt=async()=>{
            if(location.state === null || location.state === undefined || location.state === "" ){
            }else{            
            let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
            let assetCount = accountInfo['account']['assets']['length'];
            console.log("ASS",assetCount);
            for(let i = 0; i < assetCount; i++)
            {                
                if(accountInfo['account']['assets'][i]['asset-id'] === parseInt(location.state.allData.Assetid))
                {                    
                    console.log("Optt",accountInfo['account']['assets'][i]['asset-id'])
                    setToAssetOpt(true);
                    break;
                }
            }
        }          
        }
        alreadyOpt();
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
                    console.log("NewIdea",hasRestaurant)      
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
        else if((parseFloat(location.state.allData.NFTPrice)/1000000) >= algobalanceApp ){
            toast.warning(`your balance not enough to purchase this nft`,{autoClose:5000})
            handleHideLoad()            
        }                
        else{
        let minbalance=await minAlgoBalance()
        let minAss = await minBal()        
        let mbalance = (961000+1000+location.state.allData.NFTPrice+1000)
        if(minAss < mbalance){
            console.log("Mbal1",mbalance)
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        else if(minbalance < mbalance){
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }        
        else if(algobalanceApp  < ((location.state.allData.NFTPrice/1000000)+2)  )
        {            
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }
        else{                
            if(parseInt(assetbalanceApp) === 1 || parseInt(assetbalanceApp) === "1"){
            handleShowLoad()  
            toast.dismiss();
            let index = parseInt(configfile['royaltyappId']);
            let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));                                                                      
            toast.info("NFT Purchase InProgress",{autoClose: 5000});  
            let convert98=(((parseFloat(location.state.allData.NFTPrice))/100)*98)    
            let convert2=(((parseFloat(location.state.allData.NFTPrice))/100)*2);            
            const params = await algodClient.getTransactionParams().do();                
            params.fee = 1000;
            params.flatFee = true;              
            let dataopreplace = datanewpriceTHiru.replaceAll("AppID",configfile['royaltyappId']).replaceAll("AssId",parseInt(location.state.allData.Assetid))            
            let results = await algodClient.compile(dataopreplace).do();                
            let program = new Uint8Array(Buffer.from(results.result, "base64"));                  
            let lsig = new algosdk.LogicSigAccount(program);
            let recv_escrow = lsig.address();                        
            let amount = 4000;
        try{            
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: localStorage.getItem('walletAddress'), 
              to: recv_escrow, 
              amount: amount, 
              note: undefined,  
              suggestedParams: params
             });               
             let appArg = [];
             appArg.push(new Uint8Array(Buffer.from("Buynow")));
             appArg.push(algosdk.encodeUint64(convert2)); 
             

             const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                 from: recv_escrow, 
                 appIndex: index,
                 appArgs: appArg,
                 accounts: [localStorage.getItem('walletAddress')],
                 foreignAssets : [parseInt(location.state.allData.Assetid)],
                 suggestedParams: params
               });
               

               
               let transaction3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem('walletAddress'), 
                to: recv_escrow, 
                amount:parseFloat(location.state.allData.NFTPrice), 
                 note: undefined,  
                 suggestedParams: params
               });

               
              const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                to: localStorage.getItem('walletAddress'),
                assetIndex: parseInt(location.state.allData.Assetid),
                note: undefined,
                amount: 1,
                suggestedParams: params
              });
                            
              let transaction5 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: recv_escrow, 
                  to: location.state.allData.ownerAddress, 
                  amount: parseFloat(convert98), 
                  note: undefined,  
                  suggestedParams: params
               });                                    

               let transaction5new = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: recv_escrow, 
                to: getValueIdCreator, 
                amount: parseFloat(convert2), 
                note: undefined,  
                suggestedParams: params
            });



              
          const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4,transaction5,transaction5new]);
          const txs = [ transaction1, transaction2, transaction3, transaction4,transaction5,transaction5new];
          txs[0].group = groupID;//
          txs[1].group = groupID;
          txs[2].group = groupID;//
          txs[3].group = groupID;
          txs[4].group = groupID;                    
          txs[5].group = groupID;                    
          let response = ""
          if(localStorage.getItem("walletName") === "myAlgoWallet")
          {
            const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()]);
            const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);            
            const signedTx3 = algosdk.signLogicSigTransaction(txs[3], lsig);                  
            const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);                          
            const signedTx5 = algosdk.signLogicSigTransaction(txs[5], lsig);                          
            response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx1[1].blob, signedTx3.blob,signedTx4.blob,signedTx5.blob]).do();            
            await waitForConfirmation(algodClient, response.txId);
          }else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [txs[0], txs[1], txs[2],txs[3],txs[4],txs[5]]                        
            const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");            
            return {
            txn: encodedTxn,
            };
            });        
            const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
            const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig);                        
            const signedTx5new = algosdk.signLogicSigTransaction(txs[5], lsig);                        
            const requestParams = [ txnsToSign ];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);            
            const result = await connector.sendCustomRequest(request);            
            const decodedResult = result.map(element => {
                return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });            
            decodedResult[1] = signedTx3.blob;
            decodedResult[3] = signedTx4.blob;
            decodedResult[4] = signedTx5.blob;                        
            decodedResult[5] = signedTx5new.blob;
            response = await algodClient.sendRawTransaction(decodedResult).do()
            await waitForConfirmation(algodClient, response.txId);            
          }
                      
          let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
          toast.success(toastDiv(id));
          let dbtxid=response.txId;
          toast.success(`Asset Buying ${response.txId}`,{autoClose: 8000});              
        //db change here
          let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
          let dateset=new Date().toDateString();
          if(location.state.allData.NFTType === undefined || location.state.allData.SocialLink === undefined || location.state.allData.NFTChannel === undefined)
          {
            firebase.auth().signInAnonymously().then((response)=>{                              
                fireDb.database().ref(`imageSaleAlgosRoyalty/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                fireDb.database().ref(`imageRoyaltybuy/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                    Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
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
                        let refactivityCreator=fireDb.database().ref(`activitytable/${getValueIdCreator}`);
                        const dbcreator = refactivityCreator.push().key;                         
                        const db = refactivity.push().key;                         
                        refactivity.child(db).set({
                        Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                        EscrowAddress:"BuyNFT",keyId:db,
                        NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                        ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                        TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                        Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                        CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                        NFTChannel:"",
                        SocialLink:"",NFTModel:location.state.allData.NFTModel
                        })
                        .then(()=>{     
                            refactivityCreator.child(dbcreator).set({
                                Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:convert2,
                                EscrowAddress:"Reward-Algos",keyId:dbcreator,
                                NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                NFTChannel:"",
                                SocialLink:"",NFTModel:location.state.allData.NFTModel
                                })
                                .then(()=>{     
                            //toast.dismiss() 
                            toast.success(`NFT Purchased Successfully`,{autoClose: 8000});                            
                            handleHideLoad()
                            done()                            
                            })                      
                        })                          
                        // handleHideLoad()
                        // done()                     
                    }) 

                    })                                    
            })

          }else{
            firebase.auth().signInAnonymously().then((response)=>{                              
                fireDb.database().ref(`imageSaleAlgosRoyalty/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                fireDb.database().ref(`imageRoyaltybuy/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                    Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                    EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                    NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                    ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                    TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                    Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                    CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                    NFTChannel:location.state.allData.NFTChannel,
                    SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel
                      }).then(()=>{                                  
                        let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                        let refactivityCreator=fireDb.database().ref(`activitytable/${getValueIdCreator}`);
                        const dbcreator = refactivityCreator.push().key;                         
                        const db = refactivity.push().key;                         
                        refactivity.child(db).set({
                        Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                        EscrowAddress:"BuyNFT",keyId:db,
                        NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                        ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                        TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                        Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                        CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                        NFTChannel:location.state.allData.NFTChannel,
                        SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel
                    })
                        .then(()=>{  
                            refactivityCreator.child(dbcreator).set({
                                Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:convert2,
                                EscrowAddress:"Reward-Algos",keyId:dbcreator,
                                NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                NFTChannel:"",
                                SocialLink:"",NFTModel:location.state.allData.NFTModel
                                })
                                .then(()=>{     
                            //toast.dismiss()                                                                                    
                            toast.success(`NFT Purchased Successfully`,{autoClose: 8000});                            
                            handleHideLoad()
                            done()                            
                        })                                                
                        // handleHideLoad()
                        // done()                        
                    }) 
                })
                })
            })

          }

        }catch (err) {        
            console.error(err);
            toast.warning(`you are facing error `,{autoClose:5000})               
        }   
            }
            else{
            toast.dismiss()
            toast.warning(`Asset Balance is zero,please try another NFT`,{autoClose:5000})
            handleHideLoad()            
            }                                
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
        else if((parseFloat(location.state.allData.NFTPrice)/1000000) >= algobalanceApp ){
            toast.warning(`your balance not enough to purchase this nft`,{autoClose:5000})
            handleHideLoad()            
        }        
        else{
        let minbalance=await minAlgoBalance()
        let minAss = await minBal()        
        let mbalance = (101000+101000+4000)
        let mbalance2 = (961000+1000+location.state.allData.NFTPrice+1000)
        if(minAss < mbalance){
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
            handleHideLoad()
        }
        else if(minAss < mbalance2){
            toast.dismiss();
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        else if(minbalance < mbalance2){
            toast.dismiss();
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        else if(minbalance < mbalance){
            toast.dismiss();
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }        
        else if(algobalanceApp  < ((location.state.allData.NFTPrice/1000000)+2)  )
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
            //comment out the next two lines to use suggested fee
            params.fee = 1000;
            params.flatFee = true;              
            toast.info("NFT Purchase InProgress",{autoClose: 5000});  
            try {                
            const params = await algodClient.getTransactionParams().do();                            
            let dataelem = datanewpriceTHiru.replaceAll("AppID",configfile['royaltyappId']).replaceAll("AssId",parseInt(location.state.allData.Assetid))            
            let resultselem = await algodClient.compile(dataelem).do();                            
            let programelem = new Uint8Array(Buffer.from(resultselem.result, "base64"));                  
            let lsigelem = new algosdk.LogicSigAccount(programelem);            
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
                handleHideLoad()
                doneduplicate();                
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
                handleHideLoad()
                doneduplicate();                
                }            
            }catch (err) {        
                console.error(err);
                toast.dismiss()
                toast.warning(`your browser appearing issue .`,{autoClose:5000})             
                handleHideLoad()                  
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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
      const done=async()=>{
        await sleep(8000);
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
                            <img src={CardImage} alt="img" className='img-fluid rounded-16' />
                        ):(
                            <img src={location.state.allData.Imageurl} alt="img" className='img-fluid' style={{height:"20%",width:'50%'}} />
                        )}
                            
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className='card-dash border-0 d-block'>                            
                            &nbsp;                            
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
                            
                                {AssetOpt === false ? (
                                    <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyOptNFT()}}>Optin NFT</ButtonLoad>
                                ):(
                                    <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyNFT()}}>Buy NFT</ButtonLoad>
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

export default NFTDetails;