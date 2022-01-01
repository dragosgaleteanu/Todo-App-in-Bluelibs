import { Link } from "react-router-dom";
import { useGuardian, useRouter } from "@bluelibs/x-ui";
import {
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import { Button, Space, Row, Col, Card, Input } from "antd";

export function Home() {
  const guardian = useGuardian();
  const router = useRouter();
  const style = { minHeight: "100vh" };

  return (
    <Row justify="center" align="middle" style={style}>
      <Col sm={24} md={16} lg={8}>
        {guardian.state.isLoggedIn && (
          <Card title={`Welcome, ${guardian.state.user.profile.firstName} 👋 `}>
            <p>
              <br />
              <p>
                Down below you have your todos for the near future. Feel free to
                check them as done!
              </p>
              <br />
              <Link
                to={router.path(Routes.TODOS, {
                  params: {
                    token: guardian.state.user._id.toLocaleString(),
                  },
                })}
              >
                <Button
                  icon={<CalendarOutlined />}
                  style={{
                    backgroundColor: "#3055c2",
                    color: "#fff",
                  }}
                >
                  Navigate to your todos
                </Button>
              </Link>
              <br />
            </p>
            <Space>
              <Button
                icon={<LogoutOutlined />}
                style={{
                  backgroundColor: "#e63749",
                  color: "#fff",
                }}
                onClick={() => {
                  guardian.logout();
                }}
              >
                Logout
              </Button>
            </Space>
          </Card>
        )}
        {!guardian.state.isLoggedIn && (
          <Card title={`Welcome to this newly developed Todo App 👋 `}>
            <p>
              <br />
              <p>
                Please login or sign up to have access to an amazingly useful
                tool to help you stay organized with your tasks!
              </p>
              <br />
              <Space>
                <Link to={router.path(Routes.LOGIN)}>
                  <Button
                    icon={<LoginOutlined />}
                    style={{
                      color: "#fff",
                      backgroundColor: "#3055c2",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to={router.path(Routes.REGISTER)}>
                  <Button
                    icon={<UserAddOutlined />}
                    style={{
                      color: "#fff",
                      backgroundColor: "#3055c2",
                    }}
                  >
                    Sign up
                  </Button>
                </Link>
              </Space>
            </p>
          </Card>
        )}
      </Col>
    </Row>
  );
}
