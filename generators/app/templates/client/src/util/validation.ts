import { FieldValidator } from 'final-form';

export const required = (msg: string) => (value: any) => (value ? undefined : msg);

export const isEmail = (msg: string) => (value: string) =>
  value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? undefined : msg;

export const minLength = (msg: string, length: number) => (values: string[]) =>
  values.length >= length ? undefined : msg;

export const compose = <T>(...validators: Array<FieldValidator<T>>): FieldValidator<T> => {
  return (value, allValues) => {
    for (const validator of validators) {
      const result = validator(value, allValues);

      if (result) {
        return result;
      }
    }
  };
};
