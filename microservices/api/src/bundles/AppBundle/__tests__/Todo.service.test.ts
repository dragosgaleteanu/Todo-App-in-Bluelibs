import { TodoService } from "../services/Todo.service";
import { container } from "../../../__tests__/ecosystem";
import { createUser } from "./utils/index";
import {
  testUserInputData1,
  testUserInputData2,
  testUserInputData3,
} from "./utils/testUserInputData";
import { testTodoInputData } from "./utils/testTodoInputData";
import { UsersCollection } from "../collections";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("TodoService", () => {
  test("insert()", async () => {
    const todoService = container.get(TodoService);
    const usersCollection = container.get(UsersCollection);

    const userId = await createUser(testUserInputData1);

    await todoService.insert(testTodoInputData, userId);

    const user = await usersCollection.findOne({ _id: userId });
    const currentUserTodos = user.todos;

    expect(currentUserTodos).toContainEqual({
      ...testTodoInputData,
      checked: false,
    });
  });
  test("update()", async () => {
    const todoService = container.get(TodoService);
    const usersCollection = container.get(UsersCollection);

    const userId = await createUser(testUserInputData2);

    await todoService.insert(testTodoInputData, userId);
    await todoService.update(
      {
        ...testTodoInputData,
        checked: false,
      },
      userId
    );

    const user = await usersCollection.findOne({ _id: userId });
    const currentUserTodos = user.todos;

    expect(currentUserTodos).not.toContainEqual(testTodoInputData);
  });
  test("remove()", async () => {
    const todoService = container.get(TodoService);
    const usersCollection = container.get(UsersCollection);

    const userId = await createUser(testUserInputData3);

    await todoService.insert(testTodoInputData, userId);
    await todoService.remove(
      {
        ...testTodoInputData,
        index: 0,
        value: true,
      },
      userId
    );

    const user = await usersCollection.findOne({ _id: userId });
    const currentUserTodos = user.todos;

    expect(currentUserTodos).toContainEqual({
      ...testTodoInputData,
      checked: true,
    });
  });
});
