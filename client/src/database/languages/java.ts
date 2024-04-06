import {Item, Menu, Resource} from "../class";

export const java: Resource = new Resource(
  "Java",
  "Java is a versatile, object-oriented programming language known for its portability, performance, and security features. It is widely used for developing enterprise applications, mobile apps (Android), web servers, and more. Java's rich ecosystem, including the Java Virtual Machine (JVM), allows developers to write code once and run it on multiple platforms.",
  "/languages/java",
  "card",
  "https://static-00.iconduck.com/assets.00/java-original-icon-189x256-mdqugxri.png",
  "https://www.java.com/",
  "https://roadmap.sh/java"
);

Menu.addItems(java, [
  new Item(
    "Java - W3schools",
    "Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, Python, PHP, Bootstrap, Java, XML and more.",
    "https://www.w3schools.com/java/default.asp"
  ),
  new Item(
    "Java - W3schools",
    "Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, Python, PHP, Bootstrap, Java, XML and more.",
    "https://www.w3schools.com/java/default.asp"
  ),
]);
