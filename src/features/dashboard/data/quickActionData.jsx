// quickActionData.js
import cable from '../../../assets/icons/cable.svg';
import electricity from '../../../assets/icons/electricity.svg';
import bet from '../../../assets/icons/bet.svg';
import data from '../../../assets/icons/data.svg';
import transfer from '../../../assets/icons/transfer.svg';
import loan from '../../../assets/icons/loan.svg';
import airtime from '../../../assets/icons/airtime.svg';

export const quickActionData = [
    {
      to: '/transfer',
      className: 'cardTransfer',
      icon: transfer,
      text: 'Transfer',
      bg: '#efeafb',
      modal: null
      // modal: 'fundsTransfer',
    },
    {
      to: '/cable-payment',
      className: 'cableBill',
      icon: cable,
      text: 'Cables',
      bg: '#fefeeb',
      modal: null,
    },
    {
      to: '/airtime-data',
      className: 'data',
      icon: data,
      text: 'Data',
      bg: '#ebffe9',
      modal: null,
    },
    {
      to: '/bill-payment',
      className: 'cardBill',
      icon: electricity,
      text: 'Electricity',
      bg: '#d1e4fa',
      modal: null,
    },
    {
      to: '/bet',
      className: 'cardBill',
      icon: bet,
      text: 'Bet',
      bg: '#eff9f9',
      modal: null,
    },
    {
      to: '/airtime-airtime',
      className: 'cardAirtime',
      icon: airtime,
      text: 'Airtime',
      bg: '#fbeae9',
      modal: null,
    },
    {
      to: '/loan-bill',
      className: 'cardCash',
      icon: loan,
      text: 'Loan',
      bg: '#ebffe9',
      modal: null,
    },
  ];
  