import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { UserRegisterInputInput } from "../../../services/inputs/UserRegisterInput.input";
import { UserRegistrationService } from "../../../services/UserRegistration.service";

export default {
  Mutation: {
    userRegister: [
      X.ToModel(UserRegisterInputInput),
      X.Validate(),
      X.ToService(UserRegistrationService, "register"),
      () => {},
    ],
  },
} as IResolverMap;
