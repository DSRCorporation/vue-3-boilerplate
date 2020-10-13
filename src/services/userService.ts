import axios from "axios";
import { ILogger } from "@/services/logger";
import { inject, injectable } from "tsyringe";
import { TYPES } from "@/services/helpers/containerTypes";

export interface Credentials {
  username: string;
  password: string;
}

@injectable()
export class UserService {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  async login(credentials: Credentials): Promise<string> {
    const response = await axios.post("/api/login", credentials);
    this.logger.logInfo("Login successful:", credentials.username);

    return response.data;
  }
}
