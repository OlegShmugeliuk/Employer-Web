import * as React from 'react';
import {
    Typography,
    Box,
    Grid,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Chip,
    IconButton,
    Tooltip,
    MenuItem,
} from '@mui/material';
import * as Pages from '../../constants/pages';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

export default function Funding(props) {
    const { user } = React.useContext(AuthContext);
    const [employeeModal, setEmployeeModal] = React.useState(false);
    const [action, setAction] = React.useState();
    const [fundingRows, setFundingRows] = React.useState([]);

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'id',
            headerName: 'Transaction Id',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            editable: false,
            valueGetter: (params) => `${params.row?.id}`,
        },

        {
            field: 'fullName',
            headerName: 'Full name',
            headerAlign: 'center',
            align: 'center',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row?.employee?.firstName || ''} ${
                    params.row?.employee?.lastName || ''
                }`,
        },
        {
            field: 'requesteddate',
            headerName: 'Requested Date',
            type: 'date',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            editable: true,
        },
        {
            field: 'bonusoffered',
            headerName: 'Bonus Offered',
            headerAlign: 'center',
            align: 'center',
            width: 110,
            editable: true,
            valueGetter: (params) => {
                return `${
                    params?.row?.bonus?.amount
                        ? parseFloat(params?.row?.bonus?.amount).toLocaleString(
                              'en-US',
                              {
                                  style: 'currency',
                                  currency: 'USD',
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                              }
                          )
                        : ''
                }`;
            },
        },
        {
            field: 'requestedamt',
            headerName: 'Requested Amount',
            headerAlign: 'center',
            align: 'center',
            width: 200,
            editable: true,
            valueGetter: (params) => {
                return `${
                    params?.row?.signedBonuses?.amount
                        ? parseFloat(
                              params?.row?.signedBonuses?.amount
                          ).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                          })
                        : ''
                }`;
            },
        },
        {
            field: 'disbursmentdate',
            headerName: 'Disbursement Date',
            type: 'date',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            editable: true,
        },
        {
            field: 'disbursemethod',
            headerName: 'Disbursement Method',
            width: 180,
            editable: true,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.paymentSystem}`;
            },
        },
        {
            field: 'benefiremitdate',
            headerName: 'Benefi Remittance Date',
            type: 'date',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            editable: true,
            valueGetter: (params) => {
                return `${moment(params.row?.date).format('L')}`;
            },
        },
        {
            field: 'actionreqd',
            headerName: 'Action Required',
            headerAlign: 'center',
            align: 'center',
            width: 180,
            editable: true,
        },
        {
            field: 'invoice',
            headerName: 'Reference',
            headerAlign: 'center',
            align: 'center',
            width: 130,
            editable: true,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                console.log('Invoice');
                            }}
                        >
                            INVOICE
                        </Button>
                    </>
                );
            },
        },
    ];

    const { data: transactions, refetch: refetchTransactions } = useQuery(
        'getTransactionsByEmployer',
        () => EmployeeService.getTransactionByEmployer(user?.id),
        {
            enabled: !!user?.id,
        }
    );

    React.useEffect(() => {
        if (!transactions) return;
        const rowsData = transactions.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        console.log(rowsData);
        setFundingRows(rowsData);
    }, [transactions]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} xl={12} lg={12} height="650">
                    <Box sx={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={fundingRows}
                            columns={columns}
                            components={{ Toolbar: GridToolbar }}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            // checkboxSelection
                            disableSelectionOnClick
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
