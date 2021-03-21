import React from 'react';

import { Page, SubHeader } from 'components/layout';
import { Button, ButtonAppearance, ButtonIntent } from 'components/buttons';
import { Heading } from 'components/text';

const Dashboard = () => {
    return (
        <Page title="Dashboard">
            <SubHeader>
                <div>
                    <Button appearance={ButtonAppearance.MINIMAL} intent={ButtonIntent.DEFAULT}>
                        Add new default widget
                    </Button>
                    <Button appearance={ButtonAppearance.MINIMAL} intent={ButtonIntent.SUCCESS}>
                        Add new blue widget
                    </Button>
                    <Button appearance={ButtonAppearance.MINIMAL} intent={ButtonIntent.WARNING}>
                        Add new green widget
                    </Button>
                    <Button appearance={ButtonAppearance.MINIMAL} intent={ButtonIntent.DANGER}>
                        Add new red widget
                    </Button>
                </div>
            </SubHeader>
            <Heading>Dashboard</Heading>
        </Page>
    );
};

export default Dashboard;
