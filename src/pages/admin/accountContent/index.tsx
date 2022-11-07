import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModalAccount } from "../../../components/modalAccount";
import { IAccount } from "../../../models/account";
import { accountService } from "../../../services/accounts";
import { AuthService } from "../../../services/auth";
import { AccountDetails } from "../../../types/accounts";

const delHandle = async (id: string) => {
  const result = await accountService.del(id);
  if (result.success) {
    message.info("Success");
  }
};

export const AccountContent = () => {
  const [data, setData] = useState<AccountDetails[]>([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 10,
    searchValue: "",
  });

  const [total, setTotal] = useState(0);
  const [modalAccountParams, setmodalAccountParams] = useState<any>({
    type: "add",
    data: null,
  });
  const [open, setModalOpen] = useState(false);

  const fetch = useCallback(async () => {
    const result = await accountService.getAccounts(page);
    const res = await AuthService.getProfile();
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

  const columns: ColumnsType<AccountDetails> = useMemo(() => {
    return [
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
        title: <p className=" header-table">Email</p>,
        key: "_id",

        dataIndex: "email",
        render: (text) => <p className=" ">{text}</p>,
      },
      {
        title: <p className="  header-table">Phone</p>,
        key: "_id",

        dataIndex: "phone",
        render: (text) => <p className="">{text}</p>,
      },
      {
        title: <p className="  header-table">Address</p>,
        key: "_id",

        dataIndex: "address",
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
                  setmodalAccountParams({
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
    <Row className="account-content-wrapper" gutter={[0, 14]}>
      <h2 className="title">Accounts</h2>
      <Col span={24} className="flex-end">
        <ModalAccount {...openParams} {...modalAccountParams} />
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
              setmodalAccountParams({ type: "add", data: null });
            }}
          >
            Add Account
          </Button>
        </Space>
      </Col>

      <Col span={24}>
        <div className="account-table-container">
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
