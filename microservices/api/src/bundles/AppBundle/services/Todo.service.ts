import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { UsersCollection } from "../collections";
import { TodosInsertInput } from "./inputs/TodosInsert.input";
import { TodosRemoveInput } from "./inputs/TodosRemove.input";
import { TodosUpdateInput } from "./inputs/TodosUpdate.input";

@Service()
export class TodoService {
  constructor(protected readonly container: ContainerInstance) {}

  public async insert(input: TodosInsertInput, userId: ObjectId) {
    const usersCollection = this.container.get(UsersCollection);

    await usersCollection.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          todos: {
            ...input,
            checked: false,
          },
        },
      }
    );
  }
  public async update(input: TodosRemoveInput, userId: ObjectId) {
    const usersCollection = this.container.get(UsersCollection);

    await usersCollection.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          todos: input,
        },
      }
    );
  }
  public async remove(input: TodosUpdateInput, userId: ObjectId) {
    const usersCollection = this.container.get(UsersCollection);

    await usersCollection.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          [`todos.${input.index}.checked`]: input.value,
        },
      }
    );
  }
}
