export default (
  name: any,
  validateAllFieldCriteria: boolean,
  errors: any,
  type: string,
  message: any
) =>
  validateAllFieldCriteria
    ? {
        ...errors[name],
        types: {
          ...(errors[name] && errors[name]!.types ? errors[name]!.types : {}),
          [type]: message || true,
        },
      }
    : {};
