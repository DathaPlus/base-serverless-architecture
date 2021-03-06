import { handlerPath } from "@libs/core/HandlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/Handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "hello",
        request: {
          schemas: {
            "application/json": "${file(./src/schema/hello_request.json)}",
          },
        },
      },
    },
  ],
};
