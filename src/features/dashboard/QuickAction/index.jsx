import React from 'react';
import { quickActionData } from '../data/quickActionData';
import styles from '../../../pages/Overview/Overview.module.scss';

const QuickAction = ({ displayModal }) => {
    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8">
                <div>
                    <p className="text-deep-green font-medium my-4 text-3xl">Quick Action</p>
                </div>

                <div className='flex gap-5 w-full mt-8 justify-between' style={{ flexWrap: 'wrap' }}>
                    {quickActionData.map((item, index) => (
                        <div
                            style={{ backgroundColor: item.bg }}
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
                    ))}
                </div>
            </div>
        </>
    );
};

export default QuickAction;
