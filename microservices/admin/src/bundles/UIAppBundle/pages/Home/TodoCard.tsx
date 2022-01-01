import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Space } from "antd";

export function TodoCard(props: {
  title: string;
  description: string;
  index: number;
  checked: boolean;
  editHandler: (indexTodo: number, newValue: boolean) => void;
  deleteHandler: (
    titleTodo: string,
    descriptionTodo: string,
    checkedTodo: boolean
  ) => void;
}) {
  return (
    <Card
      title={props.title}
      style={{
        backgroundColor: props.checked === true ? "#ff6105" : "#fff",
      }}
    >
      <Checkbox
        checked={props.checked}
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
