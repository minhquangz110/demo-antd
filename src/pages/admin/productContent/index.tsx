import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Logo from "../../../assets/images/avatar.jpg";
import { ModalProduct } from "../../../components/modalProduct";
import { IProduct } from "../../../models/product";
import { productService } from "../../../services/products";
import "./styles.less";
const delHandle = async (id: string) => {
  const result = await productService.del(id);
  if (result.success) {
    message.info("Success");
  }
};

export const ProductContent = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 10,
    searchValue: "",
  });

  const [total, setTotal] = useState(0);
  const [modalProductParams, setmodalProductParams] = useState<any>({
    type: "add",
    data: null,
  });
  const [open, setModalOpen] = useState(false);

  const fetch = useCallback(async () => {
    const result = await productService.getProducts(page);
    if (result.success) {
      setData(result.data.data);
      setTotal(result.data.count);
    }
  }, [page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const openParams = {
    open: open,
    setModalOpen: setModalOpen,
  };
  const onSearch = (value: string) => {
    setPage({ ...page, searchValue: value });
  };
  const editHandle = (id: string) => {};

  const pagination = (pageValue: number, limit: number) => {
    setPage({ ...page, page: pageValue, limit: limit });
  };

  const columns: ColumnsType<IProduct> = useMemo(() => {
    return [
      {
        title: "",
        key: "_id",
        width: 90,
        render: (_, { imgs }) => {
          return <img src={imgs[0]} alt="" />;
        },
      },

      {
        title: <p className=" header-table">Name</p>,
        key: "_id",
        dataIndex: "name",

        render: (name) => (
          <Tooltip placement="topLeft" title={name}>
            {name}
          </Tooltip>
        ),
      },
      {
        title: <p className="  header-table">Description</p>,
        key: "_id",

        dataIndex: "description",
        ellipsis: {
          showTitle: false,
        },
        render: (description) => (
          <Tooltip placement="topLeft" title={description}>
            {description}
          </Tooltip>
        ),
      },
      {
        title: <p className=" header-table">Old Price</p>,
        key: "_id",

        dataIndex: "oldPrice",
        render: (text) => <p className=" ">{text}</p>,
      },
      {
        title: <p className="  header-table">Price</p>,
        key: "_id",

        dataIndex: "price",
        render: (text) => <p className="">{text}</p>,
      },

      {
        title: <p className="header-table">Action</p>,
        key: "_id",
        width: 220,
        dataIndex: "_id",
        render: (id, record) => {
          return (
            <Space>
              <Button
                className="btn-edit"
                onClick={() => {
                  setmodalProductParams({
                    data: record,
                    type: "edit",
                  });
                  setModalOpen(true);
                  editHandle(id);
                }}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
              <Popconfirm
                placement="left"
                title="Are you sure to delete"
                onConfirm={() => {
                  delHandle(id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button className="btn-del" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Row className="product-content-wrapper" gutter={[0, 14]}>
      <h2 className="title">Products</h2>
      <Col span={24} className="flex-end">
        <ModalProduct {...openParams} {...modalProductParams} />
        <Space size={30}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 250 }}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setModalOpen(true);
              setmodalProductParams({ type: "add", data: null });
            }}
          >
            Add Product
          </Button>
        </Space>
      </Col>

      <Col span={24}>
        <div className="product-table-container">
          <Table
            scroll={{ y: 490 }}
            columns={columns}
            rowKey={"_id"}
            pagination={false}
            dataSource={data}
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
