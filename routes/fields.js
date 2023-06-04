const Joi = require("joi");
const appHelper = require("../src/helpers");

const entityTypes = [
  "address",
  "listingSite",
  "agreement",
  "billingInfo",
  "booking",
  "bookingLineItem",
  "calendar",
  "calendarAction",
  "country",
  "email",
  "emailAction",
  "emailBody",
  "emailBounce",
  "emailRecipient",
  "emailSend",
  "file",
  "gatewayCall",
  "gatewayCredential",
  "holiday",
  "image",
  "inquiry",
  "inquiryEmail",
  "lease",
  "payment",
  "paymentApiCall",
  "paymentMethod",
  "phone",
  "picture",
  "post",
  "property",
  "propertyPaymentMethod",
  "quote",
  "quoteLineItem",
  "ratePeriod",
  "rate",
  "refund",
  "request",
  "scheduledPayment",
  "scheduledSecurityDeposit",
  "securityDeposit",
  "state",
  "supportArticle",
  "supportCategory",
  "supportGrouping",
  "surcharge",
  "tax",
  "thirdPartyAlert",
  "topic",
  "travelInsurance",
  "travelInsuranceCall",
  "user",
  "userInterstitial",
  "userInvoice",
  "userInvoiceBooking",
  "userInvoicePayment",
  "userPayment",
  "userPlan",
  "userPlanTier",
  "watch",
  "emailTemplate",
  "emailTemplateRecipient",
  "unknown",
  "widget",
  "iCalFeed",
  "apiApplication",
  "fieldDefinition",
  "field",
  "scheduledEmail",
  "guest",
  "linkedAccount",
  "linkedAccountProperty",
  "trigger",
  "season",
  "surchargeCriteria",
  "quickBooks",
  "quickBooksAction",
  "expense",
  "twilioCallLog",
  "calendarSync",
  "blockedOffTime",
  "inquiryPush",
  "lynnbrookMerchantApp",
  "hostedSitePage",
  "owner",
  "review",
  "vrtExport",
  "ownerStatement",
  "paymentVerification",
  "emailAddress",
  "vrtImport",
  "hostedSite",
  "autoresponder",
  "systemMessage",
  "guestMessage",
  "drip",
  "channelSyncEvent",
  "lock",
  "apiApplicationConnection",
  "bookingDoorCode",
  "bookingFee",
  "bookingFeeExpenseSource",
  "channelWebhookQueue",
  "damageProtection",
  "quickBooksInvoice",
  "triggerException",
  "triggerRun",
  "userInvoiceDamageProtection",
  "twilioMessage",
  "textTemplate",
  "hostedSiteHeader",
  "userRefund",
  "channelTemplate",
  "accessGrant",
  "verifiedDomain",
  "siteReview",
  "tagGroup",
  "externalSite",
  "cancellationPolicy",
  "twilioPhone",
  "themeOverride",
  "formHeader",
  "statementView",
  "pmPayout",
  "ownerPayment",
  "pmStatement",
  "tag",
  "propertyShare",
  "systemAlert",
  "propertyListingRoom",
  "propertyListingBathroom",
  "amenityCategory",
  "proJob",
  "entityTag",
  "deposit",
  "damageProtectionAgreement",
  "salesAccount",
  "channelBlackout",
  "holidayOccurrence",
  "hostedSiteBlogCategory",
  "hostedSiteBlogPost",
  "hostedSiteRedirect",
  "officialHolidaySubscription",
  "payPalECPayment",
  "payPalECRefund",
  "proJobServiceArea",
  "proJobServiceAreaCategory",
  "propertyLinkedAvailabilityProperty",
  "propertyOwnerApplicability",
  "quickBooksDeposit",
  "quickBooksOwner",
  "quickBooksPayment",
  "quickBooksSurcharge",
  "quickBooksTax",
  "quoteCharge",
  "reviewTemplate",
  "seasonalRate",
  "statementViewColumn",
  "suppressedEmailAddress",
  "taxApplicability",
  "taxRate",
  "userInvoiceCharge",
  "autoReview",
  "cannedQuery",
  "apiAccessToken",
  "payPalECSecurityDeposit",
  "expenseCategory",
  "proJobStatusHistory",
  "portalSite",
  "address2Entity",
  "emailAddress2Entity",
  "phone2Entity",
  "team",
  "userInvite",
  "propertyListingDescription",
  "depositAdjustment",
];

module.exports = [
  {
    method: "GET",
    path: "/fields/{id}",
    options: {
      description: "Get Fields By Id",
      notes: "Get field by id",
      tags: ["api", "Fields"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Field Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Get(
          `${appHelper.BaseUrl}/fields/${request.params.id}`
        );
        return response.body;
      });
    },
  },
  {
    method: "DELETE",
    path: "/fields/{id}",
    options: {
      description: "Delete Field by id",
      notes: "Returns Field",
      tags: ["api", "Fields"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Field Id"),
        }),
      },
    },
    handler: async (request, h) => {
      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Delete(
          `${appHelper.BaseUrl}/fields/${request.params.id}`
        );
        return response.body;
      });
    },
  },  
  {
    method: "PATCH",
    path: "/fields/{id}",
    options: {
      description: "Patch an existing field",
      notes: "Creates a field ",
      tags: ["api", "Fields"],
      validate: {
        params: Joi.object({
          id: Joi.number().required().description("Field Id"),
        }),         
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          entity_id: Joi.number().required(),
          entity_type: Joi.string()
            .valid(...entityTypes)
            .required()
            .description("Field Type"),
          field_definition_id: Joi.number().required(),
          value: Joi.string().default("value").required().description("Value"),
        }),
      },
    },
    handler: async (request, h) => {
      const field = request.payload;
      console.log(field);

      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Post(
          `${appHelper.BaseUrl}/fields/${request.params.id}`,
          field
        );
        return response.body;
      });
    },
  },  
  {
    method: "POST",
    path: "/fields",
    options: {
      description: "Create a new field",
      notes: "Creates a field ",
      tags: ["api", "Fields"],
      validate: {
        failAction: async (request, h, err) => {
          // During development, log and respond with the full error.
          console.log(err);
          throw err;
        },
        payload: Joi.object({
          entity_id: Joi.number().required(),
          entity_type: Joi.string()
            .valid(...entityTypes)
            .required()
            .description("Field Type"),
          field_definition_id: Joi.number().required(),
          value: Joi.string().default("value").required().description("Value"),
        }),
      },
    },
    handler: async (request, h) => {
      const field = request.payload;
      console.log(field);

      return await appHelper.GeneralErrorHandlerFn(async () => {
        const response = await appHelper.Post(
          `${appHelper.BaseUrl}/fields`,
          field
        );
        return response.body;
      });
    },
  },
];
