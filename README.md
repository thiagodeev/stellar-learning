# stellar-learning
### Learning Stella blockchain with Node.js

This repositorie aims to give me a little understanding on how to interact with the Stella blockchain.  
I created a simple Node.js server using Express and Typescript and used the Stellar Javascript SDK to interact with the Horizon API.

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
You'll need to have Docker installed in your machine. Then:
1. Just run this command:
    ``` docker
    docker run --rm  -it -p 3000:3000 --name stellar-learning thiagodeev/stellar-learning
    ```
    This command will forward the container 3000 port to your `localhost:3000` address.

  You'll see this message, confirming that everything goes well:
        
      [server]: Server is running at http://localhost:3000 