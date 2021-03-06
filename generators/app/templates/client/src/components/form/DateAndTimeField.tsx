import { DateTimePicker } from '@material-ui/pickers';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

const DateTime: React.FC<FieldRenderProps<string, any>> = ({ input: { name, onChange, value }, meta, ...rest }) => (
  <DateTimePicker
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    value={value || null}
    onChange={onChange}
    onBlur={() => onChange(value)}
  />
);

export default DateTime;
