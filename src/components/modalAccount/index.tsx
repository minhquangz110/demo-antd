import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useRef } from "react";

import { accountService } from "../../services/accounts";
import { AuthService } from "../../services/auth";
import { AccountDetails } from "../../types/accounts";

import "./styles.less";

export const ModalAccount = (props: {
  open: boolean;
  setModalOpen: any;
  type: string;
  data?: AccountDetails;
}) => {
  const { open = false, setModalOpen, type = "add", data } = props;
  const formRef = useRef<any>(null);

  const onSubmit = async () => {
    formRef.current.submit();
  };

  const [form] = Form.useForm();

  const onFinish = async (account: AccountDetails) => {
    if (type === "add") {
      const res = await AuthService.registerAccount(account);
      if (res.success) {
        message.success("Success");
      }
    }
    if (type === "edit") {
      const res = await accountService.update(account);
      if (res.success) {
        message.success("Success");
      }
    }
    setModalOpen(false);
  };
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(data);
    // if (type === "edit") {
    //   form.setFieldsValue(data);
    //   const result = data?.imgs.map((img, index) => {
    //     return {
    //       uid: index,
    //       name: "image.png",
    //       status: "done",
    //       url: img,
    //     };
    //   });
    //   form.setFieldValue("imgs", result);
    // }
  }, [data, form, type]);

  return (
    <Modal
      className="modal-account-wrapper"
      width={700}
      title={
        <h2 className="text-center title">
          {type === "add" ? "Add Account" : "Edit Account"}
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
        wrapperCol={{ span: 19 }}
        className="form-proudct-wrapper"
      >
        <Form.Item hidden label="Id" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="User Name" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        {/* <Form.Item
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
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
