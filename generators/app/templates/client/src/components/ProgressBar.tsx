import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& .react-progress-bar-percent': {
      backgroundColor: theme.palette.primary.light,
      boxShadow: `0 0 10px ${theme.palette.primary.light}, 0 0 5px ${theme.palette.primary.light}`,
    },
  },
}));

interface Props {
  isLoading?: boolean;
}

const Progress = ({ isLoading }: Props) => {
  const classes = useStyles();
  return <ProgressBar autoIncrement spinner={false} percent={isLoading === true ? 20 : 100} className={classes.root} />;
};

export default Progress;
