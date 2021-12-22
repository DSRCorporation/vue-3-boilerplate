export type ServerError = {
  [key: string]: string;
};

export type ServerErrorMessage = {
  property: string;
  constraints: ServerError;
};
