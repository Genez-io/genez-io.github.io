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

You can find the complete project on {{< external-link link="https://github.com/Genez-io/genezio-examples/tree/master/javascript/blockchain" >}}Github{{< /external-link >}}. Feel free to take a look at it to better understand how the complete project should look.

If you get stuck along the way or you have any questions, don’t hesitate to contact me on {{< external-link link="https://discord.gg/XmpKD9ytxS" >}}Discord{{< /external-link >}} or write me an email at andreia@genez.io. I am more than happy to help 😄

## **Contents**

* [Introduction](#introduction)
* [Technical Tutorial](#technical-tutorial)
  * [Install node and npm](#install-node-and-npm)
  * [Install genezio](#install-genezio)
  * [Implement the server-side](#implement-the-server-side)
  * [Implement the client-side](#implement-the-client-side)
* [Test your project locally](#test-your-project-locally)
* [Deploy your project](#deploy-your-project)


## **Introduction**

### **What are you going to build?**

Today, you are going to build a **smart contract indexer** application. This app will be able to allow users to query events related to smart contracts on various blockchain networks. For this example, I chose to show you how to connect to the {{< external-link link="https://ethereum.org/en/" >}}Ethereum Mainnet{{< /external-link >}}.

Following, I am going to break down the steps you are going to get through:

1. Install dependencies and set up your project
2. Implement the server (backend) side of the project using NodeJS and genezio
3. Implement the client (frontend) side of the project using React
4. Test and deploy your application using genezio

## **Technical Tutorial**

This step is going to introduce you to quite a few new tools for interacting with a blockchain. Don’t worry if you’ve never worked with them because I am going to walk you through every new concept.

### **Install genezio**

To start implementing your first Web3 app, you’ll need to host it somewhere on the cloud where it can be easily accessed by your users.

You will use genezio to deploy your project quickly and easy with just a single command.

If you don't have node and npm installed on your machine, head over to their {{< external-link link="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" >}}documentation page{{< /external-link >}} to set them.

Install genezio using npm:
```
npm install genezio -g
```

Start using genezio by running the following command in your terminal:
```
genezio login
```

At any step, if you get stuck at any moment you can use `genezio help` or `genezio [command] help` to get more help with the tool.

At the end of this tutorial, the folder hierarchy of your project should be similar to this:
```
blockchain-project/
├── server-blockchain-project/
│   ├── genezio.yaml
│   ├── event.js
│   ├── blockchain.js
│   ├── abi.js
│   └── config.js
└── client-blockchain-project/
    ├── src/
    │   ├── sdk/
    │   └── App.js
    └── build/
```
This is just a small spoiler to understand where things are going to fit in.

### **Implement the server-side**

Create the folders hierarchy for the project:
```
mkdir blockchain-project && cd blockchain-project
```

To set up a new genezio project, initialize your configuration:
```
genezio init
```

`genezio init` will create a `genezio.yaml` file in the `server-blockchain-project` directory that will contain the configuration for the project server.

After completing the wizard, your terminal should look like this:
```
What is the name of the project: server-blockchain-project
What region do you want to deploy your project to? [default value: us-east-1]: us-east-1

Your genezio project was successfully initialized!

The genezio.yaml configuration file was generated. You can now add the classes that you want to deploy using the 'genezio addClass <className> <classType>' command.
```

Change into the newly created `server-blockchain-project` folder:
```
cd server-blockchain-project
```

Create a `package.json` using npm:
```
npm init -y
```

Install the `web3` and `mongoose` npm packages by executing:
```
npm install web3 mongoose
```

These npm packages will be used to interact with the blockchain and to save the events triggered on the blockchain in a Mongo database.

Create a `config.js` file in the `server-blockchain-project` directory.

```javascript
// server-blockchain-project/config.js

// Replace these values with your own
export const CONTRACT_ADDRESS = <todo-paste-the-contract-address-here>
export const BLAST_API_RPC_ENDPOINT = <todo-paste-the-blast-api-rpc-endpoint-here>
export const MONGO_DB_URI = <todo-paste-the-mongo-db-uri-here>
```

Create an `abi.js` in the `server-blockchain-project` directory and paste there the Ethereum bytecode of the smart contract:

```javascript
// server-blockchain-project/abi.js
export const abi = <todo-paste-the-abi-here>
```

Expand each of the following sections to get the necessary variables (`CONTRACT_ADDRESS`, `abi`, `BLAST_API_RPC_ENDPOINT`, `MONGO_DB_URI`) if you don't have them already.

{{< details "Get a smart contract address and ABI - Application Binary Interface" >}}

### **Get a smart contract address and ABI (Application Binary Interface)**

Head to {{< external-link link="https://opensea.io/" >}}OpenSea{{< /external-link >}} and choose the cutest NFT collection from trending.

Open the collection and select “View on EtherScan”.

![Street Art Image](/posts/ss_8.webp)

{{< external-link link="https://etherscan.io/" >}}EtherScan{{< /external-link >}} is an analytics platform for smart contracts deployed on the Ethereum blockchain. Here you can see all of the events managed by this smart contract under the “Events” tab.

![Street Art Image](/posts/ss_9.webp)

What is important on this page is:

1. The contract address - think of it as a unique name for the smart contract
Copy the contract address from the main page and paste it in the `config.js` file in the `server-blockchain-project` directory.

![Street Art Image](/posts/ss_10.webp)

2. The ABI - the binary that the Ethereum Virtual Machine knows how to execute.

Click on the _“Contract”_ tab and scroll down to the _“Contract ABI”_ section. Copy it from here and paste it in the `abi.js` file in the `server-blockchain-project` directory.

![Street Art Image](/posts/ss_11.webp)

{{< /details >}}

{{< details "Get access to an Ethereum endpoint using Blast API" >}}

 ### **Create a wallet with Metamask**

{{< external-link link="https://metamask.io/" >}}Metamask{{< /external-link >}} is a browser extension that will allow your browser to access the Ethereum blockchain. More than that, Metamask will also allow you to manage your ETH transactions. Install Metamask on your machine following the steps from their page.

Note to yourself - Remember the password you set because it will be useful in the next steps.

When you successfully finish this step, your screen should look like this:

![Street Art Image](/posts/screenshot_1.webp)

The wallet created with Metamask will be used to connect to an Ethereum endpoint using Blast API in the next step.

### **Get access to an Ethereum endpoint using Blast API**

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

To be able to interact with the node in your application, click on the_ “Active Endpoints”_, on the _“Ethereum”_ widget and copy the RPC endpoint and paste it in the `config.js` file in the `server-blockchain-project` directory.

![Street Art Image](/posts/ss_7.webp)
{{< /details >}}

{{< details "Create a Mongo Database" >}}

  ### **Create a Mongo Database**
You will need to set up a Mongo Database to store the events that are triggered on the smart contract. Follow the steps from this tutorial to create a free Mongo Database on {{< external-link link="https://genez.io/blog/how-to-add-a-mongodb-to-your-genezio-project/" >}}MongoDB Atlas{{< /external-link >}} and integrate it within your genezio project.

After you get a Mongo Database URI, add it to the `config.js` file in the `server-blockchain-project` directory.
{{< /details >}}

Create a Mongo database model to save the events triggered on the smart contract.
Inside a file at the path `server-blockchain-project/event.js` add the following code snippet:

```javascript
// server-blockchain-project/event.js
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

Create a `blockchain.js` file in the `server-blockchain-project` directory with a class name `BlockchainServer`. The class will have a constructor that will initialize the services used by the application - the endpoint to the Ethereum Blockchain using Blast API and it will set up the smart contract of your selected NFT.

```javascript
// server-blockchain-project/blockchain.js
import Web3 from "web3"
import { mongoose } from "mongoose";
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

Add a method that will sync the events triggered on the smart contract and index them in our database.
This method will be called periodically by configuring a scheduled expression (cron) in `genezio.yaml`.

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

Configure the `sync()` method in the `genezio.yaml` to be a cron that triggers every minute.
The file `genezio.yaml` file should look like this:

```yaml
name: blockchain-project
region: us-east-1
sdk:
  language: js
  path: ../client-blockchain-project/src/sdk/
classes:
  - path: ./blockchain.js
    type: jsonrpc
    methods:
      - name: sync
        type: cron
        cronString: "* * * * *"
```

### **Implement the client-side**

In this section you’ll build the client side of the project. This is going to be a simple React app.

Create a `client-blockchain-project` directory in the root directory of your project where you'll build the frontend application.

```
cd ../
mkdir client-blockchain-project
cd client-blockchain-project
```

Create a new React app with the following command:

```
npx create-react-app .
```

Install the following packages to get Material React UI components:

```
npm install @mui/material @emotion/react @emotion/styled
```

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

## **Test your project locally**

It is recommended to test your project locally before deploying it to make sure that everything works as expected. Execute the following commands to change the directory and start a local testing process:

Make sure that you are in the `server-blockchain-project` directory:
```
cd ../server-blockchain-project
```

Run the following command to start a local testing process:
```
genezio local
```

Your screen should look like this:

```
Generating your SDK...✅
Your code was deployed and the SDK was successfully generated!

Test your code at https://app.genez.io/test-interface/local?port=8083

Server listening on port 8083
```

Right now the server side of your project is listening to port 8083. You can head to {{< external-link link="https://app.genez.io/test-interface/local?port=8083" >}}app.genez.io/test-interface/local?port=8083{{< /external-link >}} to interact with it from the GUI.

You can also test the client side of your project. Do not stop the `genezio local` process. Open up a new terminal and head over to the `client-blockchain-project` directory. There you can execute the following commands:
```
npm start
```

You can now interact with your project from the browser at {{< external-link link="http://localhost:3000" >}}http://localhost:3000{{< /external-link >}}.

## **Deploy your project**

Prepare the configuration for your server before deploying it.

Your `server-blockchain-project/genezio.yaml` file should look like this:
```yaml
name: blockchain-project
region: us-east-1
sdk:
  language: js
  path: ../client-blockchain-project/src/sdk/
scripts:
  preFrontendDeploy: cd ../client-blockchain-project && npm install && npm run build
frontend:
  path: ../client-blockchain-project/build
classes:
  - path: ./blockchain.js
    type: jsonrpc
    methods:
      - name: sync
        type: cron
        cronString: "* * * * *"
```

To deploy both the backend and frontend of your app, go to the `server-blockchain-project` directory and deploy it with genezio. Hang in there because it might take a while.

```
cd server-blockchain-project/
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
