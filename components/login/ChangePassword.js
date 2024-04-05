import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/joy/TextField';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/joy/Link';
import { errorNotify, successNotify } from '../notifications/notify';
import { useMutation } from 'react-query';
import AuthService from '../../ApiService/AuthService';
import { drawerFontColorActive, primary } from '../../constants/colors';

const ChangePassword = ({ activate, password, email, cancel, userId }) => {
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const { mutateAsync, isLoading } = useMutation(AuthService.changePassword, {
        onSuccess: async (data) => {
            if (data?.errors?.status === 400) {
                errorNotify('Incorrect password');
                return;
            }
            successNotify('Password has been changed');
            activate({ password: newPassword, email });
        },
        onError: async () => {
            errorNotify('Incorrect code');
        },
    });

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            handleNext();
        }
    };

    const handleNext = async () => {
        if (
            !prevPassword.length > 0 ||
            !newPassword.length > 0 ||
            !confirmNewPassword.length > 0
        ) {
            errorNotify('All fields must be filled');
        } else {
            if (newPassword !== confirmNewPassword) {
                errorNotify("New password' and 'Confirm password' must match.");
            } else {
                await mutateAsync({
                    id: userId,
                    password: prevPassword,
                    newPassword,
                });
            }
        }
    };

    return (
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
                        gap: 1,
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
                            Change password
                        </Typography>
                    </div>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPrevPassword(e.target.value)}
                        onKeyDown={keyPress}
                    />
                    <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        onKeyDown={keyPress}
                    />
                    <TextField
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        type="password"
                        placeholder="Confirm New Password"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        onKeyDown={keyPress}
                    />
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            style={{
                                marginRight: '20%',
                                cursor: 'pointer',
                                background: primary,
                                color: '#fff',
                                width: '40%',
                            }}
                            onClick={() => cancel(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                cursor:
                                    isLoading ||
                                    !prevPassword ||
                                    !newPassword ||
                                    !confirmNewPassword
                                        ? 'initial'
                                        : 'pointer',
                                background:
                                    isLoading ||
                                    !prevPassword ||
                                    !newPassword ||
                                    !confirmNewPassword
                                        ? 'rgb(213, 87, 96)'
                                        : primary,
                                color: '#fff',
                                width: '40%',
                            }}
                            onClick={handleNext}
                            disabled={
                                isLoading ||
                                !prevPassword ||
                                !newPassword ||
                                !confirmNewPassword
                            }
                        >
                            Change
                            {isLoading && (
                                <CircularProgress
                                    size={20}
                                    sx={{ marginLeft: 2 }}
                                />
                            )}
                        </Button>
                    </Box>
                </Sheet>
            </CssVarsProvider>
        </Box>
    );
};

export default ChangePassword;
