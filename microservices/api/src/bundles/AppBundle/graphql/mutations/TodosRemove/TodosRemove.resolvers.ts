import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { TodosRemoveInput } from "../../../services/inputs/TodosRemove.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    TodosRemove: [
      X.CheckLoggedIn(),
      X.ToModel(TodosRemoveInput),
      X.Validate(),
      X.ToService(TodoService, "update"),
    ],
  },
} as IResolverMap;
