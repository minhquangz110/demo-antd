import { IOrder, IOrderDetails } from "../models/order";

export type OrdersData = IOrder & { orderDetails: IOrderDetails[] };
