import React, { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import SectionTitle from './SectionTitle';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  condensedVertical: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  condensedHorizontal: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  clickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface Props {
  title?: string;
  children: ReactNode;
  onClick?: MouseEventHandler;
  marginTop?: boolean;
  condensedVertical?: boolean;
  condensedHorizontal?: boolean;
  className?: string;
  elevation?: number;
  actions?: ReactElement;
}
const PaperSection = ({
  title,
  children,
  marginTop = false,
  condensedVertical = false,
  condensedHorizontal = false,
  onClick,
  className,
  elevation,
  actions,
}: Props) => {
  const classes = useStyles();
  return (
    <Paper
      className={classNames(
        classes.paper,
        {
          [classes.marginTop]: marginTop,
          [classes.condensedVertical]: condensedVertical,
          [classes.condensedHorizontal]: condensedHorizontal,
          [classes.clickable]: !!onClick,
        },
        className,
      )}
      onClick={onClick}
      elevation={elevation}
    >
      {(title || actions) && (
        <div className={classes.header}>
          {title && <SectionTitle title={title} />}
          {actions && !title && <div />}
          {actions && actions}
        </div>
      )}
      {children}
    </Paper>
  );
};

export default PaperSection;
