---
title: Rest vs RPC
date: 2023-04-25
tags:
  - Comparison
author: Bogdan Ciobanu
linkedIn: https://www.linkedin.com/in/bogdan-calin-ciobanu-a966b2268/
thumbnail: /images/rest-rpc.webp
preview: REST and RPC are two distinct approaches to web services and distributed computing
# meta data start
description: "Comprehensive comparison of REST and RPC web services. RESTful applications, gRPC, RPC, distributed web services, CRUD interfaces."
meta_og_url: "https://genez.io/blog/create-your-first-app-using-chatgpt"
meta_og_image: "https://genez.io/images/rest-rpc.webp"
# meta data end
---

<!-----

You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 2

Conversion time: 1.217 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Tue Apr 25 2023 08:24:43 GMT-0700 (PDT)
* Source doc: REST vs RPC Article
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


## Summary

REST and RPC are two distinct approaches to web services and distributed computing. REST is focused on resource manipulation and provides a uniform interface for accessing and modifying resources, while RPC is focused on method invocation and provides a way for applications to access remote services and resources. REST is well-suited for web services that require flexibility and scalability, as it provides a uniform stateless interface for accessing and modifying resources. RPC, on the other hand, is well-suited for distributed systems and other scenarios that require efficient communication between applications and is usually stateful. Examples where RPC is preferred over REST include, but are not limited to tightly coupled services, low latency services, and services that require a more customized approach to data serialization.


## Introduction

As you delve deeper into the world of web development, you'll likely encounter the terms "REST" and "RPC." While these terms might seem straightforward, their differences may be subtle and confusing.

Web services are a type of software system that allows different applications to communicate and share data with each other over the internet or other networks. They provide a way for different software systems to interact with each other, regardless of the programming language, operating system, or platform they are built on.

There are different types of web service architectures, including SOAP (Simple Object Access Protocol), REST (Representational State Transfer), and RPC (Remote Procedure Call). The choice of which one to use depends on the requirements of the application or system. In this article we will focus on the latter two, providing an overview of REST and RPC, explaining their fundamental concepts, highlighting their key differences, and discussing how they are used in modern web applications.


## RESTful Services

REST is the most commonly used architectural style for building web services. RESTful web services operate over the HTTP protocol, using HTTP methods such as GET, POST, PUT, and DELETE to perform CRUD (Create, Read, Update, Delete) operations on resources. CRUD represents the basic operations that can be performed on data in a database or other data storage system. These operations are essential for any system that deals with data and are commonly used in web development to describe the actions that can be performed on a resource.

The four CRUD operations are:



1. Create: Add new data to a database or other data storage system. For example, when a user fills out a registration form on a website, the data they submit is added to the database using the Create operation.
2. Read: Retrieve data from a database or other data storage system. For example, when a user logs in to a website, their profile information is retrieved from the database using the Read operation.
3. Update: Modify existing data in a database or other data storage system. For example, when a user updates their profile information on a website, the changes are saved to the database using the Update operation.
4. Delete: Remove data from a database or other data storage system. For example, when a user deletes their account on a website, their profile data can be removed from the database using the Delete operation.

It is worth noting that RESTful interfaces tend to be used even when there is no clear mapping between the HTTP methods and the functionalities of the service. Take for example a music streaming application: The playlist functionalities could be implemented as `get song`, `delete song`, `add song` seamlessly. However, the main features of the application “play, pause, skip” would not have a direct method, and would need to be forcibly implemented using REST methods. In this case, an RPC-based approach would be preferable.



![Street Art Image](/posts/genezio-rest.webp)


The main focus of REST is resource manipulation, as it provides a uniform interface for accessing and modifying resources. A RESTful web service exposes resources through a URI (Uniform Resource Identifier), and the client can manipulate the resource by sending HTTP requests to the server using the URI of the desired resource. An URI is a string of characters that identifies a name or a resource on the internet.

RESTful web services are stateless. A stateless web service is one in which the client's state is not maintained between requests. This means that each request made by the client is treated as an independent transaction, and the server does not store any information about previous requests. This makes RESTful web services highly scalable and flexible, as they do not require any state information to be maintained on the server side.


## RPC-based Services

RPC is a protocol for communicating between applications that are running on different machines. RPC enables one application to execute a procedure or function on another application, and it provides a way for applications to communicate and share resources across a network. The basic idea behind RPC is to make a remote function call on another computer or server, as if it were a local function call. When a client sends an RPC request, it waits for a response from the server, which executes the requested procedure and returns the result. RPC can be used in client-server architectures, where the client sends requests to the server, and the server executes the requested procedure and returns the result.

RPC revolves around method invocation, and it provides a way for applications to access remote services and resources, making it an excellent choice for distributed systems. For example, consider a system that manages inventory for a chain of retail stores. The system may consist of multiple modules or components, such as an inventory management module, a sales module, and a customer module, each of which is located on a separate machine. The inventory management module may expose a set of methods or procedures that allow the sales module to check the availability of products and the customer module to update customer orders. The sales module may expose a set of methods that allow the customer module to retrieve sales data for analysis purposes.


            

