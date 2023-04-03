---
title: Getting Started with genezio
date: 2022-01-19
tags:
  - Tutorials
author: Radu Dumitrescu
linkedIn: https://www.linkedin.com/in/radu-andrei-dumitrescu/
thumbnail: /images/GettingStarted.png
preview: This guide will get you up and running with genezio in less than five minutes
description: This guide will get you up and running with genezio in less than five minutes
---

<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.482 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Fri Jan 20 2023 01:16:36 GMT-0800 (PST)
* Source doc: #1 Getting Started with genezio
* Tables are currently converted to HTML tables.
----->


### Introduction

genezio is a serverless solution for seamlessly building full-stack web and mobile applications in a scalable and cost-efficient way.


### Documentation

Only a small part of genezio’s functionality is discussed in this article.

For a complete developer documentation, please go to the official [genezio Documentation](https://docs.genez.io).


### Support

If you can’t find the answer to some of your questions in this article or in our documentation, we invite you to join our [Discord Community](https://discord.gg/uc9H5YKjXv).


## Let’s Get Started

This guide will get you up and running with genezio in less than five minutes. We’ve already made an application which is ready for you to deploy in the genezio infrastructure.


### Install genezio CLI

First, you need to install genezio on your working machine by running the following command:


```
npm install genezio
```



### Log in to the genezio Cloud


```
genezio login
```


A web browser will open and you will need to create an account using your Google or GitHub account.

![Street Art Image](/posts/genezio_login_google.png)

Figure 1: Screenshot of the genezio Sign In page

After you log in, you will be redirected to a page that will automatically authenticate your CLI application.

A success message will appear on the screen, and you can now return to your terminal.


### Clone the Getting Started Example

Now that you are logged in, let’s make this easy. Clone this GitHub repository to your computer. If you don’t remember how to do this, copy and paste these commands in your terminal:


```
git clone https://github.com/Genez-io/genezio-examples.git
cd ./genezio-examples/javascript/getting-started/backend
```


By running this set of commands, the repository is cloned into a local directory named _genezio-examples, _and then the _getting-started_ project folder for JavaScript is entered.


## Test your application locally

Run the following command to open a local test environment that simulates the same behaviour as the one in the production. 


```
genezio local
```



## Deploy Your First Application

Let’s deploy the application!


```
genezio deploy
```


This command deploys your classes and automatically creates a SDK in the client folder that you can use in the frontend application.

The SDK is basically calling the deployed code using JSON-RPC standard.

You should see the following output:


```
Deploy your project to genezio infrastructure. . .
Your code was deployed and the SDK was successfully generated!
Your project has been deployed and is available at https://app.genez.io/project/<projectId>
```


You can see the logs of the project on your genezio dashboard. Also, from there you can pause or delete the project.


### Success

Now that the backend of the application is deployed, you can run and test the frontend application.


```
cd  ./../frontend
npm install
npm start
```


Congratulations, you’ve now finished your first genezio application!
