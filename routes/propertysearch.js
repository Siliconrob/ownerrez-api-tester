const Joi = require("joi");
const appHelper = require("../src/helpers");
const dateHelper = require("../src/datetools");

module.exports = [
  {
    method: "GET",
    path: "/propertysearch",
    options: {
      description: "Search Properties",
      notes: "Returns all matching properties",
      tags: ["api", "Property Search"],
      validate: {
        query: Joi.object({
          from_date: Joi.date()
            .optional()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addDays(new Date(Date.now()), 7))
            )
            .description("Arrival Date"),
          end_date: Joi.date()
            .optional()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addDays(new Date(Date.now()), 12))
            )
            .description("Departure Date"),
          bedrooms: Joi.number()
            .min(0)
            .optional()
            .allow(null)
            .default(null)
            .description("Bedrooms"),
          max_guests: Joi.number()
            .min(0)
            .optional()
            .allow(null)
            .default(null)
            .description("Max guests"),
          children_allowed: Joi.bool()
            .optional()
            .allow(null)
            .default(null)
            .description("Children allowed"),
          price_max: Joi.number()
            .optional()
            .allow(null)
            .default(null)
            .description("Maximum price per night"),
          price_min: Joi.number()
            .optional()
            .allow(null)
            .default(null)
            .description("Minimum price per night"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const inputs = { ...request.query };
        inputs.from_date = dateHelper.dateOnly(inputs.from_date);
        inputs.end_date = dateHelper.dateOnly(inputs.end_date);

        const args = {
          available_from: inputs.from_date,
          available_to: inputs.end_date,
          bedrooms_min: inputs.bedrooms,
          children_allowed: inputs.children_allowed,
          guests_max: inputs.max_guests,
          rate_max: inputs.price_max,
          rate_min: inputs.price_min,
        };

        const queryParams = appHelper.RemoveNullUndefined(args);
        let queryString = "";
        if (Object.entries(queryParams).length > 0) {
          queryString = `?${new URLSearchParams(queryParams).toString()}`;
        }
        console.log(new URLSearchParams(queryParams).toString());
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/propertysearch${queryString}`
        );
        return response.body;
      });
    },
  },
];
