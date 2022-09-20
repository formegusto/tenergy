import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ResponseError extends Error {
  statusCode: StatusCodes;

  constructor(statusCode: StatusCodes, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = getReasonPhrase(this.statusCode);
  }
}

export const ServerError = new ResponseError(
  StatusCodes.INTERNAL_SERVER_ERROR,
  "시스템 오류 입니다. 관리자에게 문의해주세요."
);
