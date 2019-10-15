import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import { includes, without } from 'lodash';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

// FIXME making custom props optional until this is resolved:
// https://github.com/final-form/react-final-form/issues/175
interface Props extends FieldRenderProps<string[], HTMLElement> {
  options?: string[];
  label?: string;
}

const ChecklistField: React.FC<Props> = ({
  input: { name, onChange, value },
  meta: { touched, error, invalid },
  label,
  options,
}) => (
  <FormControl style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <FormGroup>
      {options!.map(option => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={includes(value, option)}
              onChange={(event, checked) => {
                if (checked) {
                  onChange([...value, option]);
                } else {
                  onChange(without(value, option));
                }
              }}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
    {touched && error && <FormHelperText error={touched && invalid}>{error}</FormHelperText>}
  </FormControl>
);

export default ChecklistField;
