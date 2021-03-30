import { BadRequestException, NotFoundException } from '@nestjs/common';
import { isNil } from 'lodash';

export const validate = (
  expression: boolean,
  msg: string,
  customErrorClass: new (msg: string) => Error = BadRequestException,
) => {
  if (!expression) {
    throw new customErrorClass(msg);
  }
};

export const validateNotNil = <T>(
  obj: T | null | undefined,
  msg: string,
  customErrorClass: new (msg: string) => Error = BadRequestException,
): T => {
  validate(!isNil(obj), msg, customErrorClass);
  return obj!;
};

export const validateArrayNotEmpty = <T>(
  obj: T[] | null | undefined,
  msg: string,
  customErrorClass: new (msg: string) => Error = BadRequestException,
): T[] => {
  const array = validateNotNil(obj, msg, customErrorClass);
  validate(array.length > 0, msg, customErrorClass);
  return array;
};

export const validateFound = <T>(type: string, id: string | number, instance: T | null): T => {
  return validateNotNil(instance, `${type} not found for identifier: ${id}`, NotFoundException);
};
