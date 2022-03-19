import { isArray, pickBy, isEmpty, get as getLodash, toString, omit, size } from 'lodash';
import { Tag } from 'antd';
import classnames from 'classnames';
import { variables } from './variables';
import styles from '@/assets/styles/Common/common.scss';

export default class Helpers {
  static tagStatus = (type) => {
    if (type === variables.STATUS.ON) {
      return (
        <Tag className={classnames(styles.tab, styles.success, 'd-inline-flex')}>
          {variables.STATUS_NAME.ON}
        </Tag>
      );
    }
    return (
      <Tag className={classnames(styles.tab, styles.danger, 'd-inline-flex')}>
        {variables.STATUS_NAME.OFF}
      </Tag>
    );
  };
}
