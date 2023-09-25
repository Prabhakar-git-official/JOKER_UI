import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import node from './nodeapi.json';
const bridge = "https://bridge.walletconnect.org";
const algosdk = require('algosdk');
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
const myAlgoConnect = new MyAlgoConnect();
export const dualwalletconnect=async(assetoptin1)=>{
    
  let txnresponse;
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
      const signedTxnass = await myAlgoConnect.signTransaction(assetoptin1.toByte());
      //toast.info("Transaction in Progress");
      const responseass = await algodClient.sendRawTransaction(signedTxnass.blob).do();
      //toast.success(`Asset Optin Successful ${responseass.txId}`);
      console.log("optresponse",responseass)
       txnresponse=responseass.txId;
      // toast.success(`Asset Optin Success ${responseass.txId}`);
    //   await waitForConfirmation(algodClient, responseass.txId);
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
      const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    //  setConnector(connector);
      let txId = assetoptin1.txID().toString();
      txnresponse=txId;
      // time to sign . . . which we have to do with walletconnect
      const txns = [assetoptin1]
      const txnsToSign = txns.map(txn => {
        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
        return {
          txn: encodedTxn,
      };
    });
    const requestParams = [ txnsToSign ];
    const request = formatJsonRpcRequest("algo_signTxn", requestParams);
  
    const result = await connector.sendCustomRequest(request);
    console.log("res1",result);
    const decodedResult = result.map(element => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });
    console.log("decodedre",decodedResult);
      // send and await
      //await algodClient.sendRawTransaction([decodedResult]).do();
     await algodClient.sendRawTransaction(decodedResult).do();
    //   await waitForConfirmation(algodClient, txId);



    }
return txnresponse;

}