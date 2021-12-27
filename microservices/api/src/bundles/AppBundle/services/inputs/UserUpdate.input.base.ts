/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { UserRole } from "../../collections";

@Schema()
export class UserProfileInput {
  @Is(a.string().required())
  firstName: string;

  @Is(a.string().required())
  lastName: string;
}
@Schema()
export class UserTodoInput {
  @Is(a.string().required())
  title: string;

  @Is(a.string().required())
  description: string;

  @Is(a.boolean().required())
  checked: boolean;
}

@Schema()
export class UserUpdateInput {
  @Is(a.boolean().nullable())
  isEnabled?: boolean;

  @Is(() => Schema.from(UserProfileInput))
  profile?: UserProfileInput;

  @Is(an.array().of(a.string().oneOf(Object.values(UserRole))))
  roles?: UserRole[] = [];

  @Is(() => an.array().of(Schema.from(UserTodoInput)))
  todos?: UserTodoInput[] = [];
}
