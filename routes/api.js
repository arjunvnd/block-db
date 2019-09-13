const express = require('express');
const router = express.Router();
const Web3 = require('web3');



const transModel = require('./../models/transaction.model');



const INFURA_PROVIDER = 'https://kovan.infura.io/v3/6c6f87a10e12438f8fbb7fc7c762b37c';
const web3 =new Web3(new Web3.providers.HttpProvider(INFURA_PROVIDER));

router.get('/', (req, res) => {
    console.log(`GET /`)
    res.send(`api works`)
    // web3.eth.getBlock(3150).then(resp=>{
    //     console.log(resp)
    //     res.send("a")
    // })
})

router.post("/",(req,res)=>{
    console.log(`POST: ${req.body.amount}`);
    res.send("Hello")
})

router.post("/getBlock",async (req,res)=>{
        let deleteDb = await transModel.remove({})
        let blocks_info =[];
        let transactionHash = [];
        let tranactionArray = [];
        let no_of_blocks = req.body.blocks;

        let latest_block =await web3.eth.getBlockNumber();
        for( let i =latest_block-no_of_blocks;i<latest_block;i++){
            console.log(`No of blocks left ${no_of_blocks--}`)
            let block_info = await web3.eth.getBlock(i);
            block_info.transactions.forEach(transaction=>{
                transactionHash.push(transaction)
            })
        }
        for(let j=0;j<transactionHash.length;j++){
            console.log(`Transactionhasn len :${transactionHash.length}`)
            let tempTrasaction = await web3.eth.getTransaction(transactionHash[j])
            tranactionArray.push(tempTrasaction);
            console.log(tranactionArray.length)

        }
        tranactionArray.forEach(transaction=>{
            let tranactionToDb = new transModel({
                transactionhash:transaction.hash,
                from:transaction.from,
                to:transaction.to,
                blockNumber:transaction.blockNumber
            }) 
            tranactionToDb.save().then(resp=>{
                console.log("Saving to db")
            }).catch(err=>{
                console.log(`Err ${err}`)
            })
        })

    
    // res.send(JSON.stringify(tranaction))
    res.send("Success")

})

router.post("/useTrans",async(req,res)=>{
    let transactionHash = req.body.transHash;
    transModel.find({
        transactionhash:transactionHash
    }).then(resp=>{
        res.send(resp)
    })
    // let latest_block =await web3.eth.getBlockNumber();
    // let block_info = await web3.eth.getBlockTransactionCount(latest_block);
    // res.send(JSON.stringify(block_info))
})
router.post("/getTransaction",async(req,res)=>{
    let transInfo ={}
    let userAddress = req.body.address;
    let transFrom = await transModel.find({from:userAddress})
    let transTo = await transModel.find({to:userAddress})
    transInfo = {
        transFrom,
        transTo
    }
    res.send(JSON.stringify(transInfo))
})

module.exports = router