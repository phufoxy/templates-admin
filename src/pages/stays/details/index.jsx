import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, Link } from 'umi';
import { List, Avatar, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { variables, Helper } from '@/utils';
import HelperModules from '../utils/Helper';
import AvatarTable from '@/components/CommonComponent/AvatarTable';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';

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
@connect(({ user, loading, staysDetails }) => ({ user, loading, data: staysDetails.data }))
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
      type: 'staysDetails/GET_DATA',
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
    const loading = effects['staysDetails/GET_DATA'];

    return (
      <div className={styles['main-container']}>
        <Helmet title="Chi tiết services" />
        <Breadcrumbs last="Chi tiết" />
        <div className="d-flex justify-content-between align-items-center mb10">
          <h3 className={styles['heading']}>Chi tiết services</h3>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className={styles['details-container']}>
              <div
                className={classnames(
                  styles['heading-content'],
                  'd-flex',
                  'justify-content-between',
                  'align-items-center',
                )}
              >
                <h3 className={styles.title}>Yêu cầu đặt trước</h3>
                <p className={styles.time}>
                  Hết hạn sau <strong className={styles.danger}>22:12:54</strong>
                </p>
              </div>
              <div className={styles['details-content']}>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Tài sản</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px - 120px)',
                    }}
                  >
                    <p className={styles['norm']}>Được trang bị đầy đủ</p>
                  </div>
                  <div className={classnames(styles.col, 'min-width-120')}>
                    <Link to="/" className={styles.link}>
                      Xem tài sản
                    </Link>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Ngày đến</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px - 120px)',
                    }}
                  >
                    <p className={styles['norm']}>22/04/2021</p>
                  </div>
                  <div className={classnames(styles.col, 'min-width-120')}>
                    <Link to="/" className={styles.link}>
                      Xem lịch
                    </Link>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Tài sản</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px)',
                    }}
                  >
                    <p className={styles['norm']}>24/04/2021</p>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Số đêm</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px)',
                    }}
                  >
                    <p className={styles['norm']}>3</p>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Số khách</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px)',
                    }}
                  >
                    <p className={styles['norm']}>10</p>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Chính sách hủy</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px - 150px)',
                    }}
                  >
                    <p className={styles['norm']}>Linh hoạt</p>
                  </div>
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <Link to="/" className={styles.link}>
                      Xem chính sách
                    </Link>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Giá (mỗi đêm)</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px )',
                    }}
                  >
                    <p className={styles['norm']}>700.000 đ</p>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>700.000 đ x 3</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px )',
                    }}
                  >
                    <p className={styles['norm']}>2.100.000 đ</p>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Tổng phí</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px )',
                    }}
                  >
                    <p className={styles['norm']}>700.000 đ</p>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>Phí chủ nhà</p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px )',
                    }}
                  >
                    <p className={styles['norm']}>- 50.000 đ</p>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['details-item'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <div className={classnames(styles.col, 'min-width-150')}>
                    <p className={styles['norm']}>
                      <strong>Tổng cộng</strong>
                    </p>
                  </div>
                  <div
                    className={classnames(styles.col, 'min-width-150')}
                    style={{
                      width: 'calc(100% - 150px )',
                    }}
                  >
                    <p className={styles['norm']}>
                      <strong>650.000 đ</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles['details-container']}>
              <div
                className={classnames(
                  styles['heading-content'],
                  'd-flex',
                  'justify-content-between',
                  'align-items-center',
                )}
              >
                <h3 className={styles.title}>Về khách hàng</h3>
              </div>
              <div className={styles['details-content']}>
                <div
                  className={classnames(styles['image-container'], 'd-flex', 'align-items-center')}
                >
                  <Avatar src="/images/avatar-default.png" alt="avatar-default." size={100} />
                  <div className={styles['content']}>
                    <h4 className={styles['title']}>Trần Thúy</h4>
                    <p className={styles['norm']}>Tham gia từ tháng 10/2019 - Đã đặt 12 lần</p>
                    <p className={styles['norm']}>25 tuổi</p>
                  </div>
                </div>
                <div className={styles['messager-container']}>
                  <h4 className={styles['title']}>Tin nhắn</h4>
                  <p className={styles['norm']}>
                    Xin chào, Mình thấy nơi lưu trú của bạn rất phù hợp với kế hoạch sắp tới của
                    tôi. Bạn xác nhận giúp mình nhé.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles['details-container']}>
              <div
                className={classnames(
                  styles['heading-content'],
                  'd-flex',
                  'justify-content-between',
                  'align-items-center',
                )}
              >
                <div>
                  <h3 className={styles.title}>Duyệt yêu cầu</h3>
                  <p className={styles['norm']}>
                    Bạn sẽ bị phạt nếu bạn không duyệt hoặc từ chối yêu cầu này trước khi nó hết hạn
                  </p>
                </div>
              </div>
              <div className={styles['details-content']}>
                <Form hideRequiredMark layout="vertical" className={styles['form-container']}>
                  <Form.Item
                    label={<span className={styles.label}>Tin nhắn</span>}
                    name="messager"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 7, maxRows: 10 }}
                      placeholder={'Nhập'}
                      showCount
                    />
                  </Form.Item>
                  <div
                    className={classnames(
                      styles['group-button'],
                      'd-flex',
                      'justify-content-center',
                      'align-items-center',
                    )}
                  >
                    <Button
                      className={classnames(styles.button, styles.primary)}
                      onClick={this.onLogin}
                    >
                      Duyệt yêu cầu
                    </Button>
                    <Button className={classnames(styles.button, styles.danger)}>Từ chối</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
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
