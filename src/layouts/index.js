import React, { Fragment } from 'react';
import { connect, Redirect } from 'umi';
import NProgress from 'nprogress';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Loader from '@/components/LayoutComponents/Loader';
import PublicLayout from './Public';
import LoginLayout from './Login';
import MainLayout from './Main';

const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
};

@connect(({ user, loading }) => ({ user, loading }))
class IndexLayout extends React.PureComponent {
  previousPath = '';

  render() {
    const {
      children,
      loading,
      location: { pathname, search, query },
      user,
    } = this.props;

    // Layout Rendering
    const getLayout = () => {
      if (/^\/login(?=\/|$)/i.test(pathname)) {
        return 'login';
      }
      if (/^\/trang-chu(?=\/|$)/i.test(pathname)) {
        return 'public';
      }
      return 'public';
    };

    const Container = Layouts[getLayout()];
    const isUserAuthorized = user.authorized;
    const isUserLoading = loading.models.user;
    const isLoginLayout = getLayout() === 'login';

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return <Loader />;
      }
      // redirect to login page if current is not login page and user not authorized
      // if (!isLoginLayout && !isUserAuthorized) {
      //   return (
      //     <Redirect to={{ pathname: '/login', query: { redirect: `${pathname}?${search}` } }} />
      //   );
      // }
      // redirect to main dashboard when user on login page and authorized
      // if (isLoginLayout && isUserAuthorized) {
      //   if (query.redirect === '/') {
      //     return <Redirect to="/quan-ly-dich-vu" />;
      //   }
      //   if (query.redirect) {
      //     return <Redirect to={query.redirect} />;
      //   }
      //   return <Redirect to="/quan-ly-dich-vu" />;
      // }
      // in other case render previously set layout
      return <Container>{children}</Container>;
    };

    return (
      <>
        <Helmet title="Admin Tempaltes" titleTemplate="Admin Tempaltes | %s" />
        {BootstrappedLayout()}
      </>
    );
  }
}

IndexLayout.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.any,
  loading: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any),
};

IndexLayout.defaultProps = {
  location: {},
  children: {},
  loading: {},
  user: {},
};

export default IndexLayout;
