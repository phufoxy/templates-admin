import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, Link } from 'umi';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.scss';
import Slider from 'react-slick';

@connect(({ user, loading }) => ({ user, loading }))
class Index extends PureComponent {
  render() {
    return (
      <>
        <Helmet title="Trang Chủ" />
        <div className={styles['main-container']}>
          {/* BANNER CONTAINER */}
          <div className={styles['banner-container']}>
            <div
              className={styles['banner-item']}
              style={{
                backgroundImage: `url('/images/home/banner.png')`,
              }}
            >
              <div className={styles['banner-content']}>
                <h3 className={styles['title']}>Travel</h3>
                <p className={styles['norm']}>Tận hưởng kỳ nghỉ của bạn</p>
              </div>
            </div>
          </div>
          {/* BANNER CONTAINER */}

          {/* SEACH CONTANER */}
          <div className={styles['search-container']}>
            <div className={styles['search-content']}>
              <span className="icon-search"></span>
              <Input placeholder="Tìm kiếm địa điểm" className={styles.input} />
            </div>
          </div>
          {/* SEACH CONTANER */}
        </div>
      </>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  location: {},
};

export default Index;
