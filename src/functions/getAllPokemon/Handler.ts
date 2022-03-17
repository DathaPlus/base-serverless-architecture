import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/core/ApiGateway";
import { formatJSONResponse } from "@libs/core/ApiGateway";

import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { Logger } from "@libs/core/Logger";
import { HelloService } from "@service/HelloService";
import { PokemonApiResponse } from "../../model/PokemonApiResponse";
import { APIGatewayProxyResult } from "aws-lambda";

const lambda: ValidatedEventAPIGatewayProxyEvent<object> = async (
  event: any
): Promise<APIGatewayProxyResult> => {
  const logger: Logger = new Logger();
  const helloService = new HelloService(logger);

  const response: PokemonApiResponse = await helloService.getAllPokemon(event);

  return formatJSONResponse(response, 200);
};

export const main = middy<any, any>(lambda).use(middyJsonBodyParser());
