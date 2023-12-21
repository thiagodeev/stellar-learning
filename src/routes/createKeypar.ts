import { Router } from "express";
import * as StellarSdk from 'stellar-sdk';

let router = Router();

router.post('/', async (req, res, next) => {
  const keypar = StellarSdk.Keypair.random();
  let response: Record<string,string> = {
    'publicKey': keypar.publicKey(),
    'privateKey': keypar.secret()
  }
  
  if(req.body.fundAccount == true){
    console.log('Account created');
    await fundAccount(keypar);
    response.note = 'Account created with success! Funded with 10_000 lumens.';
    res.json(response);
    return
  }
  console.log('Keypar created')
  res.json(response)
})


async function fundAccount(keypar: StellarSdk.Keypair){
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        keypar.publicKey(),
      )}`,
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n");
  } catch (e) {
    console.error("ERROR!", e);
  }
}

export default router;
