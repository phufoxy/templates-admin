import React, { PureComponent } from 'react';
import { List, Avatar, Form, Input, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { Link, history } from 'umi';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { variables, Helper } from '@/utils';
import { dataSource, UTILITES } from './data.json';

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
              <h3 className={styles.title}>Tiện nghi</h3>
            </div>
            <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
              <div className={classnames(styles['messager-container'], 'pt10')}>
                <p className={styles['norm']}>
                  Check chọn các ô tiện nghi mà không gian của bạn đang sỡ hữu
                </p>
              </div>
              <Form.Item name="name" className={styles['form-item-vertical']}>
                <Checkbox.Group style={{ width: '100%' }} className={styles['checkbox-container']}>
                  <div className="row">
                    {dataSource.map((item) => (
                      <div className="col-lg-6 mt10 mb10" key={item.name}>
                        <Checkbox value={item.name}>{item.name}</Checkbox>
                      </div>
                    ))}
                  </div>
                </Checkbox.Group>
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
              <h3 className={styles.title}>Tiện ích</h3>
            </div>
            <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
              <div className={classnames(styles['messager-container'], 'pt10')}>
                <p className={styles['norm']}>
                  Check chọn các ô tiện nghi mà không gian của bạn đang sỡ hữu
                </p>
              </div>
              <Form.Item name="name" className={styles['form-item-vertical']}>
                <Checkbox.Group style={{ width: '100%' }} className={styles['checkbox-container']}>
                  <div className="row">
                    {UTILITES.map((item) => (
                      <div className="col-lg-6 mt10 mb10" key={item.name}>
                        <Checkbox value={item.name}>{item.name}</Checkbox>
                      </div>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
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
            <Link to="/danh-sach-noi-luu-tru/tao-moi?steps=1" className={styles['link-back']}>
              Quay lại
            </Link>
            <Button
              className={classnames(styles.button, styles.primary)}
              htmlType="button"
              onClick={() => history.push('/danh-sach-noi-luu-tru/tao-moi?steps=3')}
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
