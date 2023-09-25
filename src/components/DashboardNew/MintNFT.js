import React,{useEffect,useState,useContext} from 'react';
import Layout from './LayoutT';
import { Link ,useHistory} from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import Compress from "react-image-file-resizer";
import { ToastContainer, Zoom, toast} from 'react-toastify';
import configfile from '../../NFTFolder/config.json'
import dataEscrowauction from "../../Pyteal/escrowauctionnew";
import dataEscrowThiru from "../../Pyteal/escrowroyalty";
import dataauctioncreate from "../../Pyteal/escrowfractional";
import dataNFTcreate from "../../Pyteal/escrowNNFT";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from "@walletconnect/client";
import {ethers} from 'ethers';
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { minAlgoBalance } from '../../NFTFolder/formula';
import {DataContext} from "../../App";
import node from './nodeapi.json';
import jokerlogo from '../../assets/images/J-coin-2.svg';
import { nftMintAbi, nftMintAddress } from '../../abi/abi';
const axios = require('axios');
const algosdk = require('algosdk'); 
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const bridge = "https://bridge.walletconnect.org";

const MintNFT = () => {
    const value = useContext(DataContext);
    useEffect(() => {
      document.title = "ELEMENT | MintNFT"
    }, [])
    let history=useHistory();    
    const [MintStart,setMinStart] = useState(false)     
    const [algobalanceApp,setalgobalanceApp] = useState("");    
    const [selectValue,setSelectValue] = useState("Image");
    const [selectValue2,setSelectValue2] = useState("Sports");    
    const [selectValue31,setSelectValue31] = useState("NFT");  
    const [toAppOptAuction,setToAppOptAuction] = useState(false);             
    const [toAppOptFractional,setToAppOptFractional] = useState(false);                 
    const [selectValue311,setSelectValue311] = useState("10");       
    const handleChange311 = (e)=>{
        setSelectValue311(e.target.value)
    }             
    const [Check,setCheck] = useState(false);    
    const [Name,setName] = useState("");
    const [Links,setLink] = useState("");
    const [Description,setDescription] = useState("");
    const [Img,setImg] = useState("")
    const [Imgname,setImgname] = useState("") 
    const [getFile,setFile] = useState("") 
    const[getIProfile,setgetIProfile]=useState([""]);      
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
    const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);        
  

    function calculateMintValues(collateralAmount, fxsPrice, collateralPrice, globalCollateralRatio, mintingFee) {
      const PRICE_PRECISION = 1e6;
      
      // Calculate fxs_dollar_value_d18
      const fxsDollarValueD18 = (fxsPrice * 1e6) / PRICE_PRECISION;
  
      // Calculate c_dollar_value_d18
      const cDollarValueD18 = (collateralAmount * collateralPrice * 1e6) / PRICE_PRECISION;
  
      // Calculate calculated_fxs_dollar_value_d18
      const calculatedFxsDollarValueD18 = (cDollarValueD18 * 1e6 / globalCollateralRatio) - cDollarValueD18;
  
      // Calculate calculated_fxs_needed
      const calculatedFxsNeeded = (calculatedFxsDollarValueD18 * 1e6) / fxsDollarValueD18;
  
      // Calculate mint_amount
      let mintAmount = cDollarValueD18 + calculatedFxsDollarValueD18;
      mintAmount = (mintAmount * (1e6 - mintingFee)) / 1e6;
  
      // Calculate fxs_need_value
      const fxsNeedValue = (calculatedFxsNeeded * 70) / 100;
  
      // Calculate balance_fxs
      const balanceFxs = calculatedFxsNeeded - fxsNeedValue;
  
      // Calculate fxs_withoutPrice
      const fxsWithoutPrice = (balanceFxs * 1e6) / fxsPrice;
  
      // Calculate black_amount
      const blackAmount = (fxsWithoutPrice * 1e6) / 3229121670; // Replace FRAXBlackPrice with the actual value
  
      return {
          mintAmount,
          fxsNeedValue,
          blackAmount,
          calculatedFxsNeeded,
      };
  }
    useEffect(()=>{
      const AlreadyAppOptin=async()=>{

        const collateralAmount = 1000000000000000000; // Convert to Wei or use user input

        // Call the contract function to calculate minting parameters
        const fxsPrice = 3229121670;
        const colPrice = 2608626817447;
        const globalCollateralRatio = 10000;
        const inputParams = {
          fxs_price: fxsPrice,
          col_price_usd: colPrice,
          fxs_amount: 0, // Replace with the user's FXS input
          collateral_amount_d18: collateralAmount,
          col_ratio: globalCollateralRatio,
        };

        
        
        const collateralPrice = colPrice; // Enter the current collateral price
    
        const mintingFee = 0; // Enter the minting fee (in 1e6 precision)

        const {
        mintAmount,
        fxsNeedValue,
        blackAmount,
        calculatedFxsNeeded,
        } = calculateMintValues(collateralAmount, fxsPrice, collateralPrice, globalCollateralRatio, mintingFee);

        console.log("Mint Amount:", mintAmount/1e18);//frax
        console.log("FXS Need Value:", fxsNeedValue/1e9);//dime minted
        console.log("Black Amount:", blackAmount/1e9);//black amount
        console.log("Calculated FXS Needed:", (calculatedFxsNeeded/1e9));



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
      const AlreadyAppOptinFractional=async()=>{
        let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();                        
        const apps = accountInfo['account']['apps-local-state'];
        let appCount = apps['length'];
        for(let j = 0; j < appCount; j++)
        { 
            if(accountInfo['account']['apps-local-state'][j]['id'] === configfile.fractionalappId)
            {
              setToAppOptFractional(true);
              break;
            }
        }
      }  
      
      AlreadyAppOptinFractional();

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

      
    const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        setImgname(file.name)
        setFile(file)
        const MIN_FILE_SIZE = 1024 // 1KB
        const MAX_FILE_SIZE = 500120 // 500KB
        let fileSizeKiloBytes = file.size 
        let c=0;
        if(fileSizeKiloBytes < MIN_FILE_SIZE){
          toast.dismiss();
          toast.error("File size is less than minimum limit",{autoClose:3000});          
          c=c+1;
          handleHideLoad()                               
          await sleep(4000);
          window.location.reload(false)
        }
        if(fileSizeKiloBytes > MAX_FILE_SIZE){
          toast.dismiss();
          toast.error("File size is greater than maximum limit",{autoClose:3000});      
          c=c+1;
          handleHideLoad()  
          await sleep(4000);                             
          window.location.reload(false)
        }        
        if(c===0){
        let reader = new window.FileReader()
        try{
        Compress.imageFileResizer(file, 500, 500, 'JPEG', 200, 0,
        uri => {          
            setImg(uri)          
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)        
        }catch (err) {      
        }
        }else{
          toast.dismiss();
          toast.error("Support file size: 1 kb to 500 kb ",{autoClose:3000});                
          handleHideLoad()                               
          await sleep(4000);
          window.location.reload(false)
          
        }
        
    }; 

    const dbcallProfile=async()=>{            
        let r=[];
        try {         
        firebase.auth().signInAnonymously().then((response)=>{      
        firebase.database().ref("userprofile").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
          if (data) {                      
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
          }
          else{
            setgetIProfile([""]);  
          }
          setgetIProfile(r);
        });    
        })              
      } catch (error) {        
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
    const mintAppNFT =async() =>{
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;          
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
          toast.warning(`please connect your wallet`,{autoClose: 5000});            
          handleHideLoad()                     
        }
       
        else{        
        handleShowLoad()  
        const web3 = await connectToEthereum();
        if (!web3) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const NFTMintCOntract = new ethers.Contract(nftMintAddress, nftMintAbi, web3.getSigner(account));

        const val = 10000000000000;
        // Send the transaction and wait for it to be mined
        const mintTx = await NFTMintCOntract.mint("https://gateway.pinata.cloud/ipfs/QmZcz41ttsTeerTa9wb9cjtCE3GRFPc22DUSswWbtF2Yui", { value: val });
        await mintTx.wait();
        toast.success("Mint NFT successful",{autoClose: 5000}); 
        // setMinStart(true)
        handleHideLoad() 
  }           
}
    const mintNFT = async() =>{        
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;          
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                      
          toast.warning(`please connect your wallet`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else if(Name === "" || Name  === undefined || Name === null){          
          toast.warning(`please enter NFT Name`,{autoClose: 5000}); 
          handleHideLoad()                     
        }
        else if(!/\S/.test(Name)){          
          toast.warning(`only space not allowed`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else if(format.test(Name)){          
          toast.warning(`please enter valid NFT Name special character not allowed`,{autoClose: 5000});            
          handleHideLoad()                     
        }                
        else if(Img === "" || Img === undefined || Img === null){          
          toast.warning(`please Select Image`,{autoClose: 5000});            
          handleHideLoad()                   
        }
        else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 2){          
          toast.warning(`Insufficient balance to create NFT`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else if( Check === false){          
          toast.warning(`please accept declaration`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else{
        let minbalance=await minAlgoBalance()
        if(minbalance < (101000)){
            toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});  
            handleHideLoad()           
        }
        else{                    
            handleShowLoad()  
            toast.info("Minting ASA",{autoClose: 5000});             
            let tb='ASA';                                          
            const params = await algodClient.getTransactionParams().do();
            params.fee = 1000;
            params.flatFee = true;                    
            const myAlgoConnect = new MyAlgoConnect();      
            toast.info("Image Uploading in IPFS",{autoClose: 5000});                          
            const formData = new FormData();
            formData.append("file",getFile);
            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                  'pinata_api_key': value[0].pinataapikey,
                  'pinata_secret_api_key': value[0].pinatasecretkey,
                  "Content-Type": "multipart/form-data"
              },
            });
            const realipfsurl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;                  
            const addnfturl = `ipfs://${resFile.data.IpfsHash}`            
            localStorage.setItem("realipfsurl",realipfsurl)
            //QmQrBqkyTmKR9UQVFYCGEeWhaj4GG46T1uUu48hgpugRr2
            if(selectValue31 === "NFT"){              
              const txn1newnew = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
                from:localStorage.getItem('walletAddress'),
                assetName: `${Name}@arc3 `,
                unitName: tb,
                total: 1,
                decimals: 0,
                note: undefined,        
                assetURL:addnfturl,
                manager:localStorage.getItem('walletAddress'),
                reserve:localStorage.getItem('walletAddress'),
                freeze:localStorage.getItem('walletAddress'),
                clawback:localStorage.getItem('walletAddress'),
                suggestedParams: params
                });      
                let responsenew;
                try{
                if(localStorage.getItem("walletName") === "myAlgoWallet"){
                  const signedTxn = await myAlgoConnect.signTransaction(txn1newnew.toByte());
                  responsenew = await algodClient.sendRawTransaction(signedTxn.blob).do(); 
                  await waitForConfirmation(algodClient, responsenew.txId);
                }else if( localStorage.getItem("walletName") === "PeraWallet"){
                  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });                  
                  const txns = [txn1newnew]              
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
                responsenew=await algodClient.sendRawTransaction(decodedResult).do();
                await waitForConfirmation(algodClient,responsenew.txId);
                }            
                let ptx = await algodClient.pendingTransactionInformation(responsenew.txId).do();
                let assetID = ptx["asset-index"];                 
                localStorage.setItem("AssetId",assetID)
                toast.success("Mint ASA successful",{autoClose: 5000}); 
                setMinStart(true)
                handleHideLoad()           
            }catch (err) {                    
                console.error(err);                
                toast.error("your browser appearing issue",{autoClose: 5000});                     
                handleHideLoad()
                done()            
            } 

            }
            else if(selectValue31 === "Royalty-NFT"){

              const txn1new = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
                from:localStorage.getItem('walletAddress'),
                assetName: `${Name}@arc3 `,
                unitName: tb,
                total: 1,
                decimals: 0,
                note: undefined,        
                assetURL:addnfturl,
                manager:localStorage.getItem('walletAddress'),
                reserve:localStorage.getItem('walletAddress'),
                freeze:localStorage.getItem('walletAddress'),
                clawback:localStorage.getItem('walletAddress'),
                suggestedParams: params
                });      
                let responsenew;
                try{
                if(localStorage.getItem("walletName") === "myAlgoWallet"){
                  const signedTxn = await myAlgoConnect.signTransaction(txn1new.toByte());
                  responsenew = await algodClient.sendRawTransaction(signedTxn.blob).do(); 
                  await waitForConfirmation(algodClient, responsenew.txId);
                }else if( localStorage.getItem("walletName") === "PeraWallet"){
                  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });                  
                  const txns = [txn1new]              
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
                responsenew=await algodClient.sendRawTransaction(decodedResult).do();
                await waitForConfirmation(algodClient,responsenew.txId);
                }            
                let ptx = await algodClient.pendingTransactionInformation(responsenew.txId).do();
                let assetID = ptx["asset-index"];                   
                localStorage.setItem("AssetId",assetID)
                toast.success("Mint ASA successful",{autoClose: 5000}); 
                setMinStart(true)
                handleHideLoad()           
            }catch (err) {                    
                console.error(err);                                
                toast.error("your browser appearing issue",{autoClose: 5000});                     
                handleHideLoad()
                done()                
            }   

            }
            else if(selectValue31 === "Auction-NFT"){
             
              const txn1newnew = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
                from:localStorage.getItem('walletAddress'),
                assetName: `${Name}@arc3 `,
                unitName: tb,
                total: 1,
                decimals: 0,
                note: undefined,        
                assetURL:addnfturl,
                manager:localStorage.getItem('walletAddress'),
                reserve:localStorage.getItem('walletAddress'),
                freeze:localStorage.getItem('walletAddress'),
                clawback:localStorage.getItem('walletAddress'),
                suggestedParams: params
                });      
                let responsenew;
                try{
                if(localStorage.getItem("walletName") === "myAlgoWallet"){
                  const signedTxn = await myAlgoConnect.signTransaction(txn1newnew.toByte());
                  responsenew = await algodClient.sendRawTransaction(signedTxn.blob).do(); 
                  await waitForConfirmation(algodClient, responsenew.txId);
                }else if( localStorage.getItem("walletName") === "PeraWallet"){
                  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });                  
                  const txns = [txn1newnew]              
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
                responsenew=await algodClient.sendRawTransaction(decodedResult).do();
                await waitForConfirmation(algodClient,responsenew.txId);
                }            
                let ptx = await algodClient.pendingTransactionInformation(responsenew.txId).do();
                let assetID = ptx["asset-index"];                   
                localStorage.setItem("AssetId",assetID)
                toast.success("Mint ASA successful",{autoClose: 5000}); 
                setMinStart(true)
                handleHideLoad()                         
            }catch (err) {                    
                console.error(err);                
                toast.error("your browser appearing issue",{autoClose: 5000});                     
                handleHideLoad()
                done()                
            }               
            }
            else{
                let txn2new;
                if(parseInt(selectValue311) === "100" || parseInt(selectValue311) === 100){                
                    txn2new = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
                    from:localStorage.getItem('walletAddress'),
                    assetName: `${Name}@arc3 `,
                    unitName: tb,
                    total: parseInt(selectValue311),
                    decimals: 2,
                    note: undefined,        
                    assetURL:addnfturl,
                    manager:localStorage.getItem('walletAddress'),
                    reserve:localStorage.getItem('walletAddress'),
                    freeze:localStorage.getItem('walletAddress'),
                    clawback:localStorage.getItem('walletAddress'),
                    suggestedParams: params
                    });      
                }else{
                    txn2new = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
                    from:localStorage.getItem('walletAddress'),
                    assetName: Name ,
                    unitName: tb,
                    total: parseInt(selectValue311),
                    decimals: 1,
                    note: undefined,        
                    assetURL:'https://devnet.elementfi.io/',
                    manager:localStorage.getItem('walletAddress'),
                    reserve:localStorage.getItem('walletAddress'),
                    freeze:localStorage.getItem('walletAddress'),
                    clawback:localStorage.getItem('walletAddress'),
                    suggestedParams: params
                    });      
                }              
                let response2new;
                try{
                if(localStorage.getItem("walletName") === "myAlgoWallet"){
                  const signedTxn = await myAlgoConnect.signTransaction(txn2new.toByte());
                  response2new = await algodClient.sendRawTransaction(signedTxn.blob).do(); 
                  await waitForConfirmation(algodClient, response2new.txId);
                }else if( localStorage.getItem("walletName") === "PeraWallet"){
                  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });                  
                  const txns = [txn2new]              
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
                response2new=await algodClient.sendRawTransaction(decodedResult).do();
                await waitForConfirmation(algodClient,response2new.txId);
                }            
                let ptx = await algodClient.pendingTransactionInformation(response2new.txId).do();
                let assetID = ptx["asset-index"];                   
                localStorage.setItem("AssetId",assetID)
                toast.success("Mint ASA successful",{autoClose: 5000}); 
                setMinStart(true)
                handleHideLoad()                                           
            }catch (err) {                    
                console.error(err);                
                toast.error("your browser appearing issue",{autoClose: 5000});                     
                handleHideLoad()
                done()                
            } 
            }                                                             
        }
      }
    }

    const AppOptinHere=async()=>{
      const params = await algodClient.getTransactionParams().do();
      params.fee = 1000;
      params.flatFee = true;        
      let dataopreplace = dataEscrowThiru.replaceAll("AppID",configfile['royaltyappId']).replaceAll("AssId",parseInt(localStorage.getItem('AssetId')))        
      let results = await algodClient.compile(dataopreplace).do();                
      let program = new Uint8Array(Buffer.from(results.result, "base64"));            
      let lsig = new algosdk.LogicSigAccount(program);
      let transaction1 = algosdk.makeApplicationOptInTxnFromObject({
        from: lsig.address(),                     
        appIndex:configfile['royaltyappId'],          
        suggestedParams: params
       });
       const signedTx2 = algosdk.signLogicSigTransaction(transaction1, lsig);
       let response2 = await algodClient.sendRawTransaction(signedTx2.blob).do();            
       await waitForConfirmation(algodClient,response2.txId);
       let id = "https://testnet.algoexplorer.io/tx/" + response2.txId;
       toast.success(toastDiv(id));       
       await storeDBOnly(localStorage.getItem('AssetId'),response2.txId,localStorage.getItem("walletAddress"),Img,configfile['royaltyappId'])
    }
    
    const AppOptinHereNFT=async()=>{
      const params = await algodClient.getTransactionParams().do();
      params.fee = 1000;
      params.flatFee = true;        
      let dataopreplace = dataNFTcreate.replaceAll("AppID",configfile['NFTappId']).replaceAll("AssId",parseInt(localStorage.getItem('AssetId')))        
      let results = await algodClient.compile(dataopreplace).do();                
      let program = new Uint8Array(Buffer.from(results.result, "base64"));            
      let lsig = new algosdk.LogicSigAccount(program);
      let transaction1 = algosdk.makeApplicationOptInTxnFromObject({
        from: lsig.address(),                     
        appIndex:configfile['NFTappId'],          
        suggestedParams: params
       });
       const signedTx2 = algosdk.signLogicSigTransaction(transaction1, lsig);
       let response2 = await algodClient.sendRawTransaction(signedTx2.blob).do();            
       await waitForConfirmation(algodClient,response2.txId);
       let id = "https://testnet.algoexplorer.io/tx/" + response2.txId;
       toast.success(toastDiv(id));       
       await storeDBOnly(localStorage.getItem('AssetId'),response2.txId,localStorage.getItem("walletAddress"),Img,configfile['NFTappId'])  
    
    }
    
    const AppOptinHere2new=async()=>{
      const params = await algodClient.getTransactionParams().do();
      params.fee = 1000;
      params.flatFee = true;        
      let dataopreplace = dataauctioncreate.replaceAll("AppID",configfile['fractionalappId']).replaceAll("AssId",parseInt(localStorage.getItem('AssetId')))        
      let results = await algodClient.compile(dataopreplace).do();                
      let program = new Uint8Array(Buffer.from(results.result, "base64"));            
      let lsig = new algosdk.LogicSigAccount(program);
      let transaction1 = algosdk.makeApplicationOptInTxnFromObject({
        from: lsig.address(),                     
        appIndex:configfile['fractionalappId'],          
        suggestedParams: params
       });
       const signedTx2 = algosdk.signLogicSigTransaction(transaction1, lsig);
       let response2 = await algodClient.sendRawTransaction(signedTx2.blob).do();            
       await waitForConfirmation(algodClient,response2.txId);
       let id = "https://testnet.algoexplorer.io/tx/" + response2.txId;
       toast.success(toastDiv(id));       
       await storeDBOnly(localStorage.getItem('AssetId'),response2.txId,localStorage.getItem("walletAddress"),Img,configfile['fractionalappId'])
    }

    const AppOptinHereAuction=async()=>{
      const params = await algodClient.getTransactionParams().do();
      params.fee = 1000;
      params.flatFee = true;        
      let dataopreplace = dataEscrowauction.replaceAll("AppID",configfile['auctionappId']).replaceAll("AssId",parseInt(localStorage.getItem('AssetId')))        
      let results = await algodClient.compile(dataopreplace).do();                
      let program = new Uint8Array(Buffer.from(results.result, "base64"));            
      let lsig = new algosdk.LogicSigAccount(program);
      let transaction1 = algosdk.makeApplicationOptInTxnFromObject({
        from: lsig.address(),                     
        appIndex:configfile['auctionappId'],          
        suggestedParams: params
       });
       const signedTx2 = algosdk.signLogicSigTransaction(transaction1, lsig);
       let response2 = await algodClient.sendRawTransaction(signedTx2.blob).do();            
       await waitForConfirmation(algodClient,response2.txId);
       let id = "https://testnet.algoexplorer.io/tx/" + response2.txId;
       toast.success(toastDiv(id));   
        //if(toAppOptAuction){        
        await storeDBOnly(localStorage.getItem('AssetId'),response2.txId,localStorage.getItem("walletAddress"),Img,configfile['auctionappId'])
        //}else{
        //await AppNewOptin();        
        //await storeDBOnly(localStorage.getItem('AssetId'),response2.txId,localStorage.getItem("walletAddress"),Img,configfile['auctionappId'])
        //}
       
    }

    // const AppNewOptin=async()=>{
    //   const params = await algodClient.getTransactionParams().do();
    //   params.fee = 1000;
    //   params.flatFee = true;            
    //   let transaction1 = algosdk.makeApplicationOptInTxnFromObject({
    //     from: localStorage.getItem('walletAddress'),                     
    //     appIndex:configfile['auctionappId'],          
    //     suggestedParams: params
    //   });
    //   let response2new;
    //   if(localStorage.getItem("walletName") === "myAlgoWallet"){
    //     const signedTx1 = await myAlgoWallet.signTransaction(transaction1.toByte());    
    //     response2new = await algodClient.sendRawTransaction(signedTx1.blob).do();            
    //   }else if(localStorage.getItem("walletName") === "PeraWallet"){
    //     const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    //     const txns = [transaction1]            
    //     const txnsToSign = txns.map(txn => {
    //     const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");            
    //     return {
    //     txn: encodedTxn,
    //     };
    //     });                        
    //     const requestParams = [ txnsToSign ];
    //     const request = formatJsonRpcRequest("algo_signTxn", requestParams);
    //     const result = await connector.sendCustomRequest(request);
    //     const decodedResult = result.map(element => {
    //         return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    //     });                          
    //     response2new = await algodClient.sendRawTransaction(decodedResult).do()                      
    //   }         
    //   await waitForConfirmation(algodClient,response2new.txId);
    //   let id = "https://testnet.algoexplorer.io/tx/" + response2new.txId;
    //   toast.success(toastDiv(id));                  
    // }        

    const handleChange = (e)=>{
      setSelectValue(e.target.value)
    }
    const handleChange2 = (e)=>{
      setSelectValue2(e.target.value)
    }
    const handleChange3 = (e)=>{
      setCheck(e.target.checked)
    }
    const handleChange31 = (e)=>{
      setSelectValue31(e.target.value)
    }    
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const done=async()=>{
      await sleep(7000);
      history.push("/Mint-NFT")      
    } 
    const done2=async()=>{
      await sleep(5000);
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

    const clearImage = () =>{
      setImg("")
    }

    const storeDBOnly=async(assetID,responsetxId,addresseswall,realipfsurls,appIdSet)=>{      
      let appId = appIdSet;
      let realipfsurl = localStorage.getItem("realipfsurl")
      let dateset=new Date().toDateString();         
      if(getIProfile[0].valid === "validated"){                
        firebase.auth().signInAnonymously().then((response)=>{      
        let ref2=fireDb.database().ref(`imagerefAlgoRoyalty/${addresseswall}`);
        let ref22=fireDb.database().ref(`imagerefAlgoltRoyalty`);   
        let refactivity=fireDb.database().ref(`activitytable/${addresseswall}`);   
        const db = ref2.push().key;                                                
        ref2.child(db).set({
          Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
          NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,ownerAddress:addresseswall,previousoaddress:"",
          TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
          CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
        })
          .then(()=>{
            refactivity.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
              })
            .then(()=>{                                        
            ref22.child(db).set({
            Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
            NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,ownerAddress:addresseswall,previousoaddress:"",
            TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
            CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
              })
          .then(()=>{                                                                 
            let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                    const db = refactivity.push().key;                         
                    refactivity.child(db).set({
                    Assetid:assetID,Imageurl:Img,NFTPrice:"",
                    EscrowAddress:"Create Asset",keyId:db,
                    NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,
                    ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'), 
                    TimeStamp:dateset,NFTDescription:responsetxId,HistoryAddress:"",
                    Appid:"",valid:"",
                    CreatorAddress:localStorage.getItem('walletAddress'),
                    NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
                })
                    .then(()=>{	                      
                        toast.dismiss()
                        toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                        handleHideLoad()
                        done2();            
            })                
          })              
          })
        })                                                                                                           
        })
      }
      else{        
        firebase.auth().signInAnonymously().then((response)=>{      
        let ref2=fireDb.database().ref(`imagerefAlgoRoyalty/${addresseswall}`);
        let ref22=fireDb.database().ref(`imagerefAlgoltRoyalty`);   
        let refactivity=fireDb.database().ref(`activitytable/${addresseswall}`);   
        const db = ref2.push().key;                                                
        ref2.child(db).set({
          Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
          NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,ownerAddress:addresseswall,previousoaddress:"",
          TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
          CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
        })
          .then(()=>{
            refactivity.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
              })
                .then(()=>{                                        
            ref22.child(db).set({
            Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
            NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,ownerAddress:addresseswall,previousoaddress:"",
            TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
            CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
              })
          .then(()=>{                                                                 
                    refactivity.child(db).set({
                    Assetid:assetID,Imageurl:Img,NFTPrice:"",
                    EscrowAddress:"Create Asset",keyId:db,
                    NFTName:Name,userSymbol:"ASA",Ipfsurl:realipfsurl,
                    ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'), 
                    TimeStamp:dateset,NFTDescription:responsetxId,HistoryAddress:"",
                    Appid:"",valid:"",
                    CreatorAddress:localStorage.getItem('walletAddress'),
                    NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links,NFTModel:selectValue31
                })
                    .then(()=>{				                      
                        toast.dismiss()
                        toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                        handleHideLoad()
                        done2();                         
            })                  
          })              
          })
        })                                                                                                           
        })
      }                                  
    }

    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7}>
                        <Card className='card-dash border-0 d-block'>
                            <div className=' '>
                                {/* {getIProfile === "" || getIProfile === null || getIProfile === undefined || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ?(
                                    <Link to="/create-artist" className='btn order-2 btn-outline-purple'>Create Artist</Link>
                                ):(
                                    
                                    <p className='btn order-2 btn-outline-purple'>{getIProfile[0].UserName}</p>                                    
                                )} */}
                                
                                <div>
                                   <center> <h3 className='mb-1'>Joker Protocol Earlier Stage NFT</h3></center>
                                    {/* <p>Mint NFT</p> */}
                                </div>
                            </div>
                            <hr className='my-4' />

                            <Form>
                                <div className=''>
                                   <center> <label> <b>JOKER NFT</b></label></center>
                                    {/* <input id="inputID" type="text" placeholder='Enter the nft name' className="form-control form-control-field border-0" 
                                    // onChange={event => setName( event.target.value)}
                                    value="JOKER"
                                    /> */}
                                </div>
                                {/* <Row>
                                <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>NFT Model</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue31} 
                                            onChange={handleChange31}>
                                                <option value="NFT">NFT</option>
                                                <option value="Royalty-NFT">Royalty-NFT</option>                                                
                                                <option value="Fractional-NFT">Fractional-NFT</option>                                                
                                                <option value="Auction-NFT">Auction-NFT</option>                                                
                                            </select>
                                        </div>
                                    </Col>
                                    <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>Artwork Type</label>
                                            <select className="form-control form-control-field border-0" 
                                            defaultValue={selectValue} 
                                            onChange={handleChange} >                                                
                                                <option value="Image">Image</option>                                  
                                            </select>
                                        </div>
                                    </Col>
                                    <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>Channel</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue2} 
                                            onChange={handleChange2}>
                                                <option value="Sports">Sports</option>
                                                <option value="Pet">Pet</option>
                                                <option value="Arts">Arts</option>
                                                <option value="Photography">Photography</option>
                                                <option value="Trading Cards">Trading Cards</option>
                                            </select>
                                        </div>
                                    </Col>
                                    {selectValue31 === "Fractional-NFT" ? (
                                      <Col md={4} xs={6}>
                                        <div className='mb-3'>                                            
                                          <label>Total Supply</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue311} 
                                            onChange={handleChange311}>
                                                <option value="10">10</option>                                                
                                                <option value="100">100</option>                                                
                                            </select>
                                        </div>                                        
                                    </Col>
                                    ):(
                                        <></>
                                    )}                                    
                                </Row>
                                <div className='mb-3'>
                                    <label>Social Media link</label>
                                    <input id="inputID" type="url" placeholder='Enter the valid Link' className="form-control form-control-field border-0" onChange={event => setLink( event.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Description</label>
                                    <textarea id="inputID" rows="4" placeholder='Write something about your artwork' className="form-control form-control-field border-0"  onChange={event => setDescription( event.target.value)}/>
                                </div> */}
                                <div className='mb-3'>
                                    {/* <label>Upload</label> */}

                                    <div className='upload-box text-center'>

                                      {/* {Img === null || Img === "" || Img === undefined ?(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img </p>                                           
                                        </label>
                                            <p id="inputID">Support file size: 1 kb to 500 kb </p>
                                        </>
                                      ):(
                                        <> */}
                                        {/* <input id="upload" type="file" hidden onChange = {captureFile}/> */}
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        {/* <Button variant='link' className='p-0 text-white btn-closeimg' onClick={()=>{clearImage()}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi m-0 bi-x-circle-fill" viewBox="0 0 16 16">
                                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                            </svg>
                                        </Button>  */}
                                        <img src={jokerlogo} alt="Img" className='img-fluid w-100 rounded-16' />            
                                        </label>
                                        {/* </>
                                      )} */}
                                        
                                    </div>
                                    <div className=''>
                                   <center> <label>Price:&nbsp; <b>0.00001 ETH</b></label></center>
                                    {/* <input id="inputID" type="text" placeholder='Enter the nft name' className="form-control form-control-field border-0" 
                                    // onChange={event => setName( event.target.value)}
                                    value="JOKER"
                                    /> */}
                                </div>
                                </div>
                                <div className='mb-3'>
                                <Form.Check 
                                    onChange={e => handleChange3(e)}                                    
                                    type="checkbox"
                                    id="terms"
                                    label="I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the artwork can be removed anytime if detected."
                                />
                                </div>
                                {/* {MintStart === false ? (
                                  <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{mintNFT()}}>Mint ASA</ButtonLoad>
                                ):( */}
                                  <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{mintAppNFT()}}>Mint NFT</ButtonLoad>
                                {/* )}                                                                                                 */}
                            </Form>

                            
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

export default MintNFT;