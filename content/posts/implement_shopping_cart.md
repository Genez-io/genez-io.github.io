---
title: How to implement a Shopping Cart feature using TypeScript, Redis and React
date: 2023-11-20
tags:
  - Tutorials
author: Andreia Ocanoaia
linkedIn: https://www.linkedin.com/in/andreia-irina-ocanoaia/
thumbnail:
preview: Learn how to build a shopping cart app with Typescript, Redis and React.
# meta data start
description: Learn how to seamlessly implement a scalable, fast, and robust shopping cart using Redis, NodeJs, and React. Whether you're building from scratch or extending your e-commerce application, this tutorial guides you step-by-step through implementing a reliable shopping cart feature.
meta_og_url:
meta_og_image:
# meta data end
---

In this tutorial, I'll show you to use Redis, NodeJs and React to easily implement a shopping cart for your online store.

There are a lot of things to consider when implementing a shopping cart functionality for an online store - the cart feature should be scalable, fast and robust to offer a great experience for your users.

The best part of this tutorial is that you can easily extend it or integrate it with your existing application.

Let's get started! 🚀

# Content
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Setting up the backend](#setting-up-the-backend)
- [Setting up the frontend](#setting-up-the-frontend)
- [Deploying the application](#deploying-the-application)
- [Improvements](#improvements)
  - [Add a counter for the number of items in the cart](#add-a-counter-for-the-number-of-items-in-the-cart)
  - [Add spinners animation for loading states](#add-spinners-animation-for-loading-states)
- [Conclusion](#conclusion)

## Introduction

A possible implementation of a shopping cart is to store the items as a cookie on the client-side. The disadvantage of this approach is that the cookie is attached to every request and large cookies can significantly slow down your application.

A better option is to use a Redis database on the server-side to store items persistently and retrieve them very fast when needed.

This tutorial will show you how to harness the speed of a Redis database to build a shopping cart functionality using TypeScript/NodeJs.

{{< details "Expand this section to get more information on what's Redis" >}}

Redis is an open-source, in-memory database that stores key, values pairs. Redis is a highly versatile and performant database system. One of Redis's key features is its speed, as it primarily operates in-memory, enabling rapid data access. It is widely used for caching, real-time analytics, message brokering, and other applications where low-latency and high-throughput data storage and retrieval are crucial. Redis also provides persistence options, allowing data to be saved to disk for durability. Its simplicity, efficiency, and support for advanced data structures make Redis a popular choice for applications requiring fast and scalable data storage and retrieval.

[Upstash](https://upstash.com/) is a cutting-edge platform for modern developers seeking seamless data management in serverless and cloud-native applications. Offering Redis-compatible, in-memory database services, Upstash simplifies data storage and access, making it a natural fit for serverless functions, web apps, and cloud-native architectures.

By partnering with Upstash, genezio provides an easy to use solution to add an Upstash Redis database to your project from the genezio dashboard.
{{< /details >}}

On the frontend side, we'll use React and Bootstrap to implement a minimal frontend for the online store.
The great part about a minimal design, is that you can go as wild as you'd like with the frontend and tweak it further to your liking.

{{< details "Expand this section to get more information on what's React and Bootstrap" >}}

Bootstrap is a widely-used open-source frontend framework that helps you minify build your frontend application by providing a responsive grid system and lots of pre-designed components.
Reactstrap s a library that brings Bootstrap components into React applications. Reactstrap provides React-friendly versions of Bootstrap components, allowing developers to use the power of Bootstrap's styling and functionality within a React application.

Check out the [Reacstrap documentation](https://reactstrap.github.io/?path=/story/home-installation--page) to learn more about the framework and see the components available.

{{< /details >}}

We will use `genezio` to help you scaffold the web app and deploy it to the cloud.

The end result of this tutorial will be a web application that looks like this:

![Alt text](/images/blog/shopping_cart_example/shopping_cart_preview.png)

## Prerequisites

If you don't already have them, you'll need to install the following tools:
- [Node.js](https://nodejs.org/en/download/current) (version >= 16.0.0)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Genezio](https://genez.io)

Note: I recommend you to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage NodeJs and npm versions.
After installing `nvm`, you can easily get the any version of `node` by running `nvm install <node_version>`.
`nvm` will automatically install the corresponding `npm` version.

## Getting Started

Firstly, you'll need to create a new project with a server and a client.
The server will be responsible to communicate (store, retrieve, update, delete) with the Redis database.
The client will render the products available in the store and allow the user to add them to the shopping cart.

To get started with a template, install `genezio` using `npm` and run it in your terminal.
Later on, `genezio` come in handy to deploy and host your web applications in the cloud.

```bash
npm install -g genezio
```

After installing `genezio`, you can scaffold the application by running the following command:

```bash
genezio
```

The command above will get you through a series of questions to help you customize and prepare your project for production deployment.

Your terminal should look similar to the following output:
```
~ genezio
Redirecting to browser to complete authentication...

? Choose a template for your genezio project Fullstack
Your project will start from the Fullstack template.

? Please enter a name for your project: my-online-store
Your project will be named my-online-store.

? Choose a region for your project US East (N. Virginia)
Your project will be deployed in US East (N. Virginia).

We are creating the project in the current directory.

Deploying your backend project to genezio infrastructure...

Your backend project has been deployed and is available at https://app.genez.io/project/c7e163b7-d0c9-47f6-8520-0e546f2e7b07/cdfc6daf-2c9d-4fae-9c94-4f011c8a84f2

Deploying your frontend to genezio infrastructure...

No subdomain specified in the genezio.yaml configuration file. We will provide a random one for you.
Frontend successfully deployed at https://amber-cooperative-blackbird.app.genez.io.
```

The output from the `genezio` command will contain a randomly-assigned subdomain where your project was deployed for testing purposes.

## Setting up the backend

Now that you have a template to start from, fire up your favorite code editor and open the project's directory.


The following piece of code will connect you to a Redis database and allow you to store and retrieve items to the shopping cart based on a session id.
This approach will be useful to accommodate more than 1 user on your web app.

Create a new file called `shoppingCartService.ts` in the `server` directory and paste the following code snippet to it.

```typescript
import { GenezioDeploy } from "@genezio/types";
import Redis from "ioredis";

export type CartItem = {
  title: string;
  count: string;
}

@GenezioDeploy()
export class ShoppingCartService{
  client: Redis;

  constructor() {
    if (!process.env.UPSTASH_REDIS_URL) {
      throw new Error("It seems that UPSTASH_REDIS_URL is not set in the `.env` file.")
    }
    this.client = new Redis(process.env.UPSTASH_REDIS_URL);
  }

  async addItemToCart(sessionId: string, item: string): Promise<string> {
    // increment item count by 1 for a given item corresponding to the sessionId
    await this.client.hincrby('cart:' + sessionId, item, 1).catch((err) => {
      throw new Error(err);
    });

    return "success";
  }

  async getCart(sessionId: string): Promise<CartItem[]> {
    // get all items from the map corresponding to the sessionId
    const cart = await this.client.hgetall('cart:' + sessionId).catch((err) => {
      throw new Error(err);
    });
    // check if cart is empty
    if (Object.keys(cart).length === 0) {
      console.error("Cart is empty");
      return [];
    }

    // map cart items to an array of CartItem objects
    const cartItems: CartItem[] = [];
    for (const key in cart) {
      const item = {
        title: key,
        count: cart[key],
      };
      cartItems.push(item);
    }

    return cartItems;
  }
}
```

Install the dependencies by running the following command in the `server` directory:

```bash
npm install ioredis
npm --save-dev install @types/node
```

Right now, the backend won't work properly because there is no `UPSTASH_REDIS_URL` environment variable set in the `.env`.
Let's create a Redis database and connect it to your web application using a `.env` file.

Luckily, genezio makes it very easy to add an Upstash Redis integration to your project.
Go to the [genezio dashboard](https://app.genez.io) and add an Upstash Redis integration to your project.

![Alt text](/images/blog/shopping_cart_example/add_integration.png)

If you get stuck at this step, you can follow the [Upstash Redis integration tutorial](https://docs.genez.io/genezio-documentation/integrations/upstash-redis).

After adding the Upstash Redis integration, copy the environment variable from the `.env` section. Go back to your `server` directory, create a new file called `.env` and paste the contents there.

![Alt text](/images/blog/shopping_cart_example/copy_env_vars.png)

To test the code, you can run `genezio local` in the project directory.
This will start a fast local development server on your machine.

```bash
genezio local
```

You can test your application from the genezio dashboard by following the URL exposed in the terminal by `genezio local`.

```
~ genezio local
Test your code at https://app.genez.io/test-interface/local?port=8083
```

From the genezio dashboard you can sent request to your backend classes and see the response.

![Alt text](/images/blog/shopping_cart_example/test_backend.png)

You'll also need 2 more methods in the backend source code - a method to remove only an item from the cart and a method to delete the entire cart.

Add the following methods to the `ShoppingCartService` class:

```typescript
  async removeItemFromCart(sessionId: string, item: string): Promise<string> {
    // check if item exists in the map
    const itemExists = await this.client.hexists('cart:' + sessionId, item).catch((err) => {
      throw new Error(err);
    });
    if (!itemExists) {
      throw new Error("Item does not exist");
    }

    // decrement item count by 1 for a given item corresponding to the sessionId
    await this.client.hincrby('cart:' + sessionId, item, -1).catch((err) => {
      throw new Error(err);
    });

    // check if item count is 0 for a specific item, if so delete the entry from the map
    const itemCount = await this.client.hget('cart:' + sessionId, item).catch((err) => {
      throw new Error(err);
    });
    if (itemCount && parseInt(itemCount) === 0) {
      await this.client.hdel('cart:' + sessionId, item).catch((err) => {
        throw new Error(err);
      });
    }
    return "success";
  }

  async deleteCart(sessionId: string): Promise<string> {
    // check if cart exists in the database
    const cartExists = await this.client.exists('cart:' + sessionId).catch((err) => {
      throw new Error(err);
    });
    if (!cartExists) {
      throw new Error("Cart does not exist");
    }

    // delete the cart corresponding to the sessionId
    await this.client.del('cart:' + sessionId).catch((err) => {
      throw new Error(err);
    });

    return "success";
  }
```

Note: There is no need to restart `genezio local`. The process will detect any changes in your code and restart automatically.

Now that your backend logic is ready, you can thoroughly test it by sending requests to it from the [genezio dashboard](https://app.genez.io/test-interface/local?port=8083).

## Setting up the frontend

Going forward, you'll need to create a React app to render the products available in the store and allow the user to add them to the shopping cart.

For the purposes of this tutorial, the online store will be populated with dummy products using [dummyjson](https://dummyjson.com/products). This API will return a list of dummy products in JSON format with various fields.

Firstly, let's render the products in the online store. To avoid writing a lot of CSS, you can use [Bootstrap](https://getbootstrap.com/) to style your application. Bootstrap provides a lot of ready-to-use components that you can use in your application.

Firstly, let's install the dependencies for the frontend by running the following command in the `client` directory of your project:

```bash
npm install axios reactstrap bootstrap
```

Import Bootstrap in your frontend application by adding the following line in `client/src/index.tsx`:
```typescript
import 'bootstrap/dist/css/bootstrap.min.css';
```

Create a new file named `client/src/models.tsx` to declare the interfaces that will be used in the application.

```typescript
// The fields declared for the dummy data
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
  }

// Information needed for a cart item
export interface CartItem {
    title: string;
    count: string;
}
```

Open `client/src/App.tsx` in your IDE and remove the existing code. We'll start from scratch for a better understanding.

Add a header with a shopping cart button.

```typescript
  // Toggle the cart modal
  const toggleCartModal = (e: any) => {
    e.preventDefault();
    setIsCartVisible(!isCartVisible);
  };

    <div className="App">
      <div className="bg-dark text-light p-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1>Product List</h1>
            </div>
            <div className="col text-right">
              <Button color="primary" onClick={(e) => toggleCartModal(e)}>
                <FaShoppingCart />
                {purchasedQuantity > 0 && (
                  <span className="m-2">{purchasedQuantity}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

```

Create a state to keep track if the cart button was clicked. This state will be used to toggle on and off the cart modal.

```typescript
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Toggle the cart modal
  const toggleCartModal = (e: any) => {
    e.preventDefault();
    setIsCartVisible(!isCartVisible);
  };
```

To start the frontend on your localhost, run `npm run start`. This will initialize the frontend application on `localhost:3000`.
Keep the frontend running in the background and open `localhost:3000` in your browser to see the changes real-time every time you change the source code.

Add a list with the fetched products.

```typescript
  <Container className="my-4">
    <Row className="justify-content-around">
      {productData.products.map((product) => (
        <Col key={product.id} md="4" className="mb-4">
          <div className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <Button
              color="primary"
              onClick={(e) => handleBuyClick(e, product)}
              disabled={addItemLoading[product.id]}
            >
              {addItemLoading[product.id] ? (
                <Spinner size="sm" color="light" />
              ) : (
                'Buy Now'
              )}
            </Button>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
```

Add a modal that opens when the shopping cart button is clicked. In the modal, we'll display the content of the shopping cart and allow the user to close the cart, clear the cart or delete an item from it.

```typescript
{isCartVisible && (
  <div
    className="cart-overlay d-flex justify-content-center align-items-center position-fixed top-0 left-0 w-100 h-100"
    style={{ background: 'rgba(0, 0, 0, 0.7)' }}
  >
    <div className="cart-modal bg-white p-4 rounded shadow-lg">
      <h2 className="mb-4 center">Shopping Cart</h2>
      <ul className="list-unstyled">
        {cartData.length > 0 ? (
          cartData.map((cartItem, index) => (
            <li key={index} className="mb-3">
              <div>
                <span>{cartItem.title}</span>
                <span className="m-2">Quantity: {cartItem.count}</span>
                <Button color="danger" size="sm" className="m-2"> <FaTrash /> </Button>
              </div>
            </li>
          ))
        ) : (
          <li className="empty-cart">Your cart is empty</li>
        )}
      </ul>
      {cartData.length > 0 ? (
        <Button color="primary" className="m-2"> 'Clear Cart' </Button>
      ) : null}
      <Button color="primary" className="m-2"> 'Close' </Button>
    </div>
  </div>
)}
```

Add a token in local storage to keep track of the session id. This token will be used to identify the cart corresponding to the user.

```typescript
  // Check if the token is set in localStorage
  let token = localStorage.getItem('token') as string;

  // If token is not set, generate a 32-character token
  if (!token || token === '' || token === 'undefined') {
    token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem('token', token);
  }
```

Send a request to the backend to add an item to the cart when `Buy now` is clicked.

```typescript
  const handleBuyClick = async (e: any, product: Product) => {
    e.preventDefault();

    // You can implement your buy logic here, e.g., add the product to a cart
    await ShoppingCartService.addItemToCart(token, product.title);
  };
```

Send a request to the backend to retrieve the cart data when the modal is opened.

```typescript
  // Fetch the cart contents when the cart modal is visible
  useEffect(() => {
    if (isCartVisible) {
      const fetchCartData = async () => {
        try {
          // Call your ShoppingCartService.getCart method to the contents of the cart
          const cart = await ShoppingCartService.getCart(token);
          setCartData(cart);
        } catch (error) {
          console.error('Error fetching or parsing cart data:', error);
        }
      };

      fetchCartData();
    }
  }, [isCartVisible, token]);
```

Send a request to the backend to delete an item from the cart when the `Delete` button is clicked.

```typescript
  const handleDeleteItem = async (e: any, cartItem: CartItem) => {
    e.preventDefault();

    await ShoppingCartService.removeItemFromCart(token, cartItem.title);

    // You can implement your delete logic here
    const updatedCartData = await ShoppingCartService.getCart(token);
    setCartData(updatedCartData);
  };
```

Send a request to the backend to clear the cart when the `Clear Cart` button is clicked.

```typescript
  const handleClearCart = async (e: any) => {
    e.preventDefault();

    // You can implement your clear cart logic here
    await ShoppingCartService.deleteCart(token);

    // Update the cart data
    const updatedCartData = await ShoppingCartService.getCart(token);
    setCartData(updatedCartData);
  };
```

## Deploying the application

Your application is now ready to be deployed to the cloud to be used by your clients.

Before deploying your application, you can change the randomly-assigned subdomain to something more meaningly for your application.
To do that, go to genezio config file - `genezio.yaml` - and modify the `subdomain` field.

To deploy your application, run the following command in the root directory of your project:

```bash
genezio deploy
```

This will deploy the whole project to the cloud and make it available to your users using the subdomain you specified in the `genezio.yaml` file.

You can continue to manage, test, update and monitor your project from the genezio dashboard.

## Improvements

If you feel tired you can jump to the conclusions. But if you want to improve your web development skills, here are some ideas to extend the application.

### Add a counter for the number of items in the cart

It would be great if the user can see the number of items in the cart each time the `Buy now` button is clicked.
This way, the user has a visual indication that the item was successfully added to the cart.

Add a new state to keep track of the number of items in the cart.

```typescript
  const [purchasedQuantity, setPurchasedQuantity] = useState(0);

  const handleBuyClick = async (e: any, product: Product) => {
    // ...

    // Update the local state to reflect the purchased quantity
    setPurchasedQuantity((prevQuantity) => prevQuantity + 1);

    // ...
  };

  const handleDeleteItem = async (e: any, cartItem: CartItem) => {
    // ...

    // Update the local state to reflect the purchased quantity
    setPurchasedQuantity((prevQuantity) => prevQuantity - 1);

    // ...
  };

  const handleClearCart = async (e: any) => {
    // ...

    // Update the local state to reflect the purchased quantity
    setPurchasedQuantity(0);

    // ...
  };

  return (
    <Button color="primary" onClick={(e) => toggleCartModal(e)}>
      <FaShoppingCart />
      {purchasedQuantity > 0 && (
        <span className="m-2">{purchasedQuantity}</span>
      )}
    </Button>
  );
```

This state should be updated each time an item is added or removed from the cart. When the cart is cleared, the state should be reset to 0.

### Add spinners animation for loading states

To improve the UI even further, you can add spinners to indicate loading states on the buttons that are sending requests to the backend.

Each button should have a its own loading state to indicate that the request is being processed.

Below is an example of how to add a loading state to the `Buy now` button.

```typescript
  const [addItemLoading, setAddItemLoading] = useState<{
    [key: number]: boolean;
  }>({});

  const handleBuyClick = async (e: any, product: Product) => {
    // Set loading state to true to show the spinner
    setAddItemLoading((prevStates) => ({ ...prevStates, [product.id]: true }));

    // ...

    // Set loading state to false to hide the spinner
    setAddItemLoading((prevStates) => ({ ...prevStates, [product.id]: false }));
  };

  return (
    <Button
      color="primary"
      onClick={(e) => handleBuyClick(e, product)}
      disabled={addItemLoading[product.id]}
    >
      {addItemLoading[product.id] ? (
        <Spinner size="sm" color="light" />
      ) : (
        'Buy Now'
      )}
    </Button>
);
```

## Conclusion

Congratulations! 🥳

The codebase for this tutorial is open-source and you can find it on the [GitHub repository](https://github.com/genez-io/genezio-examples/tree/main/typescript/shopping-cart).

I hope you enjoyed this tutorial and I encourage you to check out our other [tutorials](https://genez.io/blog) for more tips and tricks on improving your software engineer skills. 🥷 💻
