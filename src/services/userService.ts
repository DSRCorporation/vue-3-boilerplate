import axios from "axios";
import { ILogger } from "@/services/logger";
import { inject, injectable } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";
import { AppConfig } from "@/services/appConfig";

export interface Credentials {
  email: string;
  password: string;
}

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(AppConfig) private appConfig: AppConfig
  ) {}

  async login(credentials: Credentials): Promise<string> {
    this.logger.logInfo("Login user...", credentials.email);
    const response = await axios.post(
      `${this.appConfig.apiUrl}auth/tokens`,
      credentials
    );
    this.logger.logInfo("Login successful:", credentials.email);

    return response.data.data.authToken;
  }
}
