import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect, Link } from 'umi';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Slider from 'react-slick';

@connect(({ user, loading }) => ({ user, loading }))
class Index extends PureComponent {
  render() {
    return <>payment</>;
  }
}

Index.propTypes = {
  dispatch: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
};

Index.defaultProps = {
  dispatch: {},
  loading: {},
  location: {},
};

export default Index;
