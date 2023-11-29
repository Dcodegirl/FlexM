import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'svg-loaders-react';
import { Link } from 'react-router-dom';
import minus from '../../../assets/images/minus.svg';
import plus from '../../../assets/images/plus.svg';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../actions/page';
import formatToCurrency from '../../../utils/formatToCurrency';
import { GET_AGENT_WALLET_HISTORY } from '../../../utils/constants';
import { TransactionData, Transactions } from '../../dashboard/data/transactionData';
// import styles from './WalletLog.module.scss';
import arrowDown from '../../../assets/icons/arrowdown.svg';
import arrowUp from '../../../assets/images/arrowUp.svg';
import menu from '../../../assets/images/dots.svg';

export const WalletLog = ({ changeCurrentPage }) => {
    
    // const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const transactions = Transactions();
    // const [total, setTotal] = useState(null);
    // const [perPage, setPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [lastPage, setLastPage] = useState('');
    const [pageChangeLoading, setPageChangeLoading] = useState(false);
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [accordionToggle, setAccordionToggle] = useState(false);
    const [activeListItem, setActiveListItem] = useState(null);
    const firstPage = 1;
    const [isOpen, setIsOpen] = useState(false);
    const [transactionTypeFilter, setTransactionTypeFilter] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setDeviceWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    useEffect(() => {
        let isCancelled = false;

        setPageChangeLoading(true);

        const params = {};

        if (transactionTypeFilter) params.type = transactionTypeFilter;

        axios
            .get(`${GET_AGENT_WALLET_HISTORY}?page=${currentPage}`, { params })
            .then((res) => {
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
                }

                if (!isCancelled) {
                    setLastPage(lastPage);

                    // setTransactions(transactions);
                    setLoading(false);
                    setPageChangeLoading(false);
                }
            })
            .catch((err) => {
                if (!isCancelled) {
                    // setTransactions([]);
                    setLoading(false);
                    setPageChangeLoading(false);
                }
            });

        return () => {
            isCancelled = false;
        };
    }, [currentPage]);

    useEffect(() => {
        changeCurrentPage({
            heading: 'Wallet Log',
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

    return (
        <div className="bg-white p-8 rounded-md mt-8 overflow-x-auto md:overflow-x-hidden">

            <div className='md:w-full w-[1100px]'>
                <p className="text-deep-green font-medium my-4 text-3xl">Recent Transactions</p>

                <div>
                    <div className="grid grid-cols-6 grid-rows-1 p-8 font-medium text-xl bg-[#F1F1F1]">
                        <span>Previous Balance </span>
                        <span>Amount</span>
                        <span>Description </span>
                        <span>Current Balance </span>
                        <span>Transaction Type </span>
                        <span>
                            Date
                        </span>
                    </div>
                    <div>
                    {transactions.map((transaction, index) => (
                            <div key={index} className={`grid grid-cols-6 grid-rows-1 p-8 font-medium text-xl ${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'}`}>
                                <div className="text-wrapper-5">{transaction.PreviousBalance}</div>
                                <div className="text-wrapper-6">{transaction.Amount}</div>
                                <div className="text-wrapper-6 w-64">{transaction.Description}</div>
                                <div className="text-wrapper-6">{transaction.CurrentBalance}</div>
                                <div className="text-wrapper-6">{transaction.TransactionType}</div>
                                <div className="text-wrapper-9">{transaction.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* {transactions.length > 0 && !loading ? (
                <div className={styles.transactions}>
                    <h3 className={styles.transactionsHeading}>Logs</h3>

                    <div className={styles.table}>
                        <div className={styles.tableHeading}>
                            <span className={styles.sn}>Previous Balance </span>
                            <span className={styles.date}>Amount</span>
                            <span className={styles.amount}>Description </span>
                            <span className={styles.prev}>Current Balance </span>
                            <span className={styles.current}>Transaction Type </span>
                            <span className={styles.description}>
                                Date
                            </span>
                        </div>
                        <div className={styles.tableBody}>
                            {transactions.map((transaction, index) => {
                                const date = new Date(
                                    transaction.created_at
                                ).toString();
                                const formattedDate = date.slice(4, 24);

                                return (
                                    <div
                                        className={styles.tableRow}
                                        key={index}
                                    >
                                        <span className={styles.sn}>
                                            {++index}.
                                        </span>
                                        <span className={styles.date}>
                                            {formattedDate}
                                        </span>
                                        <span className={styles.amount}>
                                            {transaction.amount}
                                        </span>

                                        <span className={styles.prev}>
                                            {formatToCurrency(
                                                transaction.previous_bal
                                            )}
                                        </span>
                                        <span className={styles.current}>
                                            {formatToCurrency(
                                                transaction.current_bal
                                            )}
                                        </span>
                                        <span className={styles.description}>
                                            {transaction.description}
                                        </span>
                                        <span className={styles.type}>
                                            {transaction.type}
                                        </span>
                                        <span className={styles.mode}>
                                            {transaction.mode}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : loading || pageChangeLoading ? (
                <ThreeDots fill='#3E215B' />
            ) : (
                <div>No transactions to display</div>
            )}
            {!loading && pageChangeLoading && <ThreeDots fill='#3E215B' />}
            {!loading && transactions.length > 0 && (
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
                        First Page
                    </span>
                    <span
                        onClick={() => {
                            if (currentPage < lastPage) {
                                setCurrentPage(currentPage + 1);
                            }
                        }}
                        disabled={currentPage === lastPage}
                    >
                        Next Page
                    </span>
                    <span className={styles.active} disabled>
                        {currentPage}
                    </span>
                    <span
                        onClick={() => {
                            if (currentPage > firstPage) {
                                setCurrentPage(currentPage - 1);
                                setPageChangeLoading(true);
                            }
                        }}
                    >
                        Prev Page
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
                        Last Page
                    </span>
                </div>
            )} */}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    };
};

export default connect(undefined, mapDispatchToProps)(WalletLog);
