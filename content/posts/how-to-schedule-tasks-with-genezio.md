---
title: How to schedule tasks with genezio
date: 2023-12-12
tags:
  - Tutorials
author: Radu Dumitrescu
linkedIn: https://www.linkedin.com/in/radu-andrei-dumitrescu/
thumbnail: /images/scheduletasks.webp
preview: This guide will walk you through the steps of building a scheduler with genezio.
# meta data start
description: "Schedulers are automated systems designed to carry out tasks at set intervals or specific times."
meta_og_url: "https://genez.io/blog/how-to-schedule-tasks-with-genezio"
meta_og_image: "https://genez.io/images/scheduletasks.webp"
# meta data end
---

##

This guide will walk you through the steps of building a scheduler with genezio. Schedulers are automated systems designed to carry out tasks at set intervals or specific times. They play a crucial role in various applications and automation. Use cases include sending emails, conducting routine database cleanup and database backup, or undertaking data analysis and reporting activities.

Genezio makes things easier for you, so you don’t need any additional npm library like node-cron.

## Content

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Setting up your Scheduler](#setting-up-your-scheduler)
4. [Test your Scheduler](#test-your-scheduler)
5. [Deploy your Scheduler](#deploy-your-scheduler)
6. [Create more complex schedules](#create-more-complex-schedulers)
7. [Do’s and Don’ts Tips](#do’s-and-don’ts-tips)
8. [Conclusion](#conclusion)

## Prerequisites

If you don’t already have them, you’ll need to install the following tools:

- {{< external-link link="https://nodejs.org/en/download/current" >}}Node.js{{< /external-link >}}
- {{< external-link link="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" >}}Npm{{< /external-link >}}

**Note:** I recommend you use {{< external-link link="https://github.com/nvm-sh/nvm#installing-and-updating" >}}nvm{{< /external-link >}} to manage NodeJs and npm versions. After installing `nvm`, you can easily get any node version by running `nvm install &lt;node_version>`.

## Getting Started

First, you’ll need to create a new project.

To get started with a template, install `genezio` using `npm` and run it in your terminal. Later on, genezio comes in handy to deploy and host your web applications in the cloud.

```
npm install -g genezio
```

After installing `genezio`, you can create a new Genezio Node.js project by running the following command in an empty new folder:

```
genezio
```

The command above will get you through a series of questions to help you customize and prepare your project for production deployment.

Your terminal should look similar to the following output:

```
~ genezio
Redirecting to the browser to complete authentication...

? Choose a template for your genezio project Backend-Only
Your project will start from the Backend-Only template.

? Please enter a name for your project: my-online-store
Your project will be named scheduler-app.

? Choose a region for your project US East (N. Virginia)
Your project will be deployed in US East (N. Virginia).

We are creating the project in the current directory.

Deploying your backend project to genezio infrastructure...

Your backend project has been deployed and is available at https://app.genez.io/project/<id>/<id>
```

This command will execute npm init (create package.json file) and install the only dependency we need for scheduled cron jobs(`@genezio/types`).

## Setting up your Scheduler

Next, you need to create a new class using the following command:

```
<<<<<<< HEAD
genezio addClass Scheduler.ts
=======
genezio addClass Sheduler.ts
>>>>>>> 3a1467c5cfa9e3c85c70aba92cc4bafd087fe0b3
```

This command will create a new typescript class file named `Scheduler.ts`.

Open this newly created file in your preferred IDE and add the following code:

```javascript
import { GenezioDeploy, GenezioMethod } from "@genezio/types";

/**
 * This class can be deployed on genezio infrastructure
 * using the "genezio deploy" command or tested locally using "genezio local".
 */
@GenezioDeploy()
<<<<<<< HEAD
export class Scheduler {
=======
export class Sheduler {
>>>>>>> 3a1467c5cfa9e3c85c70aba92cc4bafd087fe0b3
  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  public async everyMinuteTask() {
    const output = "Every minute task executed at " + new Date().toISOString();
    console.log(output);
  }
}
```

In this example, we're creating a task function that will execute every minute, logging the current time to the console. The `everyMinuteTask` function doesn’t need any parameter, but it is used with the decorator `@GenezioMethod({ type: "cron", cronString: "* * * * *" })` with a cron-style schedule string.

The schedule string follows the format `* * * * *`, representing minutes, hours, days of the month, months, and days of the week, respectively. An asterisk means “**every interval**”.

**Note 1:** I recommend using {{< external-link link="https://crontab.guru/" >}}Crontab Guru{{< /external-link >}} to generate and check your cron syntax.

**Note 2:** You can also use JavaScript for your code. Just change the extension of your file to `js`.

**Note 3:** The crontab syntax is agnostic of the operating system.

## Test your Scheduler

With genezio you can test your scheduler locally by running a genezio local server with the following command:

```
genezio local
```

The task will run every minute and will print the output in the console of your local genezio web server.

## Deploy your Scheduler

Next, the application is ready to be deployed to the cloud to be used in a production environment. To deploy your application, run the following command in the root directory of your project:

```
genezio deploy
```

This will deploy the whole project to the cloud and make it run the task every minute. You can continue to manage, test, update and monitor your project from the genezio dashboard.

<<<<<<< HEAD
**Note 1:** You can deploy your scheduler together with your API Node.js application.

**Note 2:** Your scheduler will be deployed in a Linux environment.
=======
**Note 1: **You can deploy your scheduler together with your API Node.js application.

**Note 2: **Your scheduler will be deployed in a Linux environment.
>>>>>>> 3a1467c5cfa9e3c85c70aba92cc4bafd087fe0b3

## Create more complex schedulers

### Run a task every 10 minutes:

Cron expression: `*/10 * * * *`

```javascript
@GenezioMethod({ type: "cron", cronString: "*/10 * * * *" })
public async every10MinuteTask() {
  const output = "Every 10 minutes " + new Date().toISOString();
  console.log(output);
}
```

### Run a task every day at 8 AM:

Cron expression: `0 8 * * *`

```javascript
@GenezioMethod({ type: "cron", cronString: "0 8 * * *" })
public async everyDay8AMTask() {
  const output = "Every day at 8 AM" + new Date().toISOString();
  console.log(output);
}
```

## Do’s and Don’ts Tips

### Do’s:

1. **Schedule carefully**: Plan your cron schedule jobs carefully, considering factors like resource usage, the frequency of the task, server timezone and even the 29th of February.
2. **Monitor and log:** Set up monitoring and logging for your cron jobs to receive notifications of any errors or unexpected behavior.
3. **Use a clear and descriptive comment:** Include a comment at the beginning of your cron job to describe its purpose. This makes it easier for you and others to understand what the cron job does.
4. **Keep it simple:** Keep your cron jobs as simple as possible. If a task becomes too complex for a cron job, consider breaking it down into smaller scripts.

### Don’ts:

1. **Overload your system:** Avoid scheduling too many cron jobs that run simultaneously or at high frequencies, this can lead to race conditions on your data.
2. **Forget to test and validate:** Never add a cron job without testing it thoroughly first. Errors in cron jobs can disrupt system operations. Another point of failure can be the server timezone and unix timestamp.
3. **Ignore error handling:** Don't neglect error handling in your cron jobs. Always include proper error-checking mechanisms and consider sending notifications when errors occur.
4. **Hardcode sensitive data:** Avoid hardcoding sensitive information like passwords directly in your scripts. Instead, use
   {{< external-link link="https://docs.genez.io/genezio-documentation/project-structure/backend-envinronment-variables" >}}environment variables.{{< /external-link >}}
5. **Use JavaScript:** Avoid using JavaScript because it can lead to runtime errors. Use TypeScript instead to fix as many type errors as possible.

## Conclusion

In conclusion, scheduling tasks with Node.js and Genezio is a powerful and flexible solution for automating various processes in your applications. With the ability to create and manage complex schedules using cron expressions, you can ensure that your scheduled tasks run precisely when needed. However, it's essential to follow best practices, such as careful scheduling, monitoring, and error handling, to maintain the reliability and efficiency of your scheduled tasks. After this tutorial, you can harness the full potential of Genezio to streamline your workflow and enhance automation in your projects.

I hope you enjoyed this tutorial and I encourage you to check out our other {{< external-link link="https://genez.io/blog" >}}tutorials{{< /external-link >}} for more tips and tricks on improving your software engineering skills. 🥷 💻

Also, I invite you to check your examples from {{< external-link link="https://github.com/Genez-io/genezio-examples/tree/master/javascript/cron" >}}GitHub{{< /external-link >}}.

Start leveraging the power of Genezio for efficient task scheduling in your applications.
