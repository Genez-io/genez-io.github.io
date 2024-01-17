---
title: Create your first app using ChatGPT
date: 2023-02-17
tags:
  - Tutorials
author: Radu Dumitrescu
linkedIn: https://www.linkedin.com/in/radu-andrei-dumitrescu/
thumbnail: /images/chatgptapp.svg
preview: In this tutorial, I will show you how to create an app called the Rephrasing App.
# meta data start
description: "Learn how to build your first ChatGPT app in this step-by-step tutorial. Rephrase text and improve your writing with React and genezio. Get started now!"
meta_og_url: "https://genezio.com/blog/create-your-first-app-using-chatgpt"
meta_og_image: "https://genezio.com/images/chatgptapp.svg"
# meta data end
---

 

In this tutorial, I will show you how to create an app called the Rephrasing App. The app that you are going to build has a simple UI written in React, uses the ChatGPT API and is deployed on genezio.

It will have two main components: the frontend which will consist of a simple chat-like interface, and the backend which exposes a function meant to rephrase your input text. Once implemented, the Rephrasing App can be used to rephrase text, write better articles or even upgrade your CV.



## Prerequisites:



* Install {{< external-link link="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" >}}npm{{< /external-link >}}

* Have an IDE installed, I personally recommend {{< external-link link="https://code.visualstudio.com/download" >}}Visual Studio Code{{< /external-link >}}

* Create a free account on {{< external-link link="https://openai.com/" >}}OpenAI{{< /external-link >}}



## Introduction


### **ChatGPT and genezio**

Since you are reading this, I assume you already know what ChatGPT is and how it works at its core. But how do you actually use it to build a working and useful app? Is it enough to call the API directly, or do you need to write other functions as well? How and where do you host it? I will work alongside you towards finding out the answers to most of these questions until the end of this article.

When deciding where to do the calls from, you have to keep in mind how secure you want this to be. So, as it is smart not to do them from the frontend, you are going to use genezio to host the backend and to call the OpenAPI from the genezio functions. For you to create a clearer idea about how this works, take a look at this illustration:

 
![Street Art Image](/posts/react-gen-chat.webp)
 

Now, let’s dive in! You can find the complete project {{< external-link link="https://github.com/Genez-io/genezio-examples/tree/master/javascript/chatgpt-project" >}}here{{< /external-link >}}.




## Configuration


### **Get the API Key from OpenAI**

 



1. Go to the {{< external-link link="https://platform.openai.com/signup/" >}}OpenAI website{{< /external-link >}} and create an account.

![Street Art Image](/posts/create-account.webp)


2. Go to{{< external-link link="https://platform.openai.com/account/api-keys" >}} platform.openai.com/account/api-keys{{< /external-link >}}
 
3. Click on the "Create new secret key" button.

![Street Art Image](/posts/api-keys.webp)


**Note**: Remember to keep your API key secure and do not share it with anyone.


### **Set Up genezio**

First, install genezio using npm:


```
npm install genezio -g
```


Then, use this command to log in:


```
genezio login
```





Create a new project:


```
genezio create fullstack ts-blank-api ts-blank-react --name=chatgpt-project
```



### **The Server-side Project**


Change into the newly created `server` folder:


```
cd ./chatgpt-project/server
```


Now, you’re ready to install `openai`:


```
npm install openai
```


**Note:** This npm package provides a convenient way to access OpenAI API from any JavaScript application.


### **Implement the Backend Class**

You will implement a class containing a function that you will deploy and then call it from the frontend application.


Create the `.env` file and add the following variable that will store your OpenAI secret key from your OpenAI account:


```
OPENAI_SECRET_KEY=<your_secret_key>
```



Create a new file `gptCaller.js` and start by adding the dependencies:


```javascript
import { GenezioDeploy } from "@genezio/types";
import OpenAI from 'openai';
```


In the constructor of the class, instantiate the `openai` object:


```javascript
@GenezioDeploy()
export class GptCaller {
  openai = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET_KEY
    });
  }
}
```


Now you can create the class and the async method that will receive the input text from the frontend app. It will call ChatGPT, and then send the response back to the frontend.

Take a look at the complete file code:


```javascript
import { GenezioDeploy } from "@genezio/types";
import OpenAI from 'openai';

@GenezioDeploy()
export class GptCaller {
  openai = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET_KEY
    });
  }

  // send a request to the ChatGPT API to get the requestText
  async askChatGPT(requestText) {
    const completion = await this.openai.chat.completions.create({
      // the used model at the moment of writing this article
      model: "gpt-3.5-turbo",
      // tells ChatGPT to rephrase the requestText
      messages: [{"role": "user", "content": "rephrase this:" + requestText}],
    });

    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.choices[0].message}`
    );
    return completion.choices[0].message.content;
  }
}
```

**Note**: Please make sure to check out the OpenAI API {{< external-link link="https://platform.openai.com/docs/api-reference/completions" >}}Official Documentation{{< /external-link >}} for more information.

Now run the following command to test your backend locally:
```
genezio local
```




### **The Client-side React Project**

Go to the `client` folder in a **new terminal**:


```
cd ./../client
```



### **Implement the User Interface**

In this part of the article you will create the UI for chatting with the backend. This in the `src/App.tsx` file.

First, import the dependencies from `react`, `SDK`, and `CSS`:


```javascript
import { useState } from "react";
import { GptCaller } from '@genezio-sdk/chatgpt-project_us-east-1';
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


```typescript
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


For displaying the user’s input text and the response generated by ChatGPT, you need 2 elements. On the left side of the screen text generated by ChatGPT will be displayed, and on the right there will be the user text.

This will be done in a `map` of the messages:


```tsx
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


To finish, you need a form with an input text box where the user can enter the text:


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


**Note:** We provide you with the complete CSS for this project in `src/App.css`.

#### Test your code
On the `client` folder start the frontend:
```
npm run dev
```

Open your browser and go to `http://localhost:5173/` to see the app in action.

#### Deploy your project
Go to the **root** folder of your project and run the following command:
```
genezio deploy
```



#### This is it!

You can find the complete project on our {{< external-link link="https://github.com/Genez-io/genezio-examples/tree/master/javascript/chatgpt-project" >}}Github{{< /external-link >}}


I hope that you found this tutorial informative and helpful, and I encourage you to check out our {{< external-link link="https://genezio.com/blog/" >}}other articles{{< /external-link >}} for more tips and tricks on mastering your craft.

Let me know if you need help by contacting me on {{< external-link link="https://discord.gg/XmpKD9ytxS" >}}Discord{{< /external-link >}}
 or write me an email at contact@genez.io.

 
