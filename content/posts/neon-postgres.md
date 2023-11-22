---
title: "Now Available: Neon Postgres"
date: 2023-11-22
tags:
  - News
  - Tutorials
author: Virgil Turcu
# TODO:
linkedIn: https://www.linkedin.com/in/virgil-turcu-797172255/
thumbnail: /images/genezio_neon.webp
preview: Neon provides serverless Postgres databases that offer a generous free tier as well as other features such as autoscaling, bottomless storage, and branching.
# meta data start
description: "Learn how to create a simple genezio app and integrate it with a Postgres database using Neon."
meta_og_url: "https://genez.io/blog/now-available-neon-postgres"
meta_og_image: "https://genez.io/genezio_neon.webp"
# meta data end
---

Neon provides serverless Postgres databases that offer a generous free tier as well as other features such as autoscaling, bottomless storage, and branching. As such, Neon is an excellent choice as a database provider for serverless applications.

We are happy to announce that genezio now has full support for integrating with Neon Postgres. The integration allows you to easily create a Postgres database which you can manage directly from your genezio dashboard.

# Achieving more with Neon and genezio

Among the many features unlocked by this integration, Neon Postgres allows you to:

- Branch your data for production, development, testing, and other purposes. This enables you to efficiently change between different environments as well as setting up continuous integration and delivery pipelines.
- Integrate with GitHub actions so that your database can stay up to date to any environment you are using. Genezio also supports staging environments so that you may fully utilize the branching feature provided by Neon.
- Use vector databases using the `pgvector` extension. You can find a ChatBot application that uses this concept {{< external-link link="https://github.com/neondatabase/ask-neon" >}}here{{< /external-link >}}.

- Neon Pro Plan users also have access to autoscaling.

All these features are optimized for applications which are based on a serverless infrastructure. As such, genezio’s serverless deployment is well suited for working with any Neon Postgres database.

# Connect your backend to Neon Postgres

In this tutorial you will learn how to create a simple genezio project and integrate it with a Postgres database using Neon.

## Prerequisites

You need to have nodejs and npm installed. If you need any help with the installation, you can head over to their {{< external-link link="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" >}}documentation{{< /external-link >}} for more information.

## Step 1: Create a new genezio project

If you already have a genezio project deployed and you just want to integrate Neon with it, you can skip to step 2: Initialize a Neon Postgres database.

Install genezio by running the following command in your terminal:

`npm install genezio -g`

After that, you can initialize a brand new project by running `genezio` in your preferred directory:

`genezio`

This command will guide you through all the necessary steps to initialize and deploy your genezio project. After you successfully ran the command, your terminal should look something like this:

```

Redirecting to browser to complete authentication...
Loading...✅
? Choose a template for your genezio project Backend-Only
Your project will start from the Backend-Only template.
? Please enter a name for your project: getting-started-with-neon
Your project will be named getting-started-with-neon.
? Choose a region for your project US East (Ohio)
Your project will be deployed in US East (Ohio).
? Please enter a name for your directory: getting-started-with-neon
We are creating the project in ./getting-started-with-neon.
Creating the project...✅

Deploying your project...

Bundling your code...✅
Checking your credentials...✅
Changing the plumbing of the pipeline...✅
Doing the final touch-ups...✅

Deploying your backend project to the genezio infrastructure...
Your code was deployed and the SDK was successfully generated!

To install the SDK in your client,
run this command in your client's root:
npm install @genezio-sdk/getting-started-with-neon_us-east-2@1.0.0-prod

Then import your classes like this:
import { HelloWorldService } from
"@genezio-sdk/getting-started-with-neon_us-east-2"

After deployment is complete, you should be able to access your project by following the link provided by the terminal in the following message:

Your backend project has been deployed and is available at https://app.genez.io/project/<project-id>

Navigate to the link to open your genezio dashboard and manage your project.

```

## Step 2: Initialize a Neon Postgres database

The next step is to integrate this small project with a Postgres database provided by Neon. To do that, open your genezio dashboard at {{< external-link link="https://app.genez.io/dashboard" >}}dashboard{{< /external-link >}} and pick the project you created earlier. In the _Integrations_ tab you can select to install the Neon Postgres integration:

![alt_text](/posts/neon1.png)

Connect with a Neon account, or if you don’t have one, create a new one by going to the Neon website:

![alt_text](/posts/neon2.png)

Create a new Neon Project called getting-started-neon or select an existing one:

![alt_text](/posts/neon3.png)

Next, choose the project details:

![alt_text](/posts/neon4.png)

Finally, save the environment variable to your project so that you may use it when you want to connect to your database:

![alt_text](/posts/neon5.png)

With all that done, your project is fully integrated with a free tier Neon Postgres database.

## Step 3: Connect your backend to the Postgres database

Next, you will implement a simple Postgres service that will allow you to use your newly integrated database.

Create a new `postgres.ts` file in the root of your project. This file will contain a class that will have a constructor which will connect to your database using the `NEON_POSTGRES_URL` environment variable. This variable has already been set in your production environment so you don’t need a `.env` file when testing your deployed project from the genezio dashboard.

In the root of your project, run the following command:

```
npm install pg @types/pg @genezio/types
```

This package will allow you to use the `pg` module so that you can connect to your database from the NodeJs backend.

In the `postgres.ts` file, add the following code snippet:

```javascript
import { GenezioDeploy } from "@genezio/types";
import pg from "pg";
const { Pool } = pg;

@GenezioDeploy()
export class PostgresService {
  pool = new Pool({
    connectionString: process.env.NEON_POSTGRES_URL,
    ssl: true,
  });

  async insertUser(name: string): Promise<string> {
    await this.pool.query(
      "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY,name VARCHAR(255))"
    );

    await this.pool.query("INSERT INTO users (name) VALUES ($1)", [name]);
    const result = await this.pool.query("select * from users");

    return JSON.stringify(result.rows);
  }
}
```

With all that done, you now have a single method for inserting a user into a table and then retrieving all the users.

## Step 4: Test your Postgres service

To locally test your Postgres service, you have to copy the environment variable `NEON_POSTGRES_URL` in a `.env` file in the root directory of your project. You can find this variable in the `Integrations` tab of your project page in the {{< external-link link="https://app.genez.io" >}}genezio dashboard{{< /external-link >}}:

![alt_text](/posts/neon6.png)

The `.env` file should look similar to the following snippet:

```
NEON_POSTGRES_URL="postgres://virgil:<your-password>@ep-fragrant-band-27497881.us-east-1.aws.neon.tech/neondb"
```

After setting the environment variable, you can test your Postgres service by running the following command in your terminal:

```
genezio local
```

Open the testing page in your browser by navigating to {{< external-link link="https://app.genez.io/test-interface/local?port=8083" >}}test interface{{< /external-link >}}.

Here you can send requests to your local backend server and receive appropriate responses to check if your service is working properly.

## Step 5: Deploy your application

After testing your application locally, you can deploy it again to update the project by running the following command in the root directory of your project:

```
genezio deploy
```

Now you can test your deployed application by navigating to the genezio {{< external-link link="http://app.genez.io/test-interface" >}}testing interface{{< /external-link >}} in the dashboard.

## Conclusion

Congrats🥳! You successfully deployed a project that is fully integrated with a Neon Postgres database. To see a more flushed out tutorial that uses this integration, check out this article about how to create a full stack CRUD application.
