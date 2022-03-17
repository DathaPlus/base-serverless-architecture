import { handlerPath } from "@libs/core/HandlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/Handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "obtenerTodosPokemon",
      },
    },
  ],
};
