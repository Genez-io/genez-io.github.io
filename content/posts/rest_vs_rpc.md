---
title: "The Evolution of APIs: A History of REST and RPC"
date: 2023-06-15
tags:
  - Comparison
author: Bogdan Ciobanu
linkedIn: https://www.linkedin.com/in/bogdan-calin-ciobanu-a966b2268/
thumbnail: /images/rest-rpc.webp
preview: REST and RPC are two distinct approaches to web services and distributed computing
# meta data start
description: "REST is focused on resource manipulation and provides a uniform interface for accessing and modifying resources, while RPC is focused on method invocation and provides a way for applications to access remote services and resources."
meta_og_url: "https://genez.io/blog/the_evolution_of_apis_a_history_of_rest_and_rpc"
meta_og_image: "https://genez.io/images/rest-rpc.webp"
# meta data end
---


## Comparison

This article has two main components: 
**the history of the paradigms**, and a **tutorial on how to implement both paradigms using genezio**.

Prerequisites for the tutorial:



* Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Have an IDE or text editor installed, e.g. [Visual Studio Code](https://code.visualstudio.com/download)
* Create a free [genezio](https://genez.io/) account


## Summary

REST and RPC are two distinct approaches to web services and distributed computing. REST is focused on resource manipulation and provides a uniform interface for accessing and modifying resources, while RPC is focused on method invocation and provides a way for applications to access remote services and resources.

REST APIs have been around since the early 2000s. They quickly became popular because of their simplicity and ability to work well with the existing infrastructure of the internet. REST APIs use HTTP methods to communicate and transfer data between different systems and devices. Because they allow different applications and systems to communicate with each other in a standardized and predictable way, RESTful APIs can help developers save time and can be easily scaled.

On the other hand, the RPC design paradigm has been around for more than 30 years. It has evolved from a simple synchronous client-server architecture design to a flexible, resilient and asynchronous paradigm. At its roots, RPC’s use cases were private networks with multiple clients communicating with a server. Nowadays, it is a way to efficiently communicate between services through their endpoints. Basically, we can now think of RPC as a conversation between two services. Although this paradigm has seen a dip in popularity since REST APIs took over the web services scene, it would appear that we are seeing a renaissance of RPCs, as a more mature and broad technology.

In this blog post, we will not only explore the history of the two paradigms in more detail, but also how we can harness the strengths of both paradigms to create scalable and robust APIs in modern web services using `genezio`.


## Introduction

As you dig deeper into the world of web development, you'll likely encounter the terms "REST" and "RPC." These two paradigms have quite a long history, and have influenced each other since their creation. These terms might seem straightforward, but, just like their histories, they are more complex and nuanced than it seems. 

Web services have come a long way since their inception in the late 1990s. They started as simple ways to allow different applications to communicate with each other over the internet, but they quickly evolved into more complex and versatile systems. Today, web services are basically everywhere, as a type of system that provides ways for different applications to interact with each other, regardless of their respective platforms. The versatility of web services has made them an essential tool for modern software development, and they continue to evolve and improve with advances in technology.

There are different types of web service architectures, including SOAP (Simple Object Access Protocol), REST (Representational State Transfer), and RPC (Remote Procedure Call). The choice of which one to use depends on the requirements of the application or system. We will now delve into how the intertwined history of REST and RPC has changed the web services landscape since their beginnings.


## RPC - The Hero of Yore

In the early days of web services, Remote Procedure Call (RPC) was the dominant paradigm. At its roots, RPC is a request-response protocol, a model that has been around since the late 60's. However, RPC as we understand it today was first implemented in the early 80's. RPC was proposed as a way to enable applications written in different languages and running on different devices to communicate with each other over a network. The idea was simple, yet powerful. A client application would call a procedure on a server application, passing arguments and receiving results. RPC would then handle all the details of packing the arguments and results, and transmitting them over the network. Due to its ease of use, and the familiar way of calling functions, just like you would call functions from a library or your own program, it gained significant traction as soon as it arrived.


![alt_text](/posts/genezio-rpc.webp)


In essence, the RPC of those times was a protocol for communicating between applications that are running on different machines. The basic idea behind RPC is to make a remote function call on another computer or server, as if it were a local function call. RPC can be used in client-server architectures, where the client sends requests to the server, and the server executes the requested procedure and returns the result.

RPC's rise to fame was helped by the development of the Cedar programming language, similar to Pascal, which was created at Xerox PARC in the late 1970s. Cedar was designed to support distributed programming from the ground up, and its programming model was based on remote procedure calls. This made it easy for developers to write distributed applications, and it led to a revolution of efficiency and ease of use in the distributed computing space.

The hero status of the RPC paradigm in this era was also due to the advent of the C programming language, which was widely used in the development of operating systems and other software. C was beginning to be known for its simplicity, low-level capabilities, and cross-platform portability. This made it easy for developers to write distributed applications using RPC, as C was widely available and could be used to develop client and server applications. SunRPC, a version of RPC by Sun Microsystems, gained popularity in the 1980s for distributed computing on Unix systems due to its C-based simplicity and easy integration. Its success stemmed from its user-friendliness, flexibility in supporting multiple transport protocols and network types, and the External Data Representation (XDR) which enabled developers to utilize various programming languages in creating APIs.

However, in the early days of web services, RPC had some limitations. These did not stem from a bad design, but were caused by the simple fact that RPC was intended to be used as a way of communicating in distributed computing, even before the World Wide Web was conceived. It was a synchronous protocol, meaning that the client would block until it received a response from the server. This was detrimental for web services, because it meant that the client could not proceed with other instructions until it had received a response from the server. To address this, researchers and implementers of RPC systems later added support for asynchronous processing, exception-handling, network failure handling, and support for heterogeneity between different languages and devices.

Despite these limitations, RPC continued to dominate the web services landscape up until the early 2000's, as it provided a simple, fast and efficient way of enabling applications to communicate with each other over a network. However, as the needs of web services shifted, RPC's limitations became more poignant, and a new paradigm emerged: Representational State Transfer (REST).

## A Hero Put to REST?

In the early 2000s, a new paradigm emerged in the world of web services: Representational State Transfer, or REST. REST was not a new protocol, but rather a set of architectural principles for building web services that focused on simplicity, scalability, and ease of use. The concept of REST was first introduced by Roy Fielding, one of the principal authors of the HTTP/1.1 protocol that had a deep understanding of the web's architecture. He proposed that web services should be designed around a set of uniform, resource-based interfaces.

Unlike the RPC services that came before, which focused on procedure calls and tightly-coupled interfaces, REST emphasized loose coupling and stateless interactions between clients and servers. The key idea was to think of web services as a set of resources that could be accessed using standard HTTP methods, with the representation of each resource being a separate entity. This made it possible to build web services that were simple, flexible, and easy to use.

REST's popularity exploded in the 2000’s, in part due to the rise of cloud computing, which required simple and scalable web services that could handle large volumes of data and traffic. RESTful web services proved to be a perfect fit, as both the actual systems and the REST API evolved around each other, for this new landscape, allowing developers to build distributed systems that were both efficient and easy to use.

One of the main advantages of REST over classical RPC was its simplicity. RESTful web services used standard HTTP methods, which were familiar to developers, and made it easy to build and consume web services using any programming language or platform. Additionally, the loose coupling between clients and servers allowed for greater flexibility and scalability, making it possible to build distributed systems that could handle large volumes of traffic and data.

RESTful web services naturally operate over the HTTP protocol, using HTTP methods such as GET, POST, PUT, and DELETE to perform CRUD (Create, Read, Update, Delete) operations on resources. CRUD represents the basic operations that can be performed on data in a database or other data storage system. These operations are essential for any system that deals with data and are commonly used in web development to describe the actions that can be performed on a resource.


![alt_text](/posts/genezio-rest.webp)


The four CRUD operations are:



1. **Create**: Add new data to a database or other data storage system. For example, when a user fills out a registration form on a website, the data they submit is added to the database using the Create operation.
2. **Read**: Retrieve data from a database or other data storage system. For example, when a user logs in to a website, their profile information is retrieved from the database using the Read operation.
3. **Update**: Modify existing data in a database or other data storage system. For example, when a user updates their profile information on a website, the changes are saved to the database using the Update operation.
4. **Delete**: Remove data from a database or other data storage system. For example, when a user deletes their account on a website, their profile data can be removed from the database using the Delete operation.

Despite the advantages it brought upon classical RPC, REST was not without its limitations. One of the biggest challenges was the lack of a standardized way to describe RESTful web services. Unlike RPC, which used IDLs (Interface Description Languages) to describe the interface to a remote procedure, REST had no such mechanism. This made it harder for developers to discover and understand RESTful web services, and also made it harder to build tools and frameworks to support them.

Another limitation of REST was its emphasis on statelessness. While statelessness made RESTful web services more scalable, it also made it harder to build complex interactions between clients and servers. For example, in a RESTful system, each request was independent of the others, which made it harder to maintain context and session information between requests.

It is also worth noting that RESTful interfaces tend to be used even when there is no clear mapping between the HTTP methods and the functionalities of the service. Take for example a music streaming application: The playlist functionalities could be implemented as `get song`, `delete song`, `add song` seamlessly. However, the main features of the application “play, pause, skip” would not have a direct method, and would need to be forcibly implemented using REST methods. In this case, an RPC-based approach would be preferable.

RESTful web services are simple and easy to use, but lack some of the flexibility and expressiveness of classical RPC. As such, as the complexity of web services continued to grow, a new paradigm was bound to (re-)emerge: a modern approach to RPC that combined the simplicity of REST with the flexibility of classical RPC.


## The Resurgence of RPC

Despite the rapid, widespread adoption of REST, RPC withstood the test of time. In the post-2000 era, RPC systems have adopted a more flexible approach to development. Instead of using RPC with a fix-it-all approach, they have become a solution targeted to solve concrete problems in a fast and elegant way. RPC has experienced a resurgence in popularity due to the emergence of modern RPC frameworks such as gRPC. These frameworks are designed to address the limitations of classical RPC and REST and provide more efficient, scalable, and reliable communication between distributed systems and client-server applications.

JSON-RPC encodes the calls in the JSON format, which allows data to be transmitted efficiently and easily between clients and servers. Ethereum employs JSON-RPC as its primary communication interface to interact with the Ethereum network due to its specific characteristics that align well with the platform's requirements. Its stateless nature allows Ethereum to maintain consistency across multiple nodes, crucial for decentralized systems. This choice is also advantageous due to JSON-RPC's lightweight nature, human-readable format, and language-agnostic design, which facilitate efficient and seamless interaction with Ethereum nodes. Consequently, developers can effortlessly create decentralized applications (dApps), manage transactions, and query blockchain data, fostering a robust and accessible ecosystem for Ethereum-based projects.

gRPC was developed by Google and is based on the open-source protocol buffers data serialization format. It uses HTTP/2 for transport and provides features such as bi-directional streaming, flow control, and error handling. This makes gRPC faster and more efficient than traditional RPC systems, as it reduces the overhead of network requests and responses. However, integration of gRPC may not be seamless, as some browsers do not expose a HTTP/2-compliant API. One way to overcome this is by using [gRPC-web](https://github.com/grpc/grpc-web).

A major benefit of gRPC is its support for service discovery and load balancing. This allows applications to dynamically discover and connect to available services, and distribute traffic across multiple instances of a service, improving reliability and scalability. In addition to gRPC, other modern RPC frameworks such as Apache Thrift, Finagle, and RSocket have also gained popularity in recent years, each with their own unique features and benefits.

Another advantage of gRPC is its support for streaming, which allows for efficient processing of large data sets and real-time updates. gRPC supports both client-side and server-side streaming, as well as bi-directional streaming, which enables both the client and server to send multiple messages in a single connection. It also provides support for features such as authentication, encryption, and flow control, which are important for securing and optimizing communication over a network.


## Conclusion

Throughout the history of web services, there have been two main players: RPC and REST. While the popularity of RPC has fallen in the last two decades, we are seeing a sort of “renaissance” of this paradigm, as a more flexible and efficient approach to solve a plethora of problems in the landscape of web services. Although it is not a silver bullet, it is, more often than not, a more elegant solution than RESTful APIs for different functionalities of more complex applications.

This stems from the key difference between REST and modern RPC: their approach to data transfer. RESTful web services use a representational approach, meaning that the data is transferred as a resource representation that is independent of the client's state. RPC, on the other hand, uses a procedural approach, meaning that the data is transferred through the method invocation and return value(s).


## Using genezio to create an RPC and RESTful web service

An RPC-based application can be created extremely quickly and easily using genezio, as genezio under the hood is relying on the RPC paradigm.

In this section we will detail the steps needed to create a Music Player application. The app will have two major parts: the core, namely the play, pause and skip functionality; the playlist functionality: add and delete songs from the playlist, and get songs from the playlist. These two parts will be implemented using a RPC and REST API respectively, as each of them is more suitable for each type of functionality.

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



4. Use the command ``genezio addClass hello.js`` to add the class to the bundle. Execute ``genezio local`` to test it locally or ``genezio deploy –backend`` to deploy it on the genezio infrastructure.
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

You can check out the code for this application [here](https://github.com/MagoDelBlocco/genezio-music-app/tree/master). For a more complex application that uses a REST interface, you can check out our [Webhook example](https://github.com/Genez-io/genezio-examples/tree/master/javascript/webhook).
