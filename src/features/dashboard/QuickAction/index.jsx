import React from 'react';
import { Link } from 'react-router-dom';
import { quickActionData } from '../data/quickActionData';
import loan from '../../../assets/icons/loan.svg';
import styles from '../../../pages/Overview/Overview.module.scss';

const QuickAction = ({ displayModal }) => {
    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8">
                <div>
                    <p className="text-deep-green font-medium my-4 text-3xl">Quick Action</p>
                </div>

                <div className='flex gap-5 w-full mt-8 justify-between' style={{flexWrap: 'wrap'}}>
                    {quickActionData.map((item, index) => (
                        item.modal ? ( // Check if a modal should be opened
                            <div
                                style={{ backgroundColor: item.bg }} // Fix the inline style here
                                className="rounded-2xl p-4 cursor-pointer"
                                key={index}
                                onClick={() => {
                                    displayModal({
                                        overlay: true,
                                        modal: item.modal,
                                    });
                                }}
                            >
                                <div className='flex flex-col w-[42px] items-center justify-center'>
                                    <img src={item.icon} alt="" />
                                    <p className='w-full text-[8px] text-center'>{item.text}</p>
                                </div>
                            </div>
                        ) : ( // If no modal, provide a Link to navigate
                            <Link to={item.to} key={index}>
                                <div
                                    style={{ backgroundColor: item.bg }} // Fix the inline style here
                                    className="rounded-2xl p-4"
                                >
                                    <div className='flex flex-col w-[42px] items-center justify-center'>
                                        <img src={item.icon} alt="" />
                                        <p className='w-full text-[8px] text-center'>{item.text}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </>
    );
};

export default QuickAction;
