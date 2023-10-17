type ResultProps<SuccessType, ErrorType> = {
  success: boolean;
  value?: SuccessType;
  error?: ErrorType;
};

export class Result<SuccessType, ErrorType> {
  private constructor(private props: ResultProps<SuccessType, ErrorType>) {}

  public static success<SuccessType, ErrorType>(
    value: SuccessType
  ): Result<SuccessType, ErrorType> {
    return new Result({
      success: true,
      value,
    });
  }

  public static failure<SuccessType, ErrorType>(
    error: ErrorType
  ): Result<SuccessType, ErrorType> {
    return new Result({
      success: false,
      error,
    });
  }

  public get isSuccess(): boolean {
    return this.props.success;
  }

  public get isFailure(): boolean {
    return !this.props.success;
  }

  public get value(): SuccessType | undefined {
    return this.props.value;
  }

  public get error(): ErrorType | undefined {
    return this.props.error;
  }
}

export type ResultFailure<ErrorType> =
  | {
      success: false;
      error: ErrorType;
    }
  | {
      success: false;
      errors: ErrorType[];
    };
