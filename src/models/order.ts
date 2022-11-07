export interface IOrder {
  _id: string;
  code: string;
  username: string;
  orderDetails: IOrderDetails[];
  creatAt: string;
  address: string;
  email: string;
  phone: string;
  total: number;
}

export interface IOrderDetails {
  idProduct: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}
