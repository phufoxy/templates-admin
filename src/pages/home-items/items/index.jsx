import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, history } from 'umi';
import { Button, Image } from 'antd';

import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { MenuOutlined, CheckOutlined } from '@ant-design/icons';
import { variables, Helper } from '@/utils';
import Table from '@/components/CommonComponent/Table';
import moment from 'moment';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);
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
@connect(({ user, loading, homeItems }) => ({
  user,
  loading,
  data: homeItems.data,
  pagination: homeItems.pagination,
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
      dataSource: [],
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
      type: 'homeItems/GET_DATA',
      payload: {
        ...search,
      },
      callback: (response) => {
        if (response) {
          this.setStateData({
            dataSource: response.parsePayload.map((item, index) => ({ ...item, index })),
          });
        }
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
          type: 'homeItems/REMOVE',
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
        title: 'Sắp xếp',
        dataIndex: 'sort',
        width: 100,
        className: 'min-width-100 drag-visible',
        align: 'center',
        render: () => <DragHandle />,
      },
      {
        title: 'Mã',
        key: 'code',
        width: 180,
        className: 'min-width-180',
        render: (record) => record.code,
      },
      {
        title: 'Tên trang chủ',
        key: 'name',
        className: 'min-width-180',
        render: (record) => record.name,
      },
      {
        title: 'Hình ảnh',
        key: 'background',
        className: 'min-width-180',
        render: (record) =>
          record?.background?.path && (
            <Image
              src={`${API_UPLOAD}/booking/${record?.background?.path}`}
              width={50}
              preview={{
                maskClassName: 'customize-mask',
                mask: <></>,
              }}
            />
          ),
      },
      {
        title: 'Hiển thị tại trang chủ',
        key: 'is_display_home',
        className: 'min-width-180',
        align: 'center',
        render: (record) =>
          record.is_display_home ? <CheckOutlined style={{ color: '#09B024' }} /> : null,
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    const { dispatch } = this.props;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el);
      this.setState({ dataSource: newData });
      dispatch({
        type: 'homeItems/SORT',
        payload: {
          id: newData.map((item) => item.id).join(','),
        },
      });
    }
  };

  DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ ...restProps }) => {
    const { dataSource } = this.state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const {
      loading: { effects },
      location: { pathname },
    } = this.props;
    const { dataSource } = this.state;
    const loading = effects['homeItems/GET_DATA'];

    return (
      <div className={styles['main-container']}>
        <Helmet title="Quản lý trang chủ" />
        <div className="d-flex justify-content-between align-items-center mb15">
          <h3 className={styles.heading}>Quản lý trang chủ</h3>
          <Button
            className={classnames(styles.button, styles.primary)}
            onClick={() => history.push(`${pathname}/them-moi`)}
          >
            Thêm mới
          </Button>
        </div>
        <Table
          columns={this.header()}
          dataSource={dataSource}
          isEmpty
          className="table-edit"
          loading={loading}
          pagination={false}
          params={{
            header: this.header(),
            type: 'table',
          }}
          components={{
            body: {
              wrapper: this.DraggableContainer,
              row: this.DraggableBodyRow,
            },
          }}
          bordered={false}
          rowKey="index"
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
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  location: {},
};

export default Index;
