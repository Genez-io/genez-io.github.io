/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/

import { Remote } from "./remote.js"

export class HelloWorldClass {
  static remote = new Remote("https://6bhnrkb6cyqhhpru6xpmoq3squ0opnoa.lambda-url.us-east-1.on.aws/HelloWorldClass")

  static async helloWorld() {
    return HelloWorldClass.remote.call("HelloWorldClass.helloWorld")
  }

  static async hello(name, location) {
    return HelloWorldClass.remote.call("HelloWorldClass.hello", name, location)
  }

}
