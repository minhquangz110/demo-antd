export interface IDataApi<T> {
  success: boolean;
  message: string;
  data: T;
}
