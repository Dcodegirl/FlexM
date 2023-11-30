import AddUser from '../features/users/AddUser';
import Users from '../features/users/index';
import FundWallet from '../features/services/fundWallet/FundWallet';
import FundsTransfer from '../features/services/transfer/index';
import BuyAirtime from '../features/services/airtime/index';
import ElectricityPayment from '../features/services/electricity/index';
import BuyData from '../features/services/data/index';
import RechargeCable from '../features/services/cable/index';
import BuyInsurance from '../features/services/insurance/BuyInsurance';
import WalletLog from '../features/logs/wallet/index';
import CommissionLogs from '../features/logs/commissions/index';
import AggregatorLogs from '../features/logs/aggregator/index';
import viewAgents from '../pages/viewAgents'
import ViewSingleAgent from '../pages/viewSingleAgent';
import CreateAgent from '../features/aggregator/createAgent';
import AgentPerfomance from '../pages/agentPerformance';
import TransactionLog from '../features/logs/transactions';
import Profile from '../features/profile/Profile';
import Support from '../pages/support';
import WalletTransfer from '../features/services/walletTransfer/WalletTransfer';
import CommissionTransfer from '../features/services/commissionTransfer/CommissionTransfer';
import BillPayment from '../pages/BillPayment';
import AirtimeData from '../pages/AirtimeData';
import LoanPage from '../pages/Loan';
import LoanHistory from '../features/services/loan/LoanHistory';
import RepaymentHistory from '../features/services/loan/RepaymentHistory';
import Overview from '../pages/Overview/Overview';
import Contact from '../pages/Contact';
import TransactionDetails from '../components/common/TransactionDetails';
import Documents from '../features/profile/documents';

const routes = [
    {
        path: '/',
        exact: true,
        component: Overview,
    },
    {
        path: '/overview',
        component: Overview,
    },
    // {
    //   path: "/login",
    //   component: Login,
    // },
    {
        path: '/contact-us',
        component: Contact,
    },
    {
        path: '/users',
        component: Users,
    },
    {
        path: '/list-users',
        component: AddUser,
    },
    // {
    //   path: "/my-terminals",
    //   component: Terminals,
    // },
    {
        path: '/transactions',
        exact: true,
        component: TransactionLog,
    },
    {
        path: '/transactions/log',
        exact: true,
        component: TransactionLog,
    },
    // {
    //   path: "/transactions/new",
    //   exact: true,
    //   component: NewTransaction,
    // },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/create-agent',
        component: CreateAgent,
    },
    {
        path: '/support',
        component: Support,
    },
    {
        path: '/agents-performance',
        component: AgentPerfomance,
    },
    {
        path: '/view-agents',
        component: viewAgents,
    },
    {
        path: '/agent/view',
        component: ViewSingleAgent,
    },
    {
        path: '/wallet',
        exact: true,
        component: WalletLog,
    },
    {
        path: '/wallet/fund',
        exact: true,
        component: FundWallet,
    },
    {
        path: '/wallet/transfer',
        exact: true,
        component: WalletTransfer,
    },
    {
        path: '/wallet/log',
        exact: true,
        component: WalletLog,
    },
    {
        path: '/commission',
        exact: true,
        component: CommissionLogs,
    },  
    {
        path: '/aggregator',
        exact: true,
        component: AggregatorLogs,
    },

    {
        path: '/commission/transfer',
        exact: true,
        component: CommissionTransfer,
    },  
    // {
    //   path: "/activity-log",
    //   component: ActivityLog,
    // },
    //passing props to transaction details because we need match to extract id
    {
        path: '/transaction-details/:id',
        component: TransactionDetails,
    },
    {
        path: '/buy-airtime',
        component: BuyAirtime,
    },
    {
        path: '/pay-electricity',
        component: ElectricityPayment,
    },
    {
        path: '/buy-data',
        component: BuyData,
    },
    {
        path: '/recharge-cable',
        component: RechargeCable,
    },
    {
        path: '/buy-insurance',
        component: BuyInsurance,
    },
    {
        path: '/transfer',
        component: FundsTransfer,
    },
    {
        path: '/bill-payment',
        component: BillPayment,
    },
    {
        path: '/airtime-data',
        component: AirtimeData,
    },
    {
        path: '/loan',
        component: LoanPage,
        exact: true,
    },
    {
        path: '/loan/history',
        component: LoanHistory,
    },
    {
        path: '/loan/repayment-history',
        component: RepaymentHistory,
    },
    {
        path: '/documents',
        component: Documents,
        exact: true,
    },
];

export default routes;
