import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/core/ApiGateway";
import { formatJSONResponse } from "@libs/core/ApiGateway";

import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { Logger } from "@libs/core/Logger";
import { APIGatewayProxyResult } from "aws-lambda";
import { FormService } from "@service/FormService";
import { SendDataOBOResponse } from "@type/send_data_obo_response";
import { MIDDY_ERROR_API } from "@libs/core/middleware/MiddyErrorApi";

const lambda: ValidatedEventAPIGatewayProxyEvent<object> = async (
  event: any
): Promise<APIGatewayProxyResult> => {
  const logger: Logger = new Logger();
  const formService = new FormService(logger);

  const response: SendDataOBOResponse = await formService.sendDataOBO(event);
  return formatJSONResponse(response, 200);
};

export const main = middy<any, any>(lambda)
  .use(MIDDY_ERROR_API())
  .use(middyJsonBodyParser());
