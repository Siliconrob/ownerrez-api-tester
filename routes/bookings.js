const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/bookings",
    options: {
      description: "Get All Bookings",
      notes: "Returns all bookings",
      tags: ["api", "Bookings"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${
            appHelper.BaseUrl
          }/bookings/?since_utc=${appHelper.DefaultStartTime.toUTCString()}`
        );
        return response.body;
      });
    },
  },
];
