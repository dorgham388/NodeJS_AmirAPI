const swaggerUi = require("swagger-ui-express");
const swaggerJsoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "AMIR API",
      version: "1.0.0",
      description: "This swagger doc is for testing auto-generation ",
      contact: {
        email: "dorgham388@gmail.com"
      }
    },
    servers: [
      { url: "http://localhost:3000" },
      { url: "http://PREPROD" },
      { url: "http://PROD" }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            firstName: {
              type: "string"
            },
            lastName: {
              type: "string"
            },
            email: {
              type: "string"
            },
            password: {
              type: "string"
            },
            permissionLevel: {
              type: "integer"
            }
          },
          xml: {
            name: "User"
          }
        }
      }
    },
    tags: [
      {
        name: "users",
        description: "Operations about users"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsoc(options);
module.exports = app => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
