import { Logger } from "@libs/core/Logger";
import { IAPIGatewayEvent } from "@libs/interface/IAPIGatewayEvent";
import { SendDataOBORequest } from "@type/send_data_obo_request";
import { OBOGateway } from "@gateway/OBOGateway";
import { SendDataOBOResponse } from "@type/send_data_obo_response";

export class FormService {
  private readonly _oboGateway: OBOGateway;

  constructor(private readonly _logger: Logger) {
    this._oboGateway = new OBOGateway(_logger);
  }

  public async sendDataOBO(
    event: IAPIGatewayEvent<SendDataOBORequest>
  ): Promise<SendDataOBOResponse> {
    this._logger.info("Estoy en el servicio");

    const bodyRecibido: SendDataOBORequest = event.body;

    this._logger.info("BODY", event.body);

    const response: SendDataOBOResponse = await this._oboGateway.sendDataOBO(
      bodyRecibido
    );

    // agregar más lógica sobre la respuesta y retornar lo que sea necesario

    return response;
  }
}
