import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useRef } from "react";
import { IProduct } from "../../models/product";
import { productService } from "../../services/products";
import "./styles.less";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const ModalProduct = (props: {
  open: boolean;
  setModalOpen: any;
  type: string;
  data?: IProduct;
}) => {
  const { open = false, setModalOpen, type = "add", data } = props;
  const formRef = useRef<any>(null);
  const uploadRef = useRef<any>(null);

  const onSubmit = async () => {
    formRef.current.submit();
  };

  const [form] = Form.useForm();

  const onFinish = async (product: IProduct) => {
    if (type === "add") {
      const res = await productService.createProduct(product);
      if (res.success) {
        message.success("Success");
      }
    }
    if (type === "edit") {
      const res = await productService.editProduct(product, product.imgs);
      if (res.success) {
        message.success("Success");
      }
    }
    setModalOpen(false);
  };
  useEffect(() => {
    form.resetFields();
    if (type === "edit") {
      form.setFieldsValue(data);
      const result = data?.imgs.map((img, index) => {
        return {
          uid: index,
          name: "image.png",
          status: "done",
          url: img,
        };
      });
      form.setFieldValue("imgs", result);
    }
  }, [data, form, type]);

  return (
    <Modal
      className="modal-product-wrapper"
      width={700}
      title={
        <h2 className="text-center title">
          {type === "add" ? "Add Product" : "Edit Product"}
        </h2>
      }
      centered
      open={open}
      onOk={() => onSubmit()}
      onCancel={() => {
        setModalOpen(false);
      }}
    >
      <Form
        ref={formRef}
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="form-proudct-wrapper"
      >
        <Form.Item hidden label="Id" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Old Price" name="oldPrice">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <Form.Item
          label="Image"
          name="imgs"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            ref={uploadRef}
            beforeUpload={() => false}
            listType="picture-card"
            multiple={true}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
