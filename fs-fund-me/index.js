//front end vs nodejs
//nodejs - require()
//front end - you cant use require
//import 
//const {ethers}=require("ethers")
import {ethers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton= document.getElementById("withdrawButton")

connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw
console.log("ethers")
async function connect() {
  if (typeof window.ethereum != "undefined") {
    //console.log("I see a metamask");
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected!";
    console.log("Connected to metamask");
  } else {
    //console.log("I dont see a metamask!");
    connectButton.innerHTML =
      "Please install metamask!";
    //alert("Please install metamsk");
  }
}
async function getBalance(){
    if(typeof window.ethereum != "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance));
    }
}
//fund function
async function fund(){
    const ethAmount = document.getElementById("ethAmount").value;;
    console.log('Funding with ${ethAmount}...', ethAmount);
    if(typeof window.ethereum != "undefined"){
        //provider/conneciton to the blockchain
        //signer/wallet /someone with some gas

        //contract that we are interacting with 
        //^ABI & address
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("signer",signer)
        const contract = new ethers.Contract(contractAddress, abi, signer) //?
        try{
            const transactionResponse = await contract.fund({value: ethers.utils.parseEther(ethAmount),})
            //listen for the tx to be mined
            //listed for an event <- we havent learned about yet!
            //wait for the this tx to finish
            await listenForTransactionMine(transactionResponse, provider);
            console.log("done! with the listerner")
        }catch(error){
            console.log(error);
        }    
    }
}
//not an async function
function listenForTransactionMine(transactionResponse, provider){
    console.log('Mining ...', transactionResponse.hash)
    //return new Promise 
    //return resolve - listener if the below transaction is successful if not reject
    //listen for this transaciton to finish
    //ether docs - see once - provider.once
    //the below ()=>{} represents a anonymous function or callback funciton
    return new Promise((resolve, reject)=>{
        provider.once(transactionResponse.hash, (transactionReceipt)=>{
            console.log("completed with ${transactionReceipt.confirmations} confirmations", transactionReceipt.confirmations);
        resolve(); //mark this function resolve once the transaction response hash has found
        })
    })

}

//withdraw function
async function withdraw(){
    if(typeof window.ethereum != "undefined"){
        console.log("withdrawing ...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try{
            const transactionResponse = await contract.withdraw();
            await listenForTransactionMine(transactionResponse, provider);
        }catch(error){
            console.log(error);
        }
    }
}