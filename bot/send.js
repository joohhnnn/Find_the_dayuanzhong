const { web3 } = require('./connect')
const SimpleCounterArtifact = require("../build/contracts/SimpleCounter.json")

exports.sniper = async function sender(gasPrice,gas,input,value,to,privateKey,publickey) {
const pKey= Buffer.from(privateKey,'hex')




  let success = false;

  console.log("Accounts ready! ", accounts)

  for(let i=0; i<1000; i++) {
    for(let j=0; j<accounts.length; j++) {
      try {
        if(!success){
          console.log('Couner: ', i)
            web3.eth.getTransactionCount(publickey, (err,txCount)=>{
            //Create transction object
            const rawTx = {
                nonce: web3.utils.toHex(txCount),
                to: to,
                value: value,
                gasLimit: gas,
                gasPrice: gasPrice,
                data: input
            }

            //Sign the transaction
            const tx = new Tx(rawTx, { chain: 'mainnet' })
            tx.sign(pKey)

            const serializedTx = tx.serialize()
            const raw='0x' + serializedTx.toString('hex')

            //Broodcast the transaction
            web3.eth.sendSignedTransaction(
            raw,(err, txHash)=>{
                console.log('err:',err, 'txHash:',txHash)
            }
            );
            }); 
          let block = await web3.eth.getBlock('latest')

          // we are here, so we made it
          success = true
          console.log('--------------')
          console.log('SUCCESS! -', i)
          console.log('transactionHash -', res.transactionHash)
          console.log('current latest block: ', block.number)
          console.log('--------------')
          }
        } catch (e) {
          console.log(`${i} - ${e.message}`)
        }
      }
    }
  }