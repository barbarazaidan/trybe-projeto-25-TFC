export type ServiceResponseError = {
  status: number,
  data: { message: string }
};

export type ServiceResponseSuccess<Type> = {
  status: number,
  data: Type
};

export type ServiceResponse<Type> = ServiceResponseError | ServiceResponseSuccess<Type>;
