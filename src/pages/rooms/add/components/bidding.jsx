import React, { PureComponent } from 'react';
import { Form, Input, Button, InputNumber, Checkbox } from 'antd';
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
            <h3 className={styles.title}>Đặt giá</h3>
          </div>
          <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
            <div className={classnames(styles['messager-container'], 'pt10')}>
              <p className={styles['norm']}>
                Bạn có thể đặt một mức giá phụ thuộc vào không gian, vật dụng và lòng hiếu khách mà
                bạn sẽ cung cấp
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  label={<span>Loại tiền tệ</span>}
                  name="type"
                  className={styles['form-item-vertical']}
                >
                  <Select dataSet={[]} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  label={<span>Giá hằng đêm</span>}
                  name="type"
                  className={styles['form-item-vertical']}
                >
                  <InputNumber
                    className={classnames('input-number', styles['input-number-container'])}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="Nhập"
                  />
                </Form.Item>
              </div>
            </div>
            <div className={classnames(styles['messager-container'], 'pt10')}>
              <p className={styles['title']}>Tùy chọn giá bổ sung</p>
              <Checkbox.Group style={{ width: '100%' }} className={styles['checkbox-container']}>
                <div className="row">
                  <div className="col-lg-6 mt10 mb10">
                    <Checkbox value={'Chi phí vệ sinh'}>Chi phí vệ sinh</Checkbox>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mt10 mb10">
                    <Checkbox value={'Khách bổ sung'}>Khách bổ sung</Checkbox>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mt10 mb10">
                    <Checkbox value={'Giá cuối tuần'}>Giá cuối tuần</Checkbox>
                  </div>
                </div>
              </Checkbox.Group>
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
          <Link to="/danh-sach-noi-luu-tru/tao-moi?steps=4" className={styles['link-back']}>
            Quay lại
          </Link>
          <Button
            className={classnames(styles.button, styles.primary)}
            htmlType="button"
            onClick={() => history.push('/danh-sach-noi-luu-tru/tao-moi?steps=6')}
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
