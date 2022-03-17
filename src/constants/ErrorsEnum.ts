/**
 * Error Enum Base
 */

import { DathaplusErrors } from "@libs/core/DathaplusError";
import { StatusCodeEnum } from "@libs/core/StatusCodeEnum";

export enum ErrorCodeCore {
  EBSA001 = "EBSA001",
  EBSA002 = "EBSA002",
  EBSA003 = "EBSA003",
}

export const ERRORS: DathaplusErrors = {
  [ErrorCodeCore.EBSA001]: {
    code: ErrorCodeCore.EBSA001,
    message: "Houston, tenemos un problema!",
    statusCode: StatusCodeEnum.InternalServerError,
  },
  [ErrorCodeCore.EBSA002]: {
    code: ErrorCodeCore.EBSA002,
    message: "Cuerpo de la petición inválido.",
    statusCode: StatusCodeEnum.BadRequest,
  },
  [ErrorCodeCore.EBSA003]: {
    code: ErrorCodeCore.EBSA003,
    message: "Acción prohibida",
    statusCode: StatusCodeEnum.Forbidden,
  },
};
