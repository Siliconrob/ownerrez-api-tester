const Joi = require("joi");
const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/properties",
    options: {
      description: "Get All Properties",
      notes: "Returns all properties",
      tags: ["api", "Properties"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(`${appHelper.BaseUrl}/properties`);
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/properties/{id}",
    options: {
      description: "Get Property By Id",
      notes: "Get property by id",
      tags: ["api", "Properties"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Property Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/properties/${request.params.id}`
        );
        return response.body;
      });
    },
  },
];
