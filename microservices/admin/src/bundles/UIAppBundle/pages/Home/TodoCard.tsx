import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Space } from "antd";

export function TodoCard(props) {
  return (
    <Card
      title={props.title}
      style={{
        backgroundColor: props.checked === true ? "#ff6105" : "#fff",
      }}
    >
      <Checkbox
        onChange={() => {
          props.editHandler(props.index, !props.checked);
        }}
      >
        {props.checked === false ? "Due" : "Done"}
      </Checkbox>
      <br />
      <br />
      <Space>
        <p>{props.description}</p>
      </Space>
      <br />
      <Button
        icon={<DeleteOutlined />}
        style={{
          backgroundColor: "#e63749",
          color: "#fff",
        }}
        onClick={() => {
          props.deleteHandler(props.title, props.description, props.checked);
        }}
      >
        Remove Todo
      </Button>
    </Card>
  );
}
