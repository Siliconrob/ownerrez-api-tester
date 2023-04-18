const Joi = require("joi");
const appHelper = require("../src/helpers");
const querystring = require('querystring');

function dateOnly(inputDate) {
  if (inputDate instanceof Date) {
    return inputDate != null ? inputDate.toISOString().split("T").shift() : null;
  }
  return null;
};

function addMonths(inputDate, months) {  
  if (isNaN(months)) {
    return inputDate;
  }  
  if (inputDate instanceof Date && inputDate != null) {
    inputDate.setMonth(inputDate.getMonth() + months);
    return inputDate;
  }
  return null;
};


module.exports = [
  {
    method: "GET",
    path: "/properties",
    options: {
      description: "Get All Properties",
      notes: "Returns all properties",
      tags: ["api", "Properties"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(`${appHelper.BaseUrl}/properties`);
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/properties/{id}",
    options: {
      description: "Get Property By Id",
      notes: "Get property by id",
      tags: ["api", "Properties"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Property Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/properties/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "GET",
    path: "/search",
    options: {
      description: "Search Properties",
      notes: "Search properties by parameters",
      tags: ["api", "Properties"],
      validate: {
        query: Joi.object({
          active: Joi.bool().optional().default(true).description("Filter by status"),
          availability_end_date: Joi.date().optional().iso().default(dateOnly(addMonths(new Date(Date.now()), 1))).description("Filter by availability end date"),
          availability_start_date: Joi.date().optional().iso().default(dateOnly(new Date(Date.now()))).description("Filter by availability start date"),
          include_fields: Joi.bool().optional().default(false).description("Include fields collection on results"),
          include_tags: Joi.bool().optional().default(false).description("Include tags collection on results"),
          payment_method_id: Joi.number().integer().optional().default(null).description("Filter by applicable payment method"),
        }),        
      },      
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const inputs = {...request.query};
        inputs.availability_start_date = dateOnly(inputs.availability_start_date);
        inputs.availability_end_date = dateOnly(inputs.availability_end_date);

        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/properties?${querystring.stringify(appHelper.RemoveNullUndefined(inputs))}`
        );
        return response.body;
      });
    },
  },  
];
