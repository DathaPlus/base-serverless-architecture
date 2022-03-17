// IAPIGatewayEvent.ts
/**
 * AWS Api Gateway Event
 */

export interface IGenericHeaders {
  [name: string]: string;
}

/**
 * Handle an incoming request.
 *
 * @template T
 *
 * @param {object} BODY - is body
 * @param {object} PATH_PARAMS - is pathParameters
 * @param {object} QUERY_STRING_PARAMS - is queryStringParameters
 * @param {object} REQUEST_CONTEXT - is requestContext object
 * @param {object} HEADERS - is headers
 */
export interface IAPIGatewayEvent<
  BODY = undefined,
  PATH_PARAMS = undefined,
  QUERY_STRING_PARAMS = undefined,
  REQUEST_CONTEXT = undefined,
  HEADERS = IGenericHeaders
> {
  requestContext: IRequestContext<REQUEST_CONTEXT>;
  body: BODY;
  headers: HEADERS;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: PATH_PARAMS;
  queryStringParameters: QUERY_STRING_PARAMS;
  stageVariables: { [name: string]: string } | null;
  resource: string;
  methodArn: string;
}

export interface IRequestContext<X> {
  accountId?: string;
  apiId?: string;
  httpMethod?: string;
  identity?: {
    accessKey: string | null;
    accountId: string | null;
    apiKey: string | null;
    caller: string | null;
    cognitoAuthenticationProvider: string | null;
    cognitoAuthenticationType: string | null;
    cognitoIdentityId: string | null;
    cognitoIdentityPoolId: string | null;
    sourceIp: string;
    user: string | null;
    userAgent: string | null;
    userArn: string | null;
  };
  stage?: string;
  requestId?: string;
  resourceId?: string;
  resourcePath?: string;
  authorizer: X;
}
