import * as StellarSdk from 'stellar-sdk';

async function balanceOf(publicKey){
  let response= {}

  let server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

  try {
    let account = await server.loadAccount(publicKey);
    account.balances.forEach(function (balance) {
      let result = {};
      result[balance.asset_type] = balance.balance;

    });
    response[account.balances[0].asset_type] = account.balances[0].balance;
    console.log(response);
  } catch (error) {
    console.log("chegu")
    // console.log(error.response)
    if (error instanceof StellarSdk.NotFoundError) {
      throw new Error("The destination account does not exist or is not funded!");
    }
    return error.response;
    
  }
  console.log(response);
  return response
}

(async function(){
  console.log(await balanceOf('GAZ4EJR3EQEHX6VSQWYDC7PSC4K2HG7HP62QMCBEYAJEDIUYD5JFQKZ'))
})()