import { Col, Divider, Pagination, Row, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../../components/product";
import { IProduct } from "../../models/product";
import { productService } from "../../services/products";
import "./styles.less";
export const Shop = () => {
  const handleChange = (value: any) => {
  
  };
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<IProduct[]>([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 12,
    searchValue: "",
  });

  const fetch = useCallback(async () => {
    const res = await productService.getProducts(page);
    if (res.success) {
  
      setData(res.data.data);
      setTotal(res.data.count);
    }
  }, [page]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  const pagination = (pageValue: number) => {
    setPage({ ...page, page: pageValue });
  };
  const handleChangePageSize = (value: any) => {
    setPage({ ...page, limit: value });
  };
  return (
    <div className="shop-wrapper">
      <div className="container">
        <div className="sticky-header">
          <Space size={14} className="toolbox">
            <span>Sort by:</span>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="disabled" disabled>
                Disabled
              </Select.Option>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
          </Space>
          <Space size={14} className="toolbox">
            <span>Show:</span>
            <Select
              defaultValue={page.limit}
              style={{ width: 60 }}
              onChange={handleChangePageSize}
            >
              <Select.Option value="12">12</Select.Option>
              <Select.Option value="24">24</Select.Option>
            </Select>
          </Space>
        </div>
        <Row gutter={[20, 30]} wrap>
          {data.map((p: IProduct) => {
       
            return (
              <Col key={p._id} className="gutter-row" span={6}>
                <Product {...p} />
              </Col>
            );
          })}
        </Row>
        <Row justify="center">
          <Pagination
            current={page.page}
            defaultCurrent={1}
            onChange={pagination}
            total={total}
          />
        </Row>
      </div>
    </div>
  );
};
