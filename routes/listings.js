const Joi = require("joi");
const appHelper = require("../src/helpers");
const dateHelper = require("../src/datetools");

module.exports = [
  {
    method: "GET",
    path: "/listings",
    options: {
      description: "Get All Listings",
      notes: "Returns all listings",
      tags: ["api", "Listings"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(`${appHelper.BaseUrl}/listings`);
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/listings/{id}",
    options: {
      description: "Get Listing By Id",
      notes: "Get listing by id",
      tags: ["api", "Listing"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Listing Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {        
        const args = {
          includeAmenities: true,
          includeRooms: true,
          includeBathrooms: true,
          includeImages: true,
          includeDescriptions: "html"
        };
        
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/listings/${request.params.id}?${new URLSearchParams(args).toString()}`
        );
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/listings/availability/{id}",
    options: {
      description: "Get Listing Availability By Id and Dates",
      notes: "Get listing availability by id and dates",
      tags: ["api", "Listing"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Listing Id"),
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
          ids: [request.params.id],
          start: inputs.start_date,
          end: inputs.end_date,
        };
        const response = await appHelper.Get(
          `${
            appHelper.LegacyV1BaseUrl
          }/listings/availability?${new URLSearchParams(args).toString()}`
        );
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/listings/ancient/{id}",
    options: {
      description: "Get Listing Ancient Pricing By Id and Dates",
      notes: "Get listing ancient pricing by id and dates",
      tags: ["api", "Listing"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Listing Id"),
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
          start: inputs.start_date,
          end: inputs.end_date,
        };
        const response = await appHelper.Get(
          `${appHelper.LegacyV1BaseUrl}/listings/${
            request.params.id
          }/pricing?${new URLSearchParams(args).toString()}`
        );
        return response.body;
      });
    },
  },
];
