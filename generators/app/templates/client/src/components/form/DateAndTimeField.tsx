import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import { DateTimePickerProps } from 'material-ui-pickers/DateTimePicker/DateTimePicker';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

const DateTime: React.SFC<FieldRenderProps & DateTimePickerProps> = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => (
  <DateTimePicker
    {...rest}
    name="name"
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    value={value || null}
    onChange={onChange}
    onBlur={() => onChange(value)}
  />
);

export default DateTime;
