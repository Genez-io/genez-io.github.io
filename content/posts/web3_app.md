---
title: Create your first Web3 app
date: 2023-03-03
tags:
  - Tutorials
author: Andreia Ocanoaia
linkedIn: https://www.linkedin.com/in/andreia-irina-ocanoaia/
thumbnail: /images/web3app.svg
preview: In this tutorial, I am going to show you how to create your first Web3 application
# meta data start
description: "Build your first Web3 application on Ethereum using genezio with this beginner-friendly tutorial. Create a smart contract indexer with React, and Metamask, and deploy the app on genezio."
meta_og_url: "https://genez.io/blog/create-your-first-web3-app"
meta_og_image: "https://genez.io/images/web3app.svg"
# meta data end
---
<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 2.118 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Fri Mar 03 2023 01:31:18 GMT-0800 (PST)
* Source doc: Web3 App
----->


In this tutorial, I am going to show you how to create your first Web3 application on Ethereum using genezio and Blast API. You don’t have to know anything beforehand to follow along. I will introduce you to the most basic blockchain concepts and tools to get you from zero to hero in Web3 development. Excited? Let’s get started 🤩

After following through with this tutorial, you’ll be able to:

1. Create a wallet with Metamask
2. Use Blast API to connect to the Ethereum Mainnet
3. Use NodeJS and Mongo DB to build a smart contract indexer to get the events happening on a blockchain
4. Use React to develop a minimalist frontend
5. Deploy a full stack application on genezio

You can find the complete project on {{< external-link link="https://github.com/Genez-io/genezio-examples/tree/master/javascript/blockchain" >}}Github{{< /external-link >}}
. Feel free to take a look at it to better understand how the complete project should look.

If you get stuck along the way or you have any questions, don’t hesitate to contact me on {{< external-link link="https://discord.gg/XmpKD9ytxS" >}}Discord{{< /external-link >}}
 or write me an email at andreia@genez.io. I am more than happy to help 😄

## **Contents**

