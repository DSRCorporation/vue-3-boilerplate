import { singleton } from "tsyringe";

export interface Log {
  level: "info" | "error" | "warn";
  message: Array<unknown>;
}

export interface ILogger {
  messages: Array<Log>;
  logInfo: (...args: Array<unknown>) => void;
  logError: (...args: Array<unknown>) => void;
  logWarn: (...args: Array<unknown>) => void;
}

function formatMessage(args: Array<unknown>) {
  return args.reduce((current: string, value: unknown) => {
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
  messageFormatter: (args: Array<unknown>) => string = formatMessage
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
      messageFormatter?: (args: Array<unknown>) => string
    ) => void = logToConsole,
    private messageFormatter?: (args: Array<unknown>) => string
  ) {}

  public logInfo(...args: Array<unknown>) {
    this.logger(
      {
        level: "info",
        message: args,
      },
      this.messageFormatter
    );
  }

  public logError(...args: Array<unknown>) {
    this.logger(
      {
        level: "error",
        message: args,
      },
      this.messageFormatter
    );
  }

  public logWarn(...args: Array<unknown>) {
    this.logger(
      {
        level: "warn",
        message: args,
      },
      this.messageFormatter
    );
  }
}
