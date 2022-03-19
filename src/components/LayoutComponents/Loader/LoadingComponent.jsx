import React from 'react';
import classnames from 'classnames';
import styles from './style.module.scss';

const Loader = (props) => {
  return (
    <div
      className={classnames(
        styles['loader-component'],
        'd-flex',
        'justify-content-center',
        'align-items-center',
      )}
    >
      loading componenet
    </div>
  );
};

export default Loader;
