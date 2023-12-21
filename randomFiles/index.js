import * as StellarSdk from 'stellar-sdk';

// create a completely new and unique pair of keys
// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html
const firstAccount = StellarSdk.Keypair.random();

console.log(firstAccount.publicKey());
// Secret of firstAccount:  SANISFD7WLEDQVUBDOYTR2BJHMCOY6XXCEGALQQ7AXJICYXLTVUUPUQP
// GAU2ZE72YUMZNZDK4SPZOOKO5FQHCSMYREZFSDBIWOABBHZX7MAGBDJD
// Secret of childAccount:  SDPW2GJI73TYORZMMD6KHLCMT7ZR2ZBDS7JHB4RDZNA73OBTKKV3BGVT
// GBW4MNM7V5JBIXHD4VUUA65ZMJNK4VKMDOPNBERTPHSFGOA7NOF6R4LI


async function main() {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        firstAccount.publicKey(),
      )}`,
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n");
  } catch (e) {
    console.error("ERROR!", e);
  }
  // After you've got your test lumens from friendbot, we can also use that account to create a new account on the ledger.
  try {
    const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
    var parentAccount = await server.loadAccount(firstAccount.publicKey()); //make sure the parent account exists on ledger
    var childAccount = StellarSdk.Keypair.random(); //generate a random account to create
    //create a transacion object.
    var createAccountTx = new StellarSdk.TransactionBuilder(parentAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    });
    //add the create account operation to the createAccountTx transaction.
    createAccountTx = await createAccountTx
      .addOperation(
        StellarSdk.Operation.createAccount({
          destination: childAccount.publicKey(),
          startingBalance: "5",
        }),
      )
      .setTimeout(180)
      .build();
    //sign the transaction with the account that was created from friendbot.
    await createAccountTx.sign(firstAccount);
    //submit the transaction
    let txResponse = await server
      .submitTransaction(createAccountTx)
      // some simple error handling
      .catch(function (error) {
        console.log("there was an error");
        console.log(error.response);
        console.log(error.status);
        console.log(error.extras);
        return error;
      });
    // console.log(txResponse);
    console.log("Created the new account", childAccount.publicKey());
    console.log("Secret of firstAccount: ", firstAccount.secret());
    console.log("Secret of childAccount: ", childAccount.secret());




    const accountOne = await server.loadAccount(firstAccount.publicKey());
    // the JS SDK uses promises for most actions, such as retrieving an account
    console.log("Balances for account: " + accountOne.accountId()); 
    accountOne.balances.forEach(function (balance) {
      console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    });
    const accountTwo = await server.loadAccount(childAccount.publicKey());
    console.log("Balances for account: " + childAccount.publicKey()); 
    accountTwo.balances.forEach(function (balance) {
      console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    });
  } catch (e) {
    console.error("ERROR!", e);
  } 
};

main()