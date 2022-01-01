import React, { useState } from "react";
import { TodosCard } from "./TodosCard";
import { Button, Card, Col, Input, Row, Form, notification } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { use } from "@bluelibs/x-ui";
import { TodoService } from "@bundles/UIAppBundle/services/Todo.service";

export function Todos(props: { token: string }) {
  const token = props.token;
  const style = { minHeight: "100vh" };
  const todoService = use(TodoService);

  const [form] = Form.useForm();
  const [changedCollectionState, setChangedCollectionState] = useState(false);

  const onFinish = (values: { title: string; description: string }) => {
    todoService
      .insert({
        title: values.title,
        description: values.description,
      })
      .then((data) => {
        notification.success({
          message: "Todo has been successfully added!",
        });
        setChangedCollectionState(true);
      })
      .catch((err) => {
        console.error(err.message);
      });

    onReset();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const resetCollectionChangingState = () => {
    setChangedCollectionState(false);
  };

  return (
    <Row justify="center" align="middle" style={style}>
      <Col sm={24} md={16} lg={18}>
        <Card>
          <Card title="Add a new task">
            <Form
              name="new-todo"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onReset={onReset}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input todo's title!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input todo's description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  icon={<FileAddOutlined />}
                  style={{
                    color: "#fff",
                    backgroundColor: "#2629c9",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <TodosCard
            userId={token}
            collectionStateChanged={changedCollectionState}
            resetStateHandler={resetCollectionChangingState}
          />
        </Card>
      </Col>
    </Row>
  );
}
