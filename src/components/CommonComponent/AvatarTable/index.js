import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '@/assets/styles/Common/common.scss';

class AvatarTable extends Component {
  render() {
    const { avatar, fullName, description } = this.props;
    return (
      <div className={styles['avatar-group']}>
        <Avatar size={50} src={avatar} />
        <div className={styles.content}>
          <h3 className={styles.title}>{fullName}</h3>
          <p className={styles.norm}>{description}</p>
        </div>
      </div>
    );
  }
}

AvatarTable.propTypes = {
  user: PropTypes.any,
};
AvatarTable.defaultProps = {
  user: {},
};

export default AvatarTable;
