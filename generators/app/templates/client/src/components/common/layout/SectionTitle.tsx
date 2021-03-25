import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '1rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1.5),
  },
}));

interface Props {
  title: string;
}
const SectionTitle = ({ title }: Props) => {
  const classes = useStyles();
  return <div className={classes.title}>{title}</div>;
};

export default SectionTitle;
