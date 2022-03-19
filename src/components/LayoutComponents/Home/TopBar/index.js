import React from 'react';
import ProfileMenu from './ProfileMenu';
import Setting from './Setting';
import styles from './style.module.scss';

class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        <div className="mr-4"></div>
        <div className="mr-auto"></div>
        <div className="mr-4">
          <Setting />
        </div>
        <ProfileMenu />
      </div>
    );
  }
}

export default TopBar;
