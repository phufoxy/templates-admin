import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, Link, history } from 'umi';
import { List, Button } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { variables } from '@/utils';
import ImageTable from '@/components/CommonComponent/ImageTable';
import HelperModules from '../utils/Helper';

let isMounted = true;
/**
 * Set isMounted
 * @param {boolean} value
 * @returns {boolean} value of isMounted
 */
const setIsMounted = (value = true) => {
  isMounted = value;
  return isMounted;
};
/**
 * Get isMounted
 * @returns {boolean} value of isMounted
 */
const getIsMounted = () => isMounted;
@connect(({ user, loading, items }) => ({ user, loading, data: items.data }))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    const {
      location: { query },
    } = props;
    this.state = {
      search: {
        page: query?.page || variables.PAGINATION.PAGE,
        limit: query?.limit || variables.PAGINATION.PAGE_SIZE,
        keyWord: query?.keyWord,
      },
    };
    setIsMounted(true);
  }

  componentDidMount() {
    const { search } = this.state;
    this.props.dispatch({
      type: 'items/GET_DATA',
      payload: { ...search },
    });
  }

  componentWillUnmount() {
    setIsMounted(false);
  }

  /**
   * Set state properties
   * @param {object} data the data input
   * @param {function} callback the function which will be called after setState
   * @returns {void} call this.setState to update state
   * @memberof setStateData
   */
  setStateData = (state, callback) => {
    if (!getIsMounted()) {
      return;
    }
    this.setState(state, callback);
  };

  render() {
    const {
      data,
      loading: { effects },
      location: { pathname },
    } = this.props;
    const loading = effects['items/GET_DATA'];
    return (
      <div className={styles['main-container']}>
        <Helmet title="Danh sách phòng" />
        <div className="d-flex justify-content-between align-items-center mb10">
          <h3 className={styles.heading}>Danh sách phòng</h3>
          <Button
            htmlType="submit"
            className={classnames(styles.button, styles.primary)}
            onClick={() => history.push(`${pathname}/tao-moi`)}
          >
            Thêm mới
          </Button>
        </div>
        <Scrollbars autoHeight autoHeightMax="calc(100vh - 120px)">
          <List
            itemLayout="horizontal"
            className={styles['list-container']}
            dataSource={data}
            loading={loading}
            renderItem={(item) => (
              <List.Item className={styles['list-item']}>
                <div
                  className={classnames(styles.col, 'min-width-250')}
                  style={{
                    width: 'calc(100% - 200px - 200px - 120px',
                  }}
                >
                  <ImageTable
                    title="Tina House DN - Căn hộ view phố, gần sông"
                    img="/images/image-default.png"
                    description="22 Hoàng Diệu, Đà Nẵng"
                  />
                </div>
                <div className={classnames(styles.col, 'min-width-200')}>
                  {HelperModules.tagStatus(item.status)}
                </div>
                <div className={classnames(styles.col, 'min-width-200')}>
                  <Button className={classnames(styles.button, styles.grey)}>Sao chép</Button>
                </div>
                <div className={classnames(styles.col, 'min-width-120')}>
                  <Link to="/" className={styles.link}>
                    QUẢN LÝ <span className="icon-next" />
                  </Link>
                </div>
              </List.Item>
            )}
          />
        </Scrollbars>
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  location: {},
  data: [],
};

export default Index;
