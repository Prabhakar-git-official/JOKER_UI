// import web3 from "../web3";

// var wbnb ='0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
// const abi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];
//export default new web3.eth.Contract(abi, wbnb);

export const contracts ={
    wbnb:{
        address:'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    blackBnbLp:{
        address:'0x32aa2440104A877559118802a9a99e60ed469da5',
    },
    vaultadapter:{
        address:'0xf499b7EFA335D5Dc0FE8371a0f83f712e499480E',
    },
    black:{
        address:'0xB3906f9cB2584D7A01499b470b2E57AaE6170dDD',
    },
    blackstake:{
        address:'0xC90b6328370e93184d16b98A6bFF13e201FCf27F',
    },
    burnvault:{
        address:'0x4508Aa1C69a431a550428A282aE3643B9f5Ed325',
    },
    busd:{
        address:'0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    carbonfinance:{
        address:'0x238B7EBb221A307bd2a99bcDc6C169899733dce9',
    },
    carbonstake:{
        address:'0x1b302657E2ed17c4b1073Ea146986a6270757529',
    },
    cbusd:{
        address:'0xBBaD73224721e2F7125b609bf24C866da9446931',
    },
    lpstake:{
        address:'0x801BE19F7963A0d0656FA48039125cf956Db42b5',
    },
    cbusdbusdpair:{
        address:'0x7F7701C1F75146ca746C89A7479e95a19Cf2bC24',
    },
    swap:{
        address:'0xEc929bb652FC3e5fDa67B5Fb50f19565a8248B5b',
    },
    sentinel:{
        address:'0x0Ef04FFA95f2eC2D07a5a196b4cEFB9d1076D43c',
    },
    wbnbbusdpair:{
        address:'0x58f876857a02d6762e0101bb5c46a8c1ed44dc16',
    },
};
