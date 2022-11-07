import { IDataApi } from "./dataApi";

interface IDataListApi<T> {
  data: T;
  count: number;
}
export type DataList<T> = IDataApi<IDataListApi<T>>;
