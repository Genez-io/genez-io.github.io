---
title: "Database in Serverless World Comparison"
date: 2023-07-20
tags:
  - Comparison
author: Bogdan Vlad
linkedIn: https://www.linkedin.com/in/iulian-bogdan-vlad/
thumbnail: /images/database-performance.webp
preview: Deciding on the right database is often a challenging task when starting a new project.
# meta data start
description: "Decide on the right database for your project based on this analysis of their performance in a Function as a Service serverless environment."
meta_og_url: "https://genez.io/blog/database_in_serverless_world_comparison"
meta_og_image: "https://genez.io/images/database-performance.webp"
# meta data end
# svg = “xyz”
---

## Unveiling Database Performance: Selecting the Right Solution for Your Serverless Application

## Introduction

Deciding on the right database is often a challenging task when starting a new project. If you plan to deploy your server on a function as a service infrastructure, the decision is even more important because it will have a huge impact on how fast your server will respond to queries.

## In a nutshell

In this article, I performed a quite deep analysis of how different databases are performing in a Function as a Service environment, but if you just want the short version, here it is:

- You should host the database as close as possible to where the serverless functions are executed.
- **MongoDB** is extremely fast once the connection to the database is established, but it might be slow during the cold start.
- **Firestore** is very slow during the cold start!
- **DynamoDB** performs quite well both during cold start and when the function is warm.
- You might start having problems if you start scaling to hundreds of functions depending on what database technology you choose. **Zombie connections** can be scary!

If you want to know how I reached these results and to delve deeper into even more insights, grab your favorite drink and let’s continue!

## Why is choosing the right DB so important?

The Function as a Service (FaaS) architectures represent a paradigm shift in the manner we conceptualize, develop, and deploy servers. Traditional servers are long-standing processes that frequently maintain a persistent connection with a database for executing queries. This isn’t the case with FaaS. Each instance of a function is a short living process and multiple such instances can coexist concurrently. This means that:

- You could have many open connections to your database.
- If a request is received and a function process needs to be started (this is called a ‘cold start’), the response time will also encompass the duration required to connect to the database.

You have to make sure that as your prototype becomes popular, the database doesn’t become the bottleneck, swamped by a surge of connections. Moreover, it’s important to keep the connection time optimized, as excessive durations can negatively affect the overall response time.

## Experiments and results

### Performance tests

I’ve picked the following databases since these are the NoSQL options that I've seen most frequently used in FaaS architecture.

- **DynamoDB:** an AWS based NoSQL database. You can obtain one from your AWS account. Amazon DynamoDB pricing is based on provisioned throughput, storage, data transfer, and additional features like backups, restore, and streams.
- **MongoDB:** a popular NoSQL database used to store unstructured data. MongoDB can easily be hosted on the MongoDB Atlas Cloud Platform. They offer different pricing plans: a pay as you go serverless pricing tier, a dedicated server solution for production applications and also a free tier. For this test, I’ve used an M30 database. If you think about going with the serverless pricing tier, pay attention to the fact that you can’t have more than 500 concurrent connections which is quite low if you plan to use it in a FaaS.
- **Atlas MongoDB Data API:** this is using the same MongoDB, the distinction lies in the connection protocol. Rather than using the MongoDB Wire Protocol, it employs a HTTP-based API. This is useful if managing a connection pool is not feasible or if a MongoDB driver isn't compatible with your client application. This feature could be especially beneficial in a FaaS system as it eliminates the need to establish a database connection during the 'cold start' phase.
- **Firestore:** serverless NoSQL database provided by Google that is part of the Firebase app development platform.

I wanted to see how these databases worked in a FaaS setup. My goal? To answer these key question:

- How long does it take to initialize the connection(s)?
- How many connections can the database hold?
- If you increase the number of active connections, does it have an impact on the performance?
- Does running multiple queries in parallel affect the performance?

For each database, I did two tests: one simulating a 'cold start' scenario with an AWS Lambda function, and another where the AWS Lambda function was already 'warm’. This was important even for databases utilizing an HTTPS API, as they might still experience a 'cold start' during the first request. Before the query bytes are transmitted over the network, multiple steps need to occur including DNS lookup, TCP connection establishment, and TLS handshake. Because of multiple cache layers for these operations, later requests might be quicker.

