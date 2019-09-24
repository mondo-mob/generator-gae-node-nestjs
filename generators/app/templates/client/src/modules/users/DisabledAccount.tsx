import { makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import PageTitle from '../../components/PageTitle';
import { RouteHelper } from '../../routes/route-helper';
import AccountPage from '../accounts/AccountPage';

interface Props {
    r: RouteHelper;
}

const useStyles = makeStyles((theme: Theme) => ({
    subTitle: {
        color: '#555'
    }
}));

const DisabledAccount = ({ r }: Props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <PageTitle open={false} showDrawer={false} r={r} />
            <AccountPage
                title="Account Disabled"
            >
                <Typography className={classes.subTitle} variant="body1">Your account has been disabled. Please contact your administrator to re-enable your account.</Typography>
            </AccountPage>
        </React.Fragment>
    );
}

export default DisabledAccount;
