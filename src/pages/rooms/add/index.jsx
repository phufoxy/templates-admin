import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, NavLink } from 'umi';
import { toNumber } from 'lodash';
import { Form, Input, Button, DatePicker, Steps } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { variables, Helper } from '@/utils';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';
import { General, Location, Utilities, Images, Video, Bidding, Schedules } from './components';

const componentsForm = {
  0: <General />,
  1: <Location />,
  2: <Utilities />,
  3: <Images />,
  4: <Video />,
  5: <Bidding />,
  6: <Schedules />,
};
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
@connect(({ user, loading, roomsAdd }) => ({
  user,
  loading,
  data: roomsAdd.data,
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
      type: 'roomsAdd/GET_DATA',
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
      location: { query },
      loading: { effects },
    } = this.props;
    const loading = effects['roomsAdd/GET_DATA'];

    return (
      <div className={styles['main-container']}>
        <Breadcrumbs last="Thêm mới" />
        <Helmet title="Chi tiết booking" />
        <div className="d-flex justify-content-between align-items-center mb10">
          <h3 className={styles['heading']}>Thêm nơi lưu trú</h3>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <Steps
              current={query.steps ? toNumber(query.steps) : 0}
              direction="vertical"
              className={styles['step-container']}
            >
              <Steps.Step title="Thông tin chung" />
              <Steps.Step title="Mô tả & Vị trí" />
              <Steps.Step title="Tiện nghi & Tiện ích" />
              <Steps.Step title="Hình ảnh" />
              <Steps.Step title="Video" />
              <Steps.Step title="Đặt giá" />
              <Steps.Step title="Lịch" />
            </Steps>
          </div>
          <div className="col-lg-6">{componentsForm[query.steps ? toNumber(query.steps) : 0]}</div>
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
