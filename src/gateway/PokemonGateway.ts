import { Logger } from "@libs/core/Logger";
import { PokemonApiResponse } from "../model/PokemonApiResponse";
import { Fetch } from "@libs/core/Fetch";

export class PokemonGateway {
  private readonly _fetch: Fetch;
  private readonly _pokemonUrl: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private readonly _logger: Logger) {
    this._fetch = new Fetch(this._logger);
  }

  public getAll(limit: number): Promise<PokemonApiResponse> {
    this._logger.info("PokemonGateway | getAll");

    return this._fetch.call<PokemonApiResponse>(
      `${this._pokemonUrl}?limit=${limit}`,
      {
        method: "GET",
      }
    );
  }
}
