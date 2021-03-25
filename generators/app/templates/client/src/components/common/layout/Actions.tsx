import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  actions: {
    margin: 0,
    '&>:not(:first-child)': {
      marginLeft: theme.spacing(2),
    },
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dense: {
    margin: 0,
    '&$actions>:not(:first-child)': {
      marginLeft: theme.spacing(),
    },
  },
}));

interface Props {
  children: ReactNode;
  dense?: boolean;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

const Actions = ({ children, dense = false, align = 'center', className }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classNames(classes.actions, { [classes.dense]: dense }, className)} style={{ textAlign: align }}>
        {children}
      </div>
    </div>
  );
};

export default Actions;
