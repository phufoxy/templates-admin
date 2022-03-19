import React, { PureComponent } from 'react';
import { List, Avatar, Form, Input, Button, DatePicker, Steps, Radio, Modal } from 'antd';
import PropTypes from 'prop-types';
import { Link, history } from 'umi';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { variables, Helper } from '@/utils';
import AvatarTable from '@/components/CommonComponent/AvatarTable';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';
import Select from '@/components/CommonComponent/Select';

class Index extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
  }

  render() {
    const { visible } = this.state;
    return (
      <>
        <Modal
          title="Thêm địa chỉ"
          visible={visible}
          onCancel={() => this.setState({ visible: false })}
          className={styles['modal-container']}
          centered
          footer={[
            <Button className={classnames(styles.button, styles.primary)} key="first">
              Tiếp tục
            </Button>,
          ]}
        >
          <Form colon={false} layout="vertical">
            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  label={<span>Quốc gia</span>}
                  name="nation"
                  className={styles['form-item-vertical']}
                >
                  <Select dataSet={[]} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  label={<span>Thành phố</span>}
                  name="city"
                  className={styles['form-item-vertical']}
                >
                  <Select dataSet={[]} />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Form.Item
                  label={<span>Địa chỉ 1</span>}
                  name="address1"
                  className={styles['form-item-vertical']}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Form.Item
                  label={<span>Địa chỉ 2</span>}
                  name="address2"
                  className={styles['form-item-vertical']}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Form.Item
                  label={<span>ZIP / Postal CODE</span>}
                  name="code"
                  className={styles['form-item-vertical']}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>
        <Form colon={false} layout="vertical">
          <div className={styles['details-container']}>
            <div
              className={classnames(
                styles['heading-content'],
                'd-flex',
                'justify-content-between',
                'align-items-center',
              )}
            >
              <h3 className={styles.title}>Mô tả</h3>
            </div>
            <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
              <div className={classnames(styles['messager-container'], 'pt10')}>
                <h4 className={styles['title']}>Địa chỉ email</h4>
                <p className={styles['norm']}>
                  Bạn đã xác nhận email của mình: abc@gmail.com. Email được xác nhận rất quan trọng
                  để cho phép chúng tôi liên lạc với bạn một cách an toàn
                </p>
              </div>
              <Form.Item
                label={<span>Tên nơi lưu trú</span>}
                name="name"
                className={styles['form-item-vertical']}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span>Nội dung tóm tắt</span>}
                name="description"
                className={styles['form-item-vertical']}
              >
                <Input.TextArea autoSize={{ minRows: 7, maxRows: 10 }} />
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
              <h3 className={styles.title}>Vị trí</h3>
            </div>
            <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
              <div className={classnames(styles['messager-container'], 'pt10')}>
                <h4 className={styles['title']}>Thiết lập vị trí không gian của bạn</h4>
                <p className={styles['norm']}>
                  Bạn không chỉ chia sẻ không gian của mình mà còn đang chia sẻ vùng lân cận của
                  mình. Khách du lịch sẽ sử dụng thông tin này để tìm một địa điểm phù hợp
                </p>
              </div>
              <div className={classnames(styles['messager-container'], 'pt10')}>
                <h4 className={styles['title']}>Địa chỉ</h4>
                <p className={styles['norm']}>
                  Trong khi khách có thể thấy gần đúng vị trí danh sách của bạn trong kết quả tìm
                  kiếm, địa chỉ chính xác của bạn là riêng tư và sẽ chỉ được hiển thị cho khách sau
                  khi họ đặt danh sách của bạn
                </p>
                <img src="/images/image-map.png" className={styles['image-maps']} />
              </div>
              <div className="text-center mt10">
                <Button
                  className={classnames(styles.button, styles.success)}
                  onClick={() => this.setState({ visible: true })}
                >
                  Thêm địa chỉ
                </Button>
              </div>
            </div>
          </div>
          <div
            className={classnames(
              'd-flex',
              'justify-content-between',
              'align-items-center',
              'text-right',
              'mt20',
            )}
          >
            <Link to="/danh-sach-noi-luu-tru/tao-moi?steps=0" className={styles['link-back']}>
              Quay lại
            </Link>
            <Button
              className={classnames(styles.button, styles.primary)}
              htmlType="button"
              onClick={() => history.push('/danh-sach-noi-luu-tru/tao-moi?steps=2')}
            >
              Tiếp tục
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

Index.propTypes = {};

export default Index;
