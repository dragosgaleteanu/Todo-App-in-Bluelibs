import { Service, Inject } from "@bluelibs/core";
import { ApolloClient } from "@bluelibs/ui-apollo-bundle";
import {
  TodosInsertInput,
  TodosRemoveInput,
  TodosUpdateInput,
} from "@root/api.types";
import gql from "graphql-tag";

@Service()
export class TodoService {
  @Inject()
  appoloClient: ApolloClient;

  public async insert(input: TodosInsertInput) {
    await this.appoloClient.mutate({
      mutation: gql`
        mutation ($input: TodosInsertInput!) {
          TodosInsert(input: $input)
        }
      `,
      variables: {
        input,
      },
    });
  }

  public async remove(input: TodosRemoveInput) {
    await this.appoloClient.mutate({
      mutation: gql`
        mutation ($input: TodosRemoveInput!) {
          TodosRemove(input: $input)
        }
      `,
      variables: {
        input,
      },
    });
  }

  public async update(input: TodosUpdateInput) {
    await this.appoloClient.mutate({
      mutation: gql`
        mutation ($input: TodosUpdateInput!) {
          TodosUpdate(input: $input)
        }
      `,
      variables: {
        input,
      },
    });
  }
}
