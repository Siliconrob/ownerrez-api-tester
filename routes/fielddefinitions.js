const Joi = require("joi");
const appHelper = require("../src/helpers");

module.exports = [
  {
    method: "GET",
    path: "/fielddefinitions",
    options: {
      description: "Get Active Field Definitions",
      notes: "Get active field definitions",
      tags: ["api", "Field Definitions"],
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/fielddefinitions`
        );
        return response.body;
      });
    },
  },
  {
    method: "DELETE",
    path: "/fielddefinitions/{id}",
    options: {
      description: "Delete Field Definition by id",
      notes: "Returns Field Definition by id",
      tags: ["api", "Field Definitions"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Field Definition Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Delete(
          `${appHelper.BaseUrl}/fielddefinitions/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "PATCH",
    path: "/fielddefinitions/{id}",
    options: {
      description: "Patch an existing field definition",
      notes: "Updates an existing field definition",
      tags: ["api", "Field Definitions"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Field Definition Id"),
        }),                
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          code: Joi.string()
            .default("Code")
            .required(),
          description: Joi.string()
            .default("Description")
            .required(),
          name: Joi.string()
            .default("Name")
            .required()
            .description("Name"),
          type: Joi.string().valid("booking", "property", "account", "owner", "contact").required().description("Field Type")
        }),
      },
    },
    handler: async (request, h) => {
      const fieldDefinitionInput = request.payload;
      console.log(fieldDefinitionInput);      

      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Patch(
          `${appHelper.BaseUrl}/fielddefinitions/${request.params.id}`,
          fieldDefinitionInput
        );
        return response.body;
      });
    },    
  },  
  {
    method: "POST",
    path: "/fielddefinitions",
    options: {
      description: "Create a new field definition",
      notes: "Creates a field definition",
      tags: ["api", "Field Definitions"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          code: Joi.string()
            .default("Code")
            .required(),
          description: Joi.string()
            .default("Description")
            .required(),
          name: Joi.string()
            .default("Name")
            .required()
            .description("Name"),
          type: Joi.string().valid("booking", "property", "account", "owner", "contact").required().description("Field Type")
        }),
      },
    },
    handler: async (request, h) => {
      const fieldDefinitionInput = request.payload;
      console.log(fieldDefinitionInput);

      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Post(
          `${appHelper.BaseUrl}/fielddefinitions`,
          fieldDefinitionInput
        );
        return response.body;
      });
    },    
  }
];
