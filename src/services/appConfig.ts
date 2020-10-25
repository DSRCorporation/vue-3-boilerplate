import { singleton } from "tsyringe";

@singleton()
export class AppConfig {
  apiUrl = "http://localhost:3000/api/";
}
