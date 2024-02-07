import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../data/navData';

import logo from '../../../assets/images/flexbycico.svg';
import close from '../../../assets/icons/closeModal.svg';
import toggleIcon from '../../../assets/icons/toggleIcon.svg';
import Down from '../../../assets/icons/down.svg';

import styles from './Sidebar.module.scss';

export const Sidebar = ({ agentType, superAgentId, is_aggregator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);

      if (window.innerWidth === 1000) {
        setIsOpen(true);
      } else if (window.innerWidth < 1000) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className='md:w-96 '>
        <div
          className={styles.toggle}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img src={toggleIcon} alt="" className='h-12 w-12 mt-6' />
        </div>
        {isOpen && (
          <div
            className={styles.overlay}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></div>
        )}
        {(isOpen || width >= 1000) && (
          <div className={styles.sidebar}>
            <div className={styles.content}>
              <div>
                <img
                  src={logo}
                  className={styles.logo}
                  alt='company logo'
                />
              </div>
              <div
                className={styles.toggleSidebarClose}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <img
                  src={close}
                  className={styles.iconClose}
                  alt=''
                />
              </div>
              <nav className='flex flex-col gap-16 mt-16'>
                {navigationItems
                  .filter(
                    (item) =>
                      item.condition === undefined ||
                      (item.condition !== 'sub' || agentType !== 'sub')
                  )
                  .map((item, index) => {
                    if (item.isAggregator) {
                      if (superAgentId || is_aggregator === 1) {
                        return (
                          <div key={index}>
                            {item.to ? (
                              <NavLink
                                to={item.to}
                                className='flex gap-5 items-center'
                                activeClassName={styles.active}
                              >
                                <img src={item.icon} alt="" className='navItemImage' />
                                <span className='text-gray-700 font-normal text-xl'>{item.text}</span>
                              </NavLink>
                            ) : (
                              <div className='relative flex items-center'>
                                <div className='flex flex-col'>
                                  <div className='flex gap-5 items-center'>
                                    <img src={item.icon} alt="" className='navItemImage' />
                                    <div className='flex items-center'>
                                      <span className='text-gray-700 font-normal text-xl w-64'>{item.text}</span>
                                      <img
                                        src={Down}
                                        alt=""
                                        className='flex gap-5 items-center text-gray-700'
                                        onClick={() => setActiveDropdown(index === activeDropdown ? null : index)}
                                      />
                                    </div>
                                  </div>
                                  {index === activeDropdown && (
                                    <div
                                      className={`mt-12  bg-white h-full ml-12 flex flex-col gap-10 `}
                                    >
                                      {item.items
                                        .filter((subItem) => subItem.isAggregator ? superAgentId || is_aggregator === 1  : true)
                                        .map((subItem, subIndex) => (
                                          <NavLink
                                            key={subIndex}
                                            to={subItem.to}
                                            className='block text-gray-700 py-1'
                                            activeClassName={styles.active}
                                          >
                                            <span className='text-gray-700 font-normal text-xl w-64'>{subItem.text}</span>
                                          </NavLink>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    } else {
                      return (
                        <div key={index}>
                          {item.to ? (
                            <NavLink
                              to={item.to}
                              className='flex gap-5 items-center'
                              activeClassName={styles.active}
                            >
                              <img src={item.icon} alt="" className='navItemImage' />
                              <span className='text-gray-700 font-normal text-xl'>{item.text}</span>
                            </NavLink>
                          ) : (
                            <div className='relative flex items-center'>
                              <div className='flex flex-col'>
                                <div className='flex gap-5 items-center'>
                                  <img src={item.icon} alt="" className='navItemImage' />
                                  <div className='flex items-center'>
                                    <span className='text-gray-700 font-normal text-xl w-64'>{item.text}</span>
                                    <img
                                      src={Down}
                                      alt=""
                                      className='flex gap-5 items-center text-gray-700'
                                      onClick={() => setActiveDropdown(index === activeDropdown ? null : index)}
                                    />
                                  </div>
                                </div>
                                {index === activeDropdown && (
                                  <div
                                    className={`mt-12  bg-white h-full ml-12 flex flex-col gap-10 `}
                                  >
                                    {item.items
                                      .filter((subItem) => subItem.isAggregator ? superAgentId || is_aggregator === 1 : true)
                                      .map((subItem, subIndex) => (
                                        <NavLink
                                          key={subIndex}
                                          to={subItem.to}
                                          className='block text-gray-700 py-1'
                                          activeClassName={styles.active}
                                        >
                                          <span className='text-gray-700 font-normal text-xl w-64'>{subItem.text}</span>
                                        </NavLink>
                                      ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    agentType: state.auth.user.type,
    superAgentId: state.auth.user.super_agent_id,
    is_aggregator: state.auth.user.is_aggregator
  };
};

export default connect(mapStateToProps)(Sidebar);
