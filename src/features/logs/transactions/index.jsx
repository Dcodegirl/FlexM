// import React, { useState, useEffect } from 'react';
// import { TransactionData } from '../../dashboard/data/transactionData';
// import { useSelector } from 'react-redux';


// const TransactionLog = () => {
//     const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const agentId = useSelector((state) => state.auth.user?.id);

//     const fetchTransactionData = async () => {
//         try {
//             setLoading(true);
//             const response = await TransactionData(selectedPeriod, agentId);
//             const dataa = response.data;
//             setTransactions(dataa);
//             console.log('the data for trabnaction: ', dataa)
//         } catch (error) {
//             console.error('Error fetching transaction data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTransactionData(selectedPeriod);
//     }, [selectedPeriod, agentId]);

//     const handlePeriodSelect = (e) => {
//         const selectedPeriod = e.target.value;
//         console.log(`Selected Period: ${selectedPeriod}`);
//         setSelectedPeriod(selectedPeriod);
//     };
//     // const formatDate = (createdAt) => {
//     //     const date = new Date(createdAt);
//     //     const day = date.getDate();
//     //     const month = date.getMonth() + 1;
//     //     const year = date.getFullYear();
//     //     return `${day}/${month}/${year}`;
//     // };
//     // const getStatusLabel = (statusCode) => {
//     //     switch (statusCode) {
//     //         case '1':
//     //             return 'Pending';
//     //         case '2':
//     //             return 'Successful';
//     //         case '3':
//     //             return 'Failed';
//     //         default:
//     //             return 'Unknown';
//     //     }
//     // };

//     return (
//         <>
//             <div className="bg-white p-8 rounded-md mt-8">
//                 <div className="flex justify-between mb-24">
//                     <div>
//                         <p className="text-deep-green font-medium my-4 text-3xl">All Transactions</p>
//                     </div>
//                     <div className="flex items-center justify-center gap-3">
//                         <p>Sort By: </p>
//                         <select
//                             onChange={handlePeriodSelect}
//                             value={selectedPeriod}
//                             className="border rounded bg-[#F1F1F1] py-1.5 px-3"
//                         >
//                             <option value="Weekly">Weekly</option>
//                             <option value="Monthly">Monthly</option>
//                             <option value="Yearly">Yearly</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="box overflow-x-auto md:overflow-x-hidden">
//                     <div className="md:w-full w-[1000px]">
//                         <table className="w-full border-collapse border border-gray-200">
//                             <thead>
//                                 <tr className="bg-[#F1F1F1] text-xl">
//                                     <th className="p-3">Agent Code</th>
//                                     <th className="p-3">Description</th>
//                                     <th className="p-3">Amount</th>
//                                     <th className="p-3">Status</th>
//                                     <th className="p-3">Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loading ? (
//                                     <tr>
//                                         <td colSpan="5" className="p-3 text-center">
//                                             Loading...
//                                         </td>
//                                     </tr>
//                                 ) : transactions?.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="5" className="p-3 text-center">
//                                             No transactions found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     transactions.map((transaction, index) => (
//                                         <tr
//                                             key={index}
//                                             className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'
//                                                 } text-center text-xl`}
//                                         >
//                                             <td className="p-3">{transaction.agent_code}</td>
//                                             <td className="p-3">{transaction.status_description}</td>
//                                             <td
//                                                 className="p-3 font-bold"
//                                             >
//                                                 <span className="span">N</span>
//                                                 {parseFloat(transaction.amount).toLocaleString()}
//                                             </td>
//                                             <td
//                                                 style={{
//                                                     color:
//                                                         transaction.status === 'successful'
//                                                             ? '#00B378'
//                                                             : transaction.status === 'failed'
//                                                                 ? '#FF1919'
//                                                                 : '#FF9212',
//                                                 }}
//                                                 className="p-3"
//                                             >
//                                                 {transaction.status}
//                                             </td>

//                                             <td className="p-3">{transaction.Date}</td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TransactionLog;
import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import { ThreeDots } from 'svg-loaders-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DatePicker } from '@material-ui/pickers';
// import { startOfYear } from "date-fns";
import formatToCurrency from '../../../utils/formatToCurrency';
import ExportToExcel from '../../../components/common/ExportToExcel';
import styles from './TransactionLog.module.scss';
import { setCurrentPage } from '../../../actions/page';
import { setTransactionLog } from '../../../actions/transaction';
import { AGENT_TRANSACTION_HISTORY } from '../../../utils/constants';
import '../../../assets/styles/generic/daterangepicker.scss';
import arrowDown from '../../../assets/icons/arrowdown.svg';
import toggle from '../../../assets/icons/cross.svg';
import arrowUp from '../../../assets/images/arrowUp.svg';
import menu from '../../../assets/images/dots.svg';
import './custom-date.css';

