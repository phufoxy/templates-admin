import React from 'react';
import classnames from 'classnames';
import styles from './style.module.scss';

const Loader = (props) => {
  return (
    <div
      className={classnames(
        styles.loader,
        'd-flex',
        'justify-content-center',
        'align-items-center',
      )}
    >
      <div className={classnames(styles.content, 'text-center')}>
        <h3 className={styles.title}>Travel</h3>
        <p className={styles.norm}>Good life for you</p>
      </div>
      <div className={styles['lds-spinner']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
