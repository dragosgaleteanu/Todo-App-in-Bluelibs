export default {
  resolvers: {
    User: {},
    UserProfile: {},
    UserTodo: {},
    UserRole: {
      ADMIN: "ADMIN",
      SALES: "SALES",
      MANAGER: "MANAGER",
      END_CUSTOMER: "END_CUSTOMER",
    },
  },
};
