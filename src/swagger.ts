import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { docPaths } from "./docs/index.js";
import { NODE_ENV, PORT } from "./config/env.js";

// Dynamically set servers based on environment
const servers =
  NODE_ENV === "production"
    ? [
        {
          url: "https://tanes.onrender.com",
          description: "Production (Render)",
        },
      ]
    : [
        {
          url: `http://localhost:${PORT || 5500}`,
          description: "Local development",
        },
      ];

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: servers,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {},
  },
  apis: docPaths,
};

const swaggerSpec = swaggerJsdoc(options);

// 🔹 Explicit typing: only Express allowed
export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
