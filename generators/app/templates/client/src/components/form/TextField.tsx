import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

const Input: React.FC<FieldRenderProps & TextFieldProps> = ({
  input: { name, onChange, value, ...restInput },
  meta,
  placeholder,
  ...rest
}) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    placeholder={placeholder}
    InputProps={restInput}
    onChange={onChange}
    value={value}
  />
);

export default Input;
