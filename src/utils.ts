import { ValidationError } from "class-validator";

export const getPayload = <T = Record<string, any>>(form: HTMLFormElement) => {
  const res: Record<string, any> = {};
  Array.from(form.querySelectorAll("[name]")).forEach(
    (el: HTMLInputElement) => {
      if (el.type === "checkbox") {
        res[el.name] = el.checked;
        return;
      }
      res[el.name] = +el.value || el.value;
    }
  );

  return res as T;
};

export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
) => {
  const res = { ...obj };
  keys.forEach((key) => delete res[key]);
  return res;
};

export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
) => {
  const res = {} as Record<K, T[K]>;
  keys.forEach((key) => (res[key] = obj[key]));
  return res;
};

export const applyFieldsToForm = (
  form: HTMLFormElement,
  fields: Record<string, any>
) => {
  Object.entries(fields).forEach(([key, value]) => {
    if (!form[key]) return;
    if (typeof value === "boolean") {
      form[key].checked = value;
      return;
    }

    form[key].value = value;
  });
};

export const getErrorsFor = (errors: ValidationError[], fieldName: string) => {
  const errorsMessages = errors
    .filter((error) => error.property === fieldName)
    .map((error) => Object.values(error.constraints || {}))
    .flat();

  return errorsMessages;
};
