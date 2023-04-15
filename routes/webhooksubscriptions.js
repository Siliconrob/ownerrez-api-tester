const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/webhooksubscriptions",
    options: {
      description: "Get All Webhook subscriptions",
      notes: "Returns all webhooksubscriptions",
      tags: ["api", "WebHookSubscriptions"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/webhooksubscriptions`
        );
        return response.body;
      });
    },
  },
];
