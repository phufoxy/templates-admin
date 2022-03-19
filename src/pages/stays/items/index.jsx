import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, history } from 'umi';
import { Form, Input, Modal, Button, Menu, Dropdown } from 'antd';

import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { variables, Helper } from '@/utils';
import Table from '@/components/CommonComponent/Table';
import Select from '@/components/CommonComponent/Select';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import variablesModules from '../utils/variables';
import HelperModules from '../utils/Helper';

const { confirm } = Modal;
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
@connect(({ user, loading, stays }) => ({
  user,
  loading,
  data: stays.data,
  pagination: stays.pagination,
  stayOfTypes: stays.stayOfTypes,
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
        room_type_id: query?.room_type_id,
        status_admin: query?.status_admin,
      },
    };
    setIsMounted(true);
  }

  componentDidMount() {
    this.onLoad();
    this.loadCategories();
  }

  componentWillUnmount() {
    setIsMounted(false);
  }

  loadCategories = () => {
    this.props.dispatch({
      type: 'stays/GET_STAY_OF_TYPES',
      payload: {},
    });
  };

  /**
   * Function load data
   */
  onLoad = () => {
    const { search, status } = this.state;
    const {
      location: { pathname },
    } = this.props;
    this.props.dispatch({
      type: 'stays/GET_DATA',
      payload: {
        ...search,
        status,
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

  onChangeStatus = (event, record) => {
    this.props.dispatch({
      type: 'stays/UPDATE',
      payload: {
        id: record.id,
        status_admin: event.key,
      },
      callback: (response) => {
        if (response) {
          this.onLoad();
        }
      },
    });
  };

  onRemove = (id) => {
    const { dispatch } = this.props;
    const self = this;
    confirm({
      title: 'Khi xóa thì dữ liệu trước thời điểm xóa vẫn giữ nguyên?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: 'Dữ liệu này đang được sử dụng, nếu xóa dữ liệu này sẽ ảnh hưởng tới dữ liệu khác ?',
      onOk() {
        dispatch({
          type: 'stays/REMOVE',
          payload: {
            id,
          },
          callback: (response) => {
            if (response) {
              self.onLoad();
            }
          },
        });
      },
      onCancel() {},
    });
  };

  /**
   * Function header table
   */
  header = () => {
    const {
      location: { pathname },
    } = this.props;
    const menu = (record) => (
      <Menu onClick={(event) => this.onChangeStatus(event, record)}>
        {variablesModules.ARRAY_STATUS_ADMIN.map((item) => (
          <Menu.Item key={item.id}>{item.name}</Menu.Item>
        ))}
      </Menu>
    );
    return [
      {
        title: 'Mã ID',
        key: 'code',
        width: 80,
        align: 'center',
        className: 'min-width-80',
        render: (text, record, index) =>
          `LT${Helper.sttList(
            this.props.pagination?.current_page,
            index,
            this.props.pagination?.per_page,
          )}`,
      },
      {
        title: 'Tên lưu trú',
        key: 'position',
        className: 'min-width-180',
        render: (record) => record.name,
      },
      {
        title: 'Chủ lưu trú',
        key: 'location',
        className: 'min-width-130',
        render: (record) => record?.user?.full_name,
      },
      {
        title: 'Trạng thái',
        key: 'status',
        className: 'min-width-120',
        render: (record) => (
          <Dropdown overlay={menu(record)} placement="bottomCenter" arrow trigger={['click']}>
            {HelperModules.tagStatus(record.status_admin)}
          </Dropdown>
        ),
      },
      {
        title: 'Ngày tạo',
        key: 'createdAt',
        className: 'min-width-180',
        render: (record) => Helper.getDate(record.created_at, variables.DATE_FORMAT.DATE_TIME),
      },
      {
        title: 'Cập nhật',
        key: 'updatedAt',
        className: 'min-width-180',
        render: (record) => Helper.getDate(record.updated_at, variables.DATE_FORMAT.DATE_TIME),
      },
      {
        title: 'Xác nhận',
        key: 'confirm',
        className: 'min-width-150',
        render: (record) => HelperModules.tagStatus(record.status_host),
      },
      {
        title: 'Thao tác',
        key: 'actions',
        width: 140,
        className: 'min-width-140',
        fixed: 'right',
        align: 'center',
        render: (record) => (
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <Button
                className={styles['button-edit']}
                onClick={() => history.push(`${pathname}/${record.id}/chi-tiet`)}
              >
                <span className="icon-pencil" />
              </Button>
            </li>
            <li className="list-inline-item">
              <Button className={styles['button-delete']} onClick={() => this.onRemove(record.id)}>
                <span className="icon-delete" />
              </Button>
            </li>
          </ul>
        ),
      },
    ];
  };

  render() {
    const {
      data,
      pagination,
      stayOfTypes,
      loading: { effects },
      location: { pathname },
    } = this.props;
    const { search } = this.state;
    const loading = effects['stays/GET_DATA'];

    return (
      <div className={styles['main-container']}>
        <Helmet title="Danh sách lưu trú" />
        <div className="d-flex justify-content-between align-items-center mb15">
          <h3 className={styles.heading}>Danh sách lưu trú</h3>
          <Button
            className={classnames(styles.button, styles.primary)}
            onClick={() => history.push(`${pathname}/them-moi`)}
          >
            Thêm mới
          </Button>
        </div>
        <Form
          initialValues={{
            ...search,
            room_type_id: search.vroom_type_id || null,
            status_host: search.status_host || null,
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
              <Form.Item name="room_type_id">
                <Select
                  dataSet={[{ id: null, name: 'Chọn tất cả' }, ...stayOfTypes]}
                  onChange={(event) => this.onChangeSelect(event, 'room_type_id')}
                  placeholder="Chọn"
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="col-lg-4">
              <Form.Item name="status_admin">
                <Select
                  dataSet={[
                    { id: null, name: 'Chọn tất cả' },
                    ...variablesModules.ARRAY_STATUS_ADMIN,
                  ]}
                  onChange={(event) => this.onChangeSelect(event, 'status_admin')}
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
  pagination: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
  stayOfTypes: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  location: {},
  pagination: {},
  data: [],
  stayOfTypes: [],
};

export default Index;
