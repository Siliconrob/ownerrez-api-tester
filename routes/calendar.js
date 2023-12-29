const Joi = require("joi");
const appHelper = require("../src/helpers");
const dateHelper = require("../src/datetools");
const jcc = require("json-case-convertor");

function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}

module.exports = [
  {
    method: "GET",
    path: "/calendar/{id}/availability",
    options: {
      description: "Get Property Availablity",
      notes: "Returns property availability by id",
      tags: ["api", "Calendar"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Property Id"),
        }),
        query: Joi.object({
          start_date: Joi.date()
            .optional()
            .iso()
            .default(dateHelper.dateOnly(new Date(Date.now())))
            .description("Start Date"),
          end_date: Joi.date()
            .optional()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addMonths(new Date(Date.now()), 1))
            )
            .description("End Date"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const inputs = { ...request.query };
        inputs.start_date = dateHelper.dateOnly(inputs.start_date);
        inputs.end_date = dateHelper.dateOnly(inputs.end_date);
        const args = {
          propertyIds: [request.params.id],
          startDate: inputs.start_date,
          endDate: inputs.end_date,
        };

        const response = await appHelper.Get(
          `${
            appHelper.LegacyV1BaseUrl
          }/bookings/availability/?${new URLSearchParams(args).toString()}`
        );
        return jcc.snakeCaseKeys(response.body);
      });
    },
  },
  {
    method: "GET",
    path: "/calendar/{id}/bookings",
    options: {
      description: "Get Property Calendar Bookings",
      notes: "Returns property calendar bookings",
      tags: ["api", "Calendar"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Property Id"),
        }),
        query: Joi.object({
          start_date: Joi.date()
            .optional()
            .iso()
            .default(dateHelper.dateOnly(new Date(Date.now())))
            .description("Start Date"),
          end_date: Joi.date()
            .optional()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addMonths(new Date(Date.now()), 1))
            )
            .description("End Date"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const inputs = { ...request.query };
        inputs.start_date = dateHelper.dateOnly(inputs.start_date);
        inputs.end_date = dateHelper.dateOnly(inputs.end_date);
        const args = {
          propertyIds: [request.params.id],
          startDate: inputs.start_date,
          endDate: inputs.end_date,
          includeRate: true,
          includeCanceled: true,
        };

        const response = await appHelper.Get(
          `${
            appHelper.LegacyV1BaseUrl
          }/bookings/calendar/?${new URLSearchParams(args).toString()}`
        );
        return jcc.snakeCaseKeys(response.body);
      });
    },
  },
];
