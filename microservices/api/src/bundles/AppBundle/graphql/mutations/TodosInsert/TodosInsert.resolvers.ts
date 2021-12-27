import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { TodosInsertInput } from "../../../services/inputs/TodosInsert.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    TodosInsert: [
      X.CheckLoggedIn(),
      X.ToModel(TodosInsertInput),
      X.Validate(),
      X.ToService(TodoService, "insert"),
    ],
  },
} as IResolverMap;
