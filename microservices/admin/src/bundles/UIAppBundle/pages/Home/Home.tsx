import { useState } from "react";
import { Link } from "react-router-dom";
import { useGuardian, useRouter } from "@bluelibs/x-ui";
import {
  LogoutOutlined,
  FileAddOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import { Button, Space, Row, Col, Card, Input } from "antd";
import { TodosCard } from "./TodosCard";

export function Home() {
  const guardian = useGuardian();
  const router = useRouter();
  const style = { minHeight: "100vh" };

  const initialNewTodo = {
    title: "",
    description: "",
    checked: false,
  };

  const [newTodo, setNewTodo] = useState(initialNewTodo);
  const [submittedNewTodo, setSubmittedNewTodo] = useState(newTodo);

  const handleTitleChange = (e) => {
    setNewTodo((prevNewTodo) => ({
      ...prevNewTodo,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setNewTodo((prevNewTodo) => ({
      ...prevNewTodo,
      description: e.target.value,
    }));
  };

  const emptyNewTodoFieldsHandler = () => {
    setSubmittedNewTodo(initialNewTodo);
  };

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
              <Card title="Add a new task">
                <Input
                  placeholder="Enter title of todo"
                  size="small"
                  allowClear
                  value={newTodo.title}
                  onChange={handleTitleChange.bind(this)}
                ></Input>
                <Input.TextArea
                  placeholder="Enter description of todo"
                  size="large"
                  showCount
                  allowClear
                  value={newTodo.description}
                  onChange={handleDescriptionChange.bind(this)}
                ></Input.TextArea>
                <br />
                <Button
                  icon={<FileAddOutlined />}
                  style={{
                    color: "#fff",
                    backgroundColor: "#3055c2",
                  }}
                  onClick={() => {
                    setSubmittedNewTodo(newTodo);
                    setNewTodo(initialNewTodo);
                  }}
                >
                  Submit
                </Button>
              </Card>
              <br />
              <TodosCard
                userId={guardian.state.user._id.toLocaleString()}
                additionalTodo={submittedNewTodo}
                postAdditionHandler={emptyNewTodoFieldsHandler}
              />
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
