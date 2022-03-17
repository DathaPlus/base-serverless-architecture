import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/core/ApiGateway";
import { formatJSONResponse } from "@libs/core/ApiGateway";

import schema from "./schema";
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { HelloService } from "@service/HelloService";
import { Logger } from "@libs/core/Logger";
import { APIGatewayProxyResult } from "aws-lambda";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
): Promise<APIGatewayProxyResult> => {
  const logger: Logger = new Logger();
  const helloService = new HelloService(logger);
  const response = helloService.hello(event);

  return formatJSONResponse(response, 200);
};

export const main = middy<any, any>(hello).use(middyJsonBodyParser());
