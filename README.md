# Hello and welcome to using Hapijs with the OwnerRez API!

This project includes a Node.js server script

- Make sure to set all your [.env](https://support.glitch.com/t/how-do-i-set-environment-variables/3921) variables, this example uses [personal tokens](https://www.ownerreservations.com/support/articles/api-overview)
- [Node.js](https://nodejs.org/en/about/) is a popular runtime that lets you run server-side JavaScript.
- This project uses the [Hapijs](https://hapi.dev/) framework (I hope it makes you as happy as it does for me to use 😁) and explores basic routes on the [OwnerRez API](https://api.ownerreservations.com/help/v2).
- **Do not use this in production**

_Last updated: 15 Apr 2023_

## Prerequisites

You'll get best use out of this project if you're familiar with basic JavaScript. If you've written JavaScript for client-side web pages this is a little different because it uses server-side JS, but the syntax is the same!

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `public/style.css`: The styling rules for the pages in your site.

← `index.js`: The **Node.js** server script for your new site. The JavaScript defines the endpoints in the site back-end, one to return the homepage and one to update with the submitted color. Each one sends data to a Handlebars template which builds these parameter values into the web page the visitor sees.

← `package.json`: The NPM packages for your project's dependencies.

← `routes/`: This folder holds all the predefined Swagger entry points for hapijs to communicate with the OwnerRez API.

← `src/`: This folder holds general server side helper files for working with hapijs.


## Try this next 🏗️

Take a look in `TODO.md` for next steps you can try out in your new site!

**_Want a minimal version of this project to build your own Node.js app? Check out [Blank Node](https://glitch.com/edit/#!/remix/glitch-blank-node)!_**

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## You built this with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
