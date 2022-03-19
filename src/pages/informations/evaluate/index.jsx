import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, NavLink, Link } from 'umi';
import { List, Avatar, Form, Input, Button, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { variables, Helper } from '@/utils';
import HelperModules from '../utils/Helper';
import AvatarTable from '@/components/CommonComponent/AvatarTable';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';
import Select from '@/components/CommonComponent/Select';

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
@connect(({ user, loading, InformationEvaluate }) => ({
  user,
  loading,
  data: InformationEvaluate.data,
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    const {
      location: { query },
    } = props;
    this.state = {
      visible: false,
      search: {
        page: query?.page || variables.PAGINATION.PAGE,
        limit: query?.limit || variables.PAGINATION.PAGE_SIZE,
        keyWord: query?.keyWord,
      },
      objects: {},
    };
    setIsMounted(true);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'InformationEvaluate/GET_DATA',
      payload: {},
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
    } = this.props;
    const loading = effects['InformationEvaluate/GET_DATA'];

    return (
      <div className={styles['main-container']}>
        <Helmet title="Chi tiết booking" />
        <div className="d-flex justify-content-between align-items-center mb10">
          <h3 className={styles['heading']}>Hồ sơ</h3>
          <Button className={classnames(styles.button, styles.primary)}>Xem hồ sơ</Button>
        </div>
        <div className={styles['menu-container']}>
          <NavLink
            to="/ho-so/chinh-sua"
            className={styles['link']}
            activeClassName={styles['active']}
          >
            Chỉnh sửa hồ sơ
          </NavLink>
          <NavLink
            to="/ho-so/hinh-anh"
            className={styles['link']}
            activeClassName={styles['active']}
          >
            Hình ảnh
          </NavLink>
          <NavLink
            to="/ho-so/tin-tuong-va-xac-minh"
            className={styles['link']}
            activeClassName={styles['active']}
          >
            Tin tưởng và xác minh
          </NavLink>
          <NavLink
            to="/ho-so/danh-gia-ve-ban"
            className={styles['link']}
            activeClassName={styles['active']}
          >
            Đánh giá về bạn
          </NavLink>
          <NavLink
            to="/ho-so/danh-gia-ban-viet"
            className={styles['link']}
            activeClassName={styles['active']}
          >
            Đánh giá bạn viết
          </NavLink>
        </div>
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          colon={false}
          layout="horizontal"
          className="row"
        >
          <div className="col-lg-6 offset-lg-3 mt30">
            <div className={styles['details-container']}>
              <div
                className={classnames(
                  styles['heading-content'],
                  'd-flex',
                  'justify-content-between',
                  'align-items-center',
                )}
              >
                <h3 className={styles.title}>Đánh giá</h3>
              </div>
              <div className={styles['details-content']}>
                <div className={classnames(styles['messager-container'], 'pt20', 'pb10')}>
                  <p className={styles['norm']}>
                    Tất cả các đánh giá trước đây sẽ hiện ở đây. Mọi đánh giá ẩn cho thấy rằng bạn
                    vẫn cần phải hoàn thành đánh giá và thời gian xem xét (14 ngày sau khi thanh
                    toán) vẫn còn mở.
                  </p>
                </div>
                <div className={styles['feedback-container']}>
                  <div
                    className={classnames(
                      styles['feedback-item'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <AvatarTable
                      fullName={'Trần Thúy'}
                      avatar={'/images/avatar-default.png'}
                      description={'Đã đặt 12 lần'}
                    />
                    <div className={classnames(styles['feedback-time'], 'text-right')}>
                      <p className={styles['time']}>25/04/2021</p>
                      <Link to="/" className={styles.link}>
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                  <div
                    className={classnames(
                      styles['feedback-item'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <AvatarTable
                      fullName={'Nguyễn Văn Bình'}
                      avatar={'/images/avatar-default.png'}
                      description={'Tôi thích nơi này'}
                    />
                    <div className={classnames(styles['feedback-time'], 'text-right')}>
                      <p className={styles['time']}>21/04/2021</p>
                      <Link to="/" className={styles.link}>
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                  <div
                    className={classnames(
                      styles['feedback-item'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <AvatarTable
                      fullName={'Vũ Huy Hưng'}
                      avatar={'/images/avatar-default.png'}
                      description={'Nơi này đem lại cảm giác nghỉ dưỡng'}
                    />
                    <div className={classnames(styles['feedback-time'], 'text-right')}>
                      <p className={styles['time']}>11/04/2021</p>
                      <Link to="/" className={styles.link}>
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
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
