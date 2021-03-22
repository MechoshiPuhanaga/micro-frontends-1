import React, { memo, useEffect, useRef } from 'react';
import { mount } from 'auth/AuthApp';

const AuthApp = () => {
  const root = useRef(null);

  useEffect(() => {
    mount(root.current);
  }, []);

  return <div ref={root} />;
};

export default memo(AuthApp);
