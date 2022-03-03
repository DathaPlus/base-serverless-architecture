import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';

import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import {Logger} from "@libs/Logger";
import {HelloService} from "../../service/HelloService";
import {PokemonApiResponse} from "../../model/PokemonApiResponse";

const hello: ValidatedEventAPIGatewayProxyEvent<object> = async (event: any) => {
    const logger: Logger = new Logger;
    const helloService = new HelloService(logger);

    const response: PokemonApiResponse = await helloService.getAllPokemon(event);

    return formatJSONResponse(response);
};

export const main = middy<any, any>(hello)
    .use(middyJsonBodyParser());
