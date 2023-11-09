<!-- ---
title: Integrate Redis and Postgres plus much more - genezio v0.6
date: 2023-11-09
tags:
  - News
author: Andra Pitis
linkedIn: https://www.linkedin.com/in/andra-pitis/
thumbnail: /images/release0.6.webp
preview: "Since our last release, we've introduced some new features that make it easier to integrate a database, simplify yaml configuration files, and many more. Let's explore the latest updates"
# meta data start
description: "Since our last release, we've introduced some new features that make it easier to integrate a database, simplify yaml configuration files, and many more. Let's explore the latest updates:"
meta_og_url: "https://genez.io/blog/integrate_redis_and_postgres_plus_much_more_genezio_v0.6"
meta_og_image: "https://genez.io/images/release0.6.webp"
# meta data end
---

## Genezio New Release

Since our last release, we've introduced some new features that make it easier to integrate a database, simplify yaml configuration files, and many more. Let's explore the latest updates:

## Redis databases

Introducing the **Upstash integration**! You can now choose to install Upstash and integrate it directly into your projects. Use their serverless Redis databases and messaging platforms to upgrade your genezio project. Connect your Upstash account from the genezio dashboard and use the Redis instance from your code.

```typescript
@GenezioDeploy()
export class RedisService {
  client = new Redis(process.env.UPSTASH_REDIS_URL);

  async insertUser(name: string): Promise<string> {
    await this.client.set("user", name);
    const result = await this.client.get("user");
    return JSON.stringify(result);
  }
}
```

## Postgres databases

Presenting the **Neon integration**! Now, you have the option to install Neon and provision Postgres databases easily. Use their modern developer features such as autoscaling, branching, and bottomless storage with your genezio project. Connect your Neon account from the genezio dashboard, spawn a new Postgres database, and start using it.

```typescript
@GenezioDeploy()
export class PostgresService {
  pool = new Pool({
    connectionString: process.env.NEON_POSTGRES_URL,
    ssl: true,
  });

  async getUser(name: string): Promise<string> {
    const result = await this.pool.query(`select * from users where name = ${name}`);

    return result.rows;
  }
}
```

## SDK as an NPM package

The SDK is now generated as an NPM package, which is published to your private registry hosted on genezio. This feature addresses several issues:

It eliminates compatibility problems between the generated code and the rest of the application, as the SDK is compatible with both ESM and CommonJS codebases.

It allows for the use of the SDK across multiple applications.

It provides the flexibility to use older versions of the SDK as necessary.

## Monorepo or multirepo?

Both monorepo and multirepo approaches are valid. Genezio now supports both, allowing you to choose based on your project's requirements!\
A monorepo enables you to maintain your full stack application in a single repository. This simplifies developing new features or refactoring, as all changes can be submitted through a single pull request. It streamlines code comprehension, review processes, and the synchronization of backend and frontend components. Moreover, deployment is unified, allowing the entire system to be launched with a single `genezio deploy` command.

On the other hand, a multirepo strategy offers significant benefits when a clear separation between backend and frontend is desired. This is particularly helpful if  your server serves multiple clients, each interacting with a different version of the API. With multirepo, you can deploy server and client applications independently and select the appropriate SDK version for each client.

## Decorators

We hear you: yamls are not fun to use! That’s why now you can mark directly in the code which class you want deployed using decorators.

```typescript
@GenezioDeploy()
export class HelloWorld {
  helloWorld() {
    console.log("Hello world request received!");

    return "Hello world!";
  }

  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  cron() {
    console.log("Hi again!");
  }
}
```

This makes it clearer to mark which class you want to deploy and helps make your code easier to read and maintain. Plus, this new feature won't mess with your existing setup—it's backward compatible.

## Project Environments

Start deploying multiple **environments per project**. You can now spin up multiple environments per project - from dev env to alpha, beta up to production. Collaborate with other developers and testers and streamline your development process!

## Start a new project with one command

Create your project faster than ever with the new **genezio command**! With the help of this command, you will be taken directly to a deployed project. Just choose the templates from your terminal after running the command and get started.

## What’s next?

At genezio we aim to offer our users the best experience with our product, while saving precious time and money. Stay tuned and join our {{< external-link link="https://discord.gg/uc9H5YKjXv" >}}Discord community{{< /external-link >}} to be the first to hear about new features. If you need any help or advice, write a message on Discord or send us an email at <contact@genez.io>. -->
