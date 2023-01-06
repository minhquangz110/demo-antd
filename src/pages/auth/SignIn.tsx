import { Form, Input, Button, Checkbox, message, Row, Col } from "antd";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authenticate } from "../../features/auth/authSlice";
import { AuthService } from "../../services/auth";

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const profile = useAppSelector((state) => state.auth.userProfile);
  const onFinish = async (value: any) => {
    const res = await AuthService.login(value);

    if (res.success) {
      message.success({ content: "Success" });
      await dispatch(authenticate());
    } else {
      message.error({ content: res.message });
    }
  };
  useEffect(() => {
    if (profile) {
      if (profile.author === "admin") {
        navigate("/admin");
      } else {
        navigate("/main");
      }
    }
  }, [navigate, profile]);
  return (
    <>
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
          <Row gutter={[12,12]}>
            <Col xs={24} sm={12}>
              <Checkbox>Remember me</Checkbox>
            </Col>
            <Col xs={24} sm={12}>
              <div className="" onClick={() => {}}>
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
