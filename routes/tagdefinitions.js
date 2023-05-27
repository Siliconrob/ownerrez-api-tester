const appHelper = require("../src/helpers");
const Joi = require("joi");
const superagent = require("superagent");

module.exports = [
  {
    method: "GET",
    path: "/tagdefinitions",
    options: {
      description: "Get Active Tag Definitions",
      notes: "Returns Tag by Id",
      tags: ["api", "Tag Definitions"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/tagdefinitions?active=true`
        );
        return response.body;
      });
    },
  },
  {
    method: "POST",
    path: "/tagdefinitions",
    options: {
      description: "Create a new tag definition",
      notes: "Creates a new tag definition",
      tags: ["api", "Tag Definitions"],
      validate: {
        query: Joi.object({
          color: Joi.string().required().default('red').description("Tag color"),
          description: Joi.string().required().default(null).description("Tag description"),
          name: Joi.string().required().default(null).description("Tag name"),
          title: Joi.string().required().default(null).description("Tag title"),
        }),        
      },            
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const urlParams = new URLSearchParams(request.query);
        return await appHelper.GeneralErrorHandlerFn(async () => {
          const response = await appHelper.Post(
            `${appHelper.BaseUrl}/tagdefinitions`, Object.fromEntries(urlParams)
          );
          return response.body;
        });
      });
    },
  }  
];
