import { Card, withStyles } from '@material-ui/core';

const cardStyles = {
  root: {
    boxShadow: '0 3px 6px rgba(100, 100, 100, 0.1)',
    transition: 'all 0.2s',
    borderRadius: 4,
  },
};

export default withStyles(cardStyles)(Card as any) as typeof Card;
