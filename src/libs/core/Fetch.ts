import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import { Logger } from "@libs/core/Logger";

export enum ResponseEnum {
  JSON = "json",
  BUFFER = "buffer",
  ARRAY_BUFFER = "arrayBuffer",
  FORMAT_DATA = "formData",
  BLOB = "blob",
  TEXT = "text",
}

export type TResponse =
  | ResponseEnum.JSON
  | ResponseEnum.BUFFER
  | ResponseEnum.ARRAY_BUFFER
  | ResponseEnum.FORMAT_DATA
  | ResponseEnum.BLOB
  | ResponseEnum.TEXT;

export type TAllTypes<T> = T | string | ArrayBuffer | FormData | Buffer;

export class Fetch {
  constructor(private readonly _logger: Logger) {}

  public async call<T extends object | string>(
    url: RequestInfo,
    init?: RequestInit,
    typeResponse?: TResponse
  ): Promise<T> {
    this._logger.info("[FETCH REQUEST]", { url, ...init });

    const response: T = <T>await Fetch._call(url, init, typeResponse);

    this._logger.info("[FETCH RESPONSE]", response as object);

    return response;
  }

  private static async _call<T>(
    url: RequestInfo,
    init?: RequestInit,
    typeResponse?: TResponse
  ): Promise<TAllTypes<T>> {
    const response: Response = await fetch(url, init);

    if (!typeResponse || typeResponse === ResponseEnum.JSON)
      return <T>await response.json();

    if ([ResponseEnum.BUFFER, ResponseEnum.ARRAY_BUFFER].includes(typeResponse))
      return await response.arrayBuffer();

    if ([ResponseEnum.FORMAT_DATA].includes(typeResponse))
      return await response.formData();

    if ([ResponseEnum.BLOB].includes(typeResponse))
      return await response.formData();

    return await response.text();
  }
}
