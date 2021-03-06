import { useEffect, useState } from "react";
import { UsersCollection } from "@bundles/UIAppBundle/collections";
import { use } from "@bluelibs/x-ui";
import { Card, notification } from "antd";
import { TodoCard } from "./TodoCard";
import { TodoService } from "@bundles/UIAppBundle/services/Todo.service";

export function TodosCard(props: {
  userId: string;
  collectionStateChanged: boolean;
  resetStateHandler: () => void;
}) {
  const todoService = use(TodoService);
  const collection = use(UsersCollection);
  const [JSXComponent, setJSXComponent] = useState(
    <Card>
      <p>Loading...</p>
    </Card>
  );
  const [anyTodoEdited, setAnyTodoEdited] = useState(false);

  const removeTodoHandler = (
    titleTodo: string,
    descriptionTodo: string,
    checkedTodo: boolean
  ) => {
    todoService
      .remove({
        title: titleTodo,
        description: descriptionTodo,
        checked: checkedTodo,
      })
      .then((data) => {
        notification.success({
          message: "Todo has been successfully removed!",
        });
        setAnyTodoEdited(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const editTodoHandler = (indexTodo: number, newValue: boolean) => {
    todoService
      .update({
        index: indexTodo,
        value: newValue,
      })
      .then((data) => {
        notification.success({
          message: "Todo has been successfully updated!",
        });
        setAnyTodoEdited(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    collection
      .findOneById(props.userId, {
        todos: {
          title: 1,
          description: 1,
          checked: 1,
        },
      })
      .then((data) => {
        setJSXComponent(
          <Card title="Your todos">
            {data.todos.map((task, idx) => (
              <TodoCard
                key={task.title}
                title={task.title}
                description={task.description}
                checked={task.checked}
                index={idx}
                deleteHandler={removeTodoHandler}
                editHandler={editTodoHandler}
              />
            ))}
          </Card>
        );
      })
      .catch(() => {
        setJSXComponent(
          <Card>
            <p>Failed to load your todos, please try again!</p>
          </Card>
        );
      });

    if (anyTodoEdited === true) {
      setAnyTodoEdited(false);
    }
    props.resetStateHandler();
  }, [props.collectionStateChanged, anyTodoEdited]);

  return JSXComponent;
}
