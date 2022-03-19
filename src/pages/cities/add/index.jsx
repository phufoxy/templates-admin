import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, history } from 'umi';
import { Form, Input, Checkbox, Image, Upload, Button } from 'antd';
import { get, isEmpty, toString, head } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { variables } from '@/utils';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';
import Select from '@/components/CommonComponent/Select';
import Loading from '@/components/CommonComponent/Loading';
import { CloseOutlined } from '@ant-design/icons';

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
@connect(({ user, loading, citiesAdd }) => ({
  user,
  loading,
  details: citiesAdd.details,
  nations: citiesAdd.nations,
  error: citiesAdd.error,
}))
class Index extends PureComponent {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      files: {},
    };
    setIsMounted(true);
  }

  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;
    if (params?.id) {
      dispatch({
        type: 'citiesAdd/GET_DETAILS',
        payload: params,
      });
    }
    dispatch({
      type: 'citiesAdd/GET_NATIONS',
      payload: {},
    });
  }

  componentDidUpdate(prevProps) {
    const {
      details,
      match: { params },
    } = this.props;
    if (details !== prevProps.details && !isEmpty(details) && params.id) {
      this.formRef.current.setFieldsValue({
        ...details,
        nation_id: toString(details.nation_id),
      });
      this.onSetFile(head(details.files) || {});
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

  onSetFile = (files) => {
    this.setStateData({
      files,
    });
  };

  onUpload = (files) => {
    this.props.dispatch({
      type: 'upload/UPLOAD',
      payload: files,
      callback: (response) => {
        this.onSetFile({
          path: response.path,
          file_name: files.name,
        });
      },
    });
  };

  removeFile = () => {
    this.setStateData({
      files: {},
    });
  };

  onFinish = (values) => {
    const {
      match: { params },
    } = this.props;
    const { files } = this.state;
    this.props.dispatch({
      type: params.id ? 'citiesAdd/UPDATE' : 'citiesAdd/ADD',
      payload: {
        ...params,
        ...values,
        files: !isEmpty(files) && [files],
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
      nations,
      loading: { effects },
      match: { params },
    } = this.props;
    const { files } = this.state;
    const loadingSubmit =
      effects['citiesAdd/ADD'] || effects['citiesAdd/UPDATE'] || effects['upload/UPLOAD'];
    const loading = effects['citiesAdd/GET_DETAILS'];
    const self = this;
    const props = {
      beforeUpload() {
        return null;
      },
      customRequest({ file }) {
        self.onUpload(file);
      },
      showUploadList: false,
      fileList: [],
    };
    return (
      <div className={styles['main-container']}>
        <Helmet title="Quản lý thành phố" />
        <Breadcrumbs last={params.id ? 'Chỉnh sửa' : 'Thêm mới'} />
        <div className="d-flex justify-content-between align-items-center mb15">
          <h3 className={styles.heading}>{params.id ? 'Chỉnh sửa' : 'Thêm mới'}</h3>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <Form
              layout="vertical"
              ref={this.formRef}
              className={styles['form-container']}
              onFinish={this.onFinish}
            >
              <Loading loading={loading} isError={error.isError} error={error}>
                <div className={styles['form-heading']}>
                  {!params.id && <h4 className={styles.title}>Thông tin thêm mới</h4>}
                  {params.id && <h4 className={styles.title}>Thông tin chi tiết</h4>}
                </div>
                <div className={styles['form-content']}>
                  <div className="row">
                    <div className="col-lg-12">
                      <Form.Item
                        name="nation_id"
                        rules={[variables.RULES.EMPTY]}
                        label={<span>Quốc gia</span>}
                      >
                        <Select dataSet={nations} placeholder="Chọn" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <Form.Item
                        name="name"
                        rules={[variables.RULES.EMPTY]}
                        label={<span>Tên thành phố</span>}
                      >
                        <Input placeholder="Nhập" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <Form.Item
                        name="is_display_home"
                        label={<span>Hiển thị tại trang chủ</span>}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="ant-col">
                        <label>
                          <span>Hình ảnh</span>
                        </label>
                      </div>
                      {!files?.path && (
                        <Upload {...props}>
                          <Button
                            className={classnames(styles.button, styles.primary)}
                            loading={loadingSubmit}
                          >
                            Tải files
                          </Button>
                        </Upload>
                      )}
                      {files?.path && (
                        <Image
                          width={200}
                          src={`${API_UPLOAD}/booking/${files?.path}`}
                          preview={{
                            maskClassName: 'customize-mask',
                            mask: (
                              <>
                                <CloseOutlined
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    this.removeFile();
                                  }}
                                />
                              </>
                            ),
                          }}
                        />
                      )}
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
                    htmlType="submit"
                    className={classnames(styles.button, styles.primary)}
                    loading={loadingSubmit}
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
  match: PropTypes.objectOf(PropTypes.any),
  details: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  nations: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  match: {},
  details: {},
  error: {},
  nations: [],
};

export default Index;
