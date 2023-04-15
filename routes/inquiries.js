const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/inquiries",
    options: {
      description: "Get All Inquires",
      notes: "Returns all inquiries",
      tags: ["api", "Inquires"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${
            appHelper.BaseUrl
          }/inquiries/?since_utc=${appHelper.DefaultStartTime.toUTCString()}`
        );
        return response.body;
      });
    },
  },
];
