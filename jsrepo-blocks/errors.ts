/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

export enum SdkErrorKey {
  DELIVERY_OUT_OF_RANGE = "DELIVERY_OUT_OF_RANGE",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export class SdkError extends Error {
  public readonly key: SdkErrorKey;
  public readonly details?: any;

  constructor(key: SdkErrorKey, message: string, details?: any) {
    super(message);
    this.name = "SdkError";
    this.key = key;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SdkError);
    }
  }
}
