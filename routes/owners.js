const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/owners",
    options: {
      description: "Get All Owners",
      notes: "Returns all owners",
      tags: ["api", "Owners"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(`${appHelper.BaseUrl}/owners`);
        return response.body;
      });
    },
  },
];
