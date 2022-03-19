import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, history } from 'umi';
import { Form, Input } from 'antd';

import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import styles from '@/assets/styles/Common/common.scss';
import { variables, Helper } from '@/utils';
import Table from '@/components/CommonComponent/Table';
import Select from '@/components/CommonComponent/Select';
import moment from 'moment';
import HelperModules from '../utils/Helper';
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
@connect(({ user, loading, booking }) => ({
  user,
  loading,
  data: booking.data,
  error: booking.error,
  pagination: booking.pagination,
}))
class Index extends PureComponent {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    const {
      location: { query },
    } = props;
    this.state = {
      search: {
        page: query?.page || variables.PAGINATION.PAGE,
        limit: query?.limit || variables.PAGINATION.PAGE_SIZE,
        name: query?.name,
        status: query?.status,
      },
    };
    setIsMounted(true);
  }

  componentDidMount() {
    this.onLoad();
  }

  componentWillUnmount() {
    setIsMounted(false);
  }

  /**
   * Function load data
   */
  onLoad = () => {
    const { search } = this.state;
    const {
      location: { pathname },
    } = this.props;
    this.props.dispatch({
      type: 'booking/GET_DATA',
      payload: {
        ...search,
      },
    });
    history.push(`${pathname}?${Helper.convertParamSearchConvert(search, variables.QUERY_STRING)}`);
  };

  /**
   * Function debounce search
   * @param {string} value value of object search
   * @param {string} type key of object search
   */
  debouncedSearch = debounce((value, type) => {
    this.setStateData(
      (prevState) => ({
        search: {
          ...prevState.search,
          [`${type}`]: value,
        },
      }),
      () => this.onLoad(),
    );
  }, 300);

  /**
   * Function change input
   * @param {object} e event of input
   * @param {string} type key of object search
   */
  onChange = (e, type) => {
    this.debouncedSearch(e.target.value, type);
  };

  /**
   * Function change select
   * @param {object} e value of select
   * @param {string} type key of object search
   */
  onChangeSelect = (e, type) => {
    this.debouncedSearch(e, type);
  };

  /**
   * Function change input
   * @param {object} e event of input
   * @param {string} type key of object search
   */
  onChangeDate = (e, type) => {
    this.debouncedSearch(moment(e).format(variables.DATE_FORMAT.DATE_AFTER), type);
  };

  /**
   * Function set pagination
   * @param {integer} page page of pagination
   * @param {integer} size size of pagination
   */
  changePagination = (page, limit) => {
    this.setState(
      (prevState) => ({
        search: {
          ...prevState.search,
          page,
          limit,
        },
      }),
      () => {
        this.onLoad();
      },
    );
  };

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

  /**
   * Function pagination of table
   * @param {object} pagination value of pagination items
   */
  pagination = (pagination) => ({
    size: 'default',
    total: pagination?.total,
    pageSize: pagination?.per_page,
    defaultCurrent: pagination?.current_page,
    hideOnSinglePage: pagination?.total_pages <= 1 && pagination?.per_page <= 10,
    showSizeChanger: variables.PAGINATION.SHOW_SIZE_CHANGER,
    pageSizeOptions: variables.PAGINATION.PAGE_SIZE_OPTIONS,
    onChange: (page, size) => {
      this.changePagination(page, size);
    },
    onShowSizeChange: (current, size) => {
      this.changePagination(current, size);
    },
    showTotal: (total, [start, end]) => `Hiển thị ${start}-${end} trong ${total}`,
  });

  /**
   * Function header table
   */
  header = () => [
    {
      title: 'Mã ID',
      key: 'code',
      width: 80,
      align: 'center',
      className: 'min-width-80',
      render: (text, record, index) =>
        `BK${Helper.sttList(
          this.props.pagination?.current_page,
          index,
          this.props.pagination?.per_page,
        )}`,
    },
    {
      title: 'Ngày tạo',
      key: 'created_at',
      className: 'min-width-180',
      render: (record) => Helper.getDate(record.created_at, variables.DATE_FORMAT.DATE_TIME),
    },
    {
      title: 'Chủ lưu trú',
      key: 'location',
      className: 'min-width-130',
      render: (record) => record?.stayOfPlace?.user?.full_name,
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      className: 'min-width-120',
      render: (record) => record?.user?.full_name,
    },
    {
      title: 'Nơi lưu trú',
      key: 'position',
      className: 'min-width-180',
      render: (record) => record?.stayOfPlace?.name,
    },
    {
      title: 'Gói dịch vụ',
      key: 'services',
      className: 'min-width-150',
      render: (record) =>
        record?.bookingServicePack?.map((item) => item?.servicePack?.name).join(','),
    },
    {
      title: 'Chi phí',
      key: 'price',
      className: 'min-width-120',
      render: (record) => Helper.getPrice(record.money_total),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      className: 'min-width-120',
      render: (record) => HelperModules.tagStatus(record.status),
    },
    {
      title: 'Cập nhật',
      key: 'updatedAt',
      className: 'min-width-180',
      render: (record) => Helper.getDate(record.updated_at, variables.DATE_FORMAT.DATE_TIME),
    },
  ];

  render() {
    const {
      error,
      data,
      pagination,
      loading: { effects },
    } = this.props;
    const { search } = this.state;
    const loading = effects['booking/GET_DATA'];
    return (
      <div className={styles['main-container']}>
        <Helmet title="Danh sách booking" />
        <div className="d-flex justify-content-between align-items-center mb10">
          <h3 className={styles.heading}>Danh sách booking</h3>
        </div>
        <Form
          initialValues={{
            ...search,
            status: search.status || null,
          }}
          layout="vertical"
          ref={this.formRef}
        >
          <div className="row">
            <div className="col-lg-4">
              <Form.Item name="name">
                <Input onChange={(event) => this.onChange(event, 'name')} placeholder="Tìm kiếm" />
              </Form.Item>
            </div>
            <div className="col-lg-4">
              <Form.Item name="status">
                <Select
                  dataSet={[{ id: null, name: 'Chọn tất cả' }, ...variablesModules.ARRAY_STATUS]}
                  onChange={(event) => this.onChangeSelect(event, 'status')}
                  placeholder="Chọn"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
        <Table
          columns={this.header()}
          dataSource={data}
          loading={loading}
          error={error}
          isError={error.isError}
          pagination={this.pagination(pagination)}
          params={{
            header: this.header(),
            type: 'table',
          }}
          bordered={false}
          rowKey={(record) => record.id}
          scroll={{ x: '100%' }}
        />
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  pagination: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  location: {},
  error: {},
  pagination: {},
  data: [],
};

export default Index;
