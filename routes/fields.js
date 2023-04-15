const Joi = require("joi");
const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/fields/{id}",
    options: {
      description: "Get Fields By Id",
      notes: "Get field by id",
      tags: ["api", "Fields"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Field Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/fields/${request.params.id}`
        );
        return response.body;
      });
    },
  },
];
