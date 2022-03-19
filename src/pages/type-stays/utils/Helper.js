import { Tag } from 'antd';
import classnames from 'classnames';
import styles from '@/assets/styles/Common/common.scss';
import { variables } from './variables';

export default class Helpers {
  static tagStatus = (type) => {
    if (type === variables.STATUS.PENDING) {
      return (
        <Tag className={classnames(styles.tab, styles.yellow)}>{variables.STATUS_NAME.PENDING}</Tag>
      );
    }
    if (type === variables.STATUS.CONFIRM) {
      return (
        <Tag className={classnames(styles.tab, styles.success)}>
          {variables.STATUS_NAME.CONFIRM}
        </Tag>
      );
    }
    if (type === variables.STATUS.CANCEL) {
      return (
        <Tag className={classnames(styles.tab, styles.danger)}>{variables.STATUS_NAME.CANCEL}</Tag>
      );
    }
    return (
      <Tag className={classnames(styles.tab, styles.yellow)}>{variables.STATUS_NAME.PENDING}</Tag>
    );
  };
}
