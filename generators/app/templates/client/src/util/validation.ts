import { FieldValidator } from 'final-form';
import { Nullable } from './types';

export const required = (msg: string) => (value?: any) => (value ? undefined : msg);

export const isEmail = (msg: string) => (value?: Nullable<string>) => {
  if (!value) {
    return undefined;
  }
  return value.match(/^[a-zA-Z0-9.!#$%&’'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? undefined : msg;
};

export const minLength = (msg: string, length: number) => (values?: Nullable<string[]>) =>
  values && values.length >= length ? undefined : msg;

export const compose = <T>(...validators: FieldValidator<T>[]): FieldValidator<T> => {
  return (value, allValues) => {
    for (const validator of validators) {
      const result = validator(value, allValues);

      if (result) {
        return result;
      }
    }
  };
};
