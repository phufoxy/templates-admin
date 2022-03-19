import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, NavLink } from 'umi';
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
@connect(({ user, loading, InformationTrustVerify }) => ({
  user,
  loading,
  data: InformationTrustVerify.data,
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
      type: 'InformationTrustVerify/GET_DATA',
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
    const loading = effects['InformationTrustVerify/GET_DATA'];

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
                <h3 className={styles.title}>Xác minh hiện tại của bạn</h3>
              </div>
              <div className={styles['details-content']}>
                <div className={classnames(styles['messager-container'], 'pt20', 'pb10')}>
                  <h4 className={styles['title']}>Địa chỉ email</h4>
                  <p className={styles['norm']}>
                    Bạn đã xác nhận email của mình: abc@gmail.com. Email được xác nhận rất quan
                    trọng để cho phép chúng tôi liên lạc với bạn một cách an toàn
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
                <h3 className={styles.title}>Thêm xác minh khác</h3>
              </div>
              <div className={styles['details-content']}>
                <div className={styles['list-social']}>
                  <div
                    className={classnames(
                      styles['item-social'],
                      'd-flex',
                      'align-items-end',
                      'justify-content-between',
                    )}
                  >
                    <div className={styles['content-social']}>
                      <h4 className={styles['title']}>Facebook</h4>
                      <p className={styles['norm']}>
                        Đăng nhập bằng Facebook và khám phá các kết nối đáng tin cậy của bạn với các
                        máy chủ và khách trên khắp thế giới.
                      </p>
                    </div>
                    <Button className={classnames(styles.button, styles['primary-dash'])}>
                      Kết nối
                    </Button>
                  </div>
                  <div
                    className={classnames(
                      styles['item-social'],
                      'd-flex',
                      'align-items-end',
                      'justify-content-between',
                    )}
                  >
                    <div className={styles['content-social']}>
                      <h4 className={styles['title']}>Google</h4>
                      <p className={styles['norm']}>
                        Kết nối tài khoản Travel với tài khoản Google của bạn để sử dụng đơn giản và
                        dễ dàng hơn.
                      </p>
                    </div>
                    <Button className={classnames(styles.button, styles['primary-dash'])}>
                      Kết nối
                    </Button>
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
