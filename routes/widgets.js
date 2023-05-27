const Joi = require("joi");
const appHelper = require("../src/helpers");
const dateHelper = require("../src/datetools");
const querystring = require("querystring");
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
    path: "/widgets/{id}",
    options: {
      description: "Get Widget Details",
      notes: "Returns wdiget detail by id",
      tags: ["api", "Widgets"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Widget Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.LegacyV1BaseUrl}/widgets?${request.params.id}`
        );
        return jcc.snakeCaseKeys(response.body);
      });
    },
  },
  {
    method: "GET",
    path: "/widgets/property/{id}",
    options: {
      description: "Get Widgets by property Id",
      notes: "Returns active property widgets",
      tags: ["api", "Widgets"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Property Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const args = {
          propertyId: request.params.id,
        };

        const response = await appHelper.Get(
          `${appHelper.LegacyV1BaseUrl}/widgets?${querystring.stringify(args)}`
        );
        return jcc.snakeCaseKeys(response.body);
      });
    },
  },
];
