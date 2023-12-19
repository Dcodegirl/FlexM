// navData.jsx
import { useSelector } from 'react-redux';


import overviewIcon from '../../../assets/icons/overviewIcon.svg'
import walletIcon from '../../../assets/icons/walletIcon.svg'
import transactionIcon from '../../../assets/icons/transactionIcon.svg'
import commisionIcon from '../../../assets/icons/commisionIcon.svg'
import usersIcon from '../../../assets/icons/usersIcon.svg'
import supportIcon from '../../../assets/icons/supportIcon.svg'
import reportIcon from '../../../assets/icons/reportIcon.svg'
import settingIcon from '../../../assets/icons/settingIcon.svg'

export const navigationItems = [
  { to: '/overview', text: 'Overview', icon: overviewIcon, isAggregator: false },
  {
    text: 'My Wallet', icon: walletIcon, hasSubMenu: true,
    items: [
      { to: '/wallet', text: 'Main Wallet', isAggregator: false },
      { to: '/aggregator', text: 'Aggregator Wallet', isAggregator: true },
      { to: '/commission', text: 'Commission Wallet', isAggregator: false },
    ],
  },
  { to: '/transactions', text: 'Transactions', icon: transactionIcon, isAggregator: false },
  {
    text: 'Agent Management', icon: commisionIcon, hasSubMenu: true,
    items: [
      { to: '/create-agent', text: 'Create Agent', isAggregator: false },
      { to: '/view-agents', text: "View Agents", isAggregator: false },
      { to: '/agents-performance', text: "Agent's Performance", isAggregator: false },
      // { to: '/agents-transaction', text: "Agent's Transaction", isAggregator: false },
    ],
  },
  { to: '/users', text: 'Users', icon: usersIcon, isAggregator: false },
  { to: '/settings', text: 'Settings', icon: settingIcon, isAggregator: false },
  { to: '/support', text: 'Support', icon: supportIcon, isAggregator: false },
];
