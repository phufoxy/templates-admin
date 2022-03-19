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
              <h3 className={styles.title}>Hình ảnh</h3>
            </div>
            <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
              <div className={styles['list-social']}>
                <div
                  className={classnames(
                    styles['item-social'],
                    'd-flex',
                    'align-items-end',
                    'justify-content-between',
                  )}
                >
                  <div className={styles['content-social']}>
                    <p className={styles['norm']}>
                      Đăng lên các ảnh về nơi lưu trú của bạn, cũng như khung cảnh xung quanh.
                    </p>
                  </div>
                  <Button className={classnames(styles.button, styles['success'])}>
                    Tải ảnh lên
                  </Button>
                </div>
              </div>
              <div className={classnames(styles['list-image-container'], 'd-flex')}>
                <div className={styles['image-item']}>
                  <img src="/images/image-default.png" alt="default" />
                  <Button className={styles['button-close']}>
                    <span className="icon-close"></span>
                  </Button>
                </div>
                <div className={styles['image-item']}>
                  <img src="/images/image-default.png" alt="default" />
                  <Button className={styles['button-close']}>
                    <span className="icon-close"></span>
                  </Button>
                </div>
                <div className={styles['image-item']}>
                  <img src="/images/image-default.png" alt="default" />
                  <Button className={styles['button-close']}>
                    <span className="icon-close"></span>
                  </Button>
                </div>
                <div className={styles['image-item']}>
                  <img src="/images/image-default.png" alt="default" />
                  <Button className={styles['button-close']}>
                    <span className="icon-close"></span>
                  </Button>
                </div>
                <div className={styles['image-item']}>
                  <img src="/images/image-default.png" alt="default" />
                  <Button className={styles['button-close']}>
                    <span className="icon-close"></span>
                  </Button>
                </div>
                <div className={styles['image-item']}>
                  <img src="/images/image-default.png" alt="default" />
                  <Button className={styles['button-close']}>
                    <span className="icon-close"></span>
                  </Button>
                </div>
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
            <Link to="/danh-sach-noi-luu-tru/tao-moi?steps=2" className={styles['link-back']}>
              Quay lại
            </Link>
            <Button
              className={classnames(styles.button, styles.primary)}
              htmlType="button"
              onClick={() => history.push('/danh-sach-noi-luu-tru/tao-moi?steps=4')}
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
