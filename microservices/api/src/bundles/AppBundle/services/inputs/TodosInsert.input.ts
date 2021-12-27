import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodosInsertInput {
  @Is(a.string().required())
  title: string;

  @Is(a.string().required())
  description: string;
}
