const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/guests",
    options: {
      description: "Get All Guests",
      notes: "Returns all guests",
      tags: ["api", "Guests"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${
            appHelper.BaseUrl
          }/guests/?created_since_utc=${appHelper.DefaultStartTime.toUTCString()}`
        );
        return response.body;
      });
    },
  },
];
