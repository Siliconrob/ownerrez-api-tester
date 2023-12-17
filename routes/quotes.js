const Joi = require("joi");
const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/quotes/{id}",
    options: {
      description: "Get Quotes By Id",
      notes: "Get quote by id",
      tags: ["api", "Quotes"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Quote Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/quotes/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "DELETE",
    path: "/quotes/{id}",
    options: {
      description: "Delete Quote by id",
      notes: "Deletes quote by id",
      tags: ["api", "Quotes"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Quote Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Delete(
          `${appHelper.LegacyV1BaseUrl}/quotes/${request.params.id}`
        );
        return response.body;
      });
    },
  },    
];
