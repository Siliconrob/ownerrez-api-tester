const appHelper = require("../src/helpers");
const Joi = require("joi");
const Boom = require("@hapi/boom");

const address_validator = Joi.object({
  city: Joi.string().min(1).required().description("City"),
  country: Joi.string().allow(null).default(null).description("Country"),
  is_default: Joi.boolean()
    .default(true)
    .description("Set this address as default"),
  postal_code: Joi.string()
    .allow(null)
    .default(null)
    .min(1)
    .description("Postal or Zip code"),
  province: Joi.string().allow(null).default(null).description("Province"),
  state: Joi.string().allow(null).default(null).description("State"),
  street1: Joi.string().min(1).required().description("Street name and number"),
  street2: Joi.string()
    .allow(null)
    .default(null)
    .min(1)
    .description("Additional street address information like Apartment/Suite"),
  type: Joi.string().valid("home", "work", "other").required().default("home"),
});

const email_address_validator = Joi.object({
  address: Joi.string()
    .email()
    .default("guest@test.com")
    .required()
    .description("Email Address"),
  is_default: Joi.boolean()
    .default(true)
    .description("Set this email address as default"),
  type: Joi.string()
    .valid("home", "work", "mobile", "other")
    .required()
    .default("home"),
});

const phone_validator = Joi.object({
  extension: Joi.string()
    .allow(null)
    .default(null)
    .description("Phone extension"),
  is_default: Joi.boolean()
    .default(true)
    .description("Set this phone as default"),
  number: Joi.string().required().min(1).description("Phone numbe"),
  type: Joi.string()
    .valid("home", "work", "mobile", "other")
    .required()
    .default("home"),
});

module.exports = [
  {
    method: "GET",
    path: "/guests",
    options: {
      description: "Get All Guests",
      notes: "Returns all guests",
      tags: ["api", "Guests"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${
            appHelper.BaseUrl
          }/guests/?created_since_utc=${appHelper.DefaultStartTime.toUTCString()}`
        );
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/guests/{id}",
    options: {
      description: "Get Guest by id",
      notes: "Returns guest by id",
      tags: ["api", "Guests"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Guest Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/guests/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "POST",
    path: "/guests",
    options: {
      description: "Create a new guest",
      notes: "Creates a guest",
      tags: ["api", "Guests"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          addresses: Joi.array().items(address_validator).required(),
          email_addresses: Joi.array().items(email_address_validator),
          first_name: Joi.string()
            .default("First Name")
            .required()
            .description("First Name"),
          last_name: Joi.string()
            .default("Last Name")
            .required()
            .description("Last Name"),
          notes: Joi.string().allow(null).default(null).description("Notes"),
          phones: Joi.array().items(phone_validator),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        //const urlParams = new URLSearchParams(request.query);
        const guestInput = request.payload;
        console.log(guestInput);

        return await appHelper.GeneralErrorHandlerFn(async () => {
          const response = await appHelper.Post(
            `${appHelper.BaseUrl}/guests`,
            guestInput
          );
          return response.body;
        });
      });
    },
  },
];
