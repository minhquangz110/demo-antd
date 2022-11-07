import * as request from "../utils/request";
import { v4 as uuidv4 } from "uuid";

import { IDataApi } from "../types/dataApi";
import { DataList } from "../types/dataListApi";
import jwtDecode from "jwt-decode";
import { getToken, setProfile, setToken } from "../persist/localstorage";
import { IOrder, IOrderDetails } from "../models/order";
import { OrdersData } from "../types/ordersData";

export class orderService {
  static async getOrders(page?: {
    page: number;
    limit: number;
  }): Promise<DataList<OrdersData[]>> {
    const result = await request.get("orders", page);
    return result;
  }
  static async getOrdersByUserName(
    username: string,
    page?: {
      page: number;
      limit: number;
    }
  ): Promise<DataList<OrdersData[]>> {
    const req = { ...page, username: username };
    const result = await request.get("orders", req);
    return result;
  }
  static async del(id: string): Promise<IDataApi<string>> {
    const _id = { id: id };
    const result = await request.del("orders", _id);
    return result;
  }

  static async createOrder(
    order: IOrder,
    orderDetails: any[]
  ): Promise<IDataApi<IOrderDetails>> {
    // const pathsRes = await request.upload("orders/upload", order.imgs);

    // if (pathsRes.success === true) {
    //   order.imgs = pathsRes.data;
    // }
    const req = { ...order, orderDetails: orderDetails };
    return await request.post("orders", req);
  }
  static async editOrder(
    order: IOrderDetails
  ): Promise<IDataApi<IOrderDetails>> {
    return await request.put("orders", order);
  }
}
