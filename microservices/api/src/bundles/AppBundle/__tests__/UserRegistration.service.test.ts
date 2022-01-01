import { UserRegistrationService } from "../services/UserRegistration.service";
import { container } from "../../../__tests__/ecosystem";
import { testUserInputData4 } from "./utils/testUserInputData";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("UserRegistrationService", () => {
  test("register()", async () => {
    const userRegistration = container.get(UserRegistrationService);

    const userId = await userRegistration.register(testUserInputData4);

    expect(userId).toBeDefined();
    expect(userId).toBeTruthy();
  });
});
