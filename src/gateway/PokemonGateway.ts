import fetch, {Response} from "node-fetch";
import {Logger} from "@libs/Logger";
import {PokemonApiResponse} from "../model/PokemonApiResponse";

export class PokemonGateway {
    private readonly _pokemonUrl: string = "https://pokeapi.co/api/v2/pokemon";

    constructor(private readonly _logger: Logger) {
    }

    public async getAll(limit: number): Promise<PokemonApiResponse> {
        const response: Response = await fetch(`${this._pokemonUrl}?limit=${limit}`, {
            method: "GET"
        });

        const pokemons: PokemonApiResponse = <PokemonApiResponse>await response.json();

        this._logger.info("Response", pokemons);
        // add magic before returning data

        this._logger.info("PokemonGateway | getAll");
        return pokemons;
    }
}