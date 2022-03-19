import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, history } from 'umi';
import { Form, Input, DatePicker, Button } from 'antd';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { variables, Helper } from '@/utils';
import Select from '@/components/CommonComponent/Select';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';
import moment from 'moment';
import Loading from '@/components/CommonComponent/Loading';
import { get, isEmpty, head } from 'lodash';
import variablesModules from '../utils/variables';

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
@connect(({ user, loading, accountsAdd }) => ({
  user,
  loading,
  details: accountsAdd.details,
  roles: accountsAdd.roles,
  error: accountsAdd.error,
}))
class Index extends PureComponent {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
    setIsMounted(true);
  }

  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;
    if (params?.id) {
      dispatch({
        type: 'accountsAdd/GET_DETAILS',
        payload: params,
      });
    }
    this.loadRoles();
  }

  componentDidUpdate(prevProps) {
    const {
      details,
      match: { params },
    } = this.props;
    if (details !== prevProps.details && !isEmpty(details) && params.id) {
      this.formRef.current.setFieldsValue({
        ...details,
        date_of_birth: moment(details.date_of_birth),
        role_id: head(details?.role).id,
      });
    }
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

  loadRoles = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountsAdd/GET_ROLES',
      payload: {},
    });
  };

  onFinish = (values) => {
    const {
      match: { params },
    } = this.props;
    this.props.dispatch({
      type: params.id ? 'accountsAdd/UPDATE' : 'accountsAdd/ADD',
      payload: {
        ...params,
        ...values,
      },
      callback: (response, error) => {
        if (response) {
          history.goBack();
        }
        if (error) {
          if (error?.data?.errors && !isEmpty(error?.data?.errors)) {
            error.data.errors.forEach((item) => {
              this.formRef.current.setFields([
                {
                  name: get(item, 'source.pointer'),
                  errors: [get(item, 'detail')],
                },
              ]);
            });
          }
        }
      },
    });
  };

  render() {
    const {
      error,
      roles,
      loading: { effects },
      match: { params },
    } = this.props;
    const loading = effects['accountsAdd/GET_DETAILS'];
    const loadingSubmit = effects['accountsAdd/ADD'] || effects['accountsAdd/UPDATE'];
    return (
      <div className={styles['main-container']}>
        <Helmet title="Danh sách người dùng" />
        <Breadcrumbs last="Chi tiết" />
        <div className="d-flex justify-content-between align-items-center mb15">
          {!params?.id && <h3 className={styles.heading}>Thêm mới</h3>}
          {params?.id && <h3 className={styles.heading}>Chỉnh sửa</h3>}
        </div>
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <Form
              layout="vertical"
              ref={this.formRef}
              className={styles['form-container']}
              onFinish={this.onFinish}
            >
              <Loading loading={loading} isError={error.isError} error={error}>
                <div className={styles['form-heading']}>
                  {!params?.id && <h4 className={styles.title}>Thông tin thêm mới</h4>}
                  {params?.id && <h4 className={styles.title}>Thông tin người dùng</h4>}
                </div>
                <div className={styles['form-content']}>
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Item
                        name="full_name"
                        rules={[variables.RULES.EMPTY]}
                        label={<span>Họ và tên</span>}
                      >
                        <Input placeholder="Nhập" />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6">
                      <Form.Item
                        name="date_of_birth"
                        rules={[variables.RULES.EMPTY]}
                        label={<span>Ngày sinh</span>}
                      >
                        <DatePicker
                          placeholder="dd-mm-yyyy"
                          disabledDate={Helper.disabledDateFuture}
                          format={variables.DATE_FORMAT.DATE}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Item
                        name="email"
                        rules={[variables.RULES.EMPTY, variables.RULES.EMAIL]}
                        label={<span>Email</span>}
                      >
                        <Input placeholder="Nhập" />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6">
                      <Form.Item
                        name="phone"
                        rules={[variables.RULES.EMPTY, variables.RULES.PHONE]}
                        label={<span>Số điện thoại</span>}
                      >
                        <Input placeholder="Nhập" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Item name="password" label={<span>Mật khẩu</span>}>
                        <Input.Password placeholder="******" className="input-password" />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6">
                      <Form.Item
                        name="status"
                        rules={[variables.RULES.EMPTY]}
                        label={<span>Trạng thái</span>}
                      >
                        <Select dataSet={variablesModules.ARRAY_STATUS} placeholder="Chọn" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Item
                        name="role_id"
                        rules={[variables.RULES.EMPTY]}
                        label={<span>Vai trò</span>}
                      >
                        <Select dataSet={roles} placeholder="Chọn" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div
                  className={classnames(
                    styles['form-footer'],
                    'd-flex',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <Button
                    className={styles.link}
                    onClick={() => history.goBack()}
                    loading={loadingSubmit}
                  >
                    Hủy
                  </Button>
                  <Button
                    className={classnames(styles.button, styles.primary)}
                    loading={loadingSubmit}
                    htmlType="submit"
                  >
                    Lưu
                  </Button>
                </div>
              </Loading>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.objectOf(PropTypes.any),
  params: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  details: PropTypes.objectOf(PropTypes.any),
  roles: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  params: {},
  error: {},
  match: {},
  details: {},
  roles: [],
};

export default Index;
