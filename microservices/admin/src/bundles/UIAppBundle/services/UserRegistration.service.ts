import { Inject, Service } from "@bluelibs/core";
import { ApolloClient } from "@bluelibs/ui-apollo-bundle";
import { UserRegisterInputInput } from "@root/api.types";
import gql from "graphql-tag";

@Service()
export class UserRegistrationService {
  @Inject()
  appoloClient: ApolloClient;

  public async register(input: UserRegisterInputInput) {
    await this.appoloClient.mutate({
      mutation: gql`
        mutation ($input: UserRegisterInputInput!) {
          userRegister(input: $input)
        }
      `,
      variables: {
        input,
      },
    });
  }
}
