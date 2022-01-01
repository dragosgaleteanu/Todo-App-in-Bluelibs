import { container } from "../../../../__tests__/ecosystem";
import { UserRegistrationService } from "../../../../bundles/AppBundle/services/UserRegistration.service";

type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function createUser(data: FormInput) {
  const userRegistrationService = container.get(UserRegistrationService);

  return await userRegistrationService.register(data);
}
