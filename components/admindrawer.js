import React, { useState, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import NewPlanIcon from '@mui/icons-material/PersonAddAlt1';
import InsightsIcon from '@mui/icons-material/Insights';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import * as Pages from '../constants/pages';
import EmployeeList from './pages/employeelist';
import CourseList from './pages/courselist';
import CreatePlan from './pages/createplan';
import CreatePlanSummary from './pages/createplansummary';
import CreatePlanSendToEmployee from './pages/createplansendtoemployee';
import Performance from './pages/performance';
import Funding from './pages/funding';
import Settings from './pages/settings';
import Help from './pages/help';
import Login from './pages/login';
import SysAdmin from './pages/sysadmin';
import Profile from '../components/assets/svg/profile.svg';
import ProfileOff from '../components/assets/svg/profile_off.svg';
import School from '../components/assets/svg/school.svg';
import SchoolOff from '../components/assets/svg/school_off.svg';
import PerformanceIcon from '../components/assets/svg/chart.svg';
import PerformanceOff from '../components/assets/svg/chart_off.svg';
import Wallet from '../components/assets/svg/empty_wallet_add.svg';
import WalletOff from '../components/assets/svg/empty_wallet_add_off.svg';
import Setting from '../components/assets/svg/setting.svg';
import SettingOff from '../components/assets/svg/setting_off.svg';
import Information from '../components/assets/svg/information.svg';
import InformationOff from '../components/assets/svg/information_off.svg';
import LogoutIcon from '../components/assets/svg/logout.svg';
import CircularProgress from '@mui/material/CircularProgress';

import {
    drawerBackground,
    drawerFontColor,
    drawerFontColorActive,
    grayText,
} from '../constants/colors';
import AppHeader from './cards/appcard';
import { AuthContext } from '../context/AuthContext';

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
const drawerWidth = 240;

export default function AdminDrawer(props) {
    const { user, token, isLoading, setIsLoading, logout } =
        useContext(AuthContext);
    const [currentPage, setCurrentPage] = React.useState(Pages.EMPLOYEE_PAGE);
    const [plan, setPlan] = React.useState({});
    const [employee, setEmployee] = React.useState({});
    const [employerName, setEmployerName] = React.useState(
        'Dunder Mifflin Paper Company, Inc.'
    );

    function changePage(event) {
        setCurrentPage(event);
    }

    function renderBodyComponent() {
        if (currentPage === Pages.EMPLOYEE_PAGE) {
            return (
                <EmployeeList
                    setCurrentPage={setCurrentPage}
                    benefiUser={props.benefiUser}
                    setEmployee={setEmployee}
                />
            );
        } else if (currentPage === Pages.COURSE_PAGE) {
            return (
                <CourseList
                    setCurrentPage={setCurrentPage}
                    setEmployerName={setEmployerName}
                    benefiUser={props.benefiUser}
                />
            );
        } else if (currentPage === Pages.CREATEPLAN_PAGE) {
            return (
                <CreatePlan
                    setCurrentPage={setCurrentPage}
                    plan={plan}
                    setPlan={setPlan}
                    employee={employee}
                />
            );
        } else if (currentPage === Pages.CREATEPLAN_PAGE_2) {
            return (
                <CreatePlanSummary
                    setCurrentPage={setCurrentPage}
                    plan={plan}
                    setPlan={setPlan}
                    employee={employee}
                />
            );
        } else if (currentPage === Pages.CREATEPLAN_PAGE_3) {
            return (
                <CreatePlanSendToEmployee
                    setCurrentPage={setCurrentPage}
                    plan={plan}
                    setPlan={setPlan}
                    employee={employee}
                />
            );
        } else if (currentPage === Pages.PERFORMANCE_PAGE) {
            return (
                <Performance
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    benefiUser={props.benefiUser}
                />
            );
        } else if (currentPage === Pages.FUNDING_PAGE) {
            return (
                <Funding
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    benefiUser={props.benefiUser}
                />
            );
        } else if (currentPage === Pages.SETTINGS_PAGE) {
            return (
                <Settings
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    benefiUser={props.benefiUser}
                />
            );
        } else if (currentPage === Pages.HELP_PAGE) {
            return <Help />;
        } else if (currentPage === Pages.SYS_ADMIN) {
            return <SysAdmin />;
        }
    }

    return isLoading ? (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress size={100} />
        </Box>
    ) : (
        <>
            {user && token ? (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    {currentPage !== Pages.LOGIN_PAGE && (
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="permanent"
                            anchor="left"
                        >
                            <List
                                sx={{
                                    flex: 1,
                                    backgroundColor: drawerBackground,
                                }}
                            >
                                <ListItemButton
                                    key={nanoid()}
                                    onClick={() =>
                                        setCurrentPage(Pages.EMPLOYEE_PAGE)
                                    }
                                >
                                    <img
                                        src="https://static.wixstatic.com/media/1b187a_b94be199bdbb4f8eacfcd0365746b561~mv2.png/v1/fill/w_230,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Benefi%20logo%20Old%20White.png"
                                        height={31}
                                        width={115}
                                        style={{
                                            marginRight: 80,
                                            marginBottom: 50,
                                        }}
                                    />
                                </ListItemButton>
                                <ListItem
                                    style={{
                                        borderLeft: `5px solid ${
                                            currentPage === Pages.EMPLOYEE_PAGE
                                                ? drawerFontColorActive
                                                : drawerBackground
                                        }`,
                                    }}
                                    key={nanoid()}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            changePage(Pages.EMPLOYEE_PAGE);
                                        }}
                                    >
                                        <ListItemIcon>
                                            {currentPage ===
                                            Pages.EMPLOYEE_PAGE ? (
                                                <Profile />
                                            ) : (
                                                <ProfileOff />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Employees"
                                            sx={{
                                                color:
                                                    currentPage ===
                                                    Pages.EMPLOYEE_PAGE
                                                        ? drawerFontColorActive
                                                        : drawerFontColor,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem
                                    style={{
                                        borderLeft: `5px solid ${
                                            currentPage === Pages.COURSE_PAGE
                                                ? drawerFontColorActive
                                                : drawerBackground
                                        }`,
                                    }}
                                    key={nanoid()}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            changePage(Pages.COURSE_PAGE);
                                        }}
                                    >
                                        <ListItemIcon>
                                            {currentPage ===
                                            Pages.COURSE_PAGE ? (
                                                <School />
                                            ) : (
                                                <SchoolOff />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Courses"
                                            sx={{
                                                color:
                                                    currentPage ===
                                                    Pages.COURSE_PAGE
                                                        ? drawerFontColorActive
                                                        : drawerFontColor,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem
                                    style={{
                                        borderLeft: `5px solid ${
                                            currentPage ===
                                            Pages.PERFORMANCE_PAGE
                                                ? drawerFontColorActive
                                                : drawerBackground
                                        }`,
                                    }}
                                    key={nanoid()}
                                    disablePadding
                                >
                                    <ListItemButton
                                        // disabled={true}
                                        onClick={() => {
                                            changePage(Pages.PERFORMANCE_PAGE);
                                        }}
                                    >
                                        <ListItemIcon>
                                            {currentPage ===
                                            Pages.PERFORMANCE_PAGE ? (
                                                <PerformanceIcon />
                                            ) : (
                                                <PerformanceOff />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Performance"
                                            sx={{
                                                color:
                                                    currentPage ===
                                                    Pages.PERFORMANCE_PAGE
                                                        ? drawerFontColorActive
                                                        : drawerFontColor,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem
                                    style={{
                                        borderLeft: `5px solid ${
                                            currentPage === Pages.FUNDING_PAGE
                                                ? drawerFontColorActive
                                                : drawerBackground
                                        }`,
                                    }}
                                    key={nanoid()}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            changePage(Pages.FUNDING_PAGE);
                                        }}
                                        // disabled={true}
                                    >
                                        <ListItemIcon>
                                            {currentPage ===
                                            Pages.FUNDING_PAGE ? (
                                                <Wallet />
                                            ) : (
                                                <WalletOff />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Funding"
                                            sx={{
                                                color:
                                                    currentPage ===
                                                    Pages.FUNDING_PAGE
                                                        ? drawerFontColorActive
                                                        : drawerFontColor,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem
                                    style={{
                                        borderLeft: `5px solid ${
                                            currentPage === Pages.SETTINGS_PAGE
                                                ? drawerFontColorActive
                                                : drawerBackground
                                        }`,
                                    }}
                                    key={nanoid()}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            changePage(Pages.SETTINGS_PAGE);
                                        }}
                                    >
                                        <ListItemIcon>
                                            {currentPage ===
                                            Pages.SETTINGS_PAGE ? (
                                                <Setting />
                                            ) : (
                                                <SettingOff />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Settings"
                                            sx={{
                                                color:
                                                    currentPage ===
                                                    Pages.SETTINGS_PAGE
                                                        ? drawerFontColorActive
                                                        : drawerFontColor,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem
                                    style={{
                                        borderLeft: `5px solid ${
                                            currentPage === Pages.HELP_PAGE
                                                ? drawerFontColorActive
                                                : drawerBackground
                                        }`,
                                    }}
                                    key={nanoid()}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            changePage(Pages.HELP_PAGE);
                                        }}
                                    >
                                        <ListItemIcon>
                                            {currentPage === Pages.HELP_PAGE ? (
                                                <Information />
                                            ) : (
                                                <InformationOff />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="FAQ"
                                            sx={{
                                                color:
                                                    currentPage ===
                                                    Pages.HELP_PAGE
                                                        ? drawerFontColorActive
                                                        : drawerFontColor,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {/* <ListItem key={Pages.CREATEPLAN_PAGE} disablePadding>
              <ListItemButton
                onClick={() => {
                  changePage(Pages.CREATEPLAN_PAGE)
                }}
              >
                <ListItemIcon>
                  <NewPlanIcon />
                </ListItemIcon>
                <ListItemText primary="Create New Plan" />
              </ListItemButton>
            </ListItem> */}
                                {/*props.user.attributes.email ===*/}
                                {/*'btaylor@benefi.com' ||*/}
                                {/*props.user.attributes.email ===*/}
                                {/*'pdunn@benefi.com'*/}
                                {false && (
                                    <ListItem
                                        style={{
                                            borderLeft: `5px solid ${
                                                currentPage === Pages.SYS_ADMIN
                                                    ? drawerFontColorActive
                                                    : drawerBackground
                                            }`,
                                        }}
                                        key={nanoid()}
                                        disablePadding
                                    >
                                        <ListItemButton
                                            onClick={() => {
                                                changePage(Pages.SYS_ADMIN);
                                            }}
                                        >
                                            <ListItemIcon>
                                                <ContactSupportIcon
                                                    sx={{
                                                        color:
                                                            currentPage ===
                                                            Pages.SYS_ADMIN
                                                                ? drawerFontColorActive
                                                                : drawerFontColor,
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="System Admin"
                                                sx={{
                                                    color:
                                                        currentPage ===
                                                        Pages.SYS_ADMIN
                                                            ? drawerFontColorActive
                                                            : drawerFontColor,
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                <div
                                    style={{
                                        position: 'absolute',
                                        borderRadius: 15,
                                        width: '90%',
                                        marginLeft: 10,
                                        marginRight: 10,
                                        bottom: 10,
                                        border: `1px solid ${drawerFontColorActive}`,
                                    }}
                                    key={Pages.HELP_PAGE}
                                >
                                    <ListItemButton>
                                        <img
                                            src={imgUrl}
                                            alt="Benefi"
                                            style={{ borderRadius: 200 }}
                                            width={30}
                                            height={30}
                                        />
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: 1,
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <Typography
                                                className={'font-face-pd'}
                                                sx={{ color: 'white' }}
                                            >
                                                {user.firstName} {user.lastName}
                                            </Typography>
                                            <Typography
                                                className={'font-face-pd'}
                                                sx={{
                                                    color: grayText,
                                                    fontSize: 11,
                                                }}
                                            >
                                                {user?.company?.companyName}
                                            </Typography>
                                        </div>
                                        <div onClick={() => logout()}>
                                            <LogoutIcon />
                                        </div>
                                    </ListItemButton>
                                </div>
                            </List>
                        </Drawer>
                    )}
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            bgcolor: 'background.default',
                            p: 3,
                        }}
                    >
                        {currentPage !== Pages.LOGIN_PAGE && user !== null && (
                            <AppHeader
                                currentPage={currentPage}
                                changePage={changePage}
                                company={user?.company?.companyName}
                                name={`${user?.firstName} ${user?.lastName}`}
                            />
                        )}
                        {renderBodyComponent()}
                    </Box>
                </Box>
            ) : (
                <Login />
            )}
        </>
    );
}
