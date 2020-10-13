import { singleton } from "tsyringe";

export interface Log {
  level: "info" | "error" | "warn";
  message: string;
}

export interface ILogger {
  messages: Array<Log>;
  logInfo: (...args: Array<any>) => void;
  logError: (...args: Array<any>) => void;
  logWarn: (...args: Array<any>) => void;
}

function formatMessage(args: Array<any>) {
  return args.reduce((current: string, value: any) => {
    if (typeof value === "string") {
      return current + " " + value;
    }

    if (typeof value === "object") {
      return current + " " + JSON.stringify(value);
    }

    return current;
  }, "");
}

export function logToConsole(log: Log) {
  switch (log.level) {
    case "info":
      console.log(log.message);
      break;
    case "error":
      console.error(log.message);
      break;
    case "warn":
      console.warn(log.message);
      break;
    default:
      console.log(log.message);
  }
}

@singleton()
export class Logger implements ILogger {
  messages: Array<Log> = [];

  constructor(
    private logger: (log: Log) => void = logToConsole,
    private messageFormatter?: (args: Array<any>) => string
  ) {}

  public logInfo(...args: Array<any>) {
    this.logger({
      level: "info",
      message: (this.messageFormatter ?? formatMessage)(args)
    });
  }

  public logError(...args: Array<any>) {
    this.logger({
      level: "error",
      message: (this.messageFormatter ?? formatMessage)(args)
    });
  }

  public logWarn(...args: Array<any>) {
    this.logger({
      level: "warn",
      message: (this.messageFormatter ?? formatMessage)(args)
    });
  }
}
