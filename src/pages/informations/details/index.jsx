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
@connect(({ user, loading, InformationDetails }) => ({
  user,
  loading,
  data: InformationDetails.data,
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
      type: 'InformationDetails/GET_DATA',
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
    const loading = effects['InformationDetails/GET_DATA'];

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
                <h3 className={styles.title}>Cần thiết</h3>
              </div>
              <div className={styles['details-content']}>
                <Form.Item
                  label={<span>Họ của bạn</span>}
                  name="fullName"
                  className={styles['form-item']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<span>Tên của bạn</span>}
                  name="name"
                  className={styles['form-item']}
                  extra="Tên được dùng để xác nhận booking với tài khoản khác"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<span>Giới tính</span>}
                  name="gender"
                  className={styles['form-item']}
                >
                  <Select dataSet={[]} />
                </Form.Item>
                <Form.Item
                  label={<span>Ngày sinh</span>}
                  name="dateOfBirth"
                  className={styles['form-item']}
                >
                  <DatePicker placeholder="Ngày/Tháng/Năm" />
                </Form.Item>
                <Form.Item
                  label={<span>Địa chỉ email</span>}
                  name="email"
                  className={styles['form-item']}
                >
                  <Input />
                </Form.Item>
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
                <h3 className={styles.title}>Không cần thiết</h3>
              </div>
              <div className={styles['details-content']}>
                <Form.Item
                  label={<span>Số điện thoại</span>}
                  name="phone"
                  className={styles['form-item']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<span>Địa chỉ</span>}
                  name="address"
                  className={styles['form-item']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<span>Mô tả bản thân</span>}
                  name="description"
                  className={styles['form-item']}
                >
                  <Input.TextArea placeholder="Nhập" autoSize={{ minRows: 5, maxRows: 7 }} />
                </Form.Item>
              </div>
            </div>
            <div className={classnames('text-center', 'mt20')}>
              <Button className={classnames(styles.button, styles.primary)} htmlType="button">
                Lưu
              </Button>
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
