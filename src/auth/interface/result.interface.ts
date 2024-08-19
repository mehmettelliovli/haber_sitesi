export interface IResult<ResultType> {
  resultCode: number;
  message: string;
  payload?: ResultType;
}
