const appHelper = require("../src/helpers");
const Joi = require("joi");

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
];
