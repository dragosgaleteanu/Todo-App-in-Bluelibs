import { Service, Inject, ContainerInstance } from "@bluelibs/core";
import { XPasswordService } from "@bluelibs/x-password-bundle";
import { PermissionService, UserId } from "@bluelibs/security-bundle";
import { UserRegisterInputInput } from "./inputs/UserRegisterInput.input";
import { ObjectId } from "@bluelibs/ejson";

@Service()
export class UserRegistrationService {
  @Inject()
  xPasswordService: XPasswordService;

  @Inject()
  permissionService: PermissionService;

  constructor(protected readonly container: ContainerInstance) {}

  public async register(input: UserRegisterInputInput): Promise<ObjectId> {
    const { userId } = await this.xPasswordService.register(input);

    await this.permissionService.add({
      userId,
      permission: "USER",
      domain: "app",
    });

    return userId as ObjectId;
  }
}
