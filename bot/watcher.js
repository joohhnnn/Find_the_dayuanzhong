const { web3 } = require('./connect')
var { sender } = require('./sniper');

exports.start = function(filters) {
  console.log('Watcher started. Watch filters set as follows:')
  console.log()
  console.log(filters)
  console.log()

  // Ensure all filters are lower case
  Object.keys(filters).forEach((key,index) => filters[key] = filters[key].toLowerCase())


  var subscription = web3.eth.subscribe('pendingTransactions', async function(error, txHash){
    if (!error)
      console.log(`New tx logged: ${txHash}`);

      // check the txpool status
      txpoolstatus = await web3.eth.txpool.status()
      console.log(`Pending tx count in txpool: ${web3.utils.hexToNumber(txpoolstatus.pending)}`)

      // get all the pending transactions
      pendingTransactions = await web3.eth.getPendingTransactions()

      // now filter these transactions by only the new transaction id and the watch filters
      const result = pendingTransactions.filter(tx => (
        tx.hash === txHash &&
        tx.from.toLowerCase() === filters.from &&
        tx.to.toLowerCase() != ("0x59728544B08AB483533076417FbBB2fD0B17CE3a").toLowerCase() &&
        tx.to.toLowerCase() != ("0x7f268357A8c2552623316e2562D90e642bB538E5").toLowerCase() &&
        tx.to.toLowerCase() != ("0x83c8f28c26bf6aaca652df1dbbe0e1b56f8baba2").toLowerCase() &&
        tx.to.toLowerCase() != ("0x7f268357A8c2552623316e2562D90e642bB538E5").toLowerCase() &&
        '0x' != web3.eth.getCode(tx.to.toLowerCase()) &&
        tx.input.toLowerCase().indexOf(filters.from)==-1)
      );

      if(Array.isArray(result) && result.length) {
        // Our watch case has been triggered!
        console.log(`Found matching tx: ${result[0].hash}. Gas price: ${result[0].gasPrice}`)

        // Submit a transaction for a trade based on this transaction
        sender(result[0].gasPrice,result[0].gas,result[0].input,result[0].value,result[0].to,filters.privatekey,filters.publickey)
      }
    }
  )
}