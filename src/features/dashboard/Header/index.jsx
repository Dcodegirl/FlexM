import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { startLogout } from '../../../actions/auth';
import { createNotification } from '../../../actions/notification';
import imagebg from '../../../assets/icons/Ellipse 179.png';
import notification from '../../../assets/icons/bell 1.svg';
import user from '../../../assets/images/user.svg';
import searchIcon from '../../../assets/icons/mdi_search.svg';
import arrowdown from '../../../assets/icons/mdi_.svg';
import right from '../../../assets/icons/arrowright.svg';
import lock from '../../../assets/icons/lock.svg';
import users from '../../../assets/icons/users.svg';
import bioUser from '../../../assets/icons/bio-user.svg';
import exit from '../../../assets/icons/exit.svg';
import pinLock from '../../../assets/icons/pin.svg';
import flexShield from '../../../assets/icons/bronze-badge.svg';
import premiumShield from '../../../assets/icons/silver-badge.svg';
import vipShield from '../../../assets/icons/gold-badge.svg';
import mark from '../../../assets/icons/aggregator.svg';
import sun from '../../../assets/icons/sun.svg';
import Ellipse from '../../../assets/icons/Ellipse.svg';
import profile from '../../../assets/images/profileImage.png';


import styles from './Header.module.scss';

const Header = ({
    currentPage,
    isDefaultPassword,
    notifications,
    createNotification,
    name,
    walletId,
    logout,
    agentClassification,
    vfdAccountNumber,
    virtualAccountNumber,
    virtualAccountBank
}) => {
    const [toggleUser, setToggleUser] = useState(false);
    const wrapperRef = useRef(null);

    const { addToast } = useToasts();
    const agentClassificationLowercase = agentClassification.toLowerCase();
    const agentClassificationIcon =
        agentClassificationLowercase === 'premium'
            ? premiumShield
            : agentClassificationLowercase === 'vip'
                ? vipShield
                : flexShield;

    useEffect(() => {
        let isCancelled;

        if (!isCancelled) {
            if (isDefaultPassword == 1) {
                addToast('Please create a new password to continue', {
                    appearance: 'info',
                    autoDismiss: false,
                });
            }
        }

        return () => {
            isCancelled = true;
        };
    }, []);

    const handleToggleNotifications = () => {
        notifications.forEach((notification) => {
            addToast(notification.body, {
                appearance: 'info',
                autoDismiss: false,
            });
        });
    };

    function useClickOutside(ref) {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setToggleUser(false);
            }
        }

        useEffect(() => {
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);
    }

    useClickOutside(wrapperRef);

    return (
        <header className={'styles.header flex md:justify-end bg-white h-full justify-between'}>
            <div className={`styles.container flex justify-between h-full items-center md:gap-3 w-[450px]  md:px-12 px-3`}>
                <div className="relative md:block hidden">
                    <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400" />
                    <input type="text" placeholder="Search transactions" className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                </div>
                <div
                    className={styles.notification}
                    onClick={handleToggleNotifications}
                >
                    <img src={notification} alt='notification bell' className='md:block hidden'/>
                    <span className={`styles.active md:block hidden`}>
                        {notifications.length}
                    </span>
                </div>
                <div className={styles.profile}>
                    <img src={imagebg} alt="" className='relative w-[30px] h-[30px] md:block hidden' />
                    <img
                        className={`styles.profileImage w-[20px] h-[20px] absolute ml-2 md:block hidden`}
                        src={user}
                        alt='User silhoutte'
                        onClick={() => {
                            setToggleUser(!toggleUser);
                        }}
                    />
                    <div className={`styles.agentName w-full text-[12px] text-icon-purple uppercase md:block hidden`}>{name}</div>
                    <img
                        src={arrowdown}
                        className={styles.profileToggle}
                        onClick={() => {
                            setToggleUser(!toggleUser);
                        }}
                        alt=''
                    />
                    {/* <img
                        src={agentClassificationIcon}
                        alt=''
                        className={styles.agentCategory}
                    /> */}
                    {toggleUser && (
                        <div className={styles.userSubmenu} ref={wrapperRef}>
                            <div className={styles.userSubmenuBio}>
                                <img
                                    src={user}
                                    alt='user avatar'
                                    className={styles.userSubmenuBioAvatar}
                                />
                                <span className={styles.userSubmenuBioService}>
                                    {name}
                                    <img
                                        className={styles.userSubmenuBioBadge}
                                        src={agentClassificationIcon}
                                        alt=''
                                    />
                                </span>
                                <span className={styles.userSubmenuBioWallet}>
                                    Wallet ID: {walletId}
                                </span>
                                <span className={styles.userSubmenuBioWallet}>
                                    Account No: {virtualAccountNumber}
                                </span>
                                <span className={styles.userSubmenuBioWallet}>
                                    Bank Name : {virtualAccountBank}
                                </span>
                            </div>
                            <div className={styles.userSubmenuMain}>
                                <Link
                                    to='/profile'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={pinLock}
                                        alt=''
                                    />
                                    <span>Update transaction pin</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <Link
                                    to='/profile'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={bioUser}
                                        alt=''
                                    />
                                    <span>Edit Profile</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <Link
                                    to='users'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={users}
                                        alt=''
                                    />
                                    <span>Users</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <Link
                                    to='Profile'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={lock}
                                        alt=''
                                    />
                                    <span>Change Password</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <div
                                    className={`${styles.userSubmenuMainItem} ${styles.logout}`}
                                    aria-label='button'
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <img
                                        className={styles.icon}
                                        src={exit}
                                        alt=''
                                    />
                                    <span
                                        className={`${styles.submenuItemText} ${styles.logoutText}`}
                                    >
                                        Logout
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='md:hidden block flex gap-9'>
                    <div className='flex gap-3' >
                    <div>
                        <img src={profile} alt="user pic" className='w-[20px]'/>
                    </div>
                    <div className=''>
                        <div className='flex gap-2'><div><h1 className='text-[12px] font-bold'>Hi, Mark!    </h1></div></div>
                        <div className='flex items-center'>
              <img src={sun} alt="star" className='w-[10px]'/>
              <div>
                <span className='text-[#748274]'>Tuesday, October 27</span>

                </div>
                        </div>
                        </div>
                    </div>
                    <div className=''>
                    <img
                        src={arrowdown}
                        className={styles.profileToggle}
                        onClick={() => {
                            setToggleUser(!toggleUser);
                        }}
                        alt=''
                        style={{width: '30px'}}
                    />
                    </div>
                    
                </div>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => {
    return{
        currentPage: state.page,
        isDefaultPassword: state.auth.user.is_default,
        notifications: state.notification.notifications,
        walletId: state.auth.user.walletNo,
        name: `${state.auth.user.firstName} ${state.auth.user.lastName}`,
        agentClassification: state.auth.user.agentClassification,
        vfdAccountNumber: state.auth.user.vfd_account_number,
        virtualAccountNumber: state.auth.user.virtualAccountNumber,
        virtualAccountBank: state.auth.user.virtualAccountBank,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(startLogout()),
        createNotification: (payload) => dispatch(createNotification(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
