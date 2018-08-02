import Button, { ButtonProps } from '@material-ui/core/Button';
import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const LinkButton: React.SFC<ButtonProps & LinkProps> = props => (
  <Button {...props} component={Link as any} />
);

export default LinkButton;
