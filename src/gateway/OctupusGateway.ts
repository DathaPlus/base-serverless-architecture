import {OctupusResponse} from "../model/OctupusResponse";

export class OctupusGateway {
    public getDataByPhone(phone: string): OctupusResponse {
        return {
          response: {
              phone,
              name: "Danii Daniel",
              plan: "El más caro de todos"
          },
            status: 200
        };
    }
}
