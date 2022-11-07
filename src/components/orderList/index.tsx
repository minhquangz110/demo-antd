import Table, { ColumnsType } from "antd/lib/table";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ICartItem } from "../../features/cart/cartSlice";
import { CartItemImage } from "../cartItemImage";
import "./styles.less";
export const OrderList = () => {
  const cart = useAppSelector((state) => state.cart);

  const columns: ColumnsType<ICartItem> = useMemo(() => {
    return [
      {
        title: "",
        key: "id",
        width: 112,
        render: (_, { _id, imgs }) => {
          return <CartItemImage id={_id} img={imgs[0]} />;
        },
      },

      {
        title: <p className="title-table">Product</p>,
        key: "id",
        dataIndex: "name",
        render: (text) => <p>{text}</p>,
      },
      {
        title: <p className="title-table">Price</p>,
        key: "id",
        dataIndex: "price",
        render: (text) => <p>{text}</p>,
      },
      {
        title: <p className="title-table">Quantity</p>,
        key: "id",
        dataIndex: "quantity",
        render: (text) => <p>{text}</p>,
      },

      {
        title: <p className="title-table">Action</p>,
        key: "id",
        dataIndex: "subtotal",
        render: (text) => {
          return <p className="item_subtotal">{text}</p>;
        },
      },
    ];
  }, []);

  return (
    <Table
      scroll={{ y: 450 }}
      columns={columns}
      rowKey={"id"}
      dataSource={cart}
      pagination={false}
      className="order-list"
    />
  );
};
