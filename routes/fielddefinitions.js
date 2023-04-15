const Joi = require("joi");
const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/fielddefinitions",
    options: {
      description: "Get Active Field Definitions",
      notes: "Get active field definitions",
      tags: ["api", "Field Definitions"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/fielddefinitions`
        );
        return response.body;
      });
    },
  },
];
