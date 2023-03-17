---
title: Create your first app using ChatGPT
date: 2022-02-17
tags:
  - Tutorials
author: Radu Dumitrescu
linkedIn: https://www.linkedin.com/in/radu-andrei-dumitrescu/
thumbnail: /images/chatgptapp.svg
preview: In this tutorial, I will show you how to create an app called the Rephrasing App.
---
<!-----

You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 3

Conversion time: 1.222 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Fri Feb 17 2023 07:02:14 GMT-0800 (PST)
* Source doc: Untitled document
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 3.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>

 

In this tutorial, I will show you how to create an app called the Rephrasing App. The app that you are going to build has a simple UI written in React, uses the ChatGPT API and is deployed on genezio.

It will have two main components: the frontend which will consist of a simple chat-like interface, and the backend which exposes a function meant to rephrase your input text. Once implemented, the Rephrasing App can be used to rephrase text, write better articles or even upgrade your CV.

After reading this article you will know how to:



* use ChatGPT’s API
* work with genezio to create and deploy a ChatGPT app
* use React to create a fast and easy UI

Prerequisites:



* Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Have an IDE installed, I personally recommend [Visual Studio Code](https://code.visualstudio.com/download)
* Create a free account on [OpenAI](https://openai.com/)
* Create a free [genezio](https://genez.io/) account


## Introduction


### **ChatGPT and genezio**

Since you are reading this, I assume you already know what ChatGPT is and how it works at its core. But how do you actually use it to build a working and useful app? Is it enough to call the API directly, or do you need to write other functions as well? How and where do you host it? I will work alongside you towards finding out the answers to most of these questions until the end of this article.

When deciding where to do the calls from, you have to keep in mind how secure you want this to be. So, as it is smart not to do them from the frontend, you are going to use genezio to host the backend and to call the OpenAPI from the genezio functions. For you to create a clearer idea about how this works, take a look at this illustration:

 
![Street Art Image](/posts/react-gen-chat.webp)
 

As I started setting up my machine for building this app, I encountered a few things that I think are worth mentioning. This will hopefully help you go through a more seamless process.

The first problem I had was when I tried using my older OpenAI account. I signed into my account, but I soon realised that I wasn’t able to use it and didn’t know the reason. After I did some searching, I found out that it had an expired credit card on file. I eventually had to change it to make it work even with the free version - you would have thought that using a free version wouldn’t require a working card. So, make sure your payment details are up to date if you previously used a credit card on OpenAI.

As of January 2023 - the date of writing this article -, the paywall for OpenAI had a call limitation of 20 calls per minute or 150,000 tokens per minute. For those of you who don’t know what a token is, it is defined as a relevant word that needs to be analysed by the engine.

Keep in mind that additional charges may be made if exceeding these limits. Make sure you read the relevant articles published on their [website](https://help.openai.com/en/articles/5955598-is-api-usage-subject-to-any-rate-limits).

The free tier may be slower than the paid one, and can also offer lower quality of service. It is important to carefully consider the trade-offs between the free and paid options and choose the one that best fits your needs.

Now, let’s get back to our Reprashing App and dive into the detailed step-by-step tutorial!  You can find the complete project on [Github](https://github.com/Genez-io/genezio-examples/tree/master/javascript/chatgpt-project)

Let me know if you need help by contacting me on [Discord](https://discord.gg/XmpKD9ytxS) or write me an email at contact@genez.io.

 


## Getting Started: Configuration


### **Get the API Key from OpenAI**

 



1. Go to the OpenAI website at[ https://beta.openai.com/signup/](https://beta.openai.com/signup/)
2. Use one of the methods provided to create your account.

![Street Art Image](/posts/create-account.webp)


3. Go to[ https://beta.openai.com/account/api-keys](https://beta.openai.com/account/api-keys) 
4. Click on the "Create new secret key" button.

![Street Art Image](/posts/api-keys.webp)


Note: Keep your API key secure and do not share it with anyone.


### **Install genezio and Log In**

First, install genezio using npm:


```
npm install genezio -g
```


After the installation is completed, you need to log in using this command:


```
genezio login
```



### **Setup a New genezio Project**

Create a new project folder:


```
mkdir chatgpt-project && cd chatgpt-project
```


In this folder you will add 2 more folders, **client** and **server:**


```
mkdir server && mkdir client
```



### **The Server-side Project**

Change into the newly created server folder:


```
cd server
```


Set up a new genezio project:


```
genezio init
```


After you complete the wizard, your terminal should look like this:


```
What is the name of the project: chatgpt-project
In what programming language do you want your SDK? (js, ts or swift) [default value: js]: js
What runtime will you use? Options: "node" or "browser". [default value: node]: browser
Where do you want to save your SDK? [default value: ./sdk/]: ./../client/src/sdk

Your genezio project was successfully initialized!

The genezio.yaml configuration file was generated. You can now add the classes that you want to deploy using the 'genezio addClass <className> <classType>' command.
```


Create a `package.json` using npm:


```
npm init -y
```


Now you’re ready to install `openai` using npm:


```
npm install openai
```


Note: This npm package provides a convenient way to access OpenAI API from any JavaScript application.


### **Implement the Backend Class**

In this section, you will implement a class containing a function that you will deploy and then make the call from the frontend application.

You will need to install `dotenv` to securely store your secret key in a .env file:


```
npm install dotenv
```


Now, create a new class using genezio:


```
genezio addClass gptCaller.js
```


You also need to create a `.env` file for your secret key:


```
touch .env
```



### **Move to Your IDE**

After this point, you should open an IDE to continue working on the project.

Open the `.env` file and add the following variable that will store your OpenAI secret key from your OpenAI account:


```
OPENAI_SECRET_KEY=<your_secret_key>
```


Now open the `gptCaller.js` class and start by adding the dependencies:


```javascript
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();
```


In the constructor of the class, instantiate the `openai` object:


```javascript
constructor() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY
  });
  const openai = new OpenAIApi(configuration);
  this.openai = openai;
}
```


Now you have everything that you need to create the class and the async method that will receive the input text from the frontend app. It will call ChatGPT, and then will send the response back to the frontend.

Take a look at the complete file code:


```javascript
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

export class GptCaller {
  openai = null;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_SECRET_KEY
    });
    const openai = new OpenAIApi(configuration);
    this.openai = openai;
  }

  async askChatGPT(requestText) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: "rephrase this:" + requestText,
      max_tokens: 2048
    });
    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.data.choices[0]
        .text}`
    );
    return completion.data.choices[0].text;
  }
}
```


In the `askChatGPT` method, `openai.createCompletion` sends a request to the ChatGPT API to get the `requestText`. This is received as a parameter of the function.

`text-davinci-003`, the model used in this tutorial, is the same one used by ChatGPT on OpenAI's web app at the moment of writing the article.

`max_tokens:2048` is used to ensure a complete answer to bigger requests.

Also,  `prompt: "rephrase this:" + requestText` tells ChatGPT to rephrase the `requestText`.

Finally, the method logs the request and the response, and then returns the response.

For complete OpenAI API Documentation, you can go to this website: [ https://beta.openai.com/docs/api-reference/completions](https://beta.openai.com/docs/api-reference/completions)


### **The Client-side React Project**

Go to the client folder:


```
cd ./../client
```


Create a new React app:


```
npx create-react-app .
```


Now, you can deploy your backend project from the `server` folder to the genezio infrastructure (this might take up to 3 minutes, so be patient):


```
cd ./../server && genezio deploy
```


If the deployment is successful, then you can go to the genezio web app to see more information and logs of your project:


```
https://app.genez.io/project/<your_project_id>
```


Now that the backend is deployed, you can start the React app:


```
cd ./../client && npm start
```


 


### **Implement the User Interface**

In this part of the article you will create the UI for chatting with the backend. This in the `src/App.js` file.

First, import the dependencies from `react`, `SDK,` and `CSS`:


```javascript
import { useState } from "react";
import { GptCaller } from "./sdk/gptCaller.sdk.js";
import "./App.css";
```


In the `App` component you will need 3 `useState` objects for the messages, requestText, and a boolean variable for the request - `isRequesting`:


```javascript
// each mesage format: {text: "message", isUser: true/false}
const [messages, setMessages] = useState([]);
const [requestText, setRequestText] = useState("");
const [isRequesting, setIsRequesting] = useState(false);
```


You will also need to write a method for sending the request:


```javascript
function sendRequest(e) {
  e.preventDefault();
  setIsRequesting(true);
  GptCaller.askChatGPT(requestText)
    .then(response => {
      setMessages([
        {
          text: requestText,
          isUser: true
        },
        {
          text: response,
          isUser: false
        }
      ]);
      setRequestText("");
      setIsRequesting(false);
    })
    .catch(err => {
      console.log(err);
      setIsRequesting(false);
    });
}
```


For displaying the user’s input text and the response generated by ChatCPT, you need 2 elements. On the left side of the screen ChatGPT generated text will be displayed, and on the right there will be the user text. This will be done in a `map` of the messages:


```jsx
{messages.map((message, index) => {
  if (message.isUser) {
    return (
      <div className="msg right-msg" key={index}>
        <div className="msg-bubble">
          <div className="msg-info">
            <div className="msg-info-name">You</div>
          </div>

          <div className="msg-text">
            {message.text}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="msg left-msg" key={index}>
        <div className="msg-bubble">
          <div className="msg-info">
            <div className="msg-info-name">ChatGPT</div>
          </div>

          <div className="msg-text">
            {message.text}
          </div>
        </div>
      </div>
    );
  }
})}
```


In the end, you need a form with an input text box where the user can enter the text:


```jsx
<form className="msger-inputarea" onSubmit={e => sendRequest(e)}>
  <input
    type="text"
    className="msger-input"
    placeholder="Enter your message..."
    value={requestText}
    onChange={e => setRequestText(e.target.value)}
  />
  <button
    type="submit"
    className="msger-send-btn"
    onClick={e => sendRequest(e)}
  >
    {isRequesting ? "Sending..." : "Send"}
  </button>
</form>
```


Complete code file:


```jsx
import { useState } from "react";
import { GptCaller } from "./sdk/gptCaller.sdk.js";
import "./App.css";

function App() {
  // each mesage format: {text: "message", isUser: true/false}
  const [messages, setMessages] = useState([]);
  const [requestText, setRequestText] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  function sendRequest(e) {
    e.preventDefault();
    setIsRequesting(true);
    GptCaller.askChatGPT(requestText)
      .then(response => {
        setMessages([
          {
            text: requestText,
            isUser: true
          },
          {
            text: response,
            isUser: false
          }
        ]);
        setRequestText("");
        setIsRequesting(false);
      })
      .catch(err => {
        console.log(err);
        setIsRequesting(false);
      });
  }

  return (
    <div className="App">
      <section className="msger">
        <header className="msger-header">
          <h4>Rephrasing app using ChatGPT, genezio and React</h4>
        </header>

        <main className="msger-chat">
          {messages.map((message, index) => {
            if (message.isUser) {
              return (
                <div className="msg right-msg" key={index}>
                  <div className="msg-bubble">
                    <div className="msg-info">
                      <div className="msg-info-name">You</div>
                    </div>

                    <div className="msg-text">
                      {message.text}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="msg left-msg" key={index}>
                  <div className="msg-bubble">
                    <div className="msg-info">
                      <div className="msg-info-name">ChatGPT</div>
                    </div>

                    <div className="msg-text">
                      {message.text}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </main>

        <form className="msger-inputarea" onSubmit={e => sendRequest(e)}>
          <input
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
            value={requestText}
            onChange={e => setRequestText(e.target.value)}
          />
          <button
            type="submit"
            className="msger-send-btn"
            onClick={e => sendRequest(e)}
          >
            {isRequesting ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
```


Note: We are providing you with a complete CSS for this interface for `src/App.css`.

This is it! You can find the complete project on our [Github](https://github.com/Genez-io/genezio-examples/tree/master/javascript/chatgpt-project)

I hope that you found this tutorial informative and helpful, and I encourage you to check out our other articles for more tips and tricks on mastering your craft.

 
