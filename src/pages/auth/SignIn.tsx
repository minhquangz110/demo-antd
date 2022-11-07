import { Form, Input, Button, Checkbox, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../../services/accounts";
import { AuthService } from "../../services/auth";

export const SignIn = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (value: any) => {
    const res = await AuthService.login(value);
   

    if (res.success) {
      message.success({ content: "Success" });
      navigate("/main");
    } else {
      message.error({ content: res.message });
    }
  };
  return (
    <>
      {" "}
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name="signin"
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2 className="text-center">Sign in</h2>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input size="large" placeholder="User Name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Row>
            <Col span={12}>
              <Checkbox>Remember me</Checkbox>
            </Col>
            <Col span={12}>
              <div className="text-center" onClick={() => {}}>
                Don't have an account?{" "}
                <Link to="/auth/signup">Sign up now.</Link>
              </div>
            </Col>
          </Row>
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" shape="round">
          Submit
        </Button>
      </Form>
    </>
  );
};
