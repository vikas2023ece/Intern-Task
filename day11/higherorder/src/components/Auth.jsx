import React from 'react';

const Auth = (WrappedComponent) => {
  return ({ isAuth, ...props }) => {
    if (!isAuth) {
      return <p>Access denied.</p>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default Auth;