"use strict";

const Hapi = require("@hapi/hapi");
const Path = require("path");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const HauteCouture = require("@hapipal/haute-couture");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: "0.0.0.0",
  });

  const swaggerOptions = {
    info: {
      title: "Unofficial Test API Documentation",
      version: "0.1",
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  await HauteCouture.compose(server);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.file("public/index.html");
    },
  });

  await server.start();
  console.log("I exist to serve %s", server.info.uri);  
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
