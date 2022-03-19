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
            <h3 className={styles.title}>Video</h3>
          </div>
          <div className={classnames(styles['details-content'], 'pb10', 'pt10')}>
            <div className={classnames(styles['messager-container'], 'pt10')}>
              <p className={styles['norm']}>
                Thêm video về nơi bạn sống, phong cảnh xung quanh bạn.
              </p>
            </div>
            <Form.Item
              label={<span>Đường dẫn youtube</span>}
              name="youtube"
              className={styles['form-item-vertical']}
            >
              <Input />
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
          <Link to="/danh-sach-noi-luu-tru/tao-moi?steps=3" className={styles['link-back']}>
            Quay lại
          </Link>
          <Button
            className={classnames(styles.button, styles.primary)}
            htmlType="button"
            onClick={() => history.push('/danh-sach-noi-luu-tru/tao-moi?steps=5')}
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
