import {IAPIGatewayEvent} from "../type/IAPIGatewayEvent";
import {PokemonGateway} from "../gateway/PokemonGateway";
import {Logger} from "@libs/Logger";
import {PokemonApiResponse} from "../model/PokemonApiResponse";
import {IHelloRequest} from "../model/HelloRequest";
import {OctupusGateway} from "../gateway/OctupusGateway";
import {OctupusResponse} from "../model/OctupusResponse";

export class HelloService {
    constructor(private readonly _logger: Logger) {}

    public hello(event: IAPIGatewayEvent<IHelloRequest>): { message: string, event: object, moreData: object } {
        const phone: string = event.body.phone;
        const octupusGateway: OctupusGateway = new OctupusGateway();
        const responseOctupus: OctupusResponse = octupusGateway.getDataByPhone(phone);

        return {
            moreData: responseOctupus,
            message: `Hello ${event.body.phone}, welcome to the exciting Serverless world!`,
            event,
        };
    }

    public getAllPokemon = async (event: IAPIGatewayEvent<null, null, { limit: number }>): Promise<PokemonApiResponse> => {
        const pokemonGateway: PokemonGateway = new PokemonGateway(this._logger);

        const pokemons: PokemonApiResponse = await pokemonGateway.getAll(event.queryStringParameters.limit);

        this.mappingPokemon();
        // add service logic

        this._logger.info("HelloService | getAllPokemonn");
        return pokemons;
    };

    private mappingPokemon(): void {
        this._logger.info("logic here, logic there");
    }
}