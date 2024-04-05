import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/joy/Link';
import { errorNotify } from '../notifications/notify';
import { useMutation } from 'react-query';
import AuthService from '../../ApiService/AuthService';
import { AuthContext } from '../../context/AuthContext';
import { drawerFontColorActive, primary } from '../../constants/colors';
import ActivateUser from '../login/ActivateUser';
import ConfirmAuth from '../login/ConfirmAuth';
import ChangePassword from '../login/ChangePassword';

const Login = () => {
    const { setUser, saveToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNotActivated, setIsNotActivated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isConfirmAuth, setIsConfirmAuth] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    const { mutateAsync, isLoading } = useMutation(AuthService.login, {
        onSuccess: async (data) => {
            if (data?.errors?.status === 400) {
                console.log('AUTH ERROR');
                errorNotify('Incorrect email or password');
                return;
            }
            if (data?.user) {
                console.log(data?.user);
                if (data?.user?.isActivated) {
                    // 2FA
                    if (data?.user?.confirmAuthStatus) {
                        if (data?.user?.isPwdChanged) {
                            console.log(data.user, typeof setUser);
                            setUser(data.user);
                            saveToken(data.accessToken);
                        } else {
                            setIsNotActivated(false);
                            setIsConfirmAuth(false);
                            setIsPasswordChanged(true);
                            setUserId(data.user.id);
                        }
                    } else {
                        setIsNotActivated(false);
                        setIsConfirmAuth(true);
                        setUserId(data.user.id);
                        console.log('NEXT ACTIONS');
                    }
                } else {
                    errorNotify('User not activated');
                    // send email here
                    setUserId(data.user.id);
                    setIsNotActivated(true);
                }
            }
        },
    });

    React.useEffect(() => {}, []);

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            if (!password.length > 0 || !email.length > 0) {
                errorNotify('All fields must be filled');
            } else {
                handleNext();
            }
        }
    };

    const handleNext = async () => {
        await mutateAsync({ email, password });
    };

    return !isNotActivated ? (
        <>
            {isConfirmAuth || isPasswordChanged ? (
                <>
                    {!isPasswordChanged ? (
                        <ConfirmAuth
                            activate={mutateAsync}
                            email={email}
                            password={password}
                            cancel={setIsConfirmAuth}
                            userId={userId}
                        />
                    ) : (
                        <ChangePassword
                            activate={mutateAsync}
                            email={email}
                            password={password}
                            cancel={() => {
                                setIsConfirmAuth(false);
                                setIsPasswordChanged(false);
                            }}
                            userId={userId}
                        />
                    )}
                </>
            ) : (
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#fff',
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CssVarsProvider>
                        <Sheet
                            sx={{
                                width: 400,
                                mx: 'auto', // margin left & right
                                my: 4, // margin top & botom
                                py: 3, // padding top & bottom
                                px: 2, // padding left & right
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                borderRadius: 15,
                                boxShadow: 'md',
                                border: `1px solid ${drawerFontColorActive}`,
                            }}
                        >
                            <div>
                                <Typography
                                    level="h4"
                                    component="h1"
                                    textAlign="center"
                                >
                                    <b>Welcome to Benefi Employer</b>
                                </Typography>
                                <Typography level="body2" textAlign="center">
                                    Please sign in to continue
                                </Typography>
                            </div>
                            <TextField
                                // html input attribute
                                name="email"
                                type="email"
                                placeholder="johndoe@email.com"
                                // pass down to FormLabel as children
                                label="Email"
                                onKeyDown={keyPress}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                name="password"
                                type="password"
                                placeholder="password"
                                label="Password"
                                onKeyDown={keyPress}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                style={{
                                    marginTop: 20,
                                    cursor:
                                        isLoading || !email || !password
                                            ? 'initial'
                                            : 'pointer',
                                    background:
                                        isLoading || !email || !password
                                            ? 'rgb(213, 87, 96)'
                                            : primary,
                                    color: '#fff',
                                }}
                                onClick={handleNext}
                                disabled={isLoading || !email || !password}
                            >
                                Log in
                                {isLoading && (
                                    <CircularProgress
                                        size={20}
                                        sx={{ marginLeft: 2 }}
                                    />
                                )}
                            </Button>
                        </Sheet>
                    </CssVarsProvider>
                </Box>
            )}
        </>
    ) : (
        <ActivateUser
            activate={mutateAsync}
            email={email}
            password={password}
            cancel={setIsNotActivated}
            userId={userId}
        />
    );
};

export default Login;
