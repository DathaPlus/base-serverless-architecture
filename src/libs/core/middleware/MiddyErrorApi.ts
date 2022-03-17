import middy from "@middy/core";
import MiddlewareObject = middy.MiddlewareObj;
import MiddyRequest = middy.Request;
import { DathaplusError } from "@libs/core/DathaplusError";
import { ERRORS } from "../../../constants/ErrorsEnum";
import { Logger } from "@libs/core/Logger";
import { StatusCodeEnum } from "@libs/core/StatusCodeEnum";

type MiddyErrorApi = (corsOrigin?: string) => MiddlewareObject<any, any>;

function getError(request: MiddyRequest): DathaplusError {
  let error: DathaplusError;

  error =
    request.error instanceof DathaplusError
      ? request.error
      : new DathaplusError(
          { ...ERRORS.EBSA001, code: "EBSA000_NO_ERROR_MAPPED" },
          `NO ERROR MAPPED: ${request.error.message}`
        );

  return error;
}

function getErrorResponse(
  body: object,
  statusCode: number,
  allowOrigin: string
): { body: string; headers: object; statusCode: number } {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Origin": allowOrigin, // Required for CORS support to work
    },
  };
}

const MIDDY_ERROR_API: MiddyErrorApi = (
  corsOrigin: string = "*"
): MiddlewareObject<any, any> => ({
  onError: (request: MiddyRequest) => {
    const LOGGER: Logger = new Logger();
    try {
      LOGGER.error("MIDDLEWARE | ErrorApi | onError - init", request.error);
      const error: DathaplusError = getError(request);
      const errorBodyResponse: {
        code: string;
        message: string;
        metadata: object;
      } = {
        code: error.code,
        message: error.simpleMessage,
        metadata: error.metadata,
      };

      if (!errorBodyResponse.metadata) delete errorBodyResponse.metadata;

      request.response = getErrorResponse(
        errorBodyResponse,
        error.getStatusCode(),
        corsOrigin
      );
      LOGGER.info("MIDDLEWARE | ErrorApi | onError - next", {
        response: request.response,
      });
    } catch (err) {
      LOGGER.error(
        "MIDDLEWARE | ErrorApi | onError - CATCH - STACK: \n" + err.stack
      );
      request.response = getErrorResponse(
        {
          code: "DT+",
          message: "MiddlewareError",
        },
        StatusCodeEnum.InternalServerError,
        corsOrigin
      );
    }
  },
});

export { MIDDY_ERROR_API };