![Street Art Image](/posts/genezio-rpc.webp)


By using RPC, the different modules or components can communicate with each other seamlessly, without the need for complex network programming. The client applications simply call the remote methods as if they were local methods, and the RPC framework takes care of the underlying network details, such as marshaling and unmarshaling data, and transmitting data over the network.

Additionally, RPC's flexibility in handling different types of data and operations can make it a good choice for systems that require a more customized approach to data serialization and communication.


## Conclusion

The key difference between REST and RPC is in their approach to data transfer. RESTful web services use a representational approach, meaning that the data is transferred as a resource representation that is independent of the client's state. RPC, on the other hand, uses a procedural approach, meaning that the data is transferred as a method invocation that is dependent on the client's state. This means that RESTful web services are stateless, while RPC services maintain state between requests.


## Using genezio to create an RPC and RESTful web service

Due to the way genezio works behind the scenes, an RPC-based application can be created extremely quickly and easily using genezio.

We’ll now detail how to create the core functionality of a Music Player application: play, pause and skip, using RPCs.

To create an RPC-based web service using genezio, follow these steps:



1. Open a terminal and run `genezio login`. A browser window will be opened in order to log in with your genezio account.
2. Once you have logged in successfully, proceed to create a new directory. Change directory to the newly created directory and execute the command 'genezio init' within it.

    Upon running the 'genezio init' command, you will be prompted to provide some information to create the initial configuration of your project. Once completed, the configuration details will be automatically saved into a new file called 'genezio.yaml'.


```
What is the name of the project: Music-Player

In what programming language do you want your SDK? [js]: js

What runtime will you use? Options: “node” or “browser”. [node]: node

Where do you want to save your SDK? [./sdk/]: .sdk

```



3. We’ll now create a file `core.js` with a class that exposes a method which receives two parameters, and returns a flavored echo of the parameters.

```javascript
export class MusicPlayerService {

	play(song) {

		// Do your business logic for playing a song

		return ‘♪♫ *music ♫♪’

	}

	pause() {

		// Do your business logic for pausing a song

		return ‘ * silence * ‘

	}

	skip() {

		// Do your business logic for skipping a song

	}

}

```



4. Use the command ``genezio addClass hello.js`` to add the class to the bundle. Execute ``genezio local`` to deploy it locally or ``genezio deploy`` to deploy it on the genezio infrastructure.
5. Excellent! You can now test this RPC interface using the URLs returned by the deploy command used and the SDK and/or with our test interface that you can find on the [dashboard](https://app.genez.io/dashboard).


### Using genezio to create a RESTful web service for the playlist functionality

It is worth noting that not all web services need to follow the REST architecture. It is preferable to use it when the purpose of the application is to perform CRUD operations on some data. If you however need this architecture, genezio has got you covered! Let’s try to create the playlist functionality for our music app using a RESTful architecture that can go alongside our existing RPC core functionality.

To create a simple REST web service using genezio, assuming you’re already logged in and have created the project for the core functionalities, follow these steps:



1. Create a file `playlist.js` with a class that can handle a HTTP request:

```javascript
export class RestPlaylist {
    // We'll consider a request with a json body for the "Add to playlist" – POST, "Get song from playlist" – GET and "Remove from playlist" – DELETE
    playlist(request) {
        switch (request.http.method) {
        case "GET": {
            // GET song from your playlist
            break;
        }
        case "POST": {
            // POST new song to your playlist
            break;
        }
        case "DELETE": {
            // DELETE from your playlist
            break;
        }
        default: {
            return {
                statusCode: "405",
                statusDescription: "405 Method Not Allowed " + request.method,
            }
        }
        }
        console.log(`Request received with body ${request.body}!`)
        if (!request.body.song) {
              throw Error("Missing field song")
        }

        if (!request.body.playlist) {
               throw Error("Missing field playlist")
        }

        const song = request.body.song
        const playlist = request.body.playlist

        return {
              body: {
                    response: "Song " + song + " added in playlist " + playlist
              },
              headers: { testHeader: "testHeaderValue" },
              statusCode: "201",
              statusDescription: "Ok"
        };
    }
}
```



2. Great! Now, we need to add this class to our genezio bundle, and deploy it. Run `genezio addClass index.js http` to add this class to the bundle. Run `genezio local` to deploy it locally, or `genezio deploy` to deploy it on the genezio infrastructure.
3. Congrats! You can now test this RESTful interface using the URLs returned by the deploy command used and the SDK and/or with our test interface that you can find on the [dashboard](https://app.genez.io/dashboard).

For a more complex application that uses a REST interface, you can check out our [Webhook example](https://github.com/Genez-io/genezio-examples/tree/master/javascript/webhook).
