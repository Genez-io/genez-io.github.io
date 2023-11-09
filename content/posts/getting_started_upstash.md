---
title: "Getting Started with Upstash Redis and Genezio"
date: 2023-11-20
tags:
  - News, Tutorials
author: Andreia Ocanoaia
linkedIn: https://www.linkedin.com/in/andreia-irina-ocanoaia/
thumbnail: /images/todo.svg
preview: Learn how to integrate an Upstash Redis database into your project
description: "In this short guide, you will learn how to integrate a Redis database into your project. Upstash Redis simplifies data storage and access, making it a natural fit for serverless web applications and cloud-native architectures.
"
meta_og_url: ""
meta_og_image: ""
---

# Getting Started with Upstash Redis and Genezio

In this short guide, you will learn how to integrate a Redis database into your project.
Upstash Redis simplifies data storage and access, making it a natural fit for serverless web applications and cloud-native architectures.

Redis is a powerful database that serves as a highly performant solution for various use cases.
Its key-value store functionality allows for rapid data access, making it ideal for caching frequently accessed data and improving overall application performance.
Redis also supports complex data structures such as lists, sets, and hashes, providing versatility in data modeling.


## Step 1: Create a new genezio project
If you already have a genezio project deployed, you can skip to [Step 2: Initialize an Upstash Redis database](#step-2-initialize-an-upstash-redis-database).

Otherwise, you can create a new genezio project by running the following the next steps.

First, you have to install `genezio` from npmjs:

```bash
npm install genezio -g
```

Then, you can create a new genezio project by simply running `genezio` in your terminal:

```bash
genezio
```

The `genezio` command will walk you through the process of creating a new genezio project.
Your terminal should similar to the following snippets:

```
$ genezio
Redirecting to browser to complete authentication...

? Choose a template for your genezio project Backend-Only
Your project will start from the Backend-Only template.

? Please enter a name for your project: getting-started-with-upstash
Your project will be named getting-started-with-upstash.

? Choose a region for your project US East (N. Virginia)
Your project will be deployed in US East (N. Virginia).

? Please enter a name for your directory: getting-started-with-upstash
We are creating the project in ./getting-started-with-upstash.
```

After the deployment is complete, you should see the following message in your terminal:

```bash
Your backend project has been deployed and is available at https://app.genez.io/project/<project-id>/<environment-id>
```

Navigate the link in your terminal to open your project page in the genezio dashboard.

## Step 2: Initialize an Upstash Redis database

Go to the `Integrations` tab and select to install the Upstash Redis integration:

![Alt text](/images/blog/getting_started_upstash_images/image-3.png)

Connect with an Upstash account using the preferred login method:

![Alt text](/images/blog/getting_started_upstash_images/image.png)

Create a Redis database or select an already existing database:

![Alt text](/images/blog/getting_started_upstash_images/image-1.png)

Hit the `Save` button to set the database credentials as environment variables in your genezio project:

![Alt text](/images/blog/getting_started_upstash_images/image-2.png)

## Step 3: Connect your backend to the Redis database

To connect to the Redis database from your NodeJs backend, create a new file called `redis.ts` in the root folder of your project.

The following code snippet creates a new class that will be a minimal Redis service. In the constructor, we initialize the Redis client using the `UPSTASH_REDIS_URL` environment variable. This variable is already set remotely in your project by the Upstash Redis integration.

```ts
import { GenezioDeploy } from "@genezio/types";
import Redis from "ioredis"

@GenezioDeploy()
export class RedisService{
  client: Redis;
  constructor() {
    if (!process.env.UPSTASH_REDIS_URL) {
      throw new Error("UPSTASH_REDIS_URL is not set in the `.env` file.")
    }
    this.client = new Redis(process.env.UPSTASH_REDIS_URL);
  }
}
```

## Step 4: Store and retrieve data from Redis

Implement two methods to store and retrieve <key,value> pairs in the Redis database:

```ts
@GenezioDeploy()
export class RedisService{
  client: Redis;
  constructor() {
    if (!process.env.UPSTASH_REDIS_URL) {
      throw new Error("UPSTASH_REDIS_URL is not set in the `.env` file.")
    }
    this.client = new Redis(process.env.UPSTASH_REDIS_URL);
  }

  insert(key: string, value: string) {
    return this.client.set(key, value);
  }

  get(key: string) {
    return this.client.get(key);
  }
}
```

## Step 5: Test your Redis service

To locally test your Redis service, you have to copy the environment variables in a `.env` file in the root folder of your project.

You can find the environment variables in the `Integrations` tab of your project page in the {{< external-link link="https://app.genez.io" >}}dashboard{{< /external-link >}}.

The `.env` file should look similar to the following snippet:

```
UPSTASH_REDIS_URL="redis://default:d7dc1b532e3947y372jbh78y159ls
7fa1e@cute-capybara-33897.upstash.io:33897"
UPSTASH_REDIS_REST_URL="https://cute-capybara-33897.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AYRpACQgMzAwYGfdklNGMtMzM4MS00MGJlLWEyYWUtYmEzZDgyZTkxMTFlZDdkdsaNTMyZTM5NDdjdsuhrMzkzZGQzMTU5N2ZhMWU="
```

After setting the environment variables, you can test your Redis service by running the following command in your terminal:

```bash
genezio local
```

Open the testing page in your browser by navigating to {{< external-link link="https://app.genez.io/test-interface/local?port=8083" >}}`https://app.genez.io/test-interface/local?port=8083`{{< /external-link >}}.

Here you can create and send request to your backend to test if it works as expected.

## Step 5: Deploy your application

After you tested your application, you can deploy it by running the following command in your terminal:

```bash
genezio deploy
```

## Conclusion

Congratulations! You have successfully deployed a Redis database in your genezio project.

To learn more about how to use Redis in production-ready applications, check out TODO.
