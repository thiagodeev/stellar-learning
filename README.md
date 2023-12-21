# stellar-learning
### Learning Stella blockchain with Node.js

This repositorie aims to give me a little understanding on how to interact with the Stellar blockchain.  
I created a simple Node.js server using Express and Typescript and used the Stellar Javascript SDK to interact with the Horizon API in the Stellar Testnet.

Docker image link:
https://hub.docker.com/r/thiagodeev/stellar-learning

## How to use:

You have two methods:
1. Cloning this repository;
1. Using the docker image;

### Cloning the repository:
You'll need to have NodeJS installed in your machine (>=v.18 preferred). Then:
1. Clone the repository;
1. Run inside the repository root folder:
    ``` javascript
    npm install
    ```
1. To run in developer mode, watching file changes and transpiling Typescript, run:
    ``` javascript
    npm run dev
    ```
    For production mode, building the project and starting the server from it, run:
    ``` javascript
    npm run buildAndStart
    ```

  You'll see this message, confirming that everything goes well:
          
    [server]: Server is running at http://localhost:3000 

### Using the docker image:
You'll need to have Docker installed in your machine. There are two platforms versions: `arm64` and `amd64`.
Then:
1. Just run this command:
    ``` docker
    docker run --rm  -it -p 3000:3000 --name stellar-learning thiagodeev/stellar-learning
    ```
    This command will forward the container 3000 port to your `localhost:3000` address.

  You'll see this message, confirming that everything goes well:
        
      [server]: Server is running at http://localhost:3000 


## Edpoints

Available at `localhost:3000`. There are only three endpoints:
- `/`
- `/createKeypar`
- `/balance`

Their explanations are:
1. GET `localhost:3000/`  
There's nothing important here, just a 'Wellcome' message :D

1. POST `localhost:3000/createKeypar`  
If you send an empty post request to this endpoint, it'll generate a Stellar keypar address; in other words: a public and private key as this example:
    ``` json
    {
      "publicKey": "GDHLLOIPLFLNDGPKEATI3XERKFG6ESIB44F3GYNRPVG43EDDQKMPNS2Y",
      "privateKey": "SB7ZWSLVGKYNSG7CRNS42WIHAD2OLMHCDM23ZPWQAD22UKNMYKMQTRN5"
    }
    ```
    These are just keys, they are not Stellar accounts because they don't have Lumens. If you want to create a pair and fund it, pass this JSON as a body parameter request:
    ``` json
    {
      "fundAccount": true
    }
    ```

    This will return a funded keypair, a valid Stellar account (only in the Testet :D). Example:
    ``` json
    {
      "publicKey": "GDB6NU5H4I43HDMXTGW4LYV6WRJHGMF5RF6WVS6UT6N2O6IBZSU777U5",
      "privateKey": "SAAEKNW4QQM7YBIV5RHDJAVCCTGACYTH2XU7OIEJYERHSRMTTJ2OC5FA",
      "note": "Account created with success! Funded with 10_000 lumens."
    }
    ```

1. POST `localhost:3000/balance`  
Here, you just need to pass a JSON with the `publicKey` that you want to know the balance on Stellar Testnet. Here is a sample of it:
    ``` json
    {
      "publicKey": "GDXWWGTVOK7ABJHJWSI3KBFA4CCWXVVFJPDMGRHBR2KKJXMOU7XLAUH5"
    }
    ```
    This account has Lumens, so the response will be like this:
    ``` json
    [
      {
        "native": "10000.0000000"
      }
    ]
    ```
    However, if you pass a invalid or empty `publicKey`, the result will be:
    ``` json
    {
      "type": "https://stellar.org/horizon-errors/not_found",
      "title": "Resource Missing",
      "status": 404,
      "detail": "The resource at the url requested was not found.  This usually occurs for one of two reasons:  The url requested is not valid, or no data in our database could be found with the parameters provided."
    }
    ```

## Conclusion
That's it! I hope you've learned with me the very basic of interacting with Stellar blockchain using the source code of this repositorie. See you later