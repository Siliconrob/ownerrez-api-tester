const Boom = require("@hapi/boom");
const superagent = require("superagent");
const fetch = require("node-fetch");

function validateEnvVariable(envName) {
  if (!envName || !envName.length) {
    throw new Boom.preconditionFailed(`The env cannot be null or empty`);
  }

  if (!(envName in process.env)) {
    throw new Boom.preconditionFailed(
      `Please review the README.md.  You must set the .env variable "${envName}"`
    );
  }

  if (!process.env[envName].length) {
    throw new Boom.preconditionFailed(
      `The env variable ${envName} cannot be null or empty`
    );
  }
}

module.exports = {  
  RemoveNullUndefined: obj => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {}),
  AncientV1BaseUrl: "https://secure.ownerreservations.com/bpapi",
  LegacyV1BaseUrl: "https://secure.ownerreservations.com/api",
  BaseUrl: "https://api.ownerreservations.com/v2",
  GeneralErrorHandlerFn: async function (runFn) {
    ["owner_rez_username", "owner_rez_token", "owner_rez_user_agent"].forEach(
      (z) => validateEnvVariable(z)
    );

    try {
      return await runFn();
    } catch (error) {
      console.log(error);
      throw Boom.badRequest(error.response.text);
    }
  },
  DefaultStartTime: new Date(2000, 1, 1),
  Get: async function (url) {
    return await superagent
      .get(url)
      .set("User-Agent", process.env.owner_rez_user_agent)
      .auth(process.env.owner_rez_username, process.env.owner_rez_token, {
        type: "auto",
      });
  },
  Post: async function(url, data) {
    return await superagent
      .post(url)
      .send(data)
      .set("User-Agent", process.env.owner_rez_user_agent)
      .auth(process.env.owner_rez_username, process.env.owner_rez_token, {
        type: "auto",
      });
  },
  Patch: async function(url, data) {
    return await superagent
      .patch(url)
      .send(data)
      .set("User-Agent", process.env.owner_rez_user_agent)
      .auth(process.env.owner_rez_username, process.env.owner_rez_token, {
        type: "auto",
      });
  },
  Delete: async function (url) {
    return await superagent
      .delete(url)
      .set("User-Agent", process.env.owner_rez_user_agent)
      .auth(process.env.owner_rez_username, process.env.owner_rez_token, {
        type: "auto",
      });
  },
  CustomVerb: async function (verb, url, data) {    
    const authHeader = Buffer.from(`${process.env.owner_rez_username}:${process.env.owner_rez_token}`, 'utf8').toString('base64');    
    const response = await fetch(url, {
      method: verb,
      body: JSON.stringify(data),
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Basic ${authHeader}`,
        "User-Agent": process.env.owner_rez_user_agent
      }
    });    
    return await response.json();
  },    
};
