import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { AppGuardian } from "./AppGuardian";

@Service()
export class RedirectUserService {
  @Inject()
  guardian: AppGuardian;

  constructor(protected readonly container: ContainerInstance) {}

  public async redirectUserAfterAuthentication(): Promise<string> {
    await this.guardian.load();

    const userHasAdminRole = this.guardian.hasRole("USER");

    if (userHasAdminRole === true) {
      return "HOME";
    } else {
      return "DASHBOARD";
    }
  }
}
