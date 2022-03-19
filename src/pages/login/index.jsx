import React, { PureComponent } from 'react';
import { Form, Button, Input } from 'antd';
import { Helmet } from 'react-helmet';
import { connect } from 'umi';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.scss';

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
@connect(({ user, loading }) => ({ user, loading }))
class Index extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    setIsMounted(true);
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

  onFinish = (values) => {
    this.props.dispatch({
      type: 'user/LOGIN',
      payload: values,
    });
  };

  render() {
    const {
      loading: { effects },
    } = this.props;
    const loadingSubmit = effects['user/LOGIN'];
    return (
      <>
        <Helmet title="Login" />
        <div className={classnames(styles['login-container'])}>
          <div className={styles.images}>
            <img src="/images/logo.svg" alt="" />
          </div>
          <Form
            hideRequiredMark
            layout="vertical"
            className={styles['form-container']}
            onFinish={this.onFinish}
            initialValues={{
              username: 'admin@gmail.com',
              password: '123123',
            }}
          >
            <Form.Item
              label="User ID / Email"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              className={styles['form-item']}
            >
              <Input className={styles.input} placeholder="Nhập" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Please input your username!' }]}
              className={styles['form-item']}
            >
              <Input.Password className={styles.input} placeholder="******" />
            </Form.Item>
            <Button
              htmlType="submit"
              className={classnames(styles.button, styles.primary)}
              loading={loadingSubmit}
            >
              Đăng nhập
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.objectOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
};

export default Index;
