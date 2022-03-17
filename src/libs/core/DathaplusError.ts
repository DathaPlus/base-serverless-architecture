import { ErrorCodeCore } from "../../constants/ErrorsEnum";
import { StatusCodeEnum } from "@libs/core/StatusCodeEnum";

export interface IDathaplusErrorAttr<
  T extends string = ErrorCodeCore,
  V = StatusCodeEnum
> {
  code: T;
  message: string;
  statusCode: V;
}

export type DathaplusErrors<
  T extends string = ErrorCodeCore,
  V = StatusCodeEnum
> = { [k in T]: IDathaplusErrorAttr<T, V> };

export class DathaplusError<
  T extends string = ErrorCodeCore,
  V = StatusCodeEnum
> extends Error {
  public readonly code: string;

  private readonly _error: IDathaplusErrorAttr<T, V>;
  private readonly _message: string;
  private readonly _metadata: object;

  constructor(
    error: IDathaplusErrorAttr<T, V>,
    msg?: string,
    metadata?: object
  ) {
    super();
    this._message = msg || error.message;
    this._metadata = metadata;
    this._error = error;
    this.code = error.code;
    Error.captureStackTrace(this, DathaplusError);
  }

  public get message(): string {
    return JSON.stringify({
      code: this.code,
      message: this._message,
      metadata: this._metadata,
      name: this.name,
      statusCode: this.getStatusCode(),
    });
  }

  public getStatusCode(): V {
    return this._error.statusCode;
  }

  public get metadata(): object {
    return this._metadata;
  }

  public get simpleMessage(): string {
    return this._message;
  }
}