export const TransactionLog = ({
    changeCurrentPage,
    setTransactionsLog,
    uuid,
}) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [lastPage, setLastPage] = useState('');
    const [pageChangeLoading, setPageChangeLoading] = useState(false);
    const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [selectedDateFrom, handleSelectedDateFrom] = useState('');
    const [selectedDateTo, handleSelectedDateTo] = useState('');
    const [mobileOpenRow, setMobileOpenRow] = useState('');

    const firstPage = 1;

    useEffect(() => {
        setPageChangeLoading(true);

        let formattedDates;
        let from;
        let to;

        if (selectedDateFrom && selectedDateTo) {
            formattedDates = convertDatesToString().split(' ');

            from = formattedDates[0];
            to = formattedDates[1];
        }

        const params = {};

        if (transactionTypeFilter) params.type = transactionTypeFilter;
        if (from) params.from = from;
        if (to) params.to = to;
        if (currentPage) params.page = currentPage;

        (async function getTransactionsLog() {
            try {
                const res = await axios.get('/transactions', {
                    params,
                });

                const transactions = res.data.data.data;
                const total = res.data.data.total;
                const perPage = res.data.data.per_page;
                const lastPage = res.data.data.last_page;
                let pageNumbers = [];

                if (total !== null && total > 0) {
                    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
                        pageNumbers.push(i);
                    }
                    setPageNumbers(pageNumbers);
                    setLastPage(lastPage);
                    // setBusinessName(businessName);
                    sessionStorage.setItem(
                        'transactions',
                        JSON.stringify(transactions)
                    );
                    setTransactions(transactions);
                }
            } catch (e) {
                // console.log(e)
            } finally {
                setLoading(false);
                setPageChangeLoading(false);
            }
        })();
    }, [
        transactionTypeFilter,
        selectedDateTo,
        selectedDateFrom,
        currentPage,
        // refresh,
    ]);

    //dispatching to redux state because we need transactions log to get transactionDetails
    useEffect(() => {
        setTransactionsLog(transactions);
    });

    useEffect(() => {
        changeCurrentPage({
            heading: 'Transaction Log',
            search: true,
        });
    }, [changeCurrentPage]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        let filter;

        if (value) {
            filter = parseInt(e.target.value);
        }

        setTransactionTypeFilter(filter);
    };

    const convertDatesToString = () => {
        if (selectedDateFrom && selectedDateTo) {
            let from = selectedDateFrom;
            let to = selectedDateTo;

            const fromMonth = from.getMonth();
            const toMonth = to.getMonth();
            const fromDate = from.getDate();
            const toDate = to.getDate();
            const fromYear = from.getFullYear();
            const toYear = to.getFullYear();

            const formattedFrom = `${fromYear}-${fromMonth + 1}-${fromDate}`;
            const formattedTo = `${toYear}-${toMonth + 1}-${toDate}`;

            return `${formattedFrom} ${formattedTo}`;
        }
    };

    const labels = [
        { name: 'Date created', value: 'date' },
        { name: 'Status', value: 'status' },
        { name: 'Previous Balance', value: 'previous balance' },
        { name: 'Current Balance', value: 'current balance' },
        { name: 'Amount', value: 'amount' },
        { name: 'Customer', value: 'customer' },
        { name: 'Reference', value: 'reference' },
        { name: 'Type', value: 'type' },
        {name:'Address',value:'address'},
    ];

    return (
        <div className={styles.container}>
            {transactions.length > 0 && !loading ? (
                <div className={styles.transactions}>
                    <h3 className={styles.transactionsHeading}>Transactions</h3>
                    <div className={styles.filter}>
                        <div className={styles.filterToggle}>
                            <span>Filter</span>
                            <img
                                src={isOpen ? arrowDown : arrowUp}
                                alt=''
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                }}
                            />
                        </div>
                        <div className={styles.exportToExcel}>
                            <ExportToExcel
                                dataset={transactions}
                                labels={labels}
                                filename='Transactions Log'
                            />
                        </div>
                        <div
                            className={
                                isOpen
                                    ? `${styles.filters} ${styles.isOpen}`
                                    : styles.filters
                            }
                        >
                            <label className={styles.inputGroup}>
                                <select
                                    className={styles.filterTransactions}
                                    onChange={handleFilterChange}
                                >
                                    <option value=''>
                                        Filter by Transaction Type
                                    </option>
                                    <option value=''>All transactions</option>
                                    <option value='1'>Energy</option>
                                    <option value='2'>Cashout</option>
                                    <option value='3'>Deposit</option>
                                    <option value='4'>Airtime</option>
                                    <option value='5'>DSTV</option>
                                    <option value='6'>GOTV</option>
                                    <option value='7'>Transfer</option>
                                    <option value='8'>Data</option>
                                </select>
                            </label>
                            <label className={styles.inputGroup}>
                                From:{' '}
                                <DatePicker
                                    disableFuture
                                    clearLabel
                                    openTo='date'
                                    format='dd/MM/yyyy'
                                    views={['year', 'month', 'date']}
                                    value={selectedDateFrom}
                                    onChange={handleSelectedDateFrom}
                                />
                            </label>
                            <label className={styles.inputGroup}>
                                To:{' '}
                                <DatePicker
                                    disableFuture
                                    clearLabel
                                    openTo='date'
                                    format='dd/MM/yyyy'
                                    views={['year', 'month', 'date']}
                                    value={selectedDateTo}
                                    onChange={handleSelectedDateTo}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.tableHeading}>
                            <span className={styles.status}>Status</span>
                            <span className={styles.date}>Date</span>
                            <span className={styles.amount}>Amount</span>
                            <span className={styles.type}>Type</span>
                            <span className={styles.prev}>Previous</span>
                            <span className={styles.current}>Balance</span>
                            <span className={styles.customer}>Customer</span>
                            <span className={styles.address}>Address</span>
                            <span className={styles.ref}>Reference</span>
                            <span className={styles.action}>Actions</span>
                        </div>
                        <div className={styles.tableBody}>
                            {transactions.map((transaction, index) => {
                                const date = new Date(
                                    transaction.created_at
                                ).toString();
                                const formattedDate = date.slice(4, 24);

                                return (
                                    <>
                                        <div
                                            className={styles.tableRow}
                                            key={index}
                                        >
                                            <span className={styles.status}>
                                                <span
                                                    className={`${
                                                        styles.color
                                                    } ${
                                                        transaction.status ===
                                                        'failed'
                                                            ? styles.failed
                                                            : transaction.status ===
                                                              'pending'
                                                            ? styles.pending
                                                            : styles.success
                                                    }`}
                                                ></span>
                                            </span>
                                            <span className={styles.date}>
                                                {formattedDate}
                                            </span>
                                            <span className={styles.amount}>
                                                {transaction.amount}
                                            </span>
                                            <span className={styles.type}>
                                                {transaction.transtype?.name}
                                            </span>
                                            <span className={styles.prev}>
                                                {formatToCurrency(
                                                    transaction.wallet_history
                                                        .previous_bal
                                                )}
                                            </span>
                                            <span className={styles.current}>
                                                {formatToCurrency(
                                                    transaction.wallet_history
                                                        .current_bal
                                                )}
                                            </span>
                                            <span className={styles.customer}>
                                                {transaction.customer_info}
                                            </span>
                                            <span className={styles.address}>
                                                {transaction.customer_address}
                                            </span>
                                            <span className={styles.ref}>
                                                {transaction.reference}
                                            </span>

                                            {/* <span className={styles.query}>
                    <img src={refresh} alt="" />
                  </span> */}
                                            <div className={styles.action}>
                                                <label htmlFor={`menu${index}`}>
                                                    <img
                                                        className={styles.menu}
                                                        src={menu}
                                                        alt=''
                                                    />
                                                </label>
                                                <input
                                                    name={`menu${index}`}
                                                    id={`menu${index}`}
                                                    type='checkbox'
                                                />

                                                <div className={styles.actions}>
                                                    <Link
                                                        to={`/transaction-details/${transaction.reference}`}
                                                    >
                                                        View Details
                                                    </Link>
                                                    {/* {transaction.status === "pending" && (
                          <div
                            onClick={() => {
                              handleRequeryTransactionStatus(
                                transaction.reference
                              );
                            }}
                          >
                            {requeryLoading && <ThreeDots fill="#3E215B" />}
                            <span>Re-query transaction</span>
                          </div>
                        )} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.tableRowMobile}
                                            key={index}
                                        >
                                            <div
                                                className={
                                                    styles.tableRowMobileHeading
                                                }
                                                onClick={() => {
                                                    mobileOpenRow ===
                                                    transaction.reference
                                                        ? setMobileOpenRow('')
                                                        : setMobileOpenRow(
                                                              transaction.reference
                                                          );
                                                }}
                                            >
                                                <span className={styles.status}>
                                                    <span
                                                        className={`${
                                                            styles.color
                                                        } ${
                                                            transaction.status ===
                                                            'failed'
                                                                ? styles.failed
                                                                : transaction.status ===
                                                                  'pending'
                                                                ? styles.pending
                                                                : styles.success
                                                        }`}
                                                    ></span>
                                                </span>
                                                <span className={styles.date}>
                                                    {new Date(
                                                        transaction.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                                <span className={styles.type}>
                                                    {
                                                        transaction.transtype
                                                            ?.name
                                                    }
                                                </span>
                                                <span className={styles.amount}>
                                                    {transaction.amount}
                                                </span>
                                                <img
                                                    src={toggle}
                                                    className={`${
                                                        styles.mobileItemBodyToggle
                                                    } ${
                                                        mobileOpenRow ===
                                                        transaction.reference
                                                            ? styles.mobileItemBodyToggleOpen
                                                            : styles.mobileItemBodyToggleClose
                                                    }`}
                                                    alt=''
                                                />
                                            </div>
                                            {mobileOpenRow ===
                                                transaction.reference && (
                                                <div
                                                    className={
                                                        styles.tableRowMobileBody
                                                    }
                                                    id={transaction.reference}
                                                >
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Status
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {transaction.status}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Date
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {formattedDate}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Amount
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {transaction.amount}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Type
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {
                                                                transaction
                                                                    .transtype
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Previous Balance
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {formatToCurrency(
                                                                transaction
                                                                    .wallet_history
                                                                    .previous_bal
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Current Balance
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {formatToCurrency(
                                                                transaction
                                                                    .wallet_history
                                                                    .current_bal
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Customer
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {
                                                                transaction.customer_info
                                                            }
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Reference
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {
                                                                transaction.reference
                                                            }
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Address
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            {
                                                                transaction.customer_address
                                                            }
                                                        </span>
                                                    </span>
                                                    {/* <span className={styles.query}>
                    <img src={refresh} alt="" />
                  </span> */}
                                                    <div
                                                        className={
                                                            styles.mobileItem
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mobileItemHeading
                                                            }
                                                        >
                                                            Actions
                                                        </span>
                                                        <div
                                                            className={
                                                                styles.mobileItemContent
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.actions
                                                                }
                                                            >
                                                                <Link
                                                                    to={`/transaction-details/${transaction.reference}`}
                                                                >
                                                                    View Details
                                                                </Link>
                                                                {/* {transaction.status === "pending" && (
                          <div
                            onClick={() => {
                              handleRequeryTransactionStatus(
                                transaction.reference
                              );
                            }}
                          >
                            {requeryLoading && <ThreeDots fill="#3E215B" />}
                            <span>Re-query transaction</span>
                          </div>
                        )} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : loading ? (
                <ThreeDots fill='#3E215B' />
            ) : (
                <div>No transactions to display</div>
            )}
            {pageChangeLoading && <ThreeDots fill='#3E215B' />}
            {!loading && transactions.length ? (
                <div className={styles.pagination}>
                    <span
                        onClick={() => {
                            setPageChangeLoading(true);
                            setCurrentPage(1);
                        }}
                        className={
                            currentPage === 1 ? styles.active : styles.normal
                        }
                    >
                        First
                    </span>
                    <span
                        onClick={() => {
                            if (currentPage < lastPage) {
                                setCurrentPage(currentPage + 1);
                            }
                        }}
                        disabled={currentPage === lastPage}
                    >
                        Next
                    </span>
                    <span
                        className={`${styles.currentPage} ${styles.active}`}
                        disabled
                    >
                        {currentPage}
                    </span>
                    {/* {
          pageNumbers.map((page, index) => {
            if (page === 1) {
              return <span key={`${index}--key`}onClick={() => {
                setCurrentPage(page);
                setPageChangeLoading(true);
              }} 
              className={currentPage === page ? styles.active : styles.normal}>{page}</span>              
            }
          })
        }  */}
                    <span
                        onClick={() => {
                            if (currentPage > firstPage) {
                                setCurrentPage(currentPage - 1);
                                setPageChangeLoading(true);
                            }
                        }}
                    >
                        Prev
                    </span>
                    <span
                        onClick={() => {
                            if (currentPage < lastPage) {
                                setCurrentPage(lastPage);
                                setPageChangeLoading(true);
                            }
                        }}
                        className={
                            currentPage === lastPage
                                ? styles.active
                                : styles.normal
                        }
                        disabled={currentPage === lastPage}
                    >
                        Last
                    </span>
                </div>
            ) : undefined}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        setTransactionsLog: (payload) => dispatch(setTransactionLog(payload)),
    };
};

const mapStateToProps = (state) => {
    return {
        uuid: state.auth.user.id,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionLog);
