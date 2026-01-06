import React from "react";
import { Form, Input, Button, Card, Typography, message, ConfigProvider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "./api/authApi";

const { Title, Text } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data } = await login(values);

     if (data.autoSelected) {
  localStorage.setItem("token", data.token);

  // ✅ STORE REAL LOGGED-IN USER DATA
  localStorage.setItem(
    "user",
    JSON.stringify({
      email: values.email,              // <-- REAL LOGIN EMAIL
      role: data.company.role,          // Admin
      permissions: data.permissions,    // ["PROJECT_VIEW"]
    })
  );

  // ✅ NOTIFY HEADER / SIDENAV
  window.dispatchEvent(new Event("userDataUpdated"));

  navigate("/dashboard");
}
 else {
        localStorage.setItem("tempUser", JSON.stringify(data));
        navigate("/select-company");
      }
    } catch (err) {
      message.error(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff", borderRadius: 8 } }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card
            bordered={false}
            className="shadow-2xl rounded-2xl"
            style={{ padding: "40px 32px" }}
          >
            <div className="text-center mb-6">
              <img src="/logo.jpg" alt="Logo" className="h-16 mx-auto mb-4" />
              <Title level={2} className="!mb-1">Welcome Back</Title>
              <Text type="secondary">Sign in to continue</Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              requiredMark={false}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your email"
                  className="h-12 rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  className="h-12 rounded-lg"
                />
              </Form.Item>

              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 rounded-lg text-base font-semibold"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
}
