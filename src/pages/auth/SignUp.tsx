import { Form, Input, Checkbox, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../services/accounts";
import { AuthService } from "../../services/auth";

export const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = async (value: any) => {
    const res = await AuthService.registerAccount(value);

    if (res.success) {
      message.success({ content: "Success" });
      //  navigate("/main");
    } else {
      message.error({ content: res.message });
    }
  };
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      name="signin"
      onFinish={onFinish}
      autoComplete="off"
    >
      <h2 className="text-center">Sign Up</h2>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input your Name!" }]}
      >
        <Input size="large" placeholder="User Name" />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input your User Name!" }]}
      >
        <Input size="large" placeholder="User Name" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          { required: true, message: "Please input your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="agree"
        rules={[{ required: true, message: "Required" }]}
        valuePropName="checked"
      >
        <Checkbox>
          I agree to <a href="#">Terms of Use & Privacy policy</a>
        </Checkbox>
      </Form.Item>
      <Button type="primary" htmlType="submit" size="large" shape="round">
        Submit
      </Button>
    </Form>
  );
};
