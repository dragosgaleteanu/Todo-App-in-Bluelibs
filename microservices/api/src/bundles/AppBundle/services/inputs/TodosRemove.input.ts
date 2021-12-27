import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodosRemoveInput {
  @Is(a.string().required())
  title: string;

  @Is(a.string().required())
  description: string;

  @Is(a.boolean().required())
  checked: boolean;
}
