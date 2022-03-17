import { OctopusResponse } from "@type/octopus_response";

export class OctopusGateway {
  public getDataByPhone(phone: string): OctopusResponse {
    return {
      response: {
        phone,
        name: "Danii Daniel",
        plan: "El más caro de todos",
      },
      status: 200,
    };
  }
}
