import Search from "antd/lib/input/Search";
import "./styles.less";
import { useCallback, useEffect, useState } from "react";
import { productService } from "../../services/products";
import { Col, Row } from "antd";
import { ProductWidget } from "../productWidget";
import { IProduct } from "../../models/product";
import { useNavigate } from "react-router-dom";

export const SearchProduct = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<IProduct[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();
  const onSearch = () => {
    navigate(`/main/shop?keyword=${value}`);
  };
  const onChange = (text: string) => {
    setValue(text);
  };

  const fetchData = useCallback(async () => {
    if (value !== "") {
      const res = await productService.getProducts({
        page: 1,
        limit: 5,
        searchValue: value,
      });
      if (res.success) {
        setData(res.data.data);
      }
    }
  }, [value]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="search-wrapper">
      {value.length > 0 && isFocus && (
        <Row className="result-search">
          {data.map((product) => {
            return (
              <Col span={24} key={product._id} className="product-item">
                <ProductWidget {...product} />
              </Col>
            );
          })}
        </Row>
      )}

      <Search
        size="middle"
        className="search-input"
        placeholder="Search..."
        value={value}
        bordered={false}
        onSearch={onSearch}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsFocus(false);
          }, 100);
        }}
        onChange={(value) => {
          onChange(value.target.value);
        }}
      />
    </div>
  );
};
