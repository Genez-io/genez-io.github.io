---
title: Exploring the Differences Between genezio and Express.js
date: 2023-05-05
tags:
  - Comparison
author: Stefan Iordache
linkedIn: https://www.linkedin.com/in/stefan-d-iordache/
thumbnail: /images/genezio_express.png
preview: Today we will compare genezio with one of the major players in the market, Express
# meta data start
description: "Compare genezio with Express.js. Find out about writing code, testing the code, calling the API from your client, and what it takes to deploy your code."
meta_og_url: "https://genez.io/blog/exploring-the-differences-between-genezio-and-express.js"
meta_og_image: "https://genez.io/images/genezio_express.png"
# meta data end
---

<!-----

You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 1

Conversion time: 1.064 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Thu May 04 2023 07:43:39 GMT-0700 (PDT)
* Source doc: Exploring the Differences Between genezio and Express.js
* Tables are currently converted to HTML tables.
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


APIs are one of the most important tools in software technology and are used for building modern and reliable software products. There are many ways of developing and exposing an API. Over time, frameworks were built, and doing this became much easier and user-friendlier. Today we will compare [genezio](http://genez.io) with one of the major players in the market, Express. Let’s get started!

Express is one of the most popular frameworks used for backend programming. Developed on top of Node, it provides a robust set of features for building RESTful APIs. It allows developers to set common web application settings and add additional “middleware” at any point in the request handling pipeline. It is easy to use, well maintained, and a great choice for building almost any kind of web application.

[genezio](http://genez.io) is a platform for developing serverless APIs. Compared with Express, or any other backend framework, it isn’t just a set of rules for writing server-side code, it is also a deployment mechanism for those who want to obtain performant and cost efficient serverless environments for their projects.

This may sound a bit complicated, so let’s break down this comparison using some sample code. We will take a look at:



* Writing code
* Testing the code
* Calling the API from your client
* Deployment

**Writing the Code**

Using Express.js, you will have to open an HTTP server, set up an endpoint for each operation, gather data from the request, execute the logic and send back a response to the client. You will need a separate package for parsing the request body with ease (`npm install body-parser`), but apart from that, each of those functionalities is provided by Express with just a few lines of code, making it easy to use and fast to get started after you become familiar with the basics.

Let’s write a simple app with a GET request and a POST request. The GET request will greet us with “Hello World!”, while the POST request will read a name from the request body and send back a greeting to that name.


```javascript
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false  }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/", (req, res) => {
  const { name } = req.body
  res.send("Hello, " + name + "!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```


Writing the same logic in genezio would look something like this:


```javascript
export class HelloWorld {
  greet() {
    return "Hello World!";
  }

  greetName(name) {
    return "Hello, " + name + "!";
  }
}
```


Notice how the code sample is smaller and easier to read. The logic itself is unchanged, but we do not have to worry about setting up the server, parsing data or dealing with request/response objects.


A genezio project is structured with classes and functions, rather than routes and endpoints, making it easy to maintain.

**Testing the Code**

We worked very hard on our masterpiece project and we want to make sure that it is working properly before using the functionalities in our client application. Both tools offer the possibility of running a local server for testing web applications.

The most common way of testing an Express application is by using an HTTP client such as [Postman](https://www.postman.com). You pass your endpoint, select the request type (GET, POST, PUT, DELETE, etc), send the request and receive the response.

genezio comes with a custom tool for testing your projects locally, as well as after they are deployed. The interface is aware of your project’s structure and autocompletes your testing environment with the corresponding function and parameter names. You don’t have to manually add your endpoints, just select the function you want to test, input the parameters and click SEND.



![test interface](/posts/test_interface.webp "image_tooltip")


**Accessing Your API**

Using an Express API is the same as using any RESTful API. The client has to make an HTTP request, making sure to add the correct headers, body, query params and request type. Let’s use JavaScript to call our POST endpoint defined earlier.


```javascript
const axios = require('axios');
let data = JSON.stringify({
  "name": "John"
});

let config = {
  method: 'post',
  url: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
  .then((response) => { console.log(JSON.stringify(response.data)) })
  .catch((error) => {  console.log(error) });
```


With[ genezio](http://genez.io), you will access your functions using the autogenerated SDK provided when you deployed your project or ran it locally. The SDK contains the custom types (enums, classes, unions) you defined in your server code in order to provide a type-safe API. It also takes care of serializing and deserializing your data. You can import this SDK in your client-side project and call the functions just as if they were local functions.[ genezio](http://genez.io) takes care of accessing the server and providing you the response.


For our 2 little functions, the generated SDK in JavaScript will look something like this:


```javascript
/**
* This is an auto generated code. This code should not be modified since the file can be overwritten
* if new genezio commands are executed.
*/

import { Remote } from "./remote.js"

export class HelloWorld {
 static remote = new Remote("http://127.0.0.1:8083/HelloWorld")

 static async greet() {
   return HelloWorld.remote.call("HelloWorld.greet")
 }

 static async greetName(name) {
   return HelloWorld.remote.call("HelloWorld.greetName", name)
 }

}
```


The Remote object from the `remote.js` file referenced at the beginning (also autogenerated in the SDK) will take care of calling your remote functions using the [JSON-RPC](https://www.jsonrpc.org/specification) protocol (_stay tuned for a future article about JSON-RPC and HTTP_), as opposed to plain HTTP used by the Express application. All you have to do is import this class in your client and call the methods. Calling the equivalent function of the POST request we just made should look like this:


```javascript
import { HelloWorld } from "./sdk/hello.sdk.js"

console.log(HelloWorld.greetName("John"));
```


A downside you may observe here is that the client application must be written in the same programming language as the generated SDK. Currently genezio supports JavaScript, TypeScript and Dart for backend programming, and JavaScript, TypeScript, Swift, Python and Dart for generating SDK. You can use any combination of these supported programming languages. Even though it may not have the complete language independence of HTTP, as time passes and genezio releases support for multiple programming languages, this barrier fades away.

**Deploying the Code**

With Express being just a backend framework, the deployment of your beautiful application stands on your shoulders. This can be a good thing if you have DevOps knowledge and want to be in control of everything, but it can also be a burden if you just want to get your code up and running without dealing with choosing providers, server specifications or autoscaling. Luckily there are a ton of third party tools that make this process a bit easier.

With[ genezio](http://genez.io), you are one command away from deploying your project to a serverless cloud. Type `genezio deploy` and we will automatically optimize your code and deploy each class on a separate, scalable and independently manageable cloud environment.

You can use your personal dashboard in [The genezio WebApp](https://app.genez.io/) to see all your projects, inspect logs, disable or activate individual classes, as well as test your deployed projects.

**Conclusions**

There are many key takeaways from this comparison. Express remains one of the best tools for building RESTful APIs, but if you are looking for a tool that automates a big part of your workflow and lets you focus on the logic of the code, then genezio might be a good fit for you.

Advantages of Express:



* multitude of existing projects and examples
* you can deploy your code anywhere you want
* uses widely spread RESTful APIs

Advantages of[ genezio](http://genez.io):



* you write cleaner and easier to maintain code
* deployment is taken care of
* functions are called seamlessly with the autogenerated SDK
* it uses modern paradigm of serverless deployment
* interactive dashboard for managing and testing projects

I hope you enjoyed reading this article! If you have any questions, don’t hesitate to reach out to us on our [Discord](https://discord.gg/uc9H5YKjXv) server. Happy coding!
