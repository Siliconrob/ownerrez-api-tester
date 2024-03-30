const Joi = require("joi");
const appHelper = require("../src/helpers");
const dateHelper = require("../src/datetools");

module.exports = [
  {
    method: "GET",
    path: "/quotes/{id}",
    options: {
      description: "Get Quotes By Id",
      notes: "Get quote by id",
      tags: ["api", "Quotes"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Quote Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/quotes/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "DELETE",
    path: "/quotes/{id}",
    options: {
      description: "Delete Quote by id",
      notes: "Deletes quote by id",
      tags: ["api", "Quotes"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Quote Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Delete(
          `${appHelper.LegacyV1BaseUrl}/quotes/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "POST",
    path: "/quotes/create",
    options: {
      description: "Create a quote",
      notes: "Creates a quote ",
      tags: ["api", "Quotes"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        query: Joi.object({
          propertyId: Joi.string()
            .required()
            .default("orp12345x")
            .description("Property Id"),
          start_date: Joi.date()
            .required()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addDays(new Date(Date.now()), 30))
            )
            .description("Arrival Date"),
          end_date: Joi.date()
            .required()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addDays(new Date(Date.now()), 32))
            )
            .description("Departure Date"),
        }),
        payload: Joi.object({
          adults: Joi.number()
            .required()
            .default(2)
            .description("Number of adults"),
          children: Joi.number()
            .required()
            .default(0)
            .description("Number of children"),
          infants: Joi.number()
            .required()
            .default(0)
            .description("Number of infants"),
          noAgreement: Joi.bool().default(true).description("No agreement"),
          agreementId: Joi.number()
            .required()
            .default(1)
            .description("Agreement Id"),
          addCharges: Joi.bool().default(true).description("Add charges"),
          createHoldBlock: Joi.bool()
            .default(false)
            .description("Create a hold block"),
          sendEmail: Joi.bool().default(false).description("Send email"),
          skipRuleValidation: Joi.bool()
            .default(false)
            .description("Skip validation rules"),
        }),
      },
    },
    handler: async (request, h) => {
      const quoteDetails = {
        propertyId: Number(
          `0x${request.query.propertyId
            .replace(/orp5b/gi, "")
            .replace(/x/gi, "")}`
        ),
        arrival: dateHelper.dateOnly(request.query.start_date),
        departure: dateHelper.dateOnly(request.query.end_date),
        adults: request.payload.adults,
        children: request.payload.children,
        infants: request.payload.infants,
        noAgreement: request.payload.noAgreement,
        agreementId: request.payload.agreementId,
      };
      console.log(quoteDetails);
      const urlParams = new URLSearchParams({
        addCharges: request.payload.addCharges,
        createHoldBlock: request.payload.createHoldBlock,
        sendEmail: request.payload.sendEmail,
        skipRuleValidation: request.payload.skipRuleValidation,
      });
      console.log(urlParams.toString());

      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Post(
          `${appHelper.LegacyV1BaseUrl}/quotes?${urlParams.toString()}`,
          quoteDetails
        );
        return response.body;
      });
    },
  },
  {
    method: "POST",
    path: "/quotes/test",
    options: {
      description: "Create test a quote",
      notes: "Creates a test quote ",
      tags: ["api", "Quotes"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        query: Joi.object({
          propertyId: Joi.string()
            .required()
            .default("orp12345x")
            .description("Property Id"),
          start_date: Joi.date()
            .required()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addDays(new Date(Date.now()), 30))
            )
            .description("Arrival Date"),
          end_date: Joi.date()
            .required()
            .iso()
            .default(
              dateHelper.dateOnly(dateHelper.addDays(new Date(Date.now()), 32))
            )
            .description("Departure Date"),
        }),
        payload: Joi.object({
          adults: Joi.number()
            .required()
            .default(2)
            .description("Number of adults"),
          children: Joi.number()
            .required()
            .default(0)
            .description("Number of children"),
        }),
      },
    },
    handler: async (request, h) => {
      const quoteDetails = {
        propertyId: Number(
          `0x${request.query.propertyId
            .replace(/orp5b/gi, "")
            .replace(/x/gi, "")}`
        ),
        arrival: dateHelper.dateOnly(request.query.start_date),
        departure: dateHelper.dateOnly(request.query.end_date),
        adults: request.payload.adults,
        children: request.payload.children,
      };
      console.log(quoteDetails);

      return await appHelper.GeneralErrorHandlerFn(async () => {
        return await appHelper.CustomVerb("TEST", `${appHelper.LegacyV1BaseUrl}/quotes`, quoteDetails);
      });
    },
  },
];
