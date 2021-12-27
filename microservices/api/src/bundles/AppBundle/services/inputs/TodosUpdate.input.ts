import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodosUpdateInput {
  @Is(a.number().required())
  index: number;

  @Is(a.boolean().required())
  value: boolean;
}
