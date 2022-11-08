import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Dropdown,
  Pagination,
  Row,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ProfileContext } from "../../features/ProfileProvider/profileProvider";
import { IOrder, IOrderDetails } from "../../models/order";
import { orderService } from "../../services/orderService";
import { OrdersData } from "../../types/ordersData";
import { formatDollar } from "../../utils/formatCurrency";

import "./styles.less";
export const OrderList = () => {
  const [data, setData] = useState<OrdersData[]>([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 10,
    searchValue: "",
  });
  const context = useContext(ProfileContext);
  const [total, setTotal] = useState(0);

  const fetch = useCallback(async () => {
    console.log(context);
    if (context && context.value && context.value.username) {
      const result = await orderService.getOrdersByUserName(
        context.value.username,
        page
      );
      console.log(result);
      if (result.success) {
        setData(result.data.data);
        setTotal(result.data.count);
      }
    }
  }, [context, page]);
  const pagination = (pageValue: number, limit: number) => {
    setPage({ ...page, page: pageValue, limit: limit });
  };
  useEffect(() => {
    fetch();
  }, [fetch]);

  const expandedRowRender = (order: any) => {
    const columns2: TableColumnsType<IOrderDetails> = [
      { title: "Name", dataIndex: "name", key: "idProduct" },
      { title: "Quantity", dataIndex: "quantity", key: "idProduct" },
      {
        title: "Price",
        dataIndex: "price",
        key: "idProduct",
        render: (price) => {
          return <span>{formatDollar(Number(price))}</span>;
        },
      },
      {
        title: "SubTotal",
        key: "idProduct",

        render: ({ price, quantity }) => {
          return <span>{formatDollar(price * quantity)}</span>;
        },
      },
    ];

    return (
      <Table
        columns={columns2}
        rowKey={"_id"}
        dataSource={order.orderDetails}
        pagination={false}
      />
    );
  };
  const columns: ColumnsType<IOrder> = useMemo(() => {
    return [
      {
        title: <p className=" header-table">IDAccount</p>,
        key: "_id",
        dataIndex: "username",
        render: (text) => <p>{text}</p>,
      },
      {
        title: <p className=" header-table">Date Buy</p>,
        key: "_id",
        dataIndex: "dateBuy",

        render: (text) => <p>{new Date(text).toDateString()}</p>,
      },
      {
        title: <p className="header-table">Email</p>,
        key: "_id",

        dataIndex: "email",
        render: (text) => <p className="">{text}</p>,
      },
      {
        title: <p className=" header-table">Phone</p>,
        key: "_id",

        dataIndex: "phone",
        render: (text) => <p className="">{text}</p>,
      },
      {
        title: <p className=" header-table">Address</p>,
        key: "_id",

        dataIndex: "address",
        render: (text) => (
          <Tooltip placement="topLeft" className="" title={text}>
            {text}
          </Tooltip>
        ),
      },

      {
        title: <p className="header-table">Action</p>,
        key: "_id",
        width: 220,
        render: (text) => {
          return (
            <Space>
              <Button className="btn-del" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <div className="order-list">
          <Table
            scroll={{ y: 510 }}
            columns={columns}
            rowKey={"_id"}
            pagination={false}
            dataSource={data}
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ["0", "2", "4"],
            }}
          />
        </div>
      </Col>
      <Col span={24} className="flex-center">
        <Pagination
          showSizeChanger
          current={page.page}
          defaultCurrent={1}
          onChange={pagination}
          total={total}
        />
      </Col>
    </Row>
  );
};
