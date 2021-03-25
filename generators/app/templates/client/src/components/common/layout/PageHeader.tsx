import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { ReactElement } from 'react';
import { asArray, OneOrMany } from '../../../util/util';
import Breadcrumbs, { LinkConfig } from './Breadcrumbs';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(0.5),
    color: 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: theme.spacing(4),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    '&>:not(:first-child)': {
      marginLeft: theme.spacing(2),
    },
  },
}));

interface Props {
  title: string | ReactElement;
  breadcrumbElements: OneOrMany<string | LinkConfig>;
  subTitle?: string | ReactElement;
  actions?: ReactElement;
}

const PageHeader: React.FC<Props> = ({ title, subTitle, breadcrumbElements, actions }) => {
  const classes = useStyles();
  return (
    <>
      <Breadcrumbs elements={[{ text: 'Dashboard', link: '/' }, ...asArray(breadcrumbElements)]} />
      <div className={classes.root}>
        {typeof title === 'string' ? (
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
        ) : (
          title
        )}
        {typeof subTitle === 'string' ? (
          <Typography variant="h4" gutterBottom>
            {subTitle}
          </Typography>
        ) : (
          subTitle
        )}
        <div className={classes.actions}>{actions}</div>
      </div>
    </>
  );
};

export default PageHeader;
