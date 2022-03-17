import { handlerPath } from "@libs/core/HandlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/Handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "sendDataOBO",
        request: {
          schemas: {
            "application/json":
              "${file(./src/schema/send_data_obo_request.json)}",
          },
        },
      },
    },
  ],
};
