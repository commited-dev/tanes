declare module "swagger-ui-express" {
  import { Express, RequestHandler } from "express";

  interface SwaggerUiOptions {
    explorer?: boolean;
    customCss?: string;
    customCssUrl?: string;
    customJs?: string;
    customfavIcon?: string;
    swaggerUrl?: string;
    swaggerOptions?: Record<string, unknown>;
  }

  export function setup(
    swaggerDoc: object,
    options?: SwaggerUiOptions
  ): RequestHandler;

  export const serve: RequestHandler[];

  // 🔹 Stronger typing for integration
  export function setupSwagger(
    app: Express,
    swaggerDoc: object,
    options?: SwaggerUiOptions
  ): void;
}
