import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi/dist/openapi-registry";
import { z } from "./zod";

const defaultResponses = {
  401: {
    description: "Unauthorized error",
    content: {
      "application/json": {
        schema: z.object({
          statusCode: z.number().default(401),
          message: z.string().default("Credenciais inválidas."),
        }),
      },
    },
  },
  404: {
    description: "Not found error",
    content: {
      "application/json": {
        schema: z.object({
          statusCode: z.number().default(404),
          message: z.string().default("[Mensagem de recurso não encontrado]"),
        }),
      },
    },
  },
  422: {
    description: "Unprocessable entity error",
    content: {
      "application/json": {
        schema: z.object({
          statusCode: z.number().default(422),
          errors: z.array(
            z.string().default("[Mensagem de erro de validação]")
          ),
        }),
      },
    },
  },
  500: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: z.object({
          statusCode: z.number().default(500),
          message: z.string().default("Internal server error - [message]"),
        }),
      },
    },
  },
};

class CustomOpenAPIRegistry extends OpenAPIRegistry {
  registerPath(config: RouteConfig) {
    const mergedResponses = {
      ...defaultResponses,
      ...(config.responses || {}),
    };

    super.registerPath({
      ...config,
      responses: mergedResponses,
    });
  }
}

const registry = new CustomOpenAPIRegistry();

type ApiDocProps = CustomOpenAPIRegistry;
export const ApiDoc: ApiDocProps = registry as ApiDocProps;
