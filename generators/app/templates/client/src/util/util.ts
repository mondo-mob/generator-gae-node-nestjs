// tslint:disable:no-console
import { FORM_ERROR, FormApi } from 'final-form';
import * as _ from 'lodash';
import { showMessage } from '../components/Toast';

export function get<T, K extends keyof NonNullable<T>>(
  value: T,
  path: K,
  defaultValue: NonNullable<T>[K],
): NonNullable<T>[K];
export function get<T, K extends keyof NonNullable<T>, R extends NonNullable<T>[K] | undefined>(
  value: T,
  path: K,
  defaultValue: NonNullable<T>[K],
): NonNullable<T>[K];
export function get<T>(): T {
  let value = arguments[0];
  for (let i = 0; i < arguments.length - 2; i++) {
    if (value === undefined || value === null) {
      return arguments[arguments.length - 1];
    }
    value = value[arguments[i + 1]];
  }

  return value;
}

export function getN<T, K extends keyof NonNullable<T>>(value: T, path: K): NonNullable<T>[K] | undefined;
export function getN<T, K extends keyof NonNullable<T>, K1 extends keyof NonNullable<T>[K]>(
  value: T,
  path: K,
  path1: K1,
): NonNullable<NonNullable<T>[K]>[K1] | undefined;
export function getN<
  T,
  K extends keyof NonNullable<T>,
  K1 extends keyof NonNullable<T>[K],
  K2 extends keyof NonNullable<NonNullable<T>[K]>[K1]
>(value: T, path: K, path1: K1, path2: K2): NonNullable<NonNullable<NonNullable<T>[K]>[K1]>[K2] | undefined;
export function getN<T>(): T {
  return get.apply(null, [...arguments, undefined] as any) as any;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type OneOrMany<T> = T | ReadonlyArray<T>;

interface SafeSubmitOptions<R> {
  successMessage: string;
  onSuccess: (result: R, formApi: FormApi) => void;
}

type FormHandler<T> = (data: Partial<T>, formApi: FormApi) => Promise<any>;
export function safeSubmit<T, R = {}>(
  handler: FormHandler<T>,
  config: Partial<SafeSubmitOptions<R>> = {},
): FormHandler<T> {
  return async (data, api) => {
    try {
      const result = await handler(data, api);

      if (config.successMessage) {
        showMessage(config.successMessage, false);
      }

      if (config.onSuccess) {
        console.log(api);
        config.onSuccess(result, api);
      }

      return result;
    } catch (ex) {
      let message: string;
      console.log(JSON.stringify(ex));
      if (ex.graphQLErrors) {
        message = _.get(ex.graphQLErrors, [0, 'message'], 'Unexpected error submitting form');
      } else {
        message = ex.message || 'Unexpected error submitting form';
      }

      showMessage(message, true);

      return {
        [FORM_ERROR]: message,
      };
    }
  };
}
