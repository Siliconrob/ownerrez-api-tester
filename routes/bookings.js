const appHelper = require("../src/helpers");
const Joi = require("joi");

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
  {
    method: "GET",
    path: "/bookings/{id}",
    options: {
      description: "Get Booking By Id",
      notes: "Get booking by id",
      tags: ["api", "Bookings"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Booking Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/bookings/${request.params.id}`
        );
        return response.body;
      });
    },
  },  
];
