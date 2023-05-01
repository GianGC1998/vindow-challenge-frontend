import { FormikValues } from "./types";

export const validateForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};

  if (values.query?.length < 3) {
    errors.query = "It's necessary at least 3 letters to search";
  }

  return errors;
};
