import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, history } from 'umi';
import { Form, Input, Button } from 'antd';

import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { variables, Helper } from '@/utils';
import Table from '@/components/CommonComponent/Table';
import moment from 'moment';
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
@connect(({ user, loading, convenients }) => ({
  user,
  loading,
  data: convenients.data,
  error: convenients.error,
  pagination: convenients.pagination,
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
    const { search, status } = this.state;
    const {
      location: { pathname },
    } = this.props;
    this.props.dispatch({
      type: 'convenients/GET_DATA',
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
  changePagination = ({ page, limit }) => {
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
  pagination = (pagination) =>
    Helper.pagination({
      pagination,
      callback: (response) => {
        this.changePagination(response);
      },
    });

  onRemove = (id) => {
    const { dispatch } = this.props;
    const self = this;
    Helper.confirmAction({
      callback: () => {
        dispatch({
          type: 'convenients/REMOVE',
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
    });
  };

  /**
   * Function header table
   */
  header = () => {
    const {
      location: { pathname },
    } = this.props;
    return [
      {
        title: 'Mã ID',
        key: 'code',
        width: 80,
        align: 'center',
        className: 'min-width-80',
        render: (text, record, index) =>
          `TG${Helper.sttList(
            this.props.pagination?.current_page,
            index,
            this.props.pagination?.per_page,
          )}`,
      },
      {
        title: 'Tên tiện nghi',
        key: 'name',
        className: 'min-width-180',
        render: (record) => record.name,
      },
      {
        title: 'Trạng thái',
        key: 'status',
        className: 'min-width-180',
        render: (record) => HelperModules.tagStatus(record.status),
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
      error,
      data,
      pagination,
      loading: { effects },
      location: { pathname },
    } = this.props;
    const { search } = this.state;
    const loading = effects['convenients/GET_DATA'];

    return (
      <div className={styles['main-container']}>
        <Helmet title="Quản lý tiện nghi" />
        <div className="d-flex justify-content-between align-items-center mb15">
          <h3 className={styles.heading}>Quản lý tiện nghi</h3>
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
          </div>
        </Form>
        <Table
          columns={this.header()}
          dataSource={data}
          isEmpty
          className="table-edit"
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
  pagination: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  location: {},
  pagination: {},
  data: [],
  error: {},
};

export default Index;
