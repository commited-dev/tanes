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
      responses: {
        UnauthorizedError: {
          description: "Unauthorized - JWT token missing or invalid",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: {
                success: false,
                error: "Unauthorized: No token provided",
              },
            },
          },
        },
        ForbiddenError: {
          description: "Forbidden - insufficient permissions",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: {
                success: false,
                error: "Forbidden: insufficient role",
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: {
                success: false,
                error: "Resource not found",
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: {
                success: false,
                error: "Server Error",
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      "/api/v1/health": {
        get: {
          summary: "Health check",
          description: "Returns API health status",
          responses: {
            "200": {
              description: "API is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ok" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: docPaths,
};

const swaggerSpec = swaggerJsdoc(options);

// 🔹 Explicit typing: only Express allowed
export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
