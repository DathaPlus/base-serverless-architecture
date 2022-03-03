import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';

import schema from './schema';
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import {HelloService} from "../../service/HelloService";
import {Logger} from "@libs/Logger";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
    const logger: Logger = new Logger;
    const helloService = new HelloService(logger);
    const response = helloService.hello(event);

    return formatJSONResponse(response);
};

export const main = middy<any, any>(hello)
    .use(middyJsonBodyParser());