I used [genezio](https://genez.io/) to execute these tests. I’ve used the self hosted feature of genezio which allows me to deploy the backend on AWS Lambdas belonging to my own AWS account. To understand more about what genezio does, you can read more [here](https://github.com/vladiulianbogdan/database-benchmarking). I designed a separate class for each database experiment. You can find the code [here](https://github.com/Genez-io/database-benchmarking).

The database structure is the same for all databases: I have a \`Task\` table (or collection) and I insert 10000 entries. The query that I perform doesn’t use any filtering and retrieves 10 tasks.

Once I'd completed the code, I deployed the necessary AWS resources to my account by typing 'genezio deploy' into the terminal. This action created an AWS Lambda for each class, along with an API Gateway. Following this, I raised the default limits of the AWS Lambdas: I increased the number of reserved concurrent functions and extended the timeout to 30 seconds. The genezio application and the database are both hosted in the eu-central-1 region. If you want the fastest query time possible, you need to have the database as close as possible to where you hosted the application.

With the classes successfully deployed on AWS, it's time to invoke them and obtain the measurement results.

As mentioned earlier, my focus was to examine how the database would handle a sudden surge of connections and queries. I made 300 requests with a 100 ms timeout between them which spawned 300 AWS Lambdas. Each Lambda made a query to the database, it slept for 25 seconds (this is needed to be sure that 300 Lambdas are spawned) and then it returned the query time. The reason why I have the 100 ms sleep time between requests is to not put too much pressure on the DBs right from the start. We will do that later on, no worries!

I measured the response time for a query during the 'cold start' phase, as well as the query time for an already warmed-up function. Let’s analyze the results!

{{< svg file="/posts/dbchart1.svg" >}}

Figure 1: Results of the experiment with 300 requests every 100 ms for all databases.

The first thing we notice is the **Firebase** cold time which is quite huge. During the cold start phase, when the function initiates and establishes connections with the Firebase servers, it takes approximately 1200 ms to return a response for a query. However, once the function is already warm, its performance improves significantly, with an average query response time of around 20ms.

The second database with a painful cold start is **MongoDB** which suffers a ~ 300 ms response time during cold start. Nevertheless, after the driver establishes the connections, the queries are extremely fast with times averaging around 4ms.

When using the **Atlas MongoDB Data API**, we observe a notably favorable response time during cold starts compared to the other databases. However, subsequent requests exhibit slower performance compared to a MongoDB instance with an already established connection, averaging around 35ms.

**DynamoDB** performs exceptionally well with a good query time during cold start (~70ms) and an excellent warm query time similar to Mongo DB with connection (~5ms).

Furthermore, I conducted the same set of experiments with the genezio application, which was now hosted in a different region (us-east-1) than the database (eu-central-1). This aspect becomes useful when considering scenarios such as deploying a multi-region application while using a single database.

{{< svg file="/posts/dbchart2.svg" >}}

is hosted in a different region than the database.

We can see that the performance is, of course, worse. This is because our application is further away from the database servers. Notably, the cold start response time for the **MongoDB** instance becomes way worse. This is probably because MongoDB exchanges many messages during the connection establishment and the increased latency adds up resulting in such a painful cold start. For more information check [this](https://github.com/mongodb/specifications/blob/master/source/auth/auth.rst#authentication-handshake) out!

It’s now time to remove the 100 ms interval between requests and be as harsh as possible with our databases to see under which conditions the performance starts to decrease.

### Pushing Database Performance to its Limits

#### Firestore 

I’ve tried to break Firestore but it was quite hard. I’ve eliminated the timeout between requests and I’ve increased the number of AWS Lambda running in parallel to 900.

The results are presented below. The Y value of the X-th percentile means that Y% has smaller values than X. We can see for example that in the initial test (Figure 3), 99,99% of the cold response times are below 1321.01 ms. The next values (Figure 4) show that 99,99% of the cold response times are below 1641.257 ms.

For the warm start, we observe similar results, except there is a noticeably higher response at the 99.99th percentile. This means that it is unusual for queries to take more than 30 milliseconds. Such cases are the exception.

![alt_text](/posts/dbtable1.webp)

Figure 3: Percentile statistics for 300 concurrent requests with 100ms timeout between them.

![alt_text](/posts/dbtable2.webp)

Figure 4: Percentile statistics for 900 concurrent requests with no timeout between them.

#### MongoDB with connection

For MongoDB with an established connection it was way easier to find the point where the performance decreases. I just had to decrease the sleep period between requests to 10ms and even with 100 concurrent requests I saw a decrease in performance.

We can see that the cold start increases from a steady 280-300 ms (Figure 5) to more than 800 ms (Figure 6). The warm query time remains constant. The problem is establishing the connection, but once the connection is successfully established, the time will remain constant.

![alt_text](/posts/dbtable3.webp)

Figure 5: Percentile statistics for MongoDB with wire protocol connections and 300 concurrent requests with 100ms timeout between them.

![alt_text](/posts/dbtable4.webp)

Figure 6: Percentile statistics for MongoDB with wire protocol connections and 100 concurrent requests with 10ms timeout between them.

#### MongoDB Data API

The MongoDB Data API is behaving better during a spike of traffic. I’ve done 900 concurrent requests without any sleep time between the requests.

We see a slight decrease in the performance during the cold start, but nothing substantial. For the warm time responses, the response time is the same. Same as for the Firestore Database, we barely touched the breaking point and we can say with confidence that the MongoDB Data API could handle even more traffic.

![alt_text](/posts/dbtable5.webp)

Figure 7: Percentile statistics for MongoDB Data API with 300 concurrent requests with 100ms timeout between them.

![alt_text](/posts/dbtable6.webp)

Figure 8: Percentile statistics for MongoDB Data API with 900 concurrent requests with no timeout between them.

#### DynamoDB

Lastly, DynamoDB was tested with 900 concurrent requests without any sleep time between the requests.

![alt_text](/posts/dbtable7.webp)

Figure 9: Percentile statistics for DynamoDB with  300 concurrent requests with 100ms timeout between them.

![alt_text](/posts/dbtable8.webp)

Figure 10: Percentile statistics for DynamoDB with 900 concurrent requests with no timeout between them.

The results are very good. We observe a decrease in performance only for a very few queries.

### Zombie connection tests

Databases that maintain persistent connections with the server can be susceptible to a phenomenon commonly known as a ‘zombie connection’. When a function initializes, it establishes a TCP connection with the database server. However, if the function gets terminated by the FaaS system, the TCP connection isn't explicitly closed, leading the database server unaware that the other end of the connection has become unresponsive. It may take some time before this connection gets closed. The concern here is that each open connection consumes RAM, which can potentially slow down the server. Furthermore, in the case of Atlas MongoDB, each instance type has a set maximum number of open connections. This limit could be reached if your application begins to scale, posing additional challenges.

To gauge the severity and reproducibility of this error I ran the following experiment:

1. I set up an M10 MongoDB instance in Atlas MongoDB.
2. I made 300 requests in parallel to spawn 300 AWS Lambdas.
3. I executed the \`genezio deploy\` command to force a redeploy resulting in AWS Lambda terminating all the VMs.

The steps 2 and 3 were repeated five times. Afterwards, I inspected the Atlas MongoDB's monitoring dashboard to observe the impact on the number of active connections. The results can be seen in Figure 11.

![alt_text](/posts/dbchart.webp)

Figure 11: Atlas MongoDB's monitoring dashboard

I started the experiment at 12:30 and at 12:33 I hit the maximum amount of opened connections. In an ideal scenario, connections should vanish after each redeployment, and at no point during the experiment should there be more than 300 connections. We can see that the connections from the perspective of the server were not destroyed when the function’s VMs were destroyed. They kept on growing until it hit the maximum amount of opened connections (1500 connections for the M10 instance). It took almost 10 minutes for Atlas to clear all the zombie connections. This is indeed problematic in a real life application that needs to scale up and down very quickly.

## Conclusion

I’ve conducted the experiments and got some interesting results that I hope you will find helpful. My main takeaway from these experiments are:

- **MongoDB** is blazingly fast once the connection is established, but if there is a flood of incoming requests it will start behaving slower during cold start when your functions start scaling up.
- Be very careful what **Atlas MongoDB** **instance** you are picking: choose one that has enough connections to accommodate also the zombie connections.
- **Firestore** takes a lot of time to initialize the connections.
- **MongoDB Data API** and **DynamoDB** are good options if you don’t want to have any problems with up scaling and you want consistent and decent query response times.
- For the use cases that I’ve tried, **DynamoDB** is the fastest and handles spikes in traffic very well.

I plan to include more databases in the experiments and I will come with follow-ups to this article. The code used for this experiment can be found [here](https://github.com/vladiulianbogdan/database-benchmarking). I am looking forward to hearing what you think. You can contact me at any time at [bogdan@genez.io](mailto:bogdan@genez.io) with any questions, issues or ideas.
