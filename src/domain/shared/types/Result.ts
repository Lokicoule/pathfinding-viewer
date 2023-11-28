type ErrorPayload<E> = {
  message: string;
  details: E;
};

type Success<ResultType> = { success: true; value?: ResultType };
type Failure<ErrorType> = {
  success: false;
  error?: Partial<ErrorPayload<ErrorType>>;
};

export type Result<
  ReturnType = void,
  ErrorType = void
> = ReturnType extends void
  ? Success<void> | Failure<ErrorType>
  : Success<ReturnType> | Failure<ErrorType>;
