const Joi = require("joi");
const appHelper = require("../src/helpers");
const dateHelper = require("../src/datetools");

const spot_rate_validator = Joi.object({
  property_id: Joi.number().required().description("The ID of the property to which this spot rate applies"),
  amount: Joi.number().min(0).required().description("Nightly rate"),
  date: Joi.date()
            .required()
            .iso()
            .default(dateHelper.dateOnly(new Date(Date.now())))
            .description("Effective Start Date"),
  is_arrival_disallowed: Joi.boolean()
    .allow(null)
    .default(null)
    .description("Disallow arrival. (NULL use season or property rule)"),
  is_departure_disallowed: Joi.boolean()
    .allow(null)
    .default(null)
    .description("Disallow departure. (NULL use season or property rule)"),
  max_nights: Joi.number().min(0).optional().allow(null).default(null).description("The maximum number of nights. (NULL use season or property rule)"),
  min_nights: Joi.number().min(0).optional().allow(null).default(null).description("The minimum number of nights. (NULL use season or property rule)"),
  overrides_gap_arrival: Joi.boolean().optional().allow(null).default(null).description("Should the arrival rule apply even if there are gap rules."),
  overrides_gap_departure: Joi.boolean().optional().allow(null).default(null).description("Should the departure rule apply even if there are gap rules."),
  overrides_gap_min_nights: Joi.boolean().optional().allow(null).default(null).description("Should the minimum number of nights apply even if there are gap rules."),
});

module.exports = [
  {
    method: "PATCH",
    path: "/spotrates",
    options: {
      description: "Update Spot Rates",
      notes: "Updates spot rates",
      tags: ["api", "Spot Rates"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.array().items(spot_rate_validator).required(),
      },
    },
    handler: async (request, h) => {
      const spotRates = request.payload;
      console.log(spotRates);        
      
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Patch(`${appHelper.BaseUrl}/spotrates`, spotRates);
        return response.body;
      });
    },
  },
];
