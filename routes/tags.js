const appHelper = require("../src/helpers");
const Joi = require("joi");
const superagent = require("superagent");

module.exports = [
  {
    method: "GET",
    path: "/tags/{id}",
    options: {
      description: "Get Tag by Id",
      notes: "Returns Tag by Id",
      tags: ["api", "Tags"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Tag Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/tags/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "DELETE",
    path: "/tags/{id}",
    options: {
      description: "Delete Tag by id",
      notes: "Returns Tagby id",
      tags: ["api", "Tags"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Tag Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Delete(
          `${appHelper.BaseUrl}/tags/${request.params.id}`
        );
        return response.body;
      });
    },
  },   
  {
    method: "POST",
    path: "/tags",
    options: {
      description: "Tag an entity with a created tag definition",
      notes: "Tags an entity",
      tags: ["api", "Tags"],
      validate: {
        query: Joi.object({
          entity_id: Joi.number().required().default(null).description("Entity id"),
          entity_type: Joi.string().required().default("property").description("Entity type"),
          name: Joi.string().required().default(null).description("Tag name")
        }),        
      },            
    },
    handler: async (request, h) => {
      const urlParams = new URLSearchParams(request.query);
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const urlParams = new URLSearchParams(request.query);
        return await appHelper.GeneralErrorHandlerFn(async () => {
          const response = await appHelper.Post(
            `${appHelper.BaseUrl}/tags`, Object.fromEntries(urlParams)
          );
          return response.body;
        });
      });
    },
  }  
];
