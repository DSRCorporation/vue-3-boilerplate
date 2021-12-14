import { singleton } from "tsyringe";

export interface Log {
  level: "info" | "error" | "warn";
  message: Array<any>;
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

    return current + " " + value;
  }, "");
}

export function logToConsole(
  log: Log,
  messageFormatter?: (args: Array<any>) => string
) {
  switch (log.level) {
    case "info":
      messageFormatter
        ? console.log(messageFormatter(log.message))
        : console.log(...log.message);
      break;
    case "error":
      messageFormatter
        ? console.error(messageFormatter(log.message))
        : console.error(...log.message);
      break;
    case "warn":
      messageFormatter
        ? console.warn(messageFormatter(log.message))
        : console.warn(...log.message);
      break;
    default:
      messageFormatter
        ? console.log(messageFormatter(log.message))
        : console.log(...log.message);
  }
}

@singleton()
export class Logger implements ILogger {
  messages: Array<Log> = [];

  constructor(
    private logger: (
      log: Log,
      messageFormatter?: (args: Array<any>) => string
    ) => void = logToConsole,
    private messageFormatter?: (args: Array<any>) => string
  ) {}

  public logInfo(...args: Array<any>) {
    this.logger(
      {
        level: "info",
        message: args,
      },
      this.messageFormatter
    );
  }

  public logError(...args: Array<any>) {
    this.logger(
      {
        level: "error",
        message: args,
      },
      this.messageFormatter
    );
  }

  public logWarn(...args: Array<any>) {
    this.logger(
      {
        level: "warn",
        message: args,
      },
      this.messageFormatter
    );
  }
}
