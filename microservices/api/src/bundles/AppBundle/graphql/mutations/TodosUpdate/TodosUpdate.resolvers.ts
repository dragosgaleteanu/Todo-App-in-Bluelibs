import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { TodosUpdateInput } from "../../../services/inputs/TodosUpdate.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    TodosUpdate: [
      X.CheckLoggedIn(),
      X.ToModel(TodosUpdateInput),
      X.Validate(),
      X.ToService(TodoService, "remove"),
    ],
  },
} as IResolverMap;
