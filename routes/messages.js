const Joi = require("joi");
const appHelper = require("../src/helpers");
const dateHelper = require("../src/datetools");

module.exports = [
  {
    method: "POST",
    path: "/messages",
    options: {
      description: "Post a new message",
      notes: "Creates a new message",
      tags: ["api", "Messages"],
      validate: {
        query: Joi.object({
          thread_id: Joi.number().required().default(null).description("Thread id")
        }),
        payload: Joi.object({
          message_text: Joi.string()
            .default(null)
            .description("Message body"),
        }),        
      },      
    },
    handler: async (request, h) => {
      const newMessage = {
        thread_id: request.query.thread_id,
        body: request.payload.message_text
      };
      
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Post(`${appHelper.BaseUrl}/messages`, newMessage);
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/messages/{id}",
    options: {
      description: "Get Message By Id",
      notes: "Get message by id",
      tags: ["api", "Messages"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Message Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/messages/${request.params.id}`
        );
        return response.body;
      });
    },
  },  
  {
    method: "GET",
    path: "/messages/thread/{id}",
    options: {
      description: "Get Message By Thread Id",
      notes: "Get message by thread id",
      tags: ["api", "Messages"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Thread Id"),
        }),
        query: Joi.object({
          since_date: Joi.date()
            .optional()
            .iso()
            .default(dateHelper.dateOnly(appHelper.DefaultStartTime))
            .description("Since Date, set to null for all messages"),
        }),        
      },
    },
    handler: async (request, h) => {
      
      const args = {
        threadId: request.params.id,
        sinceUtc: dateHelper.dateOnly(request.query.since_date) 
      };
      
      console.log(args);
      
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(`${appHelper.BaseUrl}/messages${new URLSearchParams(args).toString()}`);
        return response.body;
      });
    },
  },  
];
