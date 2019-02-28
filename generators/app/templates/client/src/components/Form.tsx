import { FormApi } from 'final-form';
import * as React from 'react';
import { Form as FinalForm, FormProps } from 'react-final-form';
import { Omit, safeSubmit } from '../util/util';

interface Props<T, U = {}> extends Omit<FormProps, 'onSubmit'> {
  onSubmit: (data: T, formApi: FormApi) => Promise<U | void>;
  onSuccess?: (result: U, formApi: FormApi) => void;
  successMessage?: string;
}

class Form<T, U = {}> extends React.Component<Props<T, U>> {
  public render() {
    const { onSubmit, successMessage, onSuccess, ...rest } = this.props;

    return (
      <FinalForm
        {...rest}
        onSubmit={safeSubmit(onSubmit as any, {
          successMessage,
          onSuccess,
        })}
      />
    );
  }
}

export default Form;
