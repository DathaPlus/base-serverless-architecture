import { Fetch } from "@libs/core/Fetch";
import { Logger } from "@libs/core/Logger";
import { SendDataOBORequest } from "@type/send_data_obo_request";
import { SendDataOBOResponse } from "@type/send_data_obo_response";

export class OBOGateway {
  private readonly _fetch: Fetch;
  private readonly _oboBaseUrl: string = "https://www.some-external-service/";

  constructor(private readonly _logger: Logger) {
    this._fetch = new Fetch(this._logger);
  }

  public sendDataOBO(data: SendDataOBORequest): Promise<SendDataOBOResponse> {
    const sendDataPath: string = "send-data";

    const formData: URLSearchParams = new URLSearchParams();
    formData.append("inputs", OBOGateway.getFormDataFromObject(data));

    return this._fetch.call<SendDataOBOResponse>(
      this._oboBaseUrl + sendDataPath,
      {
        method: "POST",
        body: formData,
      }
    );
  }

  private static getFormDataFromObject(myObj): string {
    let bodyString: string = JSON.stringify(myObj);
    let firstPart: string = bodyString.slice(1 - bodyString.length);
    let bodyWithoutLastCharacter: string = firstPart.slice(0, -1);
    return `[${bodyWithoutLastCharacter}]`;
  }
}
