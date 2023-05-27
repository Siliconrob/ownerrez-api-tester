const Joi = require("joi");
const appHelper = require("../src/helpers");
const querystring = require('querystring');

module.exports = [
  {
    method: "GET",
    path: "/listings",
    options: {
      description: "Get All Listings",
      notes: "Returns all listings",
      tags: ["api", "Listings"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${
            appHelper.BaseUrl
          }/listings`
        );
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/listings/{id}",
    options: {
      description: "Get Listing By Id",
      notes: "Get listing by id",
      tags: ["api", "Listing"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Listing Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/listings/${request.params.id}`
        );
        return response.body;
      });
    },
  },  
];
