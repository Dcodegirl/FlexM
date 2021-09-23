import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

function ProgressBar({ percentage }) {
    let color;
    const percentInNumber = parseInt(percentage, 10);

    if (percentInNumber < 65) {
        color = 'red';
    } else if (percentInNumber < 85) {
        color = 'orange';
    } else if (percentInNumber < 95) {
        color = 'green';
    } else {
        color = 'green full';
    }
    return (
        <div className='bar'>
            <span
                style={{ width: `${percentage}%` }}
                className={`${color} percent`}
            ></span>
        </div>
    );
}

ProgressBar.propTypes = {
    percentage: PropTypes.any,
};

export default ProgressBar;
