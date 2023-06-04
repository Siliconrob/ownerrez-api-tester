const appHelper = require("../src/helpers");
const Joi = require("joi");

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
  {
    method: "GET",
    path: "/webhooksubscriptions/{id}",
    options: {
      description: "Get Webhook subscription by id",
      notes: "Returns webhooksubscriptions by id",
      tags: ["api", "WebHookSubscriptions"],
      validate: {
        params: Joi.object({
          id: Joi.number()
            .required()
            .description("WebhookSubscription Definition Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/webhooksubscriptions/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "POST",
    path: "/webhooksubscriptions",
    options: {
      description: "Create a new webhook subcsription definition",
      notes: "Creates a webhook subcsription definition",
      tags: ["api", "WebHookSubscriptions"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          action: Joi.string()
            .valid("entity_create", "entity_update", "entity_delete", "application_authorization_revoked", "webhook_test")
            .required()
            .description("Webhook action"),          
          type: Joi.string()
            .valid("none", "booking", "guest", "property")
            .required()
            .default("none")
            .description("The type of records to send to this subscription"),
          webhook_url: Joi.string().uri().default("The URL to which webhooks should be sent for this subscription").required()
        }),
      },
    },
    handler: async (request, h) => {
      const webhookDefinition = request.payload;
      console.log(webhookDefinition);

      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Post(
          `${appHelper.BaseUrl}/webhooksubscriptions`,
          webhookDefinition
        );
        return response.body;
      });
    },
  },
  {
    method: "DELETE",
    path: "/webhooksubscriptions/{id}",
    options: {
      description: "Delete Webhook Subscription Definition by id",
      notes: "Returns Field Definition by id",
      tags: ["api", "WebHookSubscriptions"],
      validate: {
        params: Joi.object({
          id: Joi.number()
            .required()
            .description("WebhookSubscription Definition Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Delete(
          `${appHelper.BaseUrl}/webhooksubscriptions/${request.params.id}`
        );
        return response.body;
      });
    },
  },
];
