import { useState,useEffect } from "react";
import { Button, Col, FormControl, InputGroup, Modal, OverlayTrigger, Row, Stack, Tooltip } from "react-bootstrap";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from '../walletconnection';
import algosdk, { Algod ,encodeUint64} from "algosdk";
import ButtonLoad from 'react-bootstrap-button-loader';
import node from '../nodeapi.json';
// import elemlogo from '../../../assets/images/elem-original.png';
import elemlogo from '../../../assets/images/dime.jpeg';
// import blackLogo from '../../../assets/images/black.jpeg';
import axios from "axios";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { PtpstakingAppAdress,usdcStakingappid,usdcStakingappaddress,swapAppId,PTP,VEPTP,oldveptp,usdtStakingappaddress,usdtStakingappid,lpstakingAppId,USDC,USDT,USDCE,USDTE, UsdcAppId, TauStakingappaddress, TAUE } from '../singlesidedAmmconfig';
import { checkotp, walletBalance } from "../../formula";
import { globalstate } from "../../StableswapConfig";
import { createtpairhistory } from "../../apicallfunction";
import { ethers } from "ethers";
import { JOKERAddress, JOKERABI2,DIMEAddress, DIMELPStakingAddress, DimeAbi, DimeContractABI, DimeStakingAbi, DimeStakingAddress, JOKERLPStakingAddress, StakingContractABI, uniswapNFTContractABI, uniswapNFTContractAddress, StakingJOKERABI, JOKERStakingAddress } from "../../../abi/abi";

import jokercoin from '../../../assets/images/Jokercoin.png';
import stasiscoin  from '../../../assets/images/stasiscoin.png';
// import creditscoin from '../../assets/images/creditscoin.png';

const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');
const bridge = "https://bridge.walletconnect.org";
/* global BigInt */


