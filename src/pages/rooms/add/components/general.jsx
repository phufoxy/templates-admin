import React, { PureComponent } from 'react';
import { List, Avatar, Form, Input, Button, DatePicker, Steps, Radio } from 'antd';
import PropTypes from 'prop-types';
import { history } from 'umi';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { variables, Helper } from '@/utils';
import AvatarTable from '@/components/CommonComponent/AvatarTable';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';
import Select from '@/components/CommonComponent/Select';

class Index extends PureComponent {
  render() {
    return (
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        colon={false}
        layout="horizontal"
      >
        <div className={styles['details-container']}>
          <div
            className={classnames(
              styles['heading-content'],
              'd-flex',
              'justify-content-between',
              'align-items-center',
            )}
          >
            <h3 className={styles.title}>Mở đầu</h3>
          </div>
          <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
            <Form.Item
              label={<span>Loại lưu trú</span>}
              name="typePlace"
              className={styles['form-item']}
            >
              <Select dataSet={[]} />
            </Form.Item>
            <Form.Item label={<span>Loại phòng</span>} name="type" className={styles['form-item']}>
              <Select dataSet={[]} />
            </Form.Item>
            <Form.Item label={<span>Số chỗ ở</span>} name="count" className={styles['form-item']}>
              <Select dataSet={[]} />
            </Form.Item>
            <Form.Item label={<span>Thành phố</span>} name="city" className={styles['form-item']}>
              <Select dataSet={[]} />
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
            <h3 className={styles.title}>Cơ bản</h3>
          </div>
          <div className={styles['details-content']}>
            <div className={styles['general-container']}>
              <div className={styles['general-item']}>
                <h4 className={styles['title']}>Phòng và giường</h4>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <p className={styles['norm']}>Phòng ngủ</p>
                  <div
                    className={classnames(
                      styles['count-container'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <Button className={styles['button-counter']}>-</Button>
                    <span className={styles.number}>2</span>
                    <Button className={styles['button-counter']}>+</Button>
                  </div>
                </div>
              </div>
              <div className={styles['general-item']}>
                <h4 className={styles['title']}>Sắp xếp chỗ ngủ</h4>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <div>
                    <p className={styles['norm']}>Phòng ngủ 1</p>
                    <p className={styles['norm']}>2 giường</p>
                  </div>
                  <Button className={classnames(styles.button, styles.success)}>Lưu</Button>
                </div>

                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <p className={styles['norm']}>Giường đơn</p>
                  <div
                    className={classnames(
                      styles['count-container'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <Button className={styles['button-counter']}>-</Button>
                    <span className={styles.number}>2</span>
                    <Button className={styles['button-counter']}>+</Button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <p className={styles['norm']}>Giường đôi</p>
                  <div
                    className={classnames(
                      styles['count-container'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <Button className={styles['button-counter']}>-</Button>
                    <span className={styles.number}>2</span>
                    <Button className={styles['button-counter']}>+</Button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <p className={styles['norm']}>Giường luxury</p>
                  <div
                    className={classnames(
                      styles['count-container'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <Button className={styles['button-counter']}>-</Button>
                    <span className={styles.number}>2</span>
                    <Button className={styles['button-counter']}>+</Button>
                  </div>
                </div>
              </div>
              <div className={styles['general-item']}>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <div>
                    <p className={styles['norm']}>Phòng ngủ 2</p>
                    <p className={styles['norm']}>0 giường</p>
                  </div>
                  <Button className={classnames(styles.button, styles.success)}>Thêm giường</Button>
                </div>
              </div>
              <div className={styles['general-item']}>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <div>
                    <p className={styles['norm']}>Không gian chung</p>
                    <p className={styles['norm']}>0 giường</p>
                  </div>
                  <Button className={classnames(styles.button, styles.success)}>Thêm giường</Button>
                </div>
              </div>
              <div className={styles['general-item']}>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <p className={styles['norm']}>Số phòng tắm</p>
                  <div
                    className={classnames(
                      styles['count-container'],
                      'd-flex',
                      'justify-content-between',
                      'align-items-center',
                    )}
                  >
                    <Button className={styles['button-counter']}>-</Button>
                    <span className={styles.number}>2</span>
                    <Button className={styles['button-counter']}>+</Button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center pt10 pb10">
                  <p className={styles['norm']}>Bạn có phòng tắm riêng không?</p>
                  <Radio.Group>
                    <Radio>Có</Radio>
                    <Radio>Không</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classnames('text-right', 'mt20')}>
          <Button
            className={classnames(styles.button, styles.primary)}
            htmlType="button"
            onClick={() => history.push('/danh-sach-noi-luu-tru/tao-moi?steps=1')}
          >
            Tiếp tục
          </Button>
        </div>
      </Form>
    );
  }
}

Index.propTypes = {};

export default Index;
