import { Col, Divider, Pagination, Row, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Product } from "../../components/product";
import { IProduct } from "../../models/product";
import { productService } from "../../services/products";
import "./styles.less";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const Shop = () => {
  
  const query = useQuery();

  const [total, setTotal] = useState(0);
  const [data, setData] = useState<IProduct[]>([]);
  const [page, setPage] = useState({
    page: Number(query.get("page") ?? 1),
    limit: Number(query.get("limit") ?? 12),
    searchValue: query.get("keyword") ?? "",
    sortPrice: "1",
  });

  const fetch = useCallback(async () => {
    const res = await productService.getProducts(page);
    if (res.success) {
      setData(res.data.data);
      setTotal(res.data.count);
    }
  }, [page]);

  useEffect(() => {
    setPage({
      page: Number(query.get("page") ?? 1),
      limit: Number(query.get("limit") ?? 12),
      searchValue: query.get("keyword") ?? "",
      sortPrice: "1",
    });
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const pagination = (pageValue: number) => {
    setPage({ ...page, page: pageValue });
  };
  const handleChangePageSize = (value: any) => {
    setPage({ ...page, limit: value });
  };
  const handleChangeSortPrice = (value: string) => {
    setPage({ ...page, sortPrice: value });
  };
  return (
    <div className="shop-wrapper">
      <div className="container">
        <div className="sticky-header">
          <Space size={14} className="toolbox">
            <span>Sort by:</span>
            <Select
              defaultValue={"1"}
              style={{ width: 120 }}
              onChange={handleChangeSortPrice}
            >
              <Select.Option value={"1"}>Lowest price</Select.Option>
              <Select.Option value={"-1"}>Highest price</Select.Option>
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
              <Col key={p._id} className="gutter-row" md={6} xs={12} sm={8}>
                <Product {...p} />
              </Col>
            );
          })}
        </Row>
        <Row justify="center">
          <Pagination
            current={page.page}
            defaultCurrent={1}
            pageSize={page.limit}
            onChange={pagination}
            total={total}
          />
        </Row>
      </div>
    </div>
  );
};
