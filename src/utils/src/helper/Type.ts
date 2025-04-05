declare type MixedList<T> =
  | T[]
  | {
      [key: string]: T;
    };

declare type Maybe<T> = T | undefined;

declare type ServerlessCompose = {
  services: {
    [key: string]: {
      path: string;
      dependsOn?: string[];
      params?: { [key: string]: string };
    };
  };
};

declare type PartialWithRequired<T, K extends keyof T> = Partial<T> &
  Pick<T, K>;

export { MixedList, Maybe, ServerlessCompose, PartialWithRequired };
