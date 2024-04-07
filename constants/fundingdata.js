import * as ImgUrl from './officeimgurls';
import * as PlanStatus from './planstatus';

export const rows = [
    {
        id: 1,
        transactionId: 12345,
        lastName: 'Scott',
        firstName: 'Michael',
        bonusoffered: 10000,
        requestedamt: 10000,
        disbursemethod: 'Benefi',
        benefiremitdate: '03/05/2022',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        actionreqd: 'Remit payment to Benefi',
        dept: 'Management',
        avatar: ImgUrl.imgUrlMichael,
        planstatus: PlanStatus.VESTING_STATUS_NO_PLAN,
        statusdesc: PlanStatus.VESTING_STATUS_NO_PLAN_DESC,
    },
    {
        id: 2,
        transactionId: 12346,
        lastName: 'Schrute',
        firstName: 'Dwight',
        bonusoffered: 10000,
        requestedamt: 1000,
        disbursemethod: 'Payroll',
        actionreqd: '',
        benefiremitdate: '',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        dept: 'Sales',
        avatar: ImgUrl.imgUrlDwight,
        planstatus: PlanStatus.VESTING_STATUS_VESTING,
        statusdesc: PlanStatus.VESTING_STATUS_VESTING_DESC,
    },
    {
        id: 3,
        transactionId: 12347,
        lastName: 'Halpert',
        firstName: 'Jim',
        bonusoffered: 10000,
        requestedamt: 5000,
        disbursemethod: 'Payroll',
        actionreqd: '',
        benefiremitdate: '',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        dept: 'Sales',
        avatar: ImgUrl.imgUrlJim,
        planstatus: PlanStatus.VESTING_STATUS_NO_PLAN,
        statusdesc: PlanStatus.VESTING_STATUS_NO_PLAN_DESC,
    },
    {
        id: 4,
        transactionId: 12348,
        lastName: 'Kapoor',
        firstName: 'Kelly',
        bonusoffered: 10000,
        requestedamt: 10000,
        disbursemethod: 'Benefi',
        actionreqd: 'Remit payment to Benefi',
        benefiremitdate: '03/05/2022',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        dept: 'Operations',
        avatar: ImgUrl.imgUrlKelly,
        planstatus: PlanStatus.VESTING_STATUS_EMP_DEPART,
        statusdesc: PlanStatus.VESTING_STATUS_EMP_DEPART_DESC,
    },
    {
        id: 5,
        transactionId: 12349,
        lastName: 'Bernard',
        firstName: 'Andy',
        bonusoffered: 10000,
        requestedamt: 5000,
        disbursemethod: 'Benefi',
        // actionreqd: 'Remit payment to Benefi',
        benefiremitdate: '03/05/2022',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        actionreqd: 'Remit payment to Benefi',
        dept: 'Sales',
        avatar: ImgUrl.imgUrlAndy,
        planstatus: PlanStatus.VESTING_STATUS_BENEFI_TO_SEND,
        statusdesc: PlanStatus.VESTING_STATUS_BENEFI_TO_SEND_DESC,
    },
    {
        id: 6,
        transactionId: 12350,
        lastName: 'Philbin',
        firstName: 'Darryl',
        bonusoffered: 10000,
        requestedamt: 2000,
        disbursemethod: 'Payroll',
        actionreqd: '',
        benefiremitdate: '',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        // actionreqd: '',
        disbursmentdate: '02/12/2022',
        dept: 'Operations',
        avatar: ImgUrl.imgUrlDarryl,
        planstatus: PlanStatus.VESTING_STATUS_VESTED,
        statusdesc: PlanStatus.VESTING_STATUS_VESTED_DESC,
    },
    {
        id: 7,
        transactionId: 12351,
        lastName: 'Beesly',
        firstName: 'Pam',
        bonusoffered: 10000,
        requestedamt: 8000,
        disbursemethod: 'Payroll',
        benefiremitdate: '',
        actionreqd: '',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        // disbursmentdate: '02/12/2022',
        dept: 'Operations',
        avatar: ImgUrl.imgUrlPam,
        planstatus: PlanStatus.VESTING_STATUS_IN_DEFAULT,
        statusdesc: PlanStatus.VESTING_STATUS_IN_DEFAULT_DESC,
    },
    {
        id: 8,
        transactionId: 12352,
        lastName: 'Stanley',
        firstName: 'Hudson',
        bonusoffered: 10000,
        requestedamt: 10000,
        disbursemethod: 'Benefi',
        actionreqd: 'Remit payment to Benefi',
        benefiremitdate: '03/05/2022',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        dept: 'Sales',
        avatar: ImgUrl.imgUrlStanley,
        planstatus: PlanStatus.VESTING_STATUS_EMP_TO_SIGN,
        statusdesc: PlanStatus.VESTING_STATUS_EMP_TO_SIGN_DESC,
    },
    {
        id: 9,
        transactionId: 12353,
        lastName: 'Howard',
        firstName: 'Ryan',
        bonusoffered: 10000,
        requestedamt: 10000,
        disbursemethod: 'Payroll',
        actionreqd: '',
        benefiremitdate: '',
        eid: 'E28729',
        uei: 123456789,
        requesteddate: '01/01/2022',
        disbursmentdate: '02/12/2022',
        dept: 'Sales',
        avatar: ImgUrl.imgUrlRyan,
        planstatus: PlanStatus.VESTING_STATUS_CONTRACT_SIGNED,
        statusdesc: PlanStatus.VESTING_STATUS_CONTRACT_SIGNED_DESC,
    },
];
