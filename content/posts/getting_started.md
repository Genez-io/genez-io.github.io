---
title: Getting Started with genezio
date: 2023-01-19
tags:
  - Tutorials
author: Radu Dumitrescu
linkedIn: https://www.linkedin.com/in/radu-andrei-dumitrescu/
thumbnail: /images/GettingStarted.png
preview: This guide will get you up and running with genezio in less than five minutes
# meta data start
description: "Start building full-stack web and mobile apps with genezio in less than 5 minutes. Follow this tutorial to install the CLI, create your project and deploy it to the genezio Cloud."
meta_og_url: "https://genez.io/blog/getting-started-with-genezio"
meta_og_image: "https://genez.io/images/GettingStarted.png"
# meta data end
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

Genezio is a serverless solution for seamlessly building full-stack web and mobile applications in a scalable and cost-efficient way.

### Documentation

Only a small part of genezio’s functionality is discussed in this article.

For complete developer documentation, please go to our {{< external-link link="https://docs.genez.io" >}}Official Documentation.{{< /external-link >}}


### Support

We invite you to join our community on {{< external-link link="https://discord.gg/uc9H5YKjXv" >}}Discord{{< /external-link >}}
 for further information and help.

## Let’s Get Started

This guide will get you up and running with genezio in less than five minutes. We’ve already made an application which is ready for you to deploy in the genezio infrastructure.

### Install genezio CLI

First, you need to install genezio on your working machine by running the following command:

```
npm install genezio -g
```

### Log in to the genezio Cloud

```
genezio login
```

A web browser will open and you will need to create an account using your Google or GitHub account.

![Street Art Image](/posts/genezio_login_google.png)

##### Figure 1: Screenshot of the genezio Sign In page

After you log in, you will be redirected to a page that will automatically authenticate your CLI application.

A success message will appear on the screen, and you can now return to your terminal.

### Clone the Getting Started Example

Now that you are logged in, let’s make this easy. Clone this GitHub repository to your computer. If you don’t remember how to do this, copy and paste these commands in your terminal:

```
git clone https://github.com/Genez-io/genezio-getting-started-typescript.git
cd ./genezio-getting-started-typescript
```

By running this set of commands, the repository is cloned into a local directory named `genezio-getting-started-typescript`, and then going to that project.

## Test your application locally

Run the following command to open a local test environment that simulates the same behavior as the one in the production.

```
genezio local
```

## Deploy Your First Application

Let’s deploy the application!

```
genezio deploy
```

This command deploys your backend classes and automatically creates an SDK in the client folder that you can use in the frontend application. It also deploys the frontend application to the genezio’s CDN and gives you a subdomain for your application.

The SDK is basically calling the deployed code using JSON-RPC standard.

You should see the following output:

```
Deploy your project to genezio infrastructure. . .
Your code was deployed and the SDK was successfully generated!
Your project has been deployed and is available at https://app.genez.io/project/<projectId>

Frontend successfully deployed at https://<random-subdomain>.dev.app.genez.io.
```

You can see the logs of the project on your genezio dashboard. Also, from there you can pause or delete the project.

### Success

Now that the full-stack application is deployed, you can test it directly on the provided link or by using our testing tool from the dashboard.

Congratulations, you’ve now finished your first genezio application!

### Useful Links

- {{< external-link link="https://docs.genez.io/genezio-documentation/" >}}Genezio Documentation{{< /external-link >}}

- {{< external-link link="https://github.com/genez-io/genezio-examples" >}}Genezio Examples{{< /external-link >}}

- {{< external-link link="https://discord.com/invite/uc9H5YKjXv" >}}Join Discord Community{{< /external-link >}}

