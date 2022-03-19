import React, { PureComponent } from 'react';
import { Form, Input, Button, InputNumber, Checkbox, Calendar, Badge } from 'antd';
import PropTypes from 'prop-types';
import { Link, history } from 'umi';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { variables, Helper } from '@/utils';
import AvatarTable from '@/components/CommonComponent/AvatarTable';
import Breadcrumbs from '@/components/LayoutComponents/Breadcrumbs';
import Select from '@/components/CommonComponent/Select';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [{ type: 'warning', content: '700K' }];
      break;
    case 10:
      listData = [{ type: 'warning', content: '700K' }];
      break;
    case 15:
      listData = [{ type: 'warning', content: '700K' }];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>{item.content}</li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
    </div>
  ) : null;
}

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
        <div
          className={classnames(
            styles['details-container'],
            styles['details-container-transparent'],
          )}
        >
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
          <p className={styles['norm']}>Để chọn ngày. Vui nhấn giữ 1 ngày trên lịch và kéo</p>
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} className={styles.schedules} />
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
          <Link to="/danh-sach-noi-luu-tru/tao-moi?steps=5" className={styles['link-back']}>
            Quay lại
          </Link>
          <Button className={classnames(styles.button, styles.primary)} htmlType="button">
            Hoàn thành
          </Button>
        </div>
      </Form>
    );
  }
}

Index.propTypes = {};

export default Index;
