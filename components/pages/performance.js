import React, { useContext } from 'react';
import { Tabs, Tab, Typography, TabContainer, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PropTypes from 'prop-types';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ActiveBonus from '../tables/activebonus';
import ActiveLoan from '../tables/activeloan';
import TaxableBenefit from '../tables/taxablebenefit';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { AuthContext } from '../../context/AuthContext';

export default function Performance() {
    const { user } = useContext(AuthContext);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab
                                icon={<AttachMoneyIcon />}
                                label="Active Bonuses"
                                value="1"
                            ></Tab>
                            <Tab
                                icon={<CreditScoreIcon />}
                                label="Active Loans"
                                value="2"
                            />
                            <Tab
                                icon={<AccountBalanceIcon />}
                                label="Taxable Benefits"
                                value="3"
                            />
                            {/* <Tab
                icon={<AttachMoneyIcon />}
                label="Historical Bonuses"
                value="3"
              />
              <Tab
                icon={<CreditScoreIcon />}
                label="Historical Loans"
                value="4"
              /> */}
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ActiveBonus benefiUser={user} />
                    </TabPanel>
                    <TabPanel value="2">
                        <ActiveLoan benefiUser={user} />
                    </TabPanel>
                    <TabPanel value="3">
                        <TaxableBenefit benefiUser={user} />
                    </TabPanel>
                    {/* <TabPanel value="3">Historical Bonuses</TabPanel>
          <TabPanel value="4">Historical Loans</TabPanel> */}
                </TabContext>
            </Box>
        </>
    );
}
