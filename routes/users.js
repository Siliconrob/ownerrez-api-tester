const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/users",
    options: {
      description: "Get current authenticated user",
      notes: "Returns authenticated user",
      tags: ["api", "Users"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(`${appHelper.BaseUrl}/users/me`);
        return response.body;
      });
    },
  },
];
