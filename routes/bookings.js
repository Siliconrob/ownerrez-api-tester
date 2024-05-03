const appHelper = require("../src/helpers");
const Joi = require("joi");
const dateHelper = require("../src/datetools");

module.exports = [
  {
    method: "GET",
    path: "/bookings",
    options: {
      description: "Get All Bookings",
      notes: "Returns all bookings",
      tags: ["api", "Bookings"],
      validate: {
        query: Joi.object({
          since_date: Joi.date()
            .optional()
            .iso()
            .default(dateHelper.dateOnly(appHelper.DefaultStartTime))
            .description("Start Date"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const inputs = { ...request.query };
        const searchDate = dateHelper.dateOnly(inputs.since_date);
        const bookingSearch = `${appHelper.BaseUrl}/bookings/?since_utc=${searchDate}`;
        console.log(bookingSearch);
        const response = await appHelper.Get(bookingSearch);
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
