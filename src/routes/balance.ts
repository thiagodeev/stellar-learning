import { Router } from "express";
import * as StellarSdk from 'stellar-sdk';

let router = Router();

router.get('/', async (req, res) => {
  let response: any = {}
  
  if(req.body.publicKey == undefined || req.body.publicKey.length != 56){
    response.note = "'publicKey' empty. You need to pass a valid Stellar publicKey."; 
    res.json(response)
    return
  }

  response = await balanceOf(req.body.publicKey)

  if(response.status == 404){
    res.status(404).json(response)
    return
  }

  console.log('Balance returned');
  res.json(response);
})


async function balanceOf(publicKey: string): Promise<Record<string, string>[]>{
  let response: Record<string,string>[] = []

  let server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

  try {
    let account = await server.loadAccount(publicKey);
    account.balances.forEach(function (balance) {
      let result: Record<string,string> = {};
      result[String(balance.asset_type)] = balance.balance;

      response.push(result)
    });
  } catch (error: any) {
    console.error("The destination account does not exist or is not funded!")
    response = error.response
    
  }
  return response
}

export default router;
