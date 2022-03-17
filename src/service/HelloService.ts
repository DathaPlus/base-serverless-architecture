import { IAPIGatewayEvent } from "@libs/interface/IAPIGatewayEvent";
import { PokemonGateway } from "@gateway/PokemonGateway";
import { Logger } from "@libs/core/Logger";
import { OctopusGateway } from "@gateway/OctopusGateway";
import { HelloRequest } from "@type/hello_request";
import { SendDataOBORequest } from "@type/send_data_obo_request";
import { OctopusResponse } from "@type/octopus_response";
import { PokemonApiResponse } from "@type/pokemon-api-response";

export class HelloService {
  private readonly _pokemonGateway: PokemonGateway;
  private readonly _octopusGateway: OctopusGateway;

  constructor(private readonly _logger: Logger) {
    this._pokemonGateway = new PokemonGateway(this._logger);
    this._octopusGateway = new OctopusGateway();
  }

  public hello(event: IAPIGatewayEvent<HelloRequest>): {
    message: string;
    event: object;
    moreData: object;
  } {
    const phone: string = event.body.phone;
    const responseOctopus: OctopusResponse =
      this._octopusGateway.getDataByPhone(phone);

    let nuevoDato: SendDataOBORequest;

    nuevoDato.num_documento = "1234";

    return {
      moreData: responseOctopus,
      message: `Hello ${event.body.phone}, welcome to the exciting Serverless world!`,
      event,
    };
  }

  public getAllPokemon = async (
    event: IAPIGatewayEvent<null, null, { limit: number }>
  ): Promise<PokemonApiResponse> => {
    const pokemons: PokemonApiResponse = await this._pokemonGateway.getAll(
      event.queryStringParameters.limit
    );

    this.mappingPokemon();
    // add service logic

    this._logger.info("HelloService | getAllPokemonn");
    return pokemons;
  };

  private mappingPokemon(): void {
    this._logger.info("logic here, logic there");
  }
}
