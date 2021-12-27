export default /* GraphQL */ `
  input UserUpdateInput {
    isEnabled: Boolean
    profile: UserProfileInput
    roles: [UserRole]
    todos: [UserTodoInput]
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
  input UserTodoInput {
    title: String!
    description: String!
    checked: Boolean!
  }
`;