* [Introduction](#introduction)
* [Technical Tutorial](#technical-tutorial)
  * [Install node and npm](#install-node-and-npm)
  * [Install genezio](#install-genezio)
  * [Set up the project](#set-up-the-project)
  * [Create a Mongo Database](#create-a-mongo-database)
  * [Create a wallet with Metamask](#create-a-wallet-with-metamask)
  * [Get access to an Ethereum endpoint using Blast API](#get-access-to-an-ethereum-endpoint-using-blast-api)
  * [Get a smart contract address and ABI (Application Binary Interface)](#get-a-smart-contract-address-and-abi-application-binary-interface)
  * [Implement the server-side class](#implement-the-server-side-class)
  * [The client-side project](#the-client-side-project)
  * [Set up the client-side project](#set-up-the-client-side-project)
  * [Implement the client-side project](#implement-the-client-side-project)
* [Test your project locally](#test-your-project-locally)
* [Deploy your project](#deploy-your-project)
* [Blockchain Concepts](#blockchain-concepts)
    * [What is a blockchain?](#what-is-a-blockchain)
    * [What are smart contracts?](#what-are-smart-contracts)


## **Introduction**

### **What are you going to build?**

Today, you are going to build a **smart contract indexer** application. This app will be able to allow users to query events related to smart contracts on various blockchain networks. For this example, I chose to show you how to connect to the {{< external-link link="https://ethereum.org/en/" >}}Ethereum Mainnet{{< /external-link >}}.

Following, I am going to break down the steps you are going to get through:

1. Install dependencies and set up your project
2. Implement the server (backend) side of the project using Blast API
3. Implement the client (frontend) side of the project using React
4. Test and deploy your application using genezio

## **Technical Tutorial**

Let’s install the dependencies needed for the smart contract indexer app.

This step is going to introduce you to quite a few new tools for interacting with a blockchain. Don’t worry if you’ve never worked with them because I am going to walk you through every new concept.


### **Instal node and npm**

This is the easiest step. Head over to their {{< external-link link="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" >}}documentation page{{< /external-link >}} to install `node` and `npm` on your machine.


### **Install genezio**

To start implementing your first Web3 app, you’ll need to host it somewhere on the cloud where it can be easily accessed by your users. For this, you can use genezio - a platform that is deploying your full stack application to the cloud.

Install genezio using npm:
```
npm install genezio -g
```

### **Set up the project**

Fire up your preferred IDE and your terminal and let’s get our hands dirty with some coding. You will use genezio to make your life easier while building your app.

At the end of this tutorial, the folder hierarchy of your project should be similar to this:
```
blockchain-project/
├── server/
│   ├── genezio.yaml
│   ├── models/
│   │   └── event.js
│   ├── blockchain.js
│   ├── abi.js
│   └── config.js
└── client/
    ├── src/
    │   ├── sdk/
    │   └── App.js
    └── build/
```
This is just a small spoiler to understand where things are going to fit in.

Start using genezio by log in in to your account:
```
genezio login
```

At any step, if you get stuck at any moment you can use `genezio help` or `genezio [command] help` to get more help with the tool.


Create the folders hierarchy for the project:
```
mkdir -p blockchain-project/server
cd blockchain-project/server
```

To set up a new genezio project, initialize your configuration:
```
genezio init
```

`genezio init` will create a `genezio.yaml` file in the `server` directory that will contain the configuration for the project server.

After completing the wizard, your terminal should look like this:
```
What is the name of the project: blockchain-project
What region do you want to deploy your project to? [default value: us-east-1]: us-east-1

Your genezio project was successfully initialized!

The genezio.yaml configuration file was generated. You can now add the classes that you want to deploy using the 'genezio addClass <className> <classType>' command.
```

Create a package.json using npm:
```
npm init -y
```

Install the `web3` and `mongoose` npm packages by executing:
```
npm install web3
npm install mongoose
```

Create a `client` directory in the root directory of your project where you'll build the frontend application.

```
mkdir -p blockchain-project/client
cd blockchain-project/client
```

Create a new React app with the following command:

```
npx create-react-app .
```

Install the following packages to get Material React UI components:

```
npm install @mui/material @emotion/react @emotion/styled
```


#### **Create a Mongo Database**

You will need to set up a Mongo Database to store the events that are triggered on the smart contract. Follow the steps from this tutorial to create a free Mongo Database on {{< external-link link="https://genez.io/blog/how-to-add-a-mongodb-to-your-genezio-project/" >}}MongoDB Atlas{{< /external-link >}} and integrate it within your genezio project.

#### **Create a wallet with Metamask**

{{< external-link link="https://metamask.io/" >}}Metamask{{< /external-link >}}
 is a browser extension that will allow your browser to access the Ethereum blockchain. More than that, Metamask will also allow you to manage your ETH transactions. Install Metamask on your machine following the steps from their page.

Note to yourself - Remember the password you set because it will be useful in the next steps.

When you successfully finish this step, your screen should look like this:

![Street Art Image](/posts/screenshot_1.webp)

The wallet created with Metamask will be used to connect to an Ethereum endpoint using Blast API in the next step.

#### **Get access to an Ethereum endpoint using Blast API**

A blockchain is very similar to a public network of machines. In order to connect to the network you either need to plug your machine into the network and receive an IP address of your own, or you can remotely connect to an existing machine and use it to interact with the network.

To interact with a given blockchain, you can either host and add your node to the blockchain or access an existing node. In this tutorial, we are going to use Blast API to get an endpoint to an existing node from the Ethereum Mainnet.

Head over to the {{< external-link link="https://blastapi.io/" >}}Blast API webpage{{< /external-link >}}
 and click on _“Get Endpoint”_ - this will allow you to interact with the blockchain using an existing node.

![Street Art Image](/posts/screenshot_2.webp)

From there, select _“Create a Consumer App”_ and connect using your Metamask wallet. Follow through the pop-ups that are appearing on your screen.

![Street Art Image](/posts/ss_3.webp)

Now you can set up a project to get access to an Ethereum endpoint. Select _“Add a new project”_.

![Street Art Image](/posts/ss_4.webp)

Enter a project name and select the _“development”_ environment. After you are happy with the name, hit the _“Create project”_ button.

![Street Art Image](/posts/ss_5.webp)

A dashboard with your active endpoints will appear. For now, there is no endpoint you are connected to, so let’s change that. Head to the _“Available Endpoints”_ tab and select _“Ethereum”_ and, then, _“Ethereum Mainnet”_.

![Street Art Image](/posts/ss_6.webp)

Congrats 🥳 Now you are connected to an Ethereum node.

To be able to interact with the node in your application, click on the_ “Active Endpoints”_, on the _“Ethereum”_ widget and copy the RPC endpoint for later. This will allow you to send requests to the node.

![Street Art Image](/posts/ss_7.webp)

#### **Get a smart contract address and ABI (Application Binary Interface)**

Head to {{< external-link link="https://opensea.io/" >}}OpenSea{{< /external-link >}}
 and choose the cutest NFT collection from trending.

Open the collection and select “View on EtherScan”.

![Street Art Image](/posts/ss_8.webp)

{{< external-link link="https://etherscan.io/" >}}EtherScan{{< /external-link >}}
 is an analytics platform for smart contracts deployed on the Ethereum blockchain. Here you can see all of the events managed by this smart contract under the “Events” tab.

![Street Art Image](/posts/ss_9.webp)

What is important on this page is:

1. The contract address - think of it as a unique name for the smart contract
Copy the contract address from the main page.

![Street Art Image](/posts/ss_10.webp)

2. The ABI - the binary that the Ethereum Virtual Machine knows how to execute.

Click on the _“Contract”_ tab and scroll down to the _“Contract ABI”_ section. Copy it from here.

![Street Art Image](/posts/ss_11.webp)

#### **Implement the server-side class**

Create a `config.js` file in the `server` directory and paste there the constants that you obtained in the steps above:

```javascript
// config.js

// Replace these values with your own
export const CONTRACT_ADDRESS = <todo-paste-the-contract-address-here>
export const BLAST_API_RPC_ENDPOINT = <todo-paste-the-blast-api-rpc-endpoint-here>
export const MONGO_DB_URI = <todo-paste-the-mongo-db-uri-here>
```

Create an `abi.js` in the `server` directory and paste there the Ethereum bytecode of the smart contract:

```javascript
// abi.js
export const abi =
`
[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"string","name":"baseURI_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"startWith","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"times","type":"uint256"}],"name":"MintSeals","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"numberOfMints","type":"uint256"}],"name":"addToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addr","type":"address[]"},{"internalType":"uint256[]","name":"_numberOfMints","type":"uint256[]"}],"name":"addToWhitelistBulk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_times","type":"uint256"}],"name":"adminMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"adminMintGiveaways","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newDate","type":"uint256"}],"name":"changePresaleStartDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"changePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newDate","type":"uint256"}],"name":"changeStartDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getWhitelistMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"isAddressInWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxBatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_times","type":"uint256"}],"name":"mintSeal","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleRelease","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releaseUnix","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_start","type":"bool"}],"name":"setNormalStart","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"setTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_start","type":"bool"}],"name":"setWhiteListStart","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"started","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSeals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whiteListStart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_times","type":"uint256"}],"name":"whitelistMint","outputs":[],"stateMutability":"payable","type":"function"}]
`
```

Create a Mongo database model to save the events triggered on the smart contract. Create a directory at the path `server/models` and inside it, a file named `event.js`.
```javascript
// models/event.js
import mongoose from 'mongoose'
const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  parameters: Map,
  blockNumber: Number,
  logIndex: Number,
});
export const EventModel = mongoose.models.Event || mongoose.model('Event', eventSchema);
```

Create a `blockchain.js` file in the `server` directory with a class name `BlockchainServer`. The class will have a constructor that will initialize the services used by the application - the endpoint to the Ethereum Blockchain using Blast API and it will set up the smart contract of your selected NFT.
```javascript
// blockchain.js
import Web3 from "web3"
import { mongoose } from "mongoose";
import { EventModel } from "./models/event.js"
import { abi } from "./abi.js";
import { CONTRACT_ADDRESS, BLAST_API_RPC_ENDPOINT, MONGO_DB_URI} from "./config.js";
/**
 * The Blockchain server class that will be deployed on the genezio infrastructure.
 */
export class BlockchainServer {
    constructor() {
        mongoose.connect(MONGO_DB_URI);
        this.web3 = new Web3(BLAST_API_RPC_ENDPOINT);
        this.contract = new this.web3.eth.Contract(JSON.parse(abi), CONTRACT_ADDRESS);
        this.knownEventTokens = this.contract.options.jsonInterface.filter((token) => {
            return token.type === 'event';
        });
    }
}
```

Add a method in the class `BlockchainServer` to decode events from the blockchain. This method is going to be private.
```javascript
   /**
     * Private method that decodes an event and returns the name and the parameters.
     *
     * This will not be callable using the genezio SDK. Only the public methods are exposed publicly.
     *
     * @param {*} event
     * @returns An object containing the name of the event and its parameters.
     */
    #decodeEvent(event) {
        // Retrieve the event declaration from the ABI
        const eventToken = this.knownEventTokens.find((knownEventToken) => {
            return knownEventToken.signature === event.topics[0];
        });
        if (!eventToken) {
            console.log('cannot process log %d', event.logIndex);
            return undefined;
        }
        // Decode the event
        const decodedEvent = this.web3.eth.abi.decodeLog(
            eventToken.inputs,
            event.data,
            event.topics.slice(1),
        )
        // Parse the parameters in a simple dictionary
        const parameters = {}
        eventToken.inputs.forEach((input) => {
            parameters[input.name] = decodedEvent[input.name]
        })
        return {
            name: eventToken.name,
            parameters,
        }
    }
```

Add a method that will sync the events triggered on the smart contract and index them in our database. This method will be called periodically by configuring a cron in `genezio.yaml`.

```javascript
   /**
     * Method that will be called periodically by the genezio infrastructure to index the events.
     *
     * The frequency with which the method will be called can be modified from the genezio YAML file.
     *
     */
    async sync() {
        // Get the current block number and request the last 100 blocks
        const blockNumber = await this.web3.eth.getBlockNumber()
        let events = await this.web3.eth.getPastLogs({ address: CONTRACT_ADDRESS, fromBlock: blockNumber - 50, toBlock: blockNumber });
        console.log(`New sync started with ${events.length} to save`)
        for (const event of events) {
            const decodedEvent = this.#decodeEvent(event)
            if (!decodedEvent) {
                continue
            }

            // Insert the missing events.
            await EventModel.findOneAndUpdate({ id: `${event.transactionHash}-${event.logIndex}` }, {
                $setOnInsert: {
                    id: `${event.transactionHash}-${event.logIndex}`,
                    name: decodedEvent.name,
                    parameters: decodedEvent.parameters,
                    blockNumber: event.blockNumber,
                    logIndex: event.logIndex
                }
            }, { upsert: true });
        }
    }
```

Lastly, add a method to get the saved events from the database.

```javascript
   /**
     * Method used to get all the events in a paginated way.
     *
     * The method will be part of the genezio SDK.
     *
     * @param {*} from The starting index of the first event.
     * @param {*} limit The number of events that will be part of the response.
     * @returns
     */
    async GetEvents(from, limit) {
        console.log(`Received getEvents request with from = ${from} limit = ${limit}`)
        const count = await EventModel.count()
        console.log("Event count", count)
        const events = await EventModel.find(undefined, undefined, { skip: from, limit, sort: { "blockNumber": -1, "logIndex": -1 } })
        return {
            count,
            "events": events.map((event) => ({ id: event.id, name: event.name, parameters: event.parameters, blockNumber: event.blockNumber }))
        }
    }
```

Add `blockchain.js` to the genezio configuration file to prepare this class for deployment.

```
genezio addClass blockchain.js
```

Configure the `sync()` method in the `genezio.yaml` to be a cron that triggers every minute. Your `genezio.yaml` file should look like this:

```yaml
name: blockchain-project
region: us-east-1
sdk:
  language: js
  path: ../client/src/sdk/
classes:
  - path: ./blockchain.js
    type: jsonrpc
    methods:
      - name: sync
        type: cron
        cronString: "* * * * *"
```

Now the server side of your project is finished. You can continue to the next section where you’ll build the client side. This is going to be a simple React app.

#### **Implement the client-side project**

Modify `src/App.js` as follows:
```javascript
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './App.css';
import { BlockchainServer } from "./sdk/blockchainServer.sdk"

const CHUNKS = 10
function App() {
  const [totalCount, setTotalCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [events, setEvents] = useState([])

  useEffect(() => {
    setCurrentIndex(0)
  }, [])

  useEffect(() => {
    // Use the SDK to get events from the BlockchainServer class hosted on genezio
    BlockchainServer.GetEvents(currentIndex, CHUNKS)
      .then((response) => {
        setEvents(response.events)
        setTotalCount(response.count)
      })
      .catch((error) => {
        console.error("An error occurred!", error)
        setEvents([])
      })
  }, [currentIndex])

  const handleChange = (param, value) => {
    setCurrentIndex((value - 1) * CHUNKS)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Genezio Smart Contract Indexer</h1>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {events.map((event) =>
            <ListItem>
              <ListItemText primary={event.name} secondary={event.blockNumber + " " + JSON.stringify(event.parameters)} />
            </ListItem>
          )
          }
        </List>
        <div>
        <Pagination count={Math.floor(totalCount / CHUNKS)} onChange={handleChange}></Pagination>
        </div>
      </header>
    </div>
  );
}

export default App;
```

### **Test your project locally**

It is recommended to test your project locally before deploying it to make sure that everything works as expected. Execute the following commands to change the directory and start a local testing process:

```
cd server
genezio local
```

Your screen should look like this:

```
Generating your SDK...✅
Your code was deployed and the SDK was successfully generated!

Test your code at https://app.genez.io/test-interface/local?port=8083

Server listening on port 8083
```

Right now the server side of your project is listening to port 8083. You can head to {{< external-link link="https://app.genez.io/test-interface/local?port=8083" >}}app.genez.io/test-interface/local?port=8083{{< /external-link >}}
 to interact with it from the GUI.

You can also test the client side of your project. Do not stop the `genezio local` process. Open up a new terminal and head over to the `client` directory. There you can execute the following commands:
```
npm install
npm start
```

### **Deploy your project**

Prepare the configuration for your server before deploying it.

Your `server/genezio.yaml` file should look like this:
```yaml
name: blockchain-project
region: us-east-1
sdk:
  language: js
  path: ../client/src/sdk/
scripts:
  preFrontendDeploy: cd ../client && npm install && npm run build
frontend:
  path: ../client/build
classes:
  - path: ./blockchain.js
    type: jsonrpc
    methods:
      - name: sync
        type: cron
        cronString: "* * * * *"
```

To deploy both the backend and frontend of your app, go to the `server` directory and deploy it with genezio. Hang in there because it might take a while.

```
cd server/
genezio deploy
```

After the project has been successfully deployed, your terminal should look like this:

```
Deploying your backend project to genezio infrastructure...

Bundling your code and uploading it...✅
Checking your credentials...✅
Doing the final touch-ups...✅

Your code was deployed and the SDK was successfully generated!

Your backend project has been deployed and is available at https://app.genez.io/project/<project-id-here>

Deploying your frontend to genezio infrastructure...

No subdomain specified in the genezio.yaml configuration file. We will provide a random one for you.

Frontend successfully deployed at https://cyan-light-owl.app.genez.io.
```

Congrats again 🥳 Now you can manage your project from the genezio Dashboard - you can test it, check the logs, or delete it if you don’t need it anymore.

I hope you enjoyed this tutorial and I encourage you to check out our other tutorials for more tips and tricks on developing your ninja developer skills 🥷 💻

## Blockchain Concepts

### **What is a blockchain?**

A blockchain is a digital ledger of transactions that is decentralized. The ledger is maintained and updated by a network of computers, or nodes, that work together to validate and record transactions.

You can think of a blockchain as a network of computers that work together to create a public network that anyone can access and perform operations on, like sending tokens or running programs. Every node that’s part of this network has access to the data stored by the ledger and all of these nodes are ensuring that the data stays unchanged.


### **What are smart contracts?**

A smart contract is a self-executing program that automatically enforces the rules of an agreement between two or more parties. To make an analogy, if a blockchain can be associated with a large, public database, then a smart contract is an API that is able to read, write and execute commands over this database.

Because smart contracts are executed by a decentralized network of nodes rather than a central entity, they have been built to be transparent, immutable, and difficult to tamper with. This makes them ideal for use in applications where trust is important, such as financial transactions, supply chain management, and digital identity verification.
