import React from 'react';
import { connect, Link, withRouter } from 'umi';
import classnames from 'classnames';
import { Menu, Layout } from 'antd';
import store from 'store';
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { isValidCondition } from '@/utils/authority';
import styles from './style.module.scss';

const { Sider } = Layout;
const { SubMenu, Divider } = Menu;
const mapStateToProps = ({ menu, settings, user, categories }) => ({
  menuData: menu.menuLeftData,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMobileView: settings.isMobileView,
  isSettingsOpen: settings.isSettingsOpen,
  isLightTheme: settings.isLightTheme,
  isMobileMenuOpen: settings.isMobileMenuOpen,
  user,
  boGroups: categories.boGroups,
});

@connect(mapStateToProps)
class MenuLeft extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      menuData: props.menuData,
      openedKeys: store.get('app.menu.openedKeys') || [],
      selectedKeys: store.get('app.menu.selectedKeys') || [],
    };
  }

  UNSAFE_componentWillMount() {
    this.setSelectedKeys(this.props);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.isMenuCollapsed && !newProps.isMobileView) {
      this.setState({
        openedKeys: [],
      });
    }
    this.setSelectedKeys(newProps);
  }

  setSelectedKeys = (props) => {
    const { menuData } = this.state;
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item);
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key));
        }
        return flattenedItems;
      }, []);
    const selectedItem = flattenItems(menuData, 'children').find((item) => {
      if (_.isArray(item.url)) {
        const splitUrl = item.url[0].split('/');
        const splitPathname = props.location.pathname.split('/');
        if (!_.isEmpty(splitUrl) && !_.isEmpty(splitPathname)) {
          const isExitst = splitUrl[1] === splitPathname[1];
          return isExitst;
        }
        return false;
      }
      return item.url === props.location.pathname;
    });
    this.setState({
      selectedKeys: selectedItem ? [selectedItem.key] : [],
    });
  };

  onCollapse = (value, type) => {
    const { dispatch, isMenuCollapsed } = this.props;
    if (type === 'responsive' && isMenuCollapsed) {
      return;
    }

    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed,
      },
    });

    this.setState({
      openedKeys: [],
    });
  };

  onOpenChange = (openedKeys) => {
    store.set('app.menu.openedKeys', openedKeys);
    this.setState({
      openedKeys,
    });
  };

  handleClick = (e) => {
    const { dispatch, isSettingsOpen } = this.props;
    store.set('app.menu.selectedKeys', [e.key]);
    // custom action on settings menu item
    if (e.key === 'settings') {
      dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: 'isSettingsOpen',
          value: !isSettingsOpen,
        },
      });
      return;
    }
    this.setState({
      selectedKeys: [e.key],
      // openKeys: e.keyPath,
    });
  };

  renderItemMenu = (url, icon, item, menuSettings, title) => {
    const { boGroups } = this.props;
    if (_.isArray(url) && _.head(url) === '/nha-cung-cap') {
      return (
        <Link
          to={
            _.isArray(url) ? `${url[0]}/${_.head(boGroups)?.id}` : `${url}/${_.head(boGroups)?.id}`
          }
        >
          {icon && <span className={`${icon} ${styles.icon} icon-collapsed-hidden`} />}
          <span className={styles.title}>{title}</span>
          {item.plus && !menuSettings.collapsed && (
            <span className={classnames('icon-plus-circle-full', styles['icon-plus'])} />
          )}
        </Link>
      );
    }
    return (
      <Link to={_.isArray(url) ? url[0] : url}>
        {icon && <span className={`${icon} ${styles.icon} icon-collapsed-hidden`} />}
        <span className={styles.title}>{title}</span>
        {item.plus && !menuSettings.collapsed && (
          <span className={classnames('icon-plus-circle-full', styles['icon-plus'])} />
        )}
      </Link>
    );
  };

  generateMenuItems = (menuSettings) => {
    const { user } = this.props;
    const { menuData = [] } = this.state;
    const generateItem = (item) => {
      const { key, title, url, icon, disabled } = item;
      if (item.divider) {
        return <Divider key={Math.random()} />;
      }
      if (item.url) {
        return (
          <Menu.Item disabled={disabled} key={key}>
            {item.target ? (
              <a href={url} rel="noopener noreferrer" target={item.target}>
                {icon && <span className={`${icon} ${styles.icon} icon-collapsed-hidden`} />}
                <span className={styles.title}>{title}</span>
              </a>
            ) : (
              this.renderItemMenu(url, icon, item, menuSettings, title)
            )}
          </Menu.Item>
        );
      }
      return (
        <Menu.Item disabled={disabled} key={key}>
          {icon && <span className={`${icon} ${styles.icon} icon-collapsed-hidden`} />}
          <span className={styles.title}>{title}</span>
        </Menu.Item>
      );
    };

    const generateSubmenu = (items) =>
      items.map((menuItem) => {
        const showMenu = isValidCondition({
          conditions: [
            {
              permission: menuItem.permission || [''],
              isOrPermission: menuItem.multiple || false,
            },
          ],
          userPermission: user.permissions,
        });
        if (showMenu) {
          if (menuItem.children) {
            const subMenuTitle = (
              <span key={menuItem.key}>
                <span className={styles.title}>{menuItem.title}</span>
                {menuItem.icon && <span className={`${menuItem.icon} ${styles.icon}`} />}
              </span>
            );
            return (
              <SubMenu key={menuItem.key} title={subMenuTitle}>
                {generateSubmenu(menuItem.children)}
              </SubMenu>
            );
          }
          return generateItem(menuItem);
        }
        return null;
      });

    return menuData.map((menuItem) => {
      const showMenu = isValidCondition({
        conditions: [
          {
            permission: menuItem.permission || [''],
            isOrPermission: menuItem.multiple || false,
          },
        ],
        userPermission: user.permissions,
      });
      if (showMenu) {
        if (menuItem.children) {
          const subMenuTitle = (
            <span key={menuItem.key}>
              <span className={styles.title}>{menuItem.title}</span>
              {menuItem.icon && <span className={`${menuItem.icon} ${styles.icon}`} />}
            </span>
          );
          return (
            <SubMenu key={menuItem.key} title={subMenuTitle}>
              {generateSubmenu(menuItem.children)}
            </SubMenu>
          );
        }
        return generateItem(menuItem);
      }
      return null;
    });
  };

  render() {
    const { selectedKeys, openedKeys } = this.state;
    const { isMobileView, isMenuCollapsed } = this.props;
    const menuSettings = isMobileView
      ? {
          width: 256,
          collapsible: true,
          collapsed: false,
          onCollapse: this.onCollapse,
        }
      : {
          width: 256,
          collapsible: true,
          collapsed: isMenuCollapsed,
          onCollapse: this.onCollapse,
          breakpoint: 'lg',
        };

    const menu = this.generateMenuItems(menuSettings);

    return (
      <Sider {...menuSettings} className={styles.menu}>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            {isMenuCollapsed && <span className={styles.title}>Travel</span>}
            {!isMenuCollapsed && <img src="/images/logo-white.svg" alt="" />}
          </div>
        </div>
        <Scrollbars
          autoHide
          className={isMobileView ? styles.scrollbarMobile : styles.scrollbarDesktop}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                width: '4px',
                borderRadius: 'inherit',
                backgroundColor: '#c5cdd2',
                left: '1px',
              }}
            />
          )}
        >
          <Menu
            className={styles.navigation}
            mode="inline"
            onClick={this.handleClick}
            onOpenChange={this.onOpenChange}
            openKeys={openedKeys}
            selectedKeys={selectedKeys}
            theme="dark"
          >
            {menu}
          </Menu>
        </Scrollbars>
      </Sider>
    );
  }
}

MenuLeft.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.any),
  dispatch: PropTypes.objectOf(PropTypes.any),
  isMenuCollapsed: PropTypes.bool,
  isSettingsOpen: PropTypes.bool,
  isMobileView: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.any),
  boGroups: PropTypes.arrayOf(PropTypes.any),
};

MenuLeft.defaultProps = {
  menuData: [],
  dispatch: {},
  isMenuCollapsed: false,
  isSettingsOpen: false,
  isMobileView: false,
  user: {},
  boGroups: [],
};

export default withRouter(MenuLeft);
