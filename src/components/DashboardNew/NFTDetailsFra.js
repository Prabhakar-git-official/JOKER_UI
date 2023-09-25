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
import dataauctionescrow from "../../Pyteal/escrowfractional";
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

const NFTDetailsFra = (props) => {
    
    useEffect(() => {
        document.title = "ELEMENT | NFTDetails"
    }, [])
    const [selectValue31,setSelectValue31] = useState("10");       
    const handleChange31 = (e)=>{
        setSelectValue31(e.target.value)
    }      
    const [AssetOpt,setToAssetOpt] = useState(false)     
    const [getassetprice,setassetprice]=useState("") 
    console.log("AssetAmount",getassetprice)       
    const [getTargetPrice,setTargetPrice]=useState("")   
    const [getValueIdNew1,setValueIdNew1]=useState("")  
    console.log("TotalLocal",getValueIdNew1)  
    console.log("TP",getTargetPrice)     
    const [minAlgo, setMinAlgo] = useState("");    
    const [MintStart,setMinStart] = useState(false) 
    const [getAlreadyAppOpt,setAlreadyAppOpt] = useState(false)      
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[algobalanceApp,setalgobalanceApp]=useState([""]);      
    const location = useLocation();
    const history = useHistory();    
    const[getIProfile,setgetIProfile]=useState([""]);       
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');    
    const [getTrueDis,setTrueDis] = useState(false);   
    //const [getduplicateAssetValue2,setduplicateAssetValue2] = useState(""); 
    const [getduplicateAssetValue2new,setduplicateAssetValue2new] = useState(""); 
    //const [getduplicateAssetValue,setduplicateAssetValue] = useState("");     
    const [getAssetValueLocal,setAssetValueLocal] = useState("");    
    const [getAssetValueLocalStatic,setAssetValueLocalStatic] = useState("");        
    console.log("AV",getAssetValueLocal)   
    console.log("AVstatic",getAssetValueLocalStatic)   
    // useEffect(()=>{
    //     const Instance2 = async(b) =>{
    //         const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');                   
    //         let accountInfoResponseduplicate = await indexerClient.lookupAccountByID(b.EscrowAddress).do();            
    //         let lowduplicate =accountInfoResponseduplicate['account']['assets']['length']            
    //         for(let i = 0; i < lowduplicate; i++)
    //             {                    
    //                 if(parseInt(accountInfoResponseduplicate['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))
    //                 {                 
    //                     setduplicateAssetValue2(accountInfoResponseduplicate['account']['assets'][i]['amount'])
    //                     break;
    //                 }   
    //             }                    
    // }    
    //     Instance2(location.state.allData);
        
    // },[])


    //assetamountlocal
    useEffect(()=>{
        const Instance2 = async(b) =>{
            let accountInfoResponse = await indexClient.lookupAccountByID(location.state.allData.ownerAddress).do();                                                 
            let jl =accountInfoResponse['account']['apps-local-state']['length']                        
            for(let j = 0; j < jl; j++){                
                if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
                    let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
                    for(let i = 0; i < l; i++)
                    {                                        
                        if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "YXNzZXRhbW91bnRsb2NhbA=="){
                            setAssetValueLocal((accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']));
                            break;
                        }
                    }

                }                
            }                                                   
    }    
        Instance2(location.state.allData);
        
    },[])

    useEffect(()=>{
        const Instance2 = async(b) =>{
            let accountInfoResponse = await indexClient.lookupAccountByID(location.state.allData.ownerAddress).do();                                                 
            let jl =accountInfoResponse['account']['apps-local-state']['length']                        
            for(let j = 0; j < jl; j++){                
                if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
                    let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
                    for(let i = 0; i < l; i++)
                    {                                        
                        if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "YXNzZXRhbW91bnRsb2NhbERj"){
                            setAssetValueLocalStatic((accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint']));
                            break;
                        }
                    }

                }                
            }                                                   
    }    
        Instance2(location.state.allData);
        
    },[])

    useEffect(()=>{
        const Instance2 = async(b) =>{
            const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');                   
            let accountInfoResponseduplicate = await indexerClient.lookupAccountByID(localStorage.getItem('walletAddress')).do();            
            let lowduplicate =accountInfoResponseduplicate['account']['assets']['length']            
            for(let i = 0; i < lowduplicate; i++)
                {                    
                    if(parseInt(accountInfoResponseduplicate['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))
                    {                 
                        setduplicateAssetValue2new(accountInfoResponseduplicate['account']['assets'][i]['amount'])
                        break;
                    }   
                }                    
    }    
        Instance2(location.state.allData);
        
    },[])



    useEffect(()=>{
        const Instance2AppId = async(b) =>{
            const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');                   
            let accountInfoResponseduplicate = await indexerClient.lookupAccountByID(localStorage.getItem('walletAddress')).do();            
            let lowduplicate =accountInfoResponseduplicate['account']['apps-local-state']['length'];            
            for(let i = 0; i < lowduplicate; i++)
                {                    
                    if(parseInt(accountInfoResponseduplicate['account']['apps-local-state'][i]['id']) === parseInt(configfile.fractionalappId))
                    {                 
                        setAlreadyAppOpt(true)
                        break;
                    }   
                }                    
    }
    Instance2AppId(location.state.allData);
    },[])


    // useEffect(()=>{
    //     const Testing =async(b)=>{
    //         const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');       
    //         let accountInfoResponseduplicate = await indexerClient.lookupAccountByID(b.ownerAddress).do();         
    //         let li =accountInfoResponseduplicate['account']['apps-local-state']['length']                        
    //         for(let j=0;j<li;j++){
    //             if(accountInfoResponseduplicate['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
    //             let l =accountInfoResponseduplicate['account']['apps-local-state'][j]['key-value']['length']            
    //             //let accountInfoResponseduplicate = await indexerClient.lookupAccountByID(b.EscrowAddress).do();
    //             //let lowduplicate =accountInfoResponseduplicate['account']['assets']['length']
    //             let escrowassetamount;
    //       for(let i = 0; i < lowduplicate; i++)
    //       {              
    //           if(parseInt(accountInfoResponseduplicate['account']['assets'][i]['asset-id']) === parseInt(b.Assetid))//escrow asset value
    //           {                  
    //               escrowassetamount=accountInfoResponseduplicate['account']['assets'][i]['amount']
    //               setduplicateAssetValue(accountInfoResponseduplicate['account']['assets'][i]['amount'])
    //               break;
    //           }   
    //       }           
    //         let newV;//price
    //         for(let i = 0; i < l; i++)
    //           {                  
    //               if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "cHJpY2U=")
    //               {                      
    //                   newV=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];                      
    //                   break;
    //               }   
    //           }          
    //           let newVnew;//assetamount
    //           for(let i = 0; i < l; i++)
    //             {                    
    //                 if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "YXNzZXRhbW91bnQ=")
    //                 {                        
    //                     newVnew=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];
    //                     break;
    //                 }   
    //             }          
    //           let newV2;//FALTargetPrice
    //           for(let i = 0; i < l; i++)
    //             {                    
    //                 if(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['key'] === "RkFMVGFyZ2V0UHJpY2U=")
    //                 {                        
    //                     newV2=accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint'];   
    //                     setValueIdNew2(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint']);   
    //                     setTargetPrice(accountInfoResponse['account']['apps-local-state'][0]['key-value'][i]['value']['uint']);                    
    //                     break;
    //                 }   
    //             }                                
    //             newV = (newV * newVnew)
    //             if(newV === newV2){                  
    //               setTrueDis(true)
    //             }
    //             else{                  
    //               setTrueDis(false)
    //             }
    //             }                
    //         }            
    //       }       
    //     Testing(location.state.allData);
    // },[])




    //Totallocal
    useEffect(()=>{
        const localstateNew1 =async(b)=>{        
        let accountInfoResponse = await indexClient.lookupAccountByID(location.state.allData.ownerAddress).do();                                                 
            let jl =accountInfoResponse['account']['apps-local-state']['length']                        
            for(let j = 0; j < jl; j++){                
                if(accountInfoResponse['account']['apps-local-state'][j]['id'] === configfile['fractionalappId']) {
                    let l =accountInfoResponse['account']['apps-local-state'][j]['key-value']['length']                     
                    for(let i = 0; i < l; i++)
                    {                                        
                        if(accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['key'] === "VG90YWxsb2NhbA=="){
                            setValueIdNew1((accountInfoResponse['account']['apps-local-state'][j]['key-value'][i]['value']['uint'])/1000000);
                            break;
                        }
                    }

                }                
            }                                                
        } 
        localstateNew1(location.state.allData)
    },[])


    //FALTargetPriceLocal
    useEffect(()=>{
        const localstateNew2 =async(b)=>{        
            let accountInfoResponse = await indexClient.lookupAccountByID(location.state.allData.ownerAddress).do();                                                 
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
        localstateNew2(location.state.allData)
    },[])


    //pricelocal
    useEffect(()=>{
        const alreadyOpt2=async()=>{
            if(location.state === null || location.state === undefined || location.state === "" ){
            }else{
            let accountInfoResponse = await indexClient.lookupAccountByID(location.state.allData.ownerAddress).do();                                                 
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
        }
        alreadyOpt2();
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
        else if((parseFloat(location.state.allData.NFTPrice)/1000000) >= algobalanceApp ){
            toast.warning(`your balance not enough to purchase this nft`,{autoClose:5000})
            handleHideLoad()            
        }        
        else{
        let minbalance=await minAlgoBalance()
        let minAss = await minBal()        
        let mbalance = (961000+1000+location.state.allData.NFTPrice+1000)
        if(minAss < mbalance){            
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
        else if(parseInt(algobalanceApp) <= ((parseInt(getAssetValueLocal))*(location.state.allData.NFTPrice/1000000)) && parseInt(algobalanceApp) <= ((parseInt(getAssetValueLocal)/10)*(location.state.allData.NFTPrice/1000000))){
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser...",{autoClose:5000});  
            handleHideLoad()
        }
        else{                        
            if(parseInt(getduplicateAssetValue2new) === 10 || parseInt(getduplicateAssetValue2new) === 100){
                toast.warning(`You are already Bought `,{autoClose:5000})
                handleHideLoad()
            }else{
                if(selectValue31 <= getAssetValueLocal || parseInt(selectValue31) === parseInt(getAssetValueLocal)){
                    let dbtxid;
                    if(parseInt(getAssetValueLocal) === parseInt(selectValue31))   {                            
                        handleShowLoad()  
                        toast.dismiss();
                        let index = parseInt(configfile['fractionalappId']);
                        let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));                                                                      
                        toast.info("NFT Purchase InProgress",{autoClose: 5000});              
                        const params = await algodClient.getTransactionParams().do();                
                        params.fee = 1000;
                        params.flatFee = true;              
                        let dataopreplace = dataauctionescrow.replaceAll("AppID",configfile['fractionalappId']).replaceAll("AssId",parseInt(location.state.allData.Assetid))            
                        let results = await algodClient.compile(dataopreplace).do();                
                        let program = new Uint8Array(Buffer.from(results.result, "base64"));                  
                        let lsig = new algosdk.LogicSigAccount(program);
                        let recv_escrow = lsig.address();                        
                        let amount = 3000;
                    try{             
                        let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                          from: localStorage.getItem('walletAddress'), 
                          to: recv_escrow, 
                          amount: amount,                        
                          suggestedParams: params
                         });               
                         let appArg = [];
                         let calculation = (parseFloat(selectValue31)*((getassetprice/1000000)*1000000))
                         console.log("Calc",calculation)
                         appArg.push(new Uint8Array(Buffer.from("investall")));                     
                         appArg.push(algosdk.encodeUint64(parseFloat(calculation)))
                         appArg.push(algosdk.encodeUint64(parseFloat(selectValue31)))
                         
                         //lsig
                            const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                                from: recv_escrow, 
                                appIndex: index,
                                appArgs: appArg,
                                accounts: [location.state.allData.ownerAddress],
                                foreignAssets : [parseInt(location.state.allData.Assetid)],
                                suggestedParams: params
                           });
                           
            
                           //popup
                           let transaction3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                                from: localStorage.getItem('walletAddress'), 
                                to: recv_escrow, 
                                amount:(parseFloat(selectValue31)*((getassetprice/1000000)*1000000)),                          
                                suggestedParams: params
                            });
            
                           //lsig
                            const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                                from: recv_escrow,
                                to: localStorage.getItem('walletAddress'),
                                assetIndex: parseInt(location.state.allData.Assetid),
                                note: undefined,
                                amount: (parseInt(selectValue31)),
                                suggestedParams: params
                            });
                      
                            let ftxna = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({          
                                from:recv_escrow,                     
                                assetIndex:parseInt(location.state.allData.Assetid),
                                freezeState:true,
                                freezeTarget:localStorage.getItem('walletAddress'),                      
                                suggestedParams: params
                            })       
                            
                            let transactionescrowtolister = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                                from:recv_escrow , 
                                to:location.state.allData.ownerAddress, 
                                amount: parseFloat(getTargetPrice),                
                                suggestedParams: params 
                            });
                      
                      const groupID = algosdk.computeGroupID([transaction1, transaction2, transaction3, transaction4,ftxna,transactionescrowtolister]);
                      const txs = [transaction1, transaction2, transaction3, transaction4,ftxna,transactionescrowtolister];
                      txs[0].group = groupID;//
                      txs[1].group = groupID;
                      txs[2].group = groupID;//
                      txs[3].group = groupID;
                      txs[4].group = groupID;            
                      txs[5].group = groupID;            
                      let response = ""
                      if(localStorage.getItem("walletName") === "myAlgoWallet")
                      {
                        if(getAlreadyAppOpt){                    
                        }else{                    
                            await OptinAppHere();                                
                        }
                        const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()]);
                        const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);            
                        const signedTx3 = algosdk.signLogicSigTransaction(txs[3], lsig);                  
                        const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);                                          
                        const signedTx4ETL = algosdk.signLogicSigTransaction(txs[5], lsig);                                          
                        response = await algodClient.sendRawTransaction([ signedTx1[0].blob,signedTx2.blob, signedTx1[1].blob, signedTx3.blob,signedTx4.blob,signedTx4ETL.blob]).do();                        
                        await waitForConfirmation(algodClient, response.txId);                    
                        let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
                      toast.success(toastDiv(id));
                      dbtxid=response.txId;
                      toast.success(`Asset Buying ${response.txId}`,{autoClose: 8000});                                                   
                      }
                      else if(localStorage.getItem("walletName") === "PeraWallet"){
                        toast.error(`Fractional NFT Not support in Perawallet`,{autoClose: 8000});   
                        handleHideLoad()
                        done()                                           
                      }                                                        
                      if(parseInt(getAssetValueLocal) === parseInt(selectValue31))   {                            
                        //db change here
                        let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
                        let dateset=new Date().toDateString();
                        if(location.state.allData.NFTType === undefined || location.state.allData.SocialLink === undefined || location.state.allData.NFTChannel === undefined)
                        {
                          firebase.auth().signInAnonymously().then((response)=>{                              
                              fireDb.database().ref(`imageSaleAlgosFractional/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                              fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                  Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                  EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                  NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                  ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                  TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                  Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                  CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                  NFTChannel:"",
                                  SocialLink:""     
                                    }).then(()=>{  
                                      fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:location.state.allData.CreatorAddress,previousoaddress:location.state.allData.ownerAddress,
                                          TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                          Claim:"true",
                                          NFTChannel:"",
                                          SocialLink:""}).then(()=>{
                                              fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                                  Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                                  EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                                  NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                                  ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                                  TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                                  Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                                  CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                                  NFTChannel:location.state.allData.NFTChannel,
                                                  SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                                    }).then(()=>{          
                                      let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                      const db = refactivity.push().key;                         
                                      refactivity.child(db).set({
                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                      EscrowAddress:"BuyNFT",keyId:db,
                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                      TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                      NFTChannel:"",
                                      SocialLink:""
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
                          })
              
                        }else{
                          firebase.auth().signInAnonymously().then((response)=>{                              
                              fireDb.database().ref(`imageSaleAlgosFractional/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                              fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                  Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                  EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                  NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                  ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                  TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                  Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                  CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                  NFTChannel:location.state.allData.NFTChannel,
                                  SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,
                                    }).then(()=>{          
                                      fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                          TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                          NFTChannel:location.state.allData.NFTChannel,
                                          SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                            }).then(()=>{          
                                      fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:location.state.allData.CreatorAddress,previousoaddress:location.state.allData.ownerAddress,
                                          TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                          Claim:"true",
                                          NFTChannel:"",NFTModel:location.state.allData.NFTModel,
                                          SocialLink:""}).then(()=>{
                                      let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
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
                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,
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
                          })
                        }
                        }else{                    
                          //db change here
                          let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
                          let dateset=new Date().toDateString();
                          if(location.state.allData.NFTType === undefined || location.state.allData.SocialLink === undefined || location.state.allData.NFTChannel === undefined)
                          {
                              firebase.auth().signInAnonymously().then((response)=>{                              
                                  //fireDb.database().ref(`imageSaleAlgosRoyalty/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                                  fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                      NFTChannel:"",
                                      SocialLink:"",
                                      NFTModel:location.state.allData.NFTModel,
                                      }).then(()=>{  
                                          fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                              Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                              EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                              NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                              ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                              TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                              Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                              CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                              Claim:"true",
                                              NFTChannel:"",
                                              NFTModel:location.state.allData.NFTModel,
                                              SocialLink:""}).then(()=>{
                                                  fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                                      NFTChannel:location.state.allData.NFTChannel,
                                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                                        }).then(()=>{          
                                          let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                          const db = refactivity.push().key;                         
                                          refactivity.child(db).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:"BuyNFT",keyId:db,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                          TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                          NFTChannel:"",
                                          SocialLink:""
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
                                  //})
                              })
              
                          }else{
                              firebase.auth().signInAnonymously().then((response)=>{                              
                                  //fireDb.database().ref(`imageSaleAlgosRoyalty/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                                  fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                      NFTChannel:location.state.allData.NFTChannel,
                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,
                                      }).then(()=>{          
                                          fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                              Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                              EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                              NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                              ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                              TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                              Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                              CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                              Claim:"true",
                                              NFTChannel:"",
                                              SocialLink:""}).then(()=>{
                                                  fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                                      NFTChannel:location.state.allData.NFTChannel,
                                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                                        }).then(()=>{          
                                          let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                          const db = refactivity.push().key;                         
                                          refactivity.child(db).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:"BuyNFT",keyId:db,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                          TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                          NFTChannel:location.state.allData.NFTChannel,NFTModel:location.state.allData.NFTModel,
                                          SocialLink:location.state.allData.SocialLink
                                      })
                                          .then(()=>{  
                                              //toast.dismiss()                                                                                    
                                              toast.success(`NFT Purchased Successfully`,{autoClose: 8000});                           
                                              handleHideLoad()
                                              done()                                
                                          })                                                                            
                                      }) 
                                  })
                                })                                            
                                })
                          }            
                        }
                    }catch (err) {        
                        console.error(err);
                        toast.warning(`you are facing error `,{autoClose:5000})
                        //done2()          
                    }

                    }else{
                        handleShowLoad()  
                        toast.dismiss();
                        let index = parseInt(configfile['fractionalappId']);
                        let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));                                                                      
                        toast.info("NFT Purchase InProgress",{autoClose: 5000});              
                        const params = await algodClient.getTransactionParams().do();                
                        params.fee = 1000;
                        params.flatFee = true;              
                        let dataopreplace = dataauctionescrow.replaceAll("AppID",configfile['fractionalappId']).replaceAll("AssId",parseInt(location.state.allData.Assetid))            
                        let results = await algodClient.compile(dataopreplace).do();                
                        let program = new Uint8Array(Buffer.from(results.result, "base64"));                  
                        let lsig = new algosdk.LogicSigAccount(program);
                        let recv_escrow = lsig.address();                        
                        let amount = 3000;
                    try{             
                        let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                          from: localStorage.getItem('walletAddress'), 
                          to: recv_escrow, 
                          amount: amount,                        
                          suggestedParams: params
                         });               
                         let appArg = [];
                         let calculation = (parseFloat(selectValue31)*((getassetprice/1000000)*1000000))
                         console.log("Calc",calculation)
                         appArg.push(new Uint8Array(Buffer.from("invest")));                     
                         appArg.push(algosdk.encodeUint64(parseFloat(calculation)))
                         appArg.push(algosdk.encodeUint64(parseFloat(selectValue31)))
                         
                         //lsig
                            const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                                from: recv_escrow, 
                                appIndex: index,
                                appArgs: appArg,
                                accounts: [location.state.allData.ownerAddress],
                                foreignAssets : [parseInt(location.state.allData.Assetid)],
                                suggestedParams: params
                           });
                           
            
                           //popup
                           let transaction3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                                from: localStorage.getItem('walletAddress'), 
                                to: recv_escrow, 
                                amount:(parseFloat(selectValue31)*((getassetprice/1000000)*1000000)),                          
                                suggestedParams: params
                            });
            
                           //lsig
                            const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                                from: recv_escrow,
                                to: localStorage.getItem('walletAddress'),
                                assetIndex: parseInt(location.state.allData.Assetid),
                                note: undefined,
                                amount: (parseInt(selectValue31)),
                                suggestedParams: params
                            });
                      
                            let ftxna = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({          
                                from:recv_escrow,                     
                                assetIndex:parseInt(location.state.allData.Assetid),
                                freezeState:true,
                                freezeTarget:localStorage.getItem('walletAddress'),                      
                                suggestedParams: params
                            })                         
                      
                      const groupID = algosdk.computeGroupID([transaction1, transaction2, transaction3, transaction4,ftxna]);
                      const txs = [transaction1, transaction2, transaction3, transaction4,ftxna];
                      txs[0].group = groupID;//
                      txs[1].group = groupID;
                      txs[2].group = groupID;//
                      txs[3].group = groupID;
                      txs[4].group = groupID;            
                      let response = ""
                      if(localStorage.getItem("walletName") === "myAlgoWallet")
                      {
                        if(getAlreadyAppOpt){                    
                        }else{                    
                            await OptinAppHere();                                
                        }
                        const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()]);
                        const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);            
                        const signedTx3 = algosdk.signLogicSigTransaction(txs[3], lsig);                  
                        const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);                                          
                        response = await algodClient.sendRawTransaction([ signedTx1[0].blob,signedTx2.blob, signedTx1[1].blob, signedTx3.blob,signedTx4.blob]).do();                        
                        await waitForConfirmation(algodClient, response.txId);                    
                        let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
                      toast.success(toastDiv(id));
                      dbtxid=response.txId;
                      toast.success(`Asset Buying ${response.txId}`,{autoClose: 8000});                                                   
                      }
                      else if(localStorage.getItem("walletName") === "PeraWallet"){
                        toast.error(`Fractional NFT Not support in Perawallet`,{autoClose: 8000});   
                        handleHideLoad()
                        done()                                           
                      }                                                        
                      if(parseInt(getAssetValueLocal) === parseInt(selectValue31))   {                            
                        //db change here
                        let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
                        let dateset=new Date().toDateString();
                        if(location.state.allData.NFTType === undefined || location.state.allData.SocialLink === undefined || location.state.allData.NFTChannel === undefined)
                        {
                          firebase.auth().signInAnonymously().then((response)=>{                              
                              fireDb.database().ref(`imageSaleAlgosFractional/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                              fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                  Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                  EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                  NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                  ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                  TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                  Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                  CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                  NFTChannel:"",
                                  SocialLink:""     
                                    }).then(()=>{  
                                      fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:location.state.allData.CreatorAddress,previousoaddress:location.state.allData.ownerAddress,
                                          TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                          Claim:"true",
                                          NFTChannel:"",
                                          SocialLink:""}).then(()=>{
                                              fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                                  Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                                  EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                                  NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                                  ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                                  TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                                  Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                                  CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                                  NFTChannel:location.state.allData.NFTChannel,
                                                  SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                                    }).then(()=>{          
                                      let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                      const db = refactivity.push().key;                         
                                      refactivity.child(db).set({
                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                      EscrowAddress:"BuyNFT",keyId:db,
                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                      TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                      NFTChannel:"",
                                      SocialLink:""
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
                          })
              
                        }else{
                          firebase.auth().signInAnonymously().then((response)=>{                              
                              fireDb.database().ref(`imageSaleAlgosFractional/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                              fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                  Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                  EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                  NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                  ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                  TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                  Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                  CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                  NFTChannel:location.state.allData.NFTChannel,
                                  SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,
                                    }).then(()=>{          
                                      fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                          TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                          NFTChannel:location.state.allData.NFTChannel,
                                          SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                            }).then(()=>{          
                                      fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:location.state.allData.CreatorAddress,previousoaddress:location.state.allData.ownerAddress,
                                          TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                          Claim:"true",
                                          NFTChannel:"",NFTModel:location.state.allData.NFTModel,
                                          SocialLink:""}).then(()=>{
                                      let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
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
                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,
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
                          })
                        }
                        }else{                    
                          //db change here
                          let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
                          let dateset=new Date().toDateString();
                          if(location.state.allData.NFTType === undefined || location.state.allData.SocialLink === undefined || location.state.allData.NFTChannel === undefined)
                          {
                              firebase.auth().signInAnonymously().then((response)=>{                              
                                  //fireDb.database().ref(`imageSaleAlgosRoyalty/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                                  fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                      NFTChannel:"",
                                      SocialLink:"",
                                      NFTModel:location.state.allData.NFTModel,
                                      }).then(()=>{  
                                          fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                              Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                              EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                              NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                              ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                              TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                              Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                              CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                                              Claim:"true",
                                              NFTChannel:"",
                                              NFTModel:location.state.allData.NFTModel,
                                              SocialLink:""}).then(()=>{
                                                  fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                                      NFTChannel:location.state.allData.NFTChannel,
                                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                                        }).then(()=>{          
                                          let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                          const db = refactivity.push().key;                         
                                          refactivity.child(db).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:"BuyNFT",keyId:db,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                          TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                          NFTChannel:"",
                                          SocialLink:""
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
                                  //})
                                })
              
                          }else{
                              firebase.auth().signInAnonymously().then((response)=>{                              
                                  //fireDb.database().ref(`imageSaleAlgosRoyalty/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                                  fireDb.database().ref(`imageFractionalBuyNew/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                      NFTChannel:location.state.allData.NFTChannel,
                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,
                                      }).then(()=>{          
                                          fireDb.database().ref(`FractionalClaim/${location.state.allData.CreatorAddress}`).child(location.state.allData.keyId).set({
                                              Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                              EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                              NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                              ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                              TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:localStorage.getItem('walletAddress'),
                                              Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                              CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",NFTModel:location.state.allData.NFTModel,
                                              Claim:"true",
                                              NFTChannel:"",
                                              SocialLink:""}).then(()=>{
                                                  fireDb.database().ref(`imageFractionalBuyNewTemp/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                                                      Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                                      EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                                                      NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                                                      TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                                                      Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                                      CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                                      NFTChannel:location.state.allData.NFTChannel,
                                                      SocialLink:location.state.allData.SocialLink,NFTModel:location.state.allData.NFTModel,Condition:false
                                                        }).then(()=>{          
                                          let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                          const db = refactivity.push().key;                         
                                          refactivity.child(db).set({
                                          Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                                          EscrowAddress:"BuyNFT",keyId:db,
                                          NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                                          TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                                          Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                                          CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                                          NFTChannel:location.state.allData.NFTChannel,NFTModel:location.state.allData.NFTModel,
                                          SocialLink:location.state.allData.SocialLink
                                      })
                                          .then(()=>{  
                                              //toast.dismiss()                                                                                    
                                              toast.success(`NFT Purchased Successfully`,{autoClose: 8000});                           
                                              handleHideLoad()
                                              done()                                
                                          })                                                                            
                                      }) 
                                  })
                                    })                                            
                                })
                          }            
                        }
                    }catch (err) {        
                        console.error(err);
                        toast.warning(`you are facing error `,{autoClose:5000})
                        //done2()          
                    }   
                    }                
                    }else{
                        toast.warning(`please enter ${selectValue31} below amount  `,{autoClose:5000})
                        handleHideLoad()
                    }                        
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
            let dataelem = dataauctionescrow.replaceAll("AppID",configfile['fractionalappId']).replaceAll("AssId",parseInt(location.state.allData.Assetid))            
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
                setMinStart(true)     
                doneduplicate()                                                               
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
                //setMinStart(true)                                                
                doneduplicate()                    
                }            
            }catch (err) {        
                console.error(err);
                toast.dismiss()
                toast.warning(`your browser appearing issue .`,{autoClose:5000})                
            }

            //popup             
              
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
            appIndex:configfile['fractionalappId'],          
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
                            <img src={CardImage} alt="img" className='img-fluid rounded-16' />
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
                                <h6 className='subheading mb-0'>NFT Remaining :  <strong>{getAssetValueLocal} </strong></h6>
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
                            {getTargetPrice === getValueIdNew1 ? (                            
                                <ButtonLoad disabled loading={loader} variant="blue" className='w-100'>Target End</ButtonLoad>                             
                            ):(
                            <>                                                              
                                {AssetOpt === false ? (
                                    <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyOptNFT()}}>Optin NFT</ButtonLoad>
                                ):( 
                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">                                    
                                    <Col md={4} xs={6}>
                                        <div className='mb-3'>                                            
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue31} 
                                            onChange={handleChange31}>
                                                <option value="10">10</option>                                                                                                 
                                                <option value="100">100</option>                                                
                                            </select>                                            
                                        </div>
                                        <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyNFT()}}>Buy NFT</ButtonLoad>
                                    </Col>                                       
                                    </div>
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

export default NFTDetailsFra;