function PoolChild() {
    const [show, setShow] = useState(false);
    const [BondAmount, setBondAmount] = useState();
    const handleToggle = () => setShow(!show);
    const[functname, setfunctname] = useState("");
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[loader, setLoader] = useState(false);
    const[totalusdte, settotalusdte] = useState("");
    const[totalusdce, settotalusdce] = useState("");
    const[totaltaue, settotaltaue] = useState("");
    const[stakedAmount, setstakedAmount] = useState("");
    const[usdcebalance, setusdcebalance] = useState("");
    const[usdceoptin, setusdceoptin] = useState(true);
    const[veptpptpbalance, setveptpptpbalance] = useState("");
    const[ptpbalance, setptpbalance] = useState("");
    const[baseApr, setbaseApr] = useState("");
    const[BoostingApr, setBoostingApr] = useState("");
    const[appOpted,setOpted] = useState(false);
    const[totalApr, settotalApr] = useState("");
    const[ptpptpoptin, setptpptpoptin] = useState(true);
    const[claimamount, setclaimamount] = useState("");
    const handleShowLoad1 = () => setLoader1(true);
    const handleHideLoad1 = () => setLoader1(false);
    const[loader1, setLoader1] = useState(false);
    const[swapstate,setswapstate] = useState([])


    const[TotalStakedAmount,setTotalStakedAmount] = useState("")
    const[mystaked,setmystaked] = useState("")
    const[allowan,setAllowance] = useState(false)
    const[myBalance,setmyBalance] = useState("")
    const[stakevalue,setstakevalue] = useState("")
    const[stakevalue2,setstakevalue2] = useState("")
    const[Jokerbalance,setJokerbalance] = useState("")
    const[Myreward,setMyreward] = useState("")
    const[unstakeTime,setunstakeTime] = useState("")
    const[walletNFTLiquidity,setwalletNFTLiquidity] = useState("")
    const[walletNFTID,setwalletNFTID] = useState("")

    

    console.log("unstakeTime",unstakeTime)

    useEffect(()=>{displayValueCalculation()},[])

    const displayValueCalculation = async() =>{
      if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
      }
      else{
          console.log("useeffect")
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          // console.log("Connected Successfully", account);

          //new codes
          const dimeStakingLPContract = new ethers.Contract(JOKERAddress, JOKERABI2, provider);
          const dimeStakingContract = new ethers.Contract(JOKERStakingAddress, StakingJOKERABI, provider);
        //   const uniswapNFTContract = new ethers.Contract(uniswapNFTContractAddress, uniswapNFTContractABI, provider);
          
          let totalLpLiquidity =  ethers.utils.formatUnits(await dimeStakingLPContract.balanceOf(JOKERStakingAddress),0);
          setTotalStakedAmount(parseFloat(totalLpLiquidity)/1e9);
          console.log("totalLpLiquidity",totalLpLiquidity)

          let jokerbal = await dimeStakingLPContract.balanceOf(localStorage.getItem("walletAddress"));
          setJokerbalance(jokerbal);

          let myRewards = ethers.utils.formatUnits(await dimeStakingContract.pendingBlack(localStorage.getItem("walletAddress")),0);
          setMyreward(parseFloat(myRewards/1e9));
          console.log("rewards",parseFloat(myRewards));

          let stakedAMount = await dimeStakingContract.userInfo(localStorage.getItem("walletAddress"));
          let myDepositAmount = ethers.utils.formatUnits(stakedAMount.amount,0);
          setmystaked(myDepositAmount/1e9);
          console.log("staked",parseFloat(myDepositAmount).toFixed(6));

          

        //   let myRewards = ethers.utils.formatUnits(await dimeStakingLPContract.pendingBlack(localStorage.getItem("walletAddress")),0);
        //   setMyreward(myRewards)

        //   let unstakeremainingtime = ethers.utils.formatUnits(await dimeStakingLPContract.holderUnstakeRemainingTime(localStorage.getItem("walletAddress")),0);
        //   setunstakeTime(unstakeremainingtime)

         

        //   let walletNFTDetails = await dimeStakingLPContract.getWalletIDFromContract(uniswapNFTContractAddress,localStorage.getItem("walletAddress"));
        //     let walletNFTID = ethers.utils.formatUnits(walletNFTDetails[0],0);
        //     let walletNFTLiquidity = ethers.utils.formatUnits(walletNFTDetails[1],0);
        //     setwalletNFTLiquidity(walletNFTLiquidity)
        //     setwalletNFTID(walletNFTID)
        //     console.log("walletNFTID",walletNFTID, walletNFTLiquidity)
            // try{
            //     let allowance =  await uniswapNFTContract.getApproved(walletNFTID);
            //     if(allowance === JOKERLPStakingAddress){
            //         setAllowance(true);
            //     }
            //     else{
            //         setAllowance(false);
            //     }
            // }
            // catch(error){
            //     setAllowance(false);
            // }
            
            // console.log("allowance", allowance)
            
          //old contract codes
          // Create contract instance with the correct order of arguments
        //   const dimeStakingContract = new ethers.Contract(DimeStakingAddress, DimeStakingAbi, provider);
        //   const dimeContract = new ethers.Contract(DIMEAddress, DimeAbi, provider);
          

        //   let Totalstakedamount =  ethers.utils.formatUnits(await dimeContract.balanceOf(DimeStakingAddress),0);
        //   let MyStakedamount = await dimeStakingContract.userInfo(localStorage.getItem("walletAddress"));
        //   let DIMEBlance = ethers.utils.formatUnits(await dimeContract.balanceOf(localStorage.getItem("walletAddress")),0);
        //   let myRewards = ethers.utils.formatUnits(await dimeStakingContract.pendingBlack(localStorage.getItem("walletAddress")),0);
          let unstakeremainingtime = ethers.utils.formatUnits(await dimeStakingContract.holderUnstakeRemainingTime(localStorage.getItem("walletAddress")),0);
        console.log("stake time:",unstakeremainingtime)

        //   setTotalStakedAmount(Totalstakedamount);
        //   setmystaked(MyStakedamount);
        //   setmyBalance(DIMEBlance)
        //   setMyreward(myRewards)
          setunstakeTime(unstakeremainingtime)

          let allowance =  ethers.utils.formatUnits(await dimeStakingLPContract.allowance(localStorage.getItem("walletAddress"),JOKERStakingAddress),0);
          console.log("allowance", parseFloat(allowance))
          setAllowance(parseFloat(allowance));
        //   let blackpurchased = ethers.utils.formatUnits





      }
    }

    const claimcalcluation = async(stakedamount,UsdtaccPtpPerShare,Usdtfactor,UsdtaccPtpPerFactorShare,UsdtclaimablePtp,UsdtrewardDebt,tusdce,UsdtlastRewardTimestamp,UsdtadjustedAllocPoint,totalAdjustedAllocPoint,UsdcsumOfFactors)=>{
       
        // secondsElapsed.store(Global.latest_timestamp() - StakedTime.value()),
        // pending.store((((((cashAdded.value() * Int(1000000))/liability.value()) * secondsElapsed.load())/(senderAssetBalance.value()/Int(1000000)) * userAmount.value())/Int(1000000000))),
       
        let pending = Math.abs((((((stakedamount * UsdtaccPtpPerShare) +( Usdtfactor * UsdtaccPtpPerFactorShare)) /(1000))) - UsdtrewardDebt)/(1000000))
        // setclaimamount(pending)
        await updatePool(stakedamount,Usdtfactor,UsdtclaimablePtp,UsdtrewardDebt,UsdtaccPtpPerShare,UsdtaccPtpPerFactorShare,tusdce,UsdtlastRewardTimestamp,UsdtadjustedAllocPoint,totalAdjustedAllocPoint,UsdcsumOfFactors)
        console.log("vlaues",pending,stakedamount,UsdtaccPtpPerShare,Usdtfactor,UsdtaccPtpPerFactorShare,UsdtclaimablePtp,UsdtrewardDebt)
    }

    const updatePool = async(amount,factor,claimablePtp,rewardDebt,accPtpPerShare,accPtpPerFactorShare,balance,lastRewardTimestamp,adjustedAllocPoint,totalAdjustedAllocPoint,sumOfFactors)=>{

        let  AccPtpPerShare ;
        let  AccPtpPerFactorShare ;
        let  lpSupply = balance;
        let secondsElapsed = parseInt(Date.now()/1000) - lastRewardTimestamp;

        let ptpReward = parseInt(parseInt(secondsElapsed * (10*1000000) * parseInt(adjustedAllocPoint/1000)) / totalAdjustedAllocPoint)*1000;
        console.log("reward",ptpReward,secondsElapsed,adjustedAllocPoint,totalAdjustedAllocPoint)
        AccPtpPerShare = (accPtpPerShare +  parseInt((ptpReward * 1000000/1000) * 300)) / (lpSupply );
        console.log("AccPtpPerShare",AccPtpPerShare)

            if (sumOfFactors != 0) {

                AccPtpPerFactorShare = accPtpPerFactorShare + (parseInt(parseInt(ptpReward * 1000000/1000) * 700) / (sumOfFactors ));
            }
            else{
                AccPtpPerFactorShare =0;
            }
        // let r = parseInt(((1000000) * swapstate.cashAdded) / swapstate.liability)   
        // let rdiv =0,latestAdjustedAllocPoint = 0;
        // if(r != 0){
        //     let kv = ((((1000000) * 1000000) + (r/2)) / r)
        //     rdiv = parseInt(((1000000 * 1000000) + (200000 + kv)/2)/(200000 + kv/2))
        //     latestAdjustedAllocPoint = 145 * rdiv;
        // }
        let pending =(( ((amount) * AccPtpPerShare) + (factor * AccPtpPerFactorShare)) /1000000) - rewardDebt;

        let pendingPtp = 
            (((amount/100 * AccPtpPerShare + factor * AccPtpPerFactorShare) / 1000) + claimablePtp - rewardDebt);
            console.log("rewardDebt",rewardDebt,(( ((amount/1000) * AccPtpPerShare) + (factor * AccPtpPerFactorShare)) /1000)  )     
            console.log("pending usdc",pendingPtp,pending) 
        setclaimamount(pendingPtp/1000000)

    }

    const updateadjustall = async()=>{
        
        // If(r.load() == Int(0))
        // .Then(rdiv.store(wdiv(Int(1000000),(Int(200000) + Int(0)))))
        // .Else(rdiv.store(wdiv(Int(1000000),(Int(200000) + wdiv(Int(1000000),r.load()))))),
        // latestAdjustedAllocPoint.store(baseAllocPoint  * rdiv.load()),
    }

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
    const clickevent = async(givename) =>{
        setfunctname(givename);
        handleToggle();
       }

       const depositOrwithdraw = async()=>{
           handleShowLoad()
        functname == "Deposit" ? await deposit():await withdraw();
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
   } 
    
        
          const toastDiv = (txId,type) =>
          (
              <div>
                 <p> {type} &nbsp;<a style={{color:'#919cff'}} href={txId} target="_blank" rel="noreferrer">View in algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#919cff"/>
          </svg></a></p> 
              </div>
          );
        const resetstate = async()=>{
            setBondAmount("");
    
        }


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
        
        const deposit = async() =>{
            handleShowLoad();
            try{
                const web31 = await connectToEthereum();
                if (!web31) return;
        
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0]; // Use the first account
        
                console.log("Connected Successfully", account);
        
                // Create contract instance with the correct order of arguments
                const dimeUSDCLPstakingContract = new ethers.Contract(JOKERStakingAddress, StakingJOKERABI, web31.getSigner(account));
        
                // const val = ethers.utils.formatUnits(100000000000000, 0);
                // let k = Web3.utils.toBN(1000000000000000000n);
                // const val11 = ethers.utils.formatUnits(100000000000000, 18);
                // const val1 =  ethers.utils.parseUnits(val11, 18);;
                // Send the transaction and wait for it to be mined
                const mintTx = await dimeUSDCLPstakingContract.deposit(BigInt(stakevalue * 1e9),{gasLimit:3000000});
                await mintTx.wait();
                console.log("minttx",mintTx.hash);
                // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `) 
                let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
                toast.success(toastDiv(id));
                await displayValueCalculation();
                toast.success("Staked successfully");
                
                await sleep(2000);
                handleHideLoad();
                // await sleep(1600);
                window.location.reload();
            }catch(error){
                toast.error("Staking is not succeed",`${error}`);
                console.log("error",error)
                handleHideLoad();
            }
        }

        const withdraw = async() =>{
            handleShowLoad();
            try{
                const web31 = await connectToEthereum();
                if (!web31) return;
        
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0]; // Use the first account
        
                console.log("Connected Successfully", account);
        
                // Create contract instance with the correct order of arguments
                const dimeUSDCLPstakingContract = new ethers.Contract(JOKERStakingAddress, StakingJOKERABI, web31.getSigner(account));
        
                // const val = ethers.utils.formatUnits(100000000000000, 0);
                // let k = Web3.utils.toBN(1000000000000000000n);
                // const val11 = ethers.utils.formatUnits(100000000000000, 18);
                // const val1 =  ethers.utils.parseUnits(val11, 18);;
                // Send the transaction and wait for it to be mined
                const mintTx = await dimeUSDCLPstakingContract.withdraw(BigInt(stakevalue2 * 1e9),{gasLimit:3000000});
                await mintTx.wait();
                console.log("minttx",mintTx.hash);
                // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
                let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
                toast.success(toastDiv(id));
                await displayValueCalculation();
                toast.success("withdrawn successfully");
                
                await sleep(2000);
                handleHideLoad();
                // await sleep(1600);
                window.location.reload();
            }catch(error){
                toast.error("withdraw is not succeed",`${error}`);
                console.log("error",error)
                handleHideLoad();
            }
        }
        const claim = async() =>{
            handleShowLoad1();
            try{
                const web31 = await connectToEthereum();
                if (!web31) return;
        
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0]; // Use the first account
        
                console.log("Connected Successfully", account);
        
                // Create contract instance with the correct order of arguments
                const dimeUSDCLPstakingContract = new ethers.Contract(JOKERStakingAddress, StakingJOKERABI, web31.getSigner(account));
        
                // const val = ethers.utils.formatUnits(100000000000000, 0);
                // let k = Web3.utils.toBN(1000000000000000000n);
                // const val11 = ethers.utils.formatUnits(100000000000000, 18);
                // const val1 =  ethers.utils.parseUnits(val11, 18);;
                // Send the transaction and wait for it to be mined
                const mintTx = await dimeUSDCLPstakingContract.claimReward({gasLimit:3000000});
                await mintTx.wait();
                console.log("minttx",mintTx.hash);
                // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
                let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
                toast.success(toastDiv(id));
                await displayValueCalculation();
                toast.success("claimReward successfully");
                
                await sleep(2000);
                handleHideLoad1();
                // await sleep(1600);
                window.location.reload();
            }catch(error){
                toast.error("claimReward is not succeed",`${error}`);
                console.log("error",error)
                handleHideLoad1();
            }
        }

        const approve = async() =>{
            handleShowLoad();
            try{
                const web31 = await connectToEthereum();
                if (!web31) return;
        
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0]; // Use the first account
        
                console.log("Connected Successfully", account);
        
                // Create contract instance with the correct order of arguments
                // const uniswapcontract = new ethers.Contract(uniswapNFTContractAddress, uniswapNFTContractABI, web31.getSigner(account));
                const jokercontract = new ethers.Contract(JOKERAddress, JOKERABI2,  web31.getSigner(account));
                const mintTx = await jokercontract.approve(JOKERStakingAddress,100*1e9);
              
                await mintTx.wait();
                console.log("minttx",mintTx.hash);
                // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
                let id = "https://goerli.etherscan.io/tx/" + mintTx.hash;
                toast.success(toastDiv(id));
                await displayValueCalculation();
                toast.success("Approve is Done successfully");
                
                await sleep(2000);
                handleHideLoad();
            }catch(error){
                toast.error("Approve is not succeed",`${error}`);
                console.log("error",error)
                handleHideLoad();
            }
        
        }
     
        //    const claim = async()=>{
        //     handleShowLoad()
        //     try{
              
        //       const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
        //       const params = await algodClient.getTransactionParams().do();
        //       let senderd =localStorage.getItem("walletAddress");
        //       let appIDa = usdcStakingappid;
        //       // let assetIda = 104654999;
        //       let receiverD = usdcStakingappaddress;
        //       let appArgsD = [];
        //       let amtc = BondAmount * 1000000;
        //       appArgsD.push(new Uint8Array (Buffer.from("SingleClaim")));
        //     //   appArgsD.push(new Uint8Array (Buffer.from("ClaimUsdc")));
        //       // appArgsD.push(algosdk.encodeUint64(parseInt(amtc)));
              
        //       let assArgs = [];
        //       assArgs.push(parseInt(UsdcAppId));
        //       let assArgs1 = [];
        //       assArgs1.push(parseInt(USDCE));
        //       assArgs1.push(parseInt(oldveptp));
        //       assArgs1.push(parseInt(PTP));
        //       const txna = algosdk.makeApplicationNoOpTxnFromObject({
        //         suggestedParams: {
        //             ...params,
        //         },
        //         from: senderd,
        //         appIndex:appIDa,
        //         appArgs: appArgsD,
        //         foreignApps:assArgs,
        //         foreignAssets:assArgs1
                
        //     });
              
        // //       const txna1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        // //           suggestedParams: {
        // //               ...params,
        // //           },
        // //           from: senderd,
        // //           to: receiverD,
        // //           amount : amtc,
        // //           assetIndex: parseInt(usdtlp)
        // //       });
        //       const transArrayD = [ txna ];
        // const groupID = algosdk.computeGroupID(transArrayD)
        // for (let i = 0; i < 1; i++) 
        // transArrayD[i].group = groupID;
        // if(localStorage.getItem("walletName") === "myAlgoWallet"){

        // const signedTxnsdo = await myAlgoWallet.signTransaction(transArrayD[0].toByte());
        // const responsedo = await algodClient.sendRawTransaction(signedTxnsdo.blob).do();
        // console.log(responsedo.txId);
        // await waitForConfirmation(algodClient, responsedo.txId,"Claimed successfully");
        // await createtpairhistory(responsedo.txId,"USDC Claim",claimamount/1000000,usdcStakingappid)

        // }
        // else if(localStorage.getItem("walletName") === "PeraWallet"){
        //     const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        //     const txns = [transArrayD[0]]
        //     const txnsToSign = txns.map(txn => {
        //       const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
        //      //console.log(encodedTxn);
        //       return {
        //         txn: encodedTxn,
        //     };
        //   });
      
        //   const requestParams = [ txnsToSign ];
        //   const request = formatJsonRpcRequest("algo_signTxn", requestParams);
        //   const result = await connector.sendCustomRequest(request);
        //   const decodedResult = result.map(element => {
        //     return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        //   });
        //     // send and await
      
        //     let response = await algodClient.sendRawTransaction(decodedResult).do();
        //     await waitForConfirmation(algodClient, response.txId,"Claimed successfully");
        //     await createtpairhistory(response.txId,"USDC Claim",claimamount/1000000,usdcStakingappid)

        //     // await updatealgobalance()
      
      
        //  // localStorage.setItem("Staked","stakedbalance");
         
  
  
        //   }
        // } 
              
        //     catch (err) {
        //         console.error(err);
        //        toast.error(`${err}`)
        //         handleHideLoad()
        //         } 
        //    }
           const callingMax = async() =>{
            let balan ;
         functname == "Deposit" ? balan = usdcebalance :balan = stakedAmount;
         setBondAmount(balan/1000000)
        }
       
       
           function formatter(number){
            const formattedNumber = Number(
              number.toString().match(/^\d+(?:\.\d{0,3})?/)
            )
            return formattedNumber;
          }
    return (
        <>
                       <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Modal show={show} className="modal-dashboard" centered onHide={handleToggle}>
                <Modal.Header className="mb-0" closeButton />
                <Modal.Body className="pt-0">
                    <Modal.Title className="text-center mb-4">Confirm {functname} <img src={jokercoin} alt='image' width={23} height={23} className="mx-1" /> JOKER</Modal.Title>
                    
                    <div className="d-flex text-muted align-items-center justify-content-between flex-wrap">
                        {/* <p className="mb-3">{functname}ed: 
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    0.0 USDCE
                                </Tooltip>
                            }
                            >
                                <div className="d-inline-block ms-1">0.0 USDCE</div>
                            </OverlayTrigger>
                        </p> */}
                        <p className="mb-3">
                            {functname === "Deposit" ? 'My wallet balance':'My Deposited Liquidity:' }
                            <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`}>
                                    JOKER
                                </Tooltip>
                            }
                            >
                                {functname === "Deposit" ? (<>
                                <div className="d-inline-block ms-1">{Jokerbalance? parseFloat(Jokerbalance/1e9).toFixed(3):'0.0'} JOKER</div>
                                </>):(<>
                                    <div className="d-inline-block ms-1">{mystaked? parseFloat(mystaked/1e9).toFixed(3):'0.0'} JOKER</div>
                                </>)}
                            </OverlayTrigger>
                        </p>
                    </div>
                    {functname === "Deposit" ? (<>
                    <InputGroup className='input-group-max input-group-max-lg mb-3'>
                        <FormControl
                            // disabled={true}
                            // value={walletNFTLiquidity ? walletNFTLiquidity/1e9 : 0}
                            type='number'
                            placeholder="0.00"
                            className="ps-1 pb-0"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setstakevalue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d rounded' onClick={()=>callingMax()}>Max</Button> */}
                    </InputGroup>
                    </>):(<>
                        <InputGroup className='input-group-max input-group-max-lg mb-3'>
                        <FormControl
                            // disabled={true}
                            // value={mystaked ? mystaked/1e9 : 0}
                            type='number'
                            placeholder="0.00"
                            className="ps-1 pb-0"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setstakevalue2(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d rounded' onClick={()=>callingMax()}>Max</Button> */}
                    </InputGroup>
                        </>)}
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
                                0.0 USDCe
                            </Tooltip>
                        }
                        >
                            <strong className="text-white">0.0 USDCe</strong>
                        </OverlayTrigger>
                    </div>
                    <div className="mb-0 d-flex align-items-center justify-content-between">
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
                                0.0 USDCe
                            </Tooltip>
                        }
                        >
                            <strong className="text-white">0.0 USDCe</strong>
                        </OverlayTrigger>
                    </div> */}
                  

                    <Row className="mt-4 mb-3">
                        <Col sm={6} className="mb-sm-0 mb-2">
                            <Button variant="blue" className="w-100" onClick={handleToggle}>Cancel</Button>
                        </Col>
                        <Col sm={6} className="mb-sm-0 mb-2">
                        {/* {appOpted ? (<> */}
                        {functname==="Deposit"?(<>
                            { allowan ?
                        (<>
                        <ButtonLoad loading={loader} variant="blue" className="w-100"
                             onClick={()=>depositOrwithdraw()} 
                             >{functname}</ButtonLoad>
                        </>):(<>
                            <ButtonLoad loading={loader} variant="blue" className="w-100"
                             onClick={()=>approve()} 
                             >Approve</ButtonLoad>
                        </>)}
                                
                        
                        </>):(<>
                            <ButtonLoad loading={loader} variant="blue" className="w-100"
                             onClick={()=>depositOrwithdraw()} 
                             >{functname}</ButtonLoad>
                        
                        </>)}
                     
                            {/* </>):(<>
                                <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>appOptIn()}>
                            Opt-In App
                        </ButtonLoad>
                            </>)} */}
                        </Col>
                    </Row>

                    {/* <p className="text-muted text-center"><small>In bankrun situation, LPs might only be able to withdraw in the over-covered tokens.</small></p> */}
                </Modal.Body>
            </Modal>

            <div className="mb-24 accordion-item accordion-item-pool shadow">
                <div className="accordion-button accordion-button-no-arrow py-3 collapsed">
                    <div className='d-flex flex-md-row flex-column align-items-md-center w-100'>
                        <div class="acc-title me-2 mb-md-0 mb-3">
                            <div className="d-flex align-items-center justify-content-md-start justify-content-center mb-2">
                                <img src={jokercoin} alt="logo" /><span class="ms-3">JOKER</span>
                            </div>
                            <p className='mb-0 d-flex text-sm align-items-center justify-content-md-start justify-content-center'>
                                {/* <span className='text-muted text-end'>Coverage Ratio</span>  */}
                                {/* <h5 className="mb-0 ms-1 px-1">{swapstate.cashAdded?formatter(swapstate.cashAdded/swapstate.Liability):'0.0'}</h5> */}
                                {/* <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                             The Coverage Ratio(CR) is the asset-to-liability ratio of a pool. It determines the swapping slippage, withdrawal and deposit fee in our protocol. Refer to our documentation for more details.
                                        </Tooltip>
                                    }
                                    >
                                        <svg className="ms-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                        </svg>
                                    </OverlayTrigger> */}
                            </p>
                        </div>
                        <div className="flex-grow-1 pe-md-4 mb-md-0 mb-3 justify-content-between d-flex align-items-center">
                            <div class="mr-1">
                                <h6 class="sub-heading text-xs mb-0">Pool deposits</h6>
                                <OverlayTrigger
                                    key="left"
                                    placement="left"
                                    overlay={
                                        <Tooltip id={`tooltip-left`}>
                                        {TotalStakedAmount ? parseFloat(TotalStakedAmount/1e9).toFixed(3):'0.0'}
                                        </Tooltip>
                                    }
                                    >
                                    <h5 class="mb-0 d-flex align-items-center"> {TotalStakedAmount ? parseFloat(TotalStakedAmount).toFixed(3):'0.0'} </h5>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    key="left"
                                    placement="left"
                                    overlay={
                                        <Tooltip id={`tooltip-left`}>
                                             USDCe
                                        </Tooltip>
                                    }
                                    >
                                    <h6 class="sub-heading text-xs mb-0">JOKER</h6>
                                </OverlayTrigger>
                            </div>
                           
                            <div class="mr-1">
                                <h6 class="sub-heading text-xs mb-0">My Stake </h6>
                                <OverlayTrigger
                                    key="left"
                                    placement="left"
                                    overlay={
                                        <Tooltip id={`tooltip-left`}>
                                        Total deposited Amount
                                        </Tooltip>
                                    }
                                    >
                                    <h5 class="mb-0 d-flex align-items-center">{mystaked ? parseFloat(mystaked).toFixed(3):'0.0'}</h5>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    key="left"
                                    placement="left"
                                    overlay={
                                        <Tooltip id={`tooltip-left`}>
                                             USDC
                                        </Tooltip>
                                    }
                                    >
                                    <h6 class="sub-heading text-xs mb-0">JOKER</h6>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <Stack direction="horizontal" className="justify-content-center" gap={3}>
                            {/* <ButtonLoad loading={loader1} onClick={()=>assetoptin()} disabled={!ptpptpoptin} variant="blue">Asset Opt-In</ButtonLoad> */}
                            <Button onClick={()=>clickevent("Deposit")}  variant="blue">Stake</Button>
                            {/* {stakedAmount>1?(<>  <Button variant="blue" 
                            disabled={ptpptpoptin}
                              onClick={()=>clickevent("Withdraw")} >Unstake</Button>
                              </>):(<> */}
                              {parseInt(unstakeTime) <= (Math.floor(new Date().getTime() / 1000)) ?
                               (<>
                                <Button variant="blue" 
                            // disabled={true}
                              onClick={()=>clickevent("Withdraw")} >Unstake</Button>
                               </>):(<>
                                <Button variant="blue" 
                            disabled={true}
                              onClick={()=>clickevent("Withdraw")} >Unstake</Button>
                               </>)}
                               
                              {/* </>)} */}
                          
                        </Stack>
                    </div>
                </div>
                <div className="accordion-body py-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="text-sm d-flex flex-wrap align-items-center">
                            <div className="d-flex align-items-center me-3">
                                <span className="text-muted me-2">Reward</span>
                                <img src={stasiscoin} alt="logo" width={15} />
                            </div>
                            <div className="d-flex align-items-center me-3">
                                {/* <span className="text-muted me-1">Base APR</span>
                                <span className="me-1">
                                   
                                   500 %</span>
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Base APR allocated for the liquidity providers.
                                        </Tooltip>
                                    }
                                    >
                                        <svg className="ms-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                        </svg>
                                    </OverlayTrigger> */}
                            </div>
                            <div className="d-flex align-items-center me-3">
                                {/* <span className="text-muted me-1">Median Boosted APR</span>
                                <span className="me-1">{parseFloat(BoostingApr).toFixed(2)}%</span>
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Median APR of this pool for the users who have deposited and staked USDCe.
                                        </Tooltip>
                                    }
                                    >
                                        <svg className="ms-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                        </svg>
                                    </OverlayTrigger> */}
                            </div>
                            <div className="d-flex align-items-center me-3">
                                {/* <span className="text-muted me-1">Total APR</span>
                                <span className="me-1">{parseFloat((baseApr/1000000)+(BoostingApr/100)).toFixed(2)}%</span>
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Total APR of pool.
                                        </Tooltip>
                                    }
                                    >
                                        <svg className="ms-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                        </svg>
                                    </OverlayTrigger> */}
                            </div>
                        </div>
                        <span className="text-muted me-20">Rewards Earned:</span><span className="me-1">
                            {/* {claimamount  && stakedAmount > 1 ?parseFloat(claimamount/1000000).toFixed(6):"0.0"} */}
                            {Myreward != "" ? parseFloat(Myreward).toFixed(6):'0.0'}
                            </span>
                            {Myreward? 
                            (<>
                             {Myreward > 1e13 ?
                       (<>
                       <ButtonLoad loading={loader1} variant="blue" 
                        // disabled={true}
                        onClick={()=>claim()}
                        >
                            Claim Reward
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg> */}
                        </ButtonLoad>
                       </>):(<>
                        <Button variant="blue" 
                        disabled={true}
                        onClick={()=>claim()}
                        >
                            Claim Reward
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg> */}
                        </Button>
                       </>)}
                            </>):
                            (<></>)}
                      
                        
                    </div>
                </div>
            </div>
        </> 
     );
}

export default PoolChild;