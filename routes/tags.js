const appHelper = require("../src/helpers");
const Joi = require("joi");

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
];
