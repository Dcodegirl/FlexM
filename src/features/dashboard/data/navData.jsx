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
  { to: '/overview', text: 'Overview', icon: overviewIcon },
  {
    text: 'My Wallet', icon: walletIcon, hasSubMenu: true,
    items: [
      { to: '/wallet', text: 'Main Wallet' },
      { to: '/aggregator', text: 'Aggregator Wallet' },
      { to: '/commission', text: 'Commission Wallet' },
    ],
  },
  { to: '/transactions', text: 'Performance', icon: transactionIcon },
  {
    text: 'Agent Management', icon: commisionIcon, hasSubMenu: true,
    items: [
      { to: '/create-agent', text: 'Create Agent' },
      { to: '/transactions/outgoing', text: "View Agents" },
      { to: '/transactions/outgoing', text: "Agent's Performance" },
      { to: '/transactions/outgoing', text: "Agent's Transaction" },
    ],
  },
  { to: '/users', text: 'Users', icon: usersIcon, condition: 'sub' },
  { to: '/report', text: 'Report', icon: reportIcon },
  { to: '/contact-us', text: 'Settings', icon: settingIcon },
];
