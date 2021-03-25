import { grey } from '@material-ui/core/colors';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    color: grey[500],
    fontSize: '0.875rem',
    lineHeight: '160%',
    marginBottom: theme.spacing(),
  },
  element: {
    '&:not(:first-child)::before': {
      content: "' / '",
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export interface LinkConfig {
  text: string;
  link: string;
}

export interface BreadcrumbProps {
  elements: (string | LinkConfig)[];
}

const ItemWithLink = ({ item }: { item: LinkConfig }) => {
  const classes = useStyles();
  return (
    <Link className={classes.link} to={item.link}>
      {item.text}
    </Link>
  );
};

const Item = ({ item }: { item: string }) => <span>{item}</span>;

const Breadcrumbs = ({ elements }: BreadcrumbProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {elements.map((element, index) => (
        <span key={index} className={classes.element}>
          {typeof element === 'string' ? <Item item={element} /> : <ItemWithLink item={element} />}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
