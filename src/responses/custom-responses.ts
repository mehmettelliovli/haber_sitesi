import { IResult } from 'src/user/interface/result.interface';

export function CustomResponse<T>(
  message: string,
  resultCode: number,
  payload?: T,
): IResult<T> {
  return {
    resultCode,
    message,
    payload,
  };
}